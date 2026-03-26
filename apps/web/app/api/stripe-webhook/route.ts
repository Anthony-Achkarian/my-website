import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

async function createPrintfulOrder(session: Stripe.Checkout.Session) {
  const shipping = session.shipping_details;
  const variantId = Number(session.metadata?.printfulVariantId);
  const size = session.metadata?.size;

  if (!shipping?.address || !variantId) return;

  const body = {
    recipient: {
      name: shipping.name,
      address1: shipping.address.line1,
      address2: shipping.address.line2 || "",
      city: shipping.address.city,
      state_code: shipping.address.state,
      country_code: shipping.address.country,
      zip: shipping.address.postal_code,
      email: session.customer_details?.email || "",
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

  const res = await fetch("https://api.printful.com/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      "Content-Type": "application/json",
    },
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

// Vercel requires the raw body for Stripe webhook signature verification.
// Disable body parsing by reading the raw text directly from the request.
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
