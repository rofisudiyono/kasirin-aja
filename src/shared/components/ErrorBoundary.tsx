import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { YStack } from "tamagui";

import { ColorBase, ColorDanger, ColorNeutral } from "@/shared/themes/Colors";
import { TextBodyLg, TextBodySm } from "@/shared/components/atoms/Typography";

interface State {
  hasError: boolean;
  error: Error | null;
}

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorBase.bgScreen,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  retryBtn: {
    marginTop: 20,
    backgroundColor: ColorDanger.danger600,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
});

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <View style={styles.container}>
          <YStack alignItems="center" gap={8} maxWidth={320}>
            <TextBodyLg fontWeight="700" color={ColorDanger.danger600}>
              Terjadi Kesalahan
            </TextBodyLg>
            <TextBodySm color={ColorNeutral.neutral500} textAlign="center">
              {this.state.error?.message ?? "Silakan coba lagi."}
            </TextBodySm>
            <TouchableOpacity onPress={this.handleReset} style={styles.retryBtn}>
              <TextBodySm fontWeight="600" color={ColorBase.white}>
                Coba Lagi
              </TextBodySm>
            </TouchableOpacity>
          </YStack>
        </View>
      );
    }

    return this.props.children;
  }
}
