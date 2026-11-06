---
title: README and Repository Setup - Plan
type: feat
date: 2026-11-06
artifact_contract: ce-unified-plan/v1
product_contract_source: ce-plan-bootstrap
execution: code
---

# README and Repository Setup - Plan

## Goal Capsule

**Objective:** A visitor can evaluate and use effect-memfs from accurate documentation, and contributors can set up the extracted repository without inheriting incorrect attribution.

**Means:** Separate registry and source evidence, restore ordinary repository setup, and complete the authorized review and merge path (KTD1–KTD4).

**Authority and stop conditions:** SYS-1166 and the current operator instructions govern scope. The maker never edits locked agent instructions or judgment surfaces. Stop at an unavailable authorized author, failed subtree preflight or audit, unverified publication clearance, missing required evidence, or a non-activated merge queue. The plan commit precedes every implementation commit. No push is authorized by this planning assignment.

---

## Product Contract

### Summary

Produce a repository-specific root README and contributor setup, a tracked constitution subtree, a matching Apache license, and accurate attribution. Verify the actual PR head and default branch rather than treating draft text as evidence.

### Problem Frame

The extracted public repository has no root README or ordinary root setup files. Existing descriptions say it is a fork, contrary to the SYS-1166 ruling. The package version in source is ahead of the registry's latest version, so a source-derived example cannot be assumed to describe the registry artifact.

### Requirements

**Reader and contributor experience**

- R1. Create a real root README through the maintained `write-readme-md` procedure, with process, checks and numerical score reported on the PR.
- R2. Verify each install and use claim in a fresh checkout of the actual final PR head, recording the exact SHA, environment, commands, outputs, and exit statuses.
- R3. Distinguish source-checkout use from a separately executed registry-consumer example; do not represent source version 6.0.4 as published or publish any package.
- R4. Add repo-specific `CONTRIBUTING.md`, ordinary applicable Claude settings, a root constitution pointer, a declarative constitution subtree, and the template-matching root Apache-2.0 license.

**Attribution and authority**

- R5. Correct only false repository-fork descriptions at the five named destinations; re-inspect all fork matches and preserve unrelated uses.
- R6. Never author or edit locked `AGENTS.md` or `CLAUDE.md`; supply complete proposed text and exact destinations unapplied to the authorized outer source route under `agent-docs`.
- R7. Route any Gemini copy request through root's existing approved browser actor, one question per operation; treat output as a lead and verify every claim against sources.

**Delivery**

- R8. Use report-only `ce-doc-review`, independent code review, original findings and dispositions, existing required CI and Mergify; verify artifacts on default main after merge.
- R9. Before any future push, verify current SYS-1111 publication clearance, not just issue status. If Merge Queue is not activated, record an owner-only hold; never manually merge or bypass policy.
- R10. Add no tests, checks, gates, provider, paid service, publication bypass, visibility change, starter product content, or worktrunk-scripts subtree.

### Scope Boundaries

- Implementation, README copy, setup, license and attribution changes are not authorized by this planning run.
- Existing package behavior, real `Effect.forkScoped` and the Vite split-forks comment are outside attribution cleanup.
- No new automation or compatibility shim is warranted; the existing tooling and review routes are the requested mechanisms.

### Sources

