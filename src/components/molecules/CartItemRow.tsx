/**
 * CartItemRow — Individual cart/order item row with quantity and note controls
 *
 * Used in keranjang (cart) and potentially in order review screens
 * Displays product info, variants, quantity controls, notes, and price
 */
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { XStack, YStack } from "tamagui";

import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/constants/categoryStyles";
import { formatPrice } from "@/lib/formatters";
import type { CartItem } from "@/store/cart";
import { TextBodyLg, TextBodySm, TextCaption } from "../atoms/Typography";

const styles = StyleSheet.create({
  cartItemRow: {
    flexDirection: "row",
    paddingVertical: 12,
    gap: 12,
  },
  itemIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnPrimary: {
    backgroundColor: "#2563EB",
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  noteSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  noteInputText: {
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: "top",
  },
});

interface CartItemRowProps {
  item: CartItem;
  onUpdateQty: (cartId: string, qty: number) => void;
  onRemove: (cartId: string) => void;
  onUpdateNote: (cartId: string, note: string) => void;
}

export function CartItemRow({
  item,
  onUpdateQty,
  onRemove,
  onUpdateNote,
}: CartItemRowProps) {
  const [noteVisible, setNoteVisible] = useState(false);
  const [noteInput, setNoteInput] = useState(item.note ?? "");

  const categoryColor = CATEGORY_COLORS[item.category] ?? {
    bg: "#F3F4F6",
    color: "#6B7280",
  };
  const categoryIcon = CATEGORY_ICONS[item.category] ?? "bag-outline";

  function handleNoteSave() {
    onUpdateNote(item.cartId, noteInput);
    setNoteVisible(false);
  }

  return (
    <>
      <View style={styles.cartItemRow}>
        {/* Product icon */}
        <View style={[styles.itemIcon, { backgroundColor: categoryColor.bg }]}>
          <Ionicons name={categoryIcon} size={26} color={categoryColor.color} />
        </View>

        {/* Info + controls */}
        <YStack flex={1} gap={4}>
          <XStack justifyContent="space-between" alignItems="flex-start">
            <YStack flex={1} gap={2}>
              <TextBodyLg fontWeight="700" numberOfLines={2} lineHeight={20}>
                {item.productName}
              </TextBodyLg>
              {item.variantLabel && (
                <TextCaption color="$colorSecondary">
                  {item.variantLabel}
                </TextCaption>
              )}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setNoteVisible(true)}
              >
                <TextCaption
                  color={item.note ? "$colorSecondary" : "$colorTertiary"}
                  fontStyle="italic"
                >
                  {item.note ? item.note : "Tambah catatan..."}
                </TextCaption>
              </TouchableOpacity>
              <TextCaption color="$colorSecondary">
                {formatPrice(item.unitPrice)} / item
              </TextCaption>
            </YStack>

            {/* Qty controls + price */}
            <YStack alignItems="flex-end" gap={6} marginLeft={12}>
              <XStack alignItems="center" gap={10}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    item.quantity > 1
                      ? onUpdateQty(item.cartId, item.quantity - 1)
                      : onRemove(item.cartId)
                  }
                >
                  <View style={styles.qtyBtn}>
                    <Ionicons name="remove" size={16} color="#374151" />
                  </View>
                </TouchableOpacity>

                <TextBodyLg fontWeight="700" minWidth={20} textAlign="center">
                  {item.quantity}
                </TextBodyLg>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => onUpdateQty(item.cartId, item.quantity + 1)}
                >
                  <View style={[styles.qtyBtn, styles.qtyBtnPrimary]}>
                    <Ionicons name="add" size={16} color="white" />
                  </View>
                </TouchableOpacity>
              </XStack>

              <TextBodyLg fontWeight="700" color="$primary">
                {formatPrice(item.unitPrice * item.quantity)}
              </TextBodyLg>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onRemove(item.cartId)}
              >
                <View style={styles.deleteBtn}>
                  <Ionicons name="trash-outline" size={16} color="#DC2626" />
                </View>
              </TouchableOpacity>
            </YStack>
          </XStack>
        </YStack>
      </View>

      {/* Note modal */}
      <Modal
        visible={noteVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setNoteVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={() => setNoteVisible(false)}
          />
          <View style={styles.noteSheet}>
            <View style={styles.dragHandle} />
            <TextBodyLg fontWeight="700" marginBottom={12}>
              Catatan untuk {item.productName}
            </TextBodyLg>
            <TextInput
              value={noteInput}
              onChangeText={setNoteInput}
              placeholder="Contoh: Tidak pedas, kurangi gula..."
              placeholderTextColor="#9CA3AF"
              style={styles.noteInputText}
              multiline
            />
            <XStack gap="$3">
              <button
                style={{
                  flex: 1,
                  borderColor: "#E5E7EB",
                  borderWidth: 1,
                  backgroundColor: "white",
                  paddingVertical: 12,
                  borderRadius: 10,
                }}
                onPress={() => setNoteVisible(false)}
              >
                <TextBodySm fontWeight="600" color="$color">
                  Batal
                </TextBodySm>
              </button>
              <button
                style={{
                  flex: 1,
                  backgroundColor: "#2563EB",
                  paddingVertical: 12,
                  borderRadius: 10,
                }}
                onPress={handleNoteSave}
              >
                <TextBodySm fontWeight="600" color="white">
                  Simpan
                </TextBodySm>
              </button>
            </XStack>
          </View>
        </View>
      </Modal>
    </>
  );
}
