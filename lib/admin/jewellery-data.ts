import { products, type Product as ShopProduct } from "@/lib/shop-data";

export type AdminProduct = ShopProduct & {
  type: "Jewellery";
  category: ShopProduct["productType"];
  quantity: number;
  status: "Active" | "Inactive";
  description: string;
  images: string[];
};

export const adminProducts: AdminProduct[] = products.map((product, index) => ({
  ...product,
  type: "Jewellery",
  category: product.productType,
  quantity: [8, 2, 6, 1, 0, 12, 4, 15][index % 8],
  status: index === 4 ? "Inactive" : "Active",
  description: `${product.name}, crafted in ${product.material} as part of Wazni Jewellery's ${product.productType.toLowerCase()} collection.`,
  images: [product.image],
}));

export type AdminOrderStatus = "Pending" | "Confirmed" | "Processing" | "Delivered" | "Cancelled";
export type AdminPaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";
export type AdminPaymentMethod = "Card" | "Tamara" | "Tabby";
export type AdminDeliveryStatus = "Not Scheduled" | "Scheduled" | "Preparing" | "Out for Delivery" | "Delivered" | "Delivery Failed" | "Rescheduled" | "Cancelled";

export type AdminOrder = {
  id: number;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  itemCount: number;
  total: number;
  subtotal: number;
  paymentStatus: AdminPaymentStatus;
  paymentMethod: AdminPaymentMethod;
  orderStatus: AdminOrderStatus;
  placedAt: string;
  transactionReference: string;
  paidAt: string;
  deliveryStatus: AdminDeliveryStatus;
  deliveryFee: number;
  deliveryAddress: { emirate: string; area: string; address: string; building: string; phone: string };
  items: Array<{ id: number; name: string; type: "Jewellery"; sku: string; quantity: number; unitPrice: number }>;
  customerNotes: string;
  adminNotes: string;
};

const customers = [
  ["Layla Hassan", "layla@example.com", "+971 50 123 4567"],
  ["Sara Khan", "sara@example.com", "+971 52 222 4110"],
  ["Omar Ali", "omar@example.com", "+971 55 981 1122"],
  ["Mariam Noor", "mariam@example.com", "+971 54 884 3210"],
  ["Khalid Hassan", "khalid@example.com", "+971 50 774 9011"],
  ["Fatima Zahra", "fatima@example.com", "+971 56 118 2214"],
  ["Ali Rehman", "ali@example.com", "+971 52 445 2121"],
  ["Noura Ahmed", "noura@example.com", "+971 55 411 1902"],
] as const;

const orderStatuses: AdminOrderStatus[] = ["Processing", "Confirmed", "Pending", "Delivered", "Cancelled", "Processing", "Delivered", "Pending"];
const paymentStatuses: AdminPaymentStatus[] = ["Paid", "Paid", "Pending", "Paid", "Failed", "Paid", "Paid", "Pending"];
const paymentMethods: AdminPaymentMethod[] = ["Card", "Tamara", "Tabby", "Card", "Card", "Tabby", "Tamara", "Tabby"];

export const adminOrders: AdminOrder[] = customers.map(([customerName, email, phone], index) => {
  const selected = [adminProducts[index], adminProducts[(index + 8) % adminProducts.length]].filter(Boolean);
  const items = selected.map((product, itemIndex) => ({
    id: product.id,
    name: product.name,
    type: "Jewellery" as const,
    sku: product.sku,
    quantity: itemIndex === 0 ? 1 : (index % 2) + 1,
    unitPrice: product.price,
  }));
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 10000 ? 0 : 50;

  return {
    id: index + 1,
    orderNumber: `WZ-${String(2048 - index).padStart(4, "0")}`,
    customerName,
    email,
    phone,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    total: subtotal + deliveryFee,
    paymentStatus: paymentStatuses[index],
    paymentMethod: paymentMethods[index],
    orderStatus: orderStatuses[index],
    placedAt: `${24 - Math.floor(index / 3)} Aug 2026 ${index % 2 ? "02:15" : "03:40"} PM`,
    transactionReference: `PAY-WZ-${2048 - index}`,
    paidAt: `24 Aug 2026 03:41 PM`,
    deliveryStatus: orderStatuses[index] === "Delivered" ? "Delivered" : orderStatuses[index] === "Cancelled" ? "Cancelled" : "Preparing",
    deliveryFee,
    deliveryAddress: { emirate: "Abu Dhabi", area: "Al Bateen", address: "Villa 25, Street 14", building: "Villa 25", phone },
    items,
    customerNotes: "Please call before delivery.",
    adminNotes: "Jewellery order verified and ready for fulfilment.",
  };
});

export type AdminReviewStatus = "Pending" | "Approved" | "Rejected";
export type AdminReview = {
  id: number;
  productId: number;
  productName: string;
  productType: ShopProduct["productType"];
  productImage: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  orderId: number;
  orderNumber: string;
  rating: number;
  title?: string;
  comment: string;
  status: AdminReviewStatus;
  submittedAt: string;
  moderatedAt?: string;
  moderatedBy?: string;
  rejectionReason?: string;
  rejectionNotes?: string;
};

const reviewCopy = [
  ["Exceptional craftsmanship", "The finish and stone setting are beautiful. It looks even more refined in person."],
  ["Elegant and timeless", "Beautifully presented, securely packaged and exactly as described."],
  ["A wonderful gift", "The jewellery arrived on time and the quality exceeded my expectations."],
  ["Lovely design", "The piece is elegant, comfortable to wear and has a brilliant finish."],
  ["Beautiful detail", "Every detail feels considered and the jewellery has a luxurious weight."],
  ["Excellent service", "The boutique team was helpful and the product arrived in perfect condition."],
] as const;

export const adminReviews: AdminReview[] = reviewCopy.map(([title, comment], index) => {
  const product = adminProducts[index];
  const order = adminOrders[index];
  const status: AdminReviewStatus = index === 0 || index === 4 ? "Pending" : index === 3 ? "Rejected" : "Approved";

  return {
    id: index + 1,
    productId: product.id,
    productName: product.name,
    productType: product.productType,
    productImage: product.image,
    customerId: 101 + index,
    customerName: order.customerName,
    customerEmail: order.email,
    orderId: order.id,
    orderNumber: order.orderNumber,
    rating: index === 3 ? 3 : index % 2 ? 4 : 5,
    title,
    comment,
    status,
    submittedAt: `${24 - index} Aug 2026 04:15 PM`,
    moderatedAt: status === "Pending" ? undefined : `${24 - index} Aug 2026 04:30 PM`,
    moderatedBy: status === "Pending" ? undefined : "Admin",
    rejectionReason: status === "Rejected" ? "Insufficient product detail" : undefined,
    rejectionNotes: status === "Rejected" ? "Review requires clearer feedback about the purchased jewellery." : undefined,
  };
});
