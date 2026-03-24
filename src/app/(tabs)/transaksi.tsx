import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import { TextBodyLg, TextBodySm, TextH2, TextH3 } from "@/components";

type TxStatus = "Lunas" | "Void" | "Refund";
type FilterTab = "Semua" | "Lunas" | "Void";

const transactions = [
  {
    id: "#TRX-0024",
    time: "14:32 WIB",
    table: "Meja 3",
    items: "Kopi Susu x2, Nasi Goreng x1",
    amount: "Rp 88.800",
    status: "Lunas" as TxStatus,
  },
  {
    id: "#TRX-0023",
    time: "14:10 WIB",
    table: "Meja 1",
    items: "Ayam Geprek x1, Es Jeruk x1",
    amount: "Rp 45.000",
    status: "Void" as TxStatus,
  },
  {
    id: "#TRX-0022",
    time: "13:15 WIB",
    table: "Tanpa nama pelanggan",
    items: "Mie Ayam x1, Teh Manis x1",
    amount: "Rp 32.000",
    status: "Lunas" as TxStatus,
  },
  {
    id: "#TRX-0021",
    time: "12:48 WIB",
    table: "Take Away",
    items: "Kopi Hitam x1, Roti Bakar x1",
    amount: "Rp 28.000",
    status: "Refund" as TxStatus,
  },
];

function StatusBadge({ status }: { status: TxStatus }) {
  const map: Record<TxStatus, { bg: string; color: string }> = {
    Lunas: { bg: "#DCFCE7", color: "#16A34A" },
    Void: { bg: "#FEE2E2", color: "#DC2626" },
    Refund: { bg: "#FFEDD5", color: "#EA580C" },
  };
  const s = map[status];
  return (
    <YStack
      backgroundColor={s.bg}
      borderRadius={20}
      paddingHorizontal={10}
      paddingVertical={4}
    >
      <TextBodySm fontWeight="600" color={s.color}>
        {status}
      </TextBodySm>
    </YStack>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <YStack
        backgroundColor={active ? "$primary" : "$background"}
        borderRadius={20}
        paddingHorizontal={16}
        paddingVertical={8}
        borderWidth={1}
        borderColor={active ? "$primary" : "$borderColor"}
      >
        <TextBodySm
          fontWeight="600"
          color={active ? "white" : "$colorSecondary"}
        >
          {label}
        </TextBodySm>
      </YStack>
    </TouchableOpacity>
  );
}

