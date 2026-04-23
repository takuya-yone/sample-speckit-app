# Data Model: メイン画面

## Entities

### Product

Represents a rice product displayed on the main screen.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| name | string | Yes | Rice variety name (e.g., コシヒカリ) |
| origin | string | Yes | Production region (e.g., 新潟県) |
| price | number | Yes | Price in JPY, tax-included |
| description | string | Yes | Short description of the product |
| imageUrl | string | Yes | URL or path to product image |

**Validation Rules**:
- `id` MUST be unique across all products
- `price` MUST be a positive integer (JPY has no decimals)
- `name` MUST NOT exceed 50 characters
- `description` MUST NOT exceed 200 characters

**Notes**:
- Category field excluded per spec (v1 does not use categories)
- Weight/quantity fields not included in v1 scope
- Data source: hardcoded TypeScript array in `src/data/products.ts`

## Relationships

No relationships in v1 (single entity, no backend).
