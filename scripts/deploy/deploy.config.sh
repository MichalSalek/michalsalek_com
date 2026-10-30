#!/usr/bin/env bash
# Private connection details belong in .deploy.env or the calling environment.
DEPLOY_DOMAIN="${DEPLOY_DOMAIN:-michalsalek.com}"
DEPLOY_URL="${DEPLOY_URL:-https://${DEPLOY_DOMAIN}}"
DEPLOY_REMOTE_ROOT="${DEPLOY_REMOTE_ROOT:-domains/${DEPLOY_DOMAIN}}"
DEPLOY_SSH="${DEPLOY_SSH:-}"
DEPLOY_SSH_PORT="${DEPLOY_SSH_PORT:-22}"
SSH_OPTIONS=(-o BatchMode=yes -o ConnectTimeout=15 -o ServerAliveInterval=15 -o ServerAliveCountMax=3 -p "$DEPLOY_SSH_PORT")
