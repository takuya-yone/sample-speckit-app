# Research: カート追加時のトースト通知

## Decision: Toast Library

**Decision**: Use shadcn/ui's Sonner component (wrapping the
`sonner` library by Emil Kowalski).

**Rationale**: User explicitly requested shadcn/ui. shadcn/ui
deprecated its original Toast component in favor of Sonner,
which provides a simpler API, better animations, and built-in
stacking. Sonner is < 5KB gzipped and has zero configuration
needed for basic usage.

**Alternatives considered**:
- shadcn/ui Toast (deprecated) — no longer recommended by
  shadcn/ui project itself.
- react-hot-toast — popular but doesn't integrate with shadcn
  ecosystem, user requested shadcn specifically.
- Custom implementation — unnecessary complexity when sonner
  handles all requirements (auto-dismiss, stacking, accessibility).

## Decision: shadcn/ui Setup Approach

**Decision**: Run `pnpm dlx shadcn@latest init` for full project
setup, then `pnpm dlx shadcn@latest add sonner` for the Toast
component.

**Rationale**: The CLI handles TailwindCSS v4 compatibility,
CSS variable setup, path alias configuration, and cn() utility
creation automatically. Manual setup is error-prone and the
CLI only takes seconds.

**Alternatives considered**:
- Manual file copy — error-prone, must manually handle CSS
  variables, path aliases, and dependencies.
- Partial init — not supported by shadcn CLI, full init is
  lightweight anyway.

## Decision: Toast Trigger Location

**Decision**: Call `toast()` in ProductCard's "カートに追加"
button handler, immediately after calling `addItem()`.

**Rationale**: The ProductCard already has the product data
available (product.name) and the addItem action. Adding a
`toast()` call alongside the existing `addItem()` is the
minimal change with zero architectural impact.

**Alternatives considered**:
- zustand middleware — subscribe to store changes and emit
  toasts. Over-engineered for a single trigger point.
- Event bus — unnecessary indirection.
- Wrapper function — no benefit over inline call.

## Decision: Toast Configuration

**Decision**: 5 second auto-dismiss, max 3 visible toasts,
position top-right.

**Rationale**: Matches spec requirements (FR-003: 3-5s,
FR-005: max 3). Top-right is standard EC site convention
per spec assumptions. Sonner handles stacking natively.
