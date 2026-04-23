# Tasks: メイン画面

**Input**: Design documents from `specs/001-main-screen/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: No tests requested in the feature specification. Test tasks are excluded.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: Project structure and shared type/data foundations

- [x] T001 Create Product type definition in src/types/product.ts
- [x] T002 Create sample product data array in src/data/products.ts
- [x] T003 [P] Create placeholder image for product fallback in src/assets/rice-placeholder.svg

**Checkpoint**: Shared types and data ready — component implementation can begin

---

## Phase 2: Foundational (Layout Components)

**Purpose**: Header and Footer layout components that all user stories depend on

- [x] T004 [P] Create Header component with site name in src/components/layout/Header.tsx
- [x] T005 [P] Create Footer component with copyright in src/components/layout/Footer.tsx

**Checkpoint**: Layout shell ready — user story implementation can begin

---

## Phase 3: User Story 1 - 商品一覧の閲覧 (Priority: P1) 🎯 MVP

**Goal**: Display rice products as a responsive card grid with image, name, origin, price, and description

**Independent Test**: Open the site, verify product cards appear in a grid with all required fields

### Implementation for User Story 1

- [x] T006 [US1] Create ProductCard component with image, name, origin, price, description in src/components/product/ProductCard.tsx
- [x] T007 [US1] Add image onError fallback to placeholder in src/components/product/ProductCard.tsx
- [x] T008 [US1] Create ProductGrid component with responsive grid layout in src/components/product/ProductGrid.tsx
- [x] T009 [US1] Add empty state message when no products in src/components/product/ProductGrid.tsx
- [x] T010 [US1] Integrate Header, ProductGrid, Footer into App.tsx in src/App.tsx

**Checkpoint**: Product grid is fully functional and testable — cards display all fields, responsive grid works, empty state handled

---

## Phase 4: User Story 2 - ヒーローセクションの表示 (Priority: P2)

**Goal**: Display a visually appealing hero section with branding image, catch copy, and CTA button

**Independent Test**: Open the site, verify hero image and catch copy are visible at top, CTA button smooth-scrolls to products

### Implementation for User Story 2

- [x] T011 [US2] Create HeroSection component with background image and catch copy in src/components/hero/HeroSection.tsx
- [x] T012 [US2] Add CTA button with smooth scroll to product grid in src/components/hero/HeroSection.tsx
- [x] T013 [US2] Add anime.js entrance animation (fade-in + slide-up) to hero in src/components/hero/HeroSection.tsx
- [x] T014 [US2] Respect prefers-reduced-motion for hero animation in src/components/hero/HeroSection.tsx
- [x] T015 [US2] Integrate HeroSection into App.tsx between Header and ProductGrid in src/App.tsx

**Checkpoint**: Hero section displays with animation, CTA scrolls to products, animation respects motion preference

---

## Phase 5: User Story 3 - レスポンシブ対応 (Priority: P1)

**Goal**: Ensure all sections render correctly across mobile (375px), tablet (768px), and desktop (1280px+)

**Independent Test**: Resize browser to each breakpoint and verify layout adapts correctly

### Implementation for User Story 3

- [x] T016 [US3] Verify and adjust ProductCard responsive styles for mobile in src/components/product/ProductCard.tsx
- [x] T017 [US3] Verify ProductGrid columns: 1 col mobile, 2 col tablet, 3 col desktop in src/components/product/ProductGrid.tsx
- [x] T018 [US3] Verify and adjust HeroSection responsive layout for mobile in src/components/hero/HeroSection.tsx
- [x] T019 [US3] Verify Header and Footer responsive styles in src/components/layout/Header.tsx and src/components/layout/Footer.tsx

**Checkpoint**: All components render correctly at 375px, 768px, and 1280px breakpoints

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, performance, and final validation

- [x] T020 Add semantic HTML elements (nav, main, section, footer) across all components
- [x] T021 Add alt text to all images and aria-labels to interactive elements
- [x] T022 Add lazy loading attribute to product images in src/components/product/ProductCard.tsx
- [x] T023 Verify long product name/description truncation in src/components/product/ProductCard.tsx
- [x] T024 Run production build and verify no errors with npm run build
- [x] T025 Run quickstart.md verification steps manually

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 (needs Product type)
- **User Story 1 (Phase 3)**: Depends on Phase 1 + Phase 2 completion
- **User Story 2 (Phase 4)**: Depends on Phase 2 (layout ready), can run parallel to US1
- **User Story 3 (Phase 5)**: Depends on Phase 3 + Phase 4 (needs all components built)
- **Polish (Phase 6)**: Depends on all user stories being complete

### Parallel Opportunities

- T001, T002, T003 can all run in parallel (different files)
- T004, T005 can run in parallel (different files)
- US1 (Phase 3) and US2 (Phase 4) can run in parallel after Phase 2

### Within Each User Story

- Models/types before components
- Inner components before container components
- Container before App.tsx integration
- Story complete before moving to next priority

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (types, data, placeholder)
2. Complete Phase 2: Foundational (Header, Footer)
3. Complete Phase 3: User Story 1 (ProductCard, ProductGrid, App integration)
4. **STOP and VALIDATE**: Verify product grid works at all breakpoints
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Shell ready
2. Add User Story 1 → Product grid works (MVP!)
3. Add User Story 2 → Hero section with animation
4. Add User Story 3 → Responsive verification/polish
5. Polish phase → Accessibility, performance, build verification

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- No test tasks included (not requested in spec)
- Product images use placeholder SVG for sample data
- anime.js used only for hero entrance (research decision)
- Commit after each task or logical group
