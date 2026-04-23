# Research: カート機能の実装

## Decision: State Management Library

**Decision**: Use zustand for cart state management.

**Rationale**: User explicitly requested zustand. Additionally,
zustand is well-suited for this use case:
- Cart state is shared across multiple component trees (Header
  badge, ProductCard add buttons, CartDrawer panel)
- Built-in `persist` middleware handles localStorage sync
  without custom code
- Minimal bundle size (< 2KB gzipped)
- No provider/wrapper component needed (unlike React Context)
- Simple API: `create()` returns a hook directly

**Alternatives considered**:
- React Context + useReducer — constitution default. Rejected
  because it requires a Provider wrapper, more boilerplate for
  actions, and manual localStorage persistence logic.
- Redux Toolkit — too heavy for this use case (> 10KB),
  overkill for a single store.
- Jotai — atomic state model not ideal for a cart where
  items, totals, and actions are tightly coupled.

## Decision: Cart UI Pattern

**Decision**: Slide-out drawer (side panel) from the right side.

**Rationale**: Standard e-commerce pattern that keeps the user
on the current page while reviewing cart contents. Drawer
overlays the page without navigating away, allowing quick
add/review/continue shopping flow.

**Alternatives considered**:
- Separate cart page — breaks flow, requires routing setup.
  Overkill for 6 products.
- Modal dialog — less natural for a list of items that may
  require scrolling.
- Dropdown from header — too small for cart item management
  (quantity controls, item details).

## Decision: Cart Persistence Strategy

**Decision**: Use zustand's built-in `persist` middleware with
localStorage as the storage backend.

**Rationale**: Zero additional code needed beyond middleware
configuration. zustand persist handles serialization,
deserialization, and hydration automatically. localStorage
is appropriate for a frontend-only app with no user auth.

**Alternatives considered**:
- Manual localStorage sync (useEffect) — requires custom
  serialize/deserialize, hydration timing management.
- sessionStorage — data lost when browser is closed, not
  meeting FR-008 requirements.
- IndexedDB — overkill for simple cart data (< 1KB typically).

## Decision: Cart Data Structure

**Decision**: Store cart items as an array of `{ productId, quantity }`
objects. Reference product data from the existing products array
for name, price, and image.

**Rationale**: Avoids duplicating product data in cart storage.
Keeps localStorage payload minimal. Price always reflects
current product data (edge case from spec).

**Alternatives considered**:
- Store full product data in cart items — duplicates data,
  cart could show stale prices if product data changes.
- Map/Record by productId — slightly more efficient for
  lookups but array is simpler and sufficient for 6 products.

## Decision: Maximum Quantity Enforcement

**Decision**: Cap at 99 per product, enforced in the zustand
store's `addItem` and `updateQuantity` actions.

**Rationale**: Spec edge case requires max 99 per product.
Enforcing in the store ensures consistency regardless of which
UI triggers the change.
