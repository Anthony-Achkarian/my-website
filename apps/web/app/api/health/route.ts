import { NextResponse } from "next/server";
import { printfulHeaders } from "../../../lib/printful";

export const dynamic = "force-dynamic";

/**
 * Reports whether the server's integrations are configured and can
 * authenticate. It returns only pass/fail states, never any key value.
 */
export async function GET() {
  let printful: string;
  try {
    // Same headers and scope the order webhook uses, so "ok" means
    // fulfilment can actually authenticate.
    const res = await fetch("https://api.printful.com/orders?limit=1", {
      headers: printfulHeaders(),
      cache: "no-store",
    });
    printful = res.ok ? "ok" : `error ${res.status}`;
  } catch {
    printful = "unreachable";
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.startsWith("whsec_")
    ? "ok"
    : "missing or malformed";

  return NextResponse.json(
    { printful, webhookSecret },
    { headers: { "Cache-Control": "no-store" } }
  );
}
