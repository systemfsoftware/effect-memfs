# CONTRIBUTING

This guide is intended for developers modifying the source code of systemfsoftware/effect-memfs. The repository maintains the @systemfsoftware/effect-memfs package.

## Prerequisites

- A supported system: the flake builds only on `x86_64-linux` and `aarch64-linux`; the setup below fails on macOS and BSD.
- Nix with flakes
- GNU coreutils: the setup command uses `cp -L --no-preserve=mode`
- Node.js 24
- pnpm 12.9.0

## Setup and Workflow

```sh
mkdir -p .sfs-deps && cp -L --no-preserve=mode "$(nix build --no-link --print-out-paths .#sfs-deps)"/*.tgz .sfs-deps/
pnpm install
pnpm --filter @systemfsoftware/effect-memfs lint
pnpm --filter @systemfsoftware/effect-memfs typecheck
pnpm --filter @systemfsoftware/effect-memfs build
pnpm format
pnpm check:local
```

`pnpm check:local` reproduces the required CI static lane and tests: dprint, build, lint, typecheck, API reports,
attw and the tests (no package defines type tests yet, so that step runs nothing). It does not check commit messages; see below. Run it before pushing; the per-package commands above are for quick iteration only.

Contributors modify the underlying TypeScript sources that define MemoryFileSystem, its Effect filesystem layer, and its watcher implementation.

## Pull-Request Guidance

Contributors can propose changes by submitting pull requests against the systemfsoftware/effect-memfs repository.
Pull requests merge as one squash commit titled with the pull request's title, and Mergify requires that title to
match `type(scope)!: subject` with type one of build, chore, ci, docs, feat, fix, perf, refactor, revert, style or
test. Commitlint (`commitlint.config.ts`) also lints the pull request's commits and is a queue condition, but its
type list is wider, so a title it accepts (`deps:`, `security:`) can still fail Mergify's check.
