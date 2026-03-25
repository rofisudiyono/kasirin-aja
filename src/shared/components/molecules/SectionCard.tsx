/**
 * SectionCard — Labelled section wrapper with shadow card
 *
 * Previously defined as a local component inside pengaturan.tsx.
 * Extracted so it can be reused across any settings-style page.
 */
import React from "react";
import { YStack } from "tamagui";

import { ShadowCard } from "../atoms/ShadowCard";
import { TextBodyLg } from "../atoms/Typography";

export interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <YStack gap="$2">
      <TextBodyLg fontWeight="700">{title}</TextBodyLg>
      <ShadowCard overflow="hidden">{children}</ShadowCard>
    </YStack>
  );
}
