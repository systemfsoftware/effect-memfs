# effect-memfs

In-memory FileSystem for @effect/platform.

Extracted from `systemfsoftware/systemfsoftware` (core); package history came with the move.

## Routing

| Doc                                 | Trigger                                                                                                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `CONSTITUTION.md`                   | architecture changes, rule authoring, or design disputes                                                                                        |
| `repos/constitution/ENFORCEMENT.md` | building or changing an instrument that grades work (lint gates, stream rules, CI checks, thresholds, rubrics, advisors); situational read only |

## Packages

| Package                         | Version | Distributed    |
| ------------------------------- | ------- | -------------- |
| `@systemfsoftware/effect-memfs` | 6.0.5   | yes (registry) |

`repos/constitution/` is a vendored, read-only subtree: never edit it by hand; it changes only through
`git subtree pull --squash -P repos/constitution` (see CONTRIBUTING.md).

## Dependencies on core

https://nix.systemfsoftware.com is the package registry for `@systemfsoftware` packages: a producer pushes its package tarballs there from `main`, a consumer substitutes them through its flake inputs, and nothing is published to npm.

`flake.nix` pins core at a full commit (input `core`) and `lib.mkProducerTarballs` lays core's tarballs under
`.deps/`. `pnpm-workspace.yaml` maps each core package to `file:.deps/<name>.tgz` through `overrides`; the
moved manifests name ordinary semver ranges. To take newer core packages: bump the `core` input, regenerate the
overrides with `nix eval --raw .#producer-tarballs.overrides`, then run `pnpm update '@systemfsoftware/*'`.

Local setup (x86_64-linux or aarch64-linux only; the flake declares no other systems):

```bash
nix develop
pnpm install
```

## Gate

- `pnpm check:local` before delivery: dprint, build, lint, typecheck, type tests, API reports, attw, tests at the
  local conformance profile.
- CI (`.github/workflows/ci.yml`) calls core's reusable checks at a pinned core commit. A pull request runs
  the static lane and the affected tests (`.github/ci/pr-tests.mjs`: `turbo --affected`, `vitest --changed`) and no
  packed test job. A Mergify queue draft (`mergify/merge-queue/*`) runs the full suite: the static lane and every
  package's whole suite. Main runs the full suite again after each merge, and a package whose content hash already
  passed whole is a cache hit, not left out by name. `nix.yml` builds the flake outputs on main only.
- The Stop hook in `.claude/settings.json` runs `pnpm format` best-effort: it is silent on failure and times out
  after 30 s, so `pnpm check:local` (not the hook) is what proves the tree is formatted.
- Never start a local mutation run; mutation runs in CI only.
- Version bumps: every change to a publishable package's packed output advances its version at least a patch.

## Conventions

- Run `pnpm --filter <pkg> <cmd>` from the root; never `cd` into packages, never `npx`.
- Commits: `type(scope): subject` (commitlint).
- Tooling scripts are TypeScript run by the toolchain already in the workspace; no synchronous IO in new scripts.
