import { NextResponse } from "next/server";
import { printfulHeaders, printfulOrderItem, printfulRefOf, type PrintfulRef } from "../../../lib/printful";
import { products } from "../../../lib/products";

export const dynamic = "force-dynamic";

// Every store variant the merch page can sell, as Printful references.
const SELLABLE: PrintfulRef[] = products.flatMap((p) =>
  (p.variants ?? [p]).map(printfulRefOf).filter((r): r is PrintfulRef => r !== null)
);

/**
 * Reports whether the server's integrations are configured and working.
 * Returns only pass/fail states, never any key value.
 *
 * `printful` price-quotes one order containing every sellable variant, using
 * the same item shape the order webhook sends. estimate-costs creates and
 * charges nothing, so "ok" means auth, scope and every variant id are valid.
 */
export async function GET() {
  let printful: string;
  try {
    const res = await fetch("https://api.printful.com/orders/estimate-costs", {
      method: "POST",
      headers: printfulHeaders(),
      body: JSON.stringify({
        recipient: {
          name: "Health Check",
          address1: "19749 Dearborn St",
          city: "Chatsworth",
          state_code: "CA",
          country_code: "US",
          zip: "91311",
        },
        items: SELLABLE.map(printfulOrderItem),
      }),
      cache: "no-store",
    });
    if (res.ok) {
      printful = `ok (${SELLABLE.length} variants)`;
    } else {
      const body = await res.json().catch(() => ({}));
      printful = `error ${res.status}: ${String(body?.error?.message ?? body?.result ?? "")}`.slice(0, 200);
    }
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
