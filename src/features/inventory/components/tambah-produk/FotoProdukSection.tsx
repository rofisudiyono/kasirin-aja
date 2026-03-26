import React from "react";
import { XStack, YStack } from "tamagui";

import { TextCaption } from "@/components";
import { ColorBase, ColorNeutral } from "@/themes/Colors";

import {
  AddPhotoSlot,
  AddPhotoSlotHero,
  FilledPhotoSlot,
  FilledPhotoSlotHero,
} from "./PhotoSlot";
import { SectionHeader } from "./SectionHeader";

interface FotoProdukSectionProps {
  photos: string[];
  onRemovePhoto: (idx: number) => void;
}

export function FotoProdukSection({
  photos,
  onRemovePhoto,
}: FotoProdukSectionProps) {
  const hasHero = photos.length > 0;
  const extraPhotos = photos.slice(1); // photos beyond the first one
  const canAddMore = photos.length < 5;

  return (
    <YStack
      backgroundColor={ColorBase.white}
      borderRadius={12}
      padding="$4"
      gap="$3"
    >
      <SectionHeader title="Foto Produk" />

      {/* Hero row */}
      <XStack gap="$2" alignItems="stretch">
        {hasHero ? (
          <FilledPhotoSlotHero onRemove={() => onRemovePhoto(0)} />
        ) : (
          <AddPhotoSlotHero />
        )}
      </XStack>

      {/* Thumbnails row — only shown when at least 1 photo exists */}
      {(extraPhotos.length > 0 || (hasHero && canAddMore)) && (
        <XStack gap="$2" flexWrap="wrap">
          {extraPhotos.map((_, idx) => (
            <FilledPhotoSlot
              key={idx + 1}
              onRemove={() => onRemovePhoto(idx + 1)}
            />
          ))}
          {canAddMore && <AddPhotoSlot />}
        </XStack>
      )}

      <XStack alignItems="center" justifyContent="space-between">
        <TextCaption color={ColorNeutral.neutral400}>
          {photos.length} / 5 foto ditambahkan
        </TextCaption>
        <TextCaption color={ColorNeutral.neutral400}>
          Maks. 5 foto
        </TextCaption>
      </XStack>
    </YStack>
  );
}
