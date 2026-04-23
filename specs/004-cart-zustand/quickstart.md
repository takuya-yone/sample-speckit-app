# Quickstart: カート機能の実装

## Prerequisites

- pnpm 10+ (project uses `packageManager: pnpm@10.33.2`)
- Node.js 20+

## Setup

1. Install dependencies: `pnpm install`
   (zustand will be added as a new dependency)
2. Start dev server: `pnpm dev`
3. Open http://localhost:5173

## Verify Cart Feature

### US1: 商品をカートに追加

1. Open the app in browser
2. Click "カートに追加" on any product card
3. Verify the cart icon in the header shows a badge with "1"
4. Click "カートに追加" on the same product again
5. Verify the badge updates to "2"
6. Click "カートに追加" on a different product
7. Verify the badge updates to "3" (total items)

### US2: カート内容の確認と数量変更

1. Click the cart icon in the header
2. Verify the cart drawer opens from the right
3. Verify each item shows: name, unit price, quantity, subtotal
4. Verify the total price is displayed at the bottom
5. Click "+" on an item → quantity increases, totals update
6. Click "-" on an item → quantity decreases, totals update
7. Click "-" when quantity is 1 → item is removed
8. Click "削除" on an item → item is removed
9. Remove all items → "カートは空です" message appears
   with a link/button to return to product list

### US3: カート状態の永続化

1. Add several products to the cart
2. Reload the page (F5 or Cmd+R)
3. Verify the cart contents are preserved
4. Verify quantities are preserved
5. Close the browser tab, re-open the URL
6. Verify the cart contents are still present

### Edge Cases

1. Add 99 of one product → try adding more → quantity stays at 99
2. Verify all prices show in Japanese yen format (¥X,XXX)

## Build Verification

1. Run `pnpm build` — should complete with zero errors
2. Run `pnpm preview` — verify cart works in production build
