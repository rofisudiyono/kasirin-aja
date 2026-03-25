#!/bin/zsh
SRC=/Users/rofisudiyono/Documents/Project/kasirin-aja/src

echo "=== Fix 1: @/components/atoms/* → @/shared/components/atoms/* ==="
grep -rl "@/components/atoms/" "$SRC" --include="*.ts" --include="*.tsx" | while read f; do
  sed -i '' 's|@/components/atoms/|@/shared/components/atoms/|g' "$f" && echo "Fixed: $f"
done

echo "=== Fix 2: @/components/animated-icon → @/shared/components/animated-icon ==="
grep -rl "@/components/animated-icon" "$SRC" --include="*.ts" --include="*.tsx" | while read f; do
  sed -i '' 's|@/components/animated-icon|@/shared/components/animated-icon|g' "$f" && echo "Fixed: $f"
done

echo "=== Fix 3: @/store/auth → @/features/auth/store/auth.store ==="
grep -rl "@/store/auth" "$SRC" --include="*.ts" --include="*.tsx" | while read f; do
  sed -i '' 's|@/store/auth|@/features/auth/store/auth.store|g' "$f" && echo "Fixed: $f"
done

echo "=== Fix 4: @/utils/format.utils → @/shared/utils/format.utils ==="
grep -rl "@/utils/format.utils" "$SRC" --include="*.ts" --include="*.tsx" | while read f; do
  sed -i '' 's|@/utils/format.utils|@/shared/utils/format.utils|g' "$f" && echo "Fixed: $f"
done

echo "=== Fix 5: ../atoms/Typography → @/shared/components/atoms/Typography in features/ ==="
grep -rl "\.\./atoms/Typography" "$SRC/features" --include="*.ts" --include="*.tsx" | while read f; do
  sed -i '' 's|\.\./atoms/Typography|@/shared/components/atoms/Typography|g' "$f" && echo "Fixed: $f"
done

echo "=== Fix 6: @/components → @/shared/components in all files ==="
grep -rl "from \"@/components\"" "$SRC" --include="*.ts" --include="*.tsx" | while read f; do
  sed -i '' 's|from "@/components"|from "@/shared/components"|g' "$f" && echo "Fixed: $f"
done
grep -rl "from \"@/components/index\"" "$SRC" --include="*.ts" --include="*.tsx" | while read f; do
  sed -i '' 's|from "@/components/index"|from "@/shared/components"|g' "$f" && echo "Fixed: $f"
done
grep -rl "from '@/components'" "$SRC" --include="*.ts" --include="*.tsx" | while read f; do
  sed -i '' "s|from '@/components'|from '@/shared/components'|g" "$f" && echo "Fixed: $f"
done

echo "=== All fixes applied ==="
