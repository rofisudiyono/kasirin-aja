/**
 * Formatting utility functions
 * Shared across payment and receipt pages
 */

export {
  formatPrice,
  formatTimer,
  getCurrentDateTime,
} from "@/utils/format.utils";
export { generateOrderNumber, getCashSuggestions } from "@/utils/payment.utils";
