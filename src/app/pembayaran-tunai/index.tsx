import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  AppButton,
  PageHeader,
  TextBody,
  TextBodySm,
  TextCaption,
  TextH1,
  TextH3,
} from "@/components";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID").replace(/,/g, ".")}`;
}

// ─── Suggestion Chip ──────────────────────────────────────────────────────────

function SuggestionChip({
  amount,
  selected,
  onPress,
}: {
  amount: number;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.chip, selected && styles.chipSelected]}>
        <TextBodySm fontWeight="600" color={selected ? "white" : "#2563EB"}>
          {formatPrice(amount)}
        </TextBodySm>
      </View>
    </TouchableOpacity>
  );
}

// ─── Numpad Button ────────────────────────────────────────────────────────────

function NumpadButton({
  label,
  onPress,
  textColor = "#111827",
  bgColor = "#F4F5F9",
  isIcon = false,
}: {
  label: string;
  onPress: () => void;
  textColor?: string;
  bgColor?: string;
  isIcon?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.numpadBtn, { backgroundColor: bgColor }]}
    >
      {isIcon ? (
        <Ionicons name="backspace" size={22} color="#DC2626" />
      ) : (
        <TextH3 fontWeight="700" color={textColor} fontSize={20}>
          {label}
        </TextH3>
      )}
    </TouchableOpacity>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PembayaranTunaiPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    total: string;
    totalItems: string;
    discount: string;
  }>();

  const total = Number(params.total ?? 88800);
  const totalItems = Number(params.totalItems ?? 0);
  const discount = Number(params.discount ?? 0);

  const [inputValue, setInputValue] = useState("0");

  const receivedAmount = Number(inputValue);
  const change = receivedAmount - total;
  const isEnough = receivedAmount >= total;

  const suggestions = [
    Math.ceil(total / 10000) * 10000 - 10000,
    Math.ceil(total / 10000) * 10000,
    Math.ceil(total / 50000) * 50000,
    Math.ceil(total / 100000) * 100000,
  ].filter((v, i, arr) => v > 0 && arr.indexOf(v) === i);

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

  function handleSuggestion(amount: number) {
    setInputValue(String(amount));
  }

  function handleConfirm() {
    router.push({
      pathname: "/pembayaran-sukses",
      params: {
        total: String(total),
        totalItems: String(totalItems),
        discount: String(discount),
        method: "Tunai",
        received: String(receivedAmount),
        change: String(change > 0 ? change : 0),
      },
    });
  }

  const numpadRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["000", "0", "DEL"],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader
        title="Pembayaran Tunai"
        showBack
        onBack={() => router.back()}
      />

      <View style={styles.content}>
        {/* Total display */}
        <YStack alignItems="center" gap={2}>
          <TextBodySm color="#6B7280" fontWeight="600" letterSpacing={0.5}>
            TOTAL YANG HARUS DIBAYAR
          </TextBodySm>
          <TextH1 fontWeight="700" color="#2563EB" fontSize={26}>
            {formatPrice(total)}
          </TextH1>
        </YStack>

        {/* Received amount display */}
        <YStack alignItems="center" marginTop={8}>
          <TextBodySm color="#6B7280" fontWeight="500">
            Uang Diterima
          </TextBodySm>
          <TextH1 fontWeight="800" marginTop={2} color="#111827">
            {formatPrice(receivedAmount)}
          </TextH1>
          <View style={styles.inputUnderline} />
        </YStack>

        {/* Suggestion chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
          contentContainerStyle={styles.chipsContainer}
        >
          {suggestions.map((amount) => (
            <SuggestionChip
              key={amount}
              amount={amount}
              selected={receivedAmount === amount}
              onPress={() => handleSuggestion(amount)}
            />
          ))}
        </ScrollView>

        {/* Info card */}
        <View style={styles.infoCard}>
          <XStack justifyContent="space-between" alignItems="center">
            <TextBodySm color="#374151">Total Tagihan</TextBodySm>
            <TextBodySm fontWeight="600" color="#374151">
              {formatPrice(total)}
            </TextBodySm>
          </XStack>
          <XStack
            justifyContent="space-between"
            alignItems="center"
            marginTop={6}
          >
            <TextBodySm color="#374151">Uang Diterima</TextBodySm>
            <TextBodySm fontWeight="600" color="#374151">
              {formatPrice(receivedAmount)}
            </TextBodySm>
          </XStack>
          <View style={styles.divider} />
          <XStack justifyContent="space-between" alignItems="center">
            <TextBody fontWeight="700" color="#16A34A">
              Kembalian
            </TextBody>
            <XStack alignItems="center" gap={6}>
              {isEnough && (
                <View style={styles.checkBadge}>
                  <Ionicons name="checkmark" size={12} color="#16A34A" />
                </View>
              )}
              <TextBody fontWeight="800" color="#16A34A">
                {isEnough ? formatPrice(change) : "Rp 0"}
              </TextBody>
            </XStack>
          </XStack>
        </View>

        {/* Numpad */}
        <View style={styles.numpad}>
          {numpadRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.numpadRow}>
              {row.map((key) =>
                key === "DEL" ? (
                  <NumpadButton
                    key="DEL"
                    label=""
                    bgColor="#FCE8E8"
                    onPress={() => handleNumpad("DEL")}
                    isIcon
                  />
                ) : key === "000" ? (
                  <NumpadButton
                    key="000"
                    label="000"
                    bgColor="#EEF2FF"
                    textColor="#2563EB"
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

      {/* Bottom action */}
      <View style={styles.bottomBar}>
        <AppButton
          title="Konfirmasi Pembayaran"
          variant="success"
          onPress={handleConfirm}
          disabled={!isEnough}
        />
        <TextCaption color="#6B7280" textAlign="center" marginTop={6}>
          Kembalian akan otomatis tercatat
        </TextCaption>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.batalBtn}
          activeOpacity={0.7}
        >
          <TextBody fontWeight="700" color="#374151" letterSpacing={1}>
            BATAL
          </TextBody>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  inputUnderline: {
    width: 220,
    height: 2,
    backgroundColor: "#BFDBFE",
    marginTop: 6,
  },
  chipsContainer: {
    paddingHorizontal: 4,
    gap: 10,
    flexDirection: "row",
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#2563EB",
    backgroundColor: "white",
    minWidth: 90,
    alignItems: "center",
  },
  chipSelected: {
    backgroundColor: "#2563EB",
  },
  infoCard: {
    backgroundColor: "#EAF5ED",
    borderRadius: 16,
    padding: 12,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#D1E8DD",
    marginVertical: 8,
  },
  checkBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#D1FADD",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#16A34A",
  },
  numpad: {
    marginVertical: 10,
    gap: 8,
  },
  numpadRow: {
    height: 54,
    flexDirection: "row",
    gap: 8,
  },
  numpadBtn: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBar: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
  },
  batalBtn: {
    alignItems: "center",
    paddingVertical: 10,
  },
});
