# clean-coding-skill

A custom skill for Claude Code that enforces Robert C. Martin's **Clean Code** principles whenever code is written, edited, reviewed, or refactored.

## What it does

- Applies the Boy Scout Rule — always leave code cleaner than you found it.
- Checks touched code against 60+ rules covering **naming, functions, general design, comments, tests, and environment**.
- Automatically fixes small violations (renames, constant extraction, dead-code removal) and flags larger ones for you to decide.
- Reports findings in a consistent checklist format with rule codes and locations.

## Installation

Copy the `clean-coding/` folder into your project's `.claude/skills/` directory:

```
.claude/
  skills/
    clean-coding/
      SKILL.md
      references/
        comments.md
        environment.md
        functions.md
        general.md
        names.md
        tests.md
```

The skill activates automatically whenever Claude Code works with code — no manual trigger needed.

## Rule categories

| Category | Codes | Examples |
|----------|-------|---------|
| Names | N1–N7 | Descriptive names, no encodings, scope-appropriate length |
| Functions | F1–F4 | Fewer arguments, no flag params, no dead functions |
| General | G1–G36 | DRY, single responsibility, no magic numbers, Law of Demeter |
| Comments | C1–C5 | No commented-out code, no redundant or obsolete comments |
| Tests | T1–T9 | Test boundaries, fast tests, use coverage tools |
| Environment | E1–E2 | One command to build, one command to test |

## License

See [LICENSE](LICENSE) for details.
