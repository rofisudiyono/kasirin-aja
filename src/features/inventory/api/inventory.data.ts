/**
 * Product inventory mock data
 */

import type { Product, ProductDetail, SortOption } from "@/types";

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

export const inventorySortOptions: SortOption[] = [
  "Nama A-Z",
  "Stok",
  "Terbaru",
];

export const productDetails: Record<string, ProductDetail> = {
  "1": {
    id: "1",
    name: "Kopi Susu",
    category: "Minuman",
    sku: "KPS-001",
    costPrice: 8000,
    sellPrice: 15000,
    status: "active",
    description:
      "Kopi susu segar dengan pilihan ukuran dan suhu sesuai selera pelanggan.",
    totalStock: 85,
    lowStockThreshold: 5,
    createdAt: "12 Jan 2025",
    updatedAt: "20 Mar 2025",
    totalSold: 342,
    variants: [
      {
        name: "Ukuran",
        priceMode: "total",
        options: [
          { id: "s", label: "Small", priceAdd: 0, stock: 30 },
          { id: "m", label: "Medium", priceAdd: 5000, stock: 25 },
          { id: "l", label: "Large", priceAdd: 10000, stock: 4 },
        ],
      },
      {
        name: "Suhu",
        priceMode: "addon",
        options: [
          { id: "hot", label: "Hot", priceAdd: 0, stock: 35 },
          { id: "ice", label: "Ice", priceAdd: 2000, stock: 24 },
        ],
      },
    ],
  },
  "2": {
    id: "2",
    name: "Nasi Goreng",
    category: "Makanan",
    sku: "NSG-009",
    costPrice: 12000,
    sellPrice: 25000,
    status: "active",
    description:
      "Nasi goreng spesial dengan bumbu rahasia dan telur mata sapi.",
    totalStock: 4,
    lowStockThreshold: 5,
    createdAt: "5 Feb 2025",
    updatedAt: "18 Mar 2025",
    totalSold: 210,
  },
};
