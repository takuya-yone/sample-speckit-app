# Quickstart: 米の商品画像生成・表示

## Prerequisites

- Node.js 20+
- npm 10+
- AI image generation tool or pre-generated images

## Verify Feature

1. Run `npm run dev` and open http://localhost:5173
2. Scroll to the product grid section
3. Verify each of the 6 products displays a unique image:
   - コシヒカリ — rice bowl with mountain backdrop
   - あきたこまち — rice bowl with autumn theme
   - ひとめぼれ — steaming rice with bamboo
   - ササニシキ — sushi rice in lacquer box
   - つや姫 — glossy rice grains close-up
   - ゆめぴりか — rice bowl with snowy landscape
4. Verify no placeholder/broken images appear
5. Verify images maintain consistent aspect ratio (no squish/stretch)
6. Open DevTools Network tab, reload page:
   - Verify each image is served as WebP
   - Verify each image is under 200KB
7. Test image error fallback:
   - Temporarily rename one image file
   - Reload page — placeholder should appear for that product
   - Restore the file

## Build Verification

```bash
npm run build
npm run preview
```

Verify images load correctly from the production build.
