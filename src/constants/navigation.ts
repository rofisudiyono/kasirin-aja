/**
 * Tab navigation configuration
 */

import type { Ionicons } from "@expo/vector-icons";
import type React from "react";

export interface TabConfig {
  active: React.ComponentProps<typeof Ionicons>["name"];
  inactive: React.ComponentProps<typeof Ionicons>["name"];
}

export const TAB_ICONS: Record<string, TabConfig> = {
  index: { active: "home", inactive: "home-outline" },
  transaksi: { active: "receipt", inactive: "receipt-outline" },
  inventori: { active: "cube", inactive: "cube-outline" },
  pengaturan: { active: "settings", inactive: "settings-outline" },
};

export const TAB_LABELS: Record<string, string> = {
  index: "Home",
  transaksi: "Transaksi",
  inventori: "Inventori",
  pengaturan: "Pengaturan",
};
