import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import {
  AppButton,
  PageHeader,
  TextBodyLg,
  TextBodySm,
  TextCaption,
} from "@/components";
import { categoryFilters } from "@/features/catalog/api/category.data";
import { products as mockProducts } from "@/features/inventory/api/inventory.data";
import { InventoriFAB } from "@/features/inventory/components/InventoriFAB";
import { InventoriListHeader } from "@/features/inventory/components/InventoriListHeader";
import { MemoProductRow } from "@/features/inventory/components/ProductRow";
import { userProductsAtom } from "@/features/inventory/store/inventory.store";
import { useDeviceLayout } from "@/hooks/useDeviceLayout";
import {
  ColorBase,
  ColorDanger,
  ColorNeutral,
  ColorPrimary,
  ColorSuccess,
} from "@/themes/Colors";
import type { CategoryFilter, Product, SortOption } from "@/types";

export default function InventoriPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Semua");
  const [sortOption, setSortOption] = useState<SortOption>("Nama A-Z");
  const [searchQuery, setSearchQuery] = useState("");
  const userProducts = useAtomValue(userProductsAtom);
  const { isTablet } = useDeviceLayout();

  const allProducts = [...userProducts, ...mockProducts];

  const filtered = allProducts.filter((p) => {
    const matchCategory =
      categoryFilter === "Semua" || p.category === categoryFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  const renderItem = useCallback<ListRenderItem<Product>>(
    ({ item, index }) => (
      <MemoProductRow product={item} isFirst={index === 0} />
    ),
    [],
  );

  const renderCardItem = useCallback<ListRenderItem<Product>>(
    ({ item }) => <MemoProductRow product={item} isFirst={false} isCard />,
    [],
  );

  const keyExtractor = useCallback((item: Product) => item.id, []);

  // ── Tablet: sidebar + grid split ──────────────────────────────────────────
  if (isTablet) {
    const emptyCount = allProducts.filter(
      (p) => p.stockStatus === "empty",
    ).length;
    const categoryCount = new Set(allProducts.map((p) => p.category)).size;

    const TabletListHeader = (
      <InventoriListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        sortOption={sortOption}
        onSortChange={setSortOption}
        totalProducts={allProducts.length}
        emptyCount={emptyCount}
        categoryCount={categoryCount}
        filteredCount={filtered.length}
        hideCategories
      />
    );

    return (
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: ColorBase.bgScreen }}
      >
        <PageHeader title="Produk" />
        <View style={styles.tabletLayout}>
          {/* Left sidebar: stats + category filters */}
          <View style={styles.categorySidebar}>
            {/* Stats summary */}
            <View style={styles.sidebarStatsCard}>
              <View style={styles.statItem}>
                <TextCaption color="$colorSecondary">Total Produk</TextCaption>
                <TextBodyLg fontWeight="700" color="$primary">
                  {allProducts.length}
                </TextBodyLg>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <TextCaption color="$colorSecondary">Stok Habis</TextCaption>
                <TextBodyLg fontWeight="700" color={ColorDanger.danger600}>
                  {emptyCount}
                </TextBodyLg>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <TextCaption color="$colorSecondary">Kategori</TextCaption>
                <TextBodyLg fontWeight="700" color={ColorSuccess.success600}>
                  {categoryCount}
                </TextBodyLg>
              </View>
            </View>

            {/* Category label */}
            <TextCaption
              fontWeight="700"
              color="$colorSecondary"
              letterSpacing={0.8}
              paddingBottom={6}
              paddingTop={4}
            >
              KATEGORI
            </TextCaption>

            <YStack gap={2}>
              {categoryFilters.map((c) => {
                const isActive = categoryFilter === c;
                const count =
                  c === "Semua"
                    ? allProducts.length
                    : allProducts.filter((p) => p.category === c).length;
                return (
                  <TouchableOpacity
                    key={c}
                    activeOpacity={0.7}
                    style={[
                      styles.categoryItem,
                      isActive && styles.categoryItemActive,
                    ]}
                    onPress={() => setCategoryFilter(c)}
                  >
                    <TextBodySm
                      fontWeight={isActive ? "700" : "400"}
                      color={isActive ? "$primary" : "$colorSecondary"}
                      flex={1}
                    >
                      {c}
                    </TextBodySm>
                    <View
                      style={[
                        styles.categoryCount,
                        isActive && styles.categoryCountActive,
                      ]}
                    >
                      <TextCaption
                        fontWeight="600"
                        color={
                          isActive
                            ? ColorPrimary.primary600
                            : ColorNeutral.neutral500
                        }
                        fontSize={10}
                      >
                        {count}
                      </TextCaption>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </YStack>
          </View>

          {/* Right: product grid */}
          <View style={styles.productListArea}>
            <FlatList
              data={filtered}
              keyExtractor={keyExtractor}
              renderItem={renderCardItem}
              numColumns={2}
              columnWrapperStyle={styles.gridRow}
              ListHeaderComponent={TabletListHeader}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 32,
                paddingHorizontal: 12,
              }}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Ionicons
                    name="cube-outline"
                    size={40}
                    color={ColorNeutral.neutral300}
                  />
                  <TextBodySm color="$colorTertiary" marginTop={8}>
                    Tidak ada produk ditemukan
                  </TextBodySm>
                </View>
              }
            />
          </View>
        </View>
        <InventoriFAB />
      </SafeAreaView>
    );
  }

  // ── Phone layout ───────────────────────────────────────────────────────────
  const ListHeader = (
    <InventoriListHeader
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      categoryFilter={categoryFilter}
      onCategoryChange={setCategoryFilter}
      sortOption={sortOption}
      onSortChange={setSortOption}
      totalProducts={allProducts.length}
      emptyCount={allProducts.filter((p) => p.stockStatus === "empty").length}
      categoryCount={new Set(allProducts.map((p) => p.category)).size}
      filteredCount={filtered.length}
    />
  );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: ColorBase.bgScreen }}
    >
      <PageHeader
        title="Produk"
        onBack={() => router.back()}
        actions={
          <AppButton
            variant="primary"
            size="sm"
            onPress={() => router.push("/inventory/tambah-produk")}
          >
            + Tambah
          </AppButton>
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

      <InventoriFAB />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabletLayout: {
    flex: 1,
    flexDirection: "row",
  },
  categorySidebar: {
    width: 192,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: ColorBase.white,
    borderRightWidth: 1,
    borderRightColor: ColorNeutral.neutral100,
  },
  sidebarStatsCard: {
    backgroundColor: ColorNeutral.neutral50,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ColorNeutral.neutral100,
    flexDirection: "column",
    gap: 2,
  },
  statItem: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    gap: 2,
  },
  statDivider: {
    height: 1,
    backgroundColor: ColorNeutral.neutral100,
    marginVertical: 2,
  },
  productListArea: {
    flex: 1,
    backgroundColor: ColorBase.bgScreen,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 6,
  },
  categoryItemActive: {
    backgroundColor: ColorPrimary.primary50,
  },
  categoryCount: {
    backgroundColor: ColorNeutral.neutral100,
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: "center",
  },
  categoryCountActive: {
    backgroundColor: ColorPrimary.primary100,
  },
  gridRow: {
    gap: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    gap: 8,
  },
});
