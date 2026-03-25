import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { YStack } from "tamagui";

import { TextBodySm, TextCaption } from "@/shared/components";
import { orderTypeOptions } from "@/features/payment/api/payment.data";
import {
  ColorBase,
  ColorNeutral,
  ColorPrimary,
} from "@/shared/themes/Colors";
import type { OrderType } from "@/shared/types";

interface CustomerInfoCardProps {
  customerName: string;
  onCustomerNameChange: (v: string) => void;
  tableNumber: string;
  onTableNumberChange: (v: string) => void;
  orderType: OrderType;
  onOrderTypeChange: (v: OrderType) => void;
}

export function CustomerInfoCard({
  customerName,
  onCustomerNameChange,
  tableNumber,
  onTableNumberChange,
  orderType,
  onOrderTypeChange,
}: CustomerInfoCardProps) {
  return (
    <View style={styles.card}>
      <TextCaption color="$colorSecondary" marginBottom={6}>
        Nama Pelanggan
      </TextCaption>
      <TextInput
        value={customerName}
        onChangeText={onCustomerNameChange}
        placeholder="Opsional"
        placeholderTextColor={ColorNeutral.neutral400}
        style={styles.inputField}
      />

      <TextCaption color="$colorSecondary" marginBottom={6} marginTop={12}>
        Nomor Meja
      </TextCaption>
      <TextInput
        value={tableNumber}
        onChangeText={onTableNumberChange}
        placeholder="Opsional"
        placeholderTextColor={ColorNeutral.neutral400}
        style={styles.inputField}
        keyboardType="number-pad"
      />

      <TextCaption color="$colorSecondary" marginBottom={8} marginTop={12}>
        Tipe Pesanan
      </TextCaption>
      <View style={styles.segmentControl}>
        {orderTypeOptions.map((type) => (
          <TouchableOpacity
            key={type}
            activeOpacity={0.8}
            style={[
              styles.segmentBtn,
              orderType === type && styles.segmentBtnActive,
            ]}
            onPress={() => onOrderTypeChange(type)}
          >
            <TextBodySm
              fontWeight="600"
              color={orderType === type ? ColorBase.white : "$colorSecondary"}
            >
              {type}
            </TextBodySm>
          </TouchableOpacity>
        ))}
      </View>
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
  inputField: {
    backgroundColor: ColorNeutral.neutral50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ColorNeutral.neutral200,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: ColorNeutral.neutral900,
    fontFamily: "Poppins_400Regular",
  },
  segmentControl: {
    flexDirection: "row",
    backgroundColor: ColorNeutral.neutral100,
    borderRadius: 24,
    padding: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 20,
  },
  segmentBtnActive: {
    backgroundColor: ColorPrimary.primary600,
  },
});
