import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { XStack, YStack } from "tamagui";

import {
  TextBodyLg,
  TextBodySm,
  TextCaption,
} from "@/shared/components/atoms/Typography";
import {
  ColorBase,
  ColorNeutral,
  ColorPrimary,
  ColorWarning,
} from "@/shared/themes/Colors";
import { formatPrice } from "@/shared/utils";

import type { ProductCardProps } from "./ProductCard.types";

const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorBase.white,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: ColorBase.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImageArea: {
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  stockBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
});

export function ProductCard({
  name,
  basePrice,
  categoryIcon,
  categoryIconBg,
  categoryIconColor,
  stockStatus,
  onAdd,
  width,
  style,
}: ProductCardProps) {
  const isEmpty = stockStatus === "empty";
  const isLow = stockStatus === "low";

  return (
    <View style={[styles.card, { width }, isEmpty && { opacity: 0.85 }, style]}>
      <View
        style={[
          styles.cardImageArea,
          { backgroundColor: categoryIconBg },
          isEmpty && { opacity: 0.5 },
        ]}
      >
        <Ionicons name={categoryIcon} size={52} color={categoryIconColor} />

        {isLow && (
          <View
            style={[
              styles.stockBadge,
              { backgroundColor: ColorWarning.warning500 },
            ]}
          >
            <TextCaption fontWeight="700" color={ColorBase.white} fontSize={11}>
              Stok Tipis
            </TextCaption>
          </View>
        )}

        {isEmpty && (
          <View
            style={[
              styles.stockBadge,
              { backgroundColor: ColorNeutral.neutral400 },
            ]}
          >
            <TextCaption fontWeight="700" color={ColorBase.white} fontSize={11}>
              Habis
            </TextCaption>
          </View>
        )}
      </View>

      <YStack padding={12} gap={8}>
        <TextBodyLg
          fontWeight="700"
          numberOfLines={2}
          lineHeight={20}
          color={isEmpty ? "$colorTertiary" : "$color"}
        >
          {name}
        </TextBodyLg>

        <XStack alignItems="center" justifyContent="space-between">
          <TextBodySm
            fontWeight="700"
            color={isEmpty ? "$colorTertiary" : "$primary"}
          >
            {formatPrice(basePrice)}
          </TextBodySm>

          <TouchableOpacity
            onPress={() => !isEmpty && onAdd()}
            disabled={isEmpty}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.addButton,
                {
                  backgroundColor: isEmpty
                    ? ColorNeutral.neutral200
                    : ColorPrimary.primary600,
                },
              ]}
            >
              <Ionicons
                name="add"
                size={20}
                color={isEmpty ? ColorNeutral.neutral400 : ColorBase.white}
              />
            </View>
          </TouchableOpacity>
        </XStack>
      </YStack>
    </View>
  );
}
