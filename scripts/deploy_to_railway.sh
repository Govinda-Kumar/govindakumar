#!/usr/bin/env bash
set -euo pipefail

# This is a helper script that demonstrates how to deploy pushed images to Railway.
# It assumes you have RAILWAY_TOKEN and RAILWAY_PROJECT_ID set as env vars.
# You will need to replace SERVICE names with your Railway service identifiers.

RAILWAY_PROJECT_ID=${RAILWAY_PROJECT_ID:-}
IMAGE_ADMIN=${1:-}
IMAGE_API=${2:-}
IMAGE_UI=${3:-}

if [ -z "$RAILWAY_PROJECT_ID" ]; then
  echo "RAILWAY_PROJECT_ID is not set. Please configure it in CI environment variables."
  exit 1
fi

if [ -z "$IMAGE_ADMIN" ] || [ -z "$IMAGE_API" ] || [ -z "$IMAGE_UI" ]; then
  echo "Provide three image arguments: admin-image api-image ui-image"
  exit 1
fi

# Example using Railway CLI (user must `npm i -g railway` in CI before running)
# Login using API token
if command -v railway >/dev/null 2>&1; then
  echo "Logging into Railway CLI"
  railway login --apiKey "$RAILWAY_TOKEN"
  echo "Deploying images to Railway project ${RAILWAY_PROJECT_ID}"

  # Replace with actual service names from your Railway project
  # Example: railway service update <serviceId> --image <image>
  echo "NOTE: Replace the service update commands below with your Railway service ids."
  echo "railway service update <ADMIN_SERVICE_ID> --project ${RAILWAY_PROJECT_ID} --image ${IMAGE_ADMIN}"
  echo "railway service update <API_SERVICE_ID> --project ${RAILWAY_PROJECT_ID} --image ${IMAGE_API}"
  echo "railway service update <UI_SERVICE_ID> --project ${RAILWAY_PROJECT_ID} --image ${IMAGE_UI}"
else
  echo "Railway CLI not available. Please install it and re-run, or call the Railway HTTP API to update service images."
  exit 1
fi
