import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { cartAtom, type CartItem } from "@/features/cart/store/cart.store";
import { catalogProducts } from "@/features/catalog/api/catalog.data";
import {
  CartBar,
  CartIconButton,
  ProductGrid,
  SearchBar,
  VariantSheet,
} from "@/features/transactions/components/transaksi-baru";
import { IconButton, PageHeader } from "@/shared/components";
import { ColorBase } from "@/shared/themes/Colors";
import type { CatalogProduct, CategoryFilter } from "@/shared/types";

export default function TransaksiBaruPage() {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Semua");
  const [cart, setCart] = useAtom(cartAtom);
  const [variantProduct, setVariantProduct] = useState<CatalogProduct | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const filtered =
    categoryFilter === "Semua"
      ? catalogProducts
      : catalogProducts.filter((p) => p.category === categoryFilter);

  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);
  const totalPrice = cart.reduce((s, c) => s + c.unitPrice * c.quantity, 0);

  function handleAddProduct(product: CatalogProduct) {
    if (product.variants) {
      setVariantProduct(product);
      setSheetVisible(true);
    } else {
      addToCart({
        productId: product.id,
        productName: product.name,
        category: product.category,
        quantity: 1,
        unitPrice: product.basePrice,
      });
    }
  }

  function addToCart(item: Omit<CartItem, "cartId">) {
    const existing = cart.find(
      (c) =>
        c.productId === item.productId && c.variantLabel === item.variantLabel,
    );
    if (existing) {
      setCart((prev) =>
        prev.map((c) =>
          c.cartId === existing.cartId
            ? { ...c, quantity: c.quantity + item.quantity }
            : c,
        ),
      );
    } else {
      setCart((prev) => [
        ...prev,
        { ...item, cartId: `${item.productId}-${Date.now()}` },
      ]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader
        title="Transaksi Baru"
        showBack
        onBack={() => router.back()}
        actions={
          <>
            <IconButton iconName="scan-outline" />
            <CartIconButton totalItems={totalItems} />
          </>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: totalItems > 0 ? 120 : 32 }}
      >
        <YStack paddingHorizontal="$4" gap="$3">
          <SearchBar />
          <ProductGrid
            products={filtered}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            onAddProduct={handleAddProduct}
          />
        </YStack>
      </ScrollView>

      <CartBar
        totalItems={totalItems}
        totalPrice={totalPrice}
        onPress={() => router.push("/keranjang")}
      />

      <VariantSheet
        product={variantProduct}
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        onAddToCart={addToCart}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorBase.bgScreen,
  },
});
