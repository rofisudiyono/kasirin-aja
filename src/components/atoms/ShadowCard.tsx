/**
 * ShadowCard — Standard elevated card wrapper
 *
 * Centralises the repeated YStack + shadow pattern used across all screens.
 */
import { styled, YStack } from "tamagui";

import { ColorNeutral } from "@/themes/Colors";

export const ShadowCard = styled(YStack, {
  name: "ShadowCard",
  backgroundColor: "$background",
  borderRadius: 14,
  shadowColor: ColorNeutral.neutralShadow,
  shadowOpacity: 0.18,
  shadowRadius: 8,
  elevation: 2,
});
