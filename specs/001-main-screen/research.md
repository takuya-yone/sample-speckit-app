# Research: メイン画面

## Decision: Animation Library Usage

**Decision**: Use anime.js exclusively for hero section entrance
animation (fade-in + slide-up on page load). Use TailwindCSS
transition utilities for hover effects on product cards.

**Rationale**: anime.js provides smooth, sequenced animation for
the hero entrance that CSS alone cannot easily orchestrate.
Simple hover states are better handled by TailwindCSS to keep
bundle impact minimal.

**Alternatives considered**:
- Framer Motion — heavier bundle, React-specific but overkill
  for one entrance animation
- CSS-only animations — insufficient for sequenced entrance effects
- GSAP — larger library, commercial license considerations

## Decision: Product Data Structure

**Decision**: Hardcode product data as a TypeScript array in
`src/data/products.ts`. Each product has id, name, origin,
price, description, and imageUrl fields.

**Rationale**: Spec explicitly states sample data for v1.
A simple typed array is the simplest approach that allows
easy future migration to API fetch.

**Alternatives considered**:
- JSON file — requires import configuration, no type safety
- Mock API with MSW — unnecessary complexity for static data

## Decision: Responsive Grid Strategy

**Decision**: Use TailwindCSS v4 responsive grid with
`grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for product layout.

**Rationale**: TailwindCSS v4 utility classes handle responsive
breakpoints natively. No custom CSS or JS-based responsive
logic needed. Mobile-first approach as required by constitution.

**Alternatives considered**:
- CSS Grid with custom media queries — violates constitution
  (no custom CSS unless TailwindCSS insufficient)
- Flexbox wrapping — less predictable card sizing

## Decision: Image Handling

**Decision**: Use placeholder images from a public domain source
for sample products. Implement `onError` fallback to a generic
rice image placeholder. Use `loading="lazy"` attribute.

**Rationale**: Sample data needs visuals. Lazy loading required
by constitution (Principle III). Error fallback required by
spec (FR-008).

**Alternatives considered**:
- Generated SVG placeholders — less realistic appearance
- No images — fails spec requirement FR-002
