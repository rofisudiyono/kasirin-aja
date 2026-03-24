import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  AppButton,
  IconButton,
  ShadowCard,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH3,
} from "@/components";
import { ActionCardButton } from "@/components/atoms/ActionCardButton";
import {
  ColorAccentOrange,
  ColorAccentPurple,
  ColorBase,
  ColorGreen,
  ColorNeutral,
  ColorPrimary,
  ColorSuccess,
  ColorWarning,
} from "@/themes/Colors";

// ─── Preparation item badge ───────────────────────────────────────────────────
function PrepBadge({
  label,
  type,
}: {
  label: string;
  type: "green" | "orange";
}) {
  const bg = type === "green" ? ColorGreen.green100 : ColorWarning.warning100;
  const color =
    type === "green" ? ColorSuccess.success600 : ColorWarning.warning700;
  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <TextBodySm fontWeight="600" color={color}>
        {label}
      </TextBodySm>
    </View>
  );
}

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
            <TextBodyLg fontWeight="700">07:54 WIB</TextBodyLg>
          </YStack>
          <IconButton iconName="notifications-outline" size={40} />
        </XStack>

        <YStack gap="$3" paddingHorizontal="$4" paddingBottom="$6">
          {/* ── Shift Akan Dimulai Card ── */}
          <YStack
            backgroundColor={ColorPrimary.primary600}
            borderRadius={16}
            padding="$4"
            gap="$3"
          >
            {/* Title row */}
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap="$2">
                <YStack
                  width={8}
                  height={8}
                  borderRadius={4}
                  backgroundColor={ColorNeutral.neutral300}
                />
                <TextBodyLg fontWeight="700" color={ColorBase.white}>
                  Shift Akan Dimulai
                </TextBodyLg>
              </XStack>
              <YStack
                width={36}
                height={36}
                borderRadius={18}
                backgroundColor="rgba(255,255,255,0.2)"
                alignItems="center"
                justifyContent="center"
              >
                <Ionicons name="sunny-outline" size={18} color={ColorBase.white} />
              </YStack>
            </XStack>

            <TextBodySm color={ColorPrimary.primary200}>
              Siapkan modal awal dan cek perangkat kasir sebelum mulai menerima
              transaksi.
            </TextBodySm>

            {/* Info chips */}
            <XStack gap="$2">
              <YStack
                flex={1}
                backgroundColor="rgba(255,255,255,0.15)"
                borderRadius={10}
                padding="$3"
                gap={4}
              >
                <TextBodySm color={ColorPrimary.primary200}>
                  Jadwal Shift
                </TextBodySm>
                <TextBodyLg fontWeight="700" color={ColorBase.white}>
                  08:00 WIB
                </TextBodyLg>
              </YStack>
              <YStack
                flex={1}
                backgroundColor="rgba(255,255,255,0.15)"
                borderRadius={10}
                padding="$3"
                gap={4}
              >
                <TextBodySm color={ColorPrimary.primary200}>
                  Kasir Bertugas
                </TextBodySm>
                <TextBodyLg
                  fontWeight="700"
                  color={ColorBase.white}
                  numberOfLines={1}
                >
                  Budi Santo...
                </TextBodyLg>
              </YStack>
            </XStack>

            {/* Modal awal card */}
            <YStack
              backgroundColor="rgba(255,255,255,0.12)"
              borderRadius={12}
              padding="$3"
              gap={4}
              borderWidth={1}
              borderColor="rgba(255,255,255,0.2)"
            >
              <XStack alignItems="flex-start" gap="$2">
                <Ionicons
                  name="card-outline"
                  size={18}
                  color={ColorWarning.warning400}
                  style={{ marginTop: 1 }}
                />
                <YStack flex={1} gap={2}>
                  <TextBodySm fontWeight="600" color={ColorBase.white}>
                    Modal awal direkomendasikan Rp 500.000
                  </TextBodySm>
                  <TextCaption color={ColorPrimary.primary200}>
                    Jumlah ini akan dipakai sebagai saldo awal laci kasir saat
                    shift dibuka.
                  </TextCaption>
                </YStack>
              </XStack>
            </YStack>

            {/* CTA Button */}
            <AppButton
              variant="success"
              size="lg"
              fullWidth
              title="Mulai Shift Sekarang"
              icon={
                <Ionicons
                  name="play-outline"
                  size={18}
                  color={ColorBase.white}
                />
              }
              onPress={() => router.push("/buka-shift")}
            />
          </YStack>

          {/* ── Disabled Transaksi hint ── */}
          <XStack
            alignItems="center"
            justifyContent="center"
            gap="$2"
            paddingVertical="$2"
          >
            <Ionicons
              name="cart-outline"
              size={18}
              color={ColorNeutral.neutral400}
            />
            <TextBodySm color={ColorNeutral.neutral400} fontWeight="500">
              Mulai Transaksi setelah shift dibuka
            </TextBodySm>
          </XStack>

          {/* ── Quick Actions ── */}
          <XStack gap="$3">
            {[
              {
                iconName: "pause-circle-outline" as const,
                label: "Tahan Order",
                subtitle: "Menunggu shift",
                iconBg: ColorWarning.warning50,
                iconColor: ColorWarning.warning600,
              },
              {
                iconName: "time-outline" as const,
                label: "Riwayat",
                subtitle: "Lihat transaksi lalu",
                iconBg: ColorAccentPurple.purple50,
                iconColor: ColorAccentPurple.purple600,
              },
              {
                iconName: "cube-outline" as const,
                label: "Inventori",
                subtitle: "Cek stok pagi ini",
                iconBg: ColorGreen.green50,
                iconColor: ColorGreen.green600,
              },
            ].map((item) => (
              <ActionCardButton
                key={item.label}
                label={item.label}
                subtitle={item.subtitle}
                iconName={item.iconName}
                iconBg={item.iconBg}
                iconColor={item.iconColor}
              />
            ))}
          </XStack>

          {/* ── Internet / device warning ── */}
          <XStack
            backgroundColor={ColorAccentOrange.orange100}
            borderRadius={12}
            padding="$3"
            alignItems="flex-start"
            gap="$2"
          >
            <Ionicons
              name="warning-outline"
              size={18}
              color={ColorAccentOrange.orange600}
              style={{ marginTop: 1 }}
            />
            <TextBodySm
              fontWeight="500"
              color={ColorAccentOrange.orange700}
              flex={1}
            >
              Pastikan printer, scanner, dan koneksi internet sudah siap.
            </TextBodySm>
          </XStack>

          {/* ── Persiapan Shift ── */}
          <YStack gap="$2">
            <TextH3 fontWeight="700">Persiapan Shift</TextH3>
            <ShadowCard overflow="hidden">
              {[
                {
                  title: "Perangkat kasir",
                  subtitle: "Scanner barcode dan printer struk terhubung",
                  badge: { label: "Siap", type: "green" as const },
                },
                {
                  title: "Modal awal kas",
                  subtitle: "Tambahkan nominal awal sebelum mulai shift",
                  badge: { label: "Isi dulu", type: "orange" as const },
                },
                {
                  title: "Cek inventori cepat",
                  subtitle: "3 produk stok hampir habis sebelum toko buka",
                  badge: { label: "Periksa", type: "orange" as const },
                },
              ].map((item, idx) => (
                <React.Fragment key={item.title}>
                  {idx > 0 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: ColorNeutral.neutral200,
                        marginHorizontal: 16,
                      }}
                    />
                  )}
                  <XStack
                    paddingHorizontal="$4"
                    paddingVertical="$3"
                    alignItems="center"
                    gap="$3"
                  >
                    <YStack
                      width={36}
                      height={36}
                      borderRadius={18}
                      backgroundColor={ColorNeutral.neutral100}
                    />
                    <YStack flex={1} gap={2}>
                      <TextBodyLg fontWeight="600">{item.title}</TextBodyLg>
                      <TextBodySm color="$colorSecondary">
                        {item.subtitle}
                      </TextBodySm>
                    </YStack>
                    <PrepBadge
                      label={item.badge.label}
                      type={item.badge.type}
                    />
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
