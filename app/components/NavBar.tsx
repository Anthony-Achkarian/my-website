"use client";

import Link from "next/link";
import { useCart, formatCents } from "../cart-context";

export default function NavBar() {
  const { itemCount, totalPriceCents } = useCart();
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">Anthony Tees</Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:underline">Shop</Link>
          <Link href="/cart" className="relative hover:underline">
            Cart
            <span className="ml-2 inline-flex items-center rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
              {itemCount}
            </span>
          </Link>
          <span className="text-sm text-gray-600">{formatCents(totalPriceCents)}</span>
        </nav>
      </div>
    </header>
  );
}



