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

const CATEGORIES: TambahProdukCategory[] = ["Makanan", "Minuman", "Snack"];

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

      <FormField label="Nama Produk" required>
        <StyledInput
          value={namaProduk}
          onChangeText={setNamaProduk}
          placeholder="Contoh: Kopi Susu"
        />
      </FormField>

      <FormField label="SKU">
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
