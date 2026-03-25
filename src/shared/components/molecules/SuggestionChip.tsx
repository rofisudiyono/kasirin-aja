/**
 * SuggestionChip — Suggested payment amount chip
 *
 * Used in pembayaran-tunai (cash payment) page
 * Shows suggested payment amounts that calculate from total
 */
import React from "react";
import { TouchableOpacity, View } from "react-native";

import type { SuggestionChipProps } from "@/features/catalog/components/SuggestionChip/SuggestionChip.types";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/shared/themes/Colors";
import { formatPrice } from "@/shared/utils";
import { TextBodySm } from "../atoms/Typography";

export function SuggestionChip({
  amount,
  selected,
  onPress,
}: SuggestionChipProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={{
          backgroundColor: selected
            ? ColorPrimary.primary600
            : ColorNeutral.neutral150,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 10,
          alignItems: "center",
        }}
      >
        <TextBodySm
          fontWeight="600"
          color={selected ? ColorBase.white : ColorPrimary.primary600}
        >
          {formatPrice(amount)}
        </TextBodySm>
      </View>
    </TouchableOpacity>
  );
}
