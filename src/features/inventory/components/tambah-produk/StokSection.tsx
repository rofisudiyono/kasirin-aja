import React from "react";
import { TextInput } from "react-native";
import { XStack, YStack } from "tamagui";

import { TextBodySm } from "@/shared/components";
import { ColorBase, ColorNeutral } from "@/shared/themes/Colors";

import { inputStyle } from "./shared.styles";
import { SectionHeader } from "./SectionHeader";

interface StokSectionProps {
  stokAwal: string;
  setStokAwal: (v: string) => void;
  minAlert: string;
  setMinAlert: (v: string) => void;
  satuan: string;
  setSatuan: (v: string) => void;
}

export function StokSection({
  stokAwal,
  setStokAwal,
  minAlert,
  setMinAlert,
  satuan,
  setSatuan,
}: StokSectionProps) {
  return (
    <YStack
      backgroundColor={ColorBase.white}
      borderRadius={12}
      padding="$4"
      gap="$4"
    >
      <SectionHeader title="Stok" />

      <XStack gap="$3">
        <YStack flex={1} gap={6}>
          <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
            Stok Awal
          </TextBodySm>
          <XStack
            borderWidth={1.5}
            borderColor={ColorNeutral.neutral200}
            borderRadius={10}
            backgroundColor={ColorBase.white}
            paddingHorizontal={12}
            alignItems="center"
            height={44}
          >
            <TextInput
              style={[inputStyle.input, { flex: 1 }]}
              value={stokAwal}
              onChangeText={setStokAwal}
              keyboardType="numeric"
              placeholderTextColor={ColorNeutral.neutral400}
            />
          </XStack>
        </YStack>

        <YStack flex={1} gap={6}>
          <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
            Minimum Alert
          </TextBodySm>
          <XStack
            borderWidth={1.5}
            borderColor={ColorNeutral.neutral200}
            borderRadius={10}
            backgroundColor={ColorBase.white}
            paddingHorizontal={12}
            alignItems="center"
            height={44}
          >
            <TextInput
              style={[inputStyle.input, { flex: 1 }]}
              value={minAlert}
              onChangeText={setMinAlert}
              keyboardType="numeric"
              placeholderTextColor={ColorNeutral.neutral400}
            />
          </XStack>
        </YStack>

        <YStack flex={1} gap={6}>
          <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
            Satuan
          </TextBodySm>
          <XStack
            borderWidth={1.5}
            borderColor={ColorNeutral.neutral200}
            borderRadius={10}
            backgroundColor={ColorBase.white}
            paddingHorizontal={12}
            alignItems="center"
            height={44}
          >
            <TextInput
              style={[inputStyle.input, { flex: 1 }]}
              value={satuan}
              onChangeText={setSatuan}
              placeholderTextColor={ColorNeutral.neutral400}
            />
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
}
