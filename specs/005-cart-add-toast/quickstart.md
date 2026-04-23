# Quickstart: カート追加時のトースト通知

## Prerequisites

- pnpm 10+ (project uses `packageManager: pnpm@10.33.2`)
- Node.js 20+

## Setup

1. Install dependencies: `pnpm install`
2. Start dev server: `pnpm dev`
3. Open http://localhost:5173

## Verify Toast Feature

### US1: カート追加時の確認メッセージ表示

1. Open the app in browser
2. Click "カートに追加" on any product card
3. Verify a toast notification appears in the top-right area
4. Verify the toast says "[商品名]をカートに追加しました"
5. Wait 5 seconds — verify the toast auto-dismisses
6. Click "カートに追加" on another product
7. Verify a new toast appears with that product's name
8. Rapidly click "カートに追加" on 3+ different products
9. Verify toasts stack (max 3 visible at once)
10. Click the close button on a toast — verify it dismisses immediately

### US2: 既存機能との統合

1. After adding products via toast-enabled buttons:
   - Verify header cart badge shows correct count
   - Click cart icon — verify drawer opens with correct items
   - Change quantity in drawer — verify totals update
   - Remove an item — verify it's removed
2. Reload the page — verify cart persists (localStorage)
3. Verify hero section animation still works
4. Verify all 6 product images display correctly
5. Resize browser to mobile width — verify responsive layout

### Accessibility

1. Enable a screen reader (VoiceOver on macOS)
2. Add a product to cart
3. Verify the toast content is announced by the screen reader

## Build Verification

1. Run `pnpm build` — should complete with zero errors
2. Run `pnpm preview` — verify toasts work in production build
