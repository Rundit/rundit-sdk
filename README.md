# rundit-sdk

Generated JavaScript clients for the Rundit SDK API. See [DEVELOPMENT.md](DEVELOPMENT.md)
for the generation and publishing architecture.

## Release notes

Every publishable SDK change must include a JSON fragment beside its source under
`rundit-back/src/sdk-api/release-notes`. The backend workflow mirrors it into this
repository's `release-notes/` directory with the OpenAPI spec; see
[the release-note guide](release-notes/README.md). Publishing rejects undocumented
surface changes. Note types participate in version selection, and breaking notes must
include migration guidance.

RC publishing validates the fragments and uses their severity to select the candidate
version, but does not render or publish release notes. Stable publishing compiles every
pending fragment into [CHANGELOG.md](CHANGELOG.md), the changelog shipped in each npm
package, and package-specific GitHub Releases tagged as `client-vX.Y.Z` and
`embed-vX.Y.Z`. Released note hashes are recorded in `releases/index.json`, so changing
an already published note fails validation. An RC such as `0.4.0-rc.42` promotes on
production as `0.4.0` when its contract and notes are unchanged.
