/**
 * Transaction types
 */

export type TxStatus = "Lunas" | "Void" | "Refund";

export interface Transaction {
  id: string;
  time: string;
  table?: string;
  amount: string;
  status: TxStatus;
  items?: string;
}
