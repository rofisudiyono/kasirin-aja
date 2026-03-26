import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Separator, XStack, YStack } from "tamagui";

import {
  AppButton,
  FilterChip,
  IconButton,
  PageHeader,
  SearchBar,
  ShadowCard,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH1,
  TextMicro,
} from "@/components";
import { CATEGORY_ICONS } from "@/config/categoryStyles";
import { categoryFilters } from "@/features/catalog/api/category.data";
import { CategoryBadge } from "@/features/catalog/components/CategoryBadge";
import {
  inventorySortOptions,
  products as mockProducts,
} from "@/features/inventory/api/inventory.data";
import { StockBadge } from "@/features/inventory/components/StockBadge";
import { userProductsAtom } from "@/features/inventory/store/inventory.store";
import { StatsRow } from "@/features/shift/components/StatsRow";
import {
  ColorBase,
  ColorDanger,
  ColorGreen,
  ColorNeutral,
  ColorPrimary,
  ColorWarning,
  ColorYellow,
} from "@/themes/Colors";
import type { CategoryFilter, Product, SortOption } from "@/types";

const styles = StyleSheet.create({
  variantBadge: {
    backgroundColor: ColorPrimary.primary100,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  newBadge: {
    backgroundColor: ColorYellow.yellow100,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 2,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
});

function ProductRow({
  product,
  isFirst,
}: {
  product: Product;
  isFirst: boolean;
}) {
  return (
    <>
      {!isFirst && (
        <Separator borderColor="$borderColor" marginHorizontal="$3" />
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push(`/inventory/${product.id}`)}
      >
      <XStack
        paddingHorizontal="$3"
        paddingVertical="$3"
        alignItems="center"
        gap="$3"
        backgroundColor={
          product.stockStatus === "empty" ? ColorDanger.danger25 : "$background"
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
            color={ColorNeutral.neutral400}
          />
        </YStack>
        <YStack flex={1} gap={4}>
          <XStack alignItems="center" gap="$2">
            <TextBodyLg fontWeight="700">{product.name}</TextBodyLg>
            {product.hasVariant && (
              <View style={styles.variantBadge}>
                <TextMicro fontWeight="600" color={ColorPrimary.primary600}>
                  Variant
                </TextMicro>
              </View>
            )}
          </XStack>
          <CategoryBadge category={product.category} />
          <TextCaption color="$colorTertiary">SKU: {product.sku}</TextCaption>
          <TextBodySm
            fontWeight="700"
            color={
              product.stockStatus === "empty" ? "$colorTertiary" : "$primary"
            }
            textDecorationLine={
              product.stockStatus === "empty" ? "line-through" : "none"
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
                    ? ColorWarning.warning600
                    : ColorGreen.green600
                }
              >
                Stok: {product.stock}
              </TextBodySm>
            )}
          {product.stockStatus === "empty" && (
            <TextBodySm fontWeight="700" color={ColorDanger.danger600}>
              Stok: 0
            </TextBodySm>
          )}
          <StockBadge stockStatus={product.stockStatus} />
          {product.isNew && (
            <View style={styles.newBadge}>
              <TextMicro fontWeight="700" color={ColorYellow.yellow600}>
                Produk Baru
              </TextMicro>
            </View>
          )}
          <Ionicons
            name="chevron-forward"
            size={16}
            color={ColorNeutral.neutral400}
          />
        </YStack>
      </XStack>
      </TouchableOpacity>
    </>
  );
}

const MemoProductRow = React.memo(ProductRow);

export default function InventoriPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Semua");
  const [sortOption, setSortOption] = useState<SortOption>("Nama A-Z");
  const userProducts = useAtomValue(userProductsAtom);

  const allProducts = [...userProducts, ...mockProducts];

  const filtered =
    categoryFilter === "Semua"
      ? allProducts
      : allProducts.filter((p) => p.category === categoryFilter);

  const renderItem = useCallback<ListRenderItem<Product>>(
    ({ item, index }) => (
      <MemoProductRow product={item} isFirst={index === 0} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const ListHeader = (
    <YStack gap="$3">
      {/* ── Search ── */}
      <SearchBar placeholder="Cari nama, SKU, atau barcode..." showFilterIcon />

      {/* ── Category Filters ── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$2">
          {categoryFilters.map((c) => (
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
        {inventorySortOptions.map((s) => (
          <FilterChip
            key={s}
            label={s}
            active={sortOption === s}
            onPress={() => setSortOption(s)}
            paddingH={12}
          />
        ))}
        <TouchableOpacity style={{ marginLeft: "auto" }}>
          <Ionicons
            name="list-outline"
            size={18}
            color={ColorNeutral.neutral400}
          />
        </TouchableOpacity>
      </XStack>

      {/* ── Summary ── */}
      <ShadowCard paddingVertical="$3" marginHorizontal="$1">
        <StatsRow
          variant="light"
          items={[
            {
              label: "Total Produk",
              value: String(allProducts.length),
              valueColor: "$primary",
            },
            {
              label: "Stok Habis",
              value: String(
                allProducts.filter((p) => p.stockStatus === "empty").length,
              ),
              valueColor: "$danger",
            },
            {
              label: "Kategori",
              value: String(new Set(allProducts.map((p) => p.category)).size),
              valueColor: "$success",
            },
          ]}
        />
      </ShadowCard>

      {/* ── List header ── */}
      <TextBodySm color="$colorSecondary">
        Menampilkan {filtered.length} produk
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
        title="Produk"
        showBack
        actions={
          <>
            <IconButton iconName="search-outline" />
            <AppButton
              variant="primary"
              size="sm"
              onPress={() => router.push("/inventory/tambah-produk")}
            >
              + Tambah
            </AppButton>
          </>
        }
      />

      <FlatList
        data={filtered}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 96 }}
        ListFooterComponent={<View style={{ height: 8 }} />}
        style={{ marginHorizontal: 16 }}
      />

      {/* ── FAB ── */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
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
          <TextH1 color={ColorBase.white} fontWeight="300" fontSize={20}>
            +
          </TextH1>
        </YStack>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
