/**
 * BarcodePlaceholder — Placeholder barcode visual for receipts
 *
 * Used in pembayaran-sukses (payment success) page
 */
import React from "react";
import { StyleSheet, View } from "react-native";

import { barcodeBars } from "@/features/catalog/api/barcode.data";
import { ColorBase, ColorNeutral } from "@/shared/themes/Colors";

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

export function BarcodePlaceholder() {
  return (
    <View style={styles.container}>
      {barcodeBars.map((width, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            {
              width,
              backgroundColor:
                index % 2 === 0
                  ? ColorNeutral.neutral900
                  : ColorBase.transparent,
            },
          ]}
        />
      ))}
    </View>
  );
}
