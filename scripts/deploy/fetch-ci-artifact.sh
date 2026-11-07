#!/usr/bin/env bash
set -euo pipefail
: "${GH_TOKEN:?}" "${GITHUB_REPOSITORY:?}" "${GITHUB_SHA:?}" "${GITHUB_OUTPUT:?}"
[[ "$GITHUB_SHA" == "$(git rev-parse HEAD)" ]] || { echo 'Checkout does not match workflow SHA.' >&2; exit 1; }
# Only a completed push to main, in this repository and for this exact commit, is eligible.
runs="$(gh api --method GET "repos/$GITHUB_REPOSITORY/actions/workflows/ci.yml/runs" -f head_sha="$GITHUB_SHA" -f branch=main -f event=push -f status=success -f per_page=100)"
run_id="$(jq -r --arg sha "$GITHUB_SHA" '.workflow_runs | map(select(.head_sha == $sha and .head_branch == "main" and .event == "push" and .status == "completed" and .conclusion == "success")) | .[0].id // empty' <<< "$runs")"
if [[ -n "$run_id" ]]; then
    artifacts="$(gh api "repos/$GITHUB_REPOSITORY/actions/runs/$run_id/artifacts?per_page=100")"
    artifact="$(jq -c '[.artifacts[] | select(.name == "verified-static-site" and .expired == false)] | if length > 1 then error("Multiple eligible artifacts") else .[0] // empty end' <<< "$artifacts")"
fi
if [[ -z "${artifact:-}" ]]; then
    echo 'No verified CI artifact available; a full local verification and build will run.'
    echo 'available=false' >> "$GITHUB_OUTPUT"
    exit 0
fi
id="$(jq -r '.id' <<< "$artifact")"
expected="$(jq -r '.digest // empty' <<< "$artifact")"
[[ "$id" =~ ^[0-9]+$ && "$expected" =~ ^sha256:[0-9a-f]{64}$ ]] || { echo 'Artifact has no valid GitHub digest.' >&2; exit 1; }
mkdir -p .artifacts/ci-download
gh api "repos/$GITHUB_REPOSITORY/actions/artifacts/$id/zip" > .artifacts/ci-download/artifact.zip
actual="$(sha256sum .artifacts/ci-download/artifact.zip | cut -d' ' -f1)"
[[ "sha256:$actual" == "$expected" ]] || { echo 'Downloaded artifact digest mismatch.' >&2; exit 1; }
# Extract only after the GitHub-provided archive digest is checked.
unzip -q .artifacts/ci-download/artifact.zip -d .artifacts/ci-download/extracted
[[ -f .artifacts/ci-download/extracted/manifest.json && -d .artifacts/ci-download/extracted/out ]] || { echo 'Incomplete CI artifact.' >&2; exit 1; }
rm -rf out
mv .artifacts/ci-download/extracted/out out
node scripts/deploy/artifact.mjs verify .artifacts/ci-download/extracted/manifest.json "$run_id"
echo 'available=true' >> "$GITHUB_OUTPUT"
echo "run_id=$run_id" >> "$GITHUB_OUTPUT"
