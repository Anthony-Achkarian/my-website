const Stripe = require("stripe");

async function createPrintfulOrder(session) {
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
      subtotal: (session.amount_total / 100).toFixed(2),
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

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  const sig = event.headers["stripe-signature"];
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid signature" }) };
  }

  if (stripeEvent.type === "checkout.session.completed") {
    const session = stripeEvent.data.object;
    try {
      await createPrintfulOrder(session);
    } catch (err) {
      console.error("Failed to create Printful order:", err);
      return { statusCode: 500, body: JSON.stringify({ error: "Order creation failed" }) };
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ received: true }),
  };
};
