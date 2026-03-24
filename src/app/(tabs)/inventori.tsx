import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Separator, XStack, YStack } from "tamagui";

import {
  AppButton,
  FilterChip,
  IconButton,
  PageHeader,
  SearchBar,
  ShadowCard,
  StatsRow,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextMicro,
} from "@/components";

type StockStatus = "normal" | "low" | "empty" | "inactive";
type CategoryFilter = "Semua" | "Makanan" | "Minuman" | "Snack";
type SortOption = "Nama A-Z" | "Stok" | "Terbaru";

interface Product {
  id: string;
  name: string;
  category: "Makanan" | "Minuman" | "Snack";
  sku: string;
  price: string;
  stock: number;
  stockStatus: StockStatus;
  hasVariant?: boolean;
  isNew?: boolean;
}

const products: Product[] = [
  {
    id: "1",
    name: "Kopi Susu",
    category: "Minuman",
    sku: "KPS-001",
    price: "Rp 15.000 - Rp 25....",
    stock: 85,
    stockStatus: "normal",
    hasVariant: true,
  },
  {
    id: "2",
    name: "Nasi Goreng",
    category: "Makanan",
    sku: "NSG-009",
    price: "Rp 25.000",
    stock: 4,
    stockStatus: "low",
  },
  {
    id: "3",
    name: "Es Teh Manis",
    category: "Minuman",
    sku: "ETM-014",
    price: "Rp 8.000",
    stock: 0,
    stockStatus: "empty",
  },
  {
    id: "4",
    name: "Kentang Goreng",
    category: "Snack",
    sku: "KTG-022",
    price: "Rp 12.000",
    stock: 30,
    stockStatus: "normal",
  },
  {
    id: "5",
    name: "Ayam Bakar",
    category: "Makanan",
    sku: "AYB-030",
    price: "Rp 28.000",
    stock: 0,
    stockStatus: "inactive",
    isNew: true,
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; color: string }> = {
  Makanan: { bg: "#FFEDD5", color: "#EA580C" },
  Minuman: { bg: "#DCFCE7", color: "#16A34A" },
  Snack: { bg: "#FEF3C7", color: "#D97706" },
};

const CATEGORY_ICONS: Record<
  string,
  React.ComponentProps<typeof Ionicons>["name"]
> = {
  Makanan: "restaurant-outline",
  Minuman: "water-outline",
  Snack: "pizza-outline",
};

const STOCK_BADGE: Record<
  string,
  { bg: string; color: string; label: string } | null
> = {
  empty: { bg: "#FEE2E2", color: "#DC2626", label: "Habis" },
  low: { bg: "#FEF3C7", color: "#D97706", label: "Tipis" },
  inactive: { bg: "#F3F4F6", color: "#6B7280", label: "Nonaktif" },
  normal: null,
};

function CategoryBadge({ category }: { category: string }) {
  const style = CATEGORY_COLORS[category] ?? {
    bg: "#F3F4F6",
    color: "#6B7280",
  };
  return (
    <YStack
      backgroundColor={style.bg}
      borderRadius={20}
      paddingHorizontal={8}
      paddingVertical={3}
    >
      <TextCaption fontWeight="600" color={style.color}>
        {category}
      </TextCaption>
    </YStack>
  );
}

function StockBadge({ stockStatus }: { stockStatus: StockStatus }) {
  const badge = STOCK_BADGE[stockStatus];
  if (!badge) return null;
  return (
    <YStack
      backgroundColor={badge.bg}
      borderRadius={20}
      paddingHorizontal={8}
      paddingVertical={3}
    >
      <TextCaption fontWeight="600" color={badge.color}>
        {badge.label}
      </TextCaption>
    </YStack>
  );
}

export default function InventoriPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Semua");
  const [sortOption, setSortOption] = useState<SortOption>("Nama A-Z");

  const filtered =
    categoryFilter === "Semua"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFF" }}>
      {/* ── Header ── */}
      <PageHeader
        title="Produk"
        showBack
        actions={
          <>
            <IconButton iconName="search-outline" />
            <AppButton variant="primary" size="sm">
              + Tambah
            </AppButton>
          </>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$3" paddingHorizontal="$4" paddingBottom="$6">
          {/* ── Search ── */}
          <SearchBar
            placeholder="Cari nama, SKU, atau barcode..."
            showFilterIcon
          />

          {/* ── Category Filters ── */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap="$2">
              {(
                ["Semua", "Makanan", "Minuman", "Snack"] as CategoryFilter[]
              ).map((c) => (
                <FilterChip
                  key={c}
                  label={c}
                  active={categoryFilter === c}
                  onPress={() => setCategoryFilter(c)}
                  paddingH={14}
                />
              ))}
            </XStack>
          </ScrollView>

          {/* ── Sort Options ── */}
          <XStack alignItems="center" gap="$2">
            <TextBodySm color="$colorSecondary">Urutkan:</TextBodySm>
            {(["Nama A-Z", "Stok", "Terbaru"] as SortOption[]).map((s) => (
              <FilterChip
                key={s}
                label={s}
                active={sortOption === s}
                onPress={() => setSortOption(s)}
                paddingH={12}
              />
            ))}
            <TouchableOpacity style={{ marginLeft: "auto" }}>
              <Ionicons name="list-outline" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </XStack>

          {/* ── Summary ── */}
          <ShadowCard paddingVertical="$3">
            <StatsRow
              variant="light"
              items={[
                { label: "Total Produk", value: "48", valueColor: "$primary" },
                { label: "Stok Habis", value: "3", valueColor: "$danger" },
                { label: "Kategori", value: "5", valueColor: "$success" },
              ]}
            />
          </ShadowCard>

          {/* ── Product List ── */}
          <ShadowCard overflow="hidden">
            {filtered.map((product, idx) => (
              <React.Fragment key={product.id}>
                {idx > 0 && (
                  <Separator borderColor="$borderColor" marginHorizontal="$3" />
                )}
                <XStack
                  paddingHorizontal="$3"
                  paddingVertical="$3"
                  alignItems="center"
                  gap="$3"
                  backgroundColor={
                    product.stockStatus === "empty" ? "#FFF5F5" : "$background"
                  }
                >
                  <YStack
                    width={56}
                    height={56}
                    borderRadius={10}
                    backgroundColor="$backgroundSecondary"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                  >
                    <Ionicons
                      name={CATEGORY_ICONS[product.category] ?? "cube-outline"}
                      size={26}
                      color="#9CA3AF"
                    />
                  </YStack>
                  <YStack flex={1} gap={4}>
                    <XStack alignItems="center" gap="$2">
                      <TextBodyLg fontWeight="700">{product.name}</TextBodyLg>
                      {product.hasVariant && (
                        <YStack
                          backgroundColor="#DBEAFE"
                          borderRadius={20}
                          paddingHorizontal={8}
                          paddingVertical={2}
                        >
                          <TextMicro fontWeight="600" color="#2563EB">
                            Variant
                          </TextMicro>
                        </YStack>
                      )}
                    </XStack>
                    <CategoryBadge category={product.category} />
                    <TextCaption color="$colorTertiary">
                      SKU: {product.sku}
                    </TextCaption>
                    <TextBodySm
                      fontWeight="700"
                      color={
                        product.stockStatus === "empty"
                          ? "$colorTertiary"
                          : "$primary"
                      }
                      textDecorationLine={
                        product.stockStatus === "empty"
                          ? "line-through"
                          : "none"
                      }
                    >
                      {product.price}
                    </TextBodySm>
                  </YStack>
                  <YStack alignItems="flex-end" gap="$1">
                    {product.stockStatus !== "inactive" &&
                      product.stockStatus !== "empty" && (
                        <TextBodySm
                          fontWeight="700"
                          color={
                            product.stockStatus === "low"
                              ? "#D97706"
                              : "#16A34A"
                          }
                        >
                          Stok: {product.stock}
                        </TextBodySm>
                      )}
                    {product.stockStatus === "empty" && (
                      <TextBodySm fontWeight="700" color="#DC2626">
                        Stok: 0
                      </TextBodySm>
                    )}
                    <StockBadge stockStatus={product.stockStatus} />
                    {product.isNew && (
                      <YStack
                        backgroundColor="#FEF9C3"
                        borderRadius={6}
                        paddingHorizontal={6}
                        paddingVertical={2}
                        marginTop={2}
                      >
                        <TextMicro fontWeight="700" color="#CA8A04">
                          Produk Baru
                        </TextMicro>
                      </YStack>
                    )}
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color="#9CA3AF"
                    />
                  </YStack>
                </XStack>
              </React.Fragment>
            ))}
          </ShadowCard>
        </YStack>
      </ScrollView>

      {/* ── FAB ── */}
      <TouchableOpacity style={{ position: "absolute", bottom: 24, right: 24 }}>
        <YStack
          width={56}
          height={56}
          borderRadius={28}
          backgroundColor="$primary"
          alignItems="center"
          justifyContent="center"
          shadowColor="$primary"
          shadowOpacity={0.4}
          shadowRadius={12}
          elevation={8}
        >
          <TextBodyLg color="white" fontWeight="300" fontSize={28}>
            +
          </TextBodyLg>
        </YStack>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
