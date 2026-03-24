/**
 * DottedSeparator — Decorative dotted line separator
 *
 * Used in receipts and payment confirmation screens
 */
import React from "react";
import { StyleSheet, View } from "react-native";

import { ColorNeutral } from "@/themes/Colors";

const styles = StyleSheet.create({
  dottedLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginVertical: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: ColorNeutral.neutral200,
  },
});

export function DottedSeparator() {
  return (
    <View style={styles.dottedLine}>
      {Array.from({ length: 40 }).map((_, i) => (
        <View key={i} style={styles.dot} />
      ))}
    </View>
  );
}
