# Tasks: 米の商品画像生成・表示

**Input**: Design documents from `specs/002-rice-product-images/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md

**Tests**: No tests requested in the feature specification. Test tasks are excluded.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup

**Purpose**: Create image directory and prepare tooling

- [ ] T001 Create public/images/ directory for product images
- [ ] T002 Install sharp as dev dependency for image conversion with npm install -D sharp

**Checkpoint**: Directory and tooling ready for image generation

---

## Phase 2: User Story 1 - 商品画像の表示 (Priority: P1) 🎯 MVP

**Goal**: Generate 6 unique product images and display them on the top page

**Independent Test**: Open the site, verify each of the 6 products shows a unique rice-themed image with no placeholders remaining

### Implementation for User Story 1

- [ ] T003 [P] [US1] Generate and save コシヒカリ image (rice bowl with mountain backdrop, warm golden light) to public/images/koshihikari.webp
- [ ] T004 [P] [US1] Generate and save あきたこまち image (rice in ceramic bowl, autumn leaves, cool tones) to public/images/akitakomachi.webp
- [ ] T005 [P] [US1] Generate and save ひとめぼれ image (steaming rice bowl, green bamboo background) to public/images/hitomebore.webp
- [ ] T006 [P] [US1] Generate and save ササニシキ image (sushi rice in lacquer box, minimalist Japanese style) to public/images/sasanishiki.webp
- [ ] T007 [P] [US1] Generate and save つや姫 image (glossy rice grains close-up, cherry blossom accent) to public/images/tsuyahime.webp
- [ ] T008 [P] [US1] Generate and save ゆめぴりか image (rice in stoneware bowl, snowy landscape background) to public/images/yumepirika.webp
- [ ] T009 [US1] Verify all 6 images exist in public/images/ and display correctly in the browser

**Checkpoint**: All 6 product images display on the top page — no placeholders remaining

---

## Phase 3: User Story 2 - 画像の最適化配信 (Priority: P2)

**Goal**: Ensure all images are optimized as WebP under 200KB with consistent 4:3 aspect ratio

**Independent Test**: Check each image file size is under 200KB, verify WebP format in DevTools Network tab, confirm page load under 3s

### Implementation for User Story 2

- [ ] T010 [US2] Verify all images are WebP format and under 200KB each, re-optimize with sharp if any exceed the limit
- [ ] T011 [US2] Verify all images have consistent 4:3 aspect ratio (800x600px target) and resize if needed
- [ ] T012 [US2] Verify page load time remains under 3s with images loaded

**Checkpoint**: All images optimized, under 200KB, consistent aspect ratio, page performance maintained

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and build verification

- [ ] T013 Verify image error fallback still works by temporarily renaming an image file and checking placeholder appears
- [ ] T014 Run production build and verify images load correctly with npm run build && npm run preview

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **User Story 1 (Phase 2)**: Depends on Phase 1 (needs directory)
- **User Story 2 (Phase 3)**: Depends on Phase 2 (needs images generated)
- **Polish (Phase 4)**: Depends on all user stories complete

### Parallel Opportunities

- T003–T008 can all run in parallel (6 independent image files)

### Within Each User Story

- Generate images before verification
- All 6 image tasks can run simultaneously

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (directory, sharp)
2. Complete Phase 2: Generate all 6 images
3. **STOP and VALIDATE**: Open browser, verify all images display
4. Proceed to optimization

### Incremental Delivery

1. Setup → Directory ready
2. Generate 6 images → All products show real images (MVP!)
3. Optimize → WebP, < 200KB, consistent ratio
4. Polish → Fallback verification, build check

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- No test tasks included (not requested in spec)
- Product data (src/data/products.ts) already references correct image paths
- Existing onError fallback in ProductCard.tsx is preserved
- Images should depict rice/bowls/fields with regional visual cues per research.md
