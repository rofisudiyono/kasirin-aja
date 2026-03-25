import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import {
  BottomActionBar,
  CartItemsCard,
  CustomerInfoCard,
  PriceSummaryCard,
  PromoCard,
  cartAtom,
} from "@/features/cart";
import { promoDefinitions } from "@/features/payment/api/payment.data";
import { PageHeader } from "@/shared/components";
import { ColorBase, ColorDanger } from "@/shared/themes/Colors";
import type { AppliedPromo, OrderType } from "@/shared/types";

const PPN_RATE = 0.11;

export default function KeranjangPage() {
  const router = useRouter();
  const [cart, setCart] = useAtom(cartAtom);

  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("Dine In");

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<AppliedPromo | null>({
    code: "DISKON10",
    ...promoDefinitions.DISKON10,
  });
  const [promoEnabled, setPromoEnabled] = useState(true);

  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);
  const subtotal = cart.reduce((s, c) => s + c.unitPrice * c.quantity, 0);
  const discount = appliedPromo && promoEnabled ? appliedPromo.discount : 0;
  const afterDiscount = subtotal - discount;
  const ppn = Math.round(afterDiscount * PPN_RATE);
  const total = afterDiscount + ppn;

  function handleUpdateQty(cartId: string, qty: number) {
    setCart((prev) =>
      prev.map((c) => (c.cartId === cartId ? { ...c, quantity: qty } : c)),
    );
  }

  function handleRemove(cartId: string) {
    setCart((prev) => prev.filter((c) => c.cartId !== cartId));
  }

  function handleUpdateNote(cartId: string, note: string) {
    setCart((prev) =>
      prev.map((c) => (c.cartId === cartId ? { ...c, note } : c)),
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
      ],
    );
  }

  function handleApplyPromo() {
    const code = promoCode.trim().toUpperCase();
    if (promoDefinitions[code]) {
      setAppliedPromo({ code, ...promoDefinitions[code] });
      setPromoEnabled(true);
      setPromoCode("");
    } else {
      Alert.alert("Kode Promo Tidak Valid", "Kode promo tidak ditemukan.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader
        title="Keranjang"
        subtitle={`${totalItems} item`}
        showBack
        onBack={() => router.back()}
        actions={
          <TouchableOpacity activeOpacity={0.7} onPress={handleClearCart}>
            <View style={styles.trashBtn}>
              <Ionicons
                name="trash-outline"
                size={18}
                color={ColorDanger.danger600}
              />
            </View>
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <YStack paddingHorizontal={16} gap={12} paddingTop={8}>
          <CustomerInfoCard
            customerName={customerName}
            onCustomerNameChange={setCustomerName}
            tableNumber={tableNumber}
            onTableNumberChange={setTableNumber}
            orderType={orderType}
            onOrderTypeChange={setOrderType}
          />

          <CartItemsCard
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemove}
            onUpdateNote={handleUpdateNote}
          />

          <PromoCard
            promoCode={promoCode}
            onPromoCodeChange={setPromoCode}
            onApplyPromo={handleApplyPromo}
            appliedPromo={appliedPromo}
            promoEnabled={promoEnabled}
            onTogglePromo={() => setPromoEnabled((v) => !v)}
          />

          <PriceSummaryCard
            subtotal={subtotal}
            discount={discount}
            ppn={ppn}
            total={total}
          />
        </YStack>
      </ScrollView>

      <BottomActionBar
        cartLength={cart.length}
        onHoldOrder={() => Alert.alert("Tahan Order", "Pesanan ditahan.")}
        onPay={() =>
          router.push({
            pathname: "/pilih-pembayaran",
            params: {
              total: String(total),
              totalItems: String(totalItems),
              discount: String(discount),
            },
          })
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorBase.bgScreen,
  },
  trashBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ColorDanger.danger50,
    alignItems: "center",
    justifyContent: "center",
  },
});
