import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { XStack } from "tamagui";

import { TextBodyLg } from "@/components";
import { ColorBase, ColorNeutral } from "@/themes/Colors";

export function SearchBar() {
  return (
    <XStack
      backgroundColor={ColorBase.white}
      borderRadius={12}
      height={48}
      alignItems="center"
      paddingHorizontal="$3"
      gap="$2"
      borderWidth={1}
      borderColor="$borderColor"
    >
      <Ionicons
        name="search-outline"
        size={18}
        color={ColorNeutral.neutral400}
      />
      <TextBodyLg color="$colorTertiary" flex={1}>
        Cari produk atau scan barcode...
      </TextBodyLg>
      <Ionicons
        name="barcode-outline"
        size={20}
        color={ColorNeutral.neutral500}
      />
    </XStack>
  );
}
