import type Stripe from "stripe";

export type ShippingAddress = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
};

export type ShippingDetails = {
  name?: string | null;
  address?: ShippingAddress | null;
};

/**
 * Where a Checkout Session carries the customer's shipping address depends on
 * the API version it was rendered with. Stripe's 2025-03-31.basil release
 * removed the top-level `shipping_details` field and moved it to
 * `collected_information.shipping_details`.
 *
 * Webhook payloads are rendered in the *endpoint's* API version, so a live
 * endpoint created today and an older test endpoint can send different shapes.
 * Read the current location first and fall back to the legacy one.
 */
export function getShippingDetails(session: Stripe.Checkout.Session): ShippingDetails | null {
  const legacy = (session as Stripe.Checkout.Session & { shipping_details?: ShippingDetails | null })
    .shipping_details;
  return session.collected_information?.shipping_details ?? legacy ?? null;
}
