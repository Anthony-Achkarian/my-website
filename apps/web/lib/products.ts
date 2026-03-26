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
    image: "https://files.cdn.printful.com/files/87b/87b61f3779800fbe0f2efd57346cfc03_preview.png",
    category: "Apparel",
    colors: [
      { name: "French Navy", hex: "#1a2744" },
      { name: "Royal Blue", hex: "#2255cc" },
      { name: "Grey Melange", hex: "#9e9e9e" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    variants: [
      // French Navy
      { size: "S",   color: "French Navy",  printfulVariantId: 4932413503, price: 5500 },
      { size: "M",   color: "French Navy",  printfulVariantId: 4932413504, price: 5500 },
      { size: "L",   color: "French Navy",  printfulVariantId: 4932413505, price: 5500 },
      { size: "XL",  color: "French Navy",  printfulVariantId: 4932413506, price: 5500 },
      { size: "XXL", color: "French Navy",  printfulVariantId: 4932413507, price: 5800 },
      // Royal Blue
      { size: "S",   color: "Royal Blue",   printfulVariantId: 4932413508, price: 5500 },
      { size: "M",   color: "Royal Blue",   printfulVariantId: 4932413509, price: 5500 },
      { size: "L",   color: "Royal Blue",   printfulVariantId: 4932413510, price: 5500 },
      { size: "XL",  color: "Royal Blue",   printfulVariantId: 4932413511, price: 5500 },
      { size: "XXL", color: "Royal Blue",   printfulVariantId: 4932413512, price: 5800 },
      // Grey Melange
      { size: "S",   color: "Grey Melange", printfulVariantId: 4932413513, price: 5500 },
      { size: "M",   color: "Grey Melange", printfulVariantId: 4932413514, price: 5500 },
      { size: "L",   color: "Grey Melange", printfulVariantId: 4932413515, price: 5500 },
      { size: "XL",  color: "Grey Melange", printfulVariantId: 4932413516, price: 5500 },
      { size: "XXL", color: "Grey Melange", printfulVariantId: 4932413517, price: 5800 },
    ],
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getVariant = (product: Product, size: string, color: string) =>
  product.variants?.find((v) => v.size === size && v.color === color);
