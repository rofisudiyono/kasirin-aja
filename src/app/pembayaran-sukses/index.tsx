import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  BarcodePlaceholder,
  DottedSeparator,
  TextBody,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH2,
} from "@/components/index";
import { cartAtom } from "@/store/cart";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

function getCurrentDateTime() {
  const now = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const mins = now.getMinutes().toString().padStart(2, "0");
  return `${day}, ${date} ${month} ${year} • ${hours}:${mins} WIB`;
}

function generateOrderNumber() {
  const num = Math.floor(Math.random() * 9999) + 1;
  return `#TRX-${num.toString().padStart(4, "0")}`;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_ITEMS = [
  { name: "Kopi Susu (Medium, Ice)", qty: 2, price: 44000 },
  { name: "Nasi Goreng", qty: 1, price: 25000 },
  { name: "Es Teh Manis", qty: 1, price: 8000 },
];

const STORE_INFO = {
  name: "Toko Makmur",
  address: "Jl. Sudirman No. 12, Banyuwangi",
  phone: "Telp: 0812-3456-7890",
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PembayaranSuksesPage() {
  const router = useRouter();
  const setCart = useSetAtom(cartAtom);
  const params = useLocalSearchParams<{
    total: string;
    totalItems: string;
    discount: string;
    method: string;
    received: string;
    change: string;
  }>();

  const total = Number(params.total ?? 0);
  const discount = Number(params.discount ?? 0);
  const method = params.method ?? "Tunai";
  const received = Number(params.received ?? 0);
  const change = Number(params.change ?? 0);

  const orderNumber = React.useMemo(() => generateOrderNumber(), []);
  const dateTime = React.useMemo(() => getCurrentDateTime(), []);

  // Calculate subtotal from total (reverse: total = (subtotal - discount) * 1.11)
  const subtotal = MOCK_ITEMS.reduce((s, item) => s + item.price, 0);
  const ppn = Math.round((subtotal - discount) * 0.11);

  function handleNewTransaction() {
    setCart([]);
    router.dismissAll();
  }

  function handleGoHome() {
    setCart([]);
    router.dismissAll();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <YStack paddingHorizontal={16} gap={16} paddingTop={24}>
          {/* Success header */}
          <YStack alignItems="center" gap={12}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={40} color="white" />
            </View>
            <TextH2 fontWeight="700" textAlign="center">
              Pembayaran Berhasil!
            </TextH2>
            <TextBody color="$colorSecondary" textAlign="center">
              {formatPrice(total)} telah diterima
            </TextBody>
            <TextBodySm color="$colorSecondary" textAlign="center">
              {dateTime}
            </TextBodySm>
          </YStack>

          {/* Receipt card */}
          <View style={styles.receiptCard}>
            {/* Store info */}
            <YStack alignItems="center" gap={4} paddingVertical={16}>
              <View style={styles.storeIcon}>
                <Ionicons name="storefront" size={24} color="#2563EB" />
              </View>
              <TextBodyLg fontWeight="700">{STORE_INFO.name}</TextBodyLg>
              <TextCaption color="$colorSecondary" textAlign="center">
                {STORE_INFO.address}
              </TextCaption>
              <TextCaption color="$colorSecondary">
                {STORE_INFO.phone}
              </TextCaption>
            </YStack>

            <DottedSeparator />

            {/* Order info */}
            <YStack gap={8}>
              <XStack justifyContent="space-between">
                <TextBodySm color="$colorSecondary" fontFamily="$body">
                  No. Order
                </TextBodySm>
                <TextBodySm fontWeight="700" fontFamily="$body">
                  {orderNumber}
                </TextBodySm>
              </XStack>
              <XStack justifyContent="space-between">
                <TextBodySm color="$colorSecondary">Kasir</TextBodySm>
                <TextBodySm fontWeight="700">Budi Santoso</TextBodySm>
              </XStack>
              <XStack justifyContent="space-between">
                <TextBodySm color="$colorSecondary">Tanggal</TextBodySm>
                <TextBodySm fontWeight="700">
                  {new Date().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  ,{" "}
                  {new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TextBodySm>
              </XStack>
            </YStack>

            <DottedSeparator />

            {/* Items */}
            <YStack gap={8}>
              {MOCK_ITEMS.map((item, index) => (
                <XStack key={index} justifyContent="space-between">
                  <TextBodySm color="$colorSecondary" flex={1}>
                    {item.name} x{item.qty}
                  </TextBodySm>
                  <TextBodySm fontWeight="600">
                    {formatPrice(item.price)}
                  </TextBodySm>
                </XStack>
              ))}
            </YStack>

            <DottedSeparator />

            {/* Price breakdown */}
            <YStack gap={8}>
              <XStack justifyContent="space-between">
                <TextBodySm color="$colorSecondary">Subtotal</TextBodySm>
                <TextBodySm fontWeight="600">
                  {formatPrice(subtotal)}
                </TextBodySm>
              </XStack>
              {discount > 0 && (
                <XStack justifyContent="space-between">
                  <TextBodySm color="$colorSecondary">
                    Diskon (DISKON10)
                  </TextBodySm>
                  <TextBodySm fontWeight="600" color="#DC2626">
                    -{formatPrice(discount)}
                  </TextBodySm>
                </XStack>
              )}
              <XStack justifyContent="space-between">
                <TextBodySm color="$colorSecondary">PPN 11%</TextBodySm>
                <TextBodySm fontWeight="600">{formatPrice(ppn)}</TextBodySm>
              </XStack>
              <XStack
                justifyContent="space-between"
                alignItems="center"
                marginTop={4}
              >
                <TextBodyLg fontWeight="700">TOTAL</TextBodyLg>
                <TextBodyLg fontWeight="700" color="#16A34A">
                  {formatPrice(total)}
                </TextBodyLg>
              </XStack>
            </YStack>

            <DottedSeparator />

            {/* Payment info */}
            <YStack gap={8}>
              <XStack justifyContent="space-between">
                <TextBodySm color="$colorSecondary">Metode</TextBodySm>
                <TextBodySm fontWeight="700">{method}</TextBodySm>
              </XStack>
              {method === "Tunai" && (
                <>
                  <XStack justifyContent="space-between">
                    <TextBodySm color="$colorSecondary">
                      Uang Diterima
                    </TextBodySm>
                    <TextBodySm fontWeight="700">
                      {formatPrice(received)}
                    </TextBodySm>
                  </XStack>
                  <XStack justifyContent="space-between">
                    <TextBodySm color="$colorSecondary">Kembalian</TextBodySm>
                    <TextBodySm fontWeight="700" color="#16A34A">
                      {formatPrice(change)}
                    </TextBodySm>
                  </XStack>
                </>
              )}
            </YStack>

            {/* Barcode */}
            <YStack alignItems="center" gap={8} marginTop={20}>
              <BarcodePlaceholder />
              <TextCaption color="$colorSecondary" fontFamily="$body">
                {orderNumber}
              </TextCaption>
            </YStack>

            {/* Footer text */}
            <YStack alignItems="center" gap={4} marginTop={12}>
              <TextBodySm
                fontWeight="600"
                fontStyle="italic"
                color="$colorSecondary"
              >
                Terima kasih telah berbelanja!
              </TextBodySm>
              <TextCaption color="$colorSecondary">
                Simpan struk ini sebagai bukti pembayaran
              </TextCaption>
            </YStack>
          </View>

          {/* Action buttons */}
          <XStack gap={12}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.outlineBtn}
              onPress={() => {}}
            >
              <TextBodyLg fontWeight="700" color="#374151">
                Cetak Struk
              </TextBodyLg>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.outlineBtn}
              onPress={() => {}}
            >
              <TextBodyLg fontWeight="700" color="#374151">
                Bagikan
              </TextBodyLg>
            </TouchableOpacity>
          </XStack>

          {/* New transaction button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.newTransBtn}
            onPress={handleNewTransaction}
          >
            <TextBodyLg fontWeight="700" color="white">
              Transaksi Baru +
            </TextBodyLg>
          </TouchableOpacity>

          {/* Back to home */}
          <TouchableOpacity activeOpacity={0.7} onPress={handleGoHome}>
            <TextBody
              fontWeight="600"
              color="#2563EB"
              textAlign="center"
              paddingVertical={8}
            >
              Kembali ke Beranda
            </TextBody>
          </TouchableOpacity>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#16A34A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  receiptCard: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  storeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  outlineBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  newTransBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },
});
