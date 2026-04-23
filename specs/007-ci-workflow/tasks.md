# Tasks: CI/CDワークフロー

**Input**: Design documents from `/specs/007-ci-workflow/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: テスト不要（ワークフロー定義のみ、ローカルでpnpmコマンドによる代替確認）

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: GitHub Actionsワークフローディレクトリの作成

- [x] T001 Create .github/workflows/ directory structure at repository root

**Checkpoint**: `.github/workflows/` ディレクトリが存在する

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: ローカル環境での品質チェックコマンドの動作確認

**⚠️ CRITICAL**: ワークフローで実行するコマンドがローカルで成功することを確認してからワークフロー作成へ進む

- [x] T002 Verify `pnpm tsc -b` completes successfully in local environment
- [x] T003 [P] Verify `pnpm lint` completes successfully in local environment
- [x] T004 [P] Verify `pnpm vite build` completes successfully in local environment

**Checkpoint**: 型チェック・リンティング・ビルドの全コマンドがローカルで成功する

---

## Phase 3: User Story 1 - PR時の自動品質チェック (Priority: P1) 🎯 MVP

**Goal**: Pull Request作成時に型チェック・リンティング・ビルドが自動実行され、結果がPR上に表示される

**Independent Test**: フィーチャーブランチからmainに対するPRを作成し、GitHub ActionsのChecksタブでワークフロー実行と結果表示を確認

### Implementation for User Story 1

- [x] T005 [US1] Create CI workflow file at .github/workflows/ci.yml with name `CI`, trigger on `pull_request` targeting main branch, single job `ci` running on `ubuntu-latest`
- [x] T006 [US1] Add checkout step using `actions/checkout@v4` in .github/workflows/ci.yml
- [x] T007 [US1] Add pnpm setup step using `pnpm/action-setup@v4` in .github/workflows/ci.yml
- [x] T008 [US1] Add Node.js setup step using `actions/setup-node@v4` with `node-version: 20` and `cache: 'pnpm'` in .github/workflows/ci.yml
- [x] T009 [US1] Add dependency install step `pnpm install --frozen-lockfile` in .github/workflows/ci.yml
- [x] T010 [US1] Add type check step `pnpm tsc -b`, lint step `pnpm lint`, and build step `pnpm vite build` in .github/workflows/ci.yml
- [x] T011 [US1] Add concurrency group `${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}` with `cancel-in-progress: true` in .github/workflows/ci.yml

**Checkpoint**: PRを作成し、GitHub ActionsでCIワークフローが自動起動して成功ステータスが表示される（MVP完了）

---

## Phase 4: User Story 2 - mainブランチPush時の自動ビルド検証 (Priority: P2)

**Goal**: mainブランチにPushされた際に同じ品質チェックが自動実行される

**Independent Test**: mainブランチにPush（PRマージ）し、GitHub ActionsのActionsタブでワークフロー実行を確認

### Implementation for User Story 2

- [x] T012 [US2] Add `push` trigger for `branches: [main]` to the existing `on` section in .github/workflows/ci.yml

**Checkpoint**: mainブランチへのPush時にCIワークフローが自動実行される

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 最終検証とドキュメント整備

- [x] T013 Verify workflow YAML syntax is valid by running a YAML linter or checking with `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/ci.yml'))"`
- [x] T014 Run quickstart.md validation — follow quickstart.md steps and confirm all instructions are accurate

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup — verifies local commands work
- **User Story 1 (Phase 3)**: Depends on Foundational — creates workflow with PR trigger
- **User Story 2 (Phase 4)**: Depends on US1 — adds push trigger to existing workflow
- **Polish (Phase 5)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — creates the workflow file
- **User Story 2 (P2)**: Depends on US1 — modifies the same workflow file created in US1

### Within Each User Story

- T005〜T011 are sequential (all modify the same file `.github/workflows/ci.yml`)
- T002, T003, T004 can run in parallel (independent verification commands)

### Parallel Opportunities

- T003, T004 can run in parallel after T002 (independent local commands)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (directory creation)
2. Complete Phase 2: Foundational (local command verification)
3. Complete Phase 3: User Story 1 (PR trigger workflow)
4. **STOP and VALIDATE**: PRを作成してCIが動作することを確認
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → 環境準備完了
2. User Story 1 → PR時の自動品質チェック（MVP!）
3. User Story 2 → mainブランチPush時の自動ビルド検証
4. Polish → YAML検証・ドキュメント確認

---

## Notes

- 全タスクが単一ファイル `.github/workflows/ci.yml` に集中するため、並列実行の機会は限定的
- T005〜T012は実質的に1つのワークフローファイルを段階的に構築する手順
- ワークフローのテストはGitHub上でのPR作成が必要（ローカルテストはコマンド単体確認のみ）
- Commit after each phase checkpoint
