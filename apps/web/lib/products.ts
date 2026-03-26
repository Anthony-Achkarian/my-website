export type ProductVariant = {
  size: string;
  color: string;
  printfulVariantId: number;
  price: number; // in cents
};

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  variants?: ProductVariant[];
  // For simple products with no size/color options
  printfulVariantId?: number;
  price?: number;
};

export const products: Product[] = [
  {
    id: "ark-sweatshirt",
    name: "ARK Organic Sweatshirt",
    description: "Unisex organic cotton sweatshirt with the ARK Industries logo. Sustainably made.",
    image: "https://files.cdn.printful.com/files/a92/a92c36655784a86310d41b87180109c1_preview.png",
    category: "Apparel",
    sizes: ["S", "M", "L", "XL", "2XL"],
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
    category: "Apparel",
    sizes: ["S", "M", "L", "XL", "2XL"],
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
    category: "Apparel",
    sizes: ["S", "M", "L", "XL", "2XL"],
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
    category: "Accessories",
    printfulVariantId: 5246862162,
    price: 2500,
  },
  {
    id: "ark-water-bottle",
    name: "ARK Water Bottle",
    description: "Stainless steel 17oz water bottle with the ARK Industries logo in white. Keeps drinks cold or hot.",
    image: "https://files.cdn.printful.com/files/7f7/7f7d72c6f8c8fb4d6588458b7bbbdadc_preview.png",
    category: "Accessories",
    printfulVariantId: 5246862163,
    price: 4500,
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getVariant = (product: Product, size: string, color: string) =>
  product.variants?.find((v) => v.size === size && v.color === color);
