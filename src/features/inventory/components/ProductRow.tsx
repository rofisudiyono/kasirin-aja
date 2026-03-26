import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Separator, XStack, YStack } from "tamagui";

import {
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextMicro,
} from "@/components";
import { CATEGORY_ICONS } from "@/config/categoryStyles";
import { CategoryBadge } from "@/features/catalog/components/CategoryBadge";
import { StockBadge } from "@/features/inventory/components/StockBadge";
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
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: ColorNeutral.neutral100,
    paddingTop: 8,
  },
});

// ── Card variant for tablet 2-column grid ─────────────────────────────────────
function ProductCardGrid({ product }: { product: Product }) {
  const isEmpty = product.stockStatus === "empty";
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
            borderColor: isEmpty ? ColorDanger.danger200 : ColorNeutral.neutral200,
          },
        ]}
      >
        {/* Icon */}
        <View
          style={[
            styles.cardIcon,
            { backgroundColor: isEmpty ? ColorDanger.danger100 : ColorNeutral.neutral100 },
          ]}
        >
          <Ionicons
            name={CATEGORY_ICONS[product.category] ?? "cube-outline"}
            size={24}
            color={isEmpty ? ColorDanger.danger600 : ColorNeutral.neutral500}
          />
        </View>

        {/* Name + Variant badge */}
        <XStack alignItems="flex-start" gap={6} marginBottom={4}>
          <TextBodyLg fontWeight="700" flex={1} numberOfLines={2}>
            {product.name}
          </TextBodyLg>
          {product.hasVariant && (
            <View style={styles.variantBadge}>
              <TextMicro fontWeight="600" color={ColorPrimary.primary600}>
                Var
              </TextMicro>
            </View>
          )}
        </XStack>

        {/* Category + New badge */}
        <XStack gap={4} alignItems="center" marginBottom={4}>
          <CategoryBadge category={product.category} />
          {product.isNew && (
            <View style={styles.newBadge}>
              <TextMicro fontWeight="700" color={ColorYellow.yellow600}>
                Baru
              </TextMicro>
            </View>
          )}
        </XStack>

        <TextCaption color="$colorTertiary" marginBottom={2}>
          {product.sku}
        </TextCaption>

        {/* Footer: price + stock */}
        <View style={styles.cardFooter}>
          <YStack flex={1} gap={2}>
            <TextBodySm
              fontWeight="700"
              color={isEmpty ? "$colorTertiary" : "$primary"}
              textDecorationLine={isEmpty ? "line-through" : "none"}
              numberOfLines={1}
            >
              {product.price}
            </TextBodySm>
            {product.stockStatus !== "inactive" && (
              <TextCaption
                fontWeight="600"
                color={
                  isEmpty
                    ? ColorDanger.danger600
                    : product.stockStatus === "low"
                      ? ColorWarning.warning600
                      : ColorGreen.green600
                }
              >
                Stok: {product.stock}
              </TextCaption>
            )}
          </YStack>
          <StockBadge stockStatus={product.stockStatus} />
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

export const MemoProductRow = React.memo(ProductRow);
