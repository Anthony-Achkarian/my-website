import { createHash } from "node:crypto";

/**
 * The Printful store that fulfils merch orders ("Anthony's Store").
 *
 * Sending it explicitly lets the integration work with either kind of
 * Printful private token: a store-level token ignores a matching store id,
 * and an account-level token requires it for store-scoped endpoints.
 */
export const PRINTFUL_STORE_ID = "16641829";

export function printfulHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env.PRINTFUL_API_KEY ?? ""}`,
    "Content-Type": "application/json",
    "X-PF-Store-Id": PRINTFUL_STORE_ID,
  };
}

/**
 * How a store variant is identified when ordering.
 *
 * Products created through the API are referenced by their numeric *sync
 * variant* id. Products created in the Printful dashboard only show their
 * text *external* id (e.g. "6ab3fe4da650b1", listed as "#6ab3fe4da650b1"),
 * so those are referenced that way instead. Both make Printful print the
 * store product's own design files.
 */
export type PrintfulRef = { syncVariantId: number } | { externalVariantId: string };

/** Reads whichever Printful id a catalogue entry (variant or simple product) carries. */
export function printfulRefOf(item: {
  printfulVariantId?: number;
  printfulExternalVariantId?: string;
}): PrintfulRef | null {
  if (item.printfulExternalVariantId) return { externalVariantId: item.printfulExternalVariantId };
  if (item.printfulVariantId) return { syncVariantId: item.printfulVariantId };
  return null;
}

/**
 * One unit of a product from our Printful store.
 *
 * Never send a store id as `variant_id`: Printful reads that field as a
 * *catalog* variant id, answers "Variant with id ... was not found", and the
 * order is rejected.
 */
export function printfulOrderItem(ref: PrintfulRef) {
  return "externalVariantId" in ref
    ? { external_variant_id: ref.externalVariantId, quantity: 1 }
    : { sync_variant_id: ref.syncVariantId, quantity: 1 };
}

/**
 * The order id we give Printful for a paid Stripe Checkout session.
 *
 * Printful order `external_id`s may be at most 32 characters of
 * [A-Za-z0-9_-] and must be unique per store. A Checkout session id is ~66
 * characters, so Printful rejects it. Use the session's PaymentIntent id
 * instead ("pi_…", 27 characters; also what you search for in the Stripe
 * dashboard) and fall back to a stable hash of the session id. The same
 * session always maps to the same id, so Stripe's webhook retries can't
 * create duplicate orders.
 */
export function printfulExternalId(session: {
  id: string;
  payment_intent: string | { id: string } | null;
}): string {
  const pi = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
  if (pi && /^[A-Za-z0-9_-]{1,32}$/.test(pi)) return pi;
  return createHash("sha256").update(session.id).digest("hex").slice(0, 32);
}
