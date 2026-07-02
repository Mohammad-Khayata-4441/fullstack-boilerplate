# Task 1: Install Storybook Dependencies

**Files:**
- Modify: `packages/ui/package.json`
- Modify: `pnpm-workspace.yaml`

- [ ] **Step 1: Add Storybook dependencies to packages/ui**

Run from project root:

```bash
pnpm --filter @fullstack-boilerplate/ui add -D storybook @storybook/react @storybook/react-vite @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-a11y @storybook/addon-links @storybook/blocks
```

- [ ] **Step 2: Add storybook script to packages/ui/package.json**

Modify `packages/ui/package.json` scripts:

```json
"scripts": {
  "check-types": "tsc --noEmit",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

- [ ] **Step 3: Add storybook script to root package.json**

Modify `package.json` scripts, add:

```json
"storybook": "turbo --filter @fullstack-boilerplate/ui storybook",
"build-storybook": "turbo --filter @fullstack-boilerplate/ui build-storybook"
```

- [ ] **Step 4: Add build-storybook to turbo.json**

Add to the `tasks` object in `turbo.json`:

```json
"build-storybook": {
  "dependsOn": ["^build"],
  "outputs": ["storybook-static/**"]
}
```

- [ ] **Step 5: Verify installation**

Run: `pnpm install`
Expected: No errors, all Storybook packages installed.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: install storybook dependencies"
```
