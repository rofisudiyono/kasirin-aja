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

import { AppButton, PageHeader, TextBodySm, TextCaption } from "@/components";
import { categoryFilters } from "@/features/catalog/api/category.data";
import { products as mockProducts } from "@/features/inventory/api/inventory.data";
import { InventoriFAB } from "@/features/inventory/components/InventoriFAB";
import { InventoriListHeader } from "@/features/inventory/components/InventoriListHeader";
import { MemoProductRow } from "@/features/inventory/components/ProductRow";
import { userProductsAtom } from "@/features/inventory/store/inventory.store";
import { useDeviceLayout } from "@/hooks/useDeviceLayout";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/themes/Colors";
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

  const keyExtractor = useCallback((item: Product) => item.id, []);

  // ── Tablet: sidebar + list split ──────────────────────────────────────────
  if (isTablet) {
    const emptyCount = allProducts.filter((p) => p.stockStatus === "empty").length;
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
        <PageHeader
          title="Produk"
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

        <View style={styles.tabletLayout}>
          {/* Left sidebar: category filters */}
          <View style={styles.categorySidebar}>
            <TextCaption
              fontWeight="700"
              color="$colorSecondary"
              letterSpacing={0.8}
              paddingBottom={8}
            >
              KATEGORI
            </TextCaption>
            <YStack gap={4}>
              {categoryFilters.map((c) => {
                const isActive = categoryFilter === c;
                return (
                  <TouchableOpacity
                    key={c}
                    activeOpacity={0.7}
                    style={[styles.categoryItem, isActive && styles.categoryItemActive]}
                    onPress={() => setCategoryFilter(c)}
                  >
                    <TextBodySm
                      fontWeight={isActive ? "700" : "400"}
                      color={isActive ? "$primary" : "$colorSecondary"}
                    >
                      {c}
                    </TextBodySm>
                    {isActive && (
                      <Ionicons
                        name="chevron-forward"
                        size={14}
                        color={ColorPrimary.primary600}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </YStack>
          </View>

          {/* Divider */}
          <View style={styles.sidebarDivider} />

          {/* Right: product list */}
          <View style={styles.productListArea}>
            <FlatList
              data={filtered}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ListHeaderComponent={TabletListHeader}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 32 }}
              ListFooterComponent={<View style={{ height: 8 }} />}
              style={{ marginHorizontal: 16 }}
            />
          </View>
        </View>
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
    width: 160,
    paddingHorizontal: 12,
    paddingTop: 16,
    backgroundColor: ColorBase.white,
    borderRightWidth: 1,
    borderRightColor: ColorNeutral.neutral100,
  },
  sidebarDivider: {
    width: 1,
    backgroundColor: ColorNeutral.neutral200,
  },
  productListArea: {
    flex: 1,
    backgroundColor: ColorBase.bgScreen,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  categoryItemActive: {
    backgroundColor: ColorPrimary.primary50,
  },
});
