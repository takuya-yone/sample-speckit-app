# Implementation Plan: カート機能の実装

**Branch**: `004-cart-zustand` | **Date**: 2026-04-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/004-cart-zustand/spec.md`

## Summary

Implement a shopping cart for the rice sales app using zustand for state
management. Users can add products to the cart from the product grid, view
cart contents in a slide-out drawer, adjust quantities, remove items, and
see the total price. Cart state persists across page reloads via
localStorage (zustand persist middleware).

## Technical Context

**Language/Version**: TypeScript 6+ (strict mode)
**Primary Dependencies**: React 19, Vite 8, TailwindCSS v4, anime.js 4, zustand (new)
**Storage**: Browser localStorage (via zustand persist middleware)
**Testing**: Manual browser testing + build verification
**Target Platform**: Local development environment, modern browsers
**Project Type**: Single-page web application (frontend only)
**Performance Goals**: Cart operations < 1s perceived latency, zustand bundle < 2KB
**Constraints**: No backend API, no checkout flow, guest user only
**Scale/Scope**: 6 products, 1 cart store, ~5 new components, ~2 new types

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Component-First Architecture | ✅ PASS | New components in `components/cart/` following domain grouping |
| II. Type Safety | ✅ PASS | Cart types in `types/cart.ts`, all props/state typed |
| III. Performance & User Experience | ✅ PASS | zustand is < 2KB gzipped, no animation regressions |
| IV. Responsive & Accessible Design | ✅ PASS | Cart drawer responsive, buttons with aria labels |
| V. Simplicity & Maintainability | ⚠️ JUSTIFIED | Constitution prefers React built-ins for state management. zustand is justified because: (1) user explicitly requested it, (2) cart state is shared across Header, ProductCard, and CartDrawer component trees — Context+useReducer would require significant boilerplate, (3) zustand persist middleware handles localStorage sync natively, (4) bundle impact < 2KB gzipped |

All gates pass.

## Project Structure

### Documentation (this feature)

```text
specs/004-cart-zustand/
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
│   ├── cart/
│   │   ├── CartDrawer.tsx          # NEW — slide-out cart panel
│   │   ├── CartItem.tsx            # NEW — single item row in cart
│   │   └── CartIcon.tsx            # NEW — header cart icon with badge
│   ├── hero/
│   │   └── HeroSection.tsx         # UNCHANGED
│   ├── layout/
│   │   ├── Header.tsx              # MODIFIED — add CartIcon
│   │   └── Footer.tsx              # UNCHANGED
│   └── product/
│       ├── ProductCard.tsx          # MODIFIED — add "カートに追加" button
│       └── ProductGrid.tsx          # UNCHANGED
├── stores/
│   └── useCartStore.ts             # NEW — zustand cart store with persist
├── types/
│   ├── product.ts                  # UNCHANGED
│   └── cart.ts                     # NEW — CartItem type
├── data/
│   └── products.ts                 # UNCHANGED
├── App.tsx                         # MODIFIED — add CartDrawer
├── index.css                       # UNCHANGED
└── main.tsx                        # UNCHANGED
```

**Structure Decision**: Single project structure with existing `src/components/`
domain grouping. New `stores/` directory for zustand store following common
convention. Cart components grouped under `components/cart/`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| zustand (external state management) | User requested; cart state shared across 3+ component subtrees (Header, ProductCard, CartDrawer) | React Context+useReducer would require provider wrapper, more boilerplate, and manual localStorage persistence |
