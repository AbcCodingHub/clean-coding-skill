# Tests (T1–T9) — Examples

T2 (use a coverage tool), T7 (failure patterns), T8 (coverage patterns) omitted —
these are procedural/observational, not code patterns.

### T1: Sufficient tests

```
# Bad — only happy path
def test_divide():
    assert divide(10, 2) == 5

# Good — covers edges
def test_divide_normal():
    assert divide(10, 2) == 5

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

def test_divide_negative():
    assert divide(-10, 2) == -5
```

### T3: Don't skip trivial tests

```
# Worth having — documents expected default behavior
def test_user_default_role():
    user = User(name="Alice")
    assert user.role == "member"
```

### T4: Ignored test = ambiguity question

```
# Bad — hiding a problem
@pytest.mark.skip(reason="flaky, fix later")
def test_async_operation(): ...

# Good — either fix it or explain the real constraint
@pytest.mark.skip(reason="Requires Redis; see CONTRIBUTING.md for setup")
def test_cache_invalidation(): ...
```

### T5: Boundary conditions

```
def test_pagination_boundaries():
    items = list(range(100))

    assert paginate(items, page=1, size=10) == items[0:10]    # first
    assert paginate(items, page=10, size=10) == items[90:100]  # last
    assert paginate(items, page=11, size=10) == []             # beyond

    with pytest.raises(ValueError):
        paginate(items, page=0, size=10)                       # invalid

    assert paginate([], page=1, size=10) == []                 # empty
```

### T6: Exhaustively test near bugs

```
# Found bug: off-by-one in date calculation
# Now test ALL similar boundaries
def test_month_boundaries():
    assert last_day(2024, 1) == 31   # January
    assert last_day(2024, 2) == 29   # leap year Feb
    assert last_day(2023, 2) == 28   # non-leap Feb
    assert last_day(2024, 4) == 30   # 30-day month
    assert last_day(2024, 12) == 31  # December
```

### T9: Fast tests

```
# Bad — hits real database
def test_user_creation():
    db = connect_to_database()   # slow
    user = db.create_user("Alice")
    assert user.name == "Alice"

# Good — in-memory
def test_user_creation():
    db = InMemoryDatabase()
    user = db.create_user("Alice")
    assert user.name == "Alice"
```
