# Names (N1–N7) — Examples

### N1: Descriptive names

```
# Bad — what is d?
d = 86400

# Good
SECONDS_PER_DAY = 86400

# Bad — what does this do?
def proc(lst):
    return [x for x in lst if x > 0]

# Good
def filter_positive_numbers(numbers):
    return [n for n in numbers if n > 0]
```

### N2: Right abstraction level

```
# Bad — leaks implementation
def get_dict_of_user_ids_to_names(): ...

# Good — abstracts the structure
def get_user_directory(): ...
```

### N3: Standard nomenclature

```
# Bad — invents terms
class UserMaker:
    def build(self, data): ...

# Good — uses pattern name
class UserFactory:
    def create(self, data): ...

# Good — uses domain term
def calculate_amortization(principal, rate, term): ...
```

### N4: Unambiguous names

```
# Bad
def rename(old, new): ...

# Good
def rename_file(old_path, new_path): ...
```

### N5: Length matches scope

```
# Good — short name for tiny scope (loop variable)
total = sum(x for x in numbers)

# Good — longer name for module-level constant
MAX_RETRY_ATTEMPTS_BEFORE_FAILURE = 5

# Bad — short name at module level
MAX = 5
```

### N6: No encodings

```
# Bad — Hungarian notation
str_name = "Alice"
lst_users = []
i_count = 0

# Good — clean names
name = "Alice"
users = []
count = 0

# Bad — interface prefix
class IUserRepository: ...

# Good
class UserRepository: ...
```

### N7: Describe side effects

```
# Bad — hides file creation
def get_config():
    if not config_path.exists():
        config_path.write("{}")   # hidden side effect
    return parse(config_path.read())

# Good
def get_or_create_config():
    if not config_path.exists():
        config_path.write("{}")
    return parse(config_path.read())
```
