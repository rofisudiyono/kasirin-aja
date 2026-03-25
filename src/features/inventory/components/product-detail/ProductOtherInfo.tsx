import { XStack, YStack } from "tamagui";

import { TextBodyLg, TextBodySm } from "@/shared/components";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/shared/themes/Colors";

type Props = {
  createdAt: string;
  updatedAt: string;
  totalSold: number;
};

export function ProductOtherInfo({ createdAt, updatedAt, totalSold }: Props) {
  return (
    <YStack
      backgroundColor={ColorBase.white}
      marginTop="$2"
      paddingHorizontal="$4"
      paddingVertical="$4"
      gap="$3"
    >
      <TextBodyLg fontWeight="700">Informasi Lainnya</TextBodyLg>
      <XStack justifyContent="space-between" alignItems="center">
        <TextBodySm color={ColorNeutral.neutral500}>Dibuat</TextBodySm>
        <TextBodySm fontWeight="500">{createdAt}</TextBodySm>
      </XStack>
      <XStack justifyContent="space-between" alignItems="center">
        <TextBodySm color={ColorNeutral.neutral500}>Diperbarui</TextBodySm>
        <TextBodySm fontWeight="500">{updatedAt}</TextBodySm>
      </XStack>
      <XStack justifyContent="space-between" alignItems="center">
        <TextBodySm color={ColorNeutral.neutral500}>Total Terjual</TextBodySm>
        <TextBodySm fontWeight="700" color={ColorPrimary.primary600}>
          {totalSold} item
        </TextBodySm>
      </XStack>
    </YStack>
  );
}
