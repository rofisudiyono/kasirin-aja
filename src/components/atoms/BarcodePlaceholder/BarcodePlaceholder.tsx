import React from "react";
import { StyleSheet, View } from "react-native";

import type { BarcodePlaceholderProps } from "./BarcodePlaceholder.types";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    alignItems: "stretch",
    justifyContent: "center",
  },
  bar: {
    height: "100%",
  },
});

export function BarcodePlaceholder({ style }: BarcodePlaceholderProps) {
  const bars = [
    3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1,
    2, 3, 1, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 3, 1,
  ];

  return (
    <View style={[styles.container, style]}>
      {bars.map((width, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            {
              width,
              backgroundColor: index % 2 === 0 ? "#111827" : "transparent",
            },
          ]}
        />
      ))}
    </View>
  );
}
