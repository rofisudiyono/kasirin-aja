import React from "react";
import { Switch } from "react-native";
import { XStack, YStack } from "tamagui";

import { TextBodyLg, TextCaption } from "@/components";
import { ColorBase, ColorNeutral, ColorSuccess } from "@/themes/Colors";

import { SectionHeader } from "./SectionHeader";

interface StatusProdukSectionProps {
  isActive: boolean;
  setIsActive: (v: boolean) => void;
}

export function StatusProdukSection({
  isActive,
  setIsActive,
}: StatusProdukSectionProps) {
  return (
    <YStack
      backgroundColor={ColorBase.white}
      borderRadius={12}
      padding="$4"
      gap="$3"
    >
      <SectionHeader title="Status Produk" />

      <XStack alignItems="center" justifyContent="space-between">
        <YStack flex={1} gap={2}>
          <TextBodyLg
            fontWeight="700"
            color={isActive ? ColorSuccess.success600 : ColorNeutral.neutral500}
          >
            {isActive ? "Produk Aktif" : "Produk Nonaktif"}
          </TextBodyLg>
          <TextCaption color={ColorNeutral.neutral400}>
            {isActive
              ? "Produk akan tampil di kasir"
              : "Produk tidak akan tampil di kasir"}
          </TextCaption>
        </YStack>
        <Switch
          value={isActive}
          onValueChange={setIsActive}
          trackColor={{
            false: ColorNeutral.neutral300,
            true: ColorSuccess.success500,
          }}
          thumbColor={ColorBase.white}
        />
      </XStack>
    </YStack>
  );
}
