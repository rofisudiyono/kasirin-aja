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
      backgroundColor={isActive ? ColorSuccess.success50 : ColorBase.white}
      borderRadius={12}
      padding="$4"
      gap="$3"
      borderWidth={1.5}
      borderColor={isActive ? ColorSuccess.success200 : ColorNeutral.neutral200}
    >
      <SectionHeader title="Status Produk" />

      <XStack alignItems="center" justifyContent="space-between" gap="$3">
        <YStack flex={1} gap={4}>
          <XStack alignItems="center" gap={6}>
            <YStack
              width={8}
              height={8}
              borderRadius={4}
              backgroundColor={
                isActive ? ColorSuccess.success500 : ColorNeutral.neutral400
              }
            />
            <TextBodyLg
              fontWeight="700"
              color={
                isActive ? ColorSuccess.success600 : ColorNeutral.neutral500
              }
            >
              {isActive ? "Produk Aktif" : "Produk Nonaktif"}
            </TextBodyLg>
          </XStack>
          <TextCaption
            color={
              isActive ? ColorSuccess.success700 : ColorNeutral.neutral400
            }
          >
            {isActive
              ? "Produk akan tampil di menu kasir"
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
