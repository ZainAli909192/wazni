"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  AuthUser,
  CartItem,
  CheckoutAddress,
  CheckoutState,
  DeliveryMethod,
  PaymentMethod,
  StoreOrder,
} from "@/lib/store-types";

type StoreContextValue = {
  ready: boolean;

  user: AuthUser | null;
  isAuthenticated: boolean;

  cartItems: CartItem[];
  cartCount: number;
  cartSubtotal: number;

  checkout: CheckoutState;
  orders: StoreOrder[];

  login: (
    email: string,
    password: string
  ) => Promise<AuthUser>;

  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<AuthUser>;

  logout: () => Promise<void>;
  saveProfile: (data: { firstName: string; lastName: string; email: string; phone: string; address?: CheckoutAddress }) => Promise<AuthUser>;
  refreshCustomer: () => Promise<AuthUser | null>;

  addToCart: (
    item: Omit<CartItem, "quantity">,
    quantity?: number
  ) => void;

  removeFromCart: (
    id: CartItem["id"]
  ) => void;

  updateCartQuantity: (
    id: CartItem["id"],
    quantity: number
  ) => void;

  clearCart: () => void;

  setDeliveryMethod: (
    method: DeliveryMethod
  ) => void;

  setSelectedAddress: (
    address: CheckoutAddress | null
  ) => void;

  setDeliveryNotes: (
    notes: string
  ) => void;

  setPaymentMethod: (
    method: PaymentMethod
  ) => void;

  clearCheckout: () => void;
  placeOrder: (items: CartItem[], total: number, paymentMethod?: PaymentMethod) => Promise<StoreOrder>;
  cancelOrder: (id: string) => Promise<void>;
};

const StoreContext =
  createContext<StoreContextValue | null>(
    null
  );

const CART_KEY = "wazni-cart";
const CHECKOUT_KEY = "wazni-checkout";

