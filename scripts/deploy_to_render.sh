#!/usr/bin/env sh
set -e

# deploy_to_render.sh
# Trigger a Render deploy hook (useful as a lightweight CI deploy trigger).
# Usage: ensure RENDER_DEPLOY_HOOK_URL is set in CircleCI and call this script from CI.

if [ -z "${RENDER_DEPLOY_HOOK_URL}" ]; then
  echo "RENDER_DEPLOY_HOOK_URL not set; skipping deploy."
  exit 0
fi

echo "Triggering Render deploy via webhook..."
# send an empty JSON payload; Render will trigger the deploy
curl -s -X POST -H "Content-Type: application/json" -d '{}' "${RENDER_DEPLOY_HOOK_URL}"

echo "Deploy hook triggered."