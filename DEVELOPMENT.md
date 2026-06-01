# rundit-sdk — SDK generation & publishing

This repo is the **public** home for the Rundit SDK packages (`@rundit-sdk/client`,
`@rundit-sdk/embed`). It owns code generation, version selection, compatibility
checking, and publishing to npm **with provenance**.

It does **not** define the API. The API lives in `rundit-back` (private). The only
thing that crosses the boundary is the OpenAPI **spec** — `rundit-back` emits it and
commits it here. That spec is the contract.

```
rundit-back (private)                          rundit-sdk (public, this repo)
  src/sdk-api/scripts/write-openapi.ts          spec/sdk.openapi.json   (committed by bot)
    │  bootstraps Nest, introspects Swagger             │
    │  → sdk.openapi.json (with x-sdk-audiences)        ▼
    └── CI on develop / production ───ships spec──►  CI: classify bump (diff vs npm)
        (GitHub App token; target branch                → generate packages/{embed,client}
         mirrors the source branch)                      → check-compatibility (breaking gate)
                                                         → npm publish --provenance (OIDC)
                                                         → commit regenerated code + versions.json
```

Consumers are unaffected by the move: the package names stay `@rundit-sdk/client`
and `@rundit-sdk/embed`, so e.g. the MCP server's `npm install @rundit-sdk/client@rc`
keeps working unchanged.

## Why split it out of rundit-back

- **Provenance.** npm provenance requires publishing from a **public** repo via GitHub
  Actions OIDC. `rundit-back` is private and stays private, so provenance is only
  achievable from a separate public repo. (This is why `SDK_PUBLISH_PROVENANCE` was
  forced off in the old `rundit-back` workflow.)
- **Clear contract.** The spec is a standalone artifact; "rundit-back commits a new
  spec → this repo diffs, generates, and publishes" is a clean seam.

(Note: large generated-code diffs on `rundit-back` PRs were already eliminated by
gitignoring the generated artifacts there — that is not a driver for this split.)

## Repository layout

```
spec/
  sdk.openapi.json          # the contract — committed here by rundit-back's bot
packages/
  client/                   # generated AND committed (public source of truth)
  embed/                    # generated AND committed
scripts/
  contract.cjs              # package config (names, dirs, audiences, auth) — moved from rundit-back
  generate-sdk.cjs          # spec → packages/{embed,client}            — moved
  classify-bump.cjs         # spec diff → major | minor | patch | none  — NEW (replaces the marker)
  check-compatibility.cjs   # breaking-change gate                       — moved
  detect-drift.cjs          # safety net: generated surface vs npm       — moved
  bump-version.cjs          # mutate versions.json                       — moved
  publish-packages.cjs      # npm publish --provenance                   — moved
versions.json               # last published stable per package
.github/workflows/publish.yml
```

`versions.json` is the durable version source. There is **no** `release-type.json`
marker here — the bump type is computed (decision 3).

## Channel mapping (decision 2)

| rundit-back branch | spec lands on rundit-sdk branch | dist-tag published |
| ------------------ | ------------------------------- | ------------------ |
| `develop`          | `develop`                       | `rc`               |
| `production`       | `production`                    | `latest`           |

`production` is the default/stable branch here, matching the other Rundit repos. The
publish workflow triggers on pushes to those branches that touch `spec/sdk.openapi.json`.

## Auto-derived version bump (decision 3)

On each run the workflow classifies the change by diffing the incoming spec against the
spec bundled in the package **currently published at the target dist-tag** (authoritative
= what consumers actually have; reuses `detect-drift`/`check-compatibility` npm-pack):

- **breaking** (removed path/op/param, type/kind change, request param made required,
  response field no longer required, …) → `major`
- **additive only** (new path/op, new optional param, new optional response field) →
  `minor`
- **no surface change** → skip publish (this is what `detect-drift` reports today)
- non-surface text-only change (descriptions) → `patch` (or skip; configurable)

`classify-bump.cjs` reuses the existing comparison engine in `check-compatibility.cjs`
(it already detects "breaking"); it adds detection of "additive" so the three-way
classification falls out. The breaking gate still runs and still respects an explicit
"allow breaking" escape hatch for intentional majors.

