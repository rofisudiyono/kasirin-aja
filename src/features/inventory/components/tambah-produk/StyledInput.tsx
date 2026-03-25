import React, { useState } from "react";
import { TextInput } from "react-native";
import { XStack } from "tamagui";

import { ColorBase, ColorNeutral, ColorPrimary } from "@/shared/themes/Colors";

import { inputStyle } from "./shared.styles";

interface StyledInputProps {
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  rightElement?: React.ReactNode;
  multiline?: boolean;
  keyboardType?: "default" | "numeric";
}

export function StyledInput({
  value,
  onChangeText,
  placeholder,
  rightElement,
  multiline,
  keyboardType,
}: StyledInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <XStack
      borderWidth={1.5}
      borderColor={focused ? ColorPrimary.primary600 : ColorNeutral.neutral200}
      borderRadius={10}
      backgroundColor={ColorBase.white}
      paddingHorizontal={14}
      paddingVertical={multiline ? 12 : 0}
      alignItems={multiline ? "flex-start" : "center"}
      minHeight={multiline ? 88 : 44}
    >
      <TextInput
        style={[
          inputStyle.input,
          multiline && { height: 64, textAlignVertical: "top" },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={ColorNeutral.neutral400}
        multiline={multiline}
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {rightElement}
    </XStack>
  );
}
