import React from "react";
import { StyleSheet, View } from "react-native";

import { ColorBase, ColorNeutral } from "@/themes/Colors";
import type { QRCodePlaceholderProps } from "./QRCodePlaceholder.types";

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 180,
    backgroundColor: ColorBase.white,
    borderRadius: 8,
    padding: 12,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  finder: {
    position: "absolute",
    width: 44,
    height: 44,
    borderWidth: 4,
    borderColor: ColorNeutral.neutral900,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
  },
  finderInner: {
    width: 20,
    height: 20,
    backgroundColor: ColorNeutral.neutral900,
    borderRadius: 2,
  },
  dataArea: {
    gap: 3,
    marginTop: 4,
  },
  dataRow: {
    flexDirection: "row",
    gap: 3,
  },
  dataCell: {
    width: 10,
    height: 10,
    borderRadius: 1,
    backgroundColor: ColorBase.transparent,
  },
  dataCellFilled: {
    backgroundColor: ColorNeutral.neutral900,
  },
});

export function QRCodePlaceholder({ style }: QRCodePlaceholderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.finder, { top: 0, left: 0 }]}>
        <View style={styles.finderInner} />
      </View>
      <View style={[styles.finder, { top: 0, right: 0 }]}>
        <View style={styles.finderInner} />
      </View>
      <View style={[styles.finder, { bottom: 0, left: 0 }]}>
        <View style={styles.finderInner} />
      </View>
      <View style={styles.dataArea}>
        {Array.from({ length: 6 }).map((_, row) => (
          <View key={row} style={styles.dataRow}>
            {Array.from({ length: 8 }).map((_, col) => {
              const filled = (row * 3 + col * 7 + row * col) % 3 !== 0;
              return (
                <View
                  key={col}
                  style={[styles.dataCell, filled && styles.dataCellFilled]}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
