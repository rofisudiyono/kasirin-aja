/**
 * ProfileCard — User profile card with blue background
 *
 * Used in home page and settings page
 * Displays user avatar, name, role, and status
 */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { XStack, YStack } from "tamagui";

import { ColorBase, ColorPrimary } from "@/themes/Colors";

import { TextBodySm, TextH3 } from "@/components/atoms/Typography";

interface ProfileCardProps {
  name: string;
  role: string;
  status?: string;
  showNotifications?: boolean;
}

export function ProfileCard({
  name,
  role,
  status = "Online",
  showNotifications = false,
}: ProfileCardProps) {
  return (
    <YStack
      backgroundColor={ColorPrimary.primary600}
      borderRadius={16}
      padding="$4"
      gap="$3"
    >
      <XStack alignItems="center" gap="$3">
        <YStack
          width={56}
          height={56}
          borderRadius={28}
          backgroundColor={ColorPrimary.primary200}
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          <Ionicons name="person" size={28} color={ColorBase.white} />
        </YStack>
        <YStack flex={1} gap={2}>
          <TextH3 fontWeight="700" color={ColorBase.white}>
            {name}
          </TextH3>
          <TextBodySm color={ColorPrimary.primary200}>{role}</TextBodySm>
        </YStack>
        <YStack
          backgroundColor={ColorBase.white}
          borderRadius={20}
          paddingHorizontal={12}
          paddingVertical={5}
        >
          <TextBodySm fontWeight="700" color={ColorPrimary.primary600}>
            {status}
          </TextBodySm>
        </YStack>
      </XStack>
    </YStack>
  );
}
