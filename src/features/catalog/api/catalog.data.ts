/**
 * Catalog/menu mock data
 * Used in transaksi-baru (create new transaction) page
 */

import type { CatalogProduct } from "@/shared/types";

export const catalogProducts: CatalogProduct[] = [
  {
    id: "1",
    name: "Es Kopi Susu Gula Aren",
    category: "Minuman",
    basePrice: 18000,
    stockStatus: "normal",
    barcode: "8901234560001",
  },
  {
    id: "2",
    name: "Nasi Ayam Crispy Sambal",
    category: "Makanan",
    basePrice: 22000,
    stockStatus: "normal",
    barcode: "8901234560002",
  },
  {
    id: "3",
    name: "Keripik Kentang BBQ",
    category: "Snack",
    basePrice: 12000,
    stockStatus: "low",
    barcode: "8901234560003",
  },
  {
    id: "4",
    name: "Air Mineral 600ml",
    category: "Minuman",
    basePrice: 5000,
    stockStatus: "empty",
    barcode: "8901234560004",
  },
  {
    id: "5",
    name: "Kopi Susu",
    category: "Minuman",
    basePrice: 15000,
    stockStatus: "normal",
    barcode: "8901234560005",
    variants: [
      {
        name: "Ukuran",
        options: [
          { id: "s", label: "Small", priceAdd: 0 },
          { id: "m", label: "Medium", priceAdd: 5000 },
          { id: "l", label: "Large", priceAdd: 10000 },
        ],
      },
      {
        name: "Suhu",
        options: [
          { id: "hot", label: "Hot", priceAdd: 0 },
          { id: "ice", label: "Ice", priceAdd: 2000 },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Nasi Goreng Spesial",
    category: "Makanan",
    basePrice: 25000,
    stockStatus: "normal",
    barcode: "8901234560006",
  },
  {
    id: "7",
    name: "Teh Tarik",
    category: "Minuman",
    basePrice: 10000,
    stockStatus: "normal",
    barcode: "8901234560007",
  },
  {
    id: "8",
    name: "Kentang Goreng",
    category: "Snack",
    basePrice: 12000,
    stockStatus: "normal",
    barcode: "8901234560008",
  },
];
