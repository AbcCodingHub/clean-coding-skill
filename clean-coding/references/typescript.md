# TypeScript-specific Clean Code Examples

Language-specific patterns for applying the rule codes in TypeScript.

## F1 — Minimize arguments → Options object

```ts
// bad
function createUser(name: string, email: string, role: string, active: boolean, age: number) {}

// good
interface CreateUserOptions {
  name: string;
  email: string;
  role: string;
  active: boolean;
  age: number;
}
function createUser(options: CreateUserOptions) {}
```

## F3 — No flag arguments → function overloads or separate functions

```ts
// bad
function fetchData(url: string, cache: boolean) {}

// good
function fetchFresh(url: string) {}
function fetchCached(url: string) {}
```

## N4 — Unambiguous names → Branded types

```ts
// bad — UserId and OrderId are both `string`, easy to mix up
function getOrder(userId: string, orderId: string) {}

// good
type UserId = string & { readonly _brand: 'UserId' };
type OrderId = string & { readonly _brand: 'OrderId' };
function getOrder(userId: UserId, orderId: OrderId) {}
```

## G26 — Be precise → `satisfies` operator

```ts
// bad — loses type narrowing, accepts anything
const config = { timeout: 3000, retries: 3 } as Config;

// good — validates shape but preserves literal types
const config = { timeout: 3000, retries: 3 } satisfies Config;
```

## G8 — Minimize public interface → `readonly` and private fields

```ts
// bad
class Counter {
  count: number = 0;
  increment() { this.count++; }
}

// good
class Counter {
  readonly #count: number = 0;
  get count() { return this.#count; }
  increment() { return new Counter(this.#count + 1); }
}
```

## G28 — Encapsulate conditionals → named boolean variables

```ts
// bad
if (user.role === 'admin' && user.active && !user.suspended) {}

// good
const canAccessDashboard = user.role === 'admin' && user.active && !user.suspended;
if (canAccessDashboard) {}
```

## G33 — Encapsulate boundary conditions → named constants

```ts
// bad
for (let i = 0; i < items.length - 1; i++) {}

// good
const lastIndex = items.length - 1;
for (let i = 0; i < lastIndex; i++) {}
```

## T9 — Tests must be fast → avoid real I/O

```ts
// bad — real fetch in unit test
it('loads user', async () => {
  const user = await fetch('/api/user/1').then(r => r.json());
});

// good — injected dependency
it('loads user', async () => {
  const user = await loadUser('1', mockHttpClient);
});
```
