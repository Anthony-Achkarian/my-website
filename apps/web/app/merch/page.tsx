"use client";

import { useState } from "react";
import { products, Product, getVariant } from "../../lib/products";

// ── Merch card (Apparel / Accessories) ──────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes?.[1] ?? product.variants?.[0]?.size ?? "");
  const color = product.variants?.[0]?.color ?? "";
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

// ── Tactical / Defense product card ─────────────────────────────────────────
function TacticalCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
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

  const price = product.price ?? 0;

  return (
    <div className="tactical-card">
      <div className="tactical-card-image">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => { (e.target as HTMLImageElement).src = "/logo.png"; }}
        />
        <div className="tactical-overlay" />
        {product.badge && <span className="tactical-badge">{product.badge}</span>}
        <span className="tactical-category">{product.category}</span>
      </div>

      <div className="tactical-card-body">
        <div className="tactical-header">
          <h2>{product.name}</h2>
          <span className="tactical-price">${(price / 100).toFixed(2)}</span>
        </div>
        <p className="tactical-desc">{product.description}</p>

        {product.specs && (
          <div className="tactical-specs">
            {product.specs.map((s) => (
              <div key={s.label} className="tactical-spec">
                <span className="spec-label">{s.label}</span>
                <span className="spec-value">{s.value}</span>
              </div>
            ))}
          </div>
        )}

        <button
          className="btn-primary tactical-buy-btn"
          onClick={handleBuy}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Order Now →"}
        </button>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function MerchPage() {
  const defenseProducts = products.filter((p) => p.category === "Defense");
  const merchProducts   = products.filter((p) => p.category !== "Defense");

  return (
    <main className="merch-page">
      <div className="merch-hero">
        <div className="hero-badge">ARK Store</div>
        <h1>ARK <span className="gradient-text">Products</span></h1>
        <p>Hardware, apparel, and gear engineered for the future.</p>
      </div>

      {/* ── Defense / Tech Section ── */}
      {defenseProducts.length > 0 && (
        <section className="defense-section">
          <div className="container">
            <div className="section-label">
              <span className="section-label-dot" />
              Defense &amp; Technology
            </div>
            {defenseProducts.map((p) => (
              <TacticalCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ── Merch Section ── */}
      <section className="merch-grid-section">
        <div className="container">
          <div className="section-label">
            <span className="section-label-dot" />
            Apparel &amp; Accessories
          </div>
          <div className="merch-grid">
            {merchProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
