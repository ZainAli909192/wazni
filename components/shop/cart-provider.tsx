"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getPublicCatalog } from "@/lib/storefront/client";
import type { StorefrontProduct } from "@/lib/storefront/types";

const CART_STORAGE_KEY = "wazni-cart-v1";
const MAX_QUANTITY = 99;

export type CartLine = {
  productId: string | number;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  totalQuantity: number;
  hydrated: boolean;
  catalogReady: boolean;
  catalogProducts: StorefrontProduct[];
  addItem: (productId: string | number, quantity?: number) => void;
  setQuantity: (productId: string | number, quantity: number) => void;
  removeItem: (productId: string | number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function normalizeCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];

  const merged = new Map<string | number, number>();

  for (const line of value) {
    if (!line || typeof line !== "object") continue;

    const productId = (line as CartLine).productId;
    const quantity = Number((line as CartLine).quantity);

    if ((typeof productId !== "string" && typeof productId !== "number") || String(productId).trim() === "") continue;
    if (!Number.isFinite(quantity) || quantity <= 0) continue;

    const nextQuantity = Math.min(
      MAX_QUANTITY,
      (merged.get(productId) ?? 0) + Math.floor(quantity)
    );
    merged.set(productId, nextQuantity);
  }

  return Array.from(merged, ([productId, quantity]) => ({ productId, quantity }));
}

function readStoredCart(): CartLine[] {
  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    return saved ? normalizeCart(JSON.parse(saved)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [catalogReady, setCatalogReady] = useState(false);
  const [catalogProducts, setCatalogProducts] = useState<StorefrontProduct[]>([]);

  useEffect(() => {
    let active = true;
    getPublicCatalog()
      .then((catalog) => {
        if (!active) return;
        setCatalogProducts(catalog.products);
        setCatalogReady(true);
      })
      .catch(() => {
        // Keep the existing cart intact if the catalogue is temporarily unavailable.
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      setItems(readStoredCart());
      setHydrated(true);
    }, 0);

    const syncFromStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) setItems(readStoredCart());
    };

    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.clearTimeout(hydrationTimer);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // The cart remains usable for this session if storage is unavailable.
    }
  }, [hydrated, items]);

  useEffect(() => {
    if (!hydrated || !catalogReady) return;

    const productsById = new Map(
      catalogProducts.map((product) => [String(product.id), product])
    );
    setItems((current) =>
      current.flatMap((line) => {
        const product = productsById.get(String(line.productId));
        if (!product || product.quantity <= 0) return [];
        return [{
          productId: product.id,
          quantity: Math.min(line.quantity, product.quantity, MAX_QUANTITY),
        }];
      })
    );
  }, [catalogProducts, catalogReady, hydrated]);

  const addItem = useCallback((productId: string | number, quantity = 1) => {
    const amount = Math.max(1, Math.floor(quantity));
    setItems((current) => {
      const product = catalogProducts.find((item) => String(item.id) === String(productId));
      if (catalogReady && (!product || product.quantity <= 0)) return current;
      const limit = Math.min(MAX_QUANTITY, product?.quantity ?? MAX_QUANTITY);
      const existing = current.find((line) => String(line.productId) === String(productId));

      if (!existing) {
        return [...current, { productId, quantity: Math.min(limit, amount) }];
      }

      return current.map((line) =>
        String(line.productId) === String(productId)
          ? { ...line, quantity: Math.min(limit, line.quantity + amount) }
          : line
      );
    });
  }, [catalogProducts, catalogReady]);

  const setQuantity = useCallback((productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((line) => String(line.productId) !== String(productId)));
      return;
    }

    const product = catalogProducts.find((item) => String(item.id) === String(productId));
    const limit = Math.min(MAX_QUANTITY, product?.quantity ?? MAX_QUANTITY);
    setItems((current) =>
      current.map((line) =>
        String(line.productId) === String(productId)
          ? { ...line, quantity: Math.min(limit, Math.max(1, Math.floor(quantity))) }
          : line
      )
    );
  }, [catalogProducts]);

  const removeItem = useCallback((productId: string | number) => {
    setItems((current) => current.filter((line) => String(line.productId) !== String(productId)));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      hydrated,
      catalogReady,
      catalogProducts,
      totalQuantity: items.reduce((total, line) => total + line.quantity, 0),
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [addItem, catalogProducts, catalogReady, clearCart, hydrated, items, removeItem, setQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
