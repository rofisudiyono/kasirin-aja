import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { XStack } from "tamagui";

import { TextBodySm } from "@/components";
import { ColorNeutral } from "@/themes/Colors";

interface VariantTagProps {
  label: string;
  onRemove: () => void;
}

export function VariantTag({ label, onRemove }: VariantTagProps) {
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
      <TouchableOpacity onPress={onRemove} hitSlop={8}>
        <Ionicons name="close" size={14} color={ColorNeutral.neutral500} />
      </TouchableOpacity>
    </XStack>
  );
}
