import { Prisma } from "@prisma/client";

export const orderInclude = { customer: true, items: true } satisfies Prisma.OrderInclude;
type DbOrder = Prisma.OrderGetPayload<{ include: typeof orderInclude }>;
const title = (value: string) => value.toLowerCase().split("_").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
export function serializeOrder(order: DbOrder) {
  return {
    id: order.id, customerId: order.customerId, orderNumber: order.orderNumber,
    customerName: order.customer.name, email: order.customer.email, phone: order.customer.phone,
    itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0), subtotal: order.subtotal,
    deliveryFee: order.deliveryFee, total: order.total, paymentStatus: title(order.paymentStatus),
    paymentMethod: order.paymentMethod, orderStatus: title(order.orderStatus), deliveryStatus: title(order.deliveryStatus),
    placedAt: order.placedAt.toISOString(), transactionReference: order.transactionReference ?? "—",
    paidAt: order.paidAt?.toISOString() ?? "—",
    deliveryAddress: { emirate: order.deliveryEmirate, area: order.deliveryArea, address: order.deliveryAddress, building: order.deliveryBuilding, phone: order.deliveryPhone },
    items: order.items.map((item) => ({ id: item.id, name: item.name, type: "Jewellery" as const, sku: item.sku, quantity: item.quantity, unitPrice: item.unitPrice })),
    customerNotes: order.customerNotes ?? "", adminNotes: order.adminNotes ?? "",
  };
}
export const toOrderStatus = (value: string) => value.toUpperCase() as "PENDING" | "CONFIRMED" | "PROCESSING" | "DELIVERED" | "CANCELLED";
export const toDeliveryStatus = (value: string) => value.replaceAll(" ", "_").toUpperCase() as "NOT_SCHEDULED" | "SCHEDULED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED" | "DELIVERY_FAILED" | "RESCHEDULED" | "CANCELLED";
