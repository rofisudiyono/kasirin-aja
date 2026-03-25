/**
 * FilterChip — Pill-shaped toggle chip for filter rows
 *
 * Shared between Transaksi and Inventori pages.
 */
import React from "react";
import { TouchableOpacity } from "react-native";
import { YStack } from "tamagui";

import { ColorBase } from "@/shared/themes/Colors";

import { TextBodySm } from "../atoms/Typography";

export interface FilterChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
  /** Horizontal padding. Default 16 */
  paddingH?: number;
}

export function FilterChip({
  label,
  active,
  onPress,
  paddingH = 16,
}: FilterChipProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <YStack
        backgroundColor={active ? "$primary" : "$background"}
        borderRadius={20}
        paddingHorizontal={paddingH}
        paddingVertical={8}
        borderWidth={1}
        borderColor={active ? "$primary" : "$borderColor"}
      >
        <TextBodySm
          fontWeight="600"
          color={active ? ColorBase.white : "$colorSecondary"}
        >
          {label}
        </TextBodySm>
      </YStack>
    </TouchableOpacity>
  );
}
