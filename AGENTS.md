# Agent instructions for rundit-sdk

## Purpose and source of truth

This public repository exists to generate and publish npm packages with provenance
from the private `rundit-back` SDK API. It is a thin generation/publishing bridge,
not a separately maintained API implementation or a parallel backend release train.

- `rundit-back` owns the API contract. Its workflow generates OpenAPI from the
  corresponding backend branch and ships it here when the spec changes.
- Backend `develop` → SDK `develop` → npm `rc` (`-rc` versions).
- Backend `production` → SDK `production` → npm `latest` (stable versions).
- Ordinary endpoint, DTO, schema, and backend release changes require no manual
  changes or companion PR in this repository. Let the existing automation run.

## Default: leave this repository unchanged

- Do not create develop-to-production promotion, branch synchronization, generated
  package refresh, or version-counter synchronization PRs as part of backend work.
- Do not merge SDK branches merely because backend branches are being merged.
- Do not hand-edit or copy `spec/sdk.openapi.json` between branches. It belongs to
  the backend spec-shipping workflow.
- Do not hand-edit or copy `packages/` between branches. These are generated
  artifacts, including their README, AGENTS, and skill files; their instructions
  describe SDK consumption, not permission to maintain generated output manually.
- Do not copy `versions.json` from develop to production. Production's stable
  release counter is authoritative; develop's counter can legitimately lag.
- Stale committed RC artifacts and large GitHub comparison diffs are not reasons
  to modify or synchronize branches. Compare branch tips and regenerate in a
  temporary directory before interpreting generated-file differences.

## Narrow exceptions for tooling work

Change this repository only for a demonstrated case the existing package generator
cannot handle correctly, a concrete defect in generation/validation/publishing
tooling, or an explicit request to maintain that tooling or its instructions.

- Explain the concrete defect, why a backend contract change alone cannot solve
  it, and the smallest necessary tooling change. Do not add speculative helpers,
  release orchestration, or downstream deployment behavior as incidental work.
- Keep changes in generator code/templates, relevant checks/tests, and necessary
  workflow or documentation files. Validate against the target branch's own spec.
- For a production tooling fix, branch from production and apply only the relevant
  tooling changes. Preserve its spec and stable version baseline; leave release
  artifact updates to the publishing workflow. Do not promote all of develop.
- Run generation and the relevant existing checks in a temporary copy. Do not
  include incidental generated output in a tooling PR.
- Check publishing behavior explicitly: the current push trigger watches only the
  spec, and drift detection compares only OpenAPI paths/components. Tooling-only
  changes may require a deliberate forced publish; merging them does not release
  them automatically. Do not dispatch a release merely to validate a change.
- Treat the migration/bootstrap instructions in `DEVELOPMENT.md` as historical
  setup guidance, not a recurring branch-promotion procedure.
- Never make commits unless explicitly instructed.
