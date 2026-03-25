/**
 * Generate a random transaction order number.
 */
export function generateOrderNumber(): string {
  const orderNumber = Math.floor(Math.random() * 9999) + 1;

  return `#TRX-${orderNumber.toString().padStart(4, "0")}`;
}

/**
 * Build unique cash payment suggestions based on the transaction total.
 */
export function getCashSuggestions(total: number): number[] {
  return [
    Math.ceil(total / 10000) * 10000 - 10000,
    Math.ceil(total / 10000) * 10000,
    Math.ceil(total / 50000) * 50000,
    Math.ceil(total / 100000) * 100000,
  ].filter(
    (value, index, values) => value > 0 && values.indexOf(value) === index,
  );
}
