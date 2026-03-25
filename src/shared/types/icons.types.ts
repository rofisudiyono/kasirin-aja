/**
 * Shared primitive types used across multiple features
 */

import type { Ionicons } from "@expo/vector-icons";
import type React from "react";

export type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
