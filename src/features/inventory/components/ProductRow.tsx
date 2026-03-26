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
    marginTop: 2,
  },
});

function ProductRow({
  product,
  isFirst,
}: {
  product: Product;
  isFirst: boolean;
}) {
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
