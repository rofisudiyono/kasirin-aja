/**
 * Formatting utility functions
 * Shared across payment and receipt pages
 */

/**
 * Format number as Indonesian Rupiah currency
 * @example formatPrice(18000) => "Rp 18.000"
 */
export function formatPrice(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

/**
 * Format seconds as MM:SS timer display
 * @example formatTimer(305) => "05:05"
 */
export function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

/**
 * Get current date and time in Indonesian format
 * @example getCurrentDateTime() => "Senin, 24 Mar 2025 • 14:30 WIB"
 */
export function getCurrentDateTime(): string {
  const now = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const mins = now.getMinutes().toString().padStart(2, "0");
  return `${day}, ${date} ${month} ${year} • ${hours}:${mins} WIB`;
}

/**
 * Generate a random transaction order number
 * @example generateOrderNumber() => "#TRX-0042"
 */
export function generateOrderNumber(): string {
  const num = Math.floor(Math.random() * 9999) + 1;
  return `#TRX-${num.toString().padStart(4, "0")}`;
}
