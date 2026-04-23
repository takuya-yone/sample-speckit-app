# Research: Storybook導入

## R-001: Storybook + Vite統合

**Decision**: `@storybook/react-vite` フレームワークパッケージを使用する

**Rationale**: Storybook 8はViteをビルダーとしてネイティブサポートしており、`@storybook/react-vite`が公式推奨パッケージ。プロジェクトの既存Vite設定（パスエイリアス`@/`、React plugin等）をそのまま継承できる。

**Alternatives considered**:
- Webpack builder: Viteプロジェクトにおいて不要な依存関係が増え、ビルド速度も劣る
- 手動Vite設定: `@storybook/react-vite`が自動処理するため不要

## R-002: TailwindCSS v4のStorybook対応

**Decision**: `.storybook/preview.ts`で`../src/index.css`をインポートする

**Rationale**: プロジェクトはTailwindCSS v4を`@tailwindcss/vite`プラグイン経由で使用している（PostCSSではない）。Storybook起動時にViteプラグインが自動的にTailwindを処理するため、CSSファイルのインポートのみで動作する。

**Alternatives considered**:
- PostCSS設定を別途追加: v4では不要。`@tailwindcss/vite`プラグインが処理する
- Tailwindのビルド済みCSSを使用: 開発体験が劣化し、HMRが失われる

## R-003: Zustandストアのモック方式

**Decision**: ストーリーレベルのデコレーターで`useCartStore.setState()`を使用する

**Rationale**: Zustandのグローバルストアは`setState()`で直接状態を注入できるため、Providerラッパーが不要。各ストーリーで初期状態を設定することで、コンポーネントの様々な状態をテストできる。

**Alternatives considered**:
- Context Providerでラップ: Zustandはデフォルトでモジュールスコープのストアを使うため、Provider不要
- jestモック: Storybookのデコレーターで十分対応可能

## R-004: ストーリーファイルの配置

**Decision**: コンポーネントと同一ディレクトリにco-locate（`ComponentName.stories.tsx`）

**Rationale**: コンポーネントとストーリーが近接することで保守性が向上する。Storybook公式もco-locationを推奨している。`../src/**/*.stories.@(ts|tsx)`のグロブパターンで自動検出。

**Alternatives considered**:
- `stories/`ディレクトリに集約: ファイル間の移動が増え、保守コストが高い
- `__stories__`サブディレクトリ: 過度なディレクトリ階層

## R-005: 静的アセット（画像）の取り扱い

**Decision**: `.storybook/main.ts`の`staticDirs`に`../public`を指定する

**Rationale**: 商品画像（`/images/*.webp`）が`public/`ディレクトリにあるため、Storybookからも同じパスでアクセスできるようにする。

**Alternatives considered**:
- 画像をモック: 実際の表示確認ができなくなる
- アセットをコピー: 二重管理になる

## R-006: React 19互換性

**Decision**: Storybook 8の最新版を使用する

**Rationale**: Storybook 8はReact 19を公式サポートしている。特別な設定は不要。

**Alternatives considered**:
- Storybook 7: React 19サポートが不完全
