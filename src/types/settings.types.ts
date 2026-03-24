/**
 * Settings page types
 */

import type { Ionicons } from "@expo/vector-icons";
import type React from "react";

export type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export interface SettingRowProps {
  iconName: IoniconName;
  iconBg: string;
  iconColor?: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  badgeBg?: string;
  value?: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (val: boolean) => void;
  showChevron?: boolean;
}
