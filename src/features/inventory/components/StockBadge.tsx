/**
 * StockBadge — Display product stock status
 *
 * Shows "Habis", "Tipis", "Nonaktif" for different stock states
 */
import React from "react";
import { YStack } from "tamagui";

import { STOCK_BADGE } from "@/config/categoryStyles";
import { TextCaption } from "@/components/atoms/Typography";
import type { StockStatus } from "@/types";

interface StockBadgeProps {
  stockStatus: StockStatus;
}

export function StockBadge({ stockStatus }: StockBadgeProps) {
  const badge = STOCK_BADGE[stockStatus];
  if (!badge) return null;
  return (
    <YStack
      backgroundColor={badge.bg}
      borderRadius={20}
      paddingHorizontal={8}
      paddingVertical={3}
    >
      <TextCaption fontWeight="600" color={badge.color}>
        {badge.label}
      </TextCaption>
    </YStack>
  );
}
