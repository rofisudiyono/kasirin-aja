import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { XStack, YStack } from "tamagui";

import { IconButton, TextBodyLg, TextBodySm, TextCaption, TextH3 } from "@/shared/components";
import { ColorPrimary } from "@/shared/themes/Colors";

export function HomeHeader() {
  return (
    <XStack
      paddingHorizontal="$4"
      paddingTop="$3"
      paddingBottom="$2"
      alignItems="center"
      gap="$3"
    >
      <YStack
        width={48}
        height={48}
        borderRadius={24}
        backgroundColor={ColorPrimary.primary100}
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <Ionicons name="person" size={26} color={ColorPrimary.primary600} />
      </YStack>
      <YStack flex={1}>
        <TextH3 fontWeight="700">Budi Santoso</TextH3>
        <TextBodySm color="$colorSecondary">Toko Makmur</TextBodySm>
      </YStack>
      <YStack alignItems="flex-end" gap={2}>
        <TextCaption color="$colorSecondary">Sen, 10 Jun 2024</TextCaption>
        <TextBodyLg fontWeight="700">10:24 WIB</TextBodyLg>
      </YStack>
      <IconButton iconName="notifications-outline" size={40} />
    </XStack>
  );
}
