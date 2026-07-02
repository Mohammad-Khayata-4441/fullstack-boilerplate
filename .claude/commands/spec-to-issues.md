---
description: Converts a spec or implementation plan into GitHub Issues with labels, milestones, and acceptance criteria
---

# Spec to GitHub Issues

Convert the spec or plan at $ARGUMENTS into structured GitHub Issues.

## Process

1. **Read the source document** - Read the spec/plan file specified in $ARGUMENTS
2. **Determine repository** - Ask which GitHub repository (owner/repo format)
3. **Break down into issues** - Analyze and create issues for:
   - For specs: one issue per major feature/component
   - For plans: one issue per task
4. **Create each issue** via GitHub MCP with:
   - Clear title
   - Description with context and acceptance criteria
   - Appropriate labels (feature, enhancement, bug, refactor, test, documentation, task)
   - Milestone if specified
5. **Provide summary** - List all created issue numbers, titles, and links

## Issue Template

Each issue should include:

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

Use appropriate labels:
- `feature` - New functionality
- `enhancement` - Improvement to existing functionality
- `bug` - Bug fix
- `refactor` - Code restructuring
- `test` - Testing work
- `documentation` - Docs updates
- `task` - General task from a plan

If GitHub MCP is not available, guide the user to configure it in `.claude/settings.json`.
