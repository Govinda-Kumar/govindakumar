#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/build_and_push.sh <tag>
TAG=${1:-${GIT_TAG:-${CIRCLE_SHA1:-latest}}}
OWNER=${GHCR_OWNER:-${GITHUB_USER:-}}
REPO=${GHCR_REPO:-govindakumar}

if [ -z "$OWNER" ]; then
  echo "GHCR_OWNER (or GITHUB_USER) must be set"
  exit 1
fi

IMAGE_ADMIN=ghcr.io/${OWNER}/${REPO}-admin-service:${TAG}
IMAGE_API=ghcr.io/${OWNER}/${REPO}-api-service:${TAG}
IMAGE_UI=ghcr.io/${OWNER}/${REPO}-portfolio-ui:${TAG}

echo "Building admin image: $IMAGE_ADMIN"
docker build -t "$IMAGE_ADMIN" -f admin-service/Dockerfile admin-service

echo "Building api image: $IMAGE_API"
docker build -t "$IMAGE_API" -f api-service/Dockerfile api-service

echo "Building ui image: $IMAGE_UI"
docker build -t "$IMAGE_UI" -f portfolio-ui/Dockerfile portfolio-ui

# Login (expects GHCR_PAT + GHCR_USER/GITHUB_USER env vars)
if [ -n "${GHCR_PAT:-}" ]; then
  echo "$GHCR_PAT" | docker login ghcr.io -u "${GHCR_USER:-${GITHUB_USER}}" --password-stdin
fi

# Push images
for img in "$IMAGE_ADMIN" "$IMAGE_API" "$IMAGE_UI"; do
  echo "Pushing $img"
  docker push "$img"
done

# Print pushed images for downstream deploy steps
printf "%s\n" "$IMAGE_ADMIN" "$IMAGE_API" "$IMAGE_UI"
