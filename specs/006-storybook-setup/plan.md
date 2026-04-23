# Implementation Plan: Storybook導入

**Branch**: `006-storybook-setup` | **Date**: 2026-04-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-storybook-setup/spec.md`

## Summary

Storybookをプロジェクトに導入し、既存の全UIコンポーネントのストーリーを作成する。`@storybook/react-vite`を使用してViteビルダーと統合し、TailwindCSS v4のスタイルおよびZustandストアのモックをサポートする。

## Technical Context

**Language/Version**: TypeScript 6.0+, React 19  
**Primary Dependencies**: Storybook 8, @storybook/react-vite, @storybook/addon-docs  
**Storage**: N/A  
**Testing**: Storybook (ビジュアルテスト・コンポーネントカタログ)  
**Target Platform**: ブラウザ (開発環境)  
**Project Type**: Web application (Vite + React SPA)  
**Performance Goals**: Storybook起動30秒以内、HMR反映5秒以内  
**Constraints**: 既存のVite設定・TailwindCSS v4・Zustandとの互換性維持  
**Scale/Scope**: 8コンポーネント、各2ストーリー以上

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 準拠状況 | 詳細 |
|------|---------|------|
| I. Component-First Architecture | ✅ 準拠 | ストーリーは既存コンポーネント構造に従い、co-locateで配置 |
| II. Type Safety | ✅ 準拠 | ストーリーファイルはTypeScriptで型安全に記述 |
| III. Performance & User Experience | ✅ 準拠 | Storybook導入はアプリのパフォーマンスに影響しない（devDependency） |
| IV. Responsive & Accessible Design | ✅ 準拠 | TailwindCSS v4のスタイルがStorybook上で正しく適用される |
| V. Simplicity & Maintainability | ✅ 準拠 | Storybook 8公式推奨の最小構成を採用。不要なアドオンは追加しない |

**Technology Standards チェック**:
- パッケージマネージャー: pnpm（統一済み）✅
- 依存関係: devDependencyとして追加、バンドルサイズへの影響なし ✅
- Linting: ESLintルールはストーリーファイルにも適用 ✅

**Gate結果**: PASS — 全原則に準拠

## Project Structure

### Documentation (this feature)

```text
specs/006-storybook-setup/
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
.storybook/
├── main.ts              # Storybook設定（フレームワーク、ストーリーパス、アドオン）
└── preview.ts           # グローバルデコレーター、TailwindCSSインポート

src/components/
├── product/
│   ├── ProductCard.stories.tsx
│   └── ProductGrid.stories.tsx
├── cart/
│   ├── CartDrawer.stories.tsx
│   ├── CartItem.stories.tsx
│   └── CartIcon.stories.tsx
├── layout/
│   ├── Header.stories.tsx
│   └── Footer.stories.tsx
└── hero/
    └── HeroSection.stories.tsx
```

**Structure Decision**: ストーリーファイルはコンポーネントとco-locate。Storybook設定は`.storybook/`ディレクトリに配置（公式慣習に従う）。

## Design Decisions

### D-001: Storybook設定

`.storybook/main.ts`:
- `framework`: `@storybook/react-vite`
- `stories`: `['../src/**/*.stories.@(ts|tsx)']`
- `staticDirs`: `['../public']` — 商品画像へのアクセス用
- `addons`: 最小構成（essentials addon のみ）

`.storybook/preview.ts`:
- `../src/index.css`をインポートしてTailwindCSS v4を適用
- `layout: 'centered'`をデフォルトに設定
- カート系コンポーネント用のZustandストア初期化デコレーター

### D-002: ストーリー設計方針

各コンポーネントにつきCSF3形式で以下のストーリーを作成:

| コンポーネント | ストーリー | 備考 |
|--------------|----------|------|
| ProductCard | Default, LongName, NoImage | 商品データのバリエーション |
| ProductGrid | Default, Empty | 空状態のエッジケース |
| CartDrawer | Open, Empty, WithItems | isOpen状態、カート内容 |
| CartItem | Default, MaxQuantity | 数量上限 |
| CartIcon | Empty, WithItems, OverflowBadge | バッジ表示バリエーション |
| Header | Default | CartIconのonClick |
| Footer | Default | propsなし |
| HeroSection | Default | アニメーション付き |

### D-003: Zustandストアのモック

- `useCartStore.setState()`を各ストーリーのデコレーターで呼び出し
- Provider不要（Zustandのモジュールスコープストアを直接利用）
- ストーリー間の状態干渉を防ぐため、各ストーリーで明示的に初期状態を設定

### D-004: package.jsonスクリプト

```json
{
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

### D-005: .gitignore更新

`storybook-static/`をビルド出力として`.gitignore`に追加

## Complexity Tracking

違反なし — 全原則に準拠しているため、複雑性の正当化は不要。
