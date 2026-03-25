import React, { useCallback } from "react";
import { Dimensions, FlatList, ListRenderItem, ScrollView } from "react-native";
import { XStack } from "tamagui";

import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/config/categoryStyles";
import { categoryFilters } from "@/features/catalog/api/category.data";
import { ProductCard } from "@/features/catalog/components/ProductCard";
import { FilterChip } from "@/shared/components";
import type { CatalogProduct, CategoryFilter } from "@/shared/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 16 * 2 - 12) / 2;

type Props = {
  products: CatalogProduct[];
  categoryFilter: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onAddProduct: (product: CatalogProduct) => void;
};

export function ProductGrid({
  products,
  categoryFilter,
  onCategoryChange,
  onAddProduct,
}: Props) {
  const renderItem = useCallback<ListRenderItem<CatalogProduct>>(
    ({ item }) => (
      <ProductCard
        name={item.name}
        basePrice={item.basePrice}
        categoryIcon={CATEGORY_ICONS[item.category]}
        categoryIconBg={CATEGORY_COLORS[item.category].bg}
        categoryIconColor={CATEGORY_COLORS[item.category].color}
        stockStatus={item.stockStatus}
        width={CARD_WIDTH}
        onAdd={() => onAddProduct(item)}
      />
    ),
    [onAddProduct],
  );

  const keyExtractor = useCallback((item: CatalogProduct) => item.id, []);

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$2">
          {categoryFilters.map((c) => (
            <FilterChip
              key={c}
              label={c}
              active={categoryFilter === c}
              onPress={() => onCategoryChange(c)}
              paddingH={14}
            />
          ))}
        </XStack>
      </ScrollView>

      <FlatList
        data={products}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        scrollEnabled={false}
      />
    </>
  );
}
