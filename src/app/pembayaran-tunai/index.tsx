import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  PageHeader,
  TextBody,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH1,
  TextH2,
} from "@/components";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
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
  variant = "default",
}: {
  label: string;
  onPress: () => void;
  variant?: "default" | "accent" | "delete";
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.numpadBtn,
        variant === "accent" && styles.numpadBtnAccent,
        variant === "delete" && styles.numpadBtnDelete,
      ]}
    >
      {variant === "delete" ? (
        <Ionicons name="backspace-outline" size={24} color="#EF4444" />
      ) : (
        <TextH2
          fontWeight="600"
          color={variant === "accent" ? "#16A34A" : "#111827"}
        >
          {label}
        </TextH2>
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

  const total = Number(params.total ?? 0);
  const totalItems = Number(params.totalItems ?? 0);
  const discount = Number(params.discount ?? 0);

  const [inputValue, setInputValue] = useState("0");

  const receivedAmount = Number(inputValue);
  const change = receivedAmount - total;
  const isExact = receivedAmount === total;
  const isEnough = receivedAmount >= total;
  const isError = receivedAmount > 0 && !isEnough;

  // Generate smart suggestions based on total
  const suggestions = generateSuggestions(total);

  function generateSuggestions(amount: number): number[] {
    const result: number[] = [];
    // Round up to nearest 10k, 50k, 100k
    const roundUp10k = Math.ceil(amount / 10000) * 10000;
    if (roundUp10k >= amount) result.push(roundUp10k);

    const roundUp50k = Math.ceil(amount / 50000) * 50000;
    if (roundUp50k > roundUp10k) result.push(roundUp50k);

    const roundUp100k = Math.ceil(amount / 100000) * 100000;
    if (roundUp100k > roundUp50k) result.push(roundUp100k);

    // Deduplicate and take max 3
    return [...new Set(result)].slice(0, 3);
  }

  function handleNumpad(key: string) {
    setInputValue((prev) => {
      if (key === "DEL") {
        const next = prev.slice(0, -1);
        return next.length === 0 ? "0" : next;
      }
      if (prev === "0") return key;
      if (prev.length >= 12) return prev; // max digits
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PageHeader
        title="Pembayaran Tunai"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <YStack paddingHorizontal={16} gap={16} paddingTop={4}>
          {/* Total display */}
          <YStack alignItems="center" gap={4} paddingVertical={8}>
            <TextCaption color="$colorSecondary">
              Total yang harus dibayar
            </TextCaption>
            <TextH1 fontWeight="700" color="#2563EB">
              {formatPrice(total)}
            </TextH1>
          </YStack>

          {/* Received amount display */}
          <View style={styles.receivedCard}>
            <TextCaption color="$colorSecondary">Uang Diterima</TextCaption>
            <TextH1 fontWeight="700" fontSize={40} marginTop={4}>
              {formatPrice(receivedAmount)}
            </TextH1>
            <View style={styles.inputUnderline} />
          </View>

          {/* Suggestion chips */}
          <XStack justifyContent="center" gap={10} flexWrap="wrap">
            {suggestions.map((amount) => (
              <SuggestionChip
                key={amount}
                amount={amount}
                selected={receivedAmount === amount}
                onPress={() => handleSuggestion(amount)}
              />
            ))}
          </XStack>

          {/* Change / Info card */}
          <View style={[styles.infoCard, isError && styles.infoCardError]}>
            <YStack gap={8}>
              <XStack justifyContent="space-between">
                <TextBody color={isError ? "#991B1B" : "$colorSecondary"}>
                  Total Tagihan
                </TextBody>
                <TextBody
                  fontWeight="600"
                  color={isError ? "#991B1B" : undefined}
                >
                  {formatPrice(total)}
                </TextBody>
              </XStack>
              <XStack justifyContent="space-between">
                <TextBody color={isError ? "#991B1B" : "$colorSecondary"}>
                  Uang Diterima
                </TextBody>
                <TextBody
                  fontWeight="600"
                  color={isError ? "#991B1B" : undefined}
                >
                  {formatPrice(receivedAmount)}
                </TextBody>
              </XStack>
              <View
                style={[
                  styles.divider,
                  isError && { backgroundColor: "#FECACA" },
                ]}
              />
              <XStack justifyContent="space-between" alignItems="center">
                <TextBodyLg
                  fontWeight="700"
                  color={isError ? "#DC2626" : "#16A34A"}
                >
                  Kembalian
                </TextBodyLg>
                <XStack alignItems="center" gap={8}>
                  {isEnough && receivedAmount > 0 && (
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={14} color="white" />
                    </View>
                  )}
                  <TextH2
                    fontWeight="700"
                    color={isError ? "#DC2626" : "#16A34A"}
                  >
                    {isEnough
                      ? formatPrice(change)
                      : formatPrice(total - receivedAmount)}
                  </TextH2>
                </XStack>
              </XStack>
            </YStack>

            {/* Error hint */}
            {isError && (
              <View style={styles.errorHint}>
                <Ionicons name="alert-circle" size={18} color="#DC2626" />
                <YStack flex={1} gap={2}>
                  <TextBodySm fontWeight="700" color="#DC2626">
                    Mode error jika uang kurang{" "}
                    {formatPrice(total - receivedAmount)}
                  </TextBodySm>
                  <TextCaption color="#991B1B">
                    Kartu ini akan berubah merah dan tombol tidak aktif
                  </TextCaption>
                </YStack>
              </View>
            )}
          </View>

          {/* Numpad */}
          <View style={styles.numpadCard}>
            <TextCaption
              color="$colorSecondary"
              fontWeight="700"
              letterSpacing={1}
              marginBottom={12}
            >
              NUMPAD
            </TextCaption>
            <View style={styles.numpadGrid}>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((key) => (
                <NumpadButton
                  key={key}
                  label={key}
                  onPress={() => handleNumpad(key)}
                />
              ))}
              <NumpadButton
                label="000"
                variant="accent"
                onPress={() => handleNumpad("000")}
              />
              <NumpadButton label="0" onPress={() => handleNumpad("0")} />
              <NumpadButton
                label=""
                variant="delete"
                onPress={() => handleNumpad("DEL")}
              />
            </View>
          </View>
        </YStack>
      </ScrollView>

      {/* Bottom action */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.confirmBtn, !isEnough && styles.confirmBtnDisabled]}
          disabled={!isEnough || receivedAmount === 0}
          onPress={handleConfirm}
        >
          <TextBodyLg fontWeight="700" color="white">
            Konfirmasi Pembayaran
          </TextBodyLg>
        </TouchableOpacity>
        <TextCaption color="$colorSecondary" textAlign="center" marginTop={8}>
          Kembalian akan otomatis tercatat
        </TextCaption>
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
  receivedCard: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#DBEAFE",
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  inputUnderline: {
    width: 180,
    height: 2.5,
    backgroundColor: "#2563EB",
    borderRadius: 2,
    marginTop: 8,
    opacity: 0.4,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#2563EB",
    backgroundColor: "white",
  },
  chipSelected: {
    backgroundColor: "#2563EB",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoCardError: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
  },
  checkBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },
  errorHint: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  numpadCard: {
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  numpadGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  numpadBtn: {
    width: "30%",
    flex: 1,
    minWidth: "30%",
    aspectRatio: 1.8,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  numpadBtnAccent: {
    backgroundColor: "#F0FDF4",
    borderColor: "#BBF7D0",
  },
  numpadBtnDelete: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 28,
  },
  confirmBtn: {
    backgroundColor: "#16A34A",
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBtnDisabled: {
    opacity: 0.5,
  },
});
