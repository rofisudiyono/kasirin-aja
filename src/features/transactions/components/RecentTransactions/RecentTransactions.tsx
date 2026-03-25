import React from "react";
import { View } from "react-native";
import { XStack, YStack } from "tamagui";

import { ShadowCard, TextBodyLg, TextBodySm, TextCaption, TextH3 } from "@/shared/components";
import { ColorDanger, ColorGreen, ColorNeutral, ColorSuccess } from "@/shared/themes/Colors";
import { recentTransactions } from "@/features/transactions/api/transactions.data";

function StatusBadge({ status }: { status: string }) {
  const isVoid = status === "Void";
  const bg = isVoid ? ColorDanger.danger100 : ColorGreen.green100;
  const color = isVoid ? ColorDanger.danger600 : ColorSuccess.success600;
  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 5,
      }}
    >
      <TextBodySm fontWeight="600" color={color}>
        {status}
      </TextBodySm>
    </View>
  );
}

export function RecentTransactions() {
  return (
    <YStack gap="$2">
      <TextH3 fontWeight="700">Transaksi Terakhir</TextH3>
      <ShadowCard overflow="hidden">
        {recentTransactions.map((trx, idx) => (
          <React.Fragment key={trx.id}>
            {idx > 0 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: ColorNeutral.neutral200,
                  marginHorizontal: 16,
                }}
              />
            )}
            <XStack paddingHorizontal="$4" paddingVertical="$3" alignItems="center">
              <YStack flex={1} gap={2}>
                <TextBodyLg fontWeight="700">{trx.id}</TextBodyLg>
                <TextCaption color="$colorSecondary">{trx.time}</TextCaption>
              </YStack>
              <XStack alignItems="center" gap="$3">
                <TextBodyLg fontWeight="700">{trx.amount}</TextBodyLg>
                <StatusBadge status={trx.status} />
              </XStack>
            </XStack>
          </React.Fragment>
        ))}
      </ShadowCard>
    </YStack>
  );
}
