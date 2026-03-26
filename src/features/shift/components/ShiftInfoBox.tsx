import React from "react";
import { YStack } from "tamagui";

import { TextBodyLg, TextBodySm } from "@/components";
import { ColorBase, ColorPrimary } from "@/themes/Colors";

interface ShiftInfoBoxProps {
  label: string;
  value: string;
  valueColor?: string;
}

/**
 * Info box kecil untuk ringkasan shift (tampil di atas card primary).
 */
export function ShiftInfoBox({ label, value, valueColor }: ShiftInfoBoxProps) {
  return (
    <YStack
      flex={1}
      backgroundColor="rgba(255,255,255,0.15)"
      borderRadius={10}
      padding={12}
      gap={4}
    >
      <TextBodySm color={ColorPrimary.primary200}>{label}</TextBodySm>
      <TextBodyLg
        fontWeight="700"
        color={(valueColor as string) ?? ColorBase.white}
        numberOfLines={1}
      >
        {value}
      </TextBodyLg>
    </YStack>
  );
}
