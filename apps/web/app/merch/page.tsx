"use client";

import { useState } from "react";
import { products, Product, getVariant } from "../../lib/products";

function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes?.[1] ?? "");
  const [color, setColor] = useState(product.colors?.[0]?.name ?? "");
  const [loading, setLoading] = useState(false);

  const variant = product.variants ? getVariant(product, size, color) : null;
  const price = variant?.price ?? product.price ?? 0;

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, size, color }),
      });
      const { url, error } = await res.json();
      if (url) window.location.href = url;
      else console.error(error);
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

        {product.colors && (
          <div className="merch-colors">
            {product.colors.map((c) => (
              <button
                key={c.name}
                className={`merch-color-btn${color === c.name ? " active" : ""}`}
                style={{ background: c.hex }}
                title={c.name}
                onClick={() => setColor(c.name)}
              />
            ))}
            <span className="merch-color-label">{color}</span>
          </div>
        )}

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
          <span className="merch-price">${(price / 100).toFixed(2)}</span>
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
