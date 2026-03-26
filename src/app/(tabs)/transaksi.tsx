import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  AppButton,
  FilterChip,
  IconButton,
  PageHeader,
  SearchBar,
  ShadowCard,
  TextBody,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH3,
} from "@/components";
import { StatsRow } from "@/features/shift/components/StatsRow";
import { transactionListMock } from "@/features/transactions/api/transactions.data";
import { StatusBadge } from "@/features/transactions/components/StatusBadge";
import { transactionsAtom } from "@/features/transactions/store/transaction.store";
import {
  ColorBase,
  ColorDanger,
  ColorNeutral,
  ColorPrimary,
} from "@/themes/Colors";
import type { FilterTab, Transaction } from "@/types";

const FILTERS: FilterTab[] = ["Semua", "Lunas", "Void", "Refund"];

function TransactionCard({
  tx,
  onPress,
}: {
  tx: Transaction;
  onPress: (tx: Transaction) => void;
}) {
  return (
    <TouchableOpacity onPress={() => onPress(tx)}>
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
          {tx.table ? (
            <XStack alignItems="center" gap={4}>
              <Ionicons
                name="person-outline"
                size={13}
                color={ColorNeutral.neutral400}
              />
              <TextBodySm color="$colorSecondary">{tx.table}</TextBodySm>
            </XStack>
          ) : null}
        </XStack>
        {tx.items ? (
          <TextBodySm
            color="$colorSecondary"
            fontStyle="italic"
            numberOfLines={1}
          >
            {tx.items}
          </TextBodySm>
        ) : null}
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

function VoidRefundModal({
  tx,
  visible,
  onClose,
  onVoid,
  onRefund,
}: {
  tx: Transaction | null;
  visible: boolean;
  onClose: () => void;
  onVoid: (id: string) => void;
  onRefund: (id: string) => void;
}) {
  if (!tx) return null;
  const canVoid = tx.status === "Lunas";
  const canRefund = tx.status === "Lunas";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.bottomSheet}>
          <View style={styles.handle} />
          <YStack gap={12} padding={20}>
            <TextH3 fontWeight="700">Detail Transaksi</TextH3>

            {/* Transaction info */}
            <ShadowCard padding="$3" gap="$2">
              <XStack justifyContent="space-between">
                <TextBodySm color="$colorSecondary">No. Order</TextBodySm>
                <TextBodyLg fontWeight="700" color="$primary">
                  {tx.id}
                </TextBodyLg>
              </XStack>
              <XStack justifyContent="space-between">
                <TextBodySm color="$colorSecondary">Waktu</TextBodySm>
                <TextBodySm fontWeight="600">{tx.time}</TextBodySm>
              </XStack>
              {tx.table ? (
                <XStack justifyContent="space-between">
                  <TextBodySm color="$colorSecondary">Pelanggan</TextBodySm>
                  <TextBodySm fontWeight="600">{tx.table}</TextBodySm>
                </XStack>
              ) : null}
              {tx.items ? (
                <XStack justifyContent="space-between" gap={8}>
                  <TextBodySm color="$colorSecondary">Item</TextBodySm>
                  <TextBodySm
                    fontWeight="600"
                    flex={1}
                    textAlign="right"
                    numberOfLines={2}
                  >
                    {tx.items}
                  </TextBodySm>
                </XStack>
              ) : null}
              <XStack justifyContent="space-between">
                <TextBodySm color="$colorSecondary">Total</TextBodySm>
                <TextBodyLg fontWeight="700">{tx.amount}</TextBodyLg>
              </XStack>
              <XStack justifyContent="space-between">
                <TextBodySm color="$colorSecondary">Status</TextBodySm>
                <StatusBadge status={tx.status} />
              </XStack>
            </ShadowCard>

            {/* Actions */}
            {tx.status !== "Void" && tx.status !== "Refund" ? (
              <YStack gap={8}>
                <AppButton
                  variant="warning"
                  size="md"
                  fullWidth
                  title="Refund"
                  icon={
                    <Ionicons
                      name="return-up-back-outline"
                      size={16}
                      color={ColorBase.white}
                    />
                  }
                  onPress={() => {
                    onClose();
                    Alert.alert(
                      "Konfirmasi Refund",
                      `Refund transaksi ${tx.id} sebesar ${tx.amount}?`,
                      [
                        { text: "Batal", style: "cancel" },
                        {
                          text: "Refund",
                          onPress: () => onRefund(tx.id),
                        },
                      ],
                    );
                  }}
                />
                <AppButton
                  variant="danger"
                  size="md"
                  fullWidth
                  title="Void (Batalkan)"
                  icon={
                    <Ionicons
                      name="close-circle-outline"
                      size={16}
                      color={ColorBase.white}
                    />
                  }
                  onPress={() => {
                    onClose();
                    Alert.alert(
                      "Konfirmasi Void",
                      `Batalkan transaksi ${tx.id}? Tindakan ini tidak bisa dibatalkan.`,
                      [
                        { text: "Batal", style: "cancel" },
                        {
                          text: "Void",
                          style: "destructive",
                          onPress: () => onVoid(tx.id),
                        },
                      ],
                    );
                  }}
                />
              </YStack>
            ) : (
              <TextCaption color={ColorNeutral.neutral500} textAlign="center">
                Transaksi ini sudah di-{tx.status.toLowerCase()} dan tidak dapat
                diubah.
              </TextCaption>
            )}

            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <TextBody fontWeight="700" color={ColorNeutral.neutral600}>
                Tutup
              </TextBody>
            </TouchableOpacity>
          </YStack>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default function TransaksiPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("Semua");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [storedTxs, setStoredTxs] = useAtom(transactionsAtom);

  // Combine mock + real stored transactions
  const allTransactions: Transaction[] = [...storedTxs, ...transactionListMock];

  const filtered =
    activeFilter === "Semua"
      ? allTransactions
      : allTransactions.filter((t) => t.status === activeFilter);

  const totalPendapatan = allTransactions
    .filter((t) => t.status === "Lunas")
    .reduce((sum, t) => sum + Number(t.amount.replace(/[^0-9]/g, "")), 0);
  const totalVoid = allTransactions.filter((t) => t.status === "Void").length;

  function handleTxPress(tx: Transaction) {
    setSelectedTx(tx);
    setModalVisible(true);
  }

  function handleVoid(id: string) {
    setStoredTxs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Void" as const } : t)),
    );
  }

  function handleRefund(id: string) {
    setStoredTxs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Refund" as const } : t)),
    );
  }

  const renderItem = useCallback<ListRenderItem<Transaction>>(
    ({ item }) => <MemoTransactionCard tx={item} onPress={handleTxPress} />,
    [],
  );

  const keyExtractor = useCallback((item: Transaction) => item.id, []);

  const ListHeader = (
    <YStack gap="$3">
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
            { label: "Total Transaksi", value: String(allTransactions.length) },
            {
              label: "Pendapatan",
              value: `Rp ${totalPendapatan.toLocaleString("id-ID")}`,
              flex: 2,
              smallValue: true,
            },
            {
              label: "Void",
              value: String(totalVoid),
              valueColor: ColorDanger.danger400,
            },
          ]}
        />
      </XStack>

      {/* ── Date Label ── */}
      <TextBodySm color="$colorSecondary" textAlign="center">
        Hari Ini —{" "}
        {new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
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
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
          gap: 12,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
      />

      <VoidRefundModal
        tx={selectedTx}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onVoid={handleVoid}
        onRefund={handleRefund}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: ColorBase.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 32,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: ColorNeutral.neutral300,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  closeBtn: {
    alignItems: "center",
    paddingVertical: 10,
  },
});