export default function TransaksiPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Semua");

  const filtered =
    activeFilter === "Semua"
      ? transactions
      : transactions.filter((t) => t.status === activeFilter);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFF" }}>
      {/* ── Header ── */}
      <XStack
        paddingHorizontal="$4"
        paddingTop="$3"
        paddingBottom="$3"
        alignItems="center"
        gap="$3"
      >
        <TouchableOpacity>
          <YStack
            width={36}
            height={36}
            borderRadius={18}
            backgroundColor="$backgroundSecondary"
            alignItems="center"
            justifyContent="center"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </YStack>
        </TouchableOpacity>
        <TextH3 fontWeight="700" flex={1} textAlign="center">
          Riwayat Transaksi
        </TextH3>
        <TouchableOpacity>
          <YStack
            width={36}
            height={36}
            borderRadius={18}
            backgroundColor="$backgroundSecondary"
            alignItems="center"
            justifyContent="center"
          >
            <Ionicons name="search-outline" size={20} color="#374151" />
          </YStack>
        </TouchableOpacity>
        <TouchableOpacity>
          <YStack
            width={36}
            height={36}
            borderRadius={18}
            backgroundColor="$backgroundSecondary"
            alignItems="center"
            justifyContent="center"
          >
            <Ionicons name="options-outline" size={20} color="#374151" />
          </YStack>
        </TouchableOpacity>
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$3" paddingHorizontal="$4" paddingBottom="$6">
          {/* ── Search ── */}
          <XStack
            backgroundColor="$background"
            borderRadius={12}
            height={44}
            alignItems="center"
            paddingHorizontal="$3"
            gap="$2"
            borderWidth={1}
            borderColor="$borderColor"
          >
            <Ionicons name="search-outline" size={16} color="#9CA3AF" />
            <TextBodyLg color="$colorTertiary" flex={1}>
              Cari nomor order atau pelanggan...
            </TextBodyLg>
          </XStack>

          {/* ── Filters ── */}
          <XStack alignItems="center" gap="$2">
            <XStack flex={1} gap="$2">
              {(["Semua", "Lunas", "Void"] as FilterTab[]).map((f) => (
                <FilterChip
                  key={f}
                  label={f}
                  active={activeFilter === f}
                  onPress={() => setActiveFilter(f)}
                />
              ))}
            </XStack>
            <TouchableOpacity>
              <XStack
                backgroundColor="$background"
                borderRadius={20}
                paddingHorizontal={12}
                paddingVertical={8}
                borderWidth={1}
                borderColor="$borderColor"
                alignItems="center"
                gap={4}
              >
                <Ionicons name="calendar-outline" size={14} color="#2563EB" />
                <TextBodySm fontWeight="600" color="$primary">
                  Hari Ini
                </TextBodySm>
                <Ionicons name="chevron-down" size={12} color="#9CA3AF" />
              </XStack>
            </TouchableOpacity>
          </XStack>

          {/* ── Summary Card ── */}
          <XStack
            backgroundColor="#2563EB"
            borderRadius={16}
            paddingVertical="$4"
            paddingHorizontal="$4"
            alignItems="center"
          >
            <YStack flex={1} alignItems="center" gap={4}>
              <TextBodySm color="#BFDBFE">Total Transaksi</TextBodySm>
              <TextH2 fontWeight="700" color="white">
                24
              </TextH2>
            </YStack>
            <YStack
              width={1}
              height={40}
              backgroundColor="rgba(255,255,255,0.3)"
            />
            <YStack flex={2} alignItems="center" gap={4}>
              <TextBodySm color="#BFDBFE">Pendapatan</TextBodySm>
              <TextH3 fontWeight="700" color="white">
                Rp 1.250.000
              </TextH3>
            </YStack>
            <YStack
              width={1}
              height={40}
              backgroundColor="rgba(255,255,255,0.3)"
            />
            <YStack flex={1} alignItems="center" gap={4}>
              <TextBodySm color="#BFDBFE">Void</TextBodySm>
              <TextH2 fontWeight="700" color="#FCA5A5">
                1
              </TextH2>
            </YStack>
          </XStack>

          {/* ── Date Label ── */}
          <TextBodySm color="$colorSecondary" textAlign="center">
            Hari Ini — Senin, 24 Mar 2025
          </TextBodySm>

          {/* ── Transaction List ── */}
          <YStack gap="$3">
            {filtered.map((tx) => (
              <TouchableOpacity key={tx.id}>
                <YStack
                  backgroundColor={
                    tx.status === "Void" ? "#FFF5F5" : "$background"
                  }
                  borderRadius={14}
                  padding="$4"
                  gap="$2"
                  shadowColor="#94A3B8"
                  shadowOpacity={0.18}
                  shadowRadius={8}
                  elevation={2}
                >
                  <XStack alignItems="center" justifyContent="space-between">
                    <TextBodyLg fontWeight="700" color="$primary">
                      {tx.id}
                    </TextBodyLg>
                    <StatusBadge status={tx.status} />
                  </XStack>
                  <XStack alignItems="center" gap="$3">
                    <XStack alignItems="center" gap={4}>
                      <Ionicons name="time-outline" size={13} color="#9CA3AF" />
                      <TextBodySm color="$colorSecondary">{tx.time}</TextBodySm>
                    </XStack>
                    <XStack alignItems="center" gap={4}>
                      <Ionicons
                        name="person-outline"
                        size={13}
                        color="#9CA3AF"
                      />
                      <TextBodySm color="$colorSecondary">
                        {tx.table}
                      </TextBodySm>
                    </XStack>
                  </XStack>
                  <TextBodySm color="$colorSecondary" fontStyle="italic">
                    {tx.items}
                  </TextBodySm>
                  <XStack alignItems="center" justifyContent="space-between">
                    <TextBodyLg
                      fontWeight="700"
                      color={tx.status === "Void" ? "#DC2626" : "$color"}
                      textDecorationLine={
                        tx.status === "Void" ? "line-through" : "none"
                      }
                    >
                      {tx.amount}
                    </TextBodyLg>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color="#9CA3AF"
                    />
                  </XStack>
                </YStack>
              </TouchableOpacity>
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
