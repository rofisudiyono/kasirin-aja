import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Switch, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Separator, Text, XStack, YStack } from "tamagui";

import { useAuth } from "@/lib/auth";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

interface SettingRowProps {
  iconName: IoniconName;
  iconBg: string;
  iconColor?: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  badgeBg?: string;
  value?: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (val: boolean) => void;
  showChevron?: boolean;
}

function SettingRow({
  iconName,
  iconBg,
  iconColor = "#374151",
  title,
  subtitle,
  badge,
  badgeColor,
  badgeBg,
  value,
  hasToggle,
  toggleValue,
  onToggle,
  showChevron = true,
}: SettingRowProps) {
  return (
    <TouchableOpacity disabled={hasToggle}>
      <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
        gap="$3"
      >
        <YStack
          width={40}
          height={40}
          borderRadius={10}
          backgroundColor={iconBg}
          alignItems="center"
          justifyContent="center"
        >
          <Ionicons name={iconName} size={20} color={iconColor} />
        </YStack>
        <YStack flex={1} gap={2}>
          <Text
            fontFamily="$body"
            fontSize="$md"
            fontWeight="600"
            color="$color"
          >
            {title}
          </Text>
          <Text
            fontFamily="$body"
            fontSize="$sm"
            color="$colorSecondary"
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        </YStack>
        {badge && (
          <YStack
            backgroundColor={badgeBg ?? "#DCFCE7"}
            borderRadius={20}
            paddingHorizontal={10}
            paddingVertical={4}
          >
            <Text
              fontFamily="$body"
              fontSize={12}
              fontWeight="700"
              color={badgeColor ?? "#16A34A"}
            >
              {badge}
            </Text>
          </YStack>
        )}
        {value && (
          <Text fontFamily="$body" fontSize="$sm" color="$colorSecondary">
            {value}
          </Text>
        )}
        {hasToggle && (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{ true: "#2563EB", false: "#D1D5DB" }}
          />
        )}
        {showChevron && !hasToggle && (
          <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
        )}
      </XStack>
    </TouchableOpacity>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <YStack gap="$2">
      <Text fontFamily="$body" fontSize="$md" fontWeight="700" color="$color">
        {title}
      </Text>
      <YStack
        backgroundColor="$background"
        borderRadius={14}
        overflow="hidden"
        shadowColor="#94A3B8"
        shadowOpacity={0.18}
        shadowRadius={8}
        elevation={2}
      >
        {children}
      </YStack>
    </YStack>
  );
}

