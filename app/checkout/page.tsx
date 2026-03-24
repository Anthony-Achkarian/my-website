"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, formatCents } from "../cart-context";

export default function CheckoutPage() {
  const { items, totalPriceCents, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");

  function handlePlaceOrder() {
    setStatus("processing");
    setTimeout(() => {
      clearCart();
      setStatus("success");
    }, 800);
  }

  if (status === "success") {
    return (
      <main className="max-w-xl">
        <h1 className="text-2xl font-semibold mb-2">Order placed 🎉</h1>
        <p className="text-gray-600">We emailed you a receipt. Thanks for your purchase!</p>
        <Link className="mt-4 inline-block text-blue-600 hover:underline" href="/">Back to shop</Link>
      </main>
    );
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section className="lg:col-span-2">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="First name" className="rounded border border-gray-300 px-3 py-2" />
            <input placeholder="Last name" className="rounded border border-gray-300 px-3 py-2" />
          </div>
          <input placeholder="Email" type="email" className="w-full rounded border border-gray-300 px-3 py-2" />
          <input placeholder="Address" className="w-full rounded border border-gray-300 px-3 py-2" />
          <div className="grid grid-cols-3 gap-4">
            <input placeholder="City" className="rounded border border-gray-300 px-3 py-2" />
            <input placeholder="State" className="rounded border border-gray-300 px-3 py-2" />
            <input placeholder="ZIP" className="rounded border border-gray-300 px-3 py-2" />
          </div>
          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={status === "processing" || items.length === 0}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {status === "processing" ? "Placing order..." : "Place order"}
          </button>
        </form>
      </section>
      <aside className="rounded-lg border border-gray-200 p-4 h-fit bg-white">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        {items.length === 0 ? (
          <p className="text-gray-600">No items in cart.</p>
        ) : (
          <div className="space-y-1">
            {items.map((it) => (
              <div key={it.id} className="flex items-center justify-between">
                <span>
                  {it.name} × {it.quantity}
                </span>
                <span>{formatCents(it.price * it.quantity)}</span>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between font-medium">
              <span>Total</span>
              <span>{formatCents(totalPriceCents)}</span>
            </div>
          </div>
        )}
      </aside>
    </main>
  );
}



