import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import {
  AppButton,
  AppInput,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextH3,
} from "@/shared/components";
import { useAuth } from "@/shared/lib/auth";
import {
  ColorBase,
  ColorGreen,
  ColorNeutral,
  ColorPrimary,
  ColorTeal,
  ColorWarning,
} from "@/shared/themes/Colors";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("budi.santoso@tokomakmur.id");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    login();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ColorPrimary.primary25 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header ── */}
          <YStack
            alignItems="center"
            paddingTop="$5"
            paddingBottom="$4"
            gap="$1"
          >
            <YStack
              width={56}
              height={56}
              borderRadius="$4"
              backgroundColor={ColorTeal.teal700}
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons
                name="storefront-outline"
                size={28}
                color={ColorBase.white}
              />
            </YStack>
            <TextH3 fontWeight="700" marginTop="$2">
              Kasir Toko Makmur
            </TextH3>
            <TextBodySm color="$colorSecondary">
              Masuk untuk mulai transaksi hari ini
            </TextBodySm>
          </YStack>

          {/* ── Form Card ── */}
          <YStack
            marginHorizontal="$4"
            marginTop="$4"
            backgroundColor="$background"
            borderRadius="$6"
            padding="$4"
            gap="$4"
            shadowColor={ColorNeutral.neutralShadow}
            shadowOpacity={0.2}
            shadowRadius={12}
            shadowOffset={{ width: 0, height: 2 }}
            elevation={3}
          >
            {/* Mode Kasir row */}
            <XStack
              backgroundColor="$backgroundSecondary"
              borderRadius="$4"
              padding="$3"
              alignItems="center"
              gap="$3"
            >
              <YStack
                width={36}
                height={36}
                borderRadius={18}
                backgroundColor={ColorGreen.green100}
                alignItems="center"
                justifyContent="center"
              >
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={ColorGreen.green600}
                />
              </YStack>
              <YStack flex={1}>
                <TextBodyLg fontWeight="600">Mode Kasir</TextBodyLg>
                <TextBodySm color="$colorSecondary">
                  Akun staf operasional toko
                </TextBodySm>
              </YStack>
              <AppButton variant="ghost" size="sm">
                Ganti
              </AppButton>
            </XStack>

            {/* Title */}
            <YStack gap="$1">
              <TextH3 fontWeight="700">Masuk ke akun kasir</TextH3>
              <TextBodySm color="$colorSecondary" lineHeight={18}>
                Gunakan akun yang sudah terdaftar untuk membuka shift dan
                memproses transaksi pelanggan.
              </TextBodySm>
            </YStack>

            {/* Email field */}
            <AppInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Email kasir aktif"
              hint="Email kasir aktif"
              leftIcon={
                <Ionicons
                  name="mail-outline"
                  size={16}
                  color={ColorNeutral.neutral400}
                />
              }
              keyboardType="email-address"
            />

            {/* Password field */}
            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Minimal 8 karakter"
              hint="Minimal 8 karakter"
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={16}
                  color={ColorNeutral.neutral400}
                />
              }
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color={ColorNeutral.neutral400}
                  />
                </TouchableOpacity>
              }
              secureTextEntry={!showPassword}
            />

            {/* Remember me + Forgot password */}
            <XStack alignItems="center" justifyContent="space-between">
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <YStack
                  width={20}
                  height={20}
                  borderRadius={4}
                  backgroundColor={
                    rememberMe ? "$primary" : ColorBase.transparent
                  }
                  borderWidth={2}
                  borderColor={rememberMe ? "$primary" : "$borderColor"}
                  alignItems="center"
                  justifyContent="center"
                >
                  {rememberMe && (
                    <TextBodySm color={ColorBase.white}>✓</TextBodySm>
                  )}
                </YStack>
                <TextBodySm color="$colorSecondary">
                  Ingat sesi perangkat ini
                </TextBodySm>
              </TouchableOpacity>
              <TouchableOpacity>
                <TextBodySm fontWeight="600" color="$primary">
                  Lupa password?
                </TextBodySm>
              </TouchableOpacity>
            </XStack>

            {/* Login Button */}

            <AppButton
              onPress={handleLogin}
              variant="primary"
              size="lg"
              fullWidth
              title="Masuk Sekarang"
              icon={
                <Ionicons
                  name="log-in-outline"
                  size={18}
                  color={ColorBase.white}
                />
              }
            />

            {/* Help + Shift info */}
            <XStack gap="$3">
              <YStack
                flex={1}
                backgroundColor="$backgroundSecondary"
                borderRadius="$4"
                padding="$3"
                gap={4}
              >
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color={ColorNeutral.neutral500}
                />
                <TextBodySm fontWeight="600" textAlign="center">
                  Butuh bantuan?
                </TextBodySm>
                <TextCaption
                  color="$colorSecondary"
                  textAlign="center"
                  lineHeight={16}
                >
                  Hubungi supervisor jika akun tidak bisa diakses.
                </TextCaption>
              </YStack>
              <YStack
                flex={1}
                backgroundColor="$backgroundSecondary"
                borderRadius="$4"
                padding="$3"
                gap={4}
              >
                <Ionicons
                  name="sunny-outline"
                  size={20}
                  color={ColorWarning.warning600}
                />
                <TextBodySm fontWeight="600" textAlign="center">
                  Buka shift
                </TextBodySm>
                <TextCaption
                  color="$colorSecondary"
                  textAlign="center"
                  lineHeight={16}
                >
                  Masuk untuk mulai shift dan catat modal awal kas.
                </TextCaption>
              </YStack>
            </XStack>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
