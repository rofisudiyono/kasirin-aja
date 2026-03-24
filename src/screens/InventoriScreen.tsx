import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Separator, Text, XStack, YStack } from "tamagui";

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
      <Text
        fontFamily="$body"
        fontSize={11}
        fontWeight="600"
        color={style.color}
      >
        {category}
      </Text>
    </YStack>
  );
}

function StockBadge({
  stockStatus,
  stock,
}: {
  stockStatus: StockStatus;
  stock: number;
}) {
  if (stockStatus === "empty") {
    return (
      <YStack
        backgroundColor="#FEE2E2"
        borderRadius={20}
        paddingHorizontal={8}
        paddingVertical={3}
      >
        <Text fontFamily="$body" fontSize={11} fontWeight="600" color="#DC2626">
          Habis
        </Text>
      </YStack>
    );
  }
  if (stockStatus === "low") {
    return (
      <YStack
        backgroundColor="#FEF3C7"
        borderRadius={20}
        paddingHorizontal={8}
        paddingVertical={3}
      >
        <Text fontFamily="$body" fontSize={11} fontWeight="600" color="#D97706">
          Tipis
        </Text>
      </YStack>
    );
  }
  if (stockStatus === "inactive") {
    return (
      <YStack
        backgroundColor="#F3F4F6"
        borderRadius={20}
        paddingHorizontal={8}
        paddingVertical={3}
      >
        <Text fontFamily="$body" fontSize={11} fontWeight="600" color="#6B7280">
          Nonaktif
        </Text>
      </YStack>
    );
  }
  return null;
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <YStack
        backgroundColor={active ? "$primary" : "$background"}
        borderRadius={20}
        paddingHorizontal={14}
        paddingVertical={8}
        borderWidth={1}
        borderColor={active ? "$primary" : "$borderColor"}
      >
        <Text
          fontFamily="$body"
          fontSize="$sm"
          fontWeight="600"
          color={active ? "white" : "$colorSecondary"}
        >
          {label}
        </Text>
      </YStack>
    </TouchableOpacity>
  );
}

