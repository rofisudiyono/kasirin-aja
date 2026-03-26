import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Switch, TextInput, TouchableOpacity } from "react-native";
import { XStack, YStack } from "tamagui";

import { TextBodyLg, TextBodySm, TextCaption } from "@/components";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/themes/Colors";

import { SectionHeader } from "./SectionHeader";
import type { TambahProdukVariantGroup } from "./tambah-produk.types";
import { VariantTag } from "./VariantTag";

interface DraftValue {
  name: string;
  price: string;
}

interface VariantProdukSectionProps {
  hasVariant: boolean;
  setHasVariant: (v: boolean) => void;
  variantGroups: TambahProdukVariantGroup[];
  onRemoveVariantValue: (groupIdx: number, valIdx: number) => void;
  onAddVariantValue: (groupIdx: number, value: { name: string; price: string }) => void;
  onAddGroup: (name: string) => void;
  onRemoveGroup: (groupIdx: number) => void;
}

export function VariantProdukSection({
  hasVariant,
  setHasVariant,
  variantGroups,
  onRemoveVariantValue,
  onAddVariantValue,
  onAddGroup,
  onRemoveGroup,
}: VariantProdukSectionProps) {
  // Per-group inline "tambah nilai" input state
  const [draftValues, setDraftValues] = useState<Record<number, DraftValue>>({});
  // Inline "tambah grup" state
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  function commitValue(gi: number) {
    const name = (draftValues[gi]?.name ?? "").trim();
    if (!name) return;
    const price = draftValues[gi]?.price ?? "0";
    onAddVariantValue(gi, { name, price });
    setDraftValues((prev) => ({ ...prev, [gi]: { name: "", price: "" } }));
  }

  function commitGroup() {
    const name = newGroupName.trim();
    if (!name) return;
    onAddGroup(name);
    setNewGroupName("");
    setShowAddGroup(false);
  }

  return (
    <YStack
      backgroundColor={ColorBase.white}
      borderRadius={12}
      padding="$4"
      gap="$3"
    >
      <SectionHeader title="Variant Produk" />

      <XStack alignItems="center" justifyContent="space-between">
        <YStack flex={1} gap={2}>
          <TextBodyLg fontWeight="600">Produk ini memiliki variant</TextBodyLg>
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
              <XStack alignItems="center" justifyContent="space-between">
                <TextBodySm fontWeight="600" color={ColorNeutral.neutral700}>
                  {group.name}
                </TextBodySm>
                <TouchableOpacity
                  onPress={() => onRemoveGroup(gi)}
                  hitSlop={8}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={16}
                    color={ColorNeutral.neutral400}
                  />
                </TouchableOpacity>
              </XStack>

              <XStack flexWrap="wrap" gap="$2">
                {group.values.map((opt, vi) => (
                  <VariantTag
                    key={vi}
                    label={opt.name}
                    price={opt.price}
                    onRemove={() => onRemoveVariantValue(gi, vi)}
                  />
                ))}
              </XStack>

              {/* Inline add value */}
              <XStack alignItems="center" gap="$2" marginTop={4}>
                <XStack
                  flex={1}
                  height={36}
                  borderWidth={1}
                  borderColor={ColorPrimary.primary200}
                  borderRadius={8}
                  backgroundColor={ColorBase.white}
                  paddingHorizontal={10}
                  alignItems="center"
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Nama opsi..."
                    placeholderTextColor={ColorNeutral.neutral400}
                    value={draftValues[gi]?.name ?? ""}
                    onChangeText={(t) =>
                      setDraftValues((prev) => ({
                        ...prev,
                        [gi]: { ...prev[gi], name: t, price: prev[gi]?.price ?? "" },
                      }))
                    }
                    returnKeyType="next"
                  />
                </XStack>
                <XStack
                  width={72}
                  height={36}
                  borderWidth={1}
                  borderColor={ColorPrimary.primary200}
                  borderRadius={8}
                  backgroundColor={ColorBase.white}
                  paddingHorizontal={8}
                  alignItems="center"
                >
                  <TextInput
                    style={styles.input}
                    placeholder="+Rp"
                    placeholderTextColor={ColorNeutral.neutral400}
                    keyboardType="numeric"
                    value={draftValues[gi]?.price ?? ""}
                    onChangeText={(t) =>
                      setDraftValues((prev) => ({
                        ...prev,
                        [gi]: { ...prev[gi], price: t, name: prev[gi]?.name ?? "" },
                      }))
                    }
                    returnKeyType="done"
                    onSubmitEditing={() => commitValue(gi)}
                  />
                </XStack>
                <TouchableOpacity
                  style={[
                    styles.addValueBtn,
                    {
                      backgroundColor: (draftValues[gi]?.name ?? "").trim()
                        ? ColorPrimary.primary600
                        : ColorNeutral.neutral200,
                    },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => commitValue(gi)}
                >
                  <Ionicons name="add" size={18} color={ColorBase.white} />
                </TouchableOpacity>
              </XStack>

              <TextCaption color={ColorNeutral.neutral400}>
                Penyesuaian harga dihitung dari harga dasar produk
              </TextCaption>
            </YStack>
          ))}

          {/* Inline add group form */}
          {showAddGroup ? (
            <YStack
              backgroundColor={ColorNeutral.neutral50}
              borderRadius={10}
              padding="$3"
              gap="$2"
              borderWidth={1.5}
              borderColor={ColorPrimary.primary200}
            >
              <TextBodySm fontWeight="600" color={ColorNeutral.neutral700}>
                Nama Grup Baru
              </TextBodySm>
              <XStack alignItems="center" gap="$2">
                <XStack
                  flex={1}
                  height={40}
                  borderWidth={1}
                  borderColor={ColorPrimary.primary200}
                  borderRadius={8}
                  backgroundColor={ColorBase.white}
                  paddingHorizontal={10}
                  alignItems="center"
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Contoh: Suhu, Rasa..."
                    placeholderTextColor={ColorNeutral.neutral400}
                    value={newGroupName}
                    onChangeText={setNewGroupName}
                    autoFocus
                    returnKeyType="done"
                    onSubmitEditing={commitGroup}
                  />
                </XStack>
                <TouchableOpacity
                  style={[
                    styles.addValueBtn,
                    { backgroundColor: ColorPrimary.primary600 },
                  ]}
                  activeOpacity={0.8}
                  onPress={commitGroup}
                >
                  <Ionicons name="checkmark" size={18} color={ColorBase.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.addValueBtn,
                    { backgroundColor: ColorNeutral.neutral200 },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => {
                    setShowAddGroup(false);
                    setNewGroupName("");
                  }}
                >
                  <Ionicons name="close" size={18} color={ColorNeutral.neutral600} />
                </TouchableOpacity>
              </XStack>
            </YStack>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowAddGroup(true)}
            >
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
          )}
        </YStack>
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 13,
    color: "#1F2937",
    padding: 0,
  },
  addValueBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
