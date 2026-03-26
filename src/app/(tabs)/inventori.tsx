import { router } from "expo-router";
import { useAtomValue } from "jotai";
import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton, PageHeader } from "@/components";
import { products as mockProducts } from "@/features/inventory/api/inventory.data";
import { InventoriFAB } from "@/features/inventory/components/InventoriFAB";
import { InventoriListHeader } from "@/features/inventory/components/InventoriListHeader";
import { MemoProductRow } from "@/features/inventory/components/ProductRow";
import { userProductsAtom } from "@/features/inventory/store/inventory.store";
import { ColorBase } from "@/themes/Colors";
import type { CategoryFilter, Product, SortOption } from "@/types";

export default function InventoriPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Semua");
  const [sortOption, setSortOption] = useState<SortOption>("Nama A-Z");
  const [searchQuery, setSearchQuery] = useState("");
  const userProducts = useAtomValue(userProductsAtom);

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
      {/* ── Header ── */}
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

      {/* ── FAB ── */}
      <InventoriFAB />
    </SafeAreaView>
  );
}
