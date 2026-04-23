# Tasks: パッケージマネージャーをpnpmに移行

**Input**: Design documents from `specs/003-switch-to-pnpm/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, quickstart.md

**Tests**: Not requested in spec — manual browser testing + build verification only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Clean Existing State)

**Purpose**: Remove npm artifacts to prepare for pnpm migration

- [x] T001 Delete package-lock.json from repository root
- [x] T002 Delete node_modules/ directory from repository root

---

## Phase 2: User Story 1 - pnpmでの依存関係管理 (Priority: P1)

**Goal**: Migrate package manager from npm to pnpm. All dependencies install correctly and dev/build commands work via pnpm.

**Independent Test**: Run `pnpm install`, `pnpm dev`, and `pnpm build` — all complete without errors. `pnpm-lock.yaml` exists, `package-lock.json` does not.

### Implementation for User Story 1

- [x] T003 [US1] Add `packageManager` field (pnpm 10.x) to package.json
- [x] T004 [US1] Add `preinstall` script with `only-allow pnpm` guard to package.json
- [x] T005 [US1] Run `pnpm install` to generate pnpm-lock.yaml and recreate node_modules/
- [x] T006 [US1] Verify `pnpm-lock.yaml` exists and `package-lock.json` does not exist
- [x] T007 [US1] Run `pnpm build` and verify it completes with zero errors

**Checkpoint**: pnpm is the active package manager, all dependencies installed, build succeeds

---

## Phase 3: User Story 2 - 既存機能の動作保証 (Priority: P1)

**Goal**: Confirm all existing application features (hero section, product grid, images, responsive layout, animations) work correctly after the pnpm migration.

**Independent Test**: Run `pnpm dev`, open http://localhost:5173, verify hero section, 6 product images, responsive layout, and animations all function correctly.

### Implementation for User Story 2

- [x] T008 [US2] Run `pnpm dev` and verify dev server starts on http://localhost:5173
- [x] T009 [US2] Verify npm install guard — run `npm install` and confirm it fails with a guard message
- [x] T010 [US2] Run quickstart.md validation steps to confirm full migration

**Checkpoint**: All existing features work, npm guard active, migration fully verified

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup

- [x] T011 Verify .gitignore includes pnpm-lock.yaml is NOT ignored (should be committed)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 1 (Phase 2)**: Depends on Setup (Phase 1) — must delete npm artifacts first
- **User Story 2 (Phase 3)**: Depends on User Story 1 (Phase 2) — pnpm must be installed first
- **Polish (Phase 4)**: Depends on User Story 2 completion

### Within Each User Story

- T003 and T004 modify the same file (package.json) — run sequentially
- T005 depends on T003/T004 (package.json must be configured before install)
- T006/T007 depend on T005 (install must complete first)
- T008-T010 depend on T007 (build must pass before feature verification)

### Parallel Opportunities

- T001 and T002 can run in parallel (different targets)
- T008 and T009 can run in parallel after dev server verification

---

## Parallel Example: Phase 1

```bash
# Launch cleanup tasks together:
Task: "Delete package-lock.json from repository root"
Task: "Delete node_modules/ directory from repository root"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (delete npm artifacts)
2. Complete Phase 2: User Story 1 (install with pnpm, verify build)
3. **STOP and VALIDATE**: Build succeeds with pnpm
4. Proceed to User Story 2 for full verification

### Incremental Delivery

1. Delete npm artifacts -> Clean state
2. Configure pnpm + install -> pnpm active (MVP!)
3. Verify existing features -> Full confidence
4. Polish -> Production ready

---

## Notes

- No source code changes required — this is purely a package manager configuration change
- All existing dependencies must remain at the same versions
- The `only-allow` package may need to be added as a dev dependency
- Manual browser testing is the primary verification method
- Commit after each phase completion
