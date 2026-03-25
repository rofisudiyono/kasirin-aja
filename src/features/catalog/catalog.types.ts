/**
 * Catalog and menu types
 */

import type { StockStatus } from "@/features/inventory/inventory.types";
import type { ProductCategory } from "./category.types";

export type CatalogStockStatus = Exclude<StockStatus, "inactive">;

export interface VariantOption {
  id: string;
  label: string;
  priceAdd: number;
}

export interface VariantGroup {
  name: string;
  options: VariantOption[];
}

export interface CatalogProduct {
  id: string;
  name: string;
  category: ProductCategory;
  basePrice: number;
  stockStatus: CatalogStockStatus;
  variants?: VariantGroup[];
  barcode?: string;
}
