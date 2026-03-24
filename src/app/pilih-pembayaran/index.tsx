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
  TextBody,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH2,
  TextH3,
} from "@/components";

// ─── Types ────────────────────────────────────────────────────────────────────

type PaymentMethod = "tunai" | "qris" | "transfer" | "edc";

// ─── Constants ────────────────────────────────────────────────────────────────

const QR_DURATION = 5 * 60; // 5 minutes in seconds

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

function formatTimer(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ─── QR Code Placeholder ──────────────────────────────────────────────────────

function QRCodePlaceholder() {
  return (
    <View style={qrStyles.container}>
      {/* Finder pattern top-left */}
      <View style={[qrStyles.finder, { top: 0, left: 0 }]}>
        <View style={qrStyles.finderInner} />
      </View>
      {/* Finder pattern top-right */}
      <View style={[qrStyles.finder, { top: 0, right: 0 }]}>
        <View style={qrStyles.finderInner} />
      </View>
      {/* Finder pattern bottom-left */}
      <View style={[qrStyles.finder, { bottom: 0, left: 0 }]}>
        <View style={qrStyles.finderInner} />
      </View>
      {/* Data modules */}
      <View style={qrStyles.dataArea}>
        {Array.from({ length: 6 }).map((_, row) => (
          <View key={row} style={qrStyles.dataRow}>
            {Array.from({ length: 8 }).map((_, col) => {
              const filled = (row * 3 + col * 7 + row * col) % 3 !== 0;
              return (
                <View
                  key={col}
                  style={[
                    qrStyles.dataCell,
                    filled && qrStyles.dataCellFilled,
                  ]}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const qrStyles = StyleSheet.create({
  container: {
    width: 180,
    height: 180,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  finder: {
    position: "absolute",
    width: 44,
    height: 44,
    borderWidth: 4,
    borderColor: "#111827",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
  },
  finderInner: {
    width: 20,
    height: 20,
    backgroundColor: "#111827",
    borderRadius: 2,
  },
  dataArea: {
    gap: 3,
    marginTop: 4,
  },
  dataRow: {
    flexDirection: "row",
    gap: 3,
  },
  dataCell: {
    width: 10,
    height: 10,
    borderRadius: 1,
    backgroundColor: "transparent",
  },
  dataCellFilled: {
    backgroundColor: "#111827",
  },
});

// ─── Payment Method Card ───────────────────────────────────────────────────────

function PaymentMethodCard({
  id,
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  selected,
  onPress,
}: {
  id: PaymentMethod;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={[
          styles.methodCard,
          selected && styles.methodCardSelected,
        ]}
      >
        <View style={[styles.methodIcon, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
        <YStack flex={1} gap={2}>
          <TextBodyLg fontWeight="700">{title}</TextBodyLg>
          <TextCaption color="$colorSecondary">{subtitle}</TextCaption>
        </YStack>
        {selected ? (
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={16} color="white" />
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
  );
}

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
      ]
    );
  }

  const methods: {
    id: PaymentMethod;
    icon: React.ComponentProps<typeof Ionicons>["name"];
    iconBg: string;
    iconColor: string;
    title: string;
    subtitle: string;
  }[] = [
    {
      id: "tunai",
      icon: "wallet-outline",
      iconBg: "#DCFCE7",
      iconColor: "#16A34A",
      title: "Tunai",
      subtitle: "Uang tunai & kembalian otomatis",
    },
    {
      id: "qris",
      icon: "qr-code-outline",
      iconBg: "#DBEAFE",
      iconColor: "#2563EB",
      title: "QRIS",
      subtitle: "Scan QR code untuk pembayaran digital",
    },
    {
      id: "transfer",
      icon: "business-outline",
      iconBg: "#EDE9FE",
      iconColor: "#7C3AED",
      title: "Transfer Bank",
      subtitle: "Pembayaran via transfer ke rekening toko",
    },
    {
      id: "edc",
      icon: "card-outline",
      iconBg: "#FEF3C7",
      iconColor: "#D97706",
      title: "EDC / Kartu",
      subtitle: "Debit atau kartu kredit melalui mesin EDC",
    },
  ];

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
            <TextH2 fontWeight="700" color="white" marginBottom={6}>
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

          {methods.map((method) => (
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
                        color={qrTimer < 60 ? "#DC2626" : "$colorSecondary"}
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
                          color="#6B7280"
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
          <TextBodyLg fontWeight="700" color="white">
            Proses Pembayaran
          </TextBodyLg>
        </TouchableOpacity>
        <TextCaption
          color="$colorSecondary"
          textAlign="center"
          marginTop={8}
        >
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
    backgroundColor: "#F8FAFF",
  },
  totalCard: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#1D4ED8",
    background:
      "linear-gradient(135deg, #1D4ED8 0%, #0D9488 100%)" as unknown as string,
    shadowColor: "#1D4ED8",
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
  methodCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1.5,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  methodCardSelected: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  qrisPanel: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginTop: -4,
  },
  qrWrapper: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
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
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 28,
  },
  processBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
