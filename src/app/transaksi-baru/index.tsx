import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH3,
} from "@/components";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryFilter = "Semua" | "Makanan" | "Minuman" | "Snack";
type StockStatus = "normal" | "low" | "empty";

interface VariantOption {
  id: string;
  label: string;
  priceAdd: number;
}

interface VariantGroup {
  name: string;
  options: VariantOption[];
}

interface CatalogProduct {
  id: string;
  name: string;
  category: "Makanan" | "Minuman" | "Snack";
  basePrice: number;
  stockStatus: StockStatus;
  variants?: VariantGroup[];
}

interface CartItem {
  cartId: string;
  productId: string;
  productName: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PRODUCTS: CatalogProduct[] = [
  {
    id: "1",
    name: "Es Kopi Susu Gula Aren",
    category: "Minuman",
    basePrice: 18000,
    stockStatus: "normal",
  },
  {
    id: "2",
    name: "Nasi Ayam Crispy Sambal",
    category: "Makanan",
    basePrice: 22000,
    stockStatus: "normal",
  },
  {
    id: "3",
    name: "Keripik Kentang BBQ",
    category: "Snack",
    basePrice: 12000,
    stockStatus: "low",
  },
  {
    id: "4",
    name: "Air Mineral 600ml",
    category: "Minuman",
    basePrice: 5000,
    stockStatus: "empty",
  },
  {
    id: "5",
    name: "Kopi Susu",
    category: "Minuman",
    basePrice: 15000,
    stockStatus: "normal",
    variants: [
      {
        name: "Ukuran",
        options: [
          { id: "s", label: "Small", priceAdd: 0 },
          { id: "m", label: "Medium", priceAdd: 5000 },
          { id: "l", label: "Large", priceAdd: 10000 },
        ],
      },
      {
        name: "Suhu",
        options: [
          { id: "hot", label: "Hot", priceAdd: 0 },
          { id: "ice", label: "Ice", priceAdd: 2000 },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Nasi Goreng Spesial",
    category: "Makanan",
    basePrice: 25000,
    stockStatus: "normal",
  },
  {
    id: "7",
    name: "Teh Tarik",
    category: "Minuman",
    basePrice: 10000,
    stockStatus: "normal",
  },
  {
    id: "8",
    name: "Kentang Goreng",
    category: "Snack",
    basePrice: 12000,
    stockStatus: "normal",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_BG: Record<string, string> = {
  Makanan: "#FFEDD5",
  Minuman: "#DBEAFE",
  Snack: "#FEF3C7",
};

const CATEGORY_ICON: Record<
  string,
  React.ComponentProps<typeof Ionicons>["name"]
> = {
  Makanan: "restaurant-outline",
  Minuman: "cafe-outline",
  Snack: "pizza-outline",
};

const CATEGORY_ICON_COLOR: Record<string, string> = {
  Makanan: "#EA580C",
  Minuman: "#2563EB",
  Snack: "#D97706",
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 16 * 2 - 12) / 2;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onAdd,
}: {
  product: CatalogProduct;
  onAdd: (product: CatalogProduct) => void;
}) {
  const isEmpty = product.stockStatus === "empty";
  const isLow = product.stockStatus === "low";

  return (
    <View
      style={[
        styles.card,
        { width: CARD_WIDTH },
        isEmpty && { opacity: 0.85 },
      ]}
    >
      {/* Image area */}
      <View
        style={[
          styles.cardImageArea,
          { backgroundColor: CATEGORY_BG[product.category] },
          isEmpty && { opacity: 0.5 },
        ]}
      >
        <Ionicons
          name={CATEGORY_ICON[product.category]}
          size={52}
          color={CATEGORY_ICON_COLOR[product.category]}
        />

        {isLow && (
          <View style={[styles.stockBadge, { backgroundColor: "#F59E0B" }]}>
            <TextCaption fontWeight="700" color="white" fontSize={11}>
              Stok Tipis
            </TextCaption>
          </View>
        )}
        {isEmpty && (
          <View style={[styles.stockBadge, { backgroundColor: "#9CA3AF" }]}>
            <TextCaption fontWeight="700" color="white" fontSize={11}>
              Habis
            </TextCaption>
          </View>
        )}
      </View>

      {/* Info area */}
      <YStack padding={12} gap={8}>
        <TextBodyLg
          fontWeight="700"
          numberOfLines={2}
          lineHeight={20}
          color={isEmpty ? "$colorTertiary" : "$color"}
        >
          {product.name}
        </TextBodyLg>
        <XStack alignItems="center" justifyContent="space-between">
          <TextBodySm
            fontWeight="700"
            color={isEmpty ? "$colorTertiary" : "$primary"}
          >
            {formatPrice(product.basePrice)}
          </TextBodySm>

          <TouchableOpacity
            onPress={() => !isEmpty && onAdd(product)}
            disabled={isEmpty}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.addButton,
                { backgroundColor: isEmpty ? "#E5E7EB" : "#2563EB" },
              ]}
            >
              <Ionicons
                name="add"
                size={20}
                color={isEmpty ? "#9CA3AF" : "white"}
              />
            </View>
          </TouchableOpacity>
        </XStack>
      </YStack>
    </View>
  );
}

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
                { backgroundColor: CATEGORY_BG[product.category] },
              ]}
            >
              <Ionicons
                name={CATEGORY_ICON[product.category]}
                size={28}
                color={CATEGORY_ICON_COLOR[product.category]}
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
              placeholderTextColor="#9CA3AF"
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
                <Ionicons name="remove" size={20} color="#374151" />
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
                <Ionicons name="add" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </XStack>

          {/* Add to cart button */}
          <TouchableOpacity activeOpacity={0.85} onPress={handleAdd}>
            <View style={styles.addToCartButton}>
              <TextBodyLg fontWeight="700" color="white" fontSize={16}>
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
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>("Semua");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [variantProduct, setVariantProduct] = useState<CatalogProduct | null>(
    null
  );
  const [sheetVisible, setSheetVisible] = useState(false);

  const filtered =
    categoryFilter === "Semua"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === categoryFilter);

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
        quantity: 1,
        unitPrice: product.basePrice,
      });
    }
  }

  function addToCart(item: Omit<CartItem, "cartId">) {
    const existing = cart.find(
      (c) =>
        c.productId === item.productId && c.variantLabel === item.variantLabel
    );
    if (existing) {
      setCart((prev) =>
        prev.map((c) =>
          c.cartId === existing.cartId
            ? { ...c, quantity: c.quantity + item.quantity }
            : c
        )
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
                <Ionicons name="cart-outline" size={20} color="#374151" />
              </View>
              {totalItems > 0 && (
                <View style={styles.cartBadge}>
                  <TextCaption
                    fontWeight="700"
                    color="white"
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
            backgroundColor="white"
            borderRadius={12}
            height={48}
            alignItems="center"
            paddingHorizontal="$3"
            gap="$2"
            borderWidth={1}
            borderColor="$borderColor"
          >
            <Ionicons name="search-outline" size={18} color="#9CA3AF" />
            <TextBodyLg color="$colorTertiary" flex={1}>
              Cari produk atau scan barcode...
            </TextBodyLg>
            <Ionicons name="barcode-outline" size={20} color="#6B7280" />
          </XStack>

          {/* Category filters */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap="$2">
              {(
                ["Semua", "Makanan", "Minuman", "Snack"] as CategoryFilter[]
              ).map((c) => (
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
                product={product}
                onAdd={handleAddProduct}
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
              <Ionicons name="bag-outline" size={20} color="#2563EB" />
            </View>
            <YStack flex={1} gap={2}>
              <TextBodySm color="$colorSecondary">{totalItems} item</TextBodySm>
              <TextBodyLg fontWeight="700" color="$primary">
                {formatPrice(totalPrice)}
              </TextBodyLg>
            </YStack>
            <TouchableOpacity activeOpacity={0.85}>
              <View style={styles.cartBarButton}>
                <TextBodyLg fontWeight="700" color="white">
                  Lihat Keranjang
                </TextBodyLg>
                <Ionicons name="arrow-forward" size={16} color="white" />
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
    backgroundColor: "#F8FAFF",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImageArea: {
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  stockBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
    backgroundColor: "#2563EB",
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
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  cartBarInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cartBarIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  cartBarButton: {
    backgroundColor: "#2563EB",
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
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
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
    borderColor: "#E5E7EB",
    backgroundColor: "white",
  },
  variantChipSelected: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  noteInput: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 4,
  },
  noteInputText: {
    fontSize: 14,
    color: "#111827",
  },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonPrimary: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  addToCartButton: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
