import "server-only";

export const customerOrderInclude = { items: { include: { product: { select: { slug: true, images: true } } } } } as const;

export function orderToClient(order: {
  id: string; orderNumber: string; total: number; orderStatus: string; paymentStatus: string; paymentMethod: string; placedAt: Date;
  deliveryEmirate: string; deliveryArea: string; deliveryAddress: string; deliveryBuilding: string; deliveryPhone: string;
  items: Array<{ productId: string | null; name: string; sku: string; quantity: number; unitPrice: number; product: { slug: string; images: string[] } | null }>;
}) {
  const status = order.orderStatus === "DELIVERED" ? "Delivered" : order.orderStatus === "CANCELLED" ? "Cancelled" : order.orderStatus === "PROCESSING" ? "Processing" : "Confirmed";
  return {
    databaseId: order.id,
    id: order.orderNumber,
    date: new Intl.DateTimeFormat("en-AE", { dateStyle: "long" }).format(order.placedAt),
    status,
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod,
    total: order.total,
    address: { label: "Home" as const, firstName: "", lastName: "", phone: order.deliveryPhone, country: "United Arab Emirates", emirate: order.deliveryEmirate, area: order.deliveryArea, street: order.deliveryAddress, unit: order.deliveryBuilding, landmark: "" },
    deliveryMethod: order.deliveryAddress === "Wazni Boutique Pickup" ? "pickup" as const : "delivery" as const,
    items: order.items.map((item) => ({ id: item.productId ?? item.sku, slug: item.product?.slug ?? "", name: item.name, image: item.product?.images[0] ?? "", sku: item.sku, price: item.unitPrice, quantity: item.quantity })),
  };
}
