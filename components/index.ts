/**
 * Design System — Atoms
 *
 * Usage:
 *   import { AppButton, AppInput, TextH1, ... } from '@/design-system'
 */

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
