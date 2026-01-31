#!/usr/bin/env sh
set -eu

REPORT_FILE="/tmp/smoke_report.txt"
echo "Starting smoke tests..." > "$REPORT_FILE"

status=0

check() {
  url="$1"
  name="$2"
  if [ -z "$url" ]; then
    echo "$name: SKIPPED (no URL provided)" >> "$REPORT_FILE"
    return
  fi
  # Use timeout to avoid long hangs
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$url" || echo "000")
  if [ "$code" = "200" ]; then
    echo "$name: OK (200) - $url" >> "$REPORT_FILE"
  else
    echo "$name: FAIL ($code) - $url" >> "$REPORT_FILE"
    status=1
  fi
}

# Check endpoints (expect env vars to be set by CI)
check "${API_URL:-}" "API (/health)"
check "${ADMIN_URL:-}" "Admin (/)"
check "${UI_URL:-}" "UI (/)"

# Print report to stdout for CI logs
cat "$REPORT_FILE"

# Exit with the aggregated status (0 if all OK, non-zero otherwise)
exit $status
