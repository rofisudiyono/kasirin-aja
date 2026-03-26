import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { XStack, YStack } from "tamagui";

import { FilterChip, SearchBar, ShadowCard, TextBodySm } from "@/components";
import { categoryFilters } from "@/features/catalog/api/category.data";
import { inventorySortOptions } from "@/features/inventory/api/inventory.data";
import { StatsRow } from "@/features/shift/components/StatsRow";
import { ColorNeutral } from "@/themes/Colors";
import type { CategoryFilter, SortOption } from "@/types";

type Props = {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  categoryFilter: CategoryFilter;
  onCategoryChange: (c: CategoryFilter) => void;
  sortOption: SortOption;
  onSortChange: (s: SortOption) => void;
  totalProducts: number;
  emptyCount: number;
  categoryCount: number;
  filteredCount: number;
  hideCategories?: boolean;
};

export function InventoriListHeader({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  sortOption,
  onSortChange,
  totalProducts,
  emptyCount,
  categoryCount,
  filteredCount,
  hideCategories = false,
}: Props) {
  return (
    <YStack gap="$3">
      {/* ── Search ── */}
      <SearchBar
        placeholder="Cari nama, SKU, atau barcode..."
        showFilterIcon
        value={searchQuery}
        onChangeText={onSearchChange}
      />

      {/* ── Category Filters (hidden on tablet where sidebar handles it) ── */}
      {!hideCategories && (
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
      )}

      {/* ── Sort Options ── */}
      <XStack alignItems="center" gap="$2">
        <TextBodySm color="$colorSecondary">Urutkan:</TextBodySm>
        {inventorySortOptions.map((s) => (
          <FilterChip
            key={s}
            label={s}
            active={sortOption === s}
            onPress={() => onSortChange(s)}
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
              value: String(totalProducts),
              valueColor: "$primary",
            },
            {
              label: "Stok Habis",
              value: String(emptyCount),
              valueColor: "$danger",
            },
            {
              label: "Kategori",
              value: String(categoryCount),
              valueColor: "$success",
            },
          ]}
        />
      </ShadowCard>

      {/* ── List header ── */}
      <TextBodySm color="$colorSecondary">
        Menampilkan {filteredCount} produk
      </TextBodySm>
    </YStack>
  );
}
