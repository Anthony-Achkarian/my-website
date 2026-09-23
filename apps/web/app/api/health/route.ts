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

  // TEMPORARY diagnostic: price-quote a real store item with each item shape.
  // estimate-costs creates nothing and charges nothing.
  const estimate = async (item: Record<string, unknown>) => {
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
          items: [{ ...item, quantity: 1 }],
        }),
        cache: "no-store",
      });
      if (res.ok) return "ok";
      const body = await res.json().catch(() => ({}));
      return `error ${res.status}: ${String(body?.error?.message ?? body?.result ?? "")}`.slice(0, 200);
    } catch {
      return "unreachable";
    }
  };
  const tshirtM = 5246862153;
  const itemAsVariantId = await estimate({ variant_id: tshirtM });
  const itemAsSyncVariantId = await estimate({ sync_variant_id: tshirtM });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.startsWith("whsec_")
    ? "ok"
    : "missing or malformed";

  return NextResponse.json(
    { printful, webhookSecret, itemAsVariantId, itemAsSyncVariantId },
    { headers: { "Cache-Control": "no-store" } }
  );
}
