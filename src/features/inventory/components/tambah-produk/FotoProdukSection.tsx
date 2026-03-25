import React from "react";
import { XStack, YStack } from "tamagui";

import { TextCaption } from "@/shared/components";
import { ColorBase, ColorNeutral } from "@/shared/themes/Colors";

import { AddPhotoSlot, FilledPhotoSlot } from "./PhotoSlot";
import { SectionHeader } from "./SectionHeader";

interface FotoProdukSectionProps {
  photos: string[];
  onRemovePhoto: (idx: number) => void;
}

export function FotoProdukSection({
  photos,
  onRemovePhoto,
}: FotoProdukSectionProps) {
  return (
    <YStack
      backgroundColor={ColorBase.white}
      borderRadius={12}
      padding="$4"
      gap="$3"
    >
      <SectionHeader title="Foto Produk" />
      <XStack gap="$2" flexWrap="wrap">
        {photos.map((_, idx) => (
          <FilledPhotoSlot key={idx} onRemove={() => onRemovePhoto(idx)} />
        ))}
        {photos.length < 5 && <AddPhotoSlot />}
      </XStack>
      <TextCaption color={ColorNeutral.neutral400}>Maks. 5 foto</TextCaption>
    </YStack>
  );
}
