# Mirrored SDK release notes

The JSON fragments in this directory are mirrored from
`rundit-back/src/sdk-api/release-notes` alongside the generated OpenAPI spec. Author and
review release descriptions there, beside the API source. The publishing workflow
refuses to publish a changed SDK surface without a matching unreleased note. Do not edit
the mirrored JSON files here.

The source fragment uses a short, stable, lower-case filename such as
`efficient-mcp-surface.json`:

```json
{
  "title": "Read portfolio data with smaller responses",
  "type": "feature",
  "packages": ["client", "embed"],
  "changes": ["Added an optional point limit to metric reads."],
  "migration": "Optional guidance for consumers. Required when type is breaking."
}
```

`type` is one of `breaking`, `feature`, `fix`, or `docs`. Package keys come from
`scripts/contract.cjs`. A breaking note must explain how consumers migrate, and the
workflow rejects a breaking surface classification without one.

Notes stay pending through any number of RC releases. RC publishing validates them and
uses their severity for version selection, but does not generate changelogs or GitHub
Releases. Stable publishing compiles all pending notes into the root and package
changelogs and creates package-specific GitHub Releases. `releases/index.json` records
their content hashes and exact stable versions. Never edit a released note; add a new
note that corrects it. RC publishing reads the stable release index and version state
from `production`, so released notes are not repeated and the RC/final semver policy
stays aligned when branch history differs.
