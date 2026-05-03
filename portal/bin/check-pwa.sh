#!/usr/bin/env bash
# Audits PWA scaffolding at codebase root against pwa-contract.md invariants.
# Exit 0 = all pass. Exit 1 = punch list printed.
set -uo pipefail

ROOT="/Users/verdey/Documents/Claude/Projects"
PASS=0
FAIL=0

ok()   { echo "  ✓ $1"; PASS=$((PASS + 1)); }
fail() { echo "  ✗ $1"; FAIL=$((FAIL + 1)); }

echo "== PWA scaffolding audit =="
echo ""

# 1. manifest.webmanifest — exists + valid JSON
mf="$ROOT/manifest.webmanifest"
if [ ! -f "$mf" ]; then
  fail "manifest.webmanifest: missing"
elif python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$mf" 2>/dev/null; then
  ok "manifest.webmanifest: exists + valid JSON"
else
  fail "manifest.webmanifest: invalid JSON"
fi

# 2. sw.js — exists + no parse errors (node --check)
sw="$ROOT/sw.js"
if [ ! -f "$sw" ]; then
  fail "sw.js: missing"
elif node --check "$sw" 2>/dev/null; then
  ok "sw.js: exists + no parse errors"
else
  fail "sw.js: parse errors detected"
fi

# 3. Icons — existence + correct dimensions
check_icon() {
  local name="$1" want_w="$2" want_h="$3"
  local path="$ROOT/icons/$name"
  if [ ! -f "$path" ]; then
    fail "icons/$name: missing"
    return
  fi
  local got_w got_h
  got_w=$(sips -g pixelWidth  "$path" 2>/dev/null | awk '/pixelWidth/{print $2}')
  got_h=$(sips -g pixelHeight "$path" 2>/dev/null | awk '/pixelHeight/{print $2}')
  if [ "$got_w" = "$want_w" ] && [ "$got_h" = "$want_h" ]; then
    ok "icons/$name: ${want_w}×${want_h}"
  else
    fail "icons/$name: expected ${want_w}×${want_h}, got ${got_w:-?}×${got_h:-?}"
  fi
}
check_icon icon-192.png             192 192
check_icon icon-512.png             512 512
check_icon apple-touch-icon-180.png 180 180
check_icon icon-maskable-512.png    512 512

# 4. index.html — required meta tags, manifest link, SW registration
idx="$ROOT/index.html"
declare -a REQUIRED=(
  'rel="manifest"'
  'apple-touch-icon'
  'apple-mobile-web-app-capable'
  'apple-mobile-web-app-status-bar-style'
  'apple-mobile-web-app-title'
  'theme-color'
  'serviceWorker'
  "register('/sw.js')"
)
for pat in "${REQUIRED[@]}"; do
  if grep -qF "$pat" "$idx" 2>/dev/null; then
    ok "index.html contains: $pat"
  else
    fail "index.html missing: $pat"
  fi
done

# 5. offline.html — exists
if [ -f "$ROOT/offline.html" ]; then
  ok "offline.html: exists"
else
  fail "offline.html: missing"
fi

echo ""
echo "== $PASS passed / $FAIL failed =="
[ "$FAIL" -eq 0 ] && exit 0 || exit 1
