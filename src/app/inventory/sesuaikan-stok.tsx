import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  AppButton,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextDisplayXl,
  TextH3,
} from "@/components";
import {
  ColorBase,
  ColorNeutral,
  ColorPrimary,
  ColorSuccess,
  ColorWarning,
} from "@/themes/Colors";

// ─── Types ────────────────────────────────────────────────────────────────────

type AdjustmentType = "tambah" | "kurang" | "set";

const QUICK_AMOUNTS = [5, 10, 25, 50, 100];

const REASONS = [
  "Restock / Pembelian",
  "Rusak / Hilang",
  "Koreksi Opname",
  "Penjualan Manual",
  "Lainnya",
];

// Mock variant combinations
const VARIANT_OPTIONS = [
  { id: "sh", label: "Small - Hot", stock: 20 },
  { id: "si", label: "Small - Ice", stock: 15 },
  { id: "mh", label: "Medium - Hot", stock: 18 },
  { id: "mi", label: "Medium - Ice", stock: 12 },
  { id: "lh", label: "Large - Hot", stock: 8 },
  { id: "li", label: "Large - Ice", stock: 4 },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SesuaikanStokPage() {
  const router = useRouter();
  const { productName, productSku, productCategory } =
    useLocalSearchParams<{
      productName?: string;
      productSku?: string;
      productCategory?: string;
    }>();

  const [selectedVariantId, setSelectedVariantId] = useState(
    VARIANT_OPTIONS[2].id,
  );
  const [adjustType, setAdjustType] = useState<AdjustmentType>("tambah");
  const [amount, setAmount] = useState(25);
  const [reason, setReason] = useState(REASONS[0]);
  const [catatan, setCatatan] = useState("");

  const selectedVariant =
    VARIANT_OPTIONS.find((v) => v.id === selectedVariantId) ??
    VARIANT_OPTIONS[0];

  const currentStock = selectedVariant.stock;

  const resultStock =
    adjustType === "tambah"
      ? currentStock + amount
      : adjustType === "kurang"
        ? Math.max(0, currentStock - amount)
        : amount;

  const delta = resultStock - currentStock;
  const isIncrease = delta > 0;
  const isDecrease = delta < 0;

  function handleNumpad(key: string) {
    if (key === "C") {
      setAmount(0);
      return;
    }
    if (key === "⌫") {
      setAmount((prev) => Math.floor(prev / 10));
      return;
    }
    const digit = parseInt(key, 10);
    setAmount((prev) => {
      const next = prev * 10 + digit;
      return next > 9999 ? prev : next;
    });
  }

  function handleSimpan() {
    if (amount === 0 && adjustType !== "set") {
      Alert.alert("Jumlah penyesuaian tidak boleh 0.");
      return;
    }
    Alert.alert(
      "Berhasil",
      `Stok "${selectedVariant.label}" diubah dari ${currentStock} → ${resultStock} unit.`,
      [{ text: "OK", onPress: () => router.back() }],
    );
  }

  const displayValue =
    adjustType === "set"
      ? String(amount)
      : adjustType === "tambah"
        ? `+${amount}`
        : `-${amount}`;

  const displayColor =
    adjustType === "set"
      ? ColorPrimary.primary600
      : adjustType === "tambah"
        ? ColorSuccess.success600
        : "#DC2626";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
        backgroundColor={ColorBase.white}
        borderBottomWidth={1}
        borderBottomColor={ColorNeutral.neutral200}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={ColorPrimary.primary600}
          />
        </TouchableOpacity>

        <YStack flex={1} marginLeft={12}>
          <TextH3 fontWeight="700">Sesuaikan Stok</TextH3>
          <TextCaption color={ColorNeutral.neutral500}>
            {productName ?? "Kopi Susu"}
          </TextCaption>
        </YStack>

        <View style={{ width: 36 }} />
      </XStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Product Info Card ── */}
        <XStack
          backgroundColor={ColorNeutral.neutral50}
          borderRadius={16}
          padding={14}
          alignItems="center"
          gap="$3"
        >
          <View style={styles.productImagePlaceholder}>
            <Ionicons name="cafe" size={22} color={ColorPrimary.primary600} />
          </View>
          <YStack flex={1}>
            <TextBodyLg fontWeight="700">
              {productName ?? "Kopi Susu"}
            </TextBodyLg>
            <XStack alignItems="center" gap="$2" marginTop={4}>
              <View style={styles.categoryBadge}>
                <TextCaption fontWeight="700" color={ColorPrimary.primary700}>
                  {productCategory ?? "MINUMAN"}
                </TextCaption>
              </View>
              <TextCaption color={ColorNeutral.neutral500}>
                {productSku ?? "KPS-001"}
              </TextCaption>
            </XStack>
          </YStack>
          <YStack alignItems="flex-end">
            <TextCaption
              color={ColorNeutral.neutral500}
              style={{ textTransform: "uppercase", letterSpacing: 0.5 }}
            >
              Stok Saat Ini
            </TextCaption>
            <XStack alignItems="baseline" gap={2}>
              <TextDisplayXl
                fontWeight="700"
                color={ColorPrimary.primary600}
                style={{ lineHeight: 44 }}
              >
                {currentStock}
              </TextDisplayXl>
              <TextCaption color={ColorNeutral.neutral500}>unit</TextCaption>
            </XStack>
          </YStack>
        </XStack>

        {/* ── Pilih Variant ── */}
        <YStack gap="$2">
          <TextCaption
            fontWeight="700"
            color={ColorNeutral.neutral500}
            letterSpacing={0.8}
            paddingHorizontal="$1"
            style={{ textTransform: "uppercase" }}
          >
            Pilih Variant
          </TextCaption>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.variantScroll}
          >
            {VARIANT_OPTIONS.map((v) => {
              const isSelected = v.id === selectedVariantId;
              const isLowStock = v.stock <= 5;
              return (
                <TouchableOpacity
                  key={v.id}
                  style={[
                    styles.variantChip,
                    isSelected
                      ? styles.variantChipActive
                      : styles.variantChipInactive,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setSelectedVariantId(v.id)}
                >
                  <TextBodySm
                    fontWeight={isSelected ? "700" : "500"}
                    color={isSelected ? ColorBase.white : ColorNeutral.neutral700}
                  >
                    {v.label}
                  </TextBodySm>
                  {isLowStock && (
                    <View style={styles.lowStockDot} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <XStack alignItems="center" gap="$1" paddingHorizontal="$1">
            <Ionicons
              name="information-circle-outline"
              size={14}
              color={ColorNeutral.neutral400}
            />
            <TextCaption color={ColorNeutral.neutral500}>
              Stok variant ini:{" "}
              <TextCaption fontWeight="700" color={ColorNeutral.neutral800}>
                {currentStock} unit
              </TextCaption>
            </TextCaption>
          </XStack>
        </YStack>

        {/* ── Tipe Penyesuaian ── */}
        <XStack
          backgroundColor={ColorNeutral.neutral100}
          borderRadius={14}
          padding={4}
        >
          {(
            [
              { key: "tambah", label: "Tambah", icon: "add" },
              { key: "kurang", label: "Kurang", icon: "remove" },
              { key: "set", label: "Set", icon: "swap-horizontal" },
            ] as { key: AdjustmentType; label: string; icon: string }[]
          ).map(({ key, label, icon }) => {
            const isActive = adjustType === key;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.adjustTypeBtn,
                  isActive && styles.adjustTypeBtnActive,
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  setAdjustType(key);
                  setAmount(0);
                }}
              >
                <Ionicons
                  name={icon as any}
                  size={16}
                  color={
                    isActive ? ColorSuccess.success700 : ColorNeutral.neutral500
                  }
                />
                <TextBodySm
                  fontWeight={isActive ? "700" : "500"}
                  color={
                    isActive ? ColorSuccess.success700 : ColorNeutral.neutral500
                  }
                >
                  {label}
                </TextBodySm>
              </TouchableOpacity>
            );
          })}
        </XStack>

        {/* ── Amount Display + Quick Buttons ── */}
        <YStack
          backgroundColor={ColorBase.white}
          borderRadius={24}
          paddingVertical={20}
          paddingHorizontal={16}
          alignItems="center"
          gap="$4"
          borderWidth={1}
          borderColor={ColorNeutral.neutral100}
        >
          <TextDisplayXl
            fontWeight="800"
            style={{ color: displayColor, lineHeight: 52 }}
          >
            {displayValue}
          </TextDisplayXl>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickAmountScroll}
          >
            {QUICK_AMOUNTS.map((q) => {
              const label =
                adjustType === "set" ? String(q) : `+${q}`;
              const isSelected = amount === q;
              return (
                <TouchableOpacity
                  key={q}
                  style={[
                    styles.quickChip,
                    isSelected ? styles.quickChipActive : styles.quickChipInactive,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setAmount(q)}
                >
                  <TextBodySm
                    fontWeight={isSelected ? "700" : "600"}
                    color={
                      isSelected ? ColorBase.white : ColorNeutral.neutral700
                    }
                  >
                    {label}
                  </TextBodySm>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </YStack>

        {/* ── Numpad ── */}
        <View style={styles.numpadGrid}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map(
            (key) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.numpadBtn,
                  (key === "C" || key === "⌫") && styles.numpadBtnDanger,
                ]}
                activeOpacity={0.7}
                onPress={() => handleNumpad(key)}
              >
                {key === "⌫" ? (
                  <Ionicons name="backspace-outline" size={24} color="#DC2626" />
                ) : (
                  <TextBodyLg
                    fontWeight="700"
                    fontSize={20}
                    color={key === "C" ? "#DC2626" : ColorNeutral.neutral800}
                  >
                    {key}
                  </TextBodyLg>
                )}
              </TouchableOpacity>
            ),
          )}
        </View>

        {/* ── Alasan ── */}
        <YStack
          backgroundColor={ColorBase.white}
          borderRadius={12}
          padding="$4"
          gap="$3"
        >
          <TextCaption
            fontWeight="700"
            color={ColorNeutral.neutral500}
            letterSpacing={0.8}
            style={{ textTransform: "uppercase" }}
          >
            Alasan Penyesuaian
          </TextCaption>

          <XStack flexWrap="wrap" gap="$2">
            {REASONS.map((r) => {
              const isSelected = reason === r;
              return (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.reasonChip,
                    isSelected
                      ? styles.reasonChipActive
                      : styles.reasonChipInactive,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setReason(r)}
                >
                  <TextBodySm
                    fontWeight={isSelected ? "700" : "500"}
                    color={
                      isSelected
                        ? ColorPrimary.primary600
                        : ColorNeutral.neutral600
                    }
                  >
                    {r}
                  </TextBodySm>
                </TouchableOpacity>
              );
            })}
          </XStack>

          <XStack
            borderWidth={1}
            borderColor={ColorNeutral.neutral200}
            borderRadius={10}
            backgroundColor={ColorNeutral.neutral50}
            padding="$3"
          >
            <TextInput
              style={[styles.textarea]}
              placeholder="Catatan tambahan... (opsional)"
              placeholderTextColor={ColorNeutral.neutral400}
              value={catatan}
              onChangeText={setCatatan}
              multiline
              numberOfLines={2}
            />
          </XStack>
        </YStack>

        {/* ── Preview Card ── */}
        <YStack
          backgroundColor={ColorBase.white}
          borderRadius={12}
          padding="$4"
          gap="$3"
          borderLeftWidth={3}
          borderLeftColor={
            isIncrease
              ? ColorSuccess.success600
              : isDecrease
                ? "#DC2626"
                : ColorPrimary.primary600
          }
          style={styles.previewCard}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <YStack>
              <TextCaption color={ColorNeutral.neutral500} fontWeight="500">
                Sebelum
              </TextCaption>
              <XStack alignItems="baseline" gap={4}>
                <TextH3 fontWeight="700" fontSize={24}>
                  {currentStock}
                </TextH3>
                <TextCaption color={ColorNeutral.neutral500}>unit</TextCaption>
              </XStack>
            </YStack>

            <Ionicons
              name={
                isIncrease
                  ? "trending-up"
                  : isDecrease
                    ? "trending-down"
                    : "swap-horizontal"
              }
              size={28}
              color={
                isIncrease
                  ? ColorSuccess.success600
                  : isDecrease
                    ? "#DC2626"
                    : ColorPrimary.primary600
              }
            />

            <YStack alignItems="flex-end">
              <TextCaption
                fontWeight="700"
                color={
                  isIncrease
                    ? ColorSuccess.success600
                    : isDecrease
                      ? "#DC2626"
                      : ColorPrimary.primary600
                }
              >
                Sesudah
              </TextCaption>
              <XStack alignItems="baseline" gap={4}>
                <TextH3
                  fontWeight="800"
                  fontSize={24}
                  color={
                    isIncrease
                      ? ColorSuccess.success700
                      : isDecrease
                        ? "#B91C1C"
                        : ColorPrimary.primary700
                  }
                >
                  {resultStock}
                </TextH3>
                <TextCaption
                  color={
                    isIncrease
                      ? ColorSuccess.success600
                      : isDecrease
                        ? "#DC2626"
                        : ColorPrimary.primary600
                  }
                  fontWeight="700"
                >
                  unit
                </TextCaption>
              </XStack>
            </YStack>
          </XStack>

          <XStack
            paddingTop="$2"
            borderTopWidth={1}
            borderTopColor={ColorNeutral.neutral100}
            alignItems="center"
            gap="$2"
          >
            <View
              style={[
                styles.deltaDot,
                {
                  backgroundColor: isIncrease
                    ? ColorSuccess.success600
                    : isDecrease
                      ? "#DC2626"
                      : ColorPrimary.primary600,
                },
              ]}
            />
            <TextBodySm
              fontWeight="700"
              color={
                isIncrease
                  ? ColorSuccess.success600
                  : isDecrease
                    ? "#DC2626"
                    : ColorPrimary.primary600
              }
            >
              {delta > 0 ? `+${delta}` : delta} unit{" "}
              {adjustType === "set"
                ? "diset manual"
                : adjustType === "tambah"
                  ? "ditambahkan"
                  : "dikurangkan"}
            </TextBodySm>
          </XStack>
        </YStack>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <AppButton
          variant="primary"
          size="lg"
          fullWidth
          title="Simpan Penyesuaian"
          onPress={handleSimpan}
        />
        <TextCaption
          color={ColorNeutral.neutral400}
          textAlign="center"
          marginTop={6}
        >
          Perubahan akan dicatat di riwayat stok
        </TextCaption>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  productImagePlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  variantScroll: {
    gap: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  variantChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  variantChipActive: {
    backgroundColor: ColorPrimary.primary600,
  },
  variantChipInactive: {
    backgroundColor: "#E5E7EB",
  },
  lowStockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F59E0B",
  },
  adjustTypeBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 10,
  },
  adjustTypeBtnActive: {
    backgroundColor: ColorBase.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAmountScroll: {
    gap: 10,
    paddingHorizontal: 4,
  },
  quickChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  quickChipActive: {
    backgroundColor: ColorSuccess.success600,
  },
  quickChipInactive: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: ColorBase.white,
  },
  numpadGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 8,
  },
  numpadBtn: {
    width: "30%",
    height: 56,
    backgroundColor: ColorBase.white,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  numpadBtnDanger: {
    backgroundColor: "#FEF2F2",
  },
  reasonChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  reasonChipActive: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
  },
  reasonChipInactive: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  textarea: {
    flex: 1,
    fontSize: 13,
    color: "#1F2937",
    minHeight: 52,
    textAlignVertical: "top",
  },
  previewCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  deltaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bottomBar: {
    backgroundColor: ColorBase.white,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
  },
});
