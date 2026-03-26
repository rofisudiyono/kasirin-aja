import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { YStack } from "tamagui";

import { TextBody, TextBodySm, TextH3 } from "@/components";
import { categoryFilters } from "@/features/catalog/api/category.data";
import {
  ColorBase,
  ColorDanger,
  ColorNeutral,
  ColorPrimary,
  ColorSuccess,
} from "@/themes/Colors";
import type { CategoryFilter, Product } from "@/types";

interface InventoriSidebarProps {
  allProducts: Product[];
  totalProducts: number;
  emptyCount: number;
  categoryCount: number;
  categoryFilter: CategoryFilter;
  onCategoryChange: (c: CategoryFilter) => void;
}

/**
 * Sidebar kategori + stats untuk tampilan tablet di halaman Inventori.
 */
export function InventoriSidebar({
  allProducts,
  totalProducts,
  emptyCount,
  categoryCount,
  categoryFilter,
  onCategoryChange,
}: InventoriSidebarProps) {
  return (
    <View style={styles.sidebar}>
      {/* Stats summary */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <TextBodySm color="$colorSecondary">Total Produk</TextBodySm>
          <TextH3 fontWeight="700" color="$primary">
            {totalProducts}
          </TextH3>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <TextBodySm color="$colorSecondary">Stok Habis</TextBodySm>
          <TextH3 fontWeight="700" color={ColorDanger.danger600}>
            {emptyCount}
          </TextH3>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <TextBodySm color="$colorSecondary">Kategori</TextBodySm>
          <TextH3 fontWeight="700" color={ColorSuccess.success600}>
            {categoryCount}
          </TextH3>
        </View>
      </View>

      <TextBodySm
        fontWeight="700"
        color="$colorSecondary"
        letterSpacing={0.8}
        paddingBottom={6}
        paddingTop={4}
      >
        KATEGORI
      </TextBodySm>

      <YStack gap={2}>
        {categoryFilters.map((c) => {
          const isActive = categoryFilter === c;
          const count =
            c === "Semua"
              ? totalProducts
              : allProducts.filter((p) => p.category === c).length;
          return (
            <TouchableOpacity
              key={c}
              activeOpacity={0.7}
              style={[
                styles.categoryItem,
                isActive && styles.categoryItemActive,
              ]}
              onPress={() => onCategoryChange(c)}
            >
              <TextBody
                fontWeight={isActive ? "700" : "400"}
                color={isActive ? "$primary" : "$colorSecondary"}
                flex={1}
              >
                {c}
              </TextBody>
              <View
                style={[
                  styles.categoryCount,
                  isActive && styles.categoryCountActive,
                ]}
              >
                <TextBodySm
                  fontWeight="600"
                  color={
                    isActive ? ColorPrimary.primary600 : ColorNeutral.neutral500
                  }
                >
                  {count}
                </TextBodySm>
              </View>
            </TouchableOpacity>
          );
        })}
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: ColorBase.white,
    borderRightWidth: 1,
    borderRightColor: ColorNeutral.neutral100,
  },
  statsCard: {
    backgroundColor: ColorNeutral.neutral50,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: ColorNeutral.neutral100,
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
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
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
});
