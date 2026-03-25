/**
 * StatsRow — Horizontal stat items separated by vertical dividers
 *
 * Used in Transaksi summary, Inventori summary, and Pengaturan profile card.
 * Supports both dark (colored bg) and light (card bg) variants.
 */
import React from "react";
import { XStack, YStack } from "tamagui";

import { ColorBase, ColorPrimary } from "@/themes/Colors";

import {
  TextBodySm,
  TextH2,
  TextH3,
} from "@/components/atoms/Typography";

export interface StatItem {
  label: string;
  value: string | number;
  /** Tamagui color token or hex. Default "$color" */
  valueColor?: string;
  /** Use TextH3 size instead of TextH2. Default false */
  smallValue?: boolean;
  /** flex weight, default 1 */
  flex?: number;
}

export interface StatsRowProps {
  items: StatItem[];
  /** "dark" → white divider; "light" → $borderColor divider. Default "light" */
  variant?: "dark" | "light";
  labelColor?: string;
}

export function StatsRow({
  items,
  variant = "light",
  labelColor,
}: StatsRowProps) {
  const dividerColor =
    variant === "dark" ? "rgba(255,255,255,0.3)" : "$borderColor";
  const resolvedLabelColor =
    labelColor ??
    (variant === "dark" ? ColorPrimary.primary200 : "$colorSecondary");

  return (
    <XStack alignItems="center">
      {items.map((item, idx) => (
        <React.Fragment key={item.label}>
          {idx > 0 && (
            <YStack width={1} height={40} backgroundColor={dividerColor} />
          )}
          <YStack flex={item.flex ?? 1} alignItems="center" gap={4}>
            <TextBodySm color={resolvedLabelColor}>{item.label}</TextBodySm>
            {item.smallValue ? (
              <TextH3
                fontWeight="700"
                color={item.valueColor ?? ColorBase.white}
              >
                {item.value}
              </TextH3>
            ) : (
              <TextH2
                fontWeight="700"
                color={item.valueColor ?? ColorBase.white}
              >
                {item.value}
              </TextH2>
            )}
          </YStack>
        </React.Fragment>
      ))}
    </XStack>
  );
}
