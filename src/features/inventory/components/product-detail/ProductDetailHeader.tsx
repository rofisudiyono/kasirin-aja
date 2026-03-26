import { useRouter } from "expo-router";
import { XStack } from "tamagui";

import { IconButton, TextH3 } from "@/components";
import { ColorBase } from "@/themes/Colors";

interface ProductDetailHeaderProps {
  onEdit?: () => void;
}

export function ProductDetailHeader({ onEdit }: ProductDetailHeaderProps) {
  const router = useRouter();

  return (
    <XStack
      paddingHorizontal="$4"
      paddingVertical="$3"
      alignItems="center"
      gap="$3"
      backgroundColor={ColorBase.white}
    >
      <IconButton
        iconName="arrow-back"
        onPress={() => router.push("/(tabs)/inventori")}
      />
      <TextH3 fontWeight="700" flex={1} textAlign="center">
        Detail Produk
      </TextH3>
      <IconButton iconName="create-outline" onPress={onEdit} />
    </XStack>
  );
}
