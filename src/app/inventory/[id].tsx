import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAtom } from "jotai";
import React from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import { productDetails } from "@/features/inventory/api/inventory.data";
import {
  ProductDetailHeader,
  ProductHero,
  ProductInfoCard,
  ProductOtherInfo,
  ProductVariants,
} from "@/features/inventory/components/product-detail";
import { userProductsAtom } from "@/features/inventory/store/inventory.store";
import { AppButton, TextBodyLg, TextBodySm } from "@/shared/components";
import {
  ColorBase,
  ColorDanger,
  ColorNeutral,
} from "@/shared/themes/Colors";


export default function ProductDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [userProducts, setUserProducts] = useAtom(userProductsAtom);

  // Look up in user-added products first, then fall back to static product details
  const userProduct = userProducts.find((p) => p.id === id);
  const staticProduct = id ? productDetails[id] : undefined;

  const isUserProduct = !!userProduct;

  // Build a unified ProductDetail-like object from either source
  const product = staticProduct ?? (userProduct
    ? {
        id: userProduct.id,
        name: userProduct.name,
        category: userProduct.category,
        sku: userProduct.sku,
        costPrice: 0,
        sellPrice: Number(userProduct.price.replace(/[^0-9]/g, "")),
        status: (userProduct.stockStatus === "inactive" ? "inactive" : "active") as "active" | "inactive",
        description: "",
        totalStock: userProduct.stock,
        lowStockThreshold: 5,
        createdAt: "-",
        updatedAt: "-",
        totalSold: 0,
        variants: undefined,
      }
    : undefined);

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

  const margin = product.sellPrice > 0
    ? Math.round(
        ((product.sellPrice - product.costPrice) / product.sellPrice) * 100,
      )
    : 0;

  function handleEdit() {
    router.push({ pathname: "/inventory/tambah-produk", params: { editId: id } });
  }

  function handleDelete() {
    if (!isUserProduct) {
      Alert.alert("Info", "Produk bawaan tidak dapat dihapus.");
      return;
    }
    Alert.alert(
      "Hapus Produk",
      `Hapus produk "${product?.name}"? Tindakan ini tidak dapat dibatalkan.`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => {
            setUserProducts((prev) => prev.filter((p) => p.id !== id));
            router.back();
          },
        },
      ],
    );
  }

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

      {/* ── Bottom Buttons ── */}
      <View style={styles.bottomBar}>
        <XStack gap={12}>
          {isUserProduct && (
            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={18} color={ColorDanger.danger600} />
              <TextBodySm fontWeight="700" color={ColorDanger.danger600}>
                Hapus
              </TextBodySm>
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }}>
            <AppButton
              variant="primary"
              size="lg"
              fullWidth
              title="Edit Produk"
              onPress={handleEdit}
            />
          </View>
        </XStack>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 12,
    backgroundColor: ColorBase.white,
    borderTopWidth: 1,
    borderTopColor: ColorNeutral.neutral200,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    height: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: ColorDanger.danger200,
    backgroundColor: ColorDanger.danger50,
  },
});
