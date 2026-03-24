import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  FilterChip,
  IconButton,
  PageHeader,
  SearchBar,
  ShadowCard,
  StatsRow,
  StatusBadge,
  TextBodyLg,
  TextBodySm,
} from "@/components";
import { transactionListMock } from "@/data/transactions";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/themes/Colors";
import type { FilterTab } from "@/types";

export default function TransaksiPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Semua");

  const filtered =
    activeFilter === "Semua"
      ? transactionListMock
      : transactionListMock.filter((t) => t.status === activeFilter);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ColorBase.bgScreen }}>
      {/* ── Header ── */}
      <PageHeader
        title="Riwayat Transaksi"
        showBack
        actions={
          <>
            <IconButton iconName="search-outline" />
            <IconButton iconName="options-outline" />
          </>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$3" paddingHorizontal="$4" paddingBottom="$6">
          {/* ── Search ── */}
          <SearchBar placeholder="Cari nomor order atau pelanggan..." />

          {/* ── Filters ── */}
          <XStack alignItems="center" gap="$2">
            <XStack flex={1} gap="$2">
              {(["Semua", "Lunas", "Void", "Refund"] as FilterTab[]).map(
                (f) => (
                  <FilterChip
                    key={f}
                    label={f}
                    active={activeFilter === f}
                    onPress={() => setActiveFilter(f)}
                  />
                ),
              )}
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
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color={ColorPrimary.primary600}
                />
                <TextBodySm fontWeight="600" color="$primary">
                  Hari Ini
                </TextBodySm>
                <Ionicons
                  name="chevron-down"
                  size={12}
                  color={ColorNeutral.neutral400}
                />
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
            <StatsRow
              variant="dark"
              items={[
                { label: "Total Transaksi", value: "24" },
                {
                  label: "Pendapatan",
                  value: "Rp 1.250.000",
                  flex: 2,
                  smallValue: true,
                },
                { label: "Void", value: "1", valueColor: "#FCA5A5" },
              ]}
            />
          </XStack>

          {/* ── Date Label ── */}
          <TextBodySm color="$colorSecondary" textAlign="center">
            Hari Ini — Senin, 24 Mar 2025
          </TextBodySm>

          {/* ── Transaction List ── */}
          <YStack gap="$3">
            {filtered.map((tx) => (
              <TouchableOpacity key={tx.id}>
                <ShadowCard
                  backgroundColor={
                    tx.status === "Void" ? "#FFF5F5" : "$background"
                  }
                  padding="$4"
                  gap="$2"
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
                </ShadowCard>
              </TouchableOpacity>
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
