# Quickstart: パッケージマネージャーをpnpmに移行

## Prerequisites

- Node.js 20+
- pnpm 10+ (`npm install -g pnpm` or `corepack enable`)

## Verify Migration

1. Confirm pnpm is available: `pnpm --version`
2. Run `pnpm install` — should complete without errors
3. Verify no package-lock.json exists: `ls package-lock.json`
   should fail with "No such file"
4. Verify pnpm-lock.yaml exists: `ls pnpm-lock.yaml`
5. Run `pnpm dev` — dev server should start normally
6. Open http://localhost:5173 and verify the app works
7. Run `pnpm build` — should complete without errors
8. Try `npm install` — should fail with a guard message

## Rollback (if needed)

```bash
rm -rf node_modules pnpm-lock.yaml
npm install
```
