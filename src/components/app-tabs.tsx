import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, useColorScheme } from "react-native";
import { Text } from "tamagui";

import HomeScreen from "@/screens/HomeScreen";
import InventoriScreen from "@/screens/InventoriScreen";
import PengaturanScreen from "@/screens/PengaturanScreen";
import TransaksiScreen from "@/screens/TransaksiScreen";

const Tab = createBottomTabNavigator();

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const TAB_ICONS: Record<
  string,
  { active: IoniconName; inactive: IoniconName }
> = {
  Home: { active: "home", inactive: "home-outline" },
  Transaksi: { active: "receipt", inactive: "receipt-outline" },
  Inventori: { active: "cube", inactive: "cube-outline" },
  Pengaturan: { active: "settings", inactive: "settings-outline" },
};

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons = TAB_ICONS[name];
  return (
    <Ionicons
      name={focused ? icons.active : icons.inactive}
      size={22}
      color={focused ? "#2563EB" : "#9CA3AF"}
    />
  );
}

export default function AppTabs() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
        tabBarLabel: ({ focused, color }) => (
          <Text
            fontFamily="$body"
            fontSize={10}
            fontWeight={focused ? "700" : "400"}
            color={focused ? "$primary" : "$colorSecondary"}
            marginBottom={Platform.OS === "ios" ? 0 : 4}
          >
            {route.name}
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transaksi" component={TransaksiScreen} />
      <Tab.Screen name="Inventori" component={InventoriScreen} />
      <Tab.Screen name="Pengaturan" component={PengaturanScreen} />
    </Tab.Navigator>
  );
}
