/**
 * NumpadButton — Numeric keypad button for cash input
 *
 * Used in pembayaran-tunai (cash payment) page
 */
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { TextH3 } from "./Typography";

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 6,
  },
});

interface NumpadButtonProps {
  label: string;
  onPress: () => void;
  textColor?: string;
  bgColor?: string;
  isIcon?: boolean;
}

export function NumpadButton({
  label,
  onPress,
  textColor = "#111827",
  bgColor = "#F4F5F9",
  isIcon = false,
}: NumpadButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.btn, { backgroundColor: bgColor }]}
    >
      {isIcon ? (
        <Ionicons name="backspace" size={22} color="#DC2626" />
      ) : (
        <TextH3 fontWeight="700" color={textColor} fontSize={20}>
          {label}
        </TextH3>
      )}
    </TouchableOpacity>
  );
}
