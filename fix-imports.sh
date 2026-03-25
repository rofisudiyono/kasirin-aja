#!/bin/zsh
# Fix all broken imports after feature-based architecture migration
SRC=/Users/rofisudiyono/Documents/Project/kasirin-aja/src

fix_import() {
  local from="$1"
  local to="$2"
  grep -rl "$from" "$SRC" --include="*.ts" --include="*.tsx" | while read f; do
    sed -i '' "s|$from|$to|g" "$f" && echo "Fixed: $f"
  done
}

echo "=== Fixing theme imports ==="
fix_import "@/themes/Colors" "@/shared/themes/Colors"

echo "=== Fixing constants imports ==="
fix_import "@/constants/categoryStyles" "@/config/categoryStyles"
fix_import "@/constants/navigation" "@/config/navigation"
fix_import "@/constants/theme" "@/config/theme"

echo "=== Fixing lib imports ==="
fix_import "@/lib/auth" "@/shared/lib/auth"
fix_import "@/lib/formatters" "@/shared/lib/formatters"

echo "=== Fixing utils imports ==="
fix_import "from \"@/utils\"" "from \"@/shared/utils\""
fix_import "from '@/utils'" "from '@/shared/utils'"

echo "=== Fixing hooks imports ==="
fix_import "@/hooks/use-color-scheme" "@/shared/hooks/use-color-scheme"
fix_import "@/hooks/use-theme" "@/shared/hooks/use-theme"

echo "=== Fixing data imports ==="
fix_import "@/data/catalog\"" "@/features/catalog/api/catalog.data\""
fix_import "@/data/catalog'" "@/features/catalog/api/catalog.data'"
fix_import "@/data/category.data" "@/features/catalog/api/category.data"
fix_import "@/data/barcode.data" "@/features/catalog/api/barcode.data"
fix_import "@/data/payment.data" "@/features/payment/api/payment.data"
fix_import "@/data/receipt.data" "@/features/payment/api/receipt.data"
fix_import "@/data/inventory\"" "@/features/inventory/api/inventory.data\""
fix_import "@/data/inventory'" "@/features/inventory/api/inventory.data'"
fix_import "@/data/transactions\"" "@/features/transactions/api/transactions.data\""
fix_import "@/data/transactions'" "@/features/transactions/api/transactions.data'"

echo "=== Fixing store imports ==="
fix_import "@/store/cart" "@/features/cart/store/cart.store"
fix_import "@/store/shift" "@/features/shift/store/shift.store"
fix_import "@/store/storage" "@/shared/store/storage"

echo "=== Fixing types imports ==="
fix_import "from \"@/types\"" "from \"@/shared/types\""
fix_import "from '@/types'" "from '@/shared/types'"
fix_import "from \"@/types/" "from \"@/shared/types/"
fix_import "from '@/types/" "from '@/shared/types/"

echo "=== Fixing relative storage imports in feature stores ==="
sed -i '' 's|from "\./storage"|from "@/shared/store/storage"|g' "$SRC/features/auth/store/auth.store.ts"
sed -i '' 's|from "\./storage"|from "@/shared/store/storage"|g' "$SRC/features/shift/store/shift.store.ts"

echo "=== All imports fixed ==="
