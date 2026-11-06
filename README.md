# effect-memfs

The repository systemfsoftware/effect-memfs provides an in-memory Effect filesystem.

## Package Navigation

[`@systemfsoftware/effect-memfs`](packages/effect-memfs/README.md)

Within the source repository, the package version is designated as 6.0.5. As of 2026-11-06, the latest observed version on the public registry was 6.0.0, and the registry endpoint for version 6.0.5 returned an HTTP 404 status.

## Installation

To consume this package, developers can resolve @systemfsoftware/effect-memfs through their project's package manager.

```sh
pnpm add @systemfsoftware/effect-memfs@6.0.0 effect@4.1.0 typescript@7.0.2
```

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

## License

Apache-2.0: [LICENSE](LICENSE).
