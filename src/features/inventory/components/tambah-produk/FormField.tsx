import React from "react";
import { XStack, YStack } from "tamagui";

import { TextBodySm } from "@/shared/components";
import { ColorNeutral } from "@/shared/themes/Colors";

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, required, children }: FormFieldProps) {
  return (
    <YStack gap={6}>
      <XStack gap={2}>
        <TextBodySm fontWeight="500" color={ColorNeutral.neutral700}>
          {label}
        </TextBodySm>
        {required && (
          <TextBodySm fontWeight="500" color="#DC2626">
            {" *"}
          </TextBodySm>
        )}
      </XStack>
      {children}
    </YStack>
  );
}
