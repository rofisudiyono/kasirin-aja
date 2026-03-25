import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
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
  TextH3,
} from "@/shared/components";
import {
  ColorBase,
  ColorGreen,
  ColorNeutral,
  ColorPrimary,
  ColorSuccess,
} from "@/shared/themes/Colors";

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "Makanan" | "Minuman" | "Snack" | "";

interface VariantGroup {
  name: string;
  values: string[];
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  return (
    <TextCaption
      fontWeight="600"
      color={ColorNeutral.neutral500}
      letterSpacing={0.8}
      style={{ textTransform: "uppercase" }}
    >
      {title}
    </TextCaption>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────
function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <YStack gap={6}>
      <XStack gap={2}>
        <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
          {label}
        </TextBodySm>
        {required && (
          <TextBodySm fontWeight="500" color="#DC2626">
            {" *"}
          </TextBodySm>
        )}
      </XStack>
      {children}
    </YStack>
  );
}

// ─── Text Input Field ─────────────────────────────────────────────────────────
function StyledInput({
  value,
  onChangeText,
  placeholder,
  rightElement,
  multiline,
  keyboardType,
}: {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  rightElement?: React.ReactNode;
  multiline?: boolean;
  keyboardType?: "default" | "numeric";
}) {
  const [focused, setFocused] = useState(false);
  return (
    <XStack
      borderWidth={1.5}
      borderColor={focused ? ColorPrimary.primary600 : ColorNeutral.neutral200}
      borderRadius={10}
      backgroundColor={ColorBase.white}
      paddingHorizontal={14}
      paddingVertical={multiline ? 12 : 0}
      alignItems={multiline ? "flex-start" : "center"}
      minHeight={multiline ? 88 : 44}
    >
      <TextInput
        style={[
          styles.input,
          multiline && { height: 64, textAlignVertical: "top" },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={ColorNeutral.neutral400}
        multiline={multiline}
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {rightElement}
    </XStack>
  );
}

// ─── Variant Tag ──────────────────────────────────────────────────────────────
function VariantTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <XStack
      backgroundColor={ColorNeutral.neutral100}
      borderRadius={20}
      paddingHorizontal={12}
      paddingVertical={6}
      alignItems="center"
      gap={6}
    >
      <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
        {label}
      </TextBodySm>
      <TouchableOpacity onPress={onRemove} hitSlop={8}>
        <Ionicons name="close" size={14} color={ColorNeutral.neutral500} />
      </TouchableOpacity>
    </XStack>
  );
}

// ─── Photo Slot ───────────────────────────────────────────────────────────────
function AddPhotoSlot() {
  return (
    <YStack
      width={72}
      height={72}
      borderRadius={10}
      borderWidth={1.5}
      borderColor={ColorPrimary.primary400 ?? ColorPrimary.primary200}
      borderStyle="dashed"
      backgroundColor={ColorPrimary.primary50 ?? ColorPrimary.primary25}
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Ionicons
        name="camera-outline"
        size={22}
        color={ColorPrimary.primary400}
      />
      <TextCaption
        fontWeight="500"
        color={ColorPrimary.primary600}
        fontSize={10}
      >
        + Foto
      </TextCaption>
    </YStack>
  );
}

