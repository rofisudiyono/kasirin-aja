import React from "react";
import { StyleSheet, View } from "react-native";

import { ColorNeutral } from "@/themes/Colors";

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftFlex?: number;
  rightFlex?: number;
  dividerColor?: string;
}

/**
 * Tablet split layout: left panel | divider | right panel.
 * Konfigurasi flex ratio via leftFlex/rightFlex (default 55/45).
 */
export function SplitLayout({
  left,
  right,
  leftFlex = 0.55,
  rightFlex = 0.45,
  dividerColor = ColorNeutral.neutral200,
}: SplitLayoutProps) {
  return (
    <View style={styles.container}>
      <View style={{ flex: leftFlex }}>{left}</View>
      <View style={[styles.divider, { backgroundColor: dividerColor }]} />
      <View style={{ flex: rightFlex }}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  divider: {
    width: 1,
  },
});
