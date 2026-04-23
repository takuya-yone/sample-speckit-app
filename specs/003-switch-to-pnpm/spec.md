# Feature Specification: パッケージマネージャーをpnpmに移行

**Feature Branch**: `003-switch-to-pnpm`
**Created**: 2026-04-23
**Status**: Draft
**Input**: User description: "パッケージマネージャーをpnpmにする"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - pnpmでの依存関係管理 (Priority: P1)

開発者がプロジェクトをクローンした際、pnpmを使用して
依存関係をインストールし、開発サーバーの起動やビルドが
正常に動作する。npmのロックファイルやnode_modulesは
pnpm形式に完全に置き換わっている。

**Why this priority**: パッケージマネージャーの切り替えは
プロジェクト全体の基盤であり、これが完了しないと他の
開発作業に支障が出る。

**Independent Test**: リポジトリをクリーンな状態から
`pnpm install` を実行し、`pnpm dev` と `pnpm build` が
正常に完了することを確認する。

**Acceptance Scenarios**:

1. **Given** プロジェクトをクローンした, **When**
   `pnpm install` を実行する, **Then** すべての依存関係が
   正常にインストールされる
2. **Given** 依存関係がインストールされた, **When**
   `pnpm dev` を実行する, **Then** 開発サーバーが起動し
   アプリケーションが正常に表示される
3. **Given** 依存関係がインストールされた, **When**
   `pnpm build` を実行する, **Then** プロダクションビルドが
   エラーなく完了する
4. **Given** pnpmに移行済み, **When** リポジトリを確認する,
   **Then** npm関連のロックファイル（package-lock.json）が
   存在しない

---

### User Story 2 - 既存機能の動作保証 (Priority: P1)

パッケージマネージャーの移行後も、既存のメイン画面機能
（ヒーローセクション、商品一覧、商品画像表示、レスポンシブ
対応、アニメーション）がすべて正常に動作する。

**Why this priority**: 移行による既存機能のリグレッションは
許容できない。

**Independent Test**: 移行後にブラウザでメイン画面を確認し、
すべての商品画像が表示され、ヒーローアニメーションが動作し、
レスポンシブレイアウトが維持されていることを確認する。

**Acceptance Scenarios**:

1. **Given** pnpmで依存関係をインストールした, **When**
   メイン画面を開く, **Then** ヒーローセクション、商品一覧、
   フッターがすべて表示される
2. **Given** メイン画面が表示された, **When** 商品カードを
   確認する, **Then** 6つの商品画像がすべて正常に表示される
3. **Given** メイン画面が表示された, **When** ブラウザ幅を
   変更する, **Then** レスポンシブレイアウトが正常に動作する

---

### Edge Cases

- pnpmがシステムにインストールされていない場合、セットアップ
  手順でインストール方法を案内する
- npmで誤ってインストールを試みた場合に、pnpmの使用を
  促すガードを設ける

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: パッケージマネージャーをnpmからpnpmに
  完全に移行する MUST
- **FR-002**: package-lock.jsonを削除し、pnpm-lock.yamlを
  生成する MUST
- **FR-003**: node_modulesをpnpmの構造で再作成する MUST
- **FR-004**: すべてのnpmスクリプト（dev, build, lint,
  preview）がpnpmで正常に動作する MUST
- **FR-005**: 既存のすべての依存関係が同一バージョンで
  インストールされる MUST
- **FR-006**: npmの使用を防止するためのガードを設ける SHOULD

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `pnpm install` が30秒以内に完了する
- **SC-002**: `pnpm build` がエラーゼロで完了する
- **SC-003**: 移行後の既存機能の動作テストが100%合格する
- **SC-004**: リポジトリにnpm固有のファイル
  （package-lock.json）が存在しない

## Assumptions

- 開発者のマシンにpnpmがグローバルにインストール済み、
  またはcorepack経由で有効化されていることを前提とする
- pnpmのバージョンは最新安定版を使用する
- CI/CDパイプラインは現時点ではスコープ外（ローカル開発
  環境のみ対象）
- package.jsonのスクリプトは変更不要（pnpmはnpmスクリプト
  と互換性がある）
