import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import { AuthContext } from "@/lib/auth";
import LoginScreen from "@/screens/LoginScreen";
import { tamaguiConfig } from "../../tamagui.config";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load Poppins in the background — Tamagui falls back to system font until ready
  useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login: () => setIsLoggedIn(true),
        logout: () => setIsLoggedIn(false),
      }}
    >
      <TamaguiProvider
        config={tamaguiConfig}
        defaultTheme={colorScheme === "dark" ? "dark" : "light"}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AnimatedSplashOverlay />
          {isLoggedIn ? <AppTabs /> : <LoginScreen />}
        </ThemeProvider>
      </TamaguiProvider>
    </AuthContext.Provider>
  );
}
