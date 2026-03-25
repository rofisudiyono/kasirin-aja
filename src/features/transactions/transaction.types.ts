/**
 * Transaction types
 */

export type TxStatus = "Lunas" | "Void" | "Refund";

export interface ReceiptItem {
  name: string;
  qty: number;
  price: number;
}

export interface StoreInfo {
  name: string;
  address: string;
  phone: string;
}

export interface Transaction {
  id: string;
  time: string;
  table?: string;
  amount: string;
  status: TxStatus;
  items?: string;
  paymentMethod?: string;
}
