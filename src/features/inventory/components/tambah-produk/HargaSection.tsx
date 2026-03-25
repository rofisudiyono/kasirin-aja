import React from "react";
import { TextInput } from "react-native";
import { XStack, YStack } from "tamagui";

import { TextBodySm } from "@/shared/components";
import {
  ColorBase,
  ColorGreen,
  ColorNeutral,
  ColorSuccess,
} from "@/shared/themes/Colors";

import { inputStyle } from "./shared.styles";
import { SectionHeader } from "./SectionHeader";

function formatRp(val: string) {
  const num = parseInt(val.replace(/\D/g, "") || "0", 10);
  return num.toLocaleString("id-ID");
}

interface HargaSectionProps {
  hargaModal: string;
  setHargaModal: (v: string) => void;
  hargaJual: string;
  setHargaJual: (v: string) => void;
}

export function HargaSection({
  hargaModal,
  setHargaModal,
  hargaJual,
  setHargaJual,
}: HargaSectionProps) {
  const modal = parseInt(hargaModal.replace(/\D/g, "") || "0", 10);
  const jual = parseInt(hargaJual.replace(/\D/g, "") || "0", 10);
  const margin = jual - modal;
  const marginPct = jual > 0 ? Math.round((margin / jual) * 100) : 0;

  return (
    <YStack
      backgroundColor={ColorBase.white}
      borderRadius={12}
      padding="$4"
      gap="$4"
    >
      <SectionHeader title="Harga" />

      <XStack gap="$3">
        <YStack flex={1} gap={6}>
          <XStack gap={2}>
            <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
              Harga Modal
            </TextBodySm>
            <TextBodySm fontWeight="500" color="#DC2626">
              {" *"}
            </TextBodySm>
          </XStack>
          <XStack
            borderWidth={1.5}
            borderColor={ColorNeutral.neutral200}
            borderRadius={10}
            backgroundColor={ColorBase.white}
            paddingHorizontal={12}
            alignItems="center"
            height={44}
            gap="$1"
          >
            <TextBodySm color={ColorNeutral.neutral500}>Rp</TextBodySm>
            <TextInput
              style={[inputStyle.input, { flex: 1 }]}
              value={formatRp(hargaModal)}
              onChangeText={(v) => setHargaModal(v.replace(/\D/g, ""))}
              keyboardType="numeric"
              placeholderTextColor={ColorNeutral.neutral400}
            />
          </XStack>
        </YStack>

        <YStack flex={1} gap={6}>
          <XStack gap={2}>
            <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
              Harga Jual
            </TextBodySm>
            <TextBodySm fontWeight="500" color="#DC2626">
              {" *"}
            </TextBodySm>
          </XStack>
          <XStack
            borderWidth={1.5}
            borderColor={ColorNeutral.neutral200}
            borderRadius={10}
            backgroundColor={ColorBase.white}
            paddingHorizontal={12}
            alignItems="center"
            height={44}
            gap="$1"
          >
            <TextBodySm color={ColorNeutral.neutral500}>Rp</TextBodySm>
            <TextInput
              style={[inputStyle.input, { flex: 1 }]}
              value={formatRp(hargaJual)}
              onChangeText={(v) => setHargaJual(v.replace(/\D/g, ""))}
              keyboardType="numeric"
              placeholderTextColor={ColorNeutral.neutral400}
            />
          </XStack>
        </YStack>
      </XStack>

      {jual > 0 && modal > 0 && (
        <XStack
          backgroundColor={ColorGreen.green75 ?? ColorGreen.green50}
          borderRadius={10}
          paddingHorizontal={14}
          paddingVertical={10}
          alignItems="center"
          justifyContent="center"
          gap="$2"
        >
          <TextBodySm>💰</TextBodySm>
          <TextBodySm fontWeight="700" color={ColorSuccess.success700}>
            Margin: Rp {margin.toLocaleString("id-ID")} ({marginPct}%)
          </TextBodySm>
        </XStack>
      )}
    </YStack>
  );
}
