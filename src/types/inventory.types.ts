/**
 * Inventory and product types
 */

import type { ProductCategory } from "./category.types";

export type StockStatus = "normal" | "low" | "empty" | "inactive";
export type CategoryFilter = "Semua" | "Makanan" | "Minuman" | "Snack";
export type SortOption = "Nama A-Z" | "Stok" | "Terbaru";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  sku: string;
  price: string;
  stock: number;
  stockStatus: StockStatus;
  hasVariant?: boolean;
  isNew?: boolean;
}
