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
import { Button, Text, XStack, YStack } from "tamagui";

import { AppInput } from "@/components/app-input";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("budi.santoso@tokomakmur.id");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    login();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EFF4FF" }}>
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
              backgroundColor="#0F766E"
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons name="storefront-outline" size={28} color="white" />
            </YStack>
            <Text
              fontFamily="$body"
              fontSize="$lg"
              fontWeight="700"
              color="$color"
              marginTop="$2"
            >
              Kasir Toko Makmur
            </Text>
            <Text fontFamily="$body" fontSize="$sm" color="$colorSecondary">
              Masuk untuk mulai transaksi hari ini
            </Text>
          </YStack>

          {/* ── Illustration card ── */}
          <YStack
            marginHorizontal="$4"
            borderRadius="$6"
            backgroundColor="#DBEAFE"
            padding="$5"
            alignItems="center"
            gap="$3"
          >
            <YStack
              width={80}
              height={80}
              borderRadius={40}
              backgroundColor="#BFDBFE"
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons name="person" size={40} color="#2563EB" />
            </YStack>

            {/* Badge */}
            <XStack
              backgroundColor="#ECFDF5"
              borderRadius="$full"
              paddingHorizontal="$3"
              paddingVertical={4}
              gap={4}
              alignItems="center"
            >
              <Text
                fontSize={10}
                color="#16A34A"
                fontFamily="$body"
                fontWeight="600"
              >
                Login kasir • Siap buka shift
              </Text>
            </XStack>

            <Text
              fontFamily="$body"
              fontSize="$xl"
              fontWeight="700"
              color="$color"
              textAlign="center"
              lineHeight={28}
            >
              Selamat datang{"\n"}kembali
            </Text>
            <Text
              fontFamily="$body"
              fontSize="$sm"
              color="$colorSecondary"
              textAlign="center"
              lineHeight={20}
            >
              Masuk dengan email dan password untuk{"\n"}melanjutkan penjualan,
              cek shift, dan{"\n"}mengakses fitur kasir dengan cepat.
            </Text>
          </YStack>

          {/* ── Form Card ── */}
          <YStack
            marginHorizontal="$4"
            marginTop="$4"
            backgroundColor="$background"
            borderRadius="$6"
            padding="$4"
            gap="$4"
            shadowColor="#94A3B8"
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
                backgroundColor="#DCFCE7"
                alignItems="center"
                justifyContent="center"
              >
                <Ionicons name="person-outline" size={18} color="#16A34A" />
              </YStack>
              <YStack flex={1}>
                <Text
                  fontFamily="$body"
                  fontSize="$md"
                  fontWeight="600"
                  color="$color"
                >
                  Mode Kasir
                </Text>
                <Text fontFamily="$body" fontSize="$sm" color="$colorSecondary">
                  Akun staf operasional toko
                </Text>
              </YStack>
              <TouchableOpacity>
                <Text
                  fontFamily="$body"
                  fontSize="$sm"
                  fontWeight="600"
                  color="$primary"
                >
                  Ganti
                </Text>
              </TouchableOpacity>
            </XStack>

            {/* Title */}
            <YStack gap="$1">
              <Text
                fontFamily="$body"
                fontSize="$lg"
                fontWeight="700"
                color="$color"
              >
                Masuk ke akun kasir
              </Text>
              <Text
                fontFamily="$body"
                fontSize="$sm"
                color="$colorSecondary"
                lineHeight={18}
              >
                Gunakan akun yang sudah terdaftar untuk membuka shift dan
                memproses transaksi pelanggan.
              </Text>
            </YStack>

            {/* Email field */}
            <AppInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Email kasir aktif"
              hint="Email kasir aktif"
              leftIcon="mail-outline"
              keyboardType="email-address"
            />

            {/* Password field */}
            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Minimal 8 karakter"
              hint="Minimal 8 karakter"
              leftIcon="lock-closed-outline"
              secureTextEntry
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
                  backgroundColor={rememberMe ? "$primary" : "transparent"}
                  borderWidth={2}
                  borderColor={rememberMe ? "$primary" : "$borderColor"}
                  alignItems="center"
                  justifyContent="center"
                >
                  {rememberMe && (
                    <Text fontSize={12} color="white">
                      ✓
                    </Text>
                  )}
                </YStack>
                <Text fontFamily="$body" fontSize="$sm" color="$colorSecondary">
                  Ingat sesi perangkat ini
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  fontFamily="$body"
                  fontSize="$sm"
                  fontWeight="600"
                  color="$primary"
                >
                  Lupa password?
                </Text>
              </TouchableOpacity>
            </XStack>

            {/* Login Button */}
            <Button
              onPress={handleLogin}
              height={52}
              backgroundColor="$primary"
              borderRadius="$5"
              pressStyle={{ opacity: 0.85 }}
            >
              <XStack gap="$2" alignItems="center">
                <Ionicons name="log-in-outline" size={18} color="white" />
                <Text
                  fontFamily="$body"
                  fontSize="$md"
                  fontWeight="700"
                  color="white"
                >
                  Masuk Sekarang
                </Text>
              </XStack>
            </Button>

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
                  color="#6B7280"
                />
                <Text
                  fontFamily="$body"
                  fontSize="$sm"
                  fontWeight="600"
                  color="$color"
                  textAlign="center"
                >
                  Butuh bantuan?
                </Text>
                <Text
                  fontFamily="$body"
                  fontSize={11}
                  color="$colorSecondary"
                  textAlign="center"
                  lineHeight={16}
                >
                  Hubungi supervisor jika akun tidak bisa diakses.
                </Text>
              </YStack>
              <YStack
                flex={1}
                backgroundColor="$backgroundSecondary"
                borderRadius="$4"
                padding="$3"
                gap={4}
              >
                <Ionicons name="sunny-outline" size={20} color="#D97706" />
                <Text
                  fontFamily="$body"
                  fontSize="$sm"
                  fontWeight="600"
                  color="$color"
                  textAlign="center"
                >
                  Buka shift
                </Text>
                <Text
                  fontFamily="$body"
                  fontSize={11}
                  color="$colorSecondary"
                  textAlign="center"
                  lineHeight={16}
                >
                  Masuk untuk mulai shift dan catat modal awal kas.
                </Text>
              </YStack>
            </XStack>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
