import type { Ionicons } from "@expo/vector-icons";
import type { StyleProp, ViewStyle } from "react-native";

export type ProductStockStatus = "normal" | "low" | "empty";

export interface ProductCardProps {
  name: string;
  basePrice: number;
  categoryIcon: React.ComponentProps<typeof Ionicons>["name"];
  categoryIconBg: string;
  categoryIconColor: string;
  stockStatus: ProductStockStatus;
  onAdd: () => void;
  width?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}
