import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Separator, XStack, YStack } from "tamagui";

import { TextBodyLg, TextBodySm, TextH3, TextMicro } from "@/components";
import { CATEGORY_ICONS } from "@/config/categoryStyles";
import { CategoryBadge } from "@/features/catalog/components/CategoryBadge";
import { StockBadge } from "@/features/inventory/components/StockBadge";
import tw from "@/lib/tw";
import {
  ColorBase,
  ColorDanger,
  ColorGreen,
  ColorNeutral,
  ColorPrimary,
  ColorWarning,
  ColorYellow,
} from "@/themes/Colors";
import type { Product } from "@/types";

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
  },
  // Card variant (tablet grid)
  cardWrapper: {
    flex: 1,
    margin: 4,
  },
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    shadowColor: ColorNeutral.neutralShadow,
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 1,
  },
  cardIcon: {
    width: 72,
    height: 72,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  cardMeta: {
    flex: 1,
    gap: 4,
  },
  cardBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  normalBadge: {
    backgroundColor: ColorGreen.green100,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  cardDivider: {
    borderTopWidth: 1,
    borderTopColor: ColorNeutral.neutral100,
    marginBottom: 10,
  },
  cardStatsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  cardStatItem: {
    flex: 1,
    gap: 2,
  },
  manageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: ColorPrimary.primary100,
    borderRadius: 8,
    paddingVertical: 9,
  },
});

// ── Card variant for tablet 2-column grid ─────────────────────────────────────
function ProductCardGrid({ product }: { product: Product }) {
  const isEmpty = product.stockStatus === "empty";
  const isInactive = product.stockStatus === "inactive";
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.cardWrapper}
      onPress={() => router.push(`/inventory/${product.id}`)}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: isEmpty ? ColorDanger.danger25 : ColorBase.white,
            borderColor: isEmpty
              ? ColorDanger.danger200
              : ColorNeutral.neutral200,
          },
        ]}
      >
        {/* Top row: icon + meta */}
        <View style={styles.cardTopRow}>
          {/* Icon */}
          <View
            style={[
              styles.cardIcon,
              {
                backgroundColor: isEmpty
                  ? ColorDanger.danger100
                  : ColorNeutral.neutral100,
              },
            ]}
          >
            <Ionicons
              name={CATEGORY_ICONS[product.category] ?? "cube-outline"}
              size={30}
              color={isEmpty ? ColorDanger.danger600 : ColorNeutral.neutral500}
            />
          </View>

          {/* Meta */}
          <View style={styles.cardMeta}>
            {/* Status badge + SKU */}
            <View style={styles.cardBadgeRow}>
              {product.stockStatus === "normal" ? (
                <View style={styles.normalBadge}>
                  <TextBodySm fontWeight="600" color={ColorGreen.green600}>
                    Tersedia
                  </TextBodySm>
                </View>
              ) : (
                <StockBadge stockStatus={product.stockStatus} />
              )}
              <TextBodySm color={ColorNeutral.neutral400}>
                SKU-{product.sku}
              </TextBodySm>
              {product.hasVariant && (
                <View style={styles.variantBadge}>
                  <TextMicro fontWeight="600" color={ColorPrimary.primary600}>
                    Var
                  </TextMicro>
                </View>
              )}
              {product.isNew && (
                <View style={styles.newBadge}>
                  <TextMicro fontWeight="700" color={ColorYellow.yellow600}>
                    Baru
                  </TextMicro>
                </View>
              )}
            </View>

            {/* Name */}
            <TextH3 fontWeight="700" numberOfLines={2}>
              {product.name}
            </TextH3>

            {/* Category */}
            <View style={tw`flex-row`}>
              <CategoryBadge category={product.category} />
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.cardDivider} />

        {/* Stats: quantity + price */}
        <View style={styles.cardStatsRow}>
          <View style={styles.cardStatItem}>
            <TextBodySm
              color={ColorNeutral.neutral500}
              fontWeight="600"
              style={{
                textTransform: "uppercase",
                fontSize: 10,
                letterSpacing: 0.5,
              }}
            >
              Kuantitas
            </TextBodySm>
            <TextBodyLg
              fontWeight="700"
              color={
                isEmpty
                  ? ColorDanger.danger600
                  : product.stockStatus === "low"
                    ? ColorWarning.warning600
                    : isInactive
                      ? ColorNeutral.neutral400
                      : ColorGreen.green600
              }
            >
              {isInactive ? "—" : `${product.stock} unit`}
            </TextBodyLg>
          </View>
          <View style={styles.cardStatItem}>
            <TextBodySm
              color={ColorNeutral.neutral500}
              fontWeight="600"
              style={{
                textTransform: "uppercase",
                fontSize: 10,
                letterSpacing: 0.5,
              }}
            >
              Harga Satuan
            </TextBodySm>
            <TextBodyLg
              fontWeight="700"
              color={
                isEmpty || isInactive ? ColorNeutral.neutral400 : "$primary"
              }
              textDecorationLine={isEmpty ? "line-through" : "none"}
              numberOfLines={2}
            >
              {product.price}
            </TextBodyLg>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ── List row variant (phone / default) ────────────────────────────────────────
function ProductRow({
  product,
  isFirst,
  isCard = false,
}: {
  product: Product;
  isFirst: boolean;
  isCard?: boolean;
}) {
  if (isCard) return <ProductCardGrid product={product} />;

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
            product.stockStatus === "empty"
              ? ColorDanger.danger25
              : "$background"
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
              <TextH3 fontWeight="700">{product.name}</TextH3>
              {product.hasVariant && (
                <View style={styles.variantBadge}>
                  <TextMicro fontWeight="600" color={ColorPrimary.primary600}>
                    Variant
                  </TextMicro>
                </View>
              )}
            </XStack>
            <CategoryBadge category={product.category} />
            <TextBodySm color="$colorTertiary">SKU: {product.sku}</TextBodySm>
            <TextBodyLg
              fontWeight="700"
              color={
                product.stockStatus === "empty" ? "$colorTertiary" : "$primary"
              }
              textDecorationLine={
                product.stockStatus === "empty" ? "line-through" : "none"
              }
            >
              {product.price}
            </TextBodyLg>
          </YStack>
          <YStack alignItems="flex-end" gap="$1">
            {product.stockStatus !== "inactive" &&
              product.stockStatus !== "empty" && (
                <TextBodyLg
                  fontWeight="700"
                  color={
                    product.stockStatus === "low"
                      ? ColorWarning.warning600
                      : ColorGreen.green600
                  }
                >
                  Stok: {product.stock}
                </TextBodyLg>
              )}
            {product.stockStatus === "empty" && (
              <TextBodyLg fontWeight="700" color={ColorDanger.danger600}>
                Stok: 0
              </TextBodyLg>
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

export const MemoProductRow = React.memo(ProductRow);