const defaultCheckout: CheckoutState = {
  deliveryMethod: "delivery",
  selectedAddress: null,
  deliveryNotes: "",
  paymentMethod: "card",
};

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] =
    useState(false);

  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);

  const [checkout, setCheckout] =
    useState<CheckoutState>(
      defaultCheckout
    );
  const [orders, setOrders] = useState<StoreOrder[]>([]);

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      try {
      const savedCart =
        localStorage.getItem(CART_KEY);

      const savedCheckout =
        localStorage.getItem(
          CHECKOUT_KEY
        );
      if (savedCart) {
        setCartItems(
          JSON.parse(savedCart)
        );
      }

      if (savedCheckout) {
        setCheckout({
          ...defaultCheckout,
          ...JSON.parse(
            savedCheckout
          ),
        });
      }
      } catch {
      localStorage.removeItem(
        CART_KEY
      );

      localStorage.removeItem(
        CHECKOUT_KEY
      );
      }
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/api/customer/auth/session", { cache: "no-store" }).then((response) => response.json()),
      fetch("/api/customer/orders", { cache: "no-store" }).then((response) => response.ok ? response.json() : { orders: [] }),
    ]).then(([session, orderData]) => {
      if (!active) return;
      setUser(session.user ?? null);
      setOrders(orderData.orders ?? []);
    }).finally(() => {
      if (active) setReady(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!ready) return;

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems, ready]);

  useEffect(() => {
    if (!ready) return;

    localStorage.setItem(
      CHECKOUT_KEY,
      JSON.stringify(checkout)
    );
  }, [checkout, ready]);

  async function login(
    email: string,
    password: string
  ) {
    const response = await fetch("/api/customer/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "Unable to sign in.");
    setUser(result.user);
    const ordersResponse = await fetch("/api/customer/orders", { cache: "no-store" });
    if (ordersResponse.ok) setOrders((await ordersResponse.json()).orders ?? []);
    return result.user as AuthUser;
  }

  async function register(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    const response = await fetch("/api/customer/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "Unable to create account.");
    setUser(result.user);
    setOrders([]);
    return result.user as AuthUser;
  }

  async function logout() {
    await fetch("/api/customer/auth/logout", { method: "POST" });
    setUser(null);
    setOrders([]);
  }

  async function saveProfile(data: { firstName: string; lastName: string; email: string; phone: string; address?: CheckoutAddress }) {
    const response = await fetch("/api/customer/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "Unable to save delivery details.");
    setUser(result.user);
    return result.user as AuthUser;
  }

  async function refreshCustomer() {
    const response = await fetch("/api/customer/auth/session", { cache: "no-store" });
    const result = await response.json();
    const nextUser = (result.user ?? null) as AuthUser | null;
    setUser(nextUser);
    return nextUser;
  }

  function addToCart(
    item: Omit<
      CartItem,
      "quantity"
    >,
    quantity = 1
  ) {
    setCartItems((current) => {
      const existing =
        current.find(
          (cartItem) =>
            cartItem.id === item.id
        );

      if (existing) {
        return current.map(
          (cartItem) =>
            cartItem.id === item.id
              ? {
                  ...cartItem,
                  quantity:
                    cartItem.quantity +
                    quantity,
                }
              : cartItem
        );
      }

      return [
        ...current,
        {
          ...item,
          quantity,
        },
      ];
    });
  }

  function removeFromCart(
    id: CartItem["id"]
  ) {
    setCartItems((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );
  }

  function updateCartQuantity(
    id: CartItem["id"],
    quantity: number
  ) {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  function setDeliveryMethod(
    method: DeliveryMethod
  ) {
    setCheckout((current) => ({
      ...current,
      deliveryMethod: method,
    }));
  }

  function setSelectedAddress(
    address: CheckoutAddress | null
  ) {
    setCheckout((current) => ({
      ...current,
      selectedAddress:
        address,
    }));
  }

  function setDeliveryNotes(
    notes: string
  ) {
    setCheckout((current) => ({
      ...current,
      deliveryNotes: notes,
    }));
  }

  function setPaymentMethod(
    method: PaymentMethod
  ) {
    setCheckout((current) => ({
      ...current,
      paymentMethod: method,
    }));
  }

  function clearCheckout() {
    setCheckout(defaultCheckout);
  }

  async function placeOrder(items: CartItem[], _total: number, paymentMethod?: PaymentMethod) {
    const response = await fetch("/api/customer/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: items.map((item) => ({ productId: String(item.id), quantity: item.quantity })), paymentMethod: paymentMethod ?? checkout.paymentMethod, deliveryMethod: checkout.deliveryMethod, notes: checkout.deliveryNotes, address: checkout.selectedAddress ? { emirate: checkout.selectedAddress.emirate, area: checkout.selectedAddress.area, street: checkout.selectedAddress.street, unit: checkout.selectedAddress.unit, phone: checkout.selectedAddress.phone } : null }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "Unable to place your order.");
    const order = result.order as StoreOrder;
    setOrders((current) => [order, ...current]);
    return order;
  }

  async function cancelOrder(id: string) {
    const response = await fetch(`/api/customer/orders/${encodeURIComponent(id)}`, { method: "PATCH" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "Unable to cancel this order.");
    setOrders((current) => current.map((order) => order.id === id ? result.order : order));
  }

  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          item.price *
            item.quantity,
        0
      ),
    [cartItems]
  );

  const value: StoreContextValue = {
        ready,

        user,
        isAuthenticated:
          Boolean(user),

        cartItems,
        cartCount,
        cartSubtotal,

        checkout,
        orders,

        login,
        register,
        logout,
        saveProfile,
        refreshCustomer,

        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,

        setDeliveryMethod,
        setSelectedAddress,
        setDeliveryNotes,
        setPaymentMethod,
        clearCheckout,
        placeOrder,
        cancelOrder,
      };

  return (
    <StoreContext.Provider
      value={value}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context =
    useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider."
    );
  }

  return context;
}
