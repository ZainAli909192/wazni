import { NextResponse } from "next/server";
import { customerToClient, getCurrentCustomer } from "@/lib/auth/customer-session-server";

export async function GET() {
  const customer = await getCurrentCustomer();
  return NextResponse.json({ user: customer ? customerToClient(customer) : null });
}
