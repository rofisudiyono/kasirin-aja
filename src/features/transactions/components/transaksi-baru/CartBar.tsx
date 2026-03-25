import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { YStack } from "tamagui";

import { TextBodyLg, TextBodySm } from "@/components";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/themes/Colors";
import { formatPrice } from "@/utils";

type Props = {
  totalItems: number;
  totalPrice: number;
  onPress: () => void;
};

export function CartBar({ totalItems, totalPrice, onPress }: Props) {
  if (totalItems === 0) return null;

  return (
    <View style={styles.cartBar}>
      <View style={styles.cartBarInner}>
        <View style={styles.cartBarIcon}>
          <Ionicons
            name="bag-outline"
            size={20}
            color={ColorPrimary.primary600}
          />
        </View>
        <YStack flex={1} gap={2}>
          <TextBodySm color="$colorSecondary">{totalItems} item</TextBodySm>
          <TextBodyLg fontWeight="700" color="$primary">
            {formatPrice(totalPrice)}
          </TextBodyLg>
        </YStack>
        <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
          <View style={styles.cartBarButton}>
            <TextBodyLg fontWeight="700" color={ColorBase.white}>
              Lihat Keranjang
            </TextBodyLg>
            <Ionicons name="arrow-forward" size={16} color={ColorBase.white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 8,
    backgroundColor: ColorBase.white,
    borderTopWidth: 1,
    borderTopColor: ColorNeutral.neutral100,
  },
  cartBarInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: ColorBase.white,
    borderRadius: 16,
    padding: 12,
    shadowColor: ColorBase.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cartBarIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: ColorPrimary.primary50,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBarButton: {
    backgroundColor: ColorPrimary.primary600,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
