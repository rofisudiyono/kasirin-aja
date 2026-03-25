import React from "react";
import { TouchableOpacity, View } from "react-native";

import { TextBodySm } from "@/shared/components/atoms/Typography";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/shared/themes/Colors";
import { formatPrice } from "@/shared/utils";

import type { SuggestionChipProps } from "./SuggestionChip.types";

export function SuggestionChip({
  amount,
  selected,
  onPress,
  style,
}: SuggestionChipProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={style}>
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
