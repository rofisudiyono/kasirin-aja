import React from "react";
import { Dimensions, ScrollView } from "react-native";
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

      <XStack flexWrap="wrap" gap={12}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            basePrice={product.basePrice}
            categoryIcon={CATEGORY_ICONS[product.category]}
            categoryIconBg={CATEGORY_COLORS[product.category].bg}
            categoryIconColor={CATEGORY_COLORS[product.category].color}
            stockStatus={product.stockStatus}
            width={CARD_WIDTH}
            onAdd={() => onAddProduct(product)}
          />
        ))}
      </XStack>
    </>
  );
}
