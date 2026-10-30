# Static deployment

Production is a static document root on MyDevil. Build tools run locally or in CI;
no npm installation, Node.js server or PM2 process runs on the production host.

## Local configuration

Create a gitignored `.deploy.env`, using an existing authorized SSH connection:

```sh
DEPLOY_SSH=user@host
```

The domain, URL and relative domain directory default to michalsalek.com in
`scripts/deploy/deploy.config.sh`. Override them through environment variables
when necessary. Connection details and private keys do not belong in Git.

Run `npm run deploy`. The command requires a clean committed `main`, runs the
checks and browser tests, builds and audits the static export, checks dependencies,
and packages only `out/`. It uploads over SSH and verifies the archive checksum.

A release is extracted to `releases/<timestamp>-<sha>/`. Activation changes the
`public_html` symlink with an atomic rename. The first adoption preserves the old
plain directory as `legacy-<release>`; that one-time directory-to-symlink conversion
has a short rename window. Later deployments use atomic symlink replacements.

The deployment lock remains held from activation through verification. A failed
live check or interruption requests a rollback to the previous root. If the SSH
connection itself is unavailable, rollback cannot be confirmed; inspect the root
and `.deploy-lock/owner` over SSH after reconnecting. Do not clear a lock owned by
an active deployment.

`release.json` identifies the source SHA, dirty state, HTML hashes and generated
illustration hashes. The live check compares every public HTML page and software
illustration with the local build, and checks crawler
access, static discovery files, old URL redirects and an actual HTTP 404. Both
canonical URLs and an uncached release marker are checked. A cache must not hide
an outdated release.

Old releases are retained deliberately. Remove obsolete ones only after checking
that neither `public_html` nor `previous` points to them. The original legacy
export is preserved for recovery.

## Rollback

```sh
npm run deploy:rollback
```

This restores the previous document root and confirms that the homepage responds.
A release with `UNVERIFIED` has not completed its live gate. Rollback only acts
when the named release is still current; an old operation cannot replace a newer
release.

`npm run deploy:dry` builds, tests and packages locally with no SSH calls or remote
changes. It permits a dirty working tree for review and marks that fact in the
release metadata. Dirty artifacts cannot pass the production live gate.

## GitHub Actions

The `CONTACT_ENDPOINT` and `GA_ID` repository variables supply public build
configuration. Their values are bundled into browser code and must never contain
secrets. Local production builds use the gitignored `.env.production.local`.

CI runs without deployment credentials and publishes the static export as an
artifact. `Deploy production` is an optional manual workflow restricted to `main`.
It uses the same `npm run deploy` entrypoint.

Configure these repository or production-environment secrets before using it:

- `MYDEVIL_SSH_TARGET`: the authorized SSH user and host.
- `MYDEVIL_SSH_KEY`: a dedicated SSH private key with access to this site.
- `MYDEVIL_KNOWN_HOSTS`: the verified host key entry, obtained through a trusted channel.

Provisioning a new credential is an owner action. Local deployment works with the
existing SSH connection independently of GitHub secrets. Pull requests never
receive deployment credentials.
