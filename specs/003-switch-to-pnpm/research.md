# Research: パッケージマネージャーをpnpmに移行

## Decision: Migration Approach

**Decision**: Direct swap — delete package-lock.json and
node_modules, run `pnpm install` to generate pnpm-lock.yaml.

**Rationale**: pnpm can read package.json directly. No import
tool needed. Simpler and less error-prone than using
`pnpm import` (which converts npm lockfile).

**Alternatives considered**:
- `pnpm import` — converts package-lock.json to pnpm-lock.yaml.
  Risk of version drift if lockfile has inconsistencies.
- Gradual migration — not practical for a single project,
  you're either on npm or pnpm.

## Decision: npm Usage Guard

**Decision**: Add `"preinstall"` script in package.json that
checks for pnpm and fails if npm or yarn is used. Use the
`only-allow` package or a simple inline check.

**Rationale**: Prevents accidental `npm install` which would
create a package-lock.json and corrupt the dependency tree.
This is a common best practice for pnpm projects.

**Alternatives considered**:
- `engines` field with `packageManager` — requires corepack,
  not universally enabled. Can be added as supplementary.
- `.npmrc` with `engine-strict=true` — only works with
  engines field.
- No guard — risk of team members accidentally using npm.

**Decision**: Use the `packageManager` field in package.json
(supported by corepack) AND an `only-allow pnpm` preinstall
script for double protection.

## Decision: pnpm Version

**Decision**: Use latest stable pnpm (10.x as of 2026).
Pin via `packageManager` field in package.json.

**Rationale**: Latest stable provides best compatibility and
performance. Pinning version ensures consistency across
developers.
