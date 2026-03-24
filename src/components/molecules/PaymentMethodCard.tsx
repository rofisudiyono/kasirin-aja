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

import type { PaymentMethod } from "@/types";
import { TextBodyLg, TextCaption } from "../atoms/Typography";

const styles = StyleSheet.create({
  methodCard: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
    alignItems: "center",
    gap: 12,
    marginVertical: 8,
  },
  methodCardSelected: {
    borderColor: "#2563EB",
    backgroundColor: "#F0F9FF",
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
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },
});

interface PaymentMethodCardProps {
  id: PaymentMethod;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
}

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
            <Ionicons name="checkmark" size={16} color="white" />
          </View>
        ) : (
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
  );
}
