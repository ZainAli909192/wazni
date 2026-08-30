import OrderDetailsLoader from "@/components/account/order-details-loader";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const decodedId =
    decodeURIComponent(id);

  return <OrderDetailsLoader id={decodedId} />;
}
