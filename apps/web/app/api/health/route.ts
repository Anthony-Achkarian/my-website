import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Reports whether the server's integrations are configured and can
 * authenticate. It returns only pass/fail states, never any key value.
 */
export async function GET() {
  let printful: string;
  try {
    const res = await fetch("https://api.printful.com/stores", {
      headers: { Authorization: `Bearer ${process.env.PRINTFUL_API_KEY ?? ""}` },
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
