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
  {
    id: "ark-tshirt",
    name: "ARK Organic T-Shirt",
    description: "Unisex organic cotton tee with the ARK Industries logo. Lightweight and sustainably made.",
    image: "https://files.cdn.printful.com/o/upload/product-catalog-img/e0/e09771b7c272546bbf374f4d2c67c11c_l",
    category: "Apparel",
    colors: [
      { name: "Black",        hex: "#1a1a1a" },
      { name: "French Navy",  hex: "#1a2744" },
      { name: "Heather Grey", hex: "#b0b0b0" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    variants: [
      // Black
      { size: "S",   color: "Black",        printfulVariantId: 5246858340, price: 3500 },
      { size: "M",   color: "Black",        printfulVariantId: 5246858341, price: 3500 },
      { size: "L",   color: "Black",        printfulVariantId: 5246858342, price: 3500 },
      { size: "XL",  color: "Black",        printfulVariantId: 5246858343, price: 3500 },
      { size: "2XL", color: "Black",        printfulVariantId: 5246858344, price: 3800 },
      // French Navy
      { size: "S",   color: "French Navy",  printfulVariantId: 5246858346, price: 3500 },
      { size: "M",   color: "French Navy",  printfulVariantId: 5246858347, price: 3500 },
      { size: "L",   color: "French Navy",  printfulVariantId: 5246858348, price: 3500 },
      { size: "XL",  color: "French Navy",  printfulVariantId: 5246858349, price: 3500 },
      { size: "2XL", color: "French Navy",  printfulVariantId: 5246858350, price: 3800 },
      // Heather Grey
      { size: "S",   color: "Heather Grey", printfulVariantId: 5246858351, price: 3500 },
      { size: "M",   color: "Heather Grey", printfulVariantId: 5246858353, price: 3500 },
      { size: "L",   color: "Heather Grey", printfulVariantId: 5246858354, price: 3500 },
      { size: "XL",  color: "Heather Grey", printfulVariantId: 5246858355, price: 3500 },
      { size: "2XL", color: "Heather Grey", printfulVariantId: 5246858356, price: 3800 },
    ],
  },
  {
    id: "ark-hoodie",
    name: "ARK Organic Hoodie",
    description: "Unisex organic mid-weight hoodie with the ARK Industries logo. Cozy and sustainably made.",
    image: "https://files.cdn.printful.com/o/upload/product-catalog-img/04/049e8b8b76e5dcd4c5eb60ecb57afe21_l",
    category: "Apparel",
    colors: [
      { name: "Black",        hex: "#1a1a1a" },
      { name: "French Navy",  hex: "#1a2744" },
      { name: "Heather Grey", hex: "#b0b0b0" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    variants: [
      // Black
      { size: "S",   color: "Black",        printfulVariantId: 5246858375, price: 6500 },
      { size: "M",   color: "Black",        printfulVariantId: 5246858390, price: 6500 },
      { size: "L",   color: "Black",        printfulVariantId: 5246858405, price: 6500 },
      { size: "XL",  color: "Black",        printfulVariantId: 5246858415, price: 6500 },
      { size: "2XL", color: "Black",        printfulVariantId: 5246858416, price: 6800 },
      // French Navy
      { size: "S",   color: "French Navy",  printfulVariantId: 5246858417, price: 6500 },
      { size: "M",   color: "French Navy",  printfulVariantId: 5246858418, price: 6500 },
      { size: "L",   color: "French Navy",  printfulVariantId: 5246858419, price: 6500 },
      { size: "XL",  color: "French Navy",  printfulVariantId: 5246858420, price: 6500 },
      { size: "2XL", color: "French Navy",  printfulVariantId: 5246858421, price: 6800 },
      // Heather Grey
      { size: "S",   color: "Heather Grey", printfulVariantId: 5246858422, price: 6500 },
      { size: "M",   color: "Heather Grey", printfulVariantId: 5246858423, price: 6500 },
      { size: "L",   color: "Heather Grey", printfulVariantId: 5246858424, price: 6500 },
      { size: "XL",  color: "Heather Grey", printfulVariantId: 5246858425, price: 6500 },
      { size: "2XL", color: "Heather Grey", printfulVariantId: 5246858426, price: 6800 },
    ],
  },
  {
    id: "ark-mug",
    name: "ARK Mug",
    description: "White glossy 11oz mug with the ARK Industries logo. Perfect for your morning coffee.",
    image: "https://files.cdn.printful.com/o/upload/product-catalog-img/8c/8c4ac4a450b8485bc8a6e041a5a23666_l",
    category: "Accessories",
    printfulVariantId: 5246858594,
    price: 2500,
  },
  {
    id: "ark-water-bottle",
    name: "ARK Water Bottle",
    description: "Stainless steel 17oz water bottle with the ARK Industries logo. Keeps drinks cold or hot.",
    image: "https://files.cdn.printful.com/o/products/382/product_1614007264.jpg",
    category: "Accessories",
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#f5f5f5" },
    ],
    variants: [
      { size: "17 oz", color: "Black", printfulVariantId: 5246858595, price: 4500 },
      { size: "17 oz", color: "White", printfulVariantId: 5246858596, price: 4500 },
    ],
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const getVariant = (product: Product, size: string, color: string) =>
  product.variants?.find((v) => v.size === size && v.color === color);
