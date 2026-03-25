import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Separator, XStack, YStack } from "tamagui";

import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/config/categoryStyles";
import { CategoryBadge } from "@/features/catalog/components/CategoryBadge";
import { productDetails } from "@/features/inventory/api/inventory.data";
import {
  AppButton,
  IconButton,
  ShadowCard,
  TextBody,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH1,
  TextH3,
  TextMicro,
} from "@/shared/components";
import {
  ColorBase,
  ColorGreen,
  ColorNeutral,
  ColorPrimary,
  ColorWarning,
} from "@/shared/themes/Colors";
import type { ProductCategory } from "@/shared/types";

function heroBgColor(category: ProductCategory): string {
  return CATEGORY_COLORS[category]?.bg ?? ColorNeutral.neutral100;
}

function heroBgIconColor(category: ProductCategory): string {
  return CATEGORY_COLORS[category]?.color ?? ColorNeutral.neutral400;
}

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const product = productDetails[id ?? ""];

  if (!product) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: ColorBase.bgScreen }}>
        <YStack flex={1} alignItems="center" justifyContent="center" gap="$3">
          <Ionicons
            name="cube-outline"
            size={48}
            color={ColorNeutral.neutral300}
          />
          <TextBodyLg color={ColorNeutral.neutral400}>
            Produk tidak ditemukan
          </TextBodyLg>
          <AppButton
            variant="outline"
            size="sm"
            title="Kembali"
            onPress={() => router.back()}
          />
        </YStack>
      </SafeAreaView>
    );
  }

  const margin = Math.round(
    ((product.sellPrice - product.costPrice) / product.sellPrice) * 100,
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: ColorBase.bgScreen }}
      edges={["top"]}
    >
      {/* ── Header ── */}
      <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
        gap="$3"
        backgroundColor={ColorBase.white}
      >
        <IconButton iconName="arrow-back" onPress={() => router.back()} />
        <TextH3 fontWeight="700" flex={1} textAlign="center">
          Detail Produk
        </TextH3>
        <IconButton iconName="create-outline" />
        <IconButton iconName="ellipsis-vertical" />
      </XStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Hero ── */}
        <YStack
          height={220}
          backgroundColor={heroBgColor(product.category)}
          alignItems="center"
          justifyContent="center"
        >
          <Ionicons
            name={CATEGORY_ICONS[product.category] ?? "cube-outline"}
            size={88}
            color={heroBgIconColor(product.category)}
          />

          {/* Status badge */}
          <YStack
            position="absolute"
            top={16}
            left={16}
            backgroundColor={
              product.status === "active"
                ? ColorGreen.green600
                : ColorNeutral.neutral500
            }
            borderRadius={20}
            paddingHorizontal={12}
            paddingVertical={5}
          >
            <TextMicro fontWeight="700" color={ColorBase.white}>
              {product.status === "active" ? "Aktif" : "Nonaktif"}
            </TextMicro>
          </YStack>

          {/* Variant badge */}
          {product.variants && (
            <YStack
              position="absolute"
              top={16}
              right={16}
              backgroundColor={ColorPrimary.primary600}
              borderRadius={20}
              paddingHorizontal={12}
              paddingVertical={5}
            >
              <TextMicro fontWeight="700" color={ColorBase.white}>
                Variant
              </TextMicro>
            </YStack>
          )}
        </YStack>

        {/* ── Product Info Card ── */}
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
              <TextCaption color={ColorNeutral.neutral500}>
                Harga Modal
              </TextCaption>
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
            <TextBody color={ColorNeutral.neutral700}>
              {product.description}
            </TextBody>
          </YStack>
        </YStack>

        {/* ── Variants ── */}
        {product.variants && (
          <YStack
            backgroundColor={ColorBase.white}
            marginTop="$2"
            paddingHorizontal="$4"
            paddingVertical="$4"
            gap="$4"
          >
            <XStack alignItems="center" justifyContent="space-between">
              <TextBodyLg fontWeight="700">Variant Produk</TextBodyLg>
              <TouchableOpacity>
                <TextBodySm fontWeight="600" color={ColorPrimary.primary600}>
                  Kelola →
                </TextBodySm>
              </TouchableOpacity>
            </XStack>

            {product.variants.map((group) => (
              <YStack key={group.name} gap="$2">
                <TextBodySm fontWeight="600" color={ColorNeutral.neutral500}>
                  {group.name}
                </TextBodySm>
                <ShadowCard overflow="hidden">
                  {group.options.map((opt, idx) => {
                    const isLow =
                      opt.stock > 0 && opt.stock <= product.lowStockThreshold;

                    const priceText =
                      group.priceMode === "total"
                        ? formatRupiah(product.sellPrice + opt.priceAdd)
                        : opt.priceAdd > 0
                          ? `+${formatRupiah(opt.priceAdd)}`
                          : null;

                    return (
                      <React.Fragment key={opt.id}>
                        {idx > 0 && (
                          <Separator
                            borderColor="$borderColor"
                            marginHorizontal="$3"
                          />
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
                            <TextBodySm fontWeight="600">
                              {opt.label}
                            </TextBodySm>
                          </YStack>

                          <TextBodySm
                            flex={1}
                            fontWeight={isLow ? "700" : "400"}
                            color={
                              isLow
                                ? ColorWarning.warning600
                                : ColorNeutral.neutral700
                            }
                          >
                            {[priceText, `Stok: ${opt.stock}`]
                              .filter(Boolean)
                              .join(" • ")}
                          </TextBodySm>

                          {isLow ? (
                            <Ionicons
                              name="warning-outline"
                              size={16}
                              color={ColorWarning.warning500}
                            />
                          ) : (
                            <Ionicons
                              name="chevron-forward"
                              size={16}
                              color={ColorNeutral.neutral400}
                            />
                          )}
                        </XStack>
                      </React.Fragment>
                    );
                  })}
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
                Total Stok: {product.totalStock} unit
              </TextBodySm>
            </YStack>
          </YStack>
        )}

        {/* ── Info ── */}
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
            <TextBodySm fontWeight="500">{product.createdAt}</TextBodySm>
          </XStack>
          <XStack justifyContent="space-between" alignItems="center">
            <TextBodySm color={ColorNeutral.neutral500}>Diperbarui</TextBodySm>
            <TextBodySm fontWeight="500">{product.updatedAt}</TextBodySm>
          </XStack>
          <XStack justifyContent="space-between" alignItems="center">
            <TextBodySm color={ColorNeutral.neutral500}>
              Total Terjual
            </TextBodySm>
            <TextBodySm fontWeight="700" color={ColorPrimary.primary600}>
              {product.totalSold} item
            </TextBodySm>
          </XStack>
        </YStack>

        {/* spacer for bottom button */}
        <YStack height={100} />
      </ScrollView>

      {/* ── Bottom Button ── */}
      <YStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        paddingHorizontal="$4"
        paddingBottom="$8"
        paddingTop="$3"
        backgroundColor={ColorBase.white}
        borderTopWidth={1}
        borderTopColor={ColorNeutral.neutral200}
      >
        <AppButton
          variant="primary"
          size="lg"
          fullWidth
          title="Edit Produk"
          onPress={() => router.push("/inventory/tambah-produk")}
        />
      </YStack>
    </SafeAreaView>
  );
}
