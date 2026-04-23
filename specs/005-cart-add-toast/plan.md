# Implementation Plan: カート追加時のトースト通知

**Branch**: `005-cart-add-toast` | **Date**: 2026-04-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/005-cart-add-toast/spec.md`

## Summary

Add toast notifications when products are added to the cart. Uses
shadcn/ui's Sonner component (recommended replacement for the
deprecated Toast component) to display "[商品名]をカートに
追加しました" messages that auto-dismiss after a few seconds.
Integrates with the existing zustand cart store and ProductCard
component.

## Technical Context

**Language/Version**: TypeScript 6+ (strict mode)
**Primary Dependencies**: React 19, Vite 8, TailwindCSS v4, zustand 5, shadcn/ui (new), sonner (new)
**Storage**: N/A (no persistence needed for transient notifications)
**Testing**: Manual browser testing + build verification
**Target Platform**: Local development environment, modern browsers
**Project Type**: Single-page web application (frontend only)
**Performance Goals**: Toast appears < 0.5s after action, auto-dismiss 3-5s
**Constraints**: Must integrate with existing cart store without breaking functionality
**Scale/Scope**: shadcn/ui init + 1 Sonner component, ~2 file modifications

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Component-First Architecture | ✅ PASS | Sonner Toaster is a self-contained component |
| II. Type Safety | ✅ PASS | sonner has TypeScript types built-in |
| III. Performance & User Experience | ✅ PASS | sonner < 5KB gzipped, enhances UX feedback |
| IV. Responsive & Accessible Design | ✅ PASS | Sonner handles aria-live regions for screen readers |
| V. Simplicity & Maintainability | ⚠️ JUSTIFIED | Adding shadcn/ui infrastructure (cn util, path aliases, CSS variables) for one toast component. Justified: user explicitly requested shadcn, and it establishes reusable UI component infrastructure for future features. Dependencies are minimal (class-variance-authority, clsx, tailwind-merge, sonner). |

All gates pass.

## Project Structure

### Documentation (this feature)

```text
specs/005-cart-add-toast/
├── plan.md
├── research.md
├── quickstart.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── cart/
│   │   ├── CartDrawer.tsx          # UNCHANGED
│   │   ├── CartItem.tsx            # UNCHANGED
│   │   └── CartIcon.tsx            # UNCHANGED
│   ├── ui/
│   │   └── sonner.tsx              # NEW — shadcn/ui Sonner wrapper
│   ├── product/
│   │   └── ProductCard.tsx         # MODIFIED — add toast on cart add
│   └── ...
├── lib/
│   └── utils.ts                    # NEW — cn() utility for shadcn
├── App.tsx                         # MODIFIED — add <Toaster /> provider
├── index.css                       # MODIFIED — add shadcn CSS variables
└── ...
components.json                     # NEW — shadcn/ui configuration
tsconfig.json                       # MODIFIED — add path aliases
tsconfig.app.json                   # MODIFIED — add path aliases
vite.config.ts                      # MODIFIED — add path alias resolution
```

**Structure Decision**: shadcn/ui components go in `src/components/ui/`
following shadcn conventions. The `lib/utils.ts` file provides the
`cn()` class merging utility used by all shadcn components.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| shadcn/ui infrastructure (path aliases, cn util, CSS vars) | User requested shadcn; establishes reusable UI foundation | Manual toast without shadcn would be simpler but contradicts user requirement |
| Additional dependencies (cva, clsx, tailwind-merge, sonner) | Required by shadcn/ui ecosystem | These are lightweight and standard in shadcn projects |
