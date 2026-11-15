# effect-memfs

An in-memory `FileSystem` for Effect. Seed it with paths and contents, and any code that asks Effect for the `FileSystem` service reads and writes that map instead of the disk.

## Install

```sh
pnpm add @systemfsoftware/effect-memfs effect
```

`effect` is a peer dependency. Every release is published to npm from this repository's release workflow, with
provenance.

## Example

`MemoryFileSystem.make` takes the initial contents. Its `layer` provides Effect's `FileSystem` service:

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

```text
milk, bread
```

## API

- `MemoryFileSystem.make(contents?)` builds a blueprint with the root at `/`. `contents` maps paths to file contents; a path's parent directories are created from it.
- `.layer` provides `FileSystem.FileSystem` and a `Watcher` service.
- `.effect` provides the `FileSystem` service as an Effect.
- `.withContents(...)` and `.withCwd(...)` return a revised blueprint.

The [API report](packages/effect-memfs/etc/effect-memfs.api.md) lists every export, and the [module source](packages/effect-memfs/src/MemoryFileSystem/mod.ts) shows the implementation.

## Contributing

Development setup and checks are in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Apache-2.0: [LICENSE](LICENSE).
