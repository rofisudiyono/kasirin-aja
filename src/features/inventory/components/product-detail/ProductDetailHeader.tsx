import { useRouter } from "expo-router";
import { XStack } from "tamagui";

import { IconButton, TextH3 } from "@/shared/components";
import { ColorBase } from "@/shared/themes/Colors";

export function ProductDetailHeader() {
  const router = useRouter();

  return (
    <XStack
      paddingHorizontal="$4"
      paddingVertical="$3"
      alignItems="center"
      gap="$3"
      backgroundColor={ColorBase.white}
    >
      <IconButton iconName="arrow-back" onPress={() => router.back()} />
      <TextH3 fontWeight="700" flex={1} textAlign="center">
        Detail Produk
      </TextH3>
      <IconButton iconName="create-outline" />
      <IconButton iconName="ellipsis-vertical" />
    </XStack>
  );
}
