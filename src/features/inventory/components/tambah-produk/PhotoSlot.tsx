import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { YStack } from "tamagui";

import { TextCaption } from "@/components";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/themes/Colors";

/** Large primary photo slot shown first */
export function AddPhotoSlotHero() {
  return (
    <YStack
      flex={1}
      height={120}
      borderRadius={12}
      borderWidth={1.5}
      borderColor={ColorPrimary.primary400}
      borderStyle="dashed"
      backgroundColor={ColorPrimary.primary25}
      alignItems="center"
      justifyContent="center"
      gap={6}
    >
      <YStack
        width={40}
        height={40}
        borderRadius={20}
        backgroundColor={ColorPrimary.primary100}
        alignItems="center"
        justifyContent="center"
      >
        <Ionicons name="camera" size={20} color={ColorPrimary.primary600} />
      </YStack>
      <TextCaption fontWeight="600" color={ColorPrimary.primary600}>
        Foto Utama
      </TextCaption>
      <TextCaption color={ColorPrimary.primary400} fontSize={10}>
        Tap untuk upload
      </TextCaption>
    </YStack>
  );
}

/** Small secondary photo slot */
export function AddPhotoSlot() {
  return (
    <YStack
      width={72}
      height={72}
      borderRadius={10}
      borderWidth={1.5}
      borderColor={ColorPrimary.primary400}
      borderStyle="dashed"
      backgroundColor={ColorPrimary.primary25}
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Ionicons name="camera-outline" size={20} color={ColorPrimary.primary400} />
      <TextCaption fontWeight="500" color={ColorPrimary.primary600} fontSize={10}>
        + Foto
      </TextCaption>
    </YStack>
  );
}

/** Hero filled slot */
export function FilledPhotoSlotHero({ onRemove }: { onRemove: () => void }) {
  return (
    <YStack flex={1} height={120} borderRadius={12} overflow="hidden">
      <YStack
        flex={1}
        backgroundColor={ColorNeutral.neutral200}
        alignItems="center"
        justifyContent="center"
      >
        <Ionicons name="image" size={36} color={ColorNeutral.neutral400} />
      </YStack>
      <TouchableOpacity
        onPress={onRemove}
        style={styles.removeBtn}
        hitSlop={4}
      >
        <Ionicons name="close-circle" size={22} color="#DC2626" />
      </TouchableOpacity>
    </YStack>
  );
}

export function FilledPhotoSlot({ onRemove }: { onRemove: () => void }) {
  return (
    <YStack width={72} height={72} borderRadius={10} overflow="hidden">
      <YStack
        flex={1}
        backgroundColor={ColorNeutral.neutral200}
        alignItems="center"
        justifyContent="center"
      >
        <Ionicons name="image-outline" size={26} color={ColorNeutral.neutral400} />
      </YStack>
      <TouchableOpacity
        onPress={onRemove}
        style={styles.removeBtn}
        hitSlop={4}
      >
        <Ionicons name="close-circle" size={20} color="#DC2626" />
      </TouchableOpacity>
    </YStack>
  );
}

const styles = StyleSheet.create({
  removeBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: ColorBase.white,
    borderRadius: 11,
  },
});
