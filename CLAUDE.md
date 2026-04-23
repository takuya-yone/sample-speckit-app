# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Start Vite dev server
pnpm build            # Type-check (tsc -b) then build (vite build)
pnpm lint             # ESLint across all .ts/.tsx files
pnpm storybook        # Start Storybook on port 6006
pnpm build-storybook  # Build static Storybook site
```

Package manager is **pnpm** (enforced via preinstall hook). Do not use npm or yarn.

## Architecture

React 19 SPA built with Vite. No routing — single-page e-commerce storefront for rice products.

**Entry flow**: `main.tsx` → `App.tsx` composes layout (Header, HeroSection, ProductGrid, Footer) with CartDrawer overlay and Sonner toast notifications.

**State management**: Zustand store (`src/stores/useCartStore.ts`) with localStorage persistence (`cart-storage` key). Max quantity per item: 99.

**Styling**: TailwindCSS v4 via `@tailwindcss/vite` plugin (not PostCSS). Global styles in `src/index.css` (`@import "tailwindcss"`). Utility helper `cn()` in `src/lib/utils.ts` combines clsx + tailwind-merge.

**Components**: Organized by domain under `src/components/` (cart, hero, layout, product, ui). Each component has co-located `.stories.tsx` for Storybook.

**Types**: Shared types in `src/types/` (Product, CartItem). Mock data in `src/data/products.ts`.

**Path alias**: `@/*` maps to `src/*` (configured in tsconfig and vite.config.ts).

## Project Principles (from constitution)

- TypeScript strict mode — `any` is prohibited (justify with comment if unavoidable with third-party libs)
- TailwindCSS utility-first — custom CSS prohibited unless Tailwind cannot achieve it
- Mobile-first responsive design, WCAG 2.1 Level A accessibility, semantic HTML
- anime.js for animations must respect `prefers-reduced-motion`
- YAGNI: no premature abstractions, evaluate dependencies for bundle size
- Conventional Commits format (`feat:`, `fix:`, `docs:`, etc.)
- Code must pass `eslint` and `tsc -b` before commit

## Spec Kit

Feature development uses Spec Kit workflows in `specs/` with `.specify/` configuration. Each feature has spec.md, plan.md, tasks.md artifacts.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
at specs/006-storybook-setup/plan.md
<!-- SPECKIT END -->
