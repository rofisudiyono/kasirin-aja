import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { XStack, YStack } from "tamagui";

import { TextBodySm, TextCaption } from "@/components";
import { ColorBase, ColorNeutral, ColorPrimary, ColorWarning } from "@/themes/Colors";

import { SectionHeader } from "./SectionHeader";

interface StokSectionProps {
  stokAwal: string;
  setStokAwal: (v: string) => void;
  minAlert: string;
  setMinAlert: (v: string) => void;
  satuan: string;
  setSatuan: (v: string) => void;
}

function Stepper({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const num = parseInt(value || "0", 10);
  return (
    <XStack
      borderWidth={1.5}
      borderColor={ColorNeutral.neutral200}
      borderRadius={10}
      backgroundColor={ColorBase.white}
      alignItems="center"
      height={44}
      overflow="hidden"
    >
      <TouchableOpacity
        onPress={() => onChange(String(Math.max(0, num - 1)))}
        style={styles.stepBtn}
        hitSlop={4}
        activeOpacity={0.7}
      >
        <Ionicons name="remove" size={18} color={ColorNeutral.neutral600} />
      </TouchableOpacity>
      <TextInput
        style={styles.stepInput}
        value={value}
        onChangeText={(v) => onChange(v.replace(/\D/g, ""))}
        keyboardType="numeric"
        textAlign="center"
        placeholderTextColor={ColorNeutral.neutral400}
      />
      <TouchableOpacity
        onPress={() => onChange(String(num + 1))}
        style={styles.stepBtn}
        hitSlop={4}
        activeOpacity={0.7}
      >
        <Ionicons name="add" size={18} color={ColorPrimary.primary600} />
      </TouchableOpacity>
    </XStack>
  );
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

      {/* Stok Awal — full width with stepper */}
      <YStack gap={6}>
        <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
          Stok Awal
        </TextBodySm>
        <Stepper value={stokAwal} onChange={setStokAwal} />
      </YStack>

      {/* Min Alert + Satuan — side by side */}
      <XStack gap="$3">
        <YStack flex={1} gap={6}>
          <XStack alignItems="center" gap={4}>
            <Ionicons
              name="alert-circle-outline"
              size={13}
              color={ColorWarning.warning600}
            />
            <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
              Min Alert
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
          >
            <TextInput
              style={styles.plainInput}
              value={minAlert}
              onChangeText={(v) => setMinAlert(v.replace(/\D/g, ""))}
              keyboardType="numeric"
              placeholderTextColor={ColorNeutral.neutral400}
            />
          </XStack>
          <TextCaption color={ColorNeutral.neutral400}>
            Notifikasi saat stok di bawah ini
          </TextCaption>
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
              style={styles.plainInput}
              value={satuan}
              onChangeText={setSatuan}
              placeholder="pcs, kg, liter..."
              placeholderTextColor={ColorNeutral.neutral400}
            />
          </XStack>
          <TextCaption color={ColorNeutral.neutral400}>
            Contoh: pcs, kg, porsi
          </TextCaption>
        </YStack>
      </XStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  stepBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorNeutral.neutral50,
  },
  stepInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: ColorNeutral.neutral800,
    textAlign: "center",
    padding: 0,
  },
  plainInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: ColorNeutral.neutral800,
    padding: 0,
  },
});
