/**
 * Catalog stock tracking
 * Maps productId -> current stock count (persisted)
 * Initialized from catalog default stock values; decremented after each transaction.
 */

import { atomWithMMKV } from "@/store/storage";
import { catalogProducts } from "../api/catalog.data";

// Default stock by status
function defaultStockForStatus(status: string): number {
  if (status === "empty") return 0;
  if (status === "low") return 5;
  return 50;
}

// Build initial stock map from catalog data
const initialStockMap: Record<string, number> = {};
for (const p of catalogProducts) {
  initialStockMap[p.id] = defaultStockForStatus(p.stockStatus);
}

// Persisted stock map: productId -> quantity
export const catalogStockAtom = atomWithMMKV<Record<string, number>>(
  "catalogStock",
  initialStockMap,
);
