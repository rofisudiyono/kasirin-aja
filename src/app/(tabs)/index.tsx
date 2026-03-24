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
} from "@/components";
import { ActionCardButton } from "@/components/atoms/ActionCardButton";
import { recentTransactions } from "@/data/transactions";
import {
  ColorAccentPurple,
  ColorBase,
  ColorGreen,
  ColorPrimary,
  ColorWarning,
} from "@/themes/Colors";

export default function HomePage() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ColorBase.bgScreen }}>
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
            backgroundColor={ColorPrimary.primary100}
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            <Ionicons name="person" size={26} color={ColorPrimary.primary600} />
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
            backgroundColor={ColorPrimary.primary600}
            borderRadius={16}
            padding="$4"
            gap="$3"
          >
            <XStack alignItems="center" gap="$2">
              <YStack
                width={8}
                height={8}
                borderRadius={4}
                backgroundColor={ColorGreen.green400}
              />
              <TextBodyLg fontWeight="700" color={ColorBase.white}>
                Shift Aktif
              </TextBodyLg>
            </XStack>
            <TextBodySm color={ColorPrimary.primary200}>
              Mulai: 08:00 WIB
            </TextBodySm>

            <XStack gap="$3">
              <YStack
                flex={1}
                backgroundColor="rgba(255,255,255,0.15)"
                borderRadius={10}
                padding="$3"
                gap={4}
              >
                <TextBodySm color={ColorPrimary.primary200}>
                  Total Transaksi
                </TextBodySm>
                <TextH2 fontWeight="700" color={ColorBase.white}>
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
                <TextBodySm color={ColorPrimary.primary200}>
                  Pendapatan
                </TextBodySm>
                <TextBodyLg fontWeight="700" color={ColorBase.white}>
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
            icon={
              <Ionicons name="cart-outline" size={22} color={ColorBase.white} />
            }
            onPress={() => router.push("/transaksi-baru")}
          />

          {/* ── Quick Actions ── */}
          <XStack gap="$3">
            {[
              {
                iconName: "pause-circle-outline" as const,
                label: "Tahan Order",
                iconBg: ColorWarning.warning50,
                iconColor: ColorWarning.warning600,
              },
              {
                iconName: "time-outline" as const,
                label: "Riwayat",
                iconBg: ColorAccentPurple.purple50,
                iconColor: ColorAccentPurple.purple600,
              },
              {
                iconName: "cube-outline" as const,
                label: "Inventori",
                iconBg: ColorGreen.green50,
                iconColor: ColorGreen.green600,
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
            backgroundColor={ColorWarning.warning100}
            borderRadius={12}
            padding="$3"
            alignItems="center"
            gap="$2"
          >
            <Ionicons
              name="warning-outline"
              size={18}
              color={ColorWarning.warning600}
            />
            <TextBodySm
              fontWeight="500"
              color={ColorWarning.warning800}
              flex={1}
            >
              3 produk stok hampir habis
            </TextBodySm>
            <TouchableOpacity>
              <TextBodySm fontWeight="700" color={ColorWarning.warning600}>
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
                    <StatusBadge status={tx.status} />
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
