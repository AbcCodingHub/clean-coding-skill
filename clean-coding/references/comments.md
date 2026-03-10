# Comments (C1–C5) — Examples

### C1: No metadata in comments

```
# Bad — use VCS for this
# Author: John Smith
# Date: 2024-01-15
# Ticket: PROJ-1234

# Good — VCS tracks authorship, dates, and ticket refs via commit messages
```

### C2: Delete obsolete comments

```
# Bad — describes behavior that was changed
# Connects to legacy Oracle database
def get_connection():
    return postgres.connect(...)    # now uses Postgres!

# Good — delete the comment or update it
def get_connection():
    return postgres.connect(...)
```

### C3: No redundant comments

```
# Bad — restates the code
i += 1  # increment i

# Good — explains WHY
i += 1  # compensate for zero-indexing in display
```

### C4: Write comments well

```
# Bad — vague and rambling
# This function does stuff with the data, basically it
# takes the thing and processes it and returns something

# Good — precise and brief
# Retries failed payments up to 3 times with exponential backoff.
```

### C5: No commented-out code

```
# Bad — delete this, VCS remembers
# def old_calculate_tax(income):
#     return income * 0.15
```
