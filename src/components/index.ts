/**
 * Design System — Atoms & Molecules
 *
 * Usage:
 *   import { AppButton, AppInput, TextH1, StatusBadge, ... } from '@/components'
 */

// ── Atoms ─────────────────────────────────────────────────────────────────────

// Typography
export {
  TextBody,
  TextBodyLg,
  TextBodySm,
  TextCaption,
  TextDisplay,
  TextDisplayLg,
  TextDisplayXl,
  TextH1,
  TextH2,
  TextH3,
  TextMicro,
} from "./atoms/Typography";

// Button
export { AppButton } from "./atoms/AppButton";
export type {
  AppButtonProps,
  AppButtonSize,
  AppButtonVariant,
} from "./atoms/AppButton";

// Input
export {
  AppInput,
  AppInputError,
  AppInputHint,
  AppInputLabel,
  AppInputWrapper,
} from "./atoms/AppInput";
export type {
  AppInputProps,
  AppInputSize,
  AppInputState,
} from "./atoms/AppInput";

// Icon Button
export { IconButton } from "./atoms/IconButton";
export type { IconButtonProps } from "./atoms/IconButton";

// Shadow Card
export { ShadowCard } from "./atoms/ShadowCard";

// ── Molecules ─────────────────────────────────────────────────────────────────

// Status Badge (transaction Lunas / Void / Refund)
export { StatusBadge } from "./molecules/StatusBadge";
export type { TxStatus } from "./molecules/StatusBadge";

// Filter Chip
export { FilterChip } from "./molecules/FilterChip";
export type { FilterChipProps } from "./molecules/FilterChip";

// Search Bar
export { SearchBar } from "./molecules/SearchBar";
export type { SearchBarProps } from "./molecules/SearchBar";

// Stats Row
export { StatsRow } from "./molecules/StatsRow";
export type { StatItem, StatsRowProps } from "./molecules/StatsRow";

// Section Card
export { SectionCard } from "./molecules/SectionCard";
export type { SectionCardProps } from "./molecules/SectionCard";

// Page Header
export { PageHeader } from "./molecules/PageHeader";
export type { PageHeaderProps } from "./molecules/PageHeader";
