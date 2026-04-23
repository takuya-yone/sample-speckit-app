<!-- Sync Impact Report
Version change: 0.0.0 → 1.0.0
Modified principles: N/A (initial creation)
Added sections:
  - Core Principles (5 principles)
  - Technology Standards
  - Development Workflow
  - Governance
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ no update needed (generic)
  - .specify/templates/spec-template.md ✅ no update needed (generic)
  - .specify/templates/tasks-template.md ✅ no update needed (generic)
Follow-up TODOs: None
-->

# Rice Sales App Constitution

## Core Principles

### I. Component-First Architecture

All UI MUST be built as reusable React functional components.
Each component MUST have a single, clear responsibility.
Page-level components orchestrate smaller components but MUST NOT
contain business logic directly. Shared components MUST reside
in a dedicated `components/` directory, grouped by domain
(e.g., `components/product/`, `components/cart/`).

### II. Type Safety

TypeScript strict mode MUST be enabled (`strict: true` in
`tsconfig.json`). All props, state, and function signatures
MUST have explicit type annotations. Use of `any` is
prohibited except when interfacing with untyped third-party
libraries, and such cases MUST include a justifying comment.
Shared types MUST be defined in a `types/` directory.

### III. Performance & User Experience

Initial page load MUST target a Lighthouse performance score
of 80 or above. anime.js animations MUST be used purposefully
to enhance user experience, not as decoration. Animations MUST
respect `prefers-reduced-motion` media queries. Images MUST
use lazy loading and modern formats (WebP/AVIF) where possible.
Route-level code splitting via React.lazy MUST be applied for
all page components.

### IV. Responsive & Accessible Design

All pages MUST be fully responsive using TailwindCSS v4
utility classes. Mobile-first approach: base styles target
mobile, breakpoints extend to larger screens. Custom CSS is
prohibited unless TailwindCSS utilities cannot achieve the
desired result. All interactive elements MUST meet WCAG 2.1
Level A accessibility standards. Semantic HTML elements MUST
be used over generic `div`/`span` where applicable.

### V. Simplicity & Maintainability

Start simple — add complexity only when a concrete need arises
(YAGNI). No premature abstractions: duplicate code is
acceptable until a third occurrence justifies extraction.
Dependencies MUST be evaluated for bundle size impact before
adoption. State management MUST use React built-in primitives
(useState, useContext, useReducer) unless proven insufficient
for the use case.

## Technology Standards

- **Framework**: React 19+ with functional components and hooks
- **Build Tool**: Vite (latest stable)
- **Language**: TypeScript 5+ (strict mode)
- **Styling**: TailwindCSS v4 (utility-first, no custom CSS
  unless absolutely necessary)
- **Animation**: anime.js for complex/sequenced animations;
  CSS transitions via TailwindCSS for simple state changes
- **Routing**: React Router v7+
- **Package Manager**: npm or pnpm (choose one, do not mix)
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier with consistent config

All dependencies MUST be pinned to exact versions in
`package.json` to ensure reproducible builds.

## Development Workflow

- Feature development follows the branch-per-feature model
  using Spec Kit conventions.
- All code MUST pass linting (`eslint`) and type checking
  (`tsc --noEmit`) before commit.
- Commits MUST follow Conventional Commits format
  (e.g., `feat:`, `fix:`, `docs:`).
- Pull requests MUST include a description of changes and
  screenshots for UI changes.
- Code review is required before merging to the main branch.

## Governance

This constitution is the authoritative guide for all
development decisions in the Rice Sales App project. When a
conflict arises between this constitution and other practices,
the constitution takes precedence.

**Amendment Procedure**:
- Amendments MUST be documented with rationale.
- Version MUST be incremented per semantic versioning:
  MAJOR for principle removals/redefinitions, MINOR for
  additions/expansions, PATCH for wording clarifications.
- All active contributors MUST be notified of amendments.

**Compliance**:
- All pull requests MUST be verified against these principles.
- Added complexity MUST be justified against Principle V.

**Version**: 1.0.0 | **Ratified**: 2026-04-23 | **Last Amended**: 2026-04-23
