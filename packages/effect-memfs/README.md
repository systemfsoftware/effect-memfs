# @systemfsoftware/effect-memfs

In-memory FileSystem for @effect/platform.

## Install

https://nix.systemfsoftware.com is the package registry for `@systemfsoftware` packages: a producer pushes its package tarballs there from `main`, a consumer substitutes them through its flake inputs, and nothing is published to npm.

Take `@systemfsoftware/effect-memfs` from the repository's flake, which pins its tarball in `flake.lock`; see the repository README's [Install](../../README.md) section. Its peer dependencies, `effect@^4` and `typescript@>=5.0.0`, come from your project.

Those are peer dependencies: this package declares them but does not install them, so one copy is shared with the rest of your project.

## Entry points

- `@systemfsoftware/effect-memfs`

## API

The public surface is generated from the source and versioned with the package: [`etc/effect-memfs.api.md`](./etc/effect-memfs.api.md).

## License

Apache-2.0. Part of [systemfsoftware](https://github.com/systemfsoftware/effect-memfs/tree/main/packages/effect-memfs#readme).