**Pre-1.0 cap.** While a package's stable major is `0`, a `major` classification is
published as a `minor` bump — there are no stability guarantees pre-1.0, so e.g. the
`/api/v1/` → `/api/v2/` cut lands as `0.2.0` → `0.3.0`, not `1.0.0`. The cap lifts
automatically once a package reaches `1.0.0`; set `SDK_ALLOW_MAJOR=true` to cut a real
major. Note this only affects the *version number* — a change that is breaking versus a
channel's published spec still trips the breaking gate, so the first `production` cut to
v2 must be a dispatched run with `allow_breaking=true` (safe here: no external consumers
on `latest` yet).

For `rc`: the prerelease version is `bump(lastStable, type)-rc.<run_number>` (same scheme
as before, but `type` is now computed). For `latest`: `versions.json` is bumped by `type`
and committed back.

## Manual setup checklist (decision 5)

These cannot be scripted — do them once.

### A. Cross-repo auth — GitHub App (recommended over a PAT)

1. Org → **Settings → Developer settings → GitHub Apps → New GitHub App**.
   - Repository permissions: **Contents: Read & write**, **Metadata: Read-only**
     (add **Pull requests: Read & write** only if you choose the PR-based handoff
     instead of a direct push).
   - No webhook needed.
2. **Install** the app on `Rundit/rundit-sdk` (and on `rundit-back` if the same app
   also reads there).
3. **Generate a private key**; note the numeric **App ID**.
4. Add to **rundit-back** secrets (repo or org):
   - `SDK_BOT_APP_ID` = the App ID
   - `SDK_BOT_PRIVATE_KEY` = the PEM private key
5. In the rundit-back ship-spec job, mint a short-lived token and push:
   ```yaml
   - uses: actions/create-github-app-token@v1
     id: app-token
     with:
       app-id: ${{ secrets.SDK_BOT_APP_ID }}
       private-key: ${{ secrets.SDK_BOT_PRIVATE_KEY }}
       owner: Rundit
       repositories: rundit-sdk
   # then `git push` / checkout rundit-sdk using ${{ steps.app-token.outputs.token }}
   ```

   *Alternative:* a **fine-grained PAT** scoped to `rundit-sdk` with Contents: RW,
   stored as `SDK_SYNC_TOKEN`. Simpler, but it's owned by a person and expires.

### B. npm trusted publishing (provenance)

1. On npmjs.com, for **each** package (`@rundit-sdk/client`, `@rundit-sdk/embed`):
   **Package → Settings → Trusted Publishers → Add GitHub Actions**:
   - Organization/owner: `Rundit`
   - Repository: `rundit-sdk`
   - Workflow filename: `publish.yml` (keep this stable — OIDC matches on it)
   - Environment: optional
2. The packages already exist (0.2.x), so you can configure trusted publishers now.
3. The `publish.yml` job needs:
   ```yaml
   permissions:
     id-token: write   # OIDC for provenance
     contents: write   # commit regenerated code back
   ```
   and publishes with `npm publish --provenance --access public`.
4. With trusted publishing, **no `NPM_TOKEN` is needed** — OIDC replaces it (a security
   win). Node 24 / npm ≥ 9.5 already satisfy the provenance requirement.

### C. Branch setup

- Create `develop` and `production` branches here; set `production` as default.
- If branches are protected, either let the App push directly (allow it to bypass) or
  switch the handoff to a PR + auto-merge.

## Migration plan (phased, reversible)

**Phase 1 — stand up rundit-sdk.** Move the scripts above; add `classify-bump.cjs` and
`publish.yml`; configure trusted publishing (B) and branches (C); seed `spec/` with the
current spec and commit the current generated `packages/`. Prove it can publish
`0.3.0-rc` **with provenance** from `develop`.

**Phase 2 — rundit-back emits + ships.** Add a job that runs `write-openapi.ts` and
ships `sdk.openapi.json` into this repo's matching branch using the App token (A).

**Phase 3 — cutover.** Disable `rundit-back/.github/workflows/sdk-publish.yml`. Consumers
need no change.

Until cutover, the existing `rundit-back` publish path keeps working. Most of this
session's `rundit-back` work *relocates* here rather than being discarded:
`detect-drift.cjs` moves in as-is; the `release-type.json` marker is superseded by
`classify-bump.cjs`; the gitignore of generated artifacts in `rundit-back` becomes moot
once codegen lives here.
