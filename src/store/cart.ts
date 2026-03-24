import type { ProductCategory } from "@/types";
import { atom } from "jotai";

export interface CartItem {
  cartId: string;
  productId: string;
  productName: string;
  category: ProductCategory;
  variantLabel?: string;
  note?: string;
  quantity: number;
  unitPrice: number;
}

export const cartAtom = atom<CartItem[]>([]);
