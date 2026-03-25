import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { YStack } from "tamagui";

import { TextBody } from "@/shared/components";
import type { CartItem } from "@/features/cart/store/cart.store";
import { CartItemRow } from "./CartItemRow";
import { ColorBase, ColorNeutral } from "@/shared/themes/Colors";

interface CartItemsCardProps {
  cart: CartItem[];
  onUpdateQty: (cartId: string, qty: number) => void;
  onRemove: (cartId: string) => void;
  onUpdateNote: (cartId: string, note: string) => void;
}

export function CartItemsCard({
  cart,
  onUpdateQty,
  onRemove,
  onUpdateNote,
}: CartItemsCardProps) {
  return (
    <View style={styles.card}>
      {cart.length === 0 ? (
        <YStack alignItems="center" paddingVertical={24} gap={8}>
          <Ionicons name="bag-outline" size={40} color={ColorNeutral.neutral400} />
          <TextBody color="$colorSecondary">Keranjang masih kosong</TextBody>
        </YStack>
      ) : (
        cart.map((item, index) => (
          <React.Fragment key={item.cartId}>
            <CartItemRow
              item={item}
              onUpdateQty={onUpdateQty}
              onRemove={onRemove}
              onUpdateNote={onUpdateNote}
            />
            {index < cart.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorBase.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: ColorBase.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: ColorNeutral.neutral100,
    marginVertical: 12,
  },
});
