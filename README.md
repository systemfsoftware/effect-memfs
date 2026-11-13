# effect-memfs

An in-memory `FileSystem` for Effect. Seed it with paths and contents, and any code that asks Effect for the `FileSystem` service reads and writes that map instead of the disk.

## Install

`@systemfsoftware` packages are distributed as Nix tarballs from `nix.systemfsoftware.com`, not from npm, so do not run `npm install` or `pnpm add` for them. Take them through a flake. Third-party peers such as `effect` install from npm as usual.

Add the producer as a flake input in your project's `flake.nix`. Pin it to a full commit SHA or a release tag:

```nix
{
  nixConfig = {
    extra-substituters = "https://nix.systemfsoftware.com";
    extra-trusted-public-keys = "nix-cache-1:wXA8I4DayNW9q6enUyQA/P/nT38pGSTLt374t3gsn7M=";
  };

  inputs = {
    nixpkgs.follows = "effect-memfs/nixpkgs";
    effect-memfs.url = "github:systemfsoftware/effect-memfs/<rev>";
    pnpm-release-management.url = "github:systemfsoftware/pnpm-release-management";
  };

  outputs = { self, nixpkgs, effect-memfs, pnpm-release-management }: {
    packages = nixpkgs.lib.genAttrs [ "x86_64-linux" "aarch64-linux" ] (system:
      let pkgs = nixpkgs.legacyPackages.${system}; in rec {
        producer-tarballs = pnpm-release-management.lib.mkProducerTarballs {
          inherit pkgs;
          producers = { inherit effect-memfs; };
        };
        pnpm-store = pnpm-release-management.lib.mkPnpmConsumerStore {
          inherit pkgs;
          src = self;
          files.".deps" = producer-tarballs;
        };
      });

    devShells = nixpkgs.lib.genAttrs [ "x86_64-linux" "aarch64-linux" ] (system:
      let pkgs = nixpkgs.legacyPackages.${system}; in {
        default = pkgs.mkShell {
          packages = [ pkgs.nodejs_24 pkgs.pnpm_12 ];
          shellHook = self.packages.${system}.producer-tarballs.shellHook;
        };
      });
  };
}
```

Then, inside `nix develop`:

```sh
nix eval --raw .#producer-tarballs.overrides   # paste the output into pnpm-workspace.yaml
pnpm add effect
```

Declare the package in `package.json` as a tarball in `.deps/`:

```json
"@systemfsoftware/effect-memfs": "file:.deps/effect-memfs.tgz"
```

Add `.deps/` to `.gitignore`.

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
