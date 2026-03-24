"use client";

import Image from "next/image";
import { useCart, formatCents } from "./cart-context";

const PRODUCTS = [
  {
    id: "tee-classic-black",
    name: "Classic Tee — Black",
    price: 2500,
    imageSrc: "/vercel.svg",
  },
  {
    id: "tee-classic-white",
    name: "Classic Tee — White",
    price: 2500,
    imageSrc: "/next.svg",
  },
  {
    id: "tee-globe",
    name: "Globe Tee",
    price: 2800,
    imageSrc: "/globe.svg",
  },
  {
    id: "tee-window",
    name: "Window Tee",
    price: 3000,
    imageSrc: "/window.svg",
  },
];

export default function Home() {
  const { addToCart } = useCart();

  return (
    <main>
      <section className="mb-8">
        <h1 className="text-3xl font-semibold">T‑Shirts</h1>
        <p className="text-gray-600">Soft, premium tees. Ships worldwide.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white">
            <div className="aspect-square relative mb-3 bg-gray-50">
              <Image src={p.imageSrc} alt={p.name} fill className="object-contain p-6" />
            </div>
            <h2 className="text-lg font-medium">{p.name}</h2>
            <p className="text-gray-600 mb-3">{formatCents(p.price)}</p>
            <button
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, imageSrc: p.imageSrc }, 1)}
            >
              Add to cart
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
