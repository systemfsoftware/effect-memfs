# effect-memfs

The repository systemfsoftware/effect-memfs provides an in-memory Effect filesystem.

## Package Navigation

[`@systemfsoftware/effect-memfs`](packages/effect-memfs/README.md)

The package version in the source repository is 6.0.5. https://nix.systemfsoftware.com is the package registry for `@systemfsoftware` packages: a producer pushes its package tarballs there from `main`, a consumer substitutes them through its flake inputs, and nothing is published to npm.

## Installation

Consume this package through its flake input, which substitutes its tarballs from the registry; see the repository's AGENTS.md.

## Example

To integrate the in-memory filesystem, developers configure their application to use MemoryFileSystem.

`example.mjs`:

```js
import { MemoryFileSystem } from '@systemfsoftware/effect-memfs'
import { Effect } from 'effect'
import * as FileSystem from 'effect/FileSystem'

const program = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem
  yield* fs.writeFile('/notes/list.txt', new TextEncoder().encode('milk, bread'))
  return new TextDecoder().decode(yield* fs.readFile('/notes/list.txt'))
}).pipe(Effect.provide(MemoryFileSystem.make({ '/notes/hello.txt': 'hello' }).layer))

console.log(await Effect.runPromise(program))
```

```sh
pnpm exec node example.mjs
```

```text
milk, bread
```

## Supported Usage and Documentation Links

The MemoryFileSystem blueprint provides an Effect filesystem layer and a watcher.

[API reference](packages/effect-memfs/etc/effect-memfs.api.md) · [Source](packages/effect-memfs/src/MemoryFileSystem/mod.ts) · [CONTRIBUTING.md](CONTRIBUTING.md)

Source setup runs on `x86_64-linux` and `aarch64-linux` with Nix flakes and GNU coreutils; the flake has no outputs for macOS or BSD.

## License

Apache-2.0: [LICENSE](LICENSE).
