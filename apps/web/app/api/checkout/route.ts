import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getProductById } from "../../../lib/products";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { productId, size } = await req.json();

  const product = getProductById(productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const stripe = getStripe();
  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: product.price,
          product_data: {
            name: product.name + (size ? ` — ${size}` : ""),
            description: product.description,
            images: product.image.startsWith("/")
              ? [`${origin}${product.image}`]
              : [product.image],
          },
        },
        quantity: 1,
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "NL", "SE", "NO", "DK"],
    },
    metadata: {
      productId: product.id,
      printfulVariantId: String(product.printfulVariantId),
      size: size ?? "",
    },
    success_url: `${origin}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/merch`,
  });

  return NextResponse.json({ url: session.url });
}
