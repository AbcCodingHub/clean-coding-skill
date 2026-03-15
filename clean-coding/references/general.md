# General (G1–G36) — Examples

G32 omitted — philosophical principle ("don't be arbitrary"), no code pattern.

### G1: One language per file

```
# Bad — SQL embedded in application code
def get_users():
    query = """
        SELECT u.name, u.email, a.street
        FROM users u
        JOIN addresses a ON u.id = a.user_id
        WHERE u.active = 1
    """
    return db.execute(query)

# Good — separate concerns
def get_active_users():
    return User.objects.filter(active=True).select_related("address")
```

### G2: Implement expected behavior

```
# Bad — surprising behavior
class DayOfWeek:
    def next(self, day):
        # silently skips weekends — undocumented!
        ...

# Good — does what the name promises
class DayOfWeek:
    def next(self, day):
        # returns the next calendar day
        ...

    def next_weekday(self, day):
        # clearly named alternative for skipping weekends
        ...
```

### G3: Handle boundary conditions

```
# Bad — no edge case handling
def average(numbers):
    return sum(numbers) / len(numbers)

# Good
def average(numbers):
    if not numbers:
        raise ValueError("Cannot average an empty collection")
    return sum(numbers) / len(numbers)
```

### G4: Don't override safeties

```
# Bad
# noinspection PyUnresolvedReferences
# type: ignore
# pylint: disable=all
# @SuppressWarnings("unchecked")

# Good — fix the actual problem instead of silencing the warning
```

### G5: DRY

```
# Bad — duplicated logic
ca_total = subtotal * 1.0825
ny_total = subtotal * 1.07

# Good — single source of truth
TAX_RATES = {"CA": 0.0825, "NY": 0.07}

def calculate_total(subtotal, state):
    return subtotal * (1 + TAX_RATES[state])
```

### G6: Consistent abstraction levels

```
# Bad — high-level and low-level mixed
def process_order(order):
    validate(order)
    tax = order.subtotal * 0.0825          # low-level detail
    order.total = order.subtotal + tax     # low-level detail
    send_confirmation(order)

# Good — same level throughout
def process_order(order):
    validate(order)
    apply_tax(order)
    send_confirmation(order)
```

### G7: Base classes don't know children

```
# Bad — parent depends on specific child
class Shape:
    def draw(self):
        if isinstance(self, Circle):
            draw_circle(self)

# Good — each child owns its behavior
class Shape:
    def draw(self): ...

class Circle(Shape):
    def draw(self):
        draw_circle(self)
```

### G8: Minimize public interface

```
# Bad — everything public
class OrderProcessor:
    def process(self): ...
    def validate_items(self): ...
    def calculate_tax(self): ...
    def apply_discount(self): ...

# Good — one public method, rest is internal
class OrderProcessor:
    def process(self): ...
    def _validate_items(self): ...
    def _calculate_tax(self): ...
    def _apply_discount(self): ...
```

### G9: Delete dead code

```
# Bad — unreachable branch
if status == "active":
    activate()
elif status == "inactive":
    deactivate()
elif status == "legacy_v1":    # removed 2 years ago
    migrate_legacy()

# Good — remove the dead branch
```

### G10: Variables near usage

```
# Bad — declared far from use
report_title = build_title(data)
# ... 40 lines of unrelated code ...
print(report_title)

# Good — declare just before use
report_title = build_title(data)
print(report_title)
```

### G11: Be consistent

```
# Bad — same concept, different patterns
def fetch_user(id): ...
def get_account(id): ...
def retrieve_order(id): ...

# Good — pick one verb and use it everywhere
def get_user(id): ...
def get_account(id): ...
def get_order(id): ...
```

### G12: Remove clutter

```
# Bad — meaningless defaults and unused variables
def process(data):
    result = None          # never used before reassignment
    temp = []              # never used at all
    result = transform(data)
    return result

# Good
def process(data):
    return transform(data)
```

### G13: No artificial coupling

```
# Bad — tax constant inside User class
class User:
    TAX_RATE = 0.0825
    def __init__(self, name): ...

# Good — tax belongs with tax logic
class TaxCalculator:
    RATE = 0.0825
```

### G14: No feature envy

```
# Bad — function uses another object's data more than its own
def calculate_commission(employee):
    return employee.sales.total * employee.sales.rate * employee.sales.region_bonus

# Good — let the object do its own work
def calculate_commission(employee):
    return employee.sales.calculate_commission()
```

### G15: No selector arguments

```
# Bad — argument selects behavior
def format_output(data, output_type):
    if output_type == "json":
        return to_json(data)
    elif output_type == "xml":
        return to_xml(data)

# Good — separate functions
def format_as_json(data): ...
def format_as_xml(data): ...
```

### G16: No obscured intent

```
# Bad — what does this do?
return (x & 0x0F) << 4 | (y & 0x0F)

# Good
return pack_coordinates(x, y)
```

### G17: Code where expected

```
# Bad — calculation in unexpected place
class ReportFormatter:
    def get_percent_full(self, container): ...

# Good — belongs with the data
class Container:
    def get_percent_full(self): ...
```

### G18: Prefer instance methods

```
# Bad — static method that uses instance data via parameter
class Account:
    @staticmethod
    def calculate_fee(account):
        return account.balance * 0.01

# Good — instance method
class Account:
    def calculate_fee(self):
        return self.balance * 0.01
```

### G19: Use explanatory variables

