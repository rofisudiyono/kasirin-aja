import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  FilterChip,
  IconButton,
  PageHeader,
  ProductCard,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH3,
} from "@/components/index";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/constants/categoryStyles";
import { catalogProducts } from "@/data/catalog";
import { categoryFilters } from "@/data/category.data";
import { cartAtom, type CartItem } from "@/store/cart";
import { ColorBase, ColorNeutral, ColorPrimary } from "@/themes/Colors";
import type { CatalogProduct, CategoryFilter } from "@/types";
import { formatPrice } from "@/utils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 16 * 2 - 12) / 2;

// ─── Variant Bottom Sheet ─────────────────────────────────────────────────────

function VariantSheet({
  product,
  visible,
  onClose,
  onAddToCart,
}: {
  product: CatalogProduct | null;
  visible: boolean;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, "cartId">) => void;
}) {
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [note, setNote] = useState("");
  const [qty, setQty] = useState(1);

  React.useEffect(() => {
    if (product?.variants) {
      const defaults: Record<string, string> = {};
      product.variants.forEach((group) => {
        defaults[group.name] = group.options[0].id;
      });
      setSelectedVariants(defaults);
    }
    setNote("");
    setQty(1);
  }, [product]);

  if (!product) return null;

  const totalAddon = product.variants
    ? product.variants.reduce((sum, group) => {
        const selectedId = selectedVariants[group.name];
        const opt = group.options.find((o) => o.id === selectedId);
        return sum + (opt?.priceAdd ?? 0);
      }, 0)
    : 0;

  const unitPrice = product.basePrice + totalAddon;
  const total = unitPrice * qty;

  const variantLabel = product.variants
    ? product.variants
        .map((g) => {
          const opt = g.options.find((o) => o.id === selectedVariants[g.name]);
          return opt?.label ?? "";
        })
        .filter(Boolean)
        .join(", ")
    : undefined;

  function handleAdd() {
    onAddToCart({
      productId: product!.id,
      productName: product!.name,
      category: product!.category,
      variantLabel,
      quantity: qty,
      unitPrice,
    });
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.sheet}>
          {/* Drag handle */}
          <View style={styles.dragHandle} />

          {/* Product header */}
          <XStack gap="$3" alignItems="center" marginBottom="$2">
            <View
              style={[
                styles.sheetProductImage,
                { backgroundColor: CATEGORY_COLORS[product.category].bg },
              ]}
            >
              <Ionicons
                name={CATEGORY_ICONS[product.category]}
                size={28}
                color={CATEGORY_COLORS[product.category].color}
              />
            </View>
            <YStack gap={2}>
              <TextBodyLg fontWeight="700">{product.name}</TextBodyLg>
              <TextBodySm color="$colorSecondary">
                Mulai {formatPrice(product.basePrice)}
              </TextBodySm>
            </YStack>
          </XStack>

          {/* Variant groups */}
          {product.variants?.map((group) => (
            <YStack key={group.name} gap="$2" marginBottom="$3">
              <TextBodyLg fontWeight="700">{group.name}</TextBodyLg>
              <XStack flexWrap="wrap" gap="$2">
                {group.options.map((opt) => {
                  const isSelected = selectedVariants[group.name] === opt.id;
                  const optLabel =
                    opt.priceAdd > 0
                      ? `${opt.label} +${formatPrice(opt.priceAdd)}`
                      : opt.label;
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      activeOpacity={0.7}
                      onPress={() =>
                        setSelectedVariants((prev) => ({
                          ...prev,
                          [group.name]: opt.id,
                        }))
                      }
                    >
                      <View
                        style={[
                          styles.variantChip,
                          isSelected && styles.variantChipSelected,
                        ]}
                      >
                        <TextBodySm
                          fontWeight="600"
                          color={isSelected ? "$primary" : "$colorSecondary"}
                        >
                          {optLabel}
                        </TextBodySm>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </XStack>
            </YStack>
          ))}

          {/* Total */}
          <TextBodyLg
            fontWeight="700"
            color="$primary"
            textAlign="center"
            fontSize={18}
            marginBottom="$3"
          >
            Total: {formatPrice(unitPrice)}
          </TextBodyLg>

          {/* Note input */}
          <View style={styles.noteInput}>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Tambah catatan... (opsional)"
              placeholderTextColor={ColorNeutral.neutral400}
              style={styles.noteInputText}
            />
          </View>

          {/* Quantity */}
          <XStack
            alignItems="center"
            justifyContent="center"
            gap="$5"
            marginVertical="$3"
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setQty((q) => Math.max(1, q - 1))}
            >
              <View style={styles.qtyButton}>
                <Ionicons
                  name="remove"
                  size={20}
                  color={ColorNeutral.neutral700}
                />
              </View>
            </TouchableOpacity>

            <TextH3 fontWeight="700" minWidth={32} textAlign="center">
              {qty}
            </TextH3>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setQty((q) => q + 1)}
            >
              <View style={[styles.qtyButton, styles.qtyButtonPrimary]}>
                <Ionicons name="add" size={20} color={ColorBase.white} />
              </View>
            </TouchableOpacity>
          </XStack>

          {/* Add to cart button */}
          <TouchableOpacity activeOpacity={0.85} onPress={handleAdd}>
            <View style={styles.addToCartButton}>
              <TextBodyLg
                fontWeight="700"
                color={ColorBase.white}
                fontSize={16}
              >
                Tambah ke Keranjang • {formatPrice(total)}
              </TextBodyLg>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TransaksiBaruPage() {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Semua");
  const [cart, setCart] = useAtom(cartAtom);
  const [variantProduct, setVariantProduct] = useState<CatalogProduct | null>(
    null,
  );
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
      {/* Header */}
      <PageHeader
        title="Transaksi Baru"
        showBack
        onBack={() => router.back()}
        actions={
          <>
            <IconButton iconName="scan-outline" />
            <View style={styles.cartIconWrapper}>
              <View style={styles.cartIconBtn}>
                <Ionicons
                  name="cart-outline"
                  size={20}
                  color={ColorNeutral.neutral700}
                />
              </View>
              {totalItems > 0 && (
                <View style={styles.cartBadge}>
                  <TextCaption
                    fontWeight="700"
                    color={ColorBase.white}
                    fontSize={10}
                    lineHeight={14}
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </TextCaption>
                </View>
              )}
            </View>
          </>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: totalItems > 0 ? 120 : 32 }}
      >
        <YStack paddingHorizontal="$4" gap="$3">
          {/* Search bar */}
          <XStack
            backgroundColor={ColorBase.white}
            borderRadius={12}
            height={48}
            alignItems="center"
            paddingHorizontal="$3"
            gap="$2"
            borderWidth={1}
            borderColor="$borderColor"
          >
            <Ionicons
              name="search-outline"
              size={18}
              color={ColorNeutral.neutral400}
            />
            <TextBodyLg color="$colorTertiary" flex={1}>
              Cari produk atau scan barcode...
            </TextBodyLg>
            <Ionicons
              name="barcode-outline"
              size={20}
              color={ColorNeutral.neutral500}
            />
          </XStack>

          {/* Category filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap="$2">
              {categoryFilters.map((c) => (
                <FilterChip
                  key={c}
                  label={c}
                  active={categoryFilter === c}
                  onPress={() => setCategoryFilter(c)}
                  paddingH={14}
                />
              ))}
            </XStack>
          </ScrollView>

          {/* Product grid */}
          <XStack flexWrap="wrap" gap={12}>
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                basePrice={product.basePrice}
                categoryIcon={CATEGORY_ICONS[product.category]}
                categoryIconBg={CATEGORY_COLORS[product.category].bg}
                categoryIconColor={CATEGORY_COLORS[product.category].color}
                stockStatus={product.stockStatus}
                width={CARD_WIDTH}
                onAdd={() => handleAddProduct(product)}
              />
            ))}
          </XStack>
        </YStack>
      </ScrollView>

      {/* Bottom cart bar */}
      {totalItems > 0 && (
        <View style={styles.cartBar}>
          <View style={styles.cartBarInner}>
            <View style={styles.cartBarIcon}>
              <Ionicons
                name="bag-outline"
                size={20}
                color={ColorPrimary.primary600}
              />
            </View>
            <YStack flex={1} gap={2}>
              <TextBodySm color="$colorSecondary">{totalItems} item</TextBodySm>
              <TextBodyLg fontWeight="700" color="$primary">
                {formatPrice(totalPrice)}
              </TextBodyLg>
            </YStack>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => router.push("/keranjang")}
            >
              <View style={styles.cartBarButton}>
                <TextBodyLg fontWeight="700" color={ColorBase.white}>
                  Lihat Keranjang
                </TextBodyLg>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={ColorBase.white}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Variant bottom sheet */}
      <VariantSheet
        product={variantProduct}
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        onAddToCart={addToCart}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorBase.bgScreen,
  },
  cartIconWrapper: {
    position: "relative",
    width: 40,
    height: 40,
  },
  cartIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ColorBase.white,
    borderWidth: 1,
    borderColor: ColorNeutral.neutral200,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: ColorPrimary.primary600,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 8,
    backgroundColor: ColorBase.white,
    borderTopWidth: 1,
    borderTopColor: ColorNeutral.neutral100,
  },
  cartBarInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: ColorBase.white,
    borderRadius: 16,
    padding: 12,
    shadowColor: ColorBase.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cartBarIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: ColorPrimary.primary50,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBarButton: {
    backgroundColor: ColorPrimary.primary600,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  // Sheet styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: ColorBase.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: ColorNeutral.neutral200,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetProductImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  variantChip: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: ColorNeutral.neutral200,
    backgroundColor: ColorBase.white,
  },
  variantChipSelected: {
    borderColor: ColorPrimary.primary600,
    backgroundColor: ColorPrimary.primary50,
  },
  noteInput: {
    backgroundColor: ColorNeutral.neutral100,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 4,
  },
  noteInputText: {
    fontSize: 14,
    color: ColorNeutral.neutral900,
  },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: ColorNeutral.neutral200,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonPrimary: {
    backgroundColor: ColorPrimary.primary600,
    borderColor: ColorPrimary.primary600,
  },
  addToCartButton: {
    backgroundColor: ColorPrimary.primary600,
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
