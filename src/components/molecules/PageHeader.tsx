/**
 * PageHeader — Top bar with optional back button, title, and action slot
 *
 * Replaces the repeated XStack header pattern in Transaksi, Inventori,
 * and Pengaturan pages.
 */
import React from "react";
import { XStack, YStack } from "tamagui";

import { IconButton } from "../atoms/IconButton";
import { TextBodySm, TextH2, TextH3 } from "../atoms/Typography";

export interface PageHeaderProps {
  title: string;
  /** Secondary line shown below title when provided */
  subtitle?: string;
  /** Show a back arrow on the left. Default false */
  showBack?: boolean;
  onBack?: () => void;
  /** Slot for right-side actions (buttons / icon buttons) */
  actions?: React.ReactNode;
  /** Use TextH2 for title instead of TextH3. Default false */
  largeTitle?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  actions,
  largeTitle = false,
}: PageHeaderProps) {
  return (
    <XStack
      paddingHorizontal="$4"
      paddingTop="$3"
      paddingBottom="$3"
      alignItems="center"
      gap="$3"
    >
      {showBack && <IconButton iconName="arrow-back" onPress={onBack} />}

      {subtitle ? (
        <YStack flex={1} gap={2}>
          {largeTitle ? (
            <TextH2 fontWeight="700">{title}</TextH2>
          ) : (
            <TextH3 fontWeight="700">{title}</TextH3>
          )}
          <TextBodySm color="$colorSecondary">{subtitle}</TextBodySm>
        </YStack>
      ) : (
        <>
          {largeTitle ? (
            <TextH2 fontWeight="700" flex={1}>
              {title}
            </TextH2>
          ) : (
            <TextH3
              fontWeight="700"
              flex={1}
              textAlign={showBack ? "center" : "left"}
            >
              {title}
            </TextH3>
          )}
        </>
      )}

      {actions}
    </XStack>
  );
}
