#!/usr/bin/env bash
# Build locally, upload to the Ubuntu server, switch the `current` symlink atomically.
#
#   DEPLOY_HOST=ubuntu@203.0.113.10 SSH_KEY=~/.ssh/my-key.pem \
#   VITE_SITE_URL=https://example.com ./deploy/deploy.sh
set -euo pipefail

: "${DEPLOY_HOST:?Set DEPLOY_HOST, e.g. ubuntu@203.0.113.10}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_ed25519}"
APP_DIR="${APP_DIR:-/var/www/runratehost}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
RELEASE="$(date +%Y%m%d%H%M%S)"
SSH=(ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new)

echo "==> Building"
npm ci
npm run lint
npm test
npm run build

echo "==> Uploading release $RELEASE"
"${SSH[@]}" "$DEPLOY_HOST" "mkdir -p '$APP_DIR/releases/$RELEASE'"
rsync -az --delete -e "ssh -i $SSH_KEY" dist/ "$DEPLOY_HOST:$APP_DIR/releases/$RELEASE/"

echo "==> Activating release"
"${SSH[@]}" "$DEPLOY_HOST" "
  ln -sfn '$APP_DIR/releases/$RELEASE' '$APP_DIR/current' &&
  ls -1dt '$APP_DIR'/releases/* | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf
"

echo "==> Done. Release $RELEASE is live."
