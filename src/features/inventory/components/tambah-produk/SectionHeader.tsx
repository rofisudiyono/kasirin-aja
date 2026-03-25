import React from "react";

import { TextCaption } from "@/shared/components";
import { ColorNeutral } from "@/shared/themes/Colors";

export function SectionHeader({ title }: { title: string }) {
  return (
    <TextCaption
      fontWeight="600"
      color={ColorNeutral.neutral500}
      letterSpacing={0.8}
      style={{ textTransform: "uppercase" }}
    >
      {title}
    </TextCaption>
  );
}
