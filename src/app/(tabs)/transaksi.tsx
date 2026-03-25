import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItem, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import { StatsRow } from "@/features/shift/components/StatsRow";
import { transactionListMock } from "@/features/transactions/api/transactions.data";
import { StatusBadge } from "@/features/transactions/components/StatusBadge";
import {
  FilterChip,
  IconButton,
  PageHeader,
  SearchBar,
  ShadowCard,
  TextBodyLg,
  TextBodySm,
} from "@/shared/components";
import {
  ColorBase,
  ColorDanger,
  ColorNeutral,
  ColorPrimary,
} from "@/shared/themes/Colors";
import type { FilterTab } from "@/shared/types";

type Transaction = (typeof transactionListMock)[number];

const FILTERS: FilterTab[] = ["Semua", "Lunas", "Void", "Refund"];

function TransactionCard({ tx }: { tx: Transaction }) {
  return (
    <TouchableOpacity>
      <ShadowCard
        backgroundColor={
          tx.status === "Void" ? ColorDanger.danger25 : "$background"
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
            <Ionicons
              name="time-outline"
              size={13}
              color={ColorNeutral.neutral400}
            />
            <TextBodySm color="$colorSecondary">{tx.time}</TextBodySm>
          </XStack>
          <XStack alignItems="center" gap={4}>
            <Ionicons
              name="person-outline"
              size={13}
              color={ColorNeutral.neutral400}
            />
            <TextBodySm color="$colorSecondary">{tx.table}</TextBodySm>
          </XStack>
        </XStack>
        <TextBodySm color="$colorSecondary" fontStyle="italic">
          {tx.items}
        </TextBodySm>
        <XStack alignItems="center" justifyContent="space-between">
          <TextBodyLg
            fontWeight="700"
            color={tx.status === "Void" ? ColorDanger.danger600 : "$color"}
            textDecorationLine={tx.status === "Void" ? "line-through" : "none"}
          >
            {tx.amount}
          </TextBodyLg>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={ColorNeutral.neutral400}
          />
        </XStack>
      </ShadowCard>
    </TouchableOpacity>
  );
}

const MemoTransactionCard = React.memo(TransactionCard);

export default function TransaksiPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Semua");

  const filtered =
    activeFilter === "Semua"
      ? transactionListMock
      : transactionListMock.filter((t) => t.status === activeFilter);

  const renderItem = useCallback<ListRenderItem<Transaction>>(
    ({ item }) => <MemoTransactionCard tx={item} />,
    [],
  );

  const keyExtractor = useCallback((item: Transaction) => item.id, []);

  const ListHeader = (
    <YStack gap="$3" paddingHorizontal="$4" paddingTop="$3">
      {/* ── Search ── */}
      <SearchBar placeholder="Cari nomor order atau pelanggan..." />

      {/* ── Filters ── */}
      <XStack alignItems="center" gap="$2">
        <XStack flex={1} gap="$2">
          {FILTERS.map((f) => (
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
        backgroundColor={ColorPrimary.primary600}
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
            {
              label: "Void",
              value: "1",
              valueColor: ColorDanger.danger400,
            },
          ]}
        />
      </XStack>

      {/* ── Date Label ── */}
      <TextBodySm color="$colorSecondary" textAlign="center">
        Hari Ini — Senin, 24 Mar 2025
      </TextBodySm>
    </YStack>
  );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: ColorBase.bgScreen }}
    >
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

      <FlatList
        data={filtered}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24, gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
      />
    </SafeAreaView>
  );
}
