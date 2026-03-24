/**
 * ShadowCard — Standard elevated card wrapper
 *
 * Centralises the repeated YStack + shadow pattern used across all screens.
 */
import { styled, YStack } from "tamagui";

export const ShadowCard = styled(YStack, {
  name: "ShadowCard",
  backgroundColor: "$background",
  borderRadius: 14,
  shadowColor: "#94A3B8",
  shadowOpacity: 0.18,
  shadowRadius: 8,
  elevation: 2,
});
