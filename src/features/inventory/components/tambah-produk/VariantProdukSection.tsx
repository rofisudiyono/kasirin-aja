import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Switch, TouchableOpacity } from "react-native";
import { XStack, YStack } from "tamagui";

import { TextBodyLg, TextBodySm, TextCaption } from "@/components";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/themes/Colors";

import { SectionHeader } from "./SectionHeader";
import type { TambahProdukVariantGroup } from "./tambah-produk.types";
import { VariantTag } from "./VariantTag";

interface VariantProdukSectionProps {
  hasVariant: boolean;
  setHasVariant: (v: boolean) => void;
  variantGroups: TambahProdukVariantGroup[];
  onRemoveVariantValue: (groupIdx: number, valIdx: number) => void;
}

export function VariantProdukSection({
  hasVariant,
  setHasVariant,
  variantGroups,
  onRemoveVariantValue,
}: VariantProdukSectionProps) {
  return (
    <YStack
      backgroundColor={ColorBase.white}
      borderRadius={12}
      padding="$4"
      gap="$3"
    >
      <SectionHeader title="Variant Produk" />

      <XStack alignItems="center" justifyContent="space-between">
        <YStack flex={1} gap={2}>
          <TextBodyLg fontWeight="600">Produk ini memiliki variant</TextBodyLg>
          <TextCaption color={ColorNeutral.neutral400}>
            Contoh: ukuran, warna, rasa
          </TextCaption>
        </YStack>
        <Switch
          value={hasVariant}
          onValueChange={setHasVariant}
          trackColor={{
            false: ColorNeutral.neutral300,
            true: ColorPrimary.primary600,
          }}
          thumbColor={ColorBase.white}
        />
      </XStack>

      {hasVariant && (
        <YStack gap="$3">
          {variantGroups.map((group, gi) => (
            <YStack
              key={gi}
              backgroundColor={ColorNeutral.neutral50}
              borderRadius={10}
              padding="$3"
              gap="$2"
            >
              <TextBodySm fontWeight="600" color={ColorNeutral.neutral700}>
                {group.name}
              </TextBodySm>
              <XStack flexWrap="wrap" gap="$2">
                {group.values.map((val, vi) => (
                  <VariantTag
                    key={vi}
                    label={val}
                    onRemove={() => onRemoveVariantValue(gi, vi)}
                  />
                ))}
                <TouchableOpacity activeOpacity={0.7}>
                  <XStack
                    paddingHorizontal={12}
                    paddingVertical={6}
                    borderRadius={20}
                    borderWidth={1}
                    borderColor={ColorPrimary.primary200}
                    alignItems="center"
                    gap={4}
                  >
                    <Ionicons
                      name="add"
                      size={14}
                      color={ColorPrimary.primary600}
                    />
                    <TextBodySm
                      fontWeight="600"
                      color={ColorPrimary.primary600}
                    >
                      Tambah
                    </TextBodySm>
                  </XStack>
                </TouchableOpacity>
              </XStack>
              <TextCaption color={ColorNeutral.neutral400}>
                Harga & stok per variant diatur terpisah
              </TextCaption>
            </YStack>
          ))}

          <TouchableOpacity activeOpacity={0.7}>
            <XStack
              borderWidth={1.5}
              borderColor={ColorPrimary.primary200}
              borderRadius={10}
              borderStyle="dashed"
              paddingVertical={12}
              alignItems="center"
              justifyContent="center"
              gap="$2"
            >
              <Ionicons
                name="add-circle-outline"
                size={18}
                color={ColorPrimary.primary600}
              />
              <TextBodySm fontWeight="600" color={ColorPrimary.primary600}>
                Tambah Grup Variant
              </TextBodySm>
            </XStack>
          </TouchableOpacity>
        </YStack>
      )}
    </YStack>
  );
}
