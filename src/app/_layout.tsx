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
import { Slot } from "expo-router";
import React, { useState } from "react";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { AuthContext } from "@/lib/auth";
import { tamaguiConfig } from "../../tamagui.config";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <Slot />
        </ThemeProvider>
      </TamaguiProvider>
    </AuthContext.Provider>
  );
}
