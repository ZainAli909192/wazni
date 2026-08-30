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

  logout: () => void;

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
  placeOrder: (items: CartItem[], total: number) => StoreOrder;
  cancelOrder: (id: string) => void;
};

const StoreContext =
  createContext<StoreContextValue | null>(
    null
  );

const CART_KEY = "wazni-cart";
const USER_KEY = "wazni-user";
const CHECKOUT_KEY = "wazni-checkout";
const ORDERS_KEY = "wazni-orders";

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
      const savedUser =
        localStorage.getItem(USER_KEY);

      const savedCart =
        localStorage.getItem(CART_KEY);

      const savedCheckout =
        localStorage.getItem(
          CHECKOUT_KEY
        );
      const savedOrders = localStorage.getItem(ORDERS_KEY);

      if (savedUser) {
        setUser(
          JSON.parse(savedUser)
        );
      }

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
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      } catch {
      localStorage.removeItem(
        USER_KEY
      );

      localStorage.removeItem(
        CART_KEY
      );

      localStorage.removeItem(
        CHECKOUT_KEY
      );
      localStorage.removeItem(ORDERS_KEY);
      } finally {
        setReady(true);
      }
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
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

    if (user) {
      localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(
        USER_KEY
      );
    }
  }, [user, ready]);

  useEffect(() => {
    if (!ready) return;

    localStorage.setItem(
      CHECKOUT_KEY,
      JSON.stringify(checkout)
    );
  }, [checkout, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, ready]);

  async function login(
    email: string,
    password: string
  ) {
    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    if (
      !email.trim() ||
      !password.trim()
    ) {
      throw new Error(
        "Email and password are required."
      );
    }

    const storedUser =
      localStorage.getItem(
        "wazni-registered-user"
      );

    let nextUser: AuthUser;

    if (storedUser) {
      const parsed =
        JSON.parse(storedUser);

      if (
        parsed.email
          .toLowerCase()
          .trim() !==
        email.toLowerCase().trim()
      ) {
        throw new Error(
          "No account was found with this email."
        );
      }

      nextUser = {
        id: parsed.id,
        firstName:
          parsed.firstName,
        lastName:
          parsed.lastName,
        email: parsed.email,
        phone: parsed.phone,
      };
    } else {
      nextUser = {
        id: "customer-demo",
        firstName: "Ahmed",
        lastName: "Daniyal",
        email: email.trim(),
        phone:
          "+971 50 123 4567",
      };
    }

    setUser(nextUser);

    return nextUser;
  }

  async function register(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    const nextUser: AuthUser = {
      id: `customer-${Date.now()}`,
      firstName:
        data.firstName.trim(),
      lastName:
        data.lastName.trim(),
      email: data.email
        .trim()
        .toLowerCase(),
      phone: data.phone.trim(),
    };

    localStorage.setItem(
      "wazni-registered-user",
      JSON.stringify(nextUser)
    );

    setUser(nextUser);

    return nextUser;
  }

  function logout() {
    setUser(null);
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

  function placeOrder(items: CartItem[], total: number) {
    const order: StoreOrder = {
      id: `WZ-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`,
      date: new Intl.DateTimeFormat("en-AE", { dateStyle: "long" }).format(new Date()),
      status: "Confirmed",
      total,
      items,
      address: checkout.selectedAddress,
      deliveryMethod: checkout.deliveryMethod,
      paymentMethod: checkout.paymentMethod,
    };
    setOrders((current) => [order, ...current]);
    return order;
  }

  function cancelOrder(id: string) {
    setOrders((current) => current.map((order) =>
      order.id === id ? { ...order, status: "Cancelled" as const } : order
    ));
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
