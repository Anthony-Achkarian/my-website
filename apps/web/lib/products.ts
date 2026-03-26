export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  image: string;
  category: string;
  // Printful variant ID — update these after creating products in Printful dashboard
  printfulVariantId: number;
  sizes?: string[];
};

export const products: Product[] = [
  {
    id: "ark-tee-black",
    name: "ARK Classic Tee",
    description: "Premium heavyweight cotton tee with the ARK Industries logo.",
    price: 3500, // $35.00
    image: "/merch/tee-black.png",
    category: "Apparel",
    printfulVariantId: 0, // TODO: replace with your Printful variant ID
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "ark-hoodie-black",
    name: "ARK Pullover Hoodie",
    description: "Heavyweight fleece hoodie with embroidered ARK Industries branding.",
    price: 6500, // $65.00
    image: "/merch/hoodie-black.png",
    category: "Apparel",
    printfulVariantId: 0, // TODO: replace with your Printful variant ID
    sizes: ["S", "M", "L", "XL", "2XL"],
  },
  {
    id: "ark-mug",
    name: "ARK Industries Mug",
    description: "11oz ceramic mug with the ARK Industries logo.",
    price: 2200, // $22.00
    image: "/merch/mug.png",
    category: "Accessories",
    printfulVariantId: 0, // TODO: replace with your Printful variant ID
  },
  {
    id: "ark-sticker-pack",
    name: "ARK Sticker Pack",
    description: "Set of 3 premium vinyl ARK Industries stickers.",
    price: 800, // $8.00
    image: "/merch/stickers.png",
    category: "Accessories",
    printfulVariantId: 0, // TODO: replace with your Printful variant ID
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);
