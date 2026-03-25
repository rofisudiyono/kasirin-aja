import { atomWithMMKV } from "@/shared/store/storage";
import { useAtom } from "jotai";
import type { Transaction, TxStatus } from "@/shared/types";

export const transactionsAtom = atomWithMMKV<Transaction[]>("transactions", []);

let txCounter = 1;

export function buildTransaction(
  params: {
    total: number;
    items: string;
    method: string;
    orderType?: string;
    customerName?: string;
  },
  existingCount: number,
): Transaction {
  const pad = String(existingCount + 1).padStart(4, "0");
  const now = new Date();
  const time =
    now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) +
    " WIB";
  return {
    id: `#TRX-${pad}`,
    time,
    table: params.customerName || params.orderType || "Tanpa nama",
    items: params.items,
    amount: `Rp ${params.total.toLocaleString("id-ID")}`,
    status: "Lunas",
    paymentMethod: params.method,
  };
}
