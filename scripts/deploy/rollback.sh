#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
if [[ -f .deploy.env ]]; then source .deploy.env; fi
source scripts/deploy/deploy.config.sh
[[ -n "$DEPLOY_SSH" && "$DEPLOY_SSH" != -* && "$DEPLOY_SSH" != *[[:space:]]* ]] || { echo 'Set DEPLOY_SSH first.' >&2; exit 2; }
[[ "$DEPLOY_REMOTE_ROOT" =~ ^domains/[a-zA-Z0-9._-]+$ ]] || exit 2
remote="$(ssh "${SSH_OPTIONS[@]}" "$DEPLOY_SSH" 'printf "%s" "$HOME"')/$DEPLOY_REMOTE_ROOT"
release="$(ssh "${SSH_OPTIONS[@]}" "$DEPLOY_SSH" "readlink '$remote/public_html'")"
[[ "$release" == releases/* ]] || { echo 'Current root is not a managed release.' >&2; exit 2; }
ssh "${SSH_OPTIONS[@]}" "$DEPLOY_SSH" bash -s -- "$remote" rollback "${release#releases/}" < scripts/deploy/remote-release.sh
curl --fail --silent --show-error --compressed "$DEPLOY_URL/" >/dev/null
printf '%s\n' "Previous release restored at $DEPLOY_URL"
