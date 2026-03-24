import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform, useColorScheme } from "react-native";
import { Text } from "tamagui";

import { TAB_ICONS, TAB_LABELS } from "@/constants/navigation";
import { useAuth } from "@/lib/auth";

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
              color={focused ? "#2563EB" : "#9CA3AF"}
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
          backgroundColor: isDark ? "#111827" : "#FFFFFF",
          borderTopColor: isDark ? "#374151" : "#E5E7EB",
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 84 : 64,
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 24 : 8,
        },
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#6B7280",
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="transaksi" />
      <Tabs.Screen name="inventori" />
      <Tabs.Screen name="pengaturan" />
    </Tabs>
  );
}
