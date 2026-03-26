import React from "react";
import { StyleSheet, View } from "react-native";

import { ColorDanger, ColorPrimary, ColorSky } from "@/themes/Colors";

import { NumpadButton } from "./NumpadButton/index";

const DEFAULT_ROWS: string[][] = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["000", "0", "DEL"],
];

interface NumpadGridProps {
  onPress: (key: string) => void;
  /** Override baris numpad, default 1-9 + 000/0/DEL */
  rows?: string[][];
}

/**
 * Numpad grid yang digunakan di buka-shift, tutup-shift, dan pembayaran-tunai.
 */
export function NumpadGrid({ onPress, rows = DEFAULT_ROWS }: NumpadGridProps) {
  return (
    <View style={styles.numpad}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) =>
            key === "DEL" ? (
              <NumpadButton
                key="DEL"
                label=""
                bgColor={ColorDanger.danger75}
                onPress={() => onPress("DEL")}
                isIcon
              />
            ) : key === "000" ? (
              <NumpadButton
                key="000"
                label="000"
                bgColor={ColorSky.indigo50}
                textColor={ColorPrimary.primary600}
                onPress={() => onPress("000")}
              />
            ) : (
              <NumpadButton key={key} label={key} onPress={() => onPress(key)} />
            ),
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  numpad: {
    gap: 8,
  },
  row: {
    height: 54,
    flexDirection: "row",
    gap: 8,
  },
});
