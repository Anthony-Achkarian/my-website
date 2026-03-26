import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const products = [
  {
    id: "ark-sweatshirt",
    name: "ARK Organic Sweatshirt",
    description: "Unisex organic cotton sweatshirt with the ARK Industries logo. Sustainably made.",
    image: "https://files.cdn.printful.com/files/a92/a92c36655784a86310d41b87180109c1_preview.png",
    variants: [
      { size: "S",   color: "French Navy", printfulVariantId: 5246862150, price: 5500 },
      { size: "M",   color: "French Navy", printfulVariantId: 5246862149, price: 5500 },
      { size: "L",   color: "French Navy", printfulVariantId: 5246862148, price: 5500 },
      { size: "XL",  color: "French Navy", printfulVariantId: 5246862151, price: 5500 },
      { size: "2XL", color: "French Navy", printfulVariantId: 5246862147, price: 5800 },
    ],
  },
  {
    id: "ark-tshirt",
    name: "ARK Organic T-Shirt",
    description: "Unisex organic cotton tee with the ARK Industries logo. Lightweight and sustainably made.",
    image: "https://files.cdn.printful.com/files/058/05893fd576a09a6c0bd3c7baa326b728_preview.png",
    variants: [
      { size: "S",   color: "French Navy", printfulVariantId: 5246862152, price: 3500 },
      { size: "M",   color: "French Navy", printfulVariantId: 5246862153, price: 3500 },
      { size: "L",   color: "French Navy", printfulVariantId: 5246862154, price: 3500 },
      { size: "XL",  color: "French Navy", printfulVariantId: 5246862155, price: 3500 },
      { size: "2XL", color: "French Navy", printfulVariantId: 5246862156, price: 3800 },
    ],
  },
  {
    id: "ark-hoodie",
    name: "ARK Organic Hoodie",
    description: "Unisex organic mid-weight hoodie with the ARK Industries logo. Cozy and sustainably made.",
    image: "https://files.cdn.printful.com/files/d4c/d4cfd679f88ef8a6cbd38dcdd0497e54_preview.png",
    variants: [
      { size: "S",   color: "French Navy", printfulVariantId: 5246862157, price: 6500 },
      { size: "M",   color: "French Navy", printfulVariantId: 5246862158, price: 6500 },
      { size: "L",   color: "French Navy", printfulVariantId: 5246862159, price: 6500 },
      { size: "XL",  color: "French Navy", printfulVariantId: 5246862160, price: 6500 },
      { size: "2XL", color: "French Navy", printfulVariantId: 5246862161, price: 6800 },
    ],
  },
  {
    id: "ark-mug",
    name: "ARK Mug",
    description: "Black glossy 11oz mug with the ARK Industries logo in white. Perfect for your morning coffee.",
    image: "https://files.cdn.printful.com/files/6f7/6f765803464d06fd1de0a482de7af35f_preview.png",
    printfulVariantId: 5246862162,
    price: 2500,
  },
  {
    id: "ark-water-bottle",
    name: "ARK Water Bottle",
    description: "Stainless steel 17oz water bottle with the ARK Industries logo in white. Keeps drinks cold or hot.",
    image: "https://files.cdn.printful.com/files/7f7/7f7d72c6f8c8fb4d6588458b7bbbdadc_preview.png",
    printfulVariantId: 5246862163,
    price: 4500,
  },
];

export async function POST(request: NextRequest) {
  let body: { productId?: string; size?: string; color?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { productId, size, color } = body;
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const variant =
    "variants" in product && product.variants
      ? product.variants.find((v) => v.size === size && v.color === color)
      : null;
  const price = variant ? variant.price : product.price;
  const printfulVariantId = variant
    ? variant.printfulVariantId
    : (product as { printfulVariantId: number }).printfulVariantId;

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
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "NL", "SE", "NO", "DK"],
    },
    metadata: {
      productId: product.id,
      printfulVariantId: String(printfulVariantId),
      size: size || "",
      color: color || "",
    },
    success_url: `${origin}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/merch`,
  });

  return NextResponse.json({ url: session.url });
}
