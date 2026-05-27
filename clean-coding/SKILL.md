---
name: clean-coding
description: >
  Apply when writing, editing, refactoring, or reviewing TypeScript or Python code.
  Use during implementation tasks where code quality matters: feature work, bug fixes,
  refactors, PR reviews. Triggers: 'write', 'implement', 'add function', 'fix',
  'refactor', 'review', 'clean up'. Enforces Robert C. Martin's Clean Code rules
  (N/F/G/C/T/E codes) with concrete TypeScript and Python examples. Reports findings
  as a checklist with severity. Applies the Boy Scout Rule — always leave code cleaner
  than found.
---

# Clean Coding

Apply Robert C. Martin's Clean Code principles to every code interaction.
Claude already knows Clean Code — this skill defines *when* and *how* to apply it consistently.

## Core behavior

1. **Write clean code from the start.** When generating new code, apply Clean Code rules during writing — not afterward. Use descriptive names (N1), include units in variable names (N4), keep each `if` to one positive condition (G28/G29), extract constants (G25), keep functions small and focused (G30). Don't write dirty code and clean it up — write it clean the first time.
2. Complete the requested task.
3. Scan touched code for remaining violations using the rule table below.
4. Apply proportional cleanups (rename a variable, extract a constant, extract a function, delete dead code, etc.).
5. Report all findings using the output format defined below.

Keep changes proportional to the task. A bug fix gets a couple cleanups. A refactor gets a full review.
Always apply N1 (Descriptive names), G25 (Named constants), C2 (Delete obsolete comments) and C3 (No redundant comments), no matter the size of the change.

## Output format

Report findings as a checklist after the code. Each item uses the rule code, a short description, and the location.

ALWAYS use this format:
`- [x] = [Rule code] ([Short description]): what was fixed (line number)`
e.g.:
```
### Clean Code Findings
- [x] N1 (Descriptive names): Renamed `d` → `elapsed_seconds` (line 12)
- [x] G25 (Named constants): Extracted magic number `86400` → `SECONDS_PER_DAY` (line 15)
- [ ] F1 (Minimize arguments): `create_order()` has 6 parameters — use a data structure (line 34)
- [ ] F1 (Minimize arguments): `send_email(to, subject, body)` has 3 args — consider grouping (line 58)
```

`[x]` = fixed by Claude. `[ ]` = flagged for the user to decide.

If no violations are found, skip the section entirely — do not output "no findings."

## Rule reference

These are the rules to check. For detailed before/after examples, read the matching file in `references/`:

| Section | Reference file |
|---------|---------------|
| Names (N) | `references/names.md` |
| Functions (F) | `references/functions.md` |
| General (G) | `references/general.md` |
| Comments (C) | `references/comments.md` |
| Tests (T) | `references/tests.md` |
| Environment (E) | `references/environment.md` |

Read only the file relevant to the current task.

### Names (N)

| Code | Rule | Key signal |
|------|------|------------|
| N1 | Descriptive names | Name requires a comment to understand |
| N2 | Right abstraction level | Name leaks implementation details |
| N3 | Standard nomenclature | Not using domain terms or pattern names |
| N4 | Unambiguous names | Name could mean multiple things |
| N5 | Length matches scope | Short name in long scope or vice versa |
| N6 | No encodings | Hungarian notation, type prefixes |
| N7 | Describe side effects | Name hides what function actually does |

### Functions (F)

| Code | Rule | Key signal |
|------|------|------------|
| F1 | Minimize arguments | Too many function parameters |
| F2 | No output arguments | Mutating arguments instead of returning |
| F3 | No flag arguments | Boolean parameter → split into two functions |
| F4 | Delete dead functions | Uncalled code exists "just in case" |

### General (G)

