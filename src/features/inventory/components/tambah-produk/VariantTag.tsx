import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { XStack } from "tamagui";

import { TextBodySm } from "@/components";
import { ColorNeutral } from "@/themes/Colors";

interface VariantTagProps {
  label: string;
  price?: string;
  onRemove: () => void;
}

export function VariantTag({ label, price, onRemove }: VariantTagProps) {
  const hasPrice = !!price && parseInt(price, 10) > 0;
  return (
    <XStack
      backgroundColor={ColorNeutral.neutral100}
      borderRadius={20}
      paddingHorizontal={12}
      paddingVertical={6}
      alignItems="center"
      gap={6}
    >
      <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
        {label}
      </TextBodySm>
      {hasPrice && (
        <TextBodySm fontWeight="600" color="#16A34A" fontSize={11}>
          +Rp {parseInt(price!, 10).toLocaleString("id-ID")}
        </TextBodySm>
      )}
      <TouchableOpacity onPress={onRemove} hitSlop={8}>
        <Ionicons name="close" size={14} color={ColorNeutral.neutral500} />
      </TouchableOpacity>
    </XStack>
  );
}