- [SYS-1166](https://linear.app/systemfsoftware/issue/SYS-1166/effect-memfs-deliver-readme-and-extracted-repo-setup-remove-false-fork), parent SYS-1135, and [SYS-1111](https://linear.app/systemfsoftware/issue/SYS-1111/omp-profile-op28-no-local-full-gates-contradicts-ce-commit-push-prs).
- Base `fcfd0127cfb53fcd2c766c25805d3043a5e9285f`: `package.json`, `packages/effect-memfs/package.json`, `packages/effect-memfs/src/mod.ts`, `packages/effect-memfs/src/MemoryFileSystem/mod.ts`, `packages/effect-memfs/src/memory-file-system.blueprint.ts`, and `packages/effect-memfs/tests/clean-up-temporary-files.integration.test.ts`.
- [npm latest metadata](https://registry.npmjs.org/@systemfsoftware%2feffect-memfs/latest) reported 6.0.0 on 2026-11-06; the [6.0.4 registry endpoint](https://registry.npmjs.org/@systemfsoftware%2feffect-memfs/6.0.4) returned HTTP 404. Source version 6.0.4 was unpublished at that check. Recheck at execution; the package exports `dist/mod`, and root specifies pnpm 12.9.0.
- Pinned [starter tree](https://github.com/systemfsoftware/effect-endgame-starter-kit/tree/80f85e8f3caab86ee2cf8159592da401cba7b28f): `CLAUDE.md`, `subtrees.toml`, `.claude/settings.json`, `CONTRIBUTING.md`, `CONSTITUTION.md`, `LICENSE`. The pinned Git object for root `CONSTITUTION.md` is a 34-byte symlink containing `repos/constitution/CONSTITUTION.md` (blob `67e49c5368ccf452ec409ad9116266daf80e79d4`), not the full constitution. The contents API follows this link, so its expanded response is not the root object. Starter and package license bytes share SHA-256 `ba24c1fd402c3031ea9e849cf9a9ad300ddf30dce9a81d1894a7e7141dbad339`.
- `.compound-engineering/config.yaml` and `config.local.yaml` are absent at the base; the pack resolver returned no roots, warnings or errors. Do not add configuration.

---

## Planning Contract

### Key Technical Decisions

- KTD1. **Separate artifacts by audience and version.** The root maps the workspace and shows a verified useful call; the leaf remains the package's registry-facing page. Source setup and contributor commands belong in `CONTRIBUTING.md`. A root example must either run against the registry artifact it names or explicitly be a source-checkout example. This avoids treating different release states as interchangeable.
- KTD2. **Use the maintained subtree mechanism, not a hand-written copy.** Track upstream `main` and compare its fetched tree with the resulting `HEAD:repos/constitution`; a named vendor ref, signed synthetic squash/merge and audit establish real subtree provenance. Counter-case: copying the directory is simpler but loses update provenance; direct `git subtree add` risks the `FETCH_HEAD` race described by G28.
- KTD3. **First-add config and subtree in one signed root tree using the maintained plumbing algorithm.** Follow `git-subtree-vendor/SKILL.md:84-105` and `git-subtree-vendor/scripts/lib.ts:250-339`: the latter documents scratch-index tree grafting, explicit signing, subtree trailers, compare-and-swap `HEAD`, and two-tree synchronization. Adapt the scratch tree to include the first configuration blob before `write-tree`; the stock `importSubtree` function does not itself insert this blob. This is a manual use of the documented algorithm, not a claim that the unmodified wrapper performs the combined operation. No machinery edits or new script are needed.

  1. Gather clean Git status, history, branch and diff as separate commands; confirm a real branch and run the signing preflight before fetching. Stop on failure.
  2. Fetch upstream constitution `main` with `--no-tags` to `refs/remotes/vendor/constitution`; verify the named commit and a known upstream canary, and record the fetched SHA and tree.
  3. Write the complete single `[[repos]]` entry with name, HTTPS URL, description and `branch = "main"` in a temporary location outside the worktree; read it back. Create its Git blob without making a worktree file, keeping the worktree clean for synchronization.
  4. In a scratch index read old `HEAD`, graft the fetched upstream tree at `repos/constitution/`, and insert that config blob as `subtrees.toml` before writing the new root tree. Confirm the same tree contains both the config and subtree. The real index remains untouched.
  5. Create the signed synthetic squash from the upstream tree with `git-subtree-dir` and `git-subtree-split` trailers, then a signed two-parent merge commit with the combined root tree, old HEAD first and synthetic commit second. Compare-and-swap `HEAD` from old to new and synchronize the real index and worktree with two-tree `read-tree`; on sync failure use the documented compare-and-swap rollback and stop.
  6. Validate the resulting config, audit `HEAD:repos/constitution` against the named vendor tree, check both signatures and inspect dangling gitlinks. Retain the named vendor ref and record evidence.

  G11 holds because the same merge commit introduces the populated config and subtree; G24 prevents tag following, G28 avoids `FETCH_HEAD` and manual `git subtree add`, and G7/G30 require signed commits and preflight. Reject the first-add wrapper sequence: `initial-setup.md:37-41` pre-registers the name that `add-subtree.ts:94-103` rejects, and `add-subtree.ts:169-180` registers config separately after import, contrary to G11. Reject initial-setup Approach B because its `git subtree add` conflicts with G28. No root repair precondition remains.
- KTD4. **Locked outer author owns agent files.** The maker supplies a full replacement for `AGENTS.md`, preserving every existing instruction except the unsupported fork phrase, and a complete proposed `CLAUDE.md` containing only the three reference imports. The authorized outer author applies them. The maker verifies the resulting committed bytes without writing those destinations.
- KTD5. **Treat the scorer as a measurement, not a quality gate.** `write-readme-md/SKILL.md` requires shape selection, clean consumer execution, prose humanization, the 13-criterion scorer and manual checks. Its holdout means are 4.69/13 trending and 3.74/13 matched control; no score proves quality and no threshold is added. Read `references/readme-library.md`, `references/readme-monorepo.md`, `references/structure.md`, `references/readme-root-design.md`, and `references/readme-prose-humanizer.md` within that skill before drafting.

### High-Level Technical Design

```mermaid
flowchart TD
  P[Plan commit] --> M[Maker documentation and ordinary setup]
  P --> O[Outer-author proposals]
  P --> S[Prepare signed subtree and config together]
  S --> T[Signed subtree import and audit]
  M --> H[Final PR head]
  O --> H
  T --> H
  H --> V[Clean source and registry verification]
  V --> R[Independent review]
  R --> C{Publication clearance}
  C -->|yes| I[Push, PR and existing CI]
  C -->|no| W[Owner-only hold]
  I --> A{Merge queue active}
  A -->|yes| Q[Mergify queue]
  A -->|no| W
  Q --> D[Verify default-main artifacts and checks]
```

### Assumptions and Deferred Evidence

- Whether the published 6.0.0 surface supports the chosen source example is unverified; execute both paths separately and document only the behavior each proves.
- Exact execution-time upstream constitution commit, final PR SHA, queue activation, current clearance and paid-account billing are not known. Record real evidence; no invented receipts.
- Pinned starter settings call `comment-checker` and run `pnpm format` on stop. Adopt only applicable ordinary settings after checking availability and effects; do not introduce a new gate or copy app-specific bootstrap instructions.

### Cost

No new paid component or API call is planned: expected and worst-case incremental monthly cost for new paid services is **$0**, assuming one documentation/setup PR and its existing checks. Public standard GitHub-hosted runner compute is free; larger runners and excess artifact/cache storage can be billed, so existing CI spend cannot be bounded without account usage and retention data ([GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)). npm lists public packages at $0 ([npm pricing](https://www.npmjs.com/products)); no publishing occurs here. [Mergify pricing](https://mergify.com/pricing) lists open-source Merge Queue at $0; incremental expected and worst-case cost for this one public-repository PR on that tier is $0. If the existing account uses a paid plan or this work changes billable seats, actual incremental charges are unknown until its terms and active-seat count are checked; do not claim the existing subscription is free or already paid without billing evidence. The approved browser actor is existing, not a new API/provider purchase; its already-paid subscription and cost are unknown.

---

## Implementation Units

### U1. Establish evidence and prepare authorized proposals

**Goal:** Establish correct source facts and separate writer authority. **Requirements:** R5–R7, R9. **Dependencies:** plan commit. **Files:** `AGENTS.md` and `CLAUDE.md` (outer author only); `flake.nix`, `package.json`, `packages/effect-memfs/README.md`, `packages/effect-memfs/package.json` (maker). **Approach:** Reinspect every case-insensitive fork match, including `packages/effect-memfs/tests/watch-a-folder-for-changes.integration.test.ts` and `pnpm-workspace.yaml`; change only false attribution. Submit a complete proposed `AGENTS.md` preserving all other text and propose `CLAUDE.md` as exactly `@AGENTS.md`, `@subtrees.toml`, `@CONSTITUTION.md` on separate lines. Cite `agent-docs` ADOC-A1–A4 and ADOC-A14: grounded claims, separate reviewer, no new gate. Never edit either locked destination. **Test expectation:** none; metadata and instructions only. **Verification:** independently compare resulting outer-author files with proposals and confirm genuine fork matches remain. Reassess packed-output version policy in `AGENTS.md`; no package publish.

### U2. Add ordinary repository setup and subtree

**Goal:** Give contributors a truthful setup and a real tracked constitution. **Requirements:** R4, R6, R10. **Dependencies:** U1 and KTD3. **Files:** `CONSTITUTION.md`, `subtrees.toml`, `repos/constitution/`, `.claude/settings.json`, `CONTRIBUTING.md`, `LICENSE`. **Approach:** Execute the documented first-add plumbing in KTD3, preserving G11, G24, G28, G30 and G31. Keep vendored content read-only. Make the root pointer refer to the vendored constitution, as in the pinned Git object. Copy the byte-identical package license to the root. Derive contributor setup from `flake.nix`, `pnpm-workspace.yaml` and the existing root setup, not the starter's app-specific sandbox or `pnpm bootstrap`. **Test expectation:** none; use configuration, tree and clean-checkout evidence. **Verification:** config validates, subtree audit matches fetched tree, root license matches template bytes, and contributor setup executes on the final head.

### U3. Write and verify the README

**Goal:** Give users a trustworthy route to a useful result. **Requirements:** R1–R3, R7. **Dependencies:** U1 and U2. **Files:** `README.md`, `CONTRIBUTING.md`; source references `packages/effect-memfs/src/MemoryFileSystem/mod.ts`, `packages/effect-memfs/src/memory-file-system.blueprint.ts`, `packages/effect-memfs/src/MemoryFileSystemSpec.schema.ts`, `packages/effect-memfs/tests/clean-up-temporary-files.integration.test.ts`. **Approach:** Follow KTD1 and KTD5, using root map plus one minimal genuine usage path, not copied starter prose. The current source exports `MemoryFileSystem` from the package root; its blueprint `make` supplies a layer containing `FileSystem` and `Watcher`. Derive the runnable example from source and tests, and verify exact API and output on each artifact used. Ask root's existing browser actor for copy using the prompt below, then independently check every claim. **Execution note:** smoke the copyable consumer path rather than introducing permanent tests. **Test expectation:** none; documentation only. **Verification:** clean final-head checkout and separate registry consumer each record commands, actual output, exit status, OS, runtime/tool versions, SHA and timestamp; every README install/use claim has matching evidence. Record score out of 13 and individual criterion report on the PR, plus link, version, theme and README routing checks.

### U4. Review, publish only when cleared, and verify main

**Goal:** Preserve independent review and the existing merge policy. **Requirements:** R8–R10. **Dependencies:** U1–U3. **Files:** `.github/workflows/ci.yml`, `.github/ci/pr-tests.mjs`, `.mergify.yml` (read-only); PR evidence. **Approach:** Run report-only `ce-doc-review` and independent `ce-code-review`, retain original findings and evidence-backed dispositions; no cross-model pass. Resolve blocking findings without modifying the review instrument. Before push verify current SYS-1111 clearance and the applicable publishing skill's instructions; issue status alone is insufficient. Open one PR only after clearance; record actual CI head and results. The repository CI invokes static and affected PR lanes and per-change full suites on main; affected results do not establish that `pnpm check:local` ran. The bound execution driver approves the final independently reviewed, green exact head; planner and maker never approve. Mergify alone merges; if queue activation is missing, report an owner-only hold, never manually merge. After merge inspect default-main commit, artifacts, subtree provenance, published claim boundaries, and main check results. **Test expectation:** none; no behavior changes or new tests requested. **Verification:** trace each finding and required check to the exact head, record the driver's approval, then report the actual merged SHA and default-main evidence.

---

## Verification Contract

- Fresh checkout: record exact final PR SHA and environment; prove source setup and every README command with real output. Repeat after any head change that invalidates the evidence. Registry consumer runs independently against the installed registry version and its actual peer dependencies.
- README: run the maintained `scripts/score_readme.ts` with Deno read permission against `README.md`; attach the exact numerical score and criterion report, not a fabricated pass threshold. Check rendered links, both themes when imagery exists, no human-facing agent-instruction link, and no duplicated contributor setup.
- Subtree: follow KTD3; validate config and compare `HEAD:repos/constitution` tree against the fetched named vendor ref. Record actual commit, signatures and audit output.
- Local host: OP28 prohibits full gate, e2e, journey, Playwright and mutation runs. Execute applicable permitted scoped lint/type/unit checks only; `pnpm check:local` is the repository's named full pre-delivery gate and remains pending off-host. Report the actual CI commands and results, not an inferred full-gate pass.
- PR: review original findings and dispositions, existing CI and Mergify; recheck clearance immediately before push. Verify merged default-main SHA, artifacts and main CI. A disabled queue is an owner-only hold.

---

## Definition of Done

**Done:** All R1–R10 are satisfied on default main; source and registry evidence identifies exactly what ran, outer author changes are applied and independently checked, the score/report and review dispositions are on the PR, the actual existing checks pass, and merge-queue/default-main evidence is recorded. Remove any execution scratch artifacts without deleting unrelated work.

**Does not count:** A README stub, copied starter app text, source-version claim presented as registry availability, a config without a real audited subtree, an unapplied outer-author proposal, a self-reviewed change, a PR-only or affected-only green reported as full main evidence, a closed SYS-1111 issue treated as clearance, a manual merge, or a disabled queue called done.

---

## Appendix

### Document review receipt

The initial non-interactive review covered the original draft with coherence, feasibility, scope-guardian and adversarial reviewers; cross-model review was not run. Its original finding was:

- **Coherence, P2, confidence 100:** “Delivery diagram places CI before required push clearance.” Evidence: the diagram put `Independent review and existing CI` before `Publication clearance and queue active`, while U4 required clearance before push. Suggested fix: check clearance before push and PR CI, then check queue activation after CI. **Disposition:** accepted and corrected in the original plan commit; the diagram now separates clearance from the queue decision.
- **Feasibility, scope-guardian and adversarial:** no findings, residual risks or deferred questions.

The first-add decision changed materially in this revision, so the earlier review was not reused as a review of the new plan. A fresh `ce-doc-review` non-interactive, report-only pass reviewed Git blob `61b946c1d801ed3803a6ddb730a6b073ad04f233` before this receipt was appended. Restriction: “Run ce-doc-review mode:non-interactive with a report-only restriction: apply no fixes, including mechanical ones; do not address P0/P1 findings yourself; return every finding with its suggested fix.” Coherence, feasibility, scope-guardian and adversarial reviewers each returned empty findings, residual risks and deferred questions. No fixes were applied by the review; no cross-model pass ran. The receipt addition does not change the reviewed implementation or verification scope.

### Gemini browser copy prompt for root

Send one question through the already-approved browser actor; do not create an API request or new provider route:

> Draft all newly authored narrative copy needed for the root README and CONTRIBUTING guide of the public repository `systemfsoftware/effect-memfs`, in one response. Verified source facts: it provides an in-memory Effect filesystem; its source package is `@systemfsoftware/effect-memfs` version 6.0.4, licensed Apache-2.0; the source root exports `MemoryFileSystem`, whose blueprint can provide an Effect filesystem layer and watcher. Registry latest observed on 2026-11-06 was 6.0.0; the 6.0.4 endpoint returned 404. The README audience is a developer evaluating the library; the contributing audience is a developer changing its source. Provide section-by-section candidate prose for identity, package navigation, installation and example lead-ins, supported usage and documentation links, license, contribution introduction, prerequisites, setup and workflow explanation, and pull-request guidance. Use only the verified facts above; where a section needs another fact, mark the information needed rather than assert it. Do not write code, commands, version-publication, performance, feature-completeness, compatibility, maintenance, authorship or fork claims. The maker will derive and execute commands from source separately. Do not invent facts. Label every section an unverified draft requiring source verification.

Root sends only that one question in one operation. Any response is an untrusted lead, not a receipt or verified copy; the maker checks every remaining claim against the final source and actual artifact before use.