| Code | Rule | Key signal |
|------|------|------------|
| G1 | One language per file | Multiple languages mixed in one source file |
| G2 | Implement expected behavior | Code surprises the caller or violates conventions |
| G3 | Handle boundary conditions | Edge cases, nulls, empty collections unhandled |
| G4 | Don't override safeties | Disabling warnings, linters, or safety checks |
| G5 | DRY — no duplication | Same logic in multiple places |
| G6 | Consistent abstraction levels | High-level and low-level calls mixed in one function |
| G7 | Base classes don't know children | Parent depends on specific subclass |
| G8 | Minimize public interface | Too many public methods or properties exposed |
| G9 | Delete dead code | Unreachable or unused code |
| G10 | Variables near usage | Declaration far from where the variable is used |
| G11 | Be consistent | Same concept handled differently in different places |
| G12 | Remove clutter | Unused variables, unnecessary defaults, meaningless boilerplate |
| G13 | No artificial coupling | Things grouped together that don't belong together |
| G14 | No feature envy | Function uses more of another class than its own |
| G15 | No selector arguments | Argument selects behavior (similar to F3 but broader) |
| G16 | No obscured intent | Clever code over clear code |
| G17 | Code where expected | Function or constant lives in a surprising location |
| G18 | Prefer instance methods | Static method that should be an instance method |
| G19 | Use explanatory variables | Complex expression without intermediate named variables |
| G20 | Function names say what they do | Name doesn't describe actual behavior |
| G21 | Understand the algorithm | Code works "by accident," not by design |
| G22 | Make dependencies physical | Implicit dependencies instead of explicit parameters |
| G23 | Polymorphism over if/else chains | Growing conditional blocks by type |
| G24 | Follow conventions | Violates language idioms or team style (e.g. PEP 8) |
| G25 | Named constants, not magic numbers | Literal values without meaning |
| G26 | Be precise | Vague types, unchecked casts, sloppy equality, redundant boolean comparisons (`== true`) |
| G27 | Structure over convention | Relying on naming convention instead of enforced structure |
| G28 | Encapsulate conditionals | Compound boolean expressions in conditionals |
| G29 | Avoid negative conditionals | Negated or double-negative conditionals |
| G30 | Functions do one thing | Function has multiple responsibilities |
| G31 | Make temporal coupling explicit | Steps that must run in order but nothing enforces it |
| G32 | Don't be arbitrary | Structure should have a reason, not just habit |
| G33 | Encapsulate boundary conditions | `length - 1`, `end + 1` scattered through code |
| G34 | One abstraction level per function | High-level and low-level logic mixed |
| G35 | Config at high levels | Configuration values buried deep in low-level code |
| G36 | Law of Demeter | Chained property access (`a.b.c.d`) |

### Comments (C)

| Code | Rule | Key signal |
|------|------|------------|
| C1 | No metadata in comments | Author, date, ticket in comment (use VCS) |
| C2 | Delete obsolete comments | Comment describes code that changed |
| C3 | No redundant comments | Comment restates the code |
| C4 | Write comments well | If a comment is needed, make it precise and brief |
| C5 | No commented-out code | Commented blocks left in (use VCS) |

### Tests (T)

| Code | Rule | Key signal |
|------|------|------------|
| T1 | Test everything that could break | Only happy path tested |
| T2 | Use a coverage tool | No coverage data to guide testing |
| T3 | Don't skip trivial tests | Simple behavior left undocumented by tests |
| T4 | Ignored test = ambiguity question | `@skip` hiding a real problem instead of resolving it |
| T5 | Test boundary conditions | Edges, limits, empty inputs not covered |
| T6 | Exhaustively test near bugs | Bug found but similar cases untested |
| T7 | Patterns of failure are revealing | Multiple test failures share a root cause |
| T8 | Coverage patterns are revealing | Untested paths may signal design problems |
| T9 | Tests must be fast | Slow I/O, network, or DB calls in unit tests |

### Environment (E)

| Code | Rule | Key signal |
|------|------|------------|
| E1 | One command to build | Complex multi-step setup |
| E2 | One command to test | Tests require manual steps |

## Priority order

When multiple violations exist, fix in this order:
1. **Correctness**: G3 (boundary conditions), T1/T5 (missing tests)
2. **Clarity**: N1 (names), G16 (obscured intent), G25 (magic numbers)
3. **Structure**: F1 (too many args), G30 (single responsibility), G5 (DRY)
4. **Cleanup**: C2/C5 (stale comments), G9/F4 (dead code)

## When reviewing code (without editing)

Use the same checklist format but mark all items as `[ ]` since nothing is being fixed.
Order findings by the priority order defined above (Correctness → Clarity → Structure → Cleanup):

```
### Clean Code Review
- [ ] F1 (Minimize arguments): `processOrder()` has 7 parameters (line 22)
- [ ] G25 (Named constants): Magic number `3600` used without constant (line 45)
- [ ] C3 (No redundant comments): Redundant comment `// increment counter` (line 67)
```

## What NOT to do

- Do not rewrite entire files when asked to fix a bug.
- Do not add type annotations, docstrings, or error handling to code you did not change.
- Do not flag things Claude already knows are fine — only flag genuine violations.
- Do not lecture about Clean Code philosophy. Apply the rules; the results speak for themselves.
