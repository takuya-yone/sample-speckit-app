# Implementation Plan: メイン画面

**Branch**: `002-main-screen` | **Date**: 2026-04-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-main-screen/spec.md`

## Summary

Create the main screen for a rice sales website featuring a hero
section with branding visuals and call-to-action, a responsive
product card grid displaying rice varieties with images, names,
origins, prices, and descriptions, plus a navigation bar and footer.
Product data is hardcoded sample data in this phase.

## Technical Context

**Language/Version**: TypeScript 6+ (strict mode)
**Primary Dependencies**: React 19, Vite 8, TailwindCSS v4, anime.js 4
**Storage**: N/A (hardcoded sample data)
**Testing**: Manual browser testing (Vite dev server)
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Single-page web application (SPA, frontend only)
**Performance Goals**: Lighthouse performance score >= 80, page load < 3s
**Constraints**: Mobile-first responsive, WCAG 2.1 Level A, Japanese-only
**Scale/Scope**: 1 screen (main page), ~6 sample products

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Component-First Architecture | ✅ PASS | Page composed of Header, Hero, ProductGrid, ProductCard, Footer components |
| II. Type Safety | ✅ PASS | All props/state typed, Product type defined in types/ |
| III. Performance & User Experience | ✅ PASS | anime.js for hero entrance only, lazy images, code-split pages |
| IV. Responsive & Accessible Design | ✅ PASS | TailwindCSS mobile-first grid, semantic HTML, alt texts |
| V. Simplicity & Maintainability | ✅ PASS | useState only, no state management lib, hardcoded data |

All gates pass. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/001-main-screen/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── hero/
│   │   └── HeroSection.tsx
│   └── product/
│       ├── ProductCard.tsx
│       └── ProductGrid.tsx
├── data/
│   └── products.ts
├── types/
│   └── product.ts
├── App.tsx
├── main.tsx
└── index.css
```

**Structure Decision**: Single-project frontend SPA. Components grouped
by domain (layout, hero, product) under `src/components/`. Shared types
in `src/types/`. Sample data in `src/data/`.

## Complexity Tracking

No violations — table not needed.