export default function InventoriScreen() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Semua");
  const [sortOption, setSortOption] = useState<SortOption>("Nama A-Z");

  const filtered =
    categoryFilter === "Semua"
      ? products
      : products.filter((p) => p.category === categoryFilter);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFF" }}>
      {/* ── Header ── */}
      <XStack
        paddingHorizontal="$4"
        paddingTop="$3"
        paddingBottom="$3"
        alignItems="center"
        gap="$3"
      >
        <TouchableOpacity>
          <YStack
            width={36}
            height={36}
            borderRadius={18}
            backgroundColor="$backgroundSecondary"
            alignItems="center"
            justifyContent="center"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </YStack>
        </TouchableOpacity>
        <Text
          fontFamily="$body"
          fontSize="$lg"
          fontWeight="700"
          color="$color"
          flex={1}
        >
          Produk
        </Text>
        <TouchableOpacity>
          <YStack
            width={36}
            height={36}
            borderRadius={18}
            backgroundColor="$backgroundSecondary"
            alignItems="center"
            justifyContent="center"
          >
            <Ionicons name="search-outline" size={20} color="#374151" />
          </YStack>
        </TouchableOpacity>
        <TouchableOpacity>
          <XStack
            backgroundColor="$primary"
            borderRadius={10}
            paddingHorizontal={14}
            paddingVertical={8}
            alignItems="center"
            gap={4}
          >
            <Text
              fontFamily="$body"
              fontSize="$sm"
              fontWeight="700"
              color="white"
            >
              + Tambah
            </Text>
          </XStack>
        </TouchableOpacity>
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$3" paddingHorizontal="$4" paddingBottom="$6">
          {/* ── Search ── */}
          <XStack
            backgroundColor="$background"
            borderRadius={12}
            height={44}
            alignItems="center"
            paddingHorizontal="$3"
            gap="$2"
            borderWidth={1}
            borderColor="$borderColor"
          >
            <Ionicons name="search-outline" size={16} color="#9CA3AF" />
            <Text
              fontFamily="$body"
              fontSize="$md"
              color="$colorTertiary"
              flex={1}
            >
              Cari nama, SKU, atau barcode...
            </Text>
            <Ionicons name="options-outline" size={16} color="#374151" />
          </XStack>

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
                />
              ))}
            </XStack>
          </ScrollView>

          {/* ── Sort Options ── */}
          <XStack alignItems="center" gap="$2">
            <Text fontFamily="$body" fontSize="$sm" color="$colorSecondary">
              Urutkan:
            </Text>
            {(["Nama A-Z", "Stok", "Terbaru"] as SortOption[]).map((s) => (
              <TouchableOpacity key={s} onPress={() => setSortOption(s)}>
                <YStack
                  backgroundColor={
                    sortOption === s ? "$primary" : "$background"
                  }
                  borderRadius={20}
                  paddingHorizontal={12}
                  paddingVertical={6}
                  borderWidth={1}
                  borderColor={sortOption === s ? "$primary" : "$borderColor"}
                >
                  <Text
                    fontFamily="$body"
                    fontSize={12}
                    fontWeight="600"
                    color={sortOption === s ? "white" : "$colorSecondary"}
                  >
                    {s}
                  </Text>
                </YStack>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={{ marginLeft: "auto" }}>
              <Ionicons name="list-outline" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </XStack>

          {/* ── Summary ── */}
          <XStack
            backgroundColor="$background"
            borderRadius={12}
            paddingVertical="$3"
            shadowColor="#94A3B8"
            shadowOpacity={0.18}
            shadowRadius={8}
            elevation={2}
          >
            <YStack flex={1} alignItems="center" gap={2}>
              <Text fontFamily="$body" fontSize="$sm" color="$colorSecondary">
                Total Produk
              </Text>
              <Text
                fontFamily="$body"
                fontSize="$xl"
                fontWeight="700"
                color="$primary"
              >
                48
              </Text>
            </YStack>
            <YStack width={1} backgroundColor="$borderColor" />
            <YStack flex={1} alignItems="center" gap={2}>
              <Text fontFamily="$body" fontSize="$sm" color="$colorSecondary">
                Stok Habis
              </Text>
              <Text
                fontFamily="$body"
                fontSize="$xl"
                fontWeight="700"
                color="$danger"
              >
                3
              </Text>
            </YStack>
            <YStack width={1} backgroundColor="$borderColor" />
            <YStack flex={1} alignItems="center" gap={2}>
              <Text fontFamily="$body" fontSize="$sm" color="$colorSecondary">
                Kategori
              </Text>
              <Text
                fontFamily="$body"
                fontSize="$xl"
                fontWeight="700"
                color="$success"
              >
                5
              </Text>
            </YStack>
          </XStack>

          {/* ── Product List ── */}
          <YStack
            backgroundColor="$background"
            borderRadius={14}
            shadowColor="#94A3B8"
            shadowOpacity={0.18}
            shadowRadius={8}
            elevation={2}
            overflow="hidden"
          >
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
                  {/* Product image placeholder */}
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
                      name={
                        product.category === "Makanan"
                          ? "restaurant-outline"
                          : product.category === "Minuman"
                            ? "water-outline"
                            : "pizza-outline"
                      }
                      size={26}
                      color="#9CA3AF"
                    />
                  </YStack>
                  {/* Product info */}
                  <YStack flex={1} gap={4}>
                    <XStack alignItems="center" gap="$2">
                      <Text
                        fontFamily="$body"
                        fontSize="$md"
                        fontWeight="700"
                        color="$color"
                      >
                        {product.name}
                      </Text>
                      {product.hasVariant && (
                        <YStack
                          backgroundColor="#DBEAFE"
                          borderRadius={20}
                          paddingHorizontal={8}
                          paddingVertical={2}
                        >
                          <Text
                            fontFamily="$body"
                            fontSize={10}
                            fontWeight="600"
                            color="#2563EB"
                          >
                            Variant
                          </Text>
                        </YStack>
                      )}
                    </XStack>
                    <CategoryBadge category={product.category} />
                    <Text
                      fontFamily="$body"
                      fontSize={11}
                      color="$colorTertiary"
                    >
                      SKU: {product.sku}
                    </Text>
                    <Text
                      fontFamily="$body"
                      fontSize="$sm"
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
                    </Text>
                  </YStack>

                  {/* Stock info */}
                  <YStack alignItems="flex-end" gap="$1">
                    {product.stockStatus !== "inactive" &&
                      product.stockStatus !== "empty" && (
                        <Text
                          fontFamily="$body"
                          fontSize="$sm"
                          fontWeight="700"
                          color={
                            product.stockStatus === "low"
                              ? "#D97706"
                              : "#16A34A"
                          }
                        >
                          Stok: {product.stock}
                        </Text>
                      )}
                    {product.stockStatus === "empty" && (
                      <Text
                        fontFamily="$body"
                        fontSize="$sm"
                        fontWeight="700"
                        color="#DC2626"
                      >
                        Stok: 0
                      </Text>
                    )}
                    <StockBadge
                      stockStatus={product.stockStatus}
                      stock={product.stock}
                    />
                    {product.isNew && (
                      <YStack
                        backgroundColor="#FEF9C3"
                        borderRadius={6}
                        paddingHorizontal={6}
                        paddingVertical={2}
                        marginTop={2}
                      >
                        <Text
                          fontFamily="$body"
                          fontSize={10}
                          fontWeight="700"
                          color="#CA8A04"
                        >
                          Produk Baru
                        </Text>
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
          </YStack>
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
          <Text fontSize={28} color="white" fontWeight="300">
            +
          </Text>
        </YStack>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
