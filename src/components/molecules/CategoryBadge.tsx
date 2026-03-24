/**
 * CategoryBadge — Display product category with icon and color
 *
 * Used in product listings (inventory, catalog)
 */
import React from "react";
import { YStack } from "tamagui";

import { CATEGORY_COLORS } from "@/constants/categoryStyles";
import type { ProductCategory } from "@/types";
import { TextCaption } from "../atoms/Typography";

interface CategoryBadgeProps {
  category: ProductCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const style = CATEGORY_COLORS[category] ?? {
    bg: "#F3F4F6",
    color: "#6B7280",
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
