import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Separator, XStack, YStack } from "tamagui";

import {
  AppButton,
  IconButton,
  ShadowCard,
  StatusBadge,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH2,
  TextH3,
  type TxStatus,
} from "@/components";
import { ActionCardButton } from "@/components/atoms/ActionCardButton";

const recentTransactions = [
  { id: "#0021", time: "10:12 WIB", amount: "Rp 120.000", status: "Lunas" },
  { id: "#0020", time: "09:48 WIB", amount: "Rp 85.000", status: "Lunas" },
  { id: "#0019", time: "09:15 WIB", amount: "Rp 42.000", status: "Void" },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFF" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Header ── */}
        <XStack
          paddingHorizontal="$4"
          paddingTop="$3"
          paddingBottom="$2"
          alignItems="center"
          gap="$3"
        >
          <YStack
            width={48}
            height={48}
            borderRadius={24}
            backgroundColor="#DBEAFE"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            <Ionicons name="person" size={26} color="#2563EB" />
          </YStack>
          <YStack flex={1}>
            <TextH3 fontWeight="700">Budi Santoso</TextH3>
            <TextBodySm color="$colorSecondary">Toko Makmur</TextBodySm>
          </YStack>
          <YStack alignItems="flex-end" gap={2}>
            <TextCaption color="$colorSecondary">Sen, 10 Jun 2024</TextCaption>
            <TextBodyLg fontWeight="700">10:24 WIB</TextBodyLg>
          </YStack>
          <IconButton iconName="notifications-outline" size={40} />
        </XStack>

        <YStack gap="$3" paddingHorizontal="$4" paddingBottom="$6">
          {/* ── Shift Aktif Card ── */}
          <YStack
            backgroundColor="#2563EB"
            borderRadius={16}
            padding="$4"
            gap="$3"
          >
            <XStack alignItems="center" gap="$2">
              <YStack
                width={8}
                height={8}
                borderRadius={4}
                backgroundColor="#4ADE80"
              />
              <TextBodyLg fontWeight="700" color="white">
                Shift Aktif
              </TextBodyLg>
            </XStack>
            <TextBodySm color="#BFDBFE">Mulai: 08:00 WIB</TextBodySm>

            <XStack gap="$3">
              <YStack
                flex={1}
                backgroundColor="rgba(255,255,255,0.15)"
                borderRadius={10}
                padding="$3"
                gap={4}
              >
                <TextBodySm color="#BFDBFE">Total Transaksi</TextBodySm>
                <TextH2 fontWeight="700" color="white">
                  24
                </TextH2>
              </YStack>
              <YStack
                flex={1}
                backgroundColor="rgba(255,255,255,0.15)"
                borderRadius={10}
                padding="$3"
                gap={4}
              >
                <TextBodySm color="#BFDBFE">Pendapatan</TextBodySm>
                <TextBodyLg fontWeight="700" color="white">
                  Rp 1.250....
                </TextBodyLg>
              </YStack>
            </XStack>

            <AppButton
              variant="glass"
              title="Tutup Shift"
              onPress={() => console.log("Tutup Shift ditekan")}
            />
          </YStack>

          {/* ── Mulai Transaksi ── */}
          <AppButton
            variant="primary"
            size="lg"
            fullWidth
            title="Mulai Transaksi"
            icon={<Ionicons name="cart-outline" size={22} color="white" />}
            onPress={() => router.push("/transaksi-baru")}
          />

          {/* ── Quick Actions ── */}
          <XStack gap="$3">
            {[
              {
                iconName: "pause-circle-outline" as const,
                label: "Tahan Order",
                iconBg: "#FFFBEB",
                iconColor: "#D97706",
              },
              {
                iconName: "time-outline" as const,
                label: "Riwayat",
                iconBg: "#F5F3FF",
                iconColor: "#7C3AED",
              },
              {
                iconName: "cube-outline" as const,
                label: "Inventori",
                iconBg: "#F0FDF4",
                iconColor: "#16A34A",
              },
            ].map((item) => (
              <ActionCardButton
                key={item.label}
                label={item.label}
                iconName={item.iconName}
                iconBg={item.iconBg}
                iconColor={item.iconColor}
              />
            ))}
          </XStack>

          {/* ── Low stock warning ── */}
          <XStack
            backgroundColor="#FEF3C7"
            borderRadius={12}
            padding="$3"
            alignItems="center"
            gap="$2"
          >
            <Ionicons name="warning-outline" size={18} color="#D97706" />
            <TextBodySm fontWeight="500" color="#92400E" flex={1}>
              3 produk stok hampir habis
            </TextBodySm>
            <TouchableOpacity>
              <TextBodySm fontWeight="700" color="#D97706">
                Lihat
              </TextBodySm>
            </TouchableOpacity>
          </XStack>

          {/* ── Recent Transactions ── */}
          <YStack gap="$2">
            <TextH3 fontWeight="700">Transaksi Terakhir</TextH3>
            <ShadowCard overflow="hidden">
              {recentTransactions.map((tx, idx) => (
                <React.Fragment key={tx.id}>
                  {idx > 0 && (
                    <Separator
                      borderColor="$borderColor"
                      marginHorizontal="$3"
                    />
                  )}
                  <XStack
                    paddingHorizontal="$4"
                    paddingVertical="$3"
                    alignItems="center"
                    gap="$2"
                  >
                    <YStack flex={1}>
                      <TextBodyLg fontWeight="600">{tx.id}</TextBodyLg>
                      <TextBodySm color="$colorSecondary">{tx.time}</TextBodySm>
                    </YStack>
                    <TextBodyLg fontWeight="600">{tx.amount}</TextBodyLg>
                    <StatusBadge status={tx.status as TxStatus} />
                  </XStack>
                </React.Fragment>
              ))}
            </ShadowCard>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
