import { atomWithMMKV } from "@/store/storage";
import type { Product } from "@/types";

// Persisted list of user-added products
export const userProductsAtom = atomWithMMKV<Product[]>("userProducts", []);

let idCounter = 1000;

export function buildProduct(params: {
  name: string;
  sku: string;
  kategori: string;
  hargaJual: string;
  stokAwal: string;
  hasVariant: boolean;
  isActive: boolean;
}): Product {
  idCounter += 1;
  return {
    id: String(idCounter),
    name: params.name,
    category: params.kategori as Product["category"],
    sku: params.sku,
    price: `Rp ${Number(params.hargaJual).toLocaleString("id-ID")}`,
    stock: Number(params.stokAwal) || 0,
    stockStatus: Number(params.stokAwal) === 0 ? "empty" : "normal",
    hasVariant: params.hasVariant,
    isNew: true,
  };
}
