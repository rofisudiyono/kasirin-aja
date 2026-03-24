import React from "react";
import { TouchableOpacity } from "react-native";
// Sesuaikan import di bawah ini dengan lokasi komponen Anda
import { IconButton } from "./IconButton";
import { ShadowCard } from "./ShadowCard";
import { TextBodySm } from "./Typography";

export interface ActionCardButtonProps {
  label: string;
  iconName: React.ComponentProps<typeof IconButton>["iconName"];
  iconBg?: React.ComponentProps<typeof IconButton>["bg"];
  iconColor?: React.ComponentProps<typeof IconButton>["iconColor"];
  onPress?: () => void;
  flex?: number; // Berguna jika berada di dalam flex row
  disabled?: boolean;
}

export function ActionCardButton({
  label,
  iconName,
  iconBg,
  iconColor,
  onPress,
  flex = 1,
  disabled = false,
}: ActionCardButtonProps) {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={{ flex, opacity: disabled ? 0.6 : 1 }}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <ShadowCard padding="$3" alignItems="center" gap="$2">
        <IconButton
          iconName={iconName}
          size={44}
          iconSize={22}
          bg={iconBg}
          iconColor={iconColor}
          // Kita disable IconButton-nya karena interaksi klik
          // sudah ditangani oleh TouchableOpacity di luar
          disabled={true}
        />
        <TextBodySm fontWeight="500" textAlign="center">
          {label}
        </TextBodySm>
      </ShadowCard>
    </TouchableOpacity>
  );
}
