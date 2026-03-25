import type { Ionicons } from "@expo/vector-icons";
import type { StyleProp, ViewStyle } from "react-native";

import type { PaymentMethod } from "@/shared/types";

export interface PaymentMethodCardProps {
  id: PaymentMethod;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}
