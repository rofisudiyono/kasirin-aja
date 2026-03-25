import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  isShiftStartedAtom,
  shiftDataAtom,
} from "@/features/shift/store/shift.store";
import { transactionsAtom } from "@/features/transactions/store/transaction.store";
import {
  AppButton,
  DottedSeparator,
  NumpadButton,
  PageHeader,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH1,
  TextH3,
} from "@/components";
import {
  ColorBase,
  ColorDanger,
  ColorGreen,
  ColorNeutral,
  ColorPrimary,
  ColorSuccess,
  ColorWarning,
} from "@/themes/Colors";
import { formatPrice } from "@/utils";

const NUMPAD_ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["000", "0", "DEL"],
];

export default function TutupShiftPage() {
  const router = useRouter();
  const [, setIsShiftStarted] = useAtom(isShiftStartedAtom);
  const [, setShiftData] = useAtom(shiftDataAtom);
  const shiftData = useAtomValue(shiftDataAtom);
  const transactions = useAtomValue(transactionsAtom);

  const [inputValue, setInputValue] = useState("0");

  const kasAkhir = Number(inputValue);

  // Compute shift stats from store
  const shiftTxs = transactions.filter((t) => t.status === "Lunas");
  const totalPendapatan = shiftTxs.reduce((sum, t) => {
    const raw = t.amount.replace(/[^0-9]/g, "");
    return sum + Number(raw);
  }, 0);
  const totalTransaksi = transactions.length;
  const totalVoid = transactions.filter((t) => t.status === "Void").length;

  // Rekonsiliasi
  const openingCash = shiftData?.openingCash ?? 0;
  const expectedCash = openingCash + totalPendapatan;
  const selisih = kasAkhir - expectedCash;

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

  function handleTutupShift() {
    Alert.alert(
      "Tutup Shift",
      "Yakin ingin menutup shift sekarang? Data shift akan disimpan.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Tutup Shift",
          style: "destructive",
          onPress: () => {
            setIsShiftStarted(false);
            setShiftData(null);
            router.replace("/(tabs)/index");
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Tutup Shift" showBack onBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <YStack paddingHorizontal={16} gap={12} paddingTop={8}>
          {/* Shift summary card */}
          <YStack
            backgroundColor={ColorPrimary.primary700}
            borderRadius={16}
            padding={20}
            gap={12}
          >
            <XStack alignItems="center" gap={8}>
              <YStack
                width={8}
                height={8}
                borderRadius={4}
                backgroundColor={ColorSuccess.success400}
              />
              <TextBodyLg fontWeight="700" color={ColorBase.white}>
                Ringkasan Shift
              </TextBodyLg>
            </XStack>
            <XStack gap={8}>
              <InfoBox label="Mulai" value={shiftData?.startTime ?? "-"} />
              <InfoBox label="Kasir" value={shiftData?.cashierName ?? "-"} />
            </XStack>
            <XStack gap={8}>
              <InfoBox label="Total Transaksi" value={String(totalTransaksi)} />
              <InfoBox
                label="Pendapatan"
                value={`Rp ${totalPendapatan.toLocaleString("id-ID")}`}
              />
              <InfoBox
                label="Void"
                value={String(totalVoid)}
                valueColor={ColorDanger.danger400}
              />
            </XStack>
          </YStack>

          {/* Kas Akhir input */}
          <YStack
            backgroundColor={ColorBase.white}
            borderRadius={16}
            padding={20}
            gap={12}
            borderWidth={1}
            borderColor={ColorNeutral.neutral200}
          >
            <YStack gap={4}>
              <TextH3 fontWeight="700">Hitung Kas Akhir</TextH3>
              <TextBodySm color={ColorNeutral.neutral500}>
                Masukkan jumlah uang aktual di laci kasir
              </TextBodySm>
            </YStack>
            <YStack alignItems="center" paddingVertical={4}>
              <TextH1 fontWeight="800" color={ColorPrimary.primary600}>
                {formatPrice(kasAkhir)}
              </TextH1>
            </YStack>

            {/* Numpad */}
            <YStack gap={8}>
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
                        bgColor="#EEF2FF"
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
            </YStack>
          </YStack>

          {/* Rekonsiliasi */}
          <YStack
            backgroundColor={ColorBase.white}
            borderRadius={16}
            padding={20}
            gap={10}
            borderWidth={1}
            borderColor={ColorNeutral.neutral200}
          >
            <TextH3 fontWeight="700">Rekonsiliasi Kas</TextH3>
            <XStack justifyContent="space-between">
              <TextBodySm color={ColorNeutral.neutral600}>
                Modal Awal
              </TextBodySm>
              <TextBodySm fontWeight="600">
                {formatPrice(openingCash)}
              </TextBodySm>
            </XStack>
            <XStack justifyContent="space-between">
              <TextBodySm color={ColorNeutral.neutral600}>
                + Pendapatan Tunai
              </TextBodySm>
              <TextBodySm fontWeight="600" color={ColorGreen.green600}>
                {formatPrice(totalPendapatan)}
              </TextBodySm>
            </XStack>
            <DottedSeparator />
            <XStack justifyContent="space-between">
              <TextBodySm color={ColorNeutral.neutral600}>
                Kas Seharusnya
              </TextBodySm>
              <TextBodySm fontWeight="700">
                {formatPrice(expectedCash)}
              </TextBodySm>
            </XStack>
            <XStack justifyContent="space-between">
              <TextBodySm color={ColorNeutral.neutral600}>
                Kas Aktual
              </TextBodySm>
              <TextBodySm fontWeight="700">{formatPrice(kasAkhir)}</TextBodySm>
            </XStack>
            <XStack
              justifyContent="space-between"
              alignItems="center"
              backgroundColor={
                selisih === 0
                  ? ColorGreen.green75
                  : selisih > 0
                    ? ColorWarning.warning75
                    : ColorDanger.danger25
              }
              borderRadius={10}
              padding={10}
              marginTop={4}
            >
              <TextBodyLg fontWeight="700">Selisih</TextBodyLg>
              <XStack alignItems="center" gap={6}>
                <Ionicons
                  name={
                    selisih === 0
                      ? "checkmark-circle"
                      : selisih > 0
                        ? "arrow-up-circle"
                        : "arrow-down-circle"
                  }
                  size={18}
                  color={
                    selisih === 0
                      ? ColorGreen.green600
                      : selisih > 0
                        ? ColorWarning.warning600
                        : ColorDanger.danger600
                  }
                />
                <TextBodyLg
                  fontWeight="800"
                  color={
                    selisih === 0
                      ? ColorGreen.green600
                      : selisih > 0
                        ? ColorWarning.warning600
                        : ColorDanger.danger600
                  }
                >
                  {selisih >= 0 ? "+" : ""}
                  {formatPrice(selisih)}
                </TextBodyLg>
              </XStack>
            </XStack>
            {selisih !== 0 && (
              <TextCaption color={ColorNeutral.neutral500} textAlign="center">
                {selisih > 0
                  ? "Kas lebih — periksa kembalian yang diberikan"
                  : "Kas kurang — periksa transaksi yang belum tercatat"}
              </TextCaption>
            )}
          </YStack>
        </YStack>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <AppButton
          variant="danger"
          size="lg"
          fullWidth
          title="Tutup Shift Sekarang"
          icon={
            <Ionicons name="moon-outline" size={18} color={ColorBase.white} />
          }
          onPress={handleTutupShift}
        />
        <TextCaption
          color={ColorNeutral.neutral400}
          textAlign="center"
          marginTop={6}
        >
          Laporan shift akan tersimpan otomatis
        </TextCaption>
      </View>
    </SafeAreaView>
  );
}

function InfoBox({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <YStack
      flex={1}
      backgroundColor="rgba(255,255,255,0.15)"
      borderRadius={10}
      padding={12}
      gap={4}
    >
      <TextBodySm color={ColorPrimary.primary200}>{label}</TextBodySm>
      <TextBodyLg
        fontWeight="700"
        color={(valueColor as string) ?? ColorBase.white}
        numberOfLines={1}
      >
        {value}
      </TextBodyLg>
    </YStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorBase.bgScreen,
  },
  numpadRow: {
    height: 54,
    flexDirection: "row",
    gap: 8,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: ColorBase.white,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 28,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: ColorNeutral.neutral200,
  },
});
