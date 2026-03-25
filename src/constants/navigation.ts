/**
 * Tab navigation configuration
 */

import type { TabConfig } from "@/types";

export const TAB_ICONS: Record<string, TabConfig> = {
  index: { active: "home", inactive: "home-outline" },
  transaksi: { active: "receipt", inactive: "receipt-outline" },
  inventory: { active: "cube", inactive: "cube-outline" },
  pengaturan: { active: "settings", inactive: "settings-outline" },
};

export const TAB_LABELS: Record<string, string> = {
  index: "Home",
  transaksi: "Transaksi",
  inventory: "Inventori",
  pengaturan: "Pengaturan",
};
