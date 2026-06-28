// app/api/cart/route.ts
// Cart is stored client-side in localStorage (via Zustand) for speed.
// On checkout, the cart contents are sent to /api/orders to create a real order.
// This file is reserved for server-side cart operations if needed later.
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Cart is managed client-side via Zustand store." });
}
