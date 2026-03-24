/**
 * AppButton — Section 5.1
 *
 * Import: import { AppButton } from '@/design-system'
 *
 * variants: 'primary' | 'success' | 'danger' | 'warning' | 'outline' | 'outlineGray' | 'ghost' | 'disabled'
 * size:     'sm' (36dp) | 'md' (44dp) | 'lg' (52dp)
 * fullWidth: boolean
 * iconOnly:  boolean  — renders as 44×44 square button
 * disabled:  boolean
 */
import React from "react";
import { ActivityIndicator } from "react-native";
import { Text, XStack } from "tamagui";

// ─── Types ────────────────────────────────────────────────────────────────────
export type AppButtonVariant =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "outline"
  | "outlineGray"
  | "ghost"
  | "disabled";

export type AppButtonSize = "sm" | "md" | "lg";

export interface AppButtonProps {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  fullWidth?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

// ─── Variant maps ─────────────────────────────────────────────────────────────
const variantStyles: Record<
  AppButtonVariant,
  {
    bg: string;
    border: string;
    labelColor: string;
    pressOpacity: number;
  }
> = {
  primary: {
    bg: "$primary",
    border: "$primary",
    labelColor: "#FFFFFF",
    pressOpacity: 0.85,
  },
  success: {
    bg: "$success",
    border: "$success",
    labelColor: "#FFFFFF",
    pressOpacity: 0.85,
  },
  danger: {
    bg: "$danger",
    border: "$danger",
    labelColor: "#FFFFFF",
    pressOpacity: 0.85,
  },
  warning: {
    bg: "$warning",
    border: "$warning",
    labelColor: "#FFFFFF",
    pressOpacity: 0.85,
  },
  outline: {
    bg: "transparent",
    border: "$primary",
    labelColor: "$primary",
    pressOpacity: 0.7,
  },
  outlineGray: {
    bg: "transparent",
    border: "$borderColor",
    labelColor: "$color",
    pressOpacity: 0.7,
  },
  ghost: {
    bg: "transparent",
    border: "transparent",
    labelColor: "$primary",
    pressOpacity: 0.6,
  },
  disabled: {
    bg: "$backgroundTertiary",
    border: "$backgroundTertiary",
    labelColor: "$colorTertiary",
    pressOpacity: 1,
  },
};

const sizeMap: Record<
  AppButtonSize,
  { height: number; paddingHorizontal: number; fontSize: number }
> = {
  sm: { height: 36, paddingHorizontal: 12, fontSize: 12 },
  md: { height: 44, paddingHorizontal: 16, fontSize: 14 },
  lg: { height: 52, paddingHorizontal: 20, fontSize: 16 },
};

// ─── Component ────────────────────────────────────────────────────────────────
export function AppButton({
  variant = "primary",
  size = "md",
  fullWidth = false,
  iconOnly = false,
  disabled = false,
  loading = false,
  onPress,
  children,
}: AppButtonProps) {
  const isDisabled = disabled || variant === "disabled";
  const resolvedVariant: AppButtonVariant = isDisabled ? "disabled" : variant;
  const styles = variantStyles[resolvedVariant];
  const dimensions = sizeMap[size];

  const width = iconOnly
    ? 44
    : fullWidth
      ? ("100%" as unknown as number)
      : undefined;

  return (
    <XStack
      accessibilityRole="button"
      onPress={isDisabled || loading ? undefined : onPress}
      backgroundColor={styles.bg as any}
      borderWidth={1}
      borderColor={styles.border as any}
      borderRadius="$3"
      height={iconOnly ? 44 : dimensions.height}
      width={iconOnly ? 44 : (width as any)}
      paddingHorizontal={iconOnly ? 0 : dimensions.paddingHorizontal}
      alignItems="center"
      justifyContent="center"
      gap="$2"
      opacity={isDisabled ? 0.7 : 1}
      pressStyle={
        !isDisabled && !loading ? { opacity: styles.pressOpacity } : {}
      }
      cursor={isDisabled ? "not-allowed" : "pointer"}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "outline" ||
            variant === "outlineGray" ||
            variant === "ghost"
              ? undefined
              : "#FFFFFF"
          }
        />
      ) : typeof children === "string" ? (
        <Text
          fontFamily="$body"
          fontSize={dimensions.fontSize}
          fontWeight="600"
          color={styles.labelColor as any}
          numberOfLines={1}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </XStack>
  );
}
