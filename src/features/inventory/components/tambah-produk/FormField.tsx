import React from "react";
import { XStack, YStack } from "tamagui";

import { TextBodySm, TextCaption } from "@/components";
import { ColorNeutral } from "@/themes/Colors";

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({ label, required, hint, children }: FormFieldProps) {
  return (
    <YStack gap={6}>
      <XStack gap={2}>
        <TextBodySm fontWeight="600" color={ColorNeutral.neutral700}>
          {label}
        </TextBodySm>
        {required && (
          <TextBodySm fontWeight="600" color="#DC2626">
            {" *"}
          </TextBodySm>
        )}
      </XStack>
      {children}
      {hint && (
        <TextCaption color={ColorNeutral.neutral400}>{hint}</TextCaption>
      )}
    </YStack>
  );
}
