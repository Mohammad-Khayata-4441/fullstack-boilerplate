---
description: Completes feature development by creating a pull request via GitHub MCP with auto issue linking
---

# Ship Feature

Complete feature development and create a pull request via GitHub MCP.

## Pre-Flight Checks

Before creating the PR, verify:

```bash
# Check current branch and status
git status
git log --oneline -10

# Verify tests pass
pnpm test

# Check for type errors
pnpm check-types

# Check lint
pnpm lint
```

If any checks fail, stop and fix issues first.

## Process

1. **Determine PR details**:
   - Base branch (usually `main` or `develop`)
   - Target repository (if not the current remote)
   - Related GitHub issues to link (e.g., "Closes #123")

2. **Generate PR description** with:
   - Summary of changes
   - List of major modifications
   - Related issues (Closes #[issue-number])
   - Testing checklist
   - Screenshots (if UI changes)

3. **Push branch** to remote:
   ```bash
   git push -u origin <branch-name>
   ```

4. **Create PR via GitHub MCP**:
   - Use `create_pull_request` tool
   - Set title (conventional commit format: feat:, fix:, refactor:, etc.)
   - Set body with generated description
   - Set head (current branch) and base (target branch)

5. **Post-creation**:
   - Provide PR URL
   - Mention auto-closed issues
   - Suggest requesting reviews

## PR Title Conventions

Follow conventional commit format:
- `feat: add user authentication`
- `fix: resolve login redirect issue`
- `refactor: simplify API client`
- `docs: update README`
- `test: add unit tests`

## Issue Linking

To auto-close issues when PR merges:
- Use `Closes #123` or `Fixes #123` in the PR body
- Multiple issues: `Closes #123, #124, #125`
- To reference without closing: `Relates to #123`

If GitHub MCP is not available, guide the user to configure it in `.claude/settings.json`.
