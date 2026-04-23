# Quickstart: メイン画面

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Verify Feature

1. Open the site — hero section with branding image and
   catch copy should be visible at the top
2. Click the call-to-action button in the hero — page
   should smooth-scroll to the product grid
3. Product grid should display rice product cards with
   image, name, origin, price, and description
4. Resize browser to 375px width — cards should stack
   in a single column
5. Resize to 768px — cards should display in 2 columns
6. Resize to 1280px+ — cards should display in 3 columns
7. Empty state: temporarily clear the products array in
   `src/data/products.ts` — empty message should appear

## Build

```bash
npm run build
npm run preview
```
