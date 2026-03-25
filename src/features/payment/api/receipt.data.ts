import type { ReceiptItem, StoreInfo } from "@/shared/types";

export const mockReceiptItems: ReceiptItem[] = [
  { name: "Kopi Susu (Medium, Ice)", qty: 2, price: 44000 },
  { name: "Nasi Goreng", qty: 1, price: 25000 },
  { name: "Es Teh Manis", qty: 1, price: 8000 },
];

export const storeInfo: StoreInfo = {
  name: "Toko Makmur",
  address: "Jl. Sudirman No. 12, Banyuwangi",
  phone: "Telp: 0812-3456-7890",
};
