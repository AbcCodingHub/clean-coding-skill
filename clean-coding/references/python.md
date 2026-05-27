# Python-specific Clean Code Examples

Language-specific patterns for applying the rule codes in Python.

## F1 — Minimize arguments → dataclass

```python
# bad
def create_order(customer_id, product_id, quantity, discount, currency, shipping_address):
    ...

# good
@dataclass
class OrderRequest:
    customer_id: str
    product_id: str
    quantity: int
    discount: float
    currency: str
    shipping_address: str

def create_order(request: OrderRequest):
    ...
```

## F3 — No flag arguments → separate functions

```python
# bad
def render(template: str, debug: bool = False): ...

# good
def render(template: str): ...
def render_debug(template: str): ...
```

## G26 — Be precise → type hints everywhere

```python
# bad
def get_user(user_id):
    return users.get(user_id)

# good
def get_user(user_id: str) -> User | None:
    return users.get(user_id)
```

## G23 — Polymorphism over if/else → Protocol

```python
# bad
def export(data, fmt: str):
    if fmt == 'csv':
        ...
    elif fmt == 'json':
        ...

# good
class Exporter(Protocol):
    def export(self, data: list) -> str: ...

def export(data: list, exporter: Exporter) -> str:
    return exporter.export(data)
```

## N4 — Unambiguous names → NewType

```python
# bad — both are str, easy to pass wrong value
def send_email(sender: str, recipient: str): ...

# good
UserId = NewType('UserId', str)
EmailAddress = NewType('EmailAddress', str)
def send_email(sender: EmailAddress, recipient: EmailAddress): ...
```

## G28 — Encapsulate conditionals → named variable

```python
# bad
if user.role == 'admin' and user.is_active and not user.is_suspended:
    ...

# good
can_access = user.role == 'admin' and user.is_active and not user.is_suspended
if can_access:
    ...
```

## G24 — Follow conventions → PEP 8 and dataclasses over plain dicts

```python
# bad — mutable dict for structured data
user = {'first_name': 'Ada', 'last_name': 'Lovelace', 'age': 36}

# good
@dataclass(frozen=True)
class User:
    first_name: str
    last_name: str
    age: int
```

## T9 — Tests must be fast → mock I/O

```python
# bad — real DB call in unit test
def test_get_user():
    user = db.query("SELECT * FROM users WHERE id = 1")

# good
def test_get_user(mock_db):
    mock_db.query.return_value = User(id=1, name='Ada')
    user = get_user(1, mock_db)
```
