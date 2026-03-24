/**
 * StatusBadge — Transaction status pill
 *
 * Shared between Home and Transaksi pages.
 * Replaces the duplicated StatusBadge local component.
 */
import React from "react";
import { YStack } from "tamagui";

import type { TxStatus } from "@/types";
import { TextBodySm } from "../atoms/Typography";

const STATUS_MAP: Record<TxStatus, { bg: string; color: string }> = {
  Lunas: { bg: "#DCFCE7", color: "#16A34A" },
  Void: { bg: "#FEE2E2", color: "#DC2626" },
  Refund: { bg: "#FFEDD5", color: "#EA580C" },
};

export function StatusBadge({ status }: { status: TxStatus }) {
  const style = STATUS_MAP[status] ?? { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <YStack
      backgroundColor={style.bg}
      borderRadius={20}
      paddingHorizontal={10}
      paddingVertical={4}
    >
      <TextBodySm fontWeight="600" color={style.color}>
        {status}
      </TextBodySm>
    </YStack>
  );
}
