import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Separator, XStack, YStack } from "tamagui";

import { SettingRow } from "@/features/settings/components/SettingRow";
import {
  AppButton,
  IconButton,
  SectionCard,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH3,
  TextMicro,
} from "@/shared/components";
import { useAuth } from "@/shared/lib/auth";
import {
  ColorAccentOrange,
  ColorAccentPurple,
  ColorBase,
  ColorGreen,
  ColorNeutral,
  ColorPrimary,
  ColorWarning,
} from "@/shared/themes/Colors";
import type { IoniconName } from "@/shared/types";

export default function PengaturanPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [scannerEnabled, setScannerEnabled] = React.useState(true);
  const [autoPrint, setAutoPrint] = React.useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: ColorBase.bgScreen }}
    >
      {/* ── Header ── */}
      <XStack
        paddingHorizontal="$4"
        paddingTop="$3"
        paddingBottom="$3"
        alignItems="center"
      >
        <YStack flex={1} gap={2}>
          <TextBodyLg fontWeight="700" fontSize={18}>
            Pengaturan
          </TextBodyLg>
          <TextBodySm color="$colorSecondary">
            Kelola toko, perangkat, dan preferensi aplikasi kasir
          </TextBodySm>
        </YStack>
        <IconButton iconName="notifications-outline" size={40} />
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$4" paddingHorizontal="$4" paddingBottom="$6">
          {/* ── User Profile Card ── */}
          <YStack
            backgroundColor={ColorPrimary.primary600}
            borderRadius={16}
            padding="$4"
            gap="$3"
          >
            <XStack alignItems="center" gap="$3">
              <YStack
                width={56}
                height={56}
                borderRadius={28}
                backgroundColor={ColorPrimary.primary200}
              />
              <YStack flex={1} gap={2}>
                <TextH3 fontWeight="700" color={ColorBase.white}>
                  Budi Santoso
                </TextH3>
                <TextBodySm color={ColorPrimary.primary200}>
                  Manajer Kasir • Toko Makmur
                </TextBodySm>
              </YStack>
              <YStack
                backgroundColor={ColorBase.white}
                borderRadius={20}
                paddingHorizontal={12}
                paddingVertical={5}
              >
                <TextBodySm fontWeight="700" color={ColorPrimary.primary600}>
                  Online
                </TextBodySm>
              </YStack>
            </XStack>

            <XStack
              backgroundColor="rgba(255,255,255,0.12)"
              borderRadius={10}
              paddingHorizontal="$3"
              paddingVertical="$2"
            >
              {[
                { label: "Shift Hari Ini", value: "Belum d..." },
                { label: "Printer", value: "Terhub..." },
                { label: "Versi App", value: "v2.4.1" },
              ].map((item, idx) => (
                <React.Fragment key={item.label}>
                  {idx > 0 && (
                    <YStack
                      width={1}
                      backgroundColor="rgba(255,255,255,0.3)"
                      marginHorizontal="$3"
                    />
                  )}
                  <YStack flex={1} gap={2}>
                    <TextMicro color={ColorPrimary.primary200}>
                      {item.label}
                    </TextMicro>
                    <TextBodySm fontWeight="700" color={ColorBase.white}>
                      {item.value}
                    </TextBodySm>
                  </YStack>
                </React.Fragment>
              ))}
            </XStack>
          </YStack>

          {/* ── Quick Access ── */}
          <XStack gap="$3">
            {[
              {
                iconName: "storefront-outline" as IoniconName,
                label: "Profil Toko",
                sub: "Nama, alamat...",
                iconColor: ColorPrimary.primary600,
              },
              {
                iconName: "phone-portrait-outline" as IoniconName,
                label: "Perangkat",
                sub: "Printer dan sc...",
                iconColor: ColorGreen.green600,
              },
            ].map((item) => (
              <TouchableOpacity key={item.label} style={{ flex: 1 }}>
                <XStack
                  backgroundColor="$background"
                  borderRadius={12}
                  padding="$3"
                  alignItems="center"
                  gap="$2"
                  shadowColor={ColorNeutral.neutralShadow}
                  shadowOpacity={0.18}
                  shadowRadius={8}
                  elevation={2}
                >
                  <IconButton
                    iconName={item.iconName}
                    size={40}
                    shape="square"
                    iconColor={item.iconColor}
                    disabled
                  />
                  <YStack flex={1}>
                    <TextBodySm fontWeight="600">{item.label}</TextBodySm>
                    <TextCaption color="$colorSecondary">
                      {item.sub}
                    </TextCaption>
                  </YStack>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={ColorNeutral.neutral400}
                  />
                </XStack>
              </TouchableOpacity>
            ))}
          </XStack>

          {/* ── Umum ── */}
          <SectionCard title="Umum">
            <SettingRow
              iconName="business-outline"
              iconColor={ColorPrimary.primary600}
              iconBg={ColorPrimary.primary100}
              title="Informasi Toko"
              subtitle="Nama usaha, alamat, logo,..."
              value="Lengkap"
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="people-outline"
              iconColor={ColorGreen.green600}
              iconBg={ColorGreen.green100}
              title="Akun & Akses"
              subtitle="Kasir, PIN, dan hak akses ..."
              badge="2 kasir"
              badgeColor={ColorGreen.green600}
              badgeBg={ColorGreen.green100}
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="card-outline"
              iconColor={ColorWarning.warning600}
              iconBg={ColorWarning.warning100}
              title="Metode Pembayaran"
              subtitle="Tunai, QRIS, kartu, dan trans..."
              value="4 aktif"
            />
          </SectionCard>

          {/* ── Perangkat Kasir ── */}
          <SectionCard title="Perangkat Kasir">
            <SettingRow
              iconName="print-outline"
              iconColor={ColorPrimary.primary600}
              iconBg={ColorPrimary.primary100}
              title="Printer Struk"
              subtitle="Bluetooth POS-58 sudah te..."
              badge="Siap"
              badgeColor={ColorGreen.green600}
              badgeBg={ColorGreen.green100}
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="barcode-outline"
              iconColor={ColorAccentPurple.purple600}
              iconBg={ColorAccentPurple.purple100}
              title="Scanner Barcode"
              subtitle="Mode otomatis aktif untuk transaksi..."
              hasToggle
              toggleValue={scannerEnabled}
              onToggle={setScannerEnabled}
              showChevron={false}
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="document-text-outline"
              iconColor={ColorNeutral.neutral500}
              iconBg={ColorNeutral.neutral100}
              title="Cetak Otomatis"
              subtitle="Struk tercetak setelah pembayaran..."
              hasToggle
              toggleValue={autoPrint}
              onToggle={setAutoPrint}
              showChevron={false}
            />
          </SectionCard>

          {/* ── Operasional ── */}
          <SectionCard title="Operasional">
            <SettingRow
              iconName="time-outline"
              iconColor={ColorNeutral.neutral500}
              iconBg={ColorNeutral.neutral100}
              title="Pengaturan Shift"
              subtitle="Jadwal buka, modal awal, da..."
              value="08:00"
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="warning-outline"
              iconColor={ColorWarning.warning600}
              iconBg={ColorWarning.warning100}
              title="Alert Stok Minimum"
              subtitle="Peringatan muncul saat s..."
              badge="10 item"
              badgeColor={ColorAccentOrange.orange600}
              badgeBg={ColorAccentOrange.orange100}
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="sync-outline"
              iconColor={ColorGreen.green600}
              iconBg={ColorGreen.green100}
              title="Sinkronisasi & Backup"
              subtitle="Backup terakhir hari ini puk..."
              badge="Aktif"
              badgeColor={ColorGreen.green600}
              badgeBg={ColorGreen.green100}
            />
          </SectionCard>

          {/* ── Lainnya ── */}
          <SectionCard title="Lainnya">
            <SettingRow
              iconName="help-circle-outline"
              iconColor={ColorPrimary.primary600}
              iconBg={ColorPrimary.primary100}
              title="Pusat Bantuan"
              subtitle="Panduan penggunaan aplikasi dan F..."
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="information-circle-outline"
              iconColor={ColorNeutral.neutral500}
              iconBg={ColorNeutral.neutral100}
              title="Tentang Aplikasi"
              subtitle="Versi, lisensi, dan informasi si..."
              value="v2.4.1"
            />
          </SectionCard>

          {/* ── Logout ── */}
          <AppButton variant="danger" fullWidth onPress={handleLogout}>
            Keluar dari akun
          </AppButton>

          {/* ── Footer ── */}
          <TextBodySm color="$colorTertiary" textAlign="center">
            Aplikasi Kasir • Versi 2.4.1
          </TextBodySm>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
