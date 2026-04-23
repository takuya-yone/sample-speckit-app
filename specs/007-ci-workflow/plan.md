# Implementation Plan: CI/CDワークフロー

**Branch**: `007-ci-workflow` | **Date**: 2026-04-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-ci-workflow/spec.md`

## Summary

GitHub Actionsワークフローを追加し、mainブランチへのPush/PR作成時に型チェック・リンティング・ビルドを自動実行する。pnpmキャッシュによる高速化と、同一PRでの古い実行の自動キャンセルを含む。

## Technical Context

**Language/Version**: YAML (GitHub Actions workflow syntax)  
**Primary Dependencies**: GitHub Actions, actions/checkout, actions/setup-node, pnpm/action-setup  
**Storage**: N/A  
**Testing**: ワークフローのローカルテストはpnpmコマンドで代替  
**Target Platform**: GitHub Actions (ubuntu-latest)  
**Project Type**: CI/CD configuration  
**Performance Goals**: ワークフロー全体の実行5分以内  
**Constraints**: GitHub Actionsの無料枠内での実行  
**Scale/Scope**: 単一ワークフローファイル

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 準拠状況 | 詳細 |
|------|---------|------|
| I. Component-First Architecture | ✅ 該当なし | ワークフロー定義はUIコンポーネントではない |
| II. Type Safety | ✅ 準拠 | ワークフローで`tsc -b`による型チェックを実行 |
| III. Performance & User Experience | ✅ 準拠 | pnpmキャッシュにより実行時間を最適化 |
| IV. Responsive & Accessible Design | ✅ 該当なし | CI/CDはUI関連ではない |
| V. Simplicity & Maintainability | ✅ 準拠 | 単一YAMLファイル、最小構成のアクション |

**Technology Standards チェック**:
- パッケージマネージャー: pnpmを使用 ✅
- Linting: ESLintをCI内で実行 ✅
- 型チェック: `tsc -b`をCI内で実行 ✅

**Gate結果**: PASS — 全原則に準拠

## Project Structure

### Documentation (this feature)

```text
specs/007-ci-workflow/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 research output
├── data-model.md        # Phase 1 data model
├── quickstart.md        # Phase 1 quickstart guide
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
.github/
└── workflows/
    └── ci.yml           # CI/CDワークフロー定義
```

**Structure Decision**: GitHub Actionsの標準ディレクトリ構造に従い、`.github/workflows/`に配置。

## Design Decisions

### D-001: ワークフロー定義

`.github/workflows/ci.yml`:
- **name**: `CI`
- **triggers**: `push`(main), `pull_request`(main)
- **concurrency**: PRごとにグループ化、`cancel-in-progress: true`
- **runner**: `ubuntu-latest`

### D-002: ステップ構成

1. `actions/checkout@v4` — ソースコードのチェックアウト
2. `pnpm/action-setup@v4` — pnpmのインストール
3. `actions/setup-node@v4` — Node.js 20セットアップ（pnpmキャッシュ有効）
4. `pnpm install --frozen-lockfile` — 依存パッケージのインストール
5. `pnpm tsc -b` — 型チェック
6. `pnpm lint` — リンティング
7. `pnpm vite build` — ビルド

### D-003: Concurrencyグループ

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true
```

PR番号でグループ化し、同一PRへの連続Pushで古い実行を自動キャンセル。mainへのPush時はrefでグループ化。

### D-004: キャッシュ戦略

`actions/setup-node@v4`の`cache: 'pnpm'`オプションでpnpmストアを自動キャッシュ。手動の`actions/cache`設定は不要。

## Complexity Tracking

違反なし — 全原則に準拠しているため、複雑性の正当化は不要。
