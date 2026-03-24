import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Separator, Text, XStack, YStack } from "tamagui";

const recentTransactions = [
  { id: "#0021", time: "10:12 WIB", amount: "Rp 120.000", status: "Lunas" },
  { id: "#0020", time: "09:48 WIB", amount: "Rp 85.000", status: "Lunas" },
  { id: "#0019", time: "09:15 WIB", amount: "Rp 42.000", status: "Void" },
];

type TxStatus = "Lunas" | "Void" | "Refund";

function StatusBadge({ status }: { status: TxStatus }) {
  const map: Record<TxStatus, { bg: string; color: string }> = {
    Lunas: { bg: "#DCFCE7", color: "#16A34A" },
    Void: { bg: "#FEE2E2", color: "#DC2626" },
    Refund: { bg: "#FFEDD5", color: "#EA580C" },
  };
  const style = map[status] ?? { bg: "#F3F4F6", color: "#6B7280" };
  return (
    <YStack
      backgroundColor={style.bg}
      borderRadius={20}
      paddingHorizontal={10}
      paddingVertical={4}
    >
      <Text
        fontFamily="$body"
        fontSize={12}
        fontWeight="600"
        color={style.color}
      >
        {status}
      </Text>
    </YStack>
  );
}

export default function HomePage() {
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
            <Text
              fontFamily="$body"
              fontSize="$lg"
              fontWeight="700"
              color="$color"
            >
              Budi Santoso
            </Text>
            <Text fontFamily="$body" fontSize="$sm" color="$colorSecondary">
              Toko Makmur
            </Text>
          </YStack>
          <YStack alignItems="flex-end" gap={2}>
            <Text fontFamily="$body" fontSize={11} color="$colorSecondary">
              Sen, 10 Jun 2024
            </Text>
            <Text
              fontFamily="$body"
              fontSize="$md"
              fontWeight="700"
              color="$color"
            >
              10:24 WIB
            </Text>
          </YStack>
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
              <Text
                fontFamily="$body"
                fontSize="$md"
                fontWeight="700"
                color="white"
              >
                Shift Aktif
              </Text>
            </XStack>
            <Text fontFamily="$body" fontSize="$sm" color="#BFDBFE">
              Mulai: 08:00 WIB
            </Text>

            <XStack gap="$3">
              <YStack
                flex={1}
                backgroundColor="rgba(255,255,255,0.15)"
                borderRadius={10}
                padding="$3"
                gap={4}
              >
                <Text fontFamily="$body" fontSize="$sm" color="#BFDBFE">
                  Total Transaksi
                </Text>
                <Text
                  fontFamily="$body"
                  fontSize="$xl"
                  fontWeight="700"
                  color="white"
                >
                  24
                </Text>
              </YStack>
              <YStack
                flex={1}
                backgroundColor="rgba(255,255,255,0.15)"
                borderRadius={10}
                padding="$3"
                gap={4}
              >
                <Text fontFamily="$body" fontSize="$sm" color="#BFDBFE">
                  Pendapatan
                </Text>
                <Text
                  fontFamily="$body"
                  fontSize="$md"
                  fontWeight="700"
                  color="white"
                >
                  Rp 1.250....
                </Text>
              </YStack>
            </XStack>

            <TouchableOpacity>
              <YStack
                backgroundColor="rgba(255,255,255,0.15)"
                borderRadius={10}
                height={44}
                alignItems="center"
                justifyContent="center"
                borderWidth={1}
                borderColor="rgba(255,255,255,0.3)"
              >
                <Text
                  fontFamily="$body"
                  fontSize="$md"
                  fontWeight="600"
                  color="white"
                >
                  Tutup Shift
                </Text>
              </YStack>
            </TouchableOpacity>
          </YStack>

          {/* ── Mulai Transaksi ── */}
          <TouchableOpacity>
            <XStack
              backgroundColor="#2563EB"
              borderRadius={14}
              height={56}
              alignItems="center"
              justifyContent="center"
              gap="$2"
            >
              <Ionicons name="cart-outline" size={22} color="white" />
              <Text
                fontFamily="$body"
                fontSize="$lg"
                fontWeight="700"
                color="white"
              >
                Mulai Transaksi
              </Text>
            </XStack>
          </TouchableOpacity>

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
              <TouchableOpacity key={item.label} style={{ flex: 1 }}>
                <YStack
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
                    width={44}
                    height={44}
                    borderRadius={22}
                    backgroundColor={item.iconBg}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Ionicons
                      name={item.iconName}
                      size={22}
                      color={item.iconColor}
                    />
                  </YStack>
                  <Text
                    fontFamily="$body"
                    fontSize="$sm"
                    fontWeight="500"
                    color="$color"
                    textAlign="center"
                  >
                    {item.label}
                  </Text>
                </YStack>
              </TouchableOpacity>
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
            <Text
              fontFamily="$body"
              fontSize="$sm"
              fontWeight="500"
              color="#92400E"
              flex={1}
            >
              3 produk stok hampir habis
            </Text>
            <TouchableOpacity>
              <Text
                fontFamily="$body"
                fontSize="$sm"
                fontWeight="700"
                color="#D97706"
              >
                Lihat
              </Text>
            </TouchableOpacity>
          </XStack>

          {/* ── Recent Transactions ── */}
          <YStack gap="$2">
            <Text
              fontFamily="$body"
              fontSize="$lg"
              fontWeight="700"
              color="$color"
            >
              Transaksi Terakhir
            </Text>
            <YStack
              backgroundColor="$background"
              borderRadius={12}
              shadowColor="#94A3B8"
              shadowOpacity={0.18}
              shadowRadius={8}
              elevation={2}
              overflow="hidden"
            >
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
                      <Text
                        fontFamily="$body"
                        fontSize="$md"
                        fontWeight="600"
                        color="$color"
                      >
                        {tx.id}
                      </Text>
                      <Text
                        fontFamily="$body"
                        fontSize="$sm"
                        color="$colorSecondary"
                      >
                        {tx.time}
                      </Text>
                    </YStack>
                    <Text
                      fontFamily="$body"
                      fontSize="$md"
                      fontWeight="600"
                      color="$color"
                    >
                      {tx.amount}
                    </Text>
                    <StatusBadge status={tx.status as TxStatus} />
                  </XStack>
                </React.Fragment>
              ))}
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
