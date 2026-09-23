import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductById, getVariant } from "../../../lib/products";
import { printfulRefOf } from "../../../lib/printful";

// Products that are shown on the site but sold by inquiry only.
// The ARK Tactical X1 drone routes buyers to the contact form instead.
const inquiryOnlyProductIds = new Set<string>(["ark-tactical-x1"]);

const SHIPPING_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] = [
  "US", "CA", "GB", "AU", "DE", "FR", "NL", "SE", "NO", "DK",
];

/**
 * Creates a Stripe Checkout session for one merch item.
 *
 * Product names, prices, images and Printful ids all come from
 * lib/products.ts, the same list the merch page renders, so what a buyer
 * sees and what they are charged for can't drift apart. The Printful id
 * travels in the session metadata to the order webhook.
 */
export async function POST(request: NextRequest) {
  let body: { productId?: string; size?: string; color?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { productId, size, color } = body;

  if (productId && inquiryOnlyProductIds.has(productId)) {
    return NextResponse.json(
      {
        error: "This product is not available for direct purchase. Please contact us for inquiries.",
        inquiryOnly: true,
      },
      { status: 403 }
    );
  }

  const product = productId ? getProductById(productId) : undefined;
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const variant = product.variants ? getVariant(product, size ?? "", color ?? "") : null;
  if (product.variants && !variant) {
    return NextResponse.json({ error: "Please choose an available size." }, { status: 400 });
  }

  const price = variant?.price ?? product.price;
  const ref = printfulRefOf(variant ?? product);
  if (!price || !ref) {
    return NextResponse.json({ error: "This product is not available right now." }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://arkindustriestech.com";
  const label = [size, color].filter(Boolean).join(" / ");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: price,
          product_data: {
            name: product.name + (label ? ` — ${label}` : ""),
            description: product.description,
            images: [product.image],
          },
        },
        quantity: 1,
      },
    ],
    shipping_address_collection: { allowed_countries: SHIPPING_COUNTRIES },
    phone_number_collection: { enabled: true },
    metadata: {
      productId: product.id,
      // Exactly one of these is set; the webhook turns it into the Printful line item.
      printfulVariantId: "syncVariantId" in ref ? String(ref.syncVariantId) : "",
      printfulExternalVariantId: "externalVariantId" in ref ? ref.externalVariantId : "",
      size: size || "",
      color: color || "",
      isPrintful: "true",
    },
    success_url: `${origin}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/merch`,
  });

  return NextResponse.json({ url: session.url });
}
