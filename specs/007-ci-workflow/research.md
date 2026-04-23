# Research: CI/CDワークフロー

## R-001: ワークフローのトリガー設定

**Decision**: `push`（mainブランチ）と`pull_request`（mainブランチ向け）の両方をトリガーに設定する

**Rationale**: spec.md FR-001/FR-002の要件を満たすため。`pull_request`イベントはPR作成時および更新時に発火する。

**Alternatives considered**:
- `pull_request_target`: フォークからのPRに対応できるが、セキュリティリスクがある。パブリックリポジトリでない限り不要
- `workflow_dispatch`: 手動トリガーは要件外

## R-002: 同時実行制御（Concurrency）

**Decision**: `concurrency`グループを使用し、同一PRでの古い実行を自動キャンセルする

**Rationale**: spec.md FR-005の要件を満たすため。`cancel-in-progress: true`で実行中のワークフローを自動キャンセルし、リソースの無駄を防ぐ。

**Alternatives considered**:
- キャンセルなし: 同一PRで複数のワークフローが並行実行され、リソースを浪費する
- 手動キャンセル: 開発者の手間が増える

## R-003: 依存パッケージのキャッシュ

**Decision**: pnpmのストアパスをキャッシュする

**Rationale**: spec.md FR-006の要件を満たすため。pnpmはグローバルストアを使用するため、ストアパスをキャッシュすることでインストール時間を大幅に短縮できる。`pnpm/action-setup`アクションがpnpmのセットアップを簡素化する。

**Alternatives considered**:
- `node_modules`のキャッシュ: pnpmではストアキャッシュの方が効率的
- キャッシュなし: 毎回フルインストールになり実行時間が増加

## R-004: Node.jsバージョン管理

**Decision**: `actions/setup-node`でNode.js 20を使用する

**Rationale**: プロジェクトがNode.js 20+を前提としており、LTS版を使用するのが安定性の観点からベスト。

**Alternatives considered**:
- Node.js 22: 最新LTSだがGitHub Actions環境での安定性を優先して20を選択
- `.node-version`ファイル参照: プロジェクトに存在しないため直接指定

## R-005: ワークフローのステップ構成

**Decision**: 型チェック（`tsc -b`）、リンティング（`eslint .`）、ビルド（`vite build`）を3つの独立したステップとして実行

**Rationale**: 各ステップを独立させることで、どの段階で失敗したかを明確に特定できる。`pnpm build`は`tsc -b && vite build`を実行するが、型チェックとビルドの失敗を区別するため個別に実行する。

**Alternatives considered**:
- `pnpm build`のみ: 型チェック失敗とビルド失敗の区別がつかない
- 並列実行: ステップ間に暗黙の依存関係があるため順次実行が適切
