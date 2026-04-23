# Quickstart: Storybook導入

## 前提条件

- Node.js 20以上
- pnpm 10以上
- プロジェクトのセットアップ済み（`pnpm install`完了）

## Storybookの起動

```bash
pnpm storybook
```

ブラウザで http://localhost:6006 が自動的に開きます。

## ストーリーファイルの場所

各コンポーネントのストーリーはコンポーネントと同じディレクトリに配置されています:

```
src/components/
├── product/
│   ├── ProductCard.tsx
│   ├── ProductCard.stories.tsx
│   ├── ProductGrid.tsx
│   └── ProductGrid.stories.tsx
├── cart/
│   ├── CartDrawer.tsx
│   ├── CartDrawer.stories.tsx
│   ├── CartItem.tsx
│   ├── CartItem.stories.tsx
│   ├── CartIcon.tsx
│   └── CartIcon.stories.tsx
├── layout/
│   ├── Header.tsx
│   ├── Header.stories.tsx
│   ├── Footer.tsx
│   └── Footer.stories.tsx
└── hero/
    ├── HeroSection.tsx
    └── HeroSection.stories.tsx
```

## 新しいストーリーの作成

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta = {
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // propsをここに記述
  },
};
```

## Storybookのビルド（静的サイト出力）

```bash
pnpm build-storybook
```

`storybook-static/`ディレクトリに静的サイトが出力されます。
