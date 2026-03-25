import { Ionicons } from "@expo/vector-icons";
import { YStack } from "tamagui";

import { CATEGORY_ICONS } from "@/config/categoryStyles";
import { TextMicro } from "@/shared/components";
import { ColorBase, ColorGreen, ColorNeutral, ColorPrimary } from "@/shared/themes/Colors";
import type { ProductCategory } from "@/shared/types";

import { heroBgColor, heroBgIconColor } from "./utils";

type Props = {
  category: ProductCategory;
  status: "active" | "inactive";
  hasVariants: boolean;
};

export function ProductHero({ category, status, hasVariants }: Props) {
  return (
    <YStack
      height={220}
      backgroundColor={heroBgColor(category)}
      alignItems="center"
      justifyContent="center"
    >
      <Ionicons
        name={CATEGORY_ICONS[category] ?? "cube-outline"}
        size={88}
        color={heroBgIconColor(category)}
      />

      {/* Status badge */}
      <YStack
        position="absolute"
        top={16}
        left={16}
        backgroundColor={
          status === "active" ? ColorGreen.green600 : ColorNeutral.neutral500
        }
        borderRadius={20}
        paddingHorizontal={12}
        paddingVertical={5}
      >
        <TextMicro fontWeight="700" color={ColorBase.white}>
          {status === "active" ? "Aktif" : "Nonaktif"}
        </TextMicro>
      </YStack>

      {/* Variant badge */}
      {hasVariants && (
        <YStack
          position="absolute"
          top={16}
          right={16}
          backgroundColor={ColorPrimary.primary600}
          borderRadius={20}
          paddingHorizontal={12}
          paddingVertical={5}
        >
          <TextMicro fontWeight="700" color={ColorBase.white}>
            Variant
          </TextMicro>
        </YStack>
      )}
    </YStack>
  );
}
