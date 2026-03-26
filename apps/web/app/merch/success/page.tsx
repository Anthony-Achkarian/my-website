export default function OrderSuccess() {
  return (
    <main className="merch-success-page">
      <div className="merch-success-inner">
        <div className="merch-success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p>
          Your order is being sent to our manufacturer now. You'll receive a shipping
          confirmation email once it's on its way.
        </p>
        <div className="merch-success-actions">
          <a href="/merch" className="btn-primary">Shop More →</a>
          <a href="/" className="btn-secondary">Back to Home</a>
        </div>
      </div>
    </main>
  );
}
