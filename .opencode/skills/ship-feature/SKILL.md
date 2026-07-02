---
name: ship-feature
description: Completes feature development by creating a pull request via GitHub MCP. Wraps the finishing-a-development-branch workflow with automatic PR creation, description generation, and linking to related issues. Use when implementation is complete and ready for review. Triggers on "ship feature", "create PR", "open pull request", "finish and create PR".
---

# Ship Feature

Completes feature development by creating a pull request via GitHub MCP, with automatic description generation and issue linking.

## When to Use

- After completing implementation of a feature
- When all tests pass and code is ready for review
- When the user wants to create a PR and sync to GitHub

## Prerequisites

- GitHub MCP server must be configured and running
- `GITHUB_TOKEN` environment variable must be set
- Current branch must have commits ahead of the base branch
- All tests should pass (verify with `pnpm test` or project test command)

## Process

### 1. Pre-Flight Checks

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

### 2. Determine PR Details

Ask the user:
- Base branch (usually `main` or `develop`)
- Target repository (if not the current remote)
- Whether to link to any GitHub issues (e.g., "Closes #123")

### 3. Generate PR Description

Create a comprehensive PR description:

```markdown
## Summary
[Brief description of what this PR does]

## Changes
- [List of major changes]
- [Bullet points for each file/area modified]

## Related Issues
Closes #[issue-number]
Relates to #[issue-number]

## Testing
- [ ] Tests pass locally
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows project conventions
- [ ] Self-review completed
- [ ] Documentation updated (if needed)
- [ ] No breaking changes (or documented if there are)
```

### 4. Push Branch

Ensure the branch is pushed to the remote:

```bash
git push -u origin <branch-name>
```

### 5. Create PR via GitHub MCP

Use the GitHub MCP `create_pull_request` tool:

```
- owner: repository owner
- repo: repository name
- title: PR title (from branch name or user input)
- body: generated PR description
- head: current branch name
- base: target branch (default: main)
```

### 6. Post-Creation

After PR is created:
- Provide the PR URL
- If issues were linked, mention that they'll be auto-closed on merge
- Suggest requesting reviews from team members

### 7. Handle Review Feedback

If the PR receives review feedback:
- Use `systematic-debugging` skill if feedback reveals bugs
- Make requested changes
- Push updates to the same branch
- The PR will update automatically

## PR Title Conventions

Follow conventional commit format:
- `feat: add user authentication`
- `fix: resolve login redirect issue`
- `refactor: simplify API client`
- `docs: update README with setup instructions`
- `test: add unit tests for auth module`

## Issue Linking

To auto-close issues when PR merges:
- Use `Closes #123` or `Fixes #123` in the PR body
- Multiple issues: `Closes #123, #124, #125`
- To reference without closing: `Relates to #123`

## Error Handling

- If GitHub MCP unavailable, guide user to configure it
- If push fails, check remote configuration
- If PR creation fails, verify token permissions (needs `repo` scope)

## Integration with Superpowers

This skill wraps `finishing-a-development-branch` from superpowers:
1. Superpowers skill handles the decision (merge, PR, or cleanup)
2. If PR is chosen, this skill takes over for GitHub sync
3. After PR creation, superpowers skill can continue with any post-merge tasks

## Example Usage

User: "I'm done with the auth feature, ship it"

1. Run pre-flight checks (tests, types, lint)
2. Generate PR description from recent commits and changes
3. Push branch to origin
4. Create PR via GitHub MCP with issue linking
5. Provide PR URL and next steps

User: "Create a PR for this bugfix, closes #42"

1. Verify tests pass
2. Create PR with "Closes #42" in the body
3. Issue #42 will auto-close when PR merges
