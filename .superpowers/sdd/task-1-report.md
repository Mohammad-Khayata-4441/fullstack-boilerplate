# Task 1 Report: Install Storybook Dependencies

**Status:** DONE_WITH_CONCERNS

## What was done

1. **Installed Storybook dependencies** in `packages/ui` - all 8 packages added as devDependencies
2. **Added scripts** to `packages/ui/package.json`: `storybook` and `build-storybook`
3. **Added scripts** to root `package.json`: `storybook` and `build-storybook` (via turbo)
4. **Added `build-storybook` task** to `turbo.json` with correct dependsOn and outputs
5. **Verified** `pnpm install` succeeds with no errors
6. **Committed** as `chore: install storybook dependencies`

## Version concern

The task specified running `pnpm add -D storybook @storybook/react ...` without pinning versions. This resolved `storybook` to 10.4.6 but `@storybook/addon-essentials`, `@storybook/addon-interactions`, and `@storybook/blocks` only exist up to 8.6.14/8.6.18 (they were consolidated into the core `storybook` package in v9+). This caused peer dependency conflicts.

**Resolution:** Pinned all Storybook packages to `^8.6.18` (latest stable where all packages coexist). This eliminates peer dep conflicts between storybook core and addons.

## Minor peer dep warning

`@storybook/react-vite@8.6.18` declares a peer dep on `vite@^4.0.0 || ^5.0.0 || ^6.0.0`, but vite 7.3.5 is resolved (pulled in by storybook's own transitive deps). This is an internal inconsistency in storybook 8.6.18 and does not prevent storybook from running.

## Files modified

- `packages/ui/package.json` - added 8 storybook devDependencies + 2 scripts
- `package.json` - added 2 root scripts
- `turbo.json` - added `build-storybook` task
- `pnpm-lock.yaml` - updated lockfile

## Commit

`a3cf64f` - chore: install storybook dependencies