```
# Bad — complex expression without names
if re.match(r"^\d{4}-\d{2}-\d{2}$", s) and int(s[5:7]) <= 12 and int(s[8:10]) <= 31:
    ...

# Good — break it apart
is_date_format = re.match(r"^\d{4}-\d{2}-\d{2}$", s)
month = int(s[5:7])
day = int(s[8:10])
is_valid_date = is_date_format and month <= 12 and day <= 31
```

### G20: Function names say what they do

```
# Bad — what does "run" do here?
report.run()

# Good
report.generate_and_email()
```

### G21: Understand the algorithm

```
# Bad — "works" by coincidence, fragile
def find_match(items, target):
    for i in range(len(items)):
        for j in range(len(items)):
            if items[i] + items[j] == target:
                return (i, j)

# Good — understood and intentional
def find_pair_with_sum(items, target):
    seen = {}
    for i, value in enumerate(items):
        complement = target - value
        if complement in seen:
            return (seen[complement], i)
        seen[value] = i
    return None
```

### G22: Make dependencies physical

```
# Bad — implicit dependency on global state
TAX_RATE = 0.0825

def calculate_total(subtotal):
    return subtotal * (1 + TAX_RATE)     # depends on module-level global

# Good — explicit parameter
def calculate_total(subtotal, tax_rate):
    return subtotal * (1 + tax_rate)
```

### G23: Polymorphism over if/else

```
# Bad — will grow forever
def calculate_pay(employee):
    if employee.type == "SALARIED":
        return employee.salary
    elif employee.type == "HOURLY":
        return employee.hours * employee.rate

# Good — each type owns its logic
class SalariedEmployee:
    def calculate_pay(self):
        return self.salary

class HourlyEmployee:
    def calculate_pay(self):
        return self.hours * self.rate
```

### G24: Follow conventions

```
# Bad — ignores language idioms
def getUser(userId):       # camelCase in Python
    Dict = {}              # capitalized variable
    return Dict

# Good — follows PEP 8 / language convention
def get_user(user_id):
    result = {}
    return result
```

### G25: Named constants

```
# Bad
if elapsed_time > 86400: ...

# Good
SECONDS_PER_DAY = 86400
if elapsed_time > SECONDS_PER_DAY: ...
```

### G26: Be precise

```
# Bad — vague and sloppy
def find_user(name):
    results = search(name)
    return results[0]           # crashes if empty, ignores duplicates

# Good — precise about expectations
def find_unique_user(name):
    results = search(name)
    if len(results) == 0:
        raise UserNotFoundError(name)
    if len(results) > 1:
        raise AmbiguousUserError(name, results)
    return results[0]

# Bad — redundant boolean comparison
if applyDiscount == true:
    total *= 0.9

# Good — booleans are already true/false
if applyDiscount:
    total *= 0.9
```

### G27: Structure over convention

```
# Bad — relies on naming convention
def check_validation():     # not picked up by test runner
    assert validate("x")

# Good — structure enforces it
class TestValidation(unittest.TestCase):
    def test_valid_input(self):
        assert validate("x")
```

### G28: Encapsulate conditionals

Each `if` should test exactly one condition. Compound expressions → extract.

```
# Bad — multiple conditions in one if
if user.age >= 18 and user.has_id and not user.is_banned and user.email_verified:
    grant_access()

# Good — one named condition
if user.is_eligible_for_access():
    grant_access()

# Bad — compound condition inline
if len(items) > 0 and items[0].is_active and items[0].owner == current_user:
    process(items[0])

# Good — extract and name the condition
first_item_is_mine = len(items) > 0 and items[0].is_active and items[0].owner == current_user
if first_item_is_mine:
    process(items[0])
```

### G29: Avoid negative conditionals

Always prefer the positive form. Flip the logic and rename if needed.

```
# Bad
if not is_not_ready:
    start()

# Good — positive form
if is_ready:
    start()

# Bad — negated boolean method
if not user.is_disabled():
    allow_login()

# Good — flip to positive
if user.is_enabled():
    allow_login()
```

### G30: Functions do one thing

```
# Bad — does three things
def process_and_save_and_notify(order):
    validate(order)
    db.save(order)
    email.send(order.customer, "Order confirmed")

# Good — split responsibilities
def process_order(order):
    validate(order)
    save_order(order)
    notify_customer(order)
```

### G31: Make temporal coupling explicit

```
# Bad — steps must run in order but nothing enforces it
initialize()
process()
cleanup()

# Good — chain makes order explicit
def run():
    context = initialize()
    result = process(context)
    cleanup(result)
```

### G33: Encapsulate boundary conditions

```
# Bad — boundary math scattered
for i in range(len(items) - 1):
    compare(items[i], items[i + 1])

# Good — named boundary
last_index = len(items) - 1
for i in range(last_index):
    compare(items[i], items[i + 1])
```

### G34: One abstraction level per function

```
# Bad — mixes high and low level
def generate_report(data):
    report = Report()
    report.title = data["title"]
    html = "<html><body>"
    html += f"<h1>{report.title}</h1>"
    for item in data["items"]:
        report.add(item)
    html += "</body></html>"
    return html

# Good — each function at one level
def generate_report(data):
    report = build_report(data)
    return render_html(report)
```

### G35: Config at high levels

```
# Bad — config buried in low-level code
def send_request(path):
    url = "https://api.prod.example.com" + path
    timeout = 30
    return http.get(url, timeout=timeout)

# Good — config passed from high level
def send_request(path, base_url, timeout):
    return http.get(base_url + path, timeout=timeout)
```

### G36: Law of Demeter

```
# Bad — reaching through objects
output_dir = context.options.scratch_dir.absolute_path

# Good — one level of access
output_dir = context.get_scratch_dir()
```
