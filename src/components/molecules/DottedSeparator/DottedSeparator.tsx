import React from "react";
import { StyleSheet, View } from "react-native";

import type { DottedSeparatorProps } from "./DottedSeparator.types";

const styles = StyleSheet.create({
  dottedLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginVertical: 12,
  },
  dot: {
    width: 4,
    height: 1,
    backgroundColor: "#D1D5DB",
    borderRadius: 1,
  },
});

export function DottedSeparator({ dots = 40, style }: DottedSeparatorProps) {
  return (
    <View style={[styles.dottedLine, style]}>
      {Array.from({ length: dots }).map((_, index) => (
        <View key={index} style={styles.dot} />
      ))}
    </View>
  );
}