export default function PengaturanScreen() {
  const { logout } = useAuth();
  const [scannerEnabled, setScannerEnabled] = React.useState(true);
  const [autoPrint, setAutoPrint] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFF" }}>
      {/* ── Header ── */}
      <XStack
        paddingHorizontal="$4"
        paddingTop="$3"
        paddingBottom="$3"
        alignItems="center"
      >
        <YStack flex={1} gap={2}>
          <Text
            fontFamily="$body"
            fontSize="$xl"
            fontWeight="700"
            color="$color"
          >
            Pengaturan
          </Text>
          <Text fontFamily="$body" fontSize="$sm" color="$colorSecondary">
            Kelola toko, perangkat, dan preferensi aplikasi kasir
          </Text>
        </YStack>
        <TouchableOpacity>
          <YStack
            width={40}
            height={40}
            borderRadius={20}
            backgroundColor="$backgroundSecondary"
            alignItems="center"
            justifyContent="center"
          >
            <Ionicons name="notifications-outline" size={20} color="#374151" />
          </YStack>
        </TouchableOpacity>
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$4" paddingHorizontal="$4" paddingBottom="$6">
          {/* ── User Profile Card ── */}
          <YStack
            backgroundColor="#2563EB"
            borderRadius={16}
            padding="$4"
            gap="$3"
          >
            <XStack alignItems="center" gap="$3">
              <YStack
                width={56}
                height={56}
                borderRadius={28}
                backgroundColor="#BFDBFE"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
              >
                <Ionicons name="person" size={28} color="white" />
              </YStack>
              <YStack flex={1} gap={2}>
                <Text
                  fontFamily="$body"
                  fontSize="$lg"
                  fontWeight="700"
                  color="white"
                >
                  Budi Santoso
                </Text>
                <Text fontFamily="$body" fontSize="$sm" color="#BFDBFE">
                  Manajer Kasir • Toko Makmur
                </Text>
              </YStack>
              <YStack
                backgroundColor="white"
                borderRadius={20}
                paddingHorizontal={12}
                paddingVertical={5}
              >
                <Text
                  fontFamily="$body"
                  fontSize="$sm"
                  fontWeight="700"
                  color="#2563EB"
                >
                  Online
                </Text>
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
                    <Text fontFamily="$body" fontSize={10} color="#BFDBFE">
                      {item.label}
                    </Text>
                    <Text
                      fontFamily="$body"
                      fontSize="$sm"
                      fontWeight="700"
                      color="white"
                    >
                      {item.value}
                    </Text>
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
                iconColor: "#2563EB",
              },
              {
                iconName: "phone-portrait-outline" as IoniconName,
                label: "Perangkat",
                sub: "Printer dan sc...",
                iconColor: "#16A34A",
              },
            ].map((item) => (
              <TouchableOpacity key={item.label} style={{ flex: 1 }}>
                <XStack
                  backgroundColor="$background"
                  borderRadius={12}
                  padding="$3"
                  alignItems="center"
                  gap="$2"
                  shadowColor="#94A3B8"
                  shadowOpacity={0.18}
                  shadowRadius={8}
                  elevation={2}
                >
                  <YStack
                    width={40}
                    height={40}
                    borderRadius={10}
                    backgroundColor="$backgroundSecondary"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Ionicons
                      name={item.iconName}
                      size={20}
                      color={item.iconColor}
                    />
                  </YStack>
                  <YStack flex={1}>
                    <Text
                      fontFamily="$body"
                      fontSize="$sm"
                      fontWeight="600"
                      color="$color"
                    >
                      {item.label}
                    </Text>
                    <Text
                      fontFamily="$body"
                      fontSize={11}
                      color="$colorSecondary"
                    >
                      {item.sub}
                    </Text>
                  </YStack>
                  <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                </XStack>
              </TouchableOpacity>
            ))}
          </XStack>

          {/* ── Umum ── */}
          <SectionCard title="Umum">
            <SettingRow
              iconName="business-outline"
              iconColor="#2563EB"
              iconBg="#DBEAFE"
              title="Informasi Toko"
              subtitle="Nama usaha, alamat, logo,..."
              value="Lengkap"
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="people-outline"
              iconColor="#16A34A"
              iconBg="#DCFCE7"
              title="Akun & Akses"
              subtitle="Kasir, PIN, dan hak akses ..."
              badge="2 kasir"
              badgeColor="#16A34A"
              badgeBg="#DCFCE7"
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="card-outline"
              iconColor="#D97706"
              iconBg="#FEF3C7"
              title="Metode Pembayaran"
              subtitle="Tunai, QRIS, kartu, dan trans..."
              value="4 aktif"
            />
          </SectionCard>

          {/* ── Perangkat Kasir ── */}
          <SectionCard title="Perangkat Kasir">
            <SettingRow
              iconName="print-outline"
              iconColor="#2563EB"
              iconBg="#DBEAFE"
              title="Printer Struk"
              subtitle="Bluetooth POS-58 sudah te..."
              badge="Siap"
              badgeColor="#16A34A"
              badgeBg="#DCFCE7"
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="barcode-outline"
              iconColor="#7C3AED"
              iconBg="#EDE9FE"
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
              iconColor="#6B7280"
              iconBg="#F3F4F6"
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
              iconColor="#6B7280"
              iconBg="#F3F4F6"
              title="Pengaturan Shift"
              subtitle="Jadwal buka, modal awal, da..."
              value="08:00"
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="warning-outline"
              iconColor="#D97706"
              iconBg="#FEF3C7"
              title="Alert Stok Minimum"
              subtitle="Peringatan muncul saat s..."
              badge="10 item"
              badgeColor="#EA580C"
              badgeBg="#FFEDD5"
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="sync-outline"
              iconColor="#16A34A"
              iconBg="#DCFCE7"
              title="Sinkronisasi & Backup"
              subtitle="Backup terakhir hari ini puk..."
              badge="Aktif"
              badgeColor="#16A34A"
              badgeBg="#DCFCE7"
            />
          </SectionCard>

          {/* ── Lainnya ── */}
          <SectionCard title="Lainnya">
            <SettingRow
              iconName="help-circle-outline"
              iconColor="#2563EB"
              iconBg="#DBEAFE"
              title="Pusat Bantuan"
              subtitle="Panduan penggunaan aplikasi dan F..."
            />
            <Separator borderColor="$borderColor" marginHorizontal="$4" />
            <SettingRow
              iconName="information-circle-outline"
              iconColor="#6B7280"
              iconBg="#F3F4F6"
              title="Tentang Aplikasi"
              subtitle="Versi, lisensi, dan informasi si..."
              value="v2.4.1"
            />
          </SectionCard>

          {/* ── Logout ── */}
          <TouchableOpacity onPress={logout}>
            <YStack
              backgroundColor="$background"
              borderRadius={14}
              paddingVertical="$4"
              alignItems="center"
              borderWidth={1}
              borderColor="#FEE2E2"
              shadowColor="#94A3B8"
              shadowOpacity={0.12}
              shadowRadius={4}
              elevation={1}
            >
              <Text
                fontFamily="$body"
                fontSize="$md"
                fontWeight="700"
                color="#DC2626"
              >
                Keluar dari akun
              </Text>
              <Text
                fontFamily="$body"
                fontSize="$sm"
                color="$colorSecondary"
                marginTop={2}
              >
                Akhiri sesi kasir di perangkat ini
              </Text>
            </YStack>
          </TouchableOpacity>

          {/* ── Footer ── */}
          <Text
            fontFamily="$body"
            fontSize="$sm"
            color="$colorTertiary"
            textAlign="center"
          >
            Aplikasi Kasir • Versi 2.4.1
          </Text>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
