"use client";

import { useState } from "react";
import { products, Product } from "../../lib/products";

function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes?.[1] ?? null);
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, size }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="merch-card">
      <div className="merch-card-image">
        <img src={product.image} alt={product.name} onError={(e) => {
          (e.target as HTMLImageElement).src = "/logo.png";
        }} />
        <span className="merch-category">{product.category}</span>
      </div>
      <div className="merch-card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        {product.sizes && (
          <div className="merch-sizes">
            {product.sizes.map((s) => (
              <button
                key={s}
                className={`merch-size-btn${size === s ? " active" : ""}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="merch-card-footer">
          <span className="merch-price">${(product.price / 100).toFixed(2)}</span>
          <button className="btn-primary merch-buy-btn" onClick={handleBuy} disabled={loading}>
            {loading ? "Loading..." : "Buy Now →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MerchPage() {
  return (
    <main className="merch-page">
      <div className="merch-hero">
        <div className="hero-badge">Limited Drops</div>
        <h1>ARK <span className="gradient-text">Merch</span></h1>
        <p>Wear the future. Every order ships directly to your door.</p>
      </div>
      <section className="merch-grid-section">
        <div className="container">
          <div className="merch-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
