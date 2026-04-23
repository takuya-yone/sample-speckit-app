# Implementation Plan: 米の商品画像生成・表示

**Branch**: `003-rice-product-images` | **Date**: 2026-04-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/002-rice-product-images/spec.md`

## Summary

Generate 6 unique product images for rice varieties using AI image
generation, optimize them as WebP files under 200KB each, place them
in the public/images/ directory, and update the product data to
reference the actual image paths. Existing placeholder fallback
behavior is preserved.

## Technical Context

**Language/Version**: TypeScript 6+ (strict mode)
**Primary Dependencies**: React 19, Vite 8, TailwindCSS v4
**Storage**: Static files in public/images/
**Testing**: Manual browser testing (visual verification)
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Single-page web application (frontend only)
**Performance Goals**: Each image < 200KB, page load < 3s maintained
**Constraints**: WebP format, 4:3 aspect ratio, 800x600px target
**Scale/Scope**: 6 product images

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Component-First Architecture | ✅ PASS | No new components — only image assets and data update |
| II. Type Safety | ✅ PASS | Product type unchanged, only imageUrl values updated |
| III. Performance & User Experience | ✅ PASS | WebP format, < 200KB per image, lazy loading already in place |
| IV. Responsive & Accessible Design | ✅ PASS | Images already use object-cover with fixed container, alt text in place |
| V. Simplicity & Maintainability | ✅ PASS | Static files in public/, no build pipeline changes needed |

All gates pass. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/002-rice-product-images/
├── plan.md
├── research.md
├── quickstart.md
└── checklists/
    └── requirements.md
```

### Source Code Changes

```text
public/
└── images/
    ├── koshihikari.webp     # コシヒカリ
    ├── akitakomachi.webp    # あきたこまち
    ├── hitomebore.webp      # ひとめぼれ
    ├── sasanishiki.webp     # ササニシキ
    ├── tsuyahime.webp       # つや姫
    └── yumepirika.webp      # ゆめぴりか

src/
└── data/
    └── products.ts          # Update imageUrl paths (already correct)
```

**Structure Decision**: Images placed in public/images/ so they are
served as static assets by Vite without import/bundling overhead.
Product data already references `/images/<name>.webp` paths, so
only image files need to be created.

## Complexity Tracking

No violations — table not needed.
