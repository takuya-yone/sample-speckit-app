# Data Model: Storybook導入

本機能は新たなデータモデルを導入しない。既存のエンティティをStorybook上で表示するためのモックデータを定義する。

## 既存エンティティ（参照のみ）

### Product

| フィールド | 型 | 説明 |
|-----------|------|------|
| id | string | 商品ID |
| name | string | 商品名 |
| origin | string | 産地 |
| price | number | 価格（税込） |
| description | string | 商品説明 |
| imageUrl | string | 画像パス |

### CartItem

| フィールド | 型 | 説明 |
|-----------|------|------|
| productId | string | 商品ID |
| quantity | number | 数量（1〜99） |

## Storybookモックデータ

ストーリーファイル内で使用するモックデータは、既存の`src/data/products.ts`を直接インポートする。カート関連のストーリーでは、`useCartStore.setState()`で以下の状態パターンを設定する:

- **空のカート**: `{ items: [] }`
- **商品1件**: `{ items: [{ productId: "1", quantity: 1 }] }`
- **複数商品**: `{ items: [{ productId: "1", quantity: 2 }, { productId: "2", quantity: 1 }] }`
- **上限数量**: `{ items: [{ productId: "1", quantity: 99 }] }`
