import { NextResponse } from "next/server";
import { deleteCurrentCustomerSession, CUSTOMER_SESSION_COOKIE } from "@/lib/auth/customer-session-server";

export async function POST() {
  await deleteCurrentCustomerSession();
  const response = NextResponse.json({ success: true });
  response.cookies.set(CUSTOMER_SESSION_COOKIE, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return response;
}
