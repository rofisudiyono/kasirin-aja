/**
 * PaymentMethodCard — Payment method selection card
 *
 * Used in pilih-pembayaran (payment method selection) page
 * Shows payment options: Tunai, QRIS, Transfer, EDC
 */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { YStack } from "tamagui";

import {
  ColorBase,
  ColorNeutral,
  ColorPrimary,
  ColorSky,
  ColorSuccess,
} from "@/shared/themes/Colors";

import { TextBodyLg, TextCaption } from "@/shared/components/atoms/Typography";
import type { PaymentMethodCardProps } from "./PaymentMethodCard/PaymentMethodCard.types";

const styles = StyleSheet.create({
  methodCard: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorNeutral.neutral200,
    backgroundColor: ColorBase.white,
    alignItems: "center",
    gap: 12,
    marginVertical: 8,
  },
  methodCardSelected: {
    borderColor: ColorPrimary.primary600,
    backgroundColor: ColorSky.sky50,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: ColorSuccess.success500,
    alignItems: "center",
    justifyContent: "center",
  },
});

export function PaymentMethodCard({
  id,
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  selected,
  onPress,
}: PaymentMethodCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.methodCard, selected && styles.methodCardSelected]}>
        <View style={[styles.methodIcon, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
        <YStack flex={1} gap={2}>
          <TextBodyLg fontWeight="700">{title}</TextBodyLg>
          <TextCaption color="$colorSecondary">{subtitle}</TextCaption>
        </YStack>
        {selected ? (
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={16} color={ColorBase.white} />
          </View>
        ) : (
          <Ionicons
            name="chevron-forward"
            size={18}
            color={ColorNeutral.neutral400}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
