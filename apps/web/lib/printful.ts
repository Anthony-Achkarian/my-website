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
