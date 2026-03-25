import { Ionicons } from "@expo/vector-icons";
import { useAtomValue } from "jotai";
import React from "react";
import { XStack, YStack } from "tamagui";

import { shiftDataAtom } from "@/features/shift/store/shift.store";
import {
  AppButton,
  TextBodyLg,
  TextBodySm,
  TextCaption,
} from "@/components";
import {
  ColorBase,
  ColorNeutral,
  ColorPrimary,
  ColorSuccess,
  ColorWarning,
} from "@/themes/Colors";

import { ShiftCardProps } from "./ShiftCard.types";

export function ShiftCard({
  isShiftStarted,
  onClose,
  onStart,
}: ShiftCardProps) {
  const shiftData = useAtomValue(shiftDataAtom);

  if (isShiftStarted) {
    return (
      <YStack
        backgroundColor={ColorPrimary.primary600}
        borderRadius={16}
        padding="$4"
        gap="$3"
      >
        <XStack alignItems="center" gap="$2">
          <YStack
            width={8}
            height={8}
            borderRadius={4}
            backgroundColor={ColorSuccess.success400}
          />
          <TextBodyLg fontWeight="700" color={ColorBase.white}>
            Shift Aktif
          </TextBodyLg>
        </XStack>

        <TextBodySm color={ColorPrimary.primary200}>
          Mulai: {shiftData?.startTime ?? "08:00 WIB"}
        </TextBodySm>

        <XStack gap="$2">
          <YStack
            flex={1}
            backgroundColor="rgba(255,255,255,0.15)"
            borderRadius={10}
            padding="$3"
            gap={4}
          >
            <TextBodySm color={ColorPrimary.primary200}>
              Total Transaksi
            </TextBodySm>
            <TextBodyLg fontWeight="700" color={ColorBase.white}>
              24
            </TextBodyLg>
          </YStack>
          <YStack
            flex={1}
            backgroundColor="rgba(255,255,255,0.15)"
            borderRadius={10}
            padding="$3"
            gap={4}
          >
            <TextBodySm color={ColorPrimary.primary200}>Pendapatan</TextBodySm>
            <TextBodyLg
              fontWeight="700"
              color={ColorBase.white}
              numberOfLines={1}
            >
              Rp 1.250....
            </TextBodyLg>
          </YStack>
        </XStack>

        <AppButton
          variant="glass"
          size="lg"
          fullWidth
          title="Tutup Shift"
          onPress={onClose}
        />
      </YStack>
    );
  }

  return (
    <YStack
      backgroundColor={ColorPrimary.primary600}
      borderRadius={16}
      padding="$4"
      gap="$3"
    >
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" gap="$2">
          <YStack
            width={8}
            height={8}
            borderRadius={4}
            backgroundColor={ColorNeutral.neutral300}
          />
          <TextBodyLg fontWeight="700" color={ColorBase.white}>
            Shift Akan Dimulai
          </TextBodyLg>
        </XStack>
        <YStack
          width={36}
          height={36}
          borderRadius={18}
          backgroundColor="rgba(255,255,255,0.2)"
          alignItems="center"
          justifyContent="center"
        >
          <Ionicons name="sunny-outline" size={18} color={ColorBase.white} />
        </YStack>
      </XStack>

      <TextBodySm color={ColorPrimary.primary200}>
        Siapkan modal awal dan cek perangkat kasir sebelum mulai menerima
        transaksi.
      </TextBodySm>

      <XStack gap="$2">
        <YStack
          flex={1}
          backgroundColor="rgba(255,255,255,0.15)"
          borderRadius={10}
          padding="$3"
          gap={4}
        >
          <TextBodySm color={ColorPrimary.primary200}>Jadwal Shift</TextBodySm>
          <TextBodyLg fontWeight="700" color={ColorBase.white}>
            08:00 WIB
          </TextBodyLg>
        </YStack>
        <YStack
          flex={1}
          backgroundColor="rgba(255,255,255,0.15)"
          borderRadius={10}
          padding="$3"
          gap={4}
        >
          <TextBodySm color={ColorPrimary.primary200}>
            Kasir Bertugas
          </TextBodySm>
          <TextBodyLg
            fontWeight="700"
            color={ColorBase.white}
            numberOfLines={1}
          >
            Budi Santo...
          </TextBodyLg>
        </YStack>
      </XStack>

      <YStack
        backgroundColor="rgba(255,255,255,0.12)"
        borderRadius={12}
        padding="$3"
        gap={4}
        borderWidth={1}
        borderColor="rgba(255,255,255,0.2)"
      >
        <XStack alignItems="flex-start" gap="$2">
          <Ionicons
            name="card-outline"
            size={18}
            color={ColorWarning.warning400}
            style={{ marginTop: 1 }}
          />
          <YStack flex={1} gap={2}>
            <TextBodySm fontWeight="600" color={ColorBase.white}>
              Modal awal direkomendasikan Rp 500.000
            </TextBodySm>
            <TextCaption color={ColorPrimary.primary200}>
              Jumlah ini akan dipakai sebagai saldo awal laci kasir saat shift
              dibuka.
            </TextCaption>
          </YStack>
        </XStack>
      </YStack>

      <AppButton
        variant="success"
        size="lg"
        fullWidth
        title="Mulai Shift Sekarang"
        icon={
          <Ionicons name="play-outline" size={18} color={ColorBase.white} />
        }
        onPress={onStart}
      />
    </YStack>
  );
}
