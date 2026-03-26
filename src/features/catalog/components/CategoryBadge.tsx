/**
 * CategoryBadge — Display product category with icon and color
 *
 * Used in product listings (inventory, catalog)
 */
import React from "react";
import { YStack } from "tamagui";

import { CATEGORY_COLORS } from "@/config/categoryStyles";
import { TextBodySm } from "@/components/atoms/Typography";
import { ColorNeutral } from "@/themes/Colors";
import type { ProductCategory } from "@/types";

interface CategoryBadgeProps {
  category: ProductCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const style = CATEGORY_COLORS[category] ?? {
    bg: ColorNeutral.neutral100,
    color: ColorNeutral.neutral500,
  };
  return (
    <YStack
      backgroundColor={style.bg}
      borderRadius={20}
      paddingHorizontal={9}
      paddingVertical={4}
    >
      <TextBodySm fontWeight="600" color={style.color}>
        {category}
      </TextBodySm>
    </YStack>
  );
}
