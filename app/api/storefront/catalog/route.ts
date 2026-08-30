import { NextResponse } from "next/server";
import { getStorefrontCatalog } from "@/lib/storefront/catalog";
export async function GET() { return NextResponse.json(await getStorefrontCatalog()); }
