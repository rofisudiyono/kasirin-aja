/**
 * Inventory and product types
 */

import type { ProductCategory } from "@/features/catalog/category.types";

export type StockStatus = "normal" | "low" | "empty" | "inactive";
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

export interface ProductVariantOption {
  id: string;
  label: string;
  priceAdd: number;
  stock: number;
}

export interface ProductVariantGroup {
  name: string;
  /** "total" = display basePrice+priceAdd; "addon" = display +priceAdd only when > 0 */
  priceMode: "total" | "addon";
  options: ProductVariantOption[];
}

export interface ProductDetail {
  id: string;
  name: string;
  category: ProductCategory;
  sku: string;
  costPrice: number;
  sellPrice: number;
  status: "active" | "inactive";
  description: string;
  variants?: ProductVariantGroup[];
  totalStock: number;
  lowStockThreshold: number;
  createdAt: string;
  updatedAt: string;
  totalSold: number;
}
