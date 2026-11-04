---
title: Align the Effect tsgo lint preset with the patched tool
date: 2026-11-04
category: tooling-decisions
module: Effect lint tooling
problem_type: tooling_decision
component: tooling
severity: medium
applies_when:
  - Upgrading @effect/tsgo or removing its pnpm override
retire_when: "The org oxlint preset no longer depends on an incompatible @effect/tsgo range (SYS-990); check the released preset's package metadata."
tags: [effect, tsgo, oxlint, pnpm, dependencies]
---

# Align the Effect tsgo lint preset with the patched tool

## Context

The workspace patches oxlint with the root `@effect/tsgo` installation, while the recommended oxlint preset imports its Effect rule definitions from its own `@effect/tsgo` dependency. The released preset used here declares `^0.51.1`; the workspace uses `^0.64.1`. Those 0.x caret ranges do not overlap, so removing the existing override can resolve different tool versions for the patch and preset.

## Guidance

Keep the existing `@effect/tsgo` catalog override while the preset's dependency range is incompatible. When the upstream preset is updated, inspect its published dependency metadata and the lockfile, then evaluate removal of the override with the actual resolved versions and lint behavior. Do not add Effect or platform overrides to solve this tooling mismatch.

## Why This Matters

The preset derives its enabled Effect rules from `@effect/tsgo/oxlint-presets`. A split resolution can pair one version's rule definitions with a differently patched lint binary; a successful package install alone does not establish equivalent lint coverage. `pnpm why -r @effect/tsgo` showed one resolved version with the override in place.

## When to Apply

- Changing `@effect/tsgo`, the org oxlint preset, or the existing override.
- Investigating a lint rule that appears, disappears, or changes after a dependency update.

## Examples

With tsgo 0.64.1, replacing `Effect.isSuccess(effect)` with `Effect.match(effect, { onFailure: () => false, onSuccess: () => true })` caused lint to report `effecttsgo(match-boolean-to-is-success)`; the `Effect.isSuccess` form passed. Compare the actual lint result and rule coverage before and after a resolution change rather than assuming matching version declarations imply matching behavior.

## Related

- SYS-990 tracks correcting the org preset's tsgo dependency at its source.
