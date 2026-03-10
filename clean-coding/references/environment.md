# Environment (E1–E2) — Examples

### E1: One command to build

```
# Bad — multi-step manual setup
# 1. Install dependencies
# 2. Set up database
# 3. Generate config
# 4. Run migrations

# Good — one command
make setup   # or: pip install -e ".[dev]"
```

### E2: One command to test

```
# Bad — "run unit tests, then integration tests, then lint"

# Good
make test    # or: pytest
```
