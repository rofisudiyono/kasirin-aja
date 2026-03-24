/**
 * ProfileCard — User profile card with blue background
 *
 * Used in home page and settings page
 * Displays user avatar, name, role, and status
 */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { XStack, YStack } from "tamagui";

import { TextBodySm, TextH3 } from "../atoms/Typography";

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
    <YStack backgroundColor="#2563EB" borderRadius={16} padding="$4" gap="$3">
      <XStack alignItems="center" gap="$3">
        <YStack
          width={56}
          height={56}
          borderRadius={28}
          backgroundColor="#BFDBFE"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
        >
          <Ionicons name="person" size={28} color="white" />
        </YStack>
        <YStack flex={1} gap={2}>
          <TextH3 fontWeight="700" color="white">
            {name}
          </TextH3>
          <TextBodySm color="#BFDBFE">{role}</TextBodySm>
        </YStack>
        <YStack
          backgroundColor="white"
          borderRadius={20}
          paddingHorizontal={12}
          paddingVertical={5}
        >
          <TextBodySm fontWeight="700" color="#2563EB">
            {status}
          </TextBodySm>
        </YStack>
      </XStack>
    </YStack>
  );
}
