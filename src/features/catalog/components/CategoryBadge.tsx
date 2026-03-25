/**
 * CategoryBadge — Display product category with icon and color
 *
 * Used in product listings (inventory, catalog)
 */
import React from "react";
import { YStack } from "tamagui";

import { CATEGORY_COLORS } from "@/config/categoryStyles";
import { ColorNeutral } from "@/shared/themes/Colors";
import type { ProductCategory } from "@/shared/types";
import { TextCaption } from "@/shared/components/atoms/Typography";

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
      paddingHorizontal={8}
      paddingVertical={3}
    >
      <TextCaption fontWeight="600" color={style.color}>
        {category}
      </TextCaption>
    </YStack>
  );
}
