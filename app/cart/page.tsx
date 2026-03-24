"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, formatCents } from "../cart-context";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPriceCents } = useCart();

  if (items.length === 0) {
    return (
      <main>
        <h1 className="text-2xl font-semibold mb-2">Your cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>
        <Link className="mt-4 inline-block text-blue-600 hover:underline" href="/">Continue shopping</Link>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 bg-white">
            {item.imageSrc && (
              <div className="relative size-20 bg-gray-50">
                <Image src={item.imageSrc} alt={item.name} fill className="object-contain p-2" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="font-medium">{item.name}</h2>
              <p className="text-gray-600">{formatCents(item.price)}</p>
              <div className="mt-2 flex items-center gap-2">
                <label className="text-sm text-gray-600">Qty</label>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
                  className="w-20 rounded border border-gray-300 px-2 py-1"
                />
                <button className="ml-2 text-red-600 hover:underline" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
            <div className="font-medium">{formatCents(item.price * item.quantity)}</div>
          </div>
        ))}
      </section>
      <aside className="rounded-lg border border-gray-200 p-4 h-fit bg-white">
        <h3 className="text-lg font-semibold mb-2">Order summary</h3>
        <div className="flex items-center justify-between py-2">
          <span>Subtotal</span>
          <span>{formatCents(totalPriceCents)}</span>
        </div>
        <div className="text-xs text-gray-600">Shipping and taxes calculated at checkout.</div>
        <Link
          href="/checkout"
          className="mt-4 block text-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Checkout
        </Link>
      </aside>
    </main>
  );
}



