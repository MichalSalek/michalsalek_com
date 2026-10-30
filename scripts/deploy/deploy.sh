#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
if [[ -f .deploy.env ]]; then source .deploy.env; fi
source scripts/deploy/deploy.config.sh
mode="${1:-}"
[[ -z "$mode" || "$mode" == --dry-run ]] || { echo 'Usage: npm run deploy [-- --dry-run]' >&2; exit 2; }
if [[ -z "$mode" ]]; then
    [[ -n "$DEPLOY_SSH" && "$DEPLOY_SSH" != -* && "$DEPLOY_SSH" != *[[:space:]]* ]] || { echo 'Set DEPLOY_SSH in .deploy.env or the environment.' >&2; exit 2; }
    [[ -z "$(git status --porcelain)" ]] || { echo 'Commit the intended source before publishing.' >&2; exit 2; }
    [[ "$(git branch --show-current)" == main ]] || { echo 'Production releases must come from main.' >&2; exit 2; }
fi
npm run check
npm run test:e2e
npm run audit:dependencies
sha="$(git rev-parse HEAD)"
release="$(date -u +%Y%m%dT%H%M%SZ)-${sha:0:12}"
mkdir -p .artifacts
archive=".artifacts/${release}.tar.gz"
tar -czf "$archive" -C out .
if [[ "$mode" == --dry-run ]]; then
    echo "Dry run complete: $archive. No remote operations performed."
    exit 0
fi
[[ "$DEPLOY_REMOTE_ROOT" =~ ^domains/[a-zA-Z0-9._-]+$ ]] || { echo 'Invalid remote root.' >&2; exit 2; }
remote="$(ssh "${SSH_OPTIONS[@]}" "$DEPLOY_SSH" 'printf "%s" "$HOME"')/$DEPLOY_REMOTE_ROOT"
[[ "$remote" =~ ^/[a-zA-Z0-9/._-]+$ ]] || exit 2
remote_release="$remote/releases/$release"
ssh "${SSH_OPTIONS[@]}" "$DEPLOY_SSH" "mkdir -p '$remote_release'"
scp -q -P "$DEPLOY_SSH_PORT" "$archive" "$DEPLOY_SSH:$remote_release/site.tar.gz"
checksum="$(sha256sum "$archive" | cut -d' ' -f1)"
ssh "${SSH_OPTIONS[@]}" "$DEPLOY_SSH" "cd '$remote_release' && test \"\$(sha256 -q site.tar.gz)\" = '$checksum' && tar -xzf site.tar.gz && rm site.tar.gz"
rollback() {
    trap - ERR INT TERM
    echo 'Verification failed. Restoring the previous release.' >&2
    ssh "${SSH_OPTIONS[@]}" "$DEPLOY_SSH" bash -s -- "$remote" rollback "$release" < scripts/deploy/remote-release.sh
}
# Catch interruptions as well as a failed live gate after the root has changed.
trap 'rollback; exit 1' ERR INT TERM
ssh "${SSH_OPTIONS[@]}" "$DEPLOY_SSH" bash -s -- "$remote" activate "$release" < scripts/deploy/remote-release.sh
node scripts/verify-live.mjs "$DEPLOY_URL" "$sha"
ssh "${SSH_OPTIONS[@]}" "$DEPLOY_SSH" bash -s -- "$remote" verify "$release" < scripts/deploy/remote-release.sh
trap - ERR INT TERM
printf '%s\n' "Published $sha at $DEPLOY_URL (release $release)"
