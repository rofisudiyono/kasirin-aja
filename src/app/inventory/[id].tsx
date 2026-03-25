import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { productDetails } from "@/features/inventory/api/inventory.data";
import {
  ProductDetailHeader,
  ProductHero,
  ProductInfoCard,
  ProductOtherInfo,
  ProductVariants,
} from "@/features/inventory/components/product-detail";
import { AppButton, TextBodyLg } from "@/shared/components";
import { ColorBase, ColorNeutral } from "@/shared/themes/Colors";

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
      <ProductDetailHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductHero
          category={product.category}
          status={product.status}
          hasVariants={!!product.variants}
        />

        <ProductInfoCard product={product} margin={margin} />

        {product.variants && (
          <ProductVariants
            variants={product.variants}
            totalStock={product.totalStock}
            sellPrice={product.sellPrice}
            lowStockThreshold={product.lowStockThreshold}
          />
        )}

        <ProductOtherInfo
          createdAt={product.createdAt}
          updatedAt={product.updatedAt}
          totalSold={product.totalSold}
        />

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
