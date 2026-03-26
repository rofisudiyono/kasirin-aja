import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { YStack } from "tamagui";

import { TextH1 } from "@/components";
import { ColorBase } from "@/themes/Colors";

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
});

export function InventoriFAB() {
  return (
    <TouchableOpacity
      style={styles.fab}
      activeOpacity={0.8}
      onPress={() => router.push("/inventory/tambah-produk")}
    >
      <YStack
        width={56}
        height={56}
        borderRadius={28}
        backgroundColor="$primary"
        alignItems="center"
        justifyContent="center"
        shadowColor="$primary"
        shadowOpacity={0.4}
        shadowRadius={12}
        elevation={8}
      >
        <TextH1 color={ColorBase.white} fontWeight="300" fontSize={20}>
          +
        </TextH1>
      </YStack>
    </TouchableOpacity>
  );
}
