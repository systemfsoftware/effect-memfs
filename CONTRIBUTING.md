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
```

Contributors modify the underlying TypeScript sources that define MemoryFileSystem, its Effect filesystem layer, and its watcher implementation.

## Pull-Request Guidance

Contributors can propose changes by submitting pull requests against the systemfsoftware/effect-memfs repository.
