import { Separator, XStack, YStack } from "tamagui";

import { CategoryBadge } from "@/features/catalog/components/CategoryBadge";
import {
  TextBody,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH1,
} from "@/shared/components";
import { ColorBase, ColorGreen, ColorNeutral, ColorPrimary } from "@/shared/themes/Colors";
import type { ProductDetail } from "@/shared/types";

import { formatRupiah } from "./utils";

type Props = {
  product: ProductDetail;
  margin: number;
};

export function ProductInfoCard({ product, margin }: Props) {
  return (
    <YStack
      backgroundColor={ColorBase.white}
      borderTopLeftRadius={20}
      borderTopRightRadius={20}
      marginTop={-20}
      paddingTop="$4"
      paddingHorizontal="$4"
      paddingBottom="$4"
      gap="$4"
    >
      {/* Name & meta */}
      <YStack gap="$2">
        <TextH1 fontWeight="700">{product.name}</TextH1>
        <XStack alignItems="center" gap="$2">
          <CategoryBadge category={product.category} />
          <TextBodySm color={ColorNeutral.neutral500}>
            SKU: {product.sku}
          </TextBodySm>
        </XStack>
      </YStack>

      <Separator borderColor="$borderColor" />

      {/* Pricing */}
      <XStack gap="$3">
        <YStack
          flex={1}
          backgroundColor={ColorNeutral.neutral50}
          borderRadius={10}
          padding="$3"
          gap={4}
        >
          <TextCaption color={ColorNeutral.neutral500}>Harga Modal</TextCaption>
          <TextBodyLg fontWeight="700">
            {formatRupiah(product.costPrice)}
          </TextBodyLg>
        </YStack>
        <YStack
          flex={1}
          backgroundColor={ColorPrimary.primary25}
          borderRadius={10}
          padding="$3"
          gap={4}
        >
          <TextCaption color={ColorPrimary.primary600} fontWeight="600">
            Harga Jual
          </TextCaption>
          <TextBodyLg fontWeight="700" color={ColorPrimary.primary600}>
            {formatRupiah(product.sellPrice)}
          </TextBodyLg>
        </YStack>
      </XStack>

      {/* Margin */}
      <XStack justifyContent="center">
        <YStack
          backgroundColor={ColorGreen.green100}
          borderRadius={20}
          paddingHorizontal={16}
          paddingVertical={6}
        >
          <TextBodySm fontWeight="700" color={ColorGreen.green600}>
            Margin {margin}%
          </TextBodySm>
        </YStack>
      </XStack>

      <Separator borderColor="$borderColor" />

      {/* Description */}
      <YStack gap="$2">
        <TextBodySm color={ColorNeutral.neutral500}>Deskripsi</TextBodySm>
        <TextBody color={ColorNeutral.neutral700}>{product.description}</TextBody>
      </YStack>
    </YStack>
  );
}
