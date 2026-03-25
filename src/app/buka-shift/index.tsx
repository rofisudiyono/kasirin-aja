import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, XStack, YStack } from "tamagui";

import {
  isShiftStartedAtom,
  shiftDataAtom,
} from "@/features/shift/store/shift.store";
import {
  AppButton,
  NumpadButton,
  PageHeader,
  TextBodySm,
  TextCaption,
  TextH1,
  TextH3,
} from "@/components";
import {
  ColorBase,
  ColorDanger,
  ColorIconGradient,
  ColorNeutral,
  ColorPrimary,
  ColorSky,
  ColorWarning,
} from "@/themes/Colors";
import { formatPrice } from "@/utils";

const PRESET_AMOUNTS = [200_000, 500_000, 1_000_000];

const NUMPAD_ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["000", "0", "DEL"],
];

export default function BukaShiftPage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("500000");
  const [note, setNote] = useState("");
  const [, setIsShiftStarted] = useAtom(isShiftStartedAtom);
  const [, setShiftData] = useAtom(shiftDataAtom);

  const amount = Number(inputValue);

  function handleNumpad(key: string) {
    setInputValue((prev) => {
      if (key === "DEL") {
        const next = prev.slice(0, -1);
        return next.length === 0 ? "0" : next;
      }
      if (key === "000") {
        if (prev === "0") return prev;
        if (prev.length >= 10) return prev;
        return prev + "000";
      }
      if (prev === "0") return key;
      if (prev.length >= 12) return prev;
      return prev + key;
    });
  }

  function handlePreset(value: number) {
    setInputValue(String(value));
  }

  function handleMulaiShift() {
    const now = new Date();
    const startTime =
      now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) +
      " WIB";
    setShiftData({
      openingCash: amount,
      startTime,
      cashierName: "Budi Santoso",
      note,
    });
    setIsShiftStarted(true);
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Buka Shift" showBack onBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.content}>
          {/* ── Icon ── */}
          <YStack alignItems="center" gap="$3" marginBottom="$4">
            <YStack
              style={styles.sunCircle}
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons
                name="sunny-outline"
                size={32}
                color={ColorWarning.warning600}
              />
            </YStack>
            <YStack alignItems="center" gap={4}>
              <TextH1 fontWeight="800">Selamat Datang!</TextH1>
              <TextH3 fontWeight="700" color={ColorPrimary.primary600}>
                Budi Santoso
              </TextH3>
              <TextBodySm color={ColorNeutral.neutral500}>
                Toko Makmur
              </TextBodySm>
              <TextBodySm color={ColorNeutral.neutral400}>
                Senin, 24 Mar 2025 • 08:00 WIB
              </TextBodySm>
            </YStack>
          </YStack>

          {/* ── Modal Awal Kas ── */}
          <YStack
            backgroundColor={ColorBase.white}
            borderRadius={16}
            padding="$4"
            gap="$3"
            marginBottom="$3"
            borderWidth={1}
            borderColor={ColorNeutral.neutral200}
          >
            <YStack gap={4}>
              <TextH3 fontWeight="700">Modal Awal Kas</TextH3>
              <TextBodySm color={ColorNeutral.neutral500}>
                Masukkan jumlah uang di laci kasir
              </TextBodySm>
            </YStack>

            {/* Amount display */}
            <YStack alignItems="center" paddingVertical="$2">
              <TextH1 fontWeight="800" color={ColorPrimary.primary600}>
                {formatPrice(amount)}
              </TextH1>
            </YStack>

            {/* Preset chips */}
            <XStack flexWrap="wrap" gap="$2">
              {PRESET_AMOUNTS.map((preset) => (
                <TouchableOpacity
                  key={preset}
                  onPress={() => handlePreset(preset)}
                  activeOpacity={0.7}
                  style={[
                    styles.presetChip,
                    amount === preset && styles.presetChipActive,
                  ]}
                >
                  <TextBodySm
                    fontWeight="600"
                    color={
                      amount === preset
                        ? ColorBase.white
                        : ColorNeutral.neutral700
                    }
                  >
                    {formatPrice(preset)}
                  </TextBodySm>
                </TouchableOpacity>
              ))}
            </XStack>

            {/* Note input */}
            <TextInput
              style={styles.noteInput}
              placeholder="Catatan shift... (opsional)"
              placeholderTextColor={ColorNeutral.neutral400}
              value={note}
              onChangeText={setNote}
              multiline={false}
            />
          </YStack>

          {/* ── Numpad ── */}
          <View style={styles.numpad}>
            {NUMPAD_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.numpadRow}>
                {row.map((key) =>
                  key === "DEL" ? (
                    <NumpadButton
                      key="DEL"
                      label=""
                      bgColor={ColorDanger.danger75}
                      onPress={() => handleNumpad("DEL")}
                      isIcon
                    />
                  ) : key === "000" ? (
                    <NumpadButton
                      key="000"
                      label="000"
                      bgColor={ColorSky.indigo50}
                      textColor={ColorPrimary.primary600}
                      onPress={() => handleNumpad("000")}
                    />
                  ) : (
                    <NumpadButton
                      key={key}
                      label={key}
                      onPress={() => handleNumpad(key)}
                    />
                  ),
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* ── Bottom CTA ── */}
      <View style={styles.bottomBar}>
        <AppButton
          variant="success"
          size="lg"
          fullWidth
          title="Mulai Shift Sekarang"
          icon={
            <Ionicons name="sunny-outline" size={18} color={ColorBase.white} />
          }
          onPress={handleMulaiShift}
        />
        <TextCaption
          color={ColorNeutral.neutral400}
          textAlign="center"
          marginTop={6}
        >
          Shift akan tercatat otomatis
        </TextCaption>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorBase.bgScreen,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  storeIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: ColorIconGradient.iconBg,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  sunCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: ColorWarning.warning100,
    alignSelf: "center",
  },
  presetChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: ColorNeutral.neutral200,
    backgroundColor: ColorBase.white,
  },
  presetChipActive: {
    backgroundColor: ColorPrimary.primary600,
    borderColor: ColorPrimary.primary600,
  },
  noteInput: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ColorNeutral.neutral200,
    backgroundColor: ColorBase.white,
    paddingHorizontal: 14,
    fontFamily: "System",
    fontSize: 14,
    color: ColorNeutral.neutral800,
  },
  numpad: {
    marginVertical: 8,
    gap: 8,
  },
  numpadRow: {
    height: 54,
    flexDirection: "row",
    gap: 8,
  },
  bottomBar: {
    backgroundColor: ColorBase.white,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: ColorNeutral.neutral200,
  },
});
