import { StyleSheet } from "react-native";

import { ColorNeutral } from "@/shared/themes/Colors";

export const inputStyle = StyleSheet.create({
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    fontFamily: "System",
    color: ColorNeutral.neutral800,
    padding: 0,
    margin: 0,
  },
});
