export type CartItem = {
  id: string | number;
  slug: string;
  name: string;
  image: string;
  sku?: string;
  price: number;
  quantity: number;
};

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: CheckoutAddress[];
};

export type CheckoutAddress = {
  id?: string;
  label: "Home" | "Office";
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  emirate: string;
  area: string;
  street: string;
  unit?: string;
  landmark?: string;
  isDefault?: boolean;
};

export type DeliveryMethod =
  | "delivery"
  | "pickup";

export type PaymentMethod =
  | "card"
  | "tamara"
  | "tabby";

export type CheckoutState = {
  deliveryMethod: DeliveryMethod;
  selectedAddress: CheckoutAddress | null;
  deliveryNotes: string;
  paymentMethod: PaymentMethod;
};

export type StoreOrder = {
  databaseId?: string;
  id: string;
  date: string;
  status: "Confirmed" | "Processing" | "Delivered" | "Cancelled";
  total: number;
  items: CartItem[];
  address: CheckoutAddress | null;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  paymentStatus?: string;
};
