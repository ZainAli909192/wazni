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

  const addItem = useCallback((productId: string | number, quantity = 1) => {
    const amount = Math.max(1, Math.floor(quantity));
    setItems((current) => {
      const existing = current.find((line) => line.productId === productId);

      if (!existing) {
        return [...current, { productId, quantity: Math.min(MAX_QUANTITY, amount) }];
      }

      return current.map((line) =>
        line.productId === productId
          ? { ...line, quantity: Math.min(MAX_QUANTITY, line.quantity + amount) }
          : line
      );
    });
  }, []);

  const setQuantity = useCallback((productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((line) => line.productId !== productId));
      return;
    }

    setItems((current) =>
      current.map((line) =>
        line.productId === productId
          ? { ...line, quantity: Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity))) }
          : line
      )
    );
  }, []);

  const removeItem = useCallback((productId: string | number) => {
    setItems((current) => current.filter((line) => line.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      hydrated,
      totalQuantity: items.reduce((total, line) => total + line.quantity, 0),
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [addItem, clearCart, hydrated, items, removeItem, setQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
