import { CATEGORY_COLORS } from "@/config/categoryStyles";
import { ColorNeutral } from "@/themes/Colors";
import type { ProductCategory } from "@/types";

export function heroBgColor(category: ProductCategory): string {
  return CATEGORY_COLORS[category]?.bg ?? ColorNeutral.neutral100;
}

export function heroBgIconColor(category: ProductCategory): string {
  return CATEGORY_COLORS[category]?.color ?? ColorNeutral.neutral400;
}

export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}
