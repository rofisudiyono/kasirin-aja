#!/bin/zsh
set -e
BASE=/Users/rofisudiyono/Documents/Project/kasirin-aja/src

echo "=== Fixing misplaced CartItemRow ==="
mv "$BASE/features/cart/CartItemRow.tsx" "$BASE/features/cart/components/CartItemRow.tsx" 2>/dev/null && echo "OK" || echo "skip"

echo "=== Moving remaining data files ==="
mv "$BASE/data/inventory.ts" "$BASE/features/inventory/api/inventory.data.ts" 2>/dev/null && echo "inventory OK" || echo "skip"
mv "$BASE/data/payment.data.ts" "$BASE/features/payment/api/payment.data.ts" 2>/dev/null && echo "payment OK" || echo "skip"
mv "$BASE/data/receipt.data.ts" "$BASE/features/payment/api/receipt.data.ts" 2>/dev/null && echo "receipt OK" || echo "skip"
mv "$BASE/data/transactions.ts" "$BASE/features/transactions/api/transactions.data.ts" 2>/dev/null && echo "transactions OK" || echo "skip"

echo "=== Moving remaining types to features ==="
mv "$BASE/types/inventory.types.ts" "$BASE/features/inventory/" 2>/dev/null && echo "inventory types OK" || echo "skip"
mv "$BASE/types/payment.types.ts" "$BASE/features/payment/" 2>/dev/null && echo "payment types OK" || echo "skip"
mv "$BASE/types/settings.types.ts" "$BASE/features/settings/" 2>/dev/null && echo "settings types OK" || echo "skip"
mv "$BASE/types/transaction.types.ts" "$BASE/features/transactions/" 2>/dev/null && echo "transactions types OK" || echo "skip"

echo "=== Moving shared types ==="
mv "$BASE/types/filters.types.ts" "$BASE/shared/types/" 2>/dev/null && echo "filters OK" || echo "skip"
mv "$BASE/types/navigation.types.ts" "$BASE/shared/types/" 2>/dev/null && echo "navigation OK" || echo "skip"
mv "$BASE/types/index.ts" "$BASE/shared/types/" 2>/dev/null && echo "types/index OK" || echo "skip"

echo "=== Moving feature-specific molecules ==="
mv "$BASE/components/molecules/PaymentMethodCard.tsx" "$BASE/features/payment/components/" 2>/dev/null && echo "PaymentMethodCard.tsx OK" || echo "skip"
mv "$BASE/components/molecules/PaymentMethodCard" "$BASE/features/payment/components/" 2>/dev/null && echo "PaymentMethodCard/ OK" || echo "skip"
mv "$BASE/components/molecules/ProfileCard.tsx" "$BASE/features/settings/components/" 2>/dev/null && echo "ProfileCard OK" || echo "skip"
mv "$BASE/components/molecules/SettingRow.tsx" "$BASE/features/settings/components/" 2>/dev/null && echo "SettingRow OK" || echo "skip"
mv "$BASE/components/molecules/StatusBadge.tsx" "$BASE/features/transactions/components/" 2>/dev/null && echo "StatusBadge OK" || echo "skip"
mv "$BASE/components/molecules/StockBadge.tsx" "$BASE/features/inventory/components/" 2>/dev/null && echo "StockBadge OK" || echo "skip"

echo "=== Moving shared molecules ==="
mv "$BASE/components/molecules/DottedSeparator.tsx" "$BASE/shared/components/molecules/" 2>/dev/null && echo "DottedSeparator.tsx OK" || echo "skip"
mv "$BASE/components/molecules/DottedSeparator" "$BASE/shared/components/molecules/" 2>/dev/null && echo "DottedSeparator/ OK" || echo "skip"
mv "$BASE/components/molecules/FilterChip.tsx" "$BASE/shared/components/molecules/" 2>/dev/null && echo "FilterChip OK" || echo "skip"
mv "$BASE/components/molecules/PageHeader.tsx" "$BASE/shared/components/molecules/" 2>/dev/null && echo "PageHeader OK" || echo "skip"
mv "$BASE/components/molecules/SearchBar.tsx" "$BASE/shared/components/molecules/" 2>/dev/null && echo "SearchBar OK" || echo "skip"
mv "$BASE/components/molecules/SectionCard.tsx" "$BASE/shared/components/molecules/" 2>/dev/null && echo "SectionCard OK" || echo "skip"
mv "$BASE/components/molecules/SuggestionChip.tsx" "$BASE/shared/components/molecules/" 2>/dev/null && echo "SuggestionChip.tsx OK" || echo "skip"
mv "$BASE/components/molecules/index.ts" "$BASE/shared/components/molecules/" 2>/dev/null && echo "molecules/index OK" || echo "skip"

echo "=== Moving atoms to shared ==="
cp -r "$BASE/components/atoms/." "$BASE/shared/components/atoms/"
rm -rf "$BASE/components/atoms"
echo "atoms OK"

echo "=== Moving animated-icon files to shared ==="
mv "$BASE/components/animated-icon.module.css" "$BASE/shared/components/" 2>/dev/null && echo "animated-icon.css OK" || echo "skip"
mv "$BASE/components/animated-icon.tsx" "$BASE/shared/components/" 2>/dev/null && echo "animated-icon.tsx OK" || echo "skip"
mv "$BASE/components/animated-icon.web.tsx" "$BASE/shared/components/" 2>/dev/null && echo "animated-icon.web.tsx OK" || echo "skip"

echo "=== Moving organisms index to shared ==="
mv "$BASE/components/organisms/index.ts" "$BASE/shared/components/" 2>/dev/null && echo "organisms/index OK" || echo "skip"

echo "=== Moving hooks to shared ==="
cp -r "$BASE/hooks/." "$BASE/shared/hooks/"
rm -rf "$BASE/hooks"
echo "hooks OK"

echo "=== Moving lib to shared ==="
cp -r "$BASE/lib/." "$BASE/shared/lib/"
rm -rf "$BASE/lib"
echo "lib OK"

echo "=== Moving storage to shared ==="
mv "$BASE/store/storage.ts" "$BASE/shared/store/storage.ts" 2>/dev/null && echo "storage OK" || echo "skip"

echo "=== Moving themes to shared ==="
cp -r "$BASE/themes/." "$BASE/shared/themes/"
rm -rf "$BASE/themes"
echo "themes OK"

echo "=== Moving utils to shared ==="
cp -r "$BASE/utils/." "$BASE/shared/utils/"
rm -rf "$BASE/utils"
echo "utils OK"

echo "=== Moving constants to config ==="
cp -r "$BASE/constants/." "$BASE/config/"
rm -rf "$BASE/constants"
echo "config OK"

echo "=== All migrations done ==="
