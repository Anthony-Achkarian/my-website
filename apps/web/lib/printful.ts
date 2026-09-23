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
 * One unit of a product from our Printful store.
 *
 * The ids in lib/products.ts are store *sync variant* ids, so they must be
 * sent as `sync_variant_id`. Printful's `variant_id` field means a catalog
 * variant id; sending a sync id there fails with "Variant with id ... was
 * not found" and the order is rejected. `sync_variant_id` also makes Printful
 * print the store product's own design files.
 */
export function printfulOrderItem(syncVariantId: number) {
  return { sync_variant_id: syncVariantId, quantity: 1 };
}
