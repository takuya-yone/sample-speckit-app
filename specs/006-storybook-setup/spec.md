# Feature Specification: Storybook導入

**Feature Branch**: `006-storybook-setup`  
**Created**: 2026-04-24  
**Status**: Draft  
**Input**: User description: "storybookの導入"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - コンポーネントカタログの閲覧 (Priority: P1)

開発者として、プロジェクト内の全UIコンポーネントを一覧で確認し、各コンポーネントの見た目と振る舞いをブラウザ上でインタラクティブにプレビューしたい。これにより、既存コンポーネントの再利用性を高め、デザインの一貫性を保つことができる。

**Why this priority**: Storybookの最も基本的な価値であり、これがなければ導入の意味がない。コンポーネントの視覚的なカタログは、チーム全体の開発効率を向上させる。

**Independent Test**: Storybookを起動し、ブラウザで各コンポーネントのストーリーを表示・操作できることを確認する。

**Acceptance Scenarios**:

1. **Given** Storybookがインストールされている状態で、**When** 開発者がStorybookを起動する、**Then** ブラウザ上にコンポーネント一覧が表示され、各コンポーネントをクリックして個別にプレビューできる
2. **Given** コンポーネント一覧が表示されている状態で、**When** 開発者が特定のコンポーネントを選択する、**Then** そのコンポーネントが単独でレンダリングされ、propsの変更に応じて表示が動的に更新される
3. **Given** Storybookが起動している状態で、**When** コンポーネントのソースコードを変更する、**Then** 変更がStorybookのプレビューに即座に反映される（ホットリロード）

---

### User Story 2 - 既存コンポーネントのストーリー作成 (Priority: P2)

開発者として、プロジェクト内の主要な既存コンポーネント（ProductCard、CartDrawer、Header等）のストーリーが用意されており、各コンポーネントの使用例やバリエーションを素早く確認したい。

**Why this priority**: 導入と同時に主要コンポーネントのストーリーが存在することで、チームメンバーがすぐにStorybookの価値を実感でき、新規コンポーネント作成時のリファレンスとなる。

**Independent Test**: Storybook上で既存の各コンポーネントのストーリーを表示し、異なるpropsパターンでの表示バリエーションを確認できる。

**Acceptance Scenarios**:

1. **Given** Storybookが起動している状態で、**When** ProductCardコンポーネントのストーリーを表示する、**Then** 通常表示、在庫切れ表示など複数のバリエーションがストーリーとして確認できる
2. **Given** Storybookが起動している状態で、**When** レイアウトコンポーネント（Header、Footer）のストーリーを表示する、**Then** 各コンポーネントが単独で正しくレンダリングされる
3. **Given** Storybookが起動している状態で、**When** カートコンポーネント（CartDrawer、CartItem、CartIcon）のストーリーを表示する、**Then** 各状態（空のカート、商品あり等）がストーリーとして確認できる

---

### User Story 3 - コンポーネントのインタラクティブな操作 (Priority: P3)

開発者として、Storybook上でコンポーネントのpropsをインタラクティブに変更し、異なる状態での見た目やレスポンシブ対応を確認したい。

**Why this priority**: Controls機能によるインタラクティブな操作は、コンポーネントの振る舞いを網羅的にテストするために重要だが、P1・P2がなければ機能しない。

**Independent Test**: Storybook Controls パネルでpropsを変更し、コンポーネントの表示がリアルタイムに更新されることを確認する。

**Acceptance Scenarios**:

1. **Given** コンポーネントのストーリーが表示されている状態で、**When** Controlsパネルでpropsの値を変更する、**Then** コンポーネントの表示がリアルタイムに更新される
2. **Given** コンポーネントのストーリーが表示されている状態で、**When** ビューポートサイズを変更する、**Then** レスポンシブデザインの動作を確認できる

---

### Edge Cases

- Storybookの起動中にViteの開発サーバーも同時に実行している場合、ポートの競合が発生しないこと
- Zustandストアに依存するコンポーネントが、Storybook上でもモック状態で正しく動作すること
- TailwindCSS v4のスタイルがStorybook上でも正しく適用されること
- anime.jsアニメーションを含むコンポーネントがStorybook上でも正しくレンダリングされること

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 開発者はコマンド一つでStorybookを起動し、ブラウザ上でコンポーネントカタログを閲覧できなければならない
- **FR-002**: プロジェクト内の主要UIコンポーネント（ProductCard、ProductGrid、CartDrawer、CartItem、CartIcon、Header、Footer、HeroSection）のストーリーが用意されていなければならない
- **FR-003**: 各ストーリーは、コンポーネントの典型的な使用パターンおよびエッジケース（例：データなし、大量データ、エラー状態）をカバーしなければならない
- **FR-004**: Storybook上でTailwindCSS v4のスタイルが正しく適用されなければならない
- **FR-005**: Zustandストアに依存するコンポーネントは、Storybook上でモック化された状態で動作しなければならない
- **FR-006**: ソースコードの変更がStorybookプレビューにホットリロードで反映されなければならない
- **FR-007**: Storybook Controlsによるpropsのインタラクティブな変更が可能でなければならない

### Key Entities

- **Story**: 特定のコンポーネントの特定の状態を表現する単位。コンポーネント名、props、デコレーターの情報を持つ
- **Component**: Storybook上で表示・操作されるReactコンポーネント。既存の`src/components/`配下のコンポーネントが対象

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 開発者がStorybookを起動してからコンポーネントカタログが表示されるまで30秒以内であること
- **SC-002**: プロジェクト内の主要UIコンポーネント（8コンポーネント以上）のストーリーが用意されていること
- **SC-003**: 各コンポーネントにつき最低2つ以上のストーリーバリエーション（通常状態＋エッジケース）が存在すること
- **SC-004**: ソースコード変更からStorybookプレビュー反映まで5秒以内であること
- **SC-005**: Storybook上の全コンポーネントでTailwindCSSスタイルが正しく適用されていること

## Assumptions

- 開発者はNode.js環境を既にセットアップしており、pnpmが利用可能である
- 既存のVite設定との互換性を維持する（Vite builderを使用）
- Storybookは開発環境での使用を主目的とし、本番デプロイは現時点では対象外とする
- 既存のコンポーネントのインターフェース（props）は変更しない
- anime.jsアニメーションはStorybook上でのプレビュー表示を最善努力で対応するが、完全な再現を保証しない
