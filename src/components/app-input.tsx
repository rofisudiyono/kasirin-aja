import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Text, XStack, YStack } from "tamagui";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

type AppInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  hint?: string;
  leftIcon?: IoniconsName;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  hint,
  leftIcon,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
}: AppInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = secureTextEntry;

  return (
    <YStack gap="$2">
      <Text fontFamily="$body" fontSize="$md" fontWeight="600" color="$color">
        {label}
      </Text>
      <XStack
        borderWidth={1}
        borderColor={isFocused ? "$primary" : "$borderColor"}
        borderRadius="$4"
        height={48}
        alignItems="center"
        paddingHorizontal="$3"
        gap="$2"
        backgroundColor="$background"
      >
        {leftIcon && (
          <Ionicons name={leftIcon} size={16} color="#9CA3AF" />
        )}
        <TextInput
          style={{
            flex: 1,
            fontSize: 15,
            color: "#111827",
            paddingVertical: 0,
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={18}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </XStack>
      {hint && (
        <Text fontFamily="$body" fontSize={11} color="$colorTertiary">
          {hint}
        </Text>
      )}
    </YStack>
  );
}
