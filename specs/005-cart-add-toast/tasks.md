# Tasks: カート追加時のトースト通知

**Input**: Design documents from `specs/005-cart-add-toast/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, quickstart.md

**Tests**: Not explicitly requested — manual browser testing per quickstart.md.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (shadcn/ui Infrastructure)

**Purpose**: Initialize shadcn/ui and install Sonner toast component

- [ ] T001 Add TypeScript path alias `@/*` → `./src/*` to tsconfig.json and tsconfig.app.json
- [ ] T002 Add path alias resolution to vite.config.ts for `@` → `src/`
- [ ] T003 Run `pnpm dlx shadcn@latest init` to initialize shadcn/ui (creates components.json, src/lib/utils.ts, updates CSS variables in src/index.css)
- [ ] T004 Run `pnpm dlx shadcn@latest add sonner` to add the Sonner toast component to src/components/ui/sonner.tsx
- [ ] T005 Verify `pnpm build` passes after shadcn/ui setup

---

## Phase 2: User Story 1 - カート追加時の確認メッセージ表示 (Priority: P1)

**Goal**: When a user clicks "カートに追加", a toast notification displays "[商品名]をカートに追加しました" that auto-dismisses after 5 seconds.

**Independent Test**: Click "カートに追加" on any product card, verify toast appears with product name, auto-dismisses in ~5s, and can be manually closed.

### Implementation for User Story 1

- [ ] T006 [US1] Add `<Toaster />` component to src/App.tsx — import from src/components/ui/sonner.tsx, configure position="top-right", visibleToasts={3}, duration={5000}
- [ ] T007 [US1] Add `toast()` call to ProductCard's "カートに追加" handler in src/components/product/ProductCard.tsx — import toast from sonner, call `toast("カートに追加", { description: "[product.name]をカートに追加しました" })` after addItem
- [ ] T008 [US1] Verify US1: run `pnpm build` and manually test toast display, auto-dismiss, manual close, and stacking in browser

**Checkpoint**: Toast notifications appear on cart add, auto-dismiss, stack correctly

---

## Phase 3: User Story 2 - 既存機能との統合 (Priority: P1)

**Goal**: All existing features (cart badge, cart drawer, product images, hero animation, responsive layout, cart persistence) work correctly alongside toast notifications.

**Independent Test**: Verify cart badge count, drawer functionality, localStorage persistence, hero animation, and responsive layout all still work after toast integration.

### Implementation for User Story 2

- [ ] T009 [US2] Verify cart badge updates simultaneously with toast display in browser
- [ ] T010 [US2] Verify cart drawer opens and functions correctly after toast-enabled cart additions
- [ ] T011 [US2] Verify cart persistence — add items, reload page, confirm cart and toasts do not interfere with localStorage

**Checkpoint**: All existing features work alongside toast notifications

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, responsive check, accessibility

- [ ] T012 Verify toast responsive design: test on mobile (375px), tablet (768px), desktop (1280px)
- [ ] T013 Verify toast accessibility: confirm aria-live region exists for screen reader announcements
- [ ] T014 Run `pnpm build` — confirm zero errors in final production build
- [ ] T015 Run quickstart.md full validation checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **User Story 1 (Phase 2)**: Depends on Setup — shadcn/ui and Sonner must be installed
- **User Story 2 (Phase 3)**: Depends on User Story 1 — toast must be working to verify integration
- **Polish (Phase 4)**: Depends on all user stories complete

### Within Each Phase

- T001 and T002 modify different files — can run in parallel
- T003 depends on T001+T002 (path aliases needed for shadcn init)
- T004 depends on T003 (shadcn init must complete first)
- T006 and T007 modify different files — can run in parallel
- T009-T011 are verification tasks — sequential browser testing

### Parallel Opportunities

- T001 + T002 (different config files)
- T006 + T007 (different source files)

---

## Parallel Example: Phase 1 Setup

```bash
# Launch path alias configs in parallel:
Task: "Add TypeScript path alias to tsconfig.json and tsconfig.app.json"
Task: "Add path alias resolution to vite.config.ts"
```

## Parallel Example: User Story 1

```bash
# Launch US1 implementation tasks in parallel:
Task: "Add Toaster to App.tsx"
Task: "Add toast() to ProductCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: shadcn/ui setup + Sonner install
2. Complete Phase 2: User Story 1 (toast on cart add)
3. **STOP and VALIDATE**: Toast appears after adding products
4. Proceed to regression testing

### Incremental Delivery

1. Setup shadcn/ui infrastructure → Foundation ready
2. Add toast to cart add flow → Toast working (MVP!)
3. Verify existing features → No regressions
4. Polish → Responsive, accessibility, final build

---

## Notes

- shadcn/ui CLI may prompt for configuration choices during init — use defaults for TailwindCSS v4
- Sonner handles stacking, animations, and accessibility (aria-live) natively
- Toast trigger is a single `toast()` call alongside existing `addItem()` — minimal code change
- No new state management needed — sonner manages its own internal state
