import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform, useColorScheme } from "react-native";
import { Text } from "tamagui";

import { TAB_ICONS, TAB_LABELS } from "@/constants/navigation";
import { useAuth } from "@/lib/auth";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/themes/Colors";

export default function TabsLayout() {
  const { isLoggedIn } = useAuth();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  if (!isLoggedIn) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const icons = TAB_ICONS[route.name];
          return (
            <Ionicons
              name={focused ? icons.active : icons.inactive}
              size={22}
              color={
                focused ? ColorPrimary.primary600 : ColorNeutral.neutral400
              }
            />
          );
        },
        tabBarLabel: ({ focused }) => (
          <Text
            fontFamily="$body"
            fontSize={10}
            fontWeight={focused ? "700" : "400"}
            color={focused ? "$primary" : "$colorSecondary"}
            marginBottom={Platform.OS === "ios" ? 0 : 4}
          >
            {TAB_LABELS[route.name] ?? route.name}
          </Text>
        ),
        tabBarStyle: {
          backgroundColor: isDark ? ColorNeutral.neutral900 : ColorBase.white,
          borderTopColor: isDark
            ? ColorNeutral.neutral700
            : ColorNeutral.neutral200,
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 84 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
        },
        tabBarActiveTintColor: ColorPrimary.primary600,
        tabBarInactiveTintColor: isDark
          ? ColorNeutral.neutral400
          : ColorNeutral.neutral500,
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="transaksi" />
      <Tabs.Screen name="inventori" />
      <Tabs.Screen name="pengaturan" />
    </Tabs>
  );
}
