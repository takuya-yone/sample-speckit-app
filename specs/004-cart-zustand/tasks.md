# Tasks: カート機能の実装

**Input**: Design documents from `specs/004-cart-zustand/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: Not explicitly requested — manual browser testing per quickstart.md.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Install Dependencies)

**Purpose**: Add zustand to the project

- [x] T001 Install zustand as a dependency via `pnpm add zustand`

---

## Phase 2: Foundational (Shared Types & Store)

**Purpose**: Create cart types and zustand store used by ALL user stories

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Create CartItem type definition in src/types/cart.ts
- [x] T003 Create zustand cart store with persist middleware in src/stores/useCartStore.ts — include actions: addItem, removeItem, updateQuantity, clearCart, and derived selectors: totalItems, totalPrice. Include max quantity (99) enforcement. Wire persist middleware with localStorage key `cart-storage`.

**Checkpoint**: Store is ready — all user stories can now proceed

---

## Phase 3: User Story 1 - 商品をカートに追加 (Priority: P1)

**Goal**: Users can add products to the cart from the product grid and see the cart item count in the header badge.

**Independent Test**: Click "カートに追加" on a product card, verify the header cart badge count increases. Add same product again, verify count increments.

### Implementation for User Story 1

- [x] T004 [P] [US1] Create CartIcon component with badge in src/components/cart/CartIcon.tsx — display cart icon with total item count badge from useCartStore. Hide badge when cart is empty. Add aria-label for accessibility.
- [x] T005 [P] [US1] Add "カートに追加" button to ProductCard in src/components/product/ProductCard.tsx — call useCartStore.addItem(product.id) on click. Style with TailwindCSS green button consistent with app theme.
- [x] T006 [US1] Integrate CartIcon into Header in src/components/layout/Header.tsx — add CartIcon next to site name, aligned to the right side of the nav bar.
- [x] T007 [US1] Verify US1: run `pnpm build` and manually test add-to-cart flow in browser

**Checkpoint**: Products can be added to cart, badge shows count in header

---

## Phase 4: User Story 2 - カート内容の確認と数量変更 (Priority: P1)

**Goal**: Users can open a cart drawer to view items, change quantities, remove items, and see the total price.

**Independent Test**: Open cart drawer, verify item details (name, price, quantity, subtotal). Change quantity with +/- buttons, verify totals update. Remove items, verify empty state message.

### Implementation for User Story 2

- [x] T008 [P] [US2] Create CartItem component in src/components/cart/CartItem.tsx — display product name, image, unit price, quantity with +/- buttons, subtotal, and delete button. Use useCartStore actions for quantity changes and removal. Format prices with Intl.NumberFormat("ja-JP").
- [x] T009 [US2] Create CartDrawer component in src/components/cart/CartDrawer.tsx — slide-out panel from right side. Show list of CartItem components, total price at bottom, empty state message ("カートは空です") with link to products section. Include close button and overlay backdrop. Accessible with proper aria attributes and focus trap.
- [x] T010 [US2] Add cart open/close state to CartIcon click handler in src/components/cart/CartIcon.tsx — clicking CartIcon toggles the CartDrawer open state
- [x] T011 [US2] Integrate CartDrawer into App in src/App.tsx — render CartDrawer component, pass open/close state management
- [x] T012 [US2] Verify US2: run `pnpm build` and manually test cart drawer, quantity changes, item removal, empty state in browser

**Checkpoint**: Full cart management UI working — view, edit quantities, remove items, see totals

---

## Phase 5: User Story 3 - カート状態の永続化 (Priority: P2)

**Goal**: Cart state persists across page reloads and browser sessions via localStorage.

**Independent Test**: Add items to cart, reload page, verify cart contents are preserved. Close tab, reopen, verify cart is restored.

### Implementation for User Story 3

- [x] T013 [US3] Verify persistence: add items to cart, reload page, confirm cart state is restored from localStorage. This should already work via zustand persist middleware configured in T003 — verify and fix if needed.
- [x] T014 [US3] Verify US3: close and reopen browser tab, confirm cart contents persist across sessions

**Checkpoint**: Cart persists across reloads and browser sessions

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and edge case verification

- [x] T015 Verify max quantity enforcement: add 99 of one product, attempt to add more, confirm quantity stays at 99
- [x] T016 Verify responsive design: test cart drawer on mobile viewport (375px), tablet (768px), and desktop (1280px)
- [x] T017 Run `pnpm build` — confirm zero errors in final production build
- [x] T018 Run quickstart.md full validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — zustand must be installed
- **User Story 1 (Phase 3)**: Depends on Foundational — needs store and types
- **User Story 2 (Phase 4)**: Depends on User Story 1 — CartIcon click handler extended in US2
- **User Story 3 (Phase 5)**: Depends on Foundational — persistence built into store, but tested after US1/US2 provide UI
- **Polish (Phase 6)**: Depends on all user stories complete

### Within Each User Story

- T004 and T005 can run in parallel (different files)
- T006 depends on T004 (CartIcon must exist before integrating into Header)
- T008 can start independently (different file from T004-T007)
- T009 depends on T008 (CartItem component used inside CartDrawer)
- T010 depends on T009 (CartDrawer must exist to toggle)
- T011 depends on T009 and T010

### Parallel Opportunities

- T004 and T005 can run in parallel (US1)
- T008 can run in parallel with T007 (different files)

---

## Parallel Example: User Story 1

```bash
# Launch parallel US1 tasks:
Task: "Create CartIcon component in src/components/cart/CartIcon.tsx"
Task: "Add カートに追加 button to ProductCard in src/components/product/ProductCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Install zustand
2. Complete Phase 2: Create types and store
3. Complete Phase 3: User Story 1 (add to cart + badge)
4. **STOP and VALIDATE**: Cart badge shows count after adding products
5. This is a viable MVP — users can add to cart

### Incremental Delivery

1. Setup + Foundational → Store ready
2. Add User Story 1 → Add-to-cart + badge (MVP!)
3. Add User Story 2 → Cart drawer with full management
4. Add User Story 3 → Persistence verification
5. Polish → Edge cases, responsive, final build

---

## Notes

- zustand persist middleware is configured in T003 (Foundational phase) so persistence works from the start — US3 is primarily a verification phase
- CartDrawer open/close state can be managed either in the zustand store or via local React state in App.tsx — local state is simpler (YAGNI)
- All price formatting uses `Intl.NumberFormat("ja-JP")` consistent with existing ProductCard
- Product data lookup uses the existing `products` array from `src/data/products.ts`
