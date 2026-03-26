/**
 * Settings page types
 */

import type { IoniconName } from "@/types/icons.types";

export type { IoniconName };

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
  onPress?: () => void;
}
