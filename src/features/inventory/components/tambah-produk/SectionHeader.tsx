import React from "react";
import { View } from "react-native";
import { XStack } from "tamagui";

import { TextCaption } from "@/components";
import { ColorNeutral, ColorPrimary } from "@/themes/Colors";

export function SectionHeader({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <XStack alignItems="center" gap={8} marginBottom={2}>
      <View
        style={{
          width: 3,
          height: 14,
          backgroundColor: ColorPrimary.primary600,
          borderRadius: 2,
        }}
      />
      {icon}
      <TextCaption
        fontWeight="700"
        color={ColorNeutral.neutral700}
        letterSpacing={0.6}
        style={{ textTransform: "uppercase" }}
      >
        {title}
      </TextCaption>
    </XStack>
  );
}
