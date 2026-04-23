# Data Model: カート機能の実装

## Entities

### CartItem

Represents a single product entry in the shopping cart.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| productId | string | Reference to Product.id | Must match an existing product |
| quantity | number | Number of units in cart | 1 ≤ quantity ≤ 99 |

**Relationships**:
- References `Product` entity via `productId` (many-to-one)
- Derived fields: `subtotal = product.price * quantity`

### Cart (Store State)

Represents the full cart state managed by zustand.

| Field | Type | Description |
|-------|------|-------------|
| items | CartItem[] | List of cart items |

**Derived Values** (computed, not stored):
- `totalItems`: Sum of all item quantities
- `totalPrice`: Sum of all item subtotals (price * quantity)

**Actions**:
- `addItem(productId)`: Add product or increment quantity (max 99)
- `removeItem(productId)`: Remove product from cart entirely
- `updateQuantity(productId, quantity)`: Set specific quantity (1-99)
- `clearCart()`: Remove all items

### Product (Existing — Unchanged)

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Product name (Japanese) |
| origin | string | Production region |
| price | number | Price in JPY (tax included) |
| description | string | Product description |
| imageUrl | string | Path to product image |

## State Transitions

```
Empty Cart
  │
  ├─ addItem(id) → Cart with 1 item (qty: 1)
  │
Cart with items
  ├─ addItem(existing) → quantity++ (max 99)
  ├─ addItem(new) → new CartItem added
  ├─ updateQuantity(id, n) → quantity = n (1-99)
  ├─ removeItem(id) → item removed (may become empty)
  └─ clearCart() → Empty Cart
```

## Persistence

- Storage: browser localStorage
- Key: `cart-storage` (zustand persist default)
- Format: JSON serialization of `{ items: CartItem[] }`
- Hydration: automatic on store initialization
