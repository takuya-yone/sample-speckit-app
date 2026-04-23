# こめ市場

お米の販売を想定したシングルページのECストアフロントです。

## 技術スタック

- **フレームワーク**: React 19 + TypeScript 6
- **ビルドツール**: Vite 8
- **スタイリング**: TailwindCSS v4 (`@tailwindcss/vite` プラグイン)
- **状態管理**: Zustand 5 (localStorage永続化)
- **アニメーション**: anime.js 4
- **通知**: Sonner (トースト通知)
- **コンポーネントカタログ**: Storybook 10
- **パッケージマネージャー**: pnpm

## セットアップ

```bash
pnpm install
```

## 開発

```bash
# 開発サーバー起動
pnpm dev

# Storybook起動 (http://localhost:6006)
pnpm storybook
```

## ビルド・品質チェック

```bash
# TypeScript型チェック + 本番ビルド
pnpm build

# ESLint
pnpm lint

# Storybookの静的サイトビルド
pnpm build-storybook
```

## プロジェクト構成

```
src/
├── components/        # UIコンポーネント (ドメイン別)
│   ├── cart/          # カート関連 (CartDrawer, CartIcon, CartItem)
│   ├── hero/          # ヒーローセクション
│   ├── layout/        # ヘッダー・フッター
│   ├── product/       # 商品カード・グリッド
│   └── ui/            # 汎用UI (トースト通知)
├── stores/            # Zustandストア
├── types/             # 型定義 (Product, CartItem)
├── data/              # 商品データ
├── lib/               # ユーティリティ (cn関数)
├── App.tsx            # メインアプリコンポーネント
└── main.tsx           # エントリーポイント
```

各コンポーネントには `.stories.tsx` ファイルが同一ディレクトリに配置されています。

## 開発ワークフロー

機能開発は [Spec Kit](https://github.com/SpecKit) を使用したブランチベースのワークフローに従います。仕様・計画・タスクの各ドキュメントは `specs/` ディレクトリに格納されています。
