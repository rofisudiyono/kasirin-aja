import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  PageHeader,
  TextBody,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH2,
  TextH3,
} from "@/components";
import { cartAtom, CartItem } from "@/store/cart";

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderType = "Dine In" | "Take Away" | "Delivery";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_BG: Record<string, string> = {
  Makanan: "#FFEDD5",
  Minuman: "#DBEAFE",
  Snack: "#FEF3C7",
};

const CATEGORY_ICON: Record<
  string,
  React.ComponentProps<typeof Ionicons>["name"]
> = {
  Makanan: "restaurant-outline",
  Minuman: "cafe-outline",
  Snack: "pizza-outline",
};

const CATEGORY_ICON_COLOR: Record<string, string> = {
  Makanan: "#EA580C",
  Minuman: "#2563EB",
  Snack: "#D97706",
};

const PPN_RATE = 0.11;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

// ─── Cart Item Row ─────────────────────────────────────────────────────────────

function CartItemRow({
  item,
  onUpdateQty,
  onRemove,
  onUpdateNote,
}: {
  item: CartItem;
  onUpdateQty: (cartId: string, qty: number) => void;
  onRemove: (cartId: string) => void;
  onUpdateNote: (cartId: string, note: string) => void;
}) {
  const [noteVisible, setNoteVisible] = useState(false);
  const [noteInput, setNoteInput] = useState(item.note ?? "");

  function handleNoteSave() {
    onUpdateNote(item.cartId, noteInput);
    setNoteVisible(false);
  }

  return (
    <>
      <View style={styles.cartItemRow}>
        {/* Product icon */}
        <View
          style={[
            styles.itemIcon,
            { backgroundColor: CATEGORY_BG[item.category] ?? "#F3F4F6" },
          ]}
        >
          <Ionicons
            name={CATEGORY_ICON[item.category] ?? "bag-outline"}
            size={26}
            color={CATEGORY_ICON_COLOR[item.category] ?? "#6B7280"}
          />
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
              autoFocus
            />
            <TouchableOpacity activeOpacity={0.85} onPress={handleNoteSave}>
              <View style={styles.noteSaveBtn}>
                <TextBodyLg fontWeight="700" color="white">
                  Simpan Catatan
                </TextBodyLg>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function KeranjangPage() {
  const router = useRouter();
  const [cart, setCart] = useAtom(cartAtom);

  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("Dine In");

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
    label: string;
  } | null>({ code: "DISKON10", discount: 5000, label: "DISKON10 - Hemat Rp 5.000" });
  const [promoEnabled, setPromoEnabled] = useState(true);

  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);
  const subtotal = cart.reduce((s, c) => s + c.unitPrice * c.quantity, 0);
  const discount = appliedPromo && promoEnabled ? appliedPromo.discount : 0;
  const afterDiscount = subtotal - discount;
  const ppn = Math.round(afterDiscount * PPN_RATE);
  const total = afterDiscount + ppn;

  function handleUpdateQty(cartId: string, qty: number) {
    setCart((prev) =>
      prev.map((c) => (c.cartId === cartId ? { ...c, quantity: qty } : c))
    );
  }

  function handleRemove(cartId: string) {
    setCart((prev) => prev.filter((c) => c.cartId !== cartId));
  }

  function handleUpdateNote(cartId: string, note: string) {
    setCart((prev) =>
      prev.map((c) => (c.cartId === cartId ? { ...c, note } : c))
    );
  }

  function handleClearCart() {
    Alert.alert(
      "Hapus Semua Item",
      "Apakah kamu yakin ingin menghapus semua item di keranjang?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            setCart([]);
            router.back();
          },
        },
      ]
    );
  }

  function handleApplyPromo() {
    const PROMOS: Record<string, { discount: number; label: string }> = {
      DISKON10: { discount: 5000, label: "DISKON10 - Hemat Rp 5.000" },
      HEMAT15: { discount: 15000, label: "HEMAT15 - Hemat Rp 15.000" },
    };
    const code = promoCode.trim().toUpperCase();
    if (PROMOS[code]) {
      setAppliedPromo({ code, ...PROMOS[code] });
      setPromoEnabled(true);
      setPromoCode("");
    } else {
      Alert.alert("Kode Promo Tidak Valid", "Kode promo tidak ditemukan.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PageHeader
        title="Keranjang"
        subtitle={`${totalItems} item`}
        showBack
        onBack={() => router.back()}
        actions={
          <TouchableOpacity activeOpacity={0.7} onPress={handleClearCart}>
            <View style={styles.trashBtn}>
              <Ionicons name="trash-outline" size={18} color="#DC2626" />
            </View>
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <YStack paddingHorizontal={16} gap={12} paddingTop={8}>

          {/* Customer info card */}
          <View style={styles.card}>
            {/* Nama Pelanggan */}
            <TextCaption color="$colorSecondary" marginBottom={6}>
              Nama Pelanggan
            </TextCaption>
            <TextInput
              value={customerName}
              onChangeText={setCustomerName}
              placeholder="Opsional"
              placeholderTextColor="#9CA3AF"
              style={styles.inputField}
            />

            {/* Nomor Meja */}
            <TextCaption color="$colorSecondary" marginBottom={6} marginTop={12}>
              Nomor Meja
            </TextCaption>
            <TextInput
              value={tableNumber}
              onChangeText={setTableNumber}
              placeholder="Opsional"
              placeholderTextColor="#9CA3AF"
              style={styles.inputField}
              keyboardType="number-pad"
            />

            {/* Tipe Pesanan */}
            <TextCaption color="$colorSecondary" marginBottom={8} marginTop={12}>
              Tipe Pesanan
            </TextCaption>
            <View style={styles.segmentControl}>
              {(["Dine In", "Take Away", "Delivery"] as OrderType[]).map(
                (type) => (
                  <TouchableOpacity
                    key={type}
                    activeOpacity={0.8}
                    style={[
                      styles.segmentBtn,
                      orderType === type && styles.segmentBtnActive,
                    ]}
                    onPress={() => setOrderType(type)}
                  >
                    <TextBodySm
                      fontWeight="600"
                      color={orderType === type ? "white" : "$colorSecondary"}
                    >
                      {type}
                    </TextBodySm>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          {/* Cart items card */}
          <View style={styles.card}>
            {cart.length === 0 ? (
              <YStack alignItems="center" paddingVertical={24} gap={8}>
                <Ionicons name="bag-outline" size={40} color="#9CA3AF" />
                <TextBody color="$colorSecondary">
                  Keranjang masih kosong
                </TextBody>
              </YStack>
            ) : (
              cart.map((item, index) => (
                <React.Fragment key={item.cartId}>
                  <CartItemRow
                    item={item}
                    onUpdateQty={handleUpdateQty}
                    onRemove={handleRemove}
                    onUpdateNote={handleUpdateNote}
                  />
                  {index < cart.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </React.Fragment>
              ))
            )}
          </View>

          {/* Promo code card */}
          <View style={styles.card}>
            <XStack gap={8} alignItems="center">
              <View style={styles.promoInputWrapper}>
                <TextInput
                  value={promoCode}
                  onChangeText={setPromoCode}
                  placeholder="Masukkan kode promo"
                  placeholderTextColor="#9CA3AF"
                  style={styles.promoInput}
                  autoCapitalize="characters"
                />
              </View>
              <TouchableOpacity activeOpacity={0.85} onPress={handleApplyPromo}>
                <View style={styles.promoApplyBtn}>
                  <TextBodySm fontWeight="700" color="white">
                    Pakai
                  </TextBodySm>
                </View>
              </TouchableOpacity>
            </XStack>

            {appliedPromo && (
              <XStack
                alignItems="center"
                gap={8}
                marginTop={10}
                style={styles.promoChip}
              >
                <Ionicons name="pricetag-outline" size={14} color="#16A34A" />
                <TextCaption color="#16A34A" fontWeight="600" flex={1}>
                  {appliedPromo.label}
                </TextCaption>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setPromoEnabled((v) => !v)}
                >
                  <View
                    style={[
                      styles.toggleTrack,
                      promoEnabled && styles.toggleTrackActive,
                    ]}
                  >
                    <View
                      style={[
                        styles.toggleThumb,
                        promoEnabled && styles.toggleThumbActive,
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              </XStack>
            )}
          </View>

          {/* Price summary */}
          <View style={styles.card}>
            <XStack justifyContent="space-between" marginBottom={10}>
              <TextBody color="$colorSecondary">Subtotal</TextBody>
              <TextBody fontWeight="600">{formatPrice(subtotal)}</TextBody>
            </XStack>

            {discount > 0 && (
              <XStack justifyContent="space-between" marginBottom={10}>
                <TextBody color="$colorSecondary">Diskon</TextBody>
                <TextBody fontWeight="600" color="#16A34A">
                  -{formatPrice(discount)}
                </TextBody>
              </XStack>
            )}

            <XStack justifyContent="space-between" marginBottom={16}>
              <TextBody color="$colorSecondary">PPN 11%</TextBody>
              <TextBody fontWeight="600">{formatPrice(ppn)}</TextBody>
            </XStack>

            <View style={styles.divider} />

            <XStack justifyContent="space-between" marginTop={14}>
              <TextH3 fontWeight="700">Total Bayar</TextH3>
              <TextH3 fontWeight="700" color="$primary">
                {formatPrice(total)}
              </TextH3>
            </XStack>
          </View>
        </YStack>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={styles.bottomBar}>
        <XStack gap={10}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.holdOrderBtn}
            onPress={() => Alert.alert("Tahan Order", "Pesanan ditahan.")}
          >
            <TextBodyLg fontWeight="700" color="$colorSecondary">
              Tahan Order
            </TextBodyLg>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.payBtn, cart.length === 0 && { opacity: 0.5 }]}
            disabled={cart.length === 0}
            onPress={() => Alert.alert("Lanjut Bayar", `Total: ${formatPrice(total)}`)}
          >
            <TextBodyLg fontWeight="700" color="white">
              Lanjut Bayar
            </TextBodyLg>
          </TouchableOpacity>
        </XStack>
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
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  trashBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  inputField: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827",
    fontFamily: "Poppins_400Regular",
  },
  segmentControl: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 24,
    padding: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 20,
  },
  segmentBtnActive: {
    backgroundColor: "#2563EB",
  },
  cartItemRow: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 4,
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
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnPrimary: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#FEE2E2",
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 12,
  },
  promoInputWrapper: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    justifyContent: "center",
    height: 48,
  },
  promoInput: {
    fontSize: 14,
    color: "#111827",
    fontFamily: "Poppins_400Regular",
  },
  promoApplyBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  promoChip: {
    backgroundColor: "#F0FDF4",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  toggleTrack: {
    width: 36,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#D1D5DB",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleTrackActive: {
    backgroundColor: "#16A34A",
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "white",
    alignSelf: "flex-start",
  },
  toggleThumbActive: {
    alignSelf: "flex-end",
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
    paddingTop: 12,
    paddingBottom: 28,
  },
  holdOrderBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  payBtn: {
    flex: 2,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  // Note modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  noteSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  noteInputText: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827",
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 16,
    fontFamily: "Poppins_400Regular",
  },
  noteSaveBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
