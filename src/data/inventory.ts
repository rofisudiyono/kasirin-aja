/**
 * Product inventory mock data
 */

import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Kopi Susu",
    category: "Minuman",
    sku: "KPS-001",
    price: "Rp 15.000 - Rp 25....",
    stock: 85,
    stockStatus: "normal",
    hasVariant: true,
  },
  {
    id: "2",
    name: "Nasi Goreng",
    category: "Makanan",
    sku: "NSG-009",
    price: "Rp 25.000",
    stock: 4,
    stockStatus: "low",
  },
  {
    id: "3",
    name: "Es Teh Manis",
    category: "Minuman",
    sku: "ETM-014",
    price: "Rp 8.000",
    stock: 0,
    stockStatus: "empty",
  },
  {
    id: "4",
    name: "Kentang Goreng",
    category: "Snack",
    sku: "KTG-022",
    price: "Rp 12.000",
    stock: 30,
    stockStatus: "normal",
  },
  {
    id: "5",
    name: "Ayam Bakar",
    category: "Makanan",
    sku: "AYB-030",
    price: "Rp 28.000",
    stock: 0,
    stockStatus: "inactive",
    isNew: true,
  },
];
