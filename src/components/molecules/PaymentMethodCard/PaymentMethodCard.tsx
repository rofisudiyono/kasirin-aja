import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { YStack } from "tamagui";

import { TextBodyLg, TextCaption } from "@/components/atoms/Typography";

import type { PaymentMethodCardProps } from "./PaymentMethodCard.types";

const styles = StyleSheet.create({
  methodCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1.5,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  methodCardSelected: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
});

export function PaymentMethodCard({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  selected,
  onPress,
  style,
}: PaymentMethodCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={[
          styles.methodCard,
          selected && styles.methodCardSelected,
          style,
        ]}
      >
        <View style={[styles.methodIcon, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
        <YStack flex={1} gap={2}>
          <TextBodyLg fontWeight="700">{title}</TextBodyLg>
          <TextCaption color="$colorSecondary">{subtitle}</TextCaption>
        </YStack>
        {selected ? (
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={16} color="white" />
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
  );
}
