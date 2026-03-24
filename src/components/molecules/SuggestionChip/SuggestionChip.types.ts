import type { StyleProp, ViewStyle } from "react-native";

export interface SuggestionChipProps {
  amount: number;
  selected: boolean;
  onPress: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}
