import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { XStack, YStack } from "tamagui";

import { TextBodySm } from "@/components";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/themes/Colors";

import { FormField } from "./FormField";
import { SectionHeader } from "./SectionHeader";
import { StyledInput } from "./StyledInput";
import type { TambahProdukCategory } from "./tambah-produk.types";

const CATEGORIES: { label: TambahProdukCategory; icon: string }[] = [
  { label: "Makanan", icon: "restaurant-outline" },
  { label: "Minuman", icon: "cafe-outline" },
  { label: "Snack", icon: "fast-food-outline" },
];

interface InformasiDasarSectionProps {
  namaProduk: string;
  setNamaProduk: (v: string) => void;
  sku: string;
  setSku: (v: string) => void;
  barcode: string;
  setBarcode: (v: string) => void;
  kategori: TambahProdukCategory;
  setKategori: (v: TambahProdukCategory) => void;
  deskripsi: string;
  setDeskripsi: (v: string) => void;
}

export function InformasiDasarSection({
  namaProduk,
  setNamaProduk,
  sku,
  setSku,
  barcode,
  setBarcode,
  kategori,
  setKategori,
  deskripsi,
  setDeskripsi,
}: InformasiDasarSectionProps) {
  return (
    <YStack
      backgroundColor={ColorBase.white}
      borderRadius={12}
      padding="$4"
      gap="$4"
    >
      <SectionHeader title="Informasi Dasar" />

      <FormField label="Nama Produk" required hint="Nama yang muncul di kasir dan laporan">
        <StyledInput
          value={namaProduk}
          onChangeText={setNamaProduk}
          placeholder="Contoh: Kopi Susu"
        />
      </FormField>

      <FormField label="SKU" hint="Kode unik untuk identifikasi produk">
        <StyledInput
          value={sku}
          onChangeText={setSku}
          placeholder="Contoh: KPS-001"
          rightElement={
            <TouchableOpacity
              style={styles.autoBtn}
              onPress={() => setSku(`SKU-${Date.now().toString().slice(-5)}`)}
            >
              <TextBodySm fontWeight="600" color={ColorPrimary.primary600}>
                Auto
              </TextBodySm>
            </TouchableOpacity>
          }
        />
      </FormField>

      <FormField label="Barcode" hint="Scan barcode produk atau ketik manual">
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

      <FormField label="Kategori" required hint="Pilih kategori agar produk mudah dicari">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap="$2">
            {CATEGORIES.map(({ label, icon }) => {
              const active = kategori === label;
              return (
                <TouchableOpacity
                  key={label}
                  onPress={() => setKategori(label)}
                  activeOpacity={0.7}
                >
                  <XStack
                    paddingHorizontal={14}
                    paddingVertical={8}
                    borderRadius={20}
                    borderWidth={1.5}
                    borderColor={
                      active ? ColorPrimary.primary600 : ColorNeutral.neutral200
                    }
                    backgroundColor={
                      active
                        ? (ColorPrimary.primary50 ?? ColorPrimary.primary25)
                        : ColorBase.white
                    }
                    alignItems="center"
                    gap={6}
                  >
                    <Ionicons
                      name={icon as any}
                      size={14}
                      color={
                        active
                          ? ColorPrimary.primary600
                          : ColorNeutral.neutral400
                      }
                    />
                    <TextBodySm
                      fontWeight="600"
                      color={
                        active
                          ? ColorPrimary.primary600
                          : ColorNeutral.neutral500
                      }
                    >
                      {label}
                    </TextBodySm>
                  </XStack>
                </TouchableOpacity>
              );
            })}
          </XStack>
        </ScrollView>
      </FormField>

      <FormField label="Deskripsi">
        <StyledInput
          value={deskripsi}
          onChangeText={setDeskripsi}
          placeholder="Deskripsi produk (opsional)"
          multiline
        />
      </FormField>
    </YStack>
  );
}

const styles = StyleSheet.create({
  autoBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: ColorPrimary.primary50,
  },
});
