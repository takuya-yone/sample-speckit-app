# Tasks: Storybook導入

**Input**: Design documents from `/specs/006-storybook-setup/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

**Tests**: テスト不要（仕様書にテスト要件なし）

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Storybook パッケージのインストールと基本設定

- [ ] T001 Install Storybook devDependencies via `pnpm add -D storybook @storybook/react-vite` and run `pnpm exec storybook init --skip-install` if manual setup is needed
- [ ] T002 Create Storybook configuration in .storybook/main.ts with framework `@storybook/react-vite`, stories glob `['../src/**/*.stories.@(ts|tsx)']`, staticDirs `['../public']`, and essentials addon
- [ ] T003 [P] Create Storybook preview in .storybook/preview.ts importing `../src/index.css` for TailwindCSS v4, setting default layout to `centered`
- [ ] T004 [P] Add `"storybook": "storybook dev -p 6006"` and `"build-storybook": "storybook build"` scripts to package.json
- [ ] T005 [P] Add `storybook-static/` to .gitignore

**Checkpoint**: `pnpm storybook` が起動し、空のStorybookダッシュボードが表示される

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 全ストーリー作成に先立つ基本動作確認

**⚠️ CRITICAL**: Phase 1完了後、Storybook が正常起動することを確認してからPhase 3以降へ進む

- [ ] T006 Create Footer.stories.tsx in src/components/layout/Footer.stories.tsx with Default story (propsなし、最もシンプルなコンポーネントで動作確認)
- [ ] T007 Verify Storybook startup — run `pnpm storybook`, confirm Footer story renders with TailwindCSS styles applied correctly in browser

**Checkpoint**: Storybook が起動し、Footer コンポーネントが TailwindCSS スタイル付きで正しく表示される

---

## Phase 3: User Story 1 - コンポーネントカタログの閲覧 (Priority: P1) 🎯 MVP

**Goal**: 開発者がStorybookを起動し、ブラウザ上でコンポーネント一覧を確認・プレビューできる

**Independent Test**: `pnpm storybook` を実行し、サイドバーにコンポーネントが一覧表示され、各コンポーネントをクリックして単独プレビューできることを確認

### Implementation for User Story 1

- [ ] T008 [P] [US1] Create ProductCard.stories.tsx in src/components/product/ProductCard.stories.tsx with Default story using sample product from src/data/products.ts
- [ ] T009 [P] [US1] Create Header.stories.tsx in src/components/layout/Header.stories.tsx with Default story providing onCartClick callback via action
- [ ] T010 [P] [US1] Create HeroSection.stories.tsx in src/components/hero/HeroSection.stories.tsx with Default story (layout: fullscreen for proper rendering)
- [ ] T011 [P] [US1] Create CartIcon.stories.tsx in src/components/cart/CartIcon.stories.tsx with Empty story (cart count 0) using useCartStore.setState({ items: [] })
- [ ] T012 [US1] Verify all Phase 3 stories render in Storybook — confirm component sidebar shows all categories (product, layout, hero, cart) and each component renders correctly

**Checkpoint**: Storybook のサイドバーに全カテゴリが表示され、各コンポーネントが単独プレビューできる（MVP完了）

---

## Phase 4: User Story 2 - 既存コンポーネントのストーリー作成 (Priority: P2)

**Goal**: 主要UIコンポーネントすべてにストーリーバリエーション（通常状態＋エッジケース）を提供する

**Independent Test**: Storybook上で各コンポーネントのストーリーを切り替え、異なるpropsパターンでの表示バリエーションを確認

### Implementation for User Story 2

- [ ] T013 [P] [US2] Add LongName and NoImage story variants to src/components/product/ProductCard.stories.tsx — LongName uses product with 50+ character name, NoImage uses product with broken imageUrl
- [ ] T014 [P] [US2] Create ProductGrid.stories.tsx in src/components/product/ProductGrid.stories.tsx with Default (full product list from src/data/products.ts) and Empty (products: []) variants
- [ ] T015 [P] [US2] Add WithItems and OverflowBadge story variants to src/components/cart/CartIcon.stories.tsx — WithItems sets store to 3 items, OverflowBadge sets store to 100+ total items
- [ ] T016 [P] [US2] Create CartItem.stories.tsx in src/components/cart/CartItem.stories.tsx with Default (quantity: 1) and MaxQuantity (quantity: 99) variants, passing matching Product from data
- [ ] T017 [P] [US2] Create CartDrawer.stories.tsx in src/components/cart/CartDrawer.stories.tsx with Open (isOpen: true, empty cart), WithItems (isOpen: true, cart with 3 items using useCartStore.setState), and Closed (isOpen: false) variants
- [ ] T018 [US2] Verify all story variants render correctly — confirm each component has 2+ story variants visible in Storybook sidebar and all TailwindCSS styles apply

**Checkpoint**: 8コンポーネント × 各2+バリエーション がすべて正しく表示される

---

## Phase 5: User Story 3 - コンポーネントのインタラクティブな操作 (Priority: P3)

**Goal**: Storybook Controls パネルでpropsをインタラクティブに変更し、リアルタイムにコンポーネント表示を更新できる

**Independent Test**: Controlsパネルでprops値を変更し、コンポーネントがリアルタイムに更新されることを確認

### Implementation for User Story 3

- [ ] T019 [P] [US3] Add argTypes to ProductCard.stories.tsx meta for interactive Controls — product.name (text), product.price (number), product.origin (text), product.description (text)
- [ ] T020 [P] [US3] Add argTypes to CartDrawer.stories.tsx meta for interactive Controls — isOpen (boolean toggle)
- [ ] T021 [P] [US3] Add argTypes to CartItem.stories.tsx meta for interactive Controls — item.quantity (number, min: 1, max: 99)
- [ ] T022 [US3] Verify Controls panel works — open each story with argTypes, change values in Controls panel, confirm component updates in real-time

**Checkpoint**: Controls パネルでのprops変更が全対象コンポーネントでリアルタイム反映される

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 品質確認と最終検証

- [ ] T023 Verify TailwindCSS v4 styles render correctly across all stories — check spacing, colors, responsive classes, hover states
- [ ] T024 Verify HMR works — modify a component source file while Storybook is running and confirm changes reflect within 5 seconds
- [ ] T025 Run quickstart.md validation — follow quickstart.md steps from scratch and confirm all instructions work

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2)
- **User Story 2 (Phase 4)**: Depends on Phase 3 completion (extends stories created in US1)
- **User Story 3 (Phase 5)**: Depends on Phase 4 completion (adds Controls to completed stories)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories
- **User Story 2 (P2)**: Extends US1 stories (adds variants) + creates new stories — depends on US1 for existing story files
- **User Story 3 (P3)**: Adds argTypes to stories from US1/US2 — depends on US2 for complete story files

### Within Each User Story

- Story files marked [P] can be created in parallel (different files)
- Verification task at end of each phase is sequential (depends on all story files)

### Parallel Opportunities

- T002, T003, T004, T005 can run in parallel after T001 completes
- T008, T009, T010, T011 can run in parallel (different story files)
- T013, T014, T015, T016, T017 can run in parallel (different story files)
- T019, T020, T021 can run in parallel (different story files)

---

## Parallel Example: User Story 2

```bash
# Launch all story variant tasks in parallel:
Task: "Add LongName/NoImage variants to ProductCard.stories.tsx"
Task: "Create ProductGrid.stories.tsx with Default/Empty variants"
Task: "Add WithItems/OverflowBadge variants to CartIcon.stories.tsx"
Task: "Create CartItem.stories.tsx with Default/MaxQuantity variants"
Task: "Create CartDrawer.stories.tsx with Open/WithItems/Closed variants"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (Storybook install & config)
2. Complete Phase 2: Foundational (Footer story + 起動確認)
3. Complete Phase 3: User Story 1 (基本ストーリー作成)
4. **STOP and VALIDATE**: 全カテゴリがサイドバーに表示され、各コンポーネントがプレビューできる
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Storybook基盤完成
2. User Story 1 → コンポーネントカタログ閲覧可能（MVP!）
3. User Story 2 → 全コンポーネントのバリエーション完備
4. User Story 3 → インタラクティブ操作対応
5. Polish → 品質確認・最終検証

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Zustand store mocking: use `useCartStore.setState()` in story decorators, no Provider needed
- Static assets: `staticDirs: ['../public']` in main.ts enables `/images/*.webp` access
- TailwindCSS v4: import `../src/index.css` in preview.ts — `@tailwindcss/vite` plugin handles processing
- Commit after each phase checkpoint
