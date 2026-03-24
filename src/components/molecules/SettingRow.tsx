/**
 * SettingRow — Reusable setting item row component
 *
 * Used in pengaturan (settings) page
 * Displays icon, text, badge, value, toggle, or chevron
 */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Switch, TouchableOpacity } from "react-native";
import { XStack, YStack } from "tamagui";

import type { SettingRowProps } from "@/types";
import { TextBodyLg, TextBodySm } from "../atoms/Typography";

export function SettingRow({
  iconName,
  iconBg,
  iconColor = "#374151",
  title,
  subtitle,
  badge,
  badgeColor,
  badgeBg,
  value,
  hasToggle,
  toggleValue,
  onToggle,
  showChevron = true,
}: SettingRowProps) {
  return (
    <TouchableOpacity disabled={hasToggle}>
      <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
        gap="$3"
      >
        <YStack
          width={40}
          height={40}
          borderRadius={10}
          backgroundColor={iconBg}
          alignItems="center"
          justifyContent="center"
        >
          <Ionicons name={iconName} size={20} color={iconColor} />
        </YStack>
        <YStack flex={1} gap={2}>
          <TextBodyLg fontWeight="600">{title}</TextBodyLg>
          <TextBodySm color="$colorSecondary" numberOfLines={1}>
            {subtitle}
          </TextBodySm>
        </YStack>
        {badge && (
          <YStack
            backgroundColor={badgeBg ?? "#DCFCE7"}
            borderRadius={20}
            paddingHorizontal={10}
            paddingVertical={4}
          >
            <TextBodySm fontWeight="700" color={badgeColor ?? "#16A34A"}>
              {badge}
            </TextBodySm>
          </YStack>
        )}
        {value && <TextBodySm color="$colorSecondary">{value}</TextBodySm>}
        {hasToggle && (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{ true: "#2563EB", false: "#D1D5DB" }}
          />
        )}
        {showChevron && !hasToggle && (
          <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
        )}
      </XStack>
    </TouchableOpacity>
  );
}
