---
name: spec-to-issues
description: Converts a spec or implementation plan into GitHub Issues with labels, milestones, and acceptance criteria. Optionally creates a GitHub Project board. Use when the user has a completed spec or plan and wants to create trackable GitHub issues from it. Triggers on "create issues from spec", "break spec into tasks", "create GitHub issues", "sync plan to GitHub".
---

# Spec to GitHub Issues

Converts a spec document or implementation plan into structured GitHub Issues, ready for tracking and assignment.

## When to Use

- After completing a spec via `brainstorming` or `quick-spec`
- After `writing-plans` produces an implementation plan
- When the user wants to track work in GitHub Issues/Projects

## Prerequisites

- GitHub MCP server must be configured and running
- `GITHUB_TOKEN` environment variable must be set with a valid GitHub Personal Access Token
- The target GitHub repository must exist (or the user must want to create one)

## Process

### 1. Identify the Source

Ask the user which spec/plan to convert:
- A spec file in `docs/superpowers/specs/`
- A plan file in `docs/superpowers/plans/`
- The current conversation context

Read the source document to understand the scope.

### 2. Determine Repository

Ask the user:
- Which GitHub repository to create issues in (owner/repo format)
- Whether to create a new repository if one doesn't exist
- Whether to create a GitHub Project board to organize the issues

### 3. Break Down into Issues

Analyze the spec/plan and create issues for:

**For a spec:**
- One issue per major feature/component
- Each issue should have:
  - Clear title
  - Description with context from the spec
  - Acceptance criteria (derived from spec requirements)
  - Labels (e.g., `feature`, `enhancement`, `bug`, `documentation`)
  - Milestone (if the user wants to group issues by release)

**For an implementation plan:**
- One issue per task in the plan
- Each issue should have:
  - Task title from the plan
  - Description with implementation details
  - Dependencies on other issues (if any)
  - Labels (e.g., `task`, `refactor`, `test`)

### 4. Create Issues via GitHub MCP

Use the GitHub MCP tools to create each issue:

```
For each issue:
  - Use issue_write tool with method="create"
  - Set title, body (with acceptance criteria), labels
  - Assign milestone if specified
  - Track created issue numbers for cross-referencing
```

### 5. Create Project Board (Optional)

If the user wants a project board:
- Use GitHub Projects tools (if available via MCP)
- Or guide the user to create one manually and add the issues

### 6. Summary

After creating all issues, provide:
- List of created issue numbers and titles
- Links to each issue
- Any cross-references between dependent issues
- Next steps (e.g., "Start with issue #1")

## Issue Template

Each issue should follow this structure:

```markdown
## Description
[Brief description from the spec/plan]

## Context
[Relevant background from the spec]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Notes
[Any implementation details from the plan]

## Dependencies
- Depends on #[issue-number] (if applicable)
```

## Labels

Suggest appropriate labels based on issue type:
- `feature` - New functionality
- `enhancement` - Improvement to existing functionality
- `bug` - Bug fix
- `refactor` - Code restructuring
- `test` - Testing work
- `documentation` - Docs updates
- `task` - General task from a plan

## Error Handling

- If GitHub MCP is not available, guide the user to configure it
- If token is invalid, instruct the user to set `GITHUB_TOKEN`
- If repository doesn't exist, offer to create it via GitHub MCP

## Example Usage

User: "I have a spec for the auth system, create GitHub issues from it"

1. Read the spec file
2. Ask for repository name
3. Break spec into issues (e.g., "Set up Better Auth", "Create login page", "Add session management")
4. Create each issue via GitHub MCP
5. Provide summary with issue links