function FilledPhotoSlot({ onRemove }: { onRemove: () => void }) {
  return (
    <YStack width={72} height={72} borderRadius={10} overflow="hidden">
      <YStack
        flex={1}
        backgroundColor={ColorNeutral.neutral200}
        alignItems="center"
        justifyContent="center"
      >
        <Ionicons
          name="image-outline"
          size={28}
          color={ColorNeutral.neutral400}
        />
      </YStack>
      <TouchableOpacity
        onPress={onRemove}
        style={styles.photoRemoveBtn}
        hitSlop={4}
      >
        <Ionicons name="close-circle" size={20} color="#DC2626" />
      </TouchableOpacity>
    </YStack>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TambahProdukPage() {
  const router = useRouter();

  // Form state
  const [photos, setPhotos] = useState<string[]>(["1", "2"]); // mock 2 filled
  const [namaProduk, setNamaProduk] = useState("Kopi Susu");
  const [sku, setSku] = useState("KPS-001");
  const [barcode, setBarcode] = useState("");
  const [kategori, setKategori] = useState<Category>("Minuman");
  const [deskripsi, setDeskripsi] = useState("");
  const [hargaModal, setHargaModal] = useState("8000");
  const [hargaJual, setHargaJual] = useState("15000");
  const [hasVariant, setHasVariant] = useState(true);
  const [variantGroups, setVariantGroups] = useState<VariantGroup[]>([
    { name: "Ukuran", values: ["Small", "Medium", "Large"] },
  ]);
  const [stokAwal, setStokAwal] = useState("100");
  const [minAlert, setMinAlert] = useState("10");
  const [satuan, setSatuan] = useState("pcs");
  const [isActive, setIsActive] = useState(true);

  // ─── Computed ───────────────────────────────────────────────────────────────
  const modal = parseInt(hargaModal.replace(/\D/g, "") || "0", 10);
  const jual = parseInt(hargaJual.replace(/\D/g, "") || "0", 10);
  const margin = jual - modal;
  const marginPct = jual > 0 ? Math.round((margin / jual) * 100) : 0;

  function formatRp(val: string) {
    const num = parseInt(val.replace(/\D/g, "") || "0", 10);
    return num.toLocaleString("id-ID");
  }

  function removeVariantValue(groupIdx: number, valIdx: number) {
    setVariantGroups((prev) =>
      prev.map((g, gi) =>
        gi === groupIdx
          ? { ...g, values: g.values.filter((_, vi) => vi !== valIdx) }
          : g,
      ),
    );
  }

  function removePhoto(idx: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  }

  const CATEGORIES: Category[] = ["Makanan", "Minuman", "Snack"];

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
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
          style={styles.batalBtn}
          activeOpacity={0.7}
        >
          <Ionicons
            name="close"
            size={18}
            color={ColorNeutral.neutral700 ?? ColorNeutral.neutral500}
          />
          <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
            Batal
          </TextBodySm>
        </TouchableOpacity>

        <TextH3 fontWeight="700" flex={1} textAlign="center">
          Tambah Produk
        </TextH3>

        <AppButton
          variant="primary"
          size="sm"
          title="Simpan"
          onPress={() => router.back()}
        />
      </XStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ══════════════════════════════════════════════════════════════════════
            FOTO PRODUK
        ══════════════════════════════════════════════════════════════════════ */}
        <YStack
          backgroundColor={ColorBase.white}
          borderRadius={12}
          padding="$4"
          gap="$3"
        >
          <SectionHeader title="Foto Produk" />
          <XStack gap="$2" flexWrap="wrap">
            {photos.map((_, idx) => (
              <FilledPhotoSlot key={idx} onRemove={() => removePhoto(idx)} />
            ))}
            {photos.length < 5 && <AddPhotoSlot />}
          </XStack>
          <TextCaption color={ColorNeutral.neutral400}>
            Maks. 5 foto
          </TextCaption>
        </YStack>

        {/* ══════════════════════════════════════════════════════════════════════
            INFORMASI DASAR
        ══════════════════════════════════════════════════════════════════════ */}
        <YStack
          backgroundColor={ColorBase.white}
          borderRadius={12}
          padding="$4"
          gap="$4"
        >
          <SectionHeader title="Informasi Dasar" />

          {/* Nama Produk */}
          <FormField label="Nama Produk" required>
            <StyledInput
              value={namaProduk}
              onChangeText={setNamaProduk}
              placeholder="Contoh: Kopi Susu"
            />
          </FormField>

          {/* SKU */}
          <FormField label="SKU">
            <StyledInput
              value={sku}
              onChangeText={setSku}
              placeholder="Contoh: KPS-001"
              rightElement={
                <TouchableOpacity
                  style={styles.autoBtn}
                  onPress={() =>
                    setSku(`SKU-${Date.now().toString().slice(-5)}`)
                  }
                >
                  <TextBodySm fontWeight="600" color={ColorPrimary.primary600}>
                    Auto
                  </TextBodySm>
                </TouchableOpacity>
              }
            />
          </FormField>

          {/* Barcode */}
          <FormField label="Barcode">
            <StyledInput
              value={barcode}
              onChangeText={setBarcode}
              placeholder="Scan atau ketik barcode"
              rightElement={
                <Ionicons
                  name="scan-outline"
                  size={20}
                  color={ColorNeutral.neutral400}
                />
              }
            />
          </FormField>

          {/* Kategori */}
          <FormField label="Kategori" required>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <XStack gap="$2">
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setKategori(cat)}
                    activeOpacity={0.7}
                  >
                    <YStack
                      paddingHorizontal={16}
                      paddingVertical={8}
                      borderRadius={20}
                      borderWidth={1.5}
                      borderColor={
                        kategori === cat
                          ? ColorPrimary.primary600
                          : ColorNeutral.neutral200
                      }
                      backgroundColor={
                        kategori === cat
                          ? (ColorPrimary.primary50 ?? ColorPrimary.primary25)
                          : ColorBase.white
                      }
                    >
                      <TextBodySm
                        fontWeight="600"
                        color={
                          kategori === cat
                            ? ColorPrimary.primary600
                            : ColorNeutral.neutral500
                        }
                      >
                        {cat}
                      </TextBodySm>
                    </YStack>
                  </TouchableOpacity>
                ))}
              </XStack>
            </ScrollView>
          </FormField>

          {/* Deskripsi */}
          <FormField label="Deskripsi">
            <StyledInput
              value={deskripsi}
              onChangeText={setDeskripsi}
              placeholder="Deskripsi produk (opsional)"
              multiline
            />
          </FormField>
        </YStack>

        {/* ══════════════════════════════════════════════════════════════════════
            HARGA
        ══════════════════════════════════════════════════════════════════════ */}
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
                  style={[styles.input, { flex: 1 }]}
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
                  style={[styles.input, { flex: 1 }]}
                  value={formatRp(hargaJual)}
                  onChangeText={(v) => setHargaJual(v.replace(/\D/g, ""))}
                  keyboardType="numeric"
                  placeholderTextColor={ColorNeutral.neutral400}
                />
              </XStack>
            </YStack>
          </XStack>

          {/* Margin */}
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

        {/* ══════════════════════════════════════════════════════════════════════
            VARIANT PRODUK
        ══════════════════════════════════════════════════════════════════════ */}
        <YStack
          backgroundColor={ColorBase.white}
          borderRadius={12}
          padding="$4"
          gap="$3"
        >
          <SectionHeader title="Variant Produk" />

          {/* Toggle row */}
          <XStack alignItems="center" justifyContent="space-between">
            <YStack flex={1} gap={2}>
              <TextBodyLg fontWeight="600">
                Produk ini memiliki variant
              </TextBodyLg>
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

          {/* Variant groups */}
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
                        onRemove={() => removeVariantValue(gi, vi)}
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

              {/* Tambah Grup Variant */}
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

        {/* ══════════════════════════════════════════════════════════════════════
            STOK
        ══════════════════════════════════════════════════════════════════════ */}
        <YStack
          backgroundColor={ColorBase.white}
          borderRadius={12}
          padding="$4"
          gap="$4"
        >
          <SectionHeader title="Stok" />

          <XStack gap="$3">
            {/* Stok Awal */}
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
                  style={[styles.input, { flex: 1 }]}
                  value={stokAwal}
                  onChangeText={setStokAwal}
                  keyboardType="numeric"
                  placeholderTextColor={ColorNeutral.neutral400}
                />
              </XStack>
            </YStack>

            {/* Minimum Alert */}
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
                  style={[styles.input, { flex: 1 }]}
                  value={minAlert}
                  onChangeText={setMinAlert}
                  keyboardType="numeric"
                  placeholderTextColor={ColorNeutral.neutral400}
                />
              </XStack>
            </YStack>

            {/* Satuan */}
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
                  style={[styles.input, { flex: 1 }]}
                  value={satuan}
                  onChangeText={setSatuan}
                  placeholderTextColor={ColorNeutral.neutral400}
                />
              </XStack>
            </YStack>
          </XStack>
        </YStack>

        {/* ══════════════════════════════════════════════════════════════════════
            STATUS PRODUK
        ══════════════════════════════════════════════════════════════════════ */}
        <YStack
          backgroundColor={ColorBase.white}
          borderRadius={12}
          padding="$4"
          gap="$3"
        >
          <SectionHeader title="Status Produk" />

          <XStack alignItems="center" justifyContent="space-between">
            <YStack flex={1} gap={2}>
              <TextBodyLg
                fontWeight="700"
                color={
                  isActive ? ColorSuccess.success600 : ColorNeutral.neutral500
                }
              >
                {isActive ? "Produk Aktif" : "Produk Nonaktif"}
              </TextBodyLg>
              <TextCaption color={ColorNeutral.neutral400}>
                {isActive
                  ? "Produk akan tampil di kasir"
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
      </ScrollView>

      {/* ── Bottom Bar ── */}
      <View style={styles.bottomBar}>
        <AppButton
          variant="primary"
          size="lg"
          fullWidth
          title="Simpan Produk"
          onPress={() => router.back()}
        />
        <TextCaption
          color={ColorNeutral.neutral400}
          textAlign="center"
          marginTop={6}
        >
          Semua perubahan akan langsung tersimpan ke inventori setelah
          dipublikasikan
        </TextCaption>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorBase.bgScreen,
  },
  scrollContent: {
    gap: 12,
    padding: 16,
    paddingBottom: 32,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    fontFamily: "System",
    color: ColorNeutral.neutral800,
    padding: 0,
    margin: 0,
  },
  autoBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: ColorPrimary.primary50,
  },
  batalBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  photoRemoveBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: ColorBase.white,
    borderRadius: 10,
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
