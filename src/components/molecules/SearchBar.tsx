/**
 * SearchBar — Standard search input row
 *
 * Shared between Transaksi and Inventori pages.
 * Visual-only (no controlled state); wraps a TextInput placeholder look.
 */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { XStack } from "tamagui";

import { ColorNeutral } from "@/themes/Colors";

import { TextBodyLg } from "../atoms/Typography";

export interface SearchBarProps {
  placeholder?: string;
  /** Show the filter icon on the right side */
  showFilterIcon?: boolean;
}

export function SearchBar({
  placeholder = "Cari...",
  showFilterIcon = false,
}: SearchBarProps) {
  return (
    <XStack
      backgroundColor="$background"
      borderRadius={12}
      height={44}
      alignItems="center"
      paddingHorizontal="$3"
      gap="$2"
      borderWidth={1}
      borderColor="$borderColor"
    >
      <Ionicons
        name="search-outline"
        size={16}
        color={ColorNeutral.neutral400}
      />
      <TextBodyLg color="$colorTertiary" flex={1}>
        {placeholder}
      </TextBodyLg>
      {showFilterIcon && (
        <Ionicons
          name="options-outline"
          size={16}
          color={ColorNeutral.neutral700}
        />
      )}
    </XStack>
  );
}
