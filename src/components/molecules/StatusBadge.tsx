/**
 * StatusBadge — Transaction status pill
 *
 * Shared between Home and Transaksi pages.
 * Replaces the duplicated StatusBadge local component.
 */
import React from "react";
import { YStack } from "tamagui";

import {
  ColorAccentOrange,
  ColorDanger,
  ColorGreen,
  ColorNeutral,
} from "@/themes/Colors";
import type { TxStatus } from "@/types";
import { TextBodySm } from "../atoms/Typography";

const STATUS_MAP: Record<TxStatus, { bg: string; color: string }> = {
  Lunas: { bg: ColorGreen.green100, color: ColorGreen.green600 },
  Void: { bg: ColorDanger.danger100, color: ColorDanger.danger600 },
  Refund: {
    bg: ColorAccentOrange.orange100,
    color: ColorAccentOrange.orange600,
  },
};

export function StatusBadge({ status }: { status: TxStatus }) {
  const style = STATUS_MAP[status] ?? {
    bg: ColorNeutral.neutral100,
    color: ColorNeutral.neutral500,
  };
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
