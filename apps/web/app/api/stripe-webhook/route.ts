import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getShippingDetails } from "../../../lib/checkout-shipping";
import { printfulHeaders } from "../../../lib/printful";

async function createPrintfulOrder(session: Stripe.Checkout.Session) {
  // Direct (non-Printful) products are fulfilled by hand.
  const isPrintful = session.metadata?.isPrintful !== "false";
  if (!isPrintful) return;

  const shipping = getShippingDetails(session);
  const variantId = Number(session.metadata?.printfulVariantId);
  const size = session.metadata?.size;

  // A paid Printful order without an address or variant is a failure, not a
  // skip. Throwing makes the webhook return 500, so Stripe retries and flags
  // the failed delivery in the dashboard instead of the order vanishing.
  if (!shipping?.address || !variantId) {
    throw new Error(
      `Checkout ${session.id} has no ${!variantId ? "Printful variant id" : "shipping address"}`
    );
  }

  const body = {
    // Idempotency: if Stripe retries the webhook, Printful will return the
    // existing order rather than creating a duplicate.
    external_id: session.id,
    recipient: {
      name: shipping.name,
      address1: shipping.address.line1,
      address2: shipping.address.line2 || "",
      city: shipping.address.city,
      state_code: shipping.address.state,
      country_code: shipping.address.country,
      zip: shipping.address.postal_code,
      email: session.customer_details?.email || "",
      phone: session.customer_details?.phone || "",
    },
    items: [
      {
        variant_id: variantId,
        quantity: 1,
        ...(size ? { name: size } : {}),
      },
    ],
    retail_costs: {
      subtotal: ((session.amount_total ?? 0) / 100).toFixed(2),
      currency: "USD",
    },
  };

  // confirm=true tells Printful to submit the order to fulfillment immediately
  // (instead of leaving it as a draft). This is required for live mode.
  const res = await fetch("https://api.printful.com/orders?confirm=true", {
    method: "POST",
    headers: printfulHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Printful order failed:", err);
    throw new Error("Printful order creation failed");
  }

  const data = await res.json();
  console.log("Printful order created:", data.result?.id);
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object as Stripe.Checkout.Session;
    try {
      await createPrintfulOrder(session);
    } catch (err) {
      console.error("Failed to create Printful order:", err);
      return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
