/**
 * IconButton — Circular/square tappable icon wrapper
 *
 * Replaces the repetitive TouchableOpacity > YStack > Ionicons pattern
 * that appears across every screen header and action area.
 */
import type { IoniconName } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { YStack } from "tamagui";

export interface IconButtonProps {
  iconName: IoniconName;
  /** Visible dimension (width & height). Default 36 */
  size?: number;
  /** Icon pixel size. Default 20 */
  iconSize?: number;
  /** "circle" → borderRadius=size/2, "square" → borderRadius=10. Default "circle" */
  shape?: "circle" | "square";
  bg?: string;
  iconColor?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export function IconButton({
  iconName,
  size = 36,
  iconSize = 20,
  shape = "circle",
  bg = "$backgroundSecondary",
  iconColor = "#374151",
  onPress,
  disabled,
}: IconButtonProps) {
  const radius = shape === "circle" ? size / 2 : 10;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <YStack
        width={size}
        height={size}
        borderRadius={radius}
        backgroundColor={bg}
        alignItems="center"
        justifyContent="center"
      >
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </YStack>
    </TouchableOpacity>
  );
}
