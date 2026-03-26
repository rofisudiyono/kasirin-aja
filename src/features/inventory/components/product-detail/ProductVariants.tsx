import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Separator, XStack, YStack } from "tamagui";

import { ShadowCard, TextBodyLg, TextBodySm } from "@/components";
import {
  ColorBase,
  ColorGreen,
  ColorNeutral,
  ColorPrimary,
  ColorWarning,
} from "@/themes/Colors";
import type { ProductDetail, ProductVariantGroup } from "@/types";

import { formatRupiah } from "./utils";

type Props = {
  variants: ProductVariantGroup[];
  totalStock: number;
  sellPrice: number;
  lowStockThreshold: number;
  productId?: string;
};

function VariantOptionRow({
  opt,
  group,
  sellPrice,
  lowStockThreshold,
  isFirst,
}: {
  opt: ProductDetail["variants"] extends (infer G)[]
    ? G extends { options: (infer O)[] }
      ? O
      : never
    : never;
  group: ProductVariantGroup;
  sellPrice: number;
  lowStockThreshold: number;
  isFirst: boolean;
}) {
  const isLow = opt.stock > 0 && opt.stock <= lowStockThreshold;
  const priceText =
    group.priceMode === "total"
      ? formatRupiah(sellPrice + opt.priceAdd)
      : opt.priceAdd > 0
        ? `+${formatRupiah(opt.priceAdd)}`
        : null;

  return (
    <React.Fragment>
      {!isFirst && (
        <Separator borderColor="$borderColor" marginHorizontal="$3" />
      )}
      <XStack
        paddingHorizontal="$3"
        paddingVertical="$3"
        alignItems="center"
        gap="$2"
      >
        <YStack
          backgroundColor={ColorNeutral.neutral100}
          borderRadius={20}
          paddingHorizontal={12}
          paddingVertical={4}
        >
          <TextBodySm fontWeight="600">{opt.label}</TextBodySm>
        </YStack>

        <TextBodySm
          flex={1}
          fontWeight={isLow ? "700" : "400"}
          color={isLow ? ColorWarning.warning600 : ColorNeutral.neutral700}
        >
          {[priceText, `Stok: ${opt.stock}`].filter(Boolean).join(" • ")}
        </TextBodySm>

        {isLow && (
          <Ionicons
            name="warning-outline"
            size={16}
            color={ColorWarning.warning500}
          />
        )}
      </XStack>
    </React.Fragment>
  );
}

export function ProductVariants({
  variants,
  totalStock,
  sellPrice,
  lowStockThreshold,
  productId,
}: Props) {
  const router = useRouter();

  function handleKelola() {
    router.push({
      pathname: "/inventory/tambah-produk",
      params: { editId: productId },
    });
  }

  return (
    <YStack
      backgroundColor={ColorBase.white}
      marginTop="$2"
      paddingHorizontal="$4"
      paddingVertical="$4"
      gap="$4"
    >
      <XStack alignItems="center" justifyContent="space-between">
        <TextBodyLg fontWeight="700">Variant Produk</TextBodyLg>
        <TouchableOpacity onPress={handleKelola} activeOpacity={0.7}>
          <XStack alignItems="center" gap={4}>
            <Ionicons name="pencil-outline" size={14} color={ColorPrimary.primary600} />
            <TextBodySm fontWeight="600" color={ColorPrimary.primary600}>
              Kelola
            </TextBodySm>
          </XStack>
        </TouchableOpacity>
      </XStack>

      {variants.map((group) => (
        <YStack key={group.name} gap="$2">
          <TextBodySm fontWeight="600" color={ColorNeutral.neutral500}>
            {group.name}
          </TextBodySm>
          <ShadowCard overflow="hidden">
            {group.options.map((opt, idx) => (
              <VariantOptionRow
                key={opt.id}
                opt={opt}
                group={group}
                sellPrice={sellPrice}
                lowStockThreshold={lowStockThreshold}
                isFirst={idx === 0}
              />
            ))}
          </ShadowCard>
        </YStack>
      ))}

      {/* Total stock banner */}
      <YStack
        backgroundColor={ColorGreen.green75}
        borderRadius={10}
        paddingVertical="$3"
        alignItems="center"
      >
        <TextBodySm fontWeight="700" color={ColorGreen.green600}>
          Total Stok: {totalStock} unit
        </TextBodySm>
      </YStack>
    </YStack>
  );
}
