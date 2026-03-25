/**
 * Formatting utility functions
 * Shared across payment and receipt pages
 */

export {
  formatPrice,
  formatTimer,
  getCurrentDateTime,
} from "@/shared/utils/format.utils";
export {
  generateOrderNumber,
  getCashSuggestions,
} from "@/shared/utils/payment.utils";
