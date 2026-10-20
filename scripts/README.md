# scripts

Generate, validate, version, and publish the Rundit SDK packages
(`@rundit-sdk/embed`, `@rundit-sdk/client`) from a single OpenAPI spec.

The spec is **not** authored here — `rundit-back` emits `spec/sdk.openapi.json` (via its
`write-openapi.ts`, which introspects the live NestJS controllers) and commits it into
this repo. That spec is the contract. The generated packages live under
`packages/<packageDir>/` and are **fully regenerated** on every build — never hand-edit
anything in there. They are committed (on stable releases) as the public source of truth.

## The pipeline

```
rundit-back  ──commits──▶  spec/sdk.openapi.json
                                   │
                                   ▼
                           generate-sdk.cjs
                                   │
                     ┌─────────────┼─────────────┐
                     ▼             ▼             ▼
              packages/embed  packages/client  (one dir per audience)
                                   │
                                   ▼
                     detect-drift.cjs        ◀── publish only if surface != dist-tag
                     check-sdk-surface.cjs   ◀── leak guard + consumer typecheck
                     wire-test.mjs           ◀── runtime contract (URL/headers/body)
                     check-compatibility.cjs ◀── breaking-change gate (vs channel tag)
                     classify-bump.cjs       ◀── derive major/minor/patch (vs latest)
                                   │
                                   ▼
                     bump-version.cjs (release only) → versions.json
                                   │
                                   ▼
                           generate-sdk.cjs ◀── re-bake version
                                   │
                                   ▼
                           publish-packages.cjs ◀── npm publish --provenance
```

The npm aliases for each step live in the root `package.json` under `sdk:*`. CI wiring
is in [.github/workflows/publish.yml](../.github/workflows/publish.yml).

## Channels & versioning

| Branch (here) | dist-tag | Notes |
| ------------- | -------- | ----- |
| `develop`     | `rc`     | preview of the next stable; not committed back |
| `production`  | `latest` | stable release; generated source committed back |

- `versions.json` stores only **stable** release versions (bumped on `production`).
- The bump type is **auto-derived** by `classify-bump.cjs` (no manual marker): it diffs
  the generated surface against `latest` in both directions — breaking ⇒ `major`,
  additive ⇒ `minor`, non-structural ⇒ `patch`, identical ⇒ `none`.
- rc versions are `bump(lastStable, type)-rc.<run_number>`; stable bumps `versions.json`.

## Files in this directory

| File | Purpose |
| ---- | ------- |
| [contract.cjs](contract.cjs) | Single source of truth for which packages exist, their npm names, factory/type names, auth scheme, and maturity. Every other script reads from this. |
| [generate-sdk.cjs](generate-sdk.cjs) | Reads `spec/sdk.openapi.json` and emits a complete publishable package per audience: runtime JS, `.d.ts`, README, `AGENTS.md`, `ai-manifest.json`, agent `SKILL.md`, and a per-audience `openapi.json`. Wipes each package dir before writing. |
| [detect-drift.cjs](detect-drift.cjs) | Prints `true`/`false`: does the generated surface differ from the package published at a given dist-tag? Gates whether a publish runs at all. |
| [check-sdk-surface.cjs](check-sdk-surface.cjs) | Guards against leaking internal `@rundit/*` references or source paths into the published artifacts. Runs a consumer typecheck against the generated `.d.ts`. |
| [../wire-test.mjs](../wire-test.mjs) | Manifest-driven runtime contract test (Node's built-in test runner, zero deps). Walks each client's `routeManifest`, invokes every method with a mocked `fetch`, and asserts HTTP method, URL, path interpolation, required query params, auth header, and body+`Content-Type`. Run via `npm run sdk:check-wire-contract`. |
| [check-compatibility.cjs](check-compatibility.cjs) | Diffs the generated `openapi.json` against the spec bundled in the version at `SDK_DIST_TAG` (default `latest`) and fails on breaking changes. Override with `SDK_ALLOW_BREAKING=true` for intentional majors. Exports `findBreakingChanges`/`loadPublishedSpec` for `classify-bump.cjs`. |
| [classify-bump.cjs](classify-bump.cjs) | Derives the semver bump (`major`/`minor`/`patch`/`none`) from the spec diff vs a dist-tag. Replaces the old manual release-type marker. |
| [bump-version.cjs](bump-version.cjs) | Bumps `versions.json` (patch/minor/major). Versions live there — not in each `package.json` — because `generate-sdk.cjs` rewrites `package.json` from scratch each run. |
| [publish-packages.cjs](publish-packages.cjs) | Publishes each package to npm, skipping any `name@version` already on the registry (safe to re-run after a partial failure). Adds `--provenance` automatically in GitHub Actions and supports dist-tags via `SDK_NPM_DIST_TAG`. |

## Adding a new SDK audience

1. Add an entry to `sdkPackages` in [contract.cjs](contract.cjs).
2. Tag the relevant operations in `rundit-back`'s `src/sdk-api/*` with `x-sdk-audiences: [<your-audience-key>]` (so the next emitted spec carries them).
3. Run `npm run sdk:generate` and inspect the new `packages/<dir>/`.
4. Run `npm run sdk:check-surface` and `npm run sdk:check-wire-contract`.

## Conventions

- **Audience routing** is done by the `x-sdk-audiences` extension on each OpenAPI operation. An operation can belong to multiple audiences.
- **Identifiers in operationIds** use `namespace.operation` (e.g. `companies.getAll`) — the generator splits this to build `client.companies.getAll(...)`.
- **`x-sdk-namespace` / `x-sdk-operation`** can override the parsed `operationId`.
- **Path prefix `/api/v2/sdk`** is stripped from the runtime client because consumers configure `baseUrl` to point at that prefix already.
- **Runtime is dependency-free**: the generated client uses `globalThis.fetch` (or an injected `options.fetch`). Don't add npm dependencies to the generated `package.json`.
