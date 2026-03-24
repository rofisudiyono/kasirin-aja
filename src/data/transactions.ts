/**
 * Transaction history mock data
 * Used in both home page and transaksi page
 */

import type { Transaction } from "@/types";

export const recentTransactions: Transaction[] = [
  { id: "#0021", time: "10:12 WIB", amount: "Rp 120.000", status: "Lunas" },
  { id: "#0020", time: "09:48 WIB", amount: "Rp 85.000", status: "Lunas" },
  { id: "#0019", time: "09:15 WIB", amount: "Rp 42.000", status: "Void" },
];

export const transactionListMock: Transaction[] = [
  {
    id: "#TRX-0024",
    time: "14:32 WIB",
    table: "Meja 3",
    items: "Kopi Susu x2, Nasi Goreng x1",
    amount: "Rp 88.800",
    status: "Lunas",
  },
  {
    id: "#TRX-0023",
    time: "14:10 WIB",
    table: "Meja 1",
    items: "Ayam Geprek x1, Es Jeruk x1",
    amount: "Rp 45.000",
    status: "Void",
  },
  {
    id: "#TRX-0022",
    time: "13:15 WIB",
    table: "Tanpa nama pelanggan",
    items: "Mie Ayam x1, Teh Manis x1",
    amount: "Rp 32.000",
    status: "Lunas",
  },
  {
    id: "#TRX-0021",
    time: "12:48 WIB",
    table: "Take Away",
    items: "Kopi Hitam x1, Roti Bakar x1",
    amount: "Rp 28.000",
    status: "Refund",
  },
];
