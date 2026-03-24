import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  PageHeader,
  PaymentMethodCard,
  QRCodePlaceholder,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH2,
} from "@/components";
import { paymentMethodOptions } from "@/data/payment.data";
import {
  ColorBase,
  ColorDanger,
  ColorNeutral,
  ColorPrimary,
} from "@/themes/Colors";
import type { PaymentMethod } from "@/types";
import { formatPrice, formatTimer } from "@/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const QR_DURATION = 5 * 60; // 5 minutes in seconds

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PilihPembayaranPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    total: string;
    totalItems: string;
    discount: string;
  }>();

  const total = Number(params.total ?? 0);
  const totalItems = Number(params.totalItems ?? 0);
  const discount = Number(params.discount ?? 0);

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("qris");
  const [qrTimer, setQrTimer] = useState(QR_DURATION);
  const [qrKey, setQrKey] = useState(0);

  const spinAnim = useRef(new Animated.Value(0)).current;

  // QR countdown timer
  useEffect(() => {
    if (selectedMethod !== "qris") return;
    setQrTimer(QR_DURATION);
    const interval = setInterval(() => {
      setQrTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedMethod, qrKey]);

  function handleRefreshQR() {
    Animated.sequence([
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      spinAnim.setValue(0);
      setQrKey((k) => k + 1);
    });
  }

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  function handleProcess() {
    if (selectedMethod === "tunai") {
      router.push({
        pathname: "/pembayaran-tunai",
        params: {
          total: String(total),
          totalItems: String(totalItems),
          discount: String(discount),
        },
      });
      return;
    }

    Alert.alert(
      "Konfirmasi Pembayaran",
      `Metode: ${selectedMethod.toUpperCase()}\nTotal: ${formatPrice(total)}`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Konfirmasi",
          onPress: () => {
            router.push({
              pathname: "/pembayaran-sukses",
              params: {
                total: String(total),
                totalItems: String(totalItems),
                discount: String(discount),
                method: selectedMethod.toUpperCase(),
                received: String(total),
                change: "0",
              },
            });
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PageHeader
        title="Pilih Pembayaran"
        showBack
        onBack={() => router.back()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <YStack paddingHorizontal={16} gap={12} paddingTop={4}>
          {/* Total Tagihan card */}
          <View style={styles.totalCard}>
            <TextCaption color="rgba(255,255,255,0.8)" marginBottom={6}>
              Total Tagihan
            </TextCaption>
            <TextH2 fontWeight="700" color={ColorBase.white} marginBottom={6}>
              {formatPrice(total)}
            </TextH2>
            <XStack gap={6} alignItems="center">
              <TextBodySm color="rgba(255,255,255,0.85)">
                {totalItems} item
              </TextBodySm>
              {discount > 0 && (
                <>
                  <View style={styles.dotSeparator} />
                  <TextBodySm color="rgba(255,255,255,0.85)">
                    Diskon {formatPrice(discount)}
                  </TextBodySm>
                </>
              )}
            </XStack>
          </View>

          {/* Payment methods */}
          <TextCaption
            color="$colorSecondary"
            fontWeight="700"
            letterSpacing={0.8}
            paddingHorizontal={4}
            marginTop={4}
          >
            METODE PEMBAYARAN
          </TextCaption>

          {paymentMethodOptions.map((method) => (
            <React.Fragment key={method.id}>
              <PaymentMethodCard
                {...method}
                selected={selectedMethod === method.id}
                onPress={() => setSelectedMethod(method.id)}
              />

              {/* QRIS panel */}
              {method.id === "qris" && selectedMethod === "qris" && (
                <View style={styles.qrisPanel}>
                  <View style={styles.qrWrapper}>
                    <QRCodePlaceholder key={qrKey} />
                  </View>
                  <TextBodyLg fontWeight="700" marginTop={16} marginBottom={4}>
                    Scan QR untuk membayar
                  </TextBodyLg>
                  <XStack alignItems="center" gap={8}>
                    <TextBodySm color="$colorSecondary">
                      QR berlaku{" "}
                      <TextBodySm
                        fontWeight="700"
                        color={
                          qrTimer < 60
                            ? ColorDanger.danger600
                            : "$colorSecondary"
                        }
                      >
                        {formatTimer(qrTimer)}
                      </TextBodySm>{" "}
                      menit
                    </TextBodySm>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={handleRefreshQR}
                    >
                      <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <Ionicons
                          name="refresh-outline"
                          size={18}
                          color={ColorNeutral.neutral500}
                        />
                      </Animated.View>
                    </TouchableOpacity>
                  </XStack>
                </View>
              )}
            </React.Fragment>
          ))}
        </YStack>
      </ScrollView>

      {/* Bottom action */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.processBtn}
          onPress={handleProcess}
        >
          <TextBodyLg fontWeight="700" color={ColorBase.white}>
            Proses Pembayaran
          </TextBodyLg>
        </TouchableOpacity>
        <TextCaption color="$colorSecondary" textAlign="center" marginTop={8}>
          Pastikan pembayaran telah diterima
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
  totalCard: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: ColorPrimary.primary700,
    shadowColor: ColorPrimary.primary700,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  qrisPanel: {
    backgroundColor: ColorBase.white,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: ColorBase.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginTop: -4,
  },
  qrWrapper: {
    padding: 12,
    backgroundColor: ColorBase.white,
    borderRadius: 12,
    shadowColor: ColorBase.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: ColorBase.white,
    borderTopWidth: 1,
    borderTopColor: ColorNeutral.neutral100,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 28,
  },
  processBtn: {
    backgroundColor: ColorPrimary.primary600,
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
