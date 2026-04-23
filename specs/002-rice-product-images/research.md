# Research: 米の商品画像生成・表示

## Decision: Image Generation Approach

**Decision**: Generate images using an AI image generation tool
(e.g., CLI-based or API-based image generator), then convert to
WebP format and optimize with sharp or cwebp.

**Rationale**: AI-generated images provide unique, license-free
visuals. Post-processing with WebP conversion ensures optimal
file sizes per spec requirement (< 200KB).

**Alternatives considered**:
- Stock photo sites — licensing costs, not unique
- Hand-drawn illustrations — time-intensive, out of scope
- CSS-only placeholders — fails spec requirement for real images

## Decision: Image Specifications

**Decision**: Generate at 800x600px (4:3 aspect ratio), save as
WebP with quality setting targeting < 200KB per file.

**Rationale**: 800x600 is sufficient for product cards which
display images at max ~400px wide. The 4:3 ratio matches the
card layout (w-full h-48 on a ~350px card). WebP provides
excellent compression.

**Alternatives considered**:
- 1200x900 (larger) — unnecessary for card display, bigger files
- 400x300 (smaller) — may look blurry on high-DPI screens
- PNG format — 2-3x larger file sizes than WebP

## Decision: Image Content Direction

**Decision**: Each image should depict a bowl or bag of white
rice, with subtle visual differentiation per variety using
color tones, backgrounds, and styling that evoke the origin
region.

**Rationale**: Consistent product photography style builds brand
trust. Regional cues help differentiate visually similar products.

**Image Prompts**:
1. コシヒカリ (Niigata): Premium white rice in wooden bowl,
   mountain backdrop, warm golden light
2. あきたこまち (Akita): Rice in ceramic bowl, autumn leaves,
   cool tones
3. ひとめぼれ (Miyagi): Steaming rice bowl, green bamboo
   background, soft natural light
4. ササニシキ (Miyagi): Sushi rice in lacquer box, minimalist
   Japanese style
5. つや姫 (Yamagata): Glossy rice grains close-up, cherry
   blossom accent
6. ゆめぴりか (Hokkaido): Rice in stoneware bowl, snowy
   landscape background

## Decision: File Placement

**Decision**: Place images in public/images/ directory. The
product data in src/data/products.ts already references
`/images/<name>.webp` paths.

**Rationale**: Vite serves public/ directory as static assets
at the root URL. No code changes needed — existing imageUrl
paths already match the target filenames.
