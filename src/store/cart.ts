import { atom } from "jotai";

export interface CartItem {
  cartId: string;
  productId: string;
  productName: string;
  category: "Makanan" | "Minuman" | "Snack";
  variantLabel?: string;
  note?: string;
  quantity: number;
  unitPrice: number;
}

export const cartAtom = atom<CartItem[]>([]);
