import React from "react";
import { TouchableOpacity, View } from "react-native";

import { TextBodySm } from "@/components/atoms/Typography";
import { formatPrice } from "@/utils";

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
          backgroundColor: selected ? "#2563EB" : "#F4F5F9",
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 10,
          alignItems: "center",
        }}
      >
        <TextBodySm fontWeight="600" color={selected ? "white" : "#2563EB"}>
          {formatPrice(amount)}
        </TextBodySm>
      </View>
    </TouchableOpacity>
  );
}
