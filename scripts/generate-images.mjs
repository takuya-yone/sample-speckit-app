import sharp from "sharp";
import { mkdir } from "fs/promises";

const OUTPUT_DIR = "public/images";
await mkdir(OUTPUT_DIR, { recursive: true });

const WIDTH = 800;
const HEIGHT = 600;

function createRiceSvg({ bgGradient, accentColor, bowlColor, riceColor, label, motif }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      ${bgGradient}
    </linearGradient>
    <radialGradient id="shine" cx="0.4" cy="0.3" r="0.6">
      <stop offset="0%" stop-color="white" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bowl-g" cx="0.5" cy="0.4" r="0.5">
      <stop offset="0%" stop-color="${bowlColor}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${darken(bowlColor)}" stop-opacity="1"/>
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#shine)"/>
  <!-- Motif decoration -->
  ${motif}
  <!-- Bowl -->
  <g filter="url(#shadow)" transform="translate(${WIDTH / 2}, ${HEIGHT / 2 + 20})">
    <!-- Bowl body -->
    <ellipse cx="0" cy="30" rx="160" ry="90" fill="url(#bowl-g)"/>
    <!-- Rice mound -->
    <ellipse cx="0" cy="-10" rx="130" ry="65" fill="${riceColor}"/>
    <ellipse cx="0" cy="-20" rx="120" ry="55" fill="${lighten(riceColor)}"/>
    <!-- Rice grain details -->
    ${riceGrains(-40, -30, riceColor)}
    ${riceGrains(20, -35, riceColor)}
    ${riceGrains(-10, -45, riceColor)}
    ${riceGrains(40, -25, riceColor)}
    ${riceGrains(-30, -15, riceColor)}
    <!-- Bowl rim -->
    <ellipse cx="0" cy="-5" rx="155" ry="42" fill="none" stroke="${accentColor}" stroke-width="6"/>
    <ellipse cx="0" cy="-5" rx="155" ry="42" fill="none" stroke="white" stroke-width="2" stroke-opacity="0.3"/>
  </g>
  <!-- Label -->
  <text x="${WIDTH / 2}" y="${HEIGHT - 40}" text-anchor="middle" font-family="serif" font-size="36" font-weight="bold" fill="white" filter="url(#shadow)">${label}</text>
</svg>`;
}

function riceGrains(cx, cy, color) {
  const grains = [];
  for (let i = 0; i < 5; i++) {
    const x = cx + (Math.sin(i * 1.3 + cx) * 25);
    const y = cy + (Math.cos(i * 1.7 + cy) * 12);
    const angle = (i * 37 + cx) % 180;
    grains.push(
      `<ellipse cx="${x}" cy="${y}" rx="8" ry="3" fill="white" fill-opacity="0.4" transform="rotate(${angle}, ${x}, ${y})"/>`
    );
  }
  return grains.join("\n    ");
}

function darken(hex) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 40);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 40);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 40);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function lighten(hex) {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + 25);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + 25);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + 25);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

const products = [
  {
    name: "koshihikari",
    label: "コシヒカリ",
    bgGradient: `<stop offset="0%" stop-color="#8B6914"/><stop offset="50%" stop-color="#4a6741"/><stop offset="100%" stop-color="#2d4a3e"/>`,
    accentColor: "#c4a35a",
    bowlColor: "#8B4513",
    riceColor: "#f5f0e1",
    motif: `<!-- Mountains -->
    <polygon points="0,350 200,180 400,350" fill="#3a5a3a" fill-opacity="0.4"/>
    <polygon points="250,350 500,150 700,350" fill="#2d4a2d" fill-opacity="0.3"/>
    <polygon points="500,350 700,200 800,350" fill="#3a5a3a" fill-opacity="0.25"/>
    <circle cx="680" cy="100" r="50" fill="#f0c040" fill-opacity="0.3"/>`,
  },
  {
    name: "akitakomachi",
    label: "あきたこまち",
    bgGradient: `<stop offset="0%" stop-color="#8B4513"/><stop offset="50%" stop-color="#a0522d"/><stop offset="100%" stop-color="#654321"/>`,
    accentColor: "#d4a574",
    bowlColor: "#e8dcc8",
    riceColor: "#faf6ef",
    motif: `<!-- Autumn leaves -->
    <circle cx="150" cy="120" r="25" fill="#cc4400" fill-opacity="0.5"/>
    <circle cx="180" cy="150" r="18" fill="#dd6622" fill-opacity="0.4"/>
    <circle cx="620" cy="100" r="22" fill="#cc5500" fill-opacity="0.45"/>
    <circle cx="680" cy="140" r="15" fill="#ee7733" fill-opacity="0.35"/>
    <circle cx="100" cy="180" r="12" fill="#dd5511" fill-opacity="0.3"/>
    <circle cx="700" cy="80" r="20" fill="#bb4400" fill-opacity="0.3"/>`,
  },
  {
    name: "hitomebore",
    label: "ひとめぼれ",
    bgGradient: `<stop offset="0%" stop-color="#2d5a27"/><stop offset="50%" stop-color="#3a6b3a"/><stop offset="100%" stop-color="#1a3a1a"/>`,
    accentColor: "#7cb342",
    bowlColor: "#f5f5f0",
    riceColor: "#faf8f2",
    motif: `<!-- Bamboo -->
    <rect x="80" y="0" width="18" height="600" fill="#4a7a3a" fill-opacity="0.4" rx="4"/>
    <rect x="110" y="0" width="12" height="600" fill="#5a8a4a" fill-opacity="0.3" rx="3"/>
    <rect x="680" y="0" width="16" height="600" fill="#4a7a3a" fill-opacity="0.35" rx="4"/>
    <rect x="710" y="0" width="10" height="600" fill="#5a8a4a" fill-opacity="0.25" rx="3"/>
    <!-- Steam -->
    <path d="M380,200 Q390,170 400,200 Q410,170 420,200" fill="none" stroke="white" stroke-width="2" stroke-opacity="0.4"/>
    <path d="M360,180 Q370,150 380,180 Q390,150 400,180" fill="none" stroke="white" stroke-width="2" stroke-opacity="0.3"/>`,
  },
  {
    name: "sasanishiki",
    label: "ササニシキ",
    bgGradient: `<stop offset="0%" stop-color="#1a1a2e"/><stop offset="50%" stop-color="#2d2d44"/><stop offset="100%" stop-color="#16213e"/>`,
    accentColor: "#8b0000",
    bowlColor: "#2a0a0a",
    riceColor: "#f8f4ea",
    motif: `<!-- Minimalist lines -->
    <line x1="50" y1="500" x2="750" y2="500" stroke="#555" stroke-width="1" stroke-opacity="0.3"/>
    <line x1="50" y1="520" x2="750" y2="520" stroke="#555" stroke-width="1" stroke-opacity="0.2"/>
    <rect x="600" y="60" width="120" height="160" fill="none" stroke="#8b0000" stroke-width="2" stroke-opacity="0.3" rx="2"/>`,
  },
  {
    name: "tsuyahime",
    label: "つや姫",
    bgGradient: `<stop offset="0%" stop-color="#f8c8d8"/><stop offset="50%" stop-color="#c8a0b0"/><stop offset="100%" stop-color="#8a6070"/>`,
    accentColor: "#d4a0b0",
    bowlColor: "#f0e6d0",
    riceColor: "#fffef8",
    motif: `<!-- Cherry blossoms -->
    <circle cx="120" cy="100" r="20" fill="#ffb7c5" fill-opacity="0.6"/>
    <circle cx="150" cy="80" r="15" fill="#ffc0cb" fill-opacity="0.5"/>
    <circle cx="100" cy="130" r="12" fill="#ffb7c5" fill-opacity="0.4"/>
    <circle cx="650" cy="120" r="18" fill="#ffc0cb" fill-opacity="0.5"/>
    <circle cx="700" cy="90" r="14" fill="#ffb7c5" fill-opacity="0.45"/>
    <circle cx="680" cy="150" r="10" fill="#ffd0d8" fill-opacity="0.4"/>
    <circle cx="160" cy="60" r="8" fill="#ffd0d8" fill-opacity="0.35"/>`,
  },
  {
    name: "yumepirika",
    label: "ゆめぴりか",
    bgGradient: `<stop offset="0%" stop-color="#d0e8f0"/><stop offset="50%" stop-color="#8ab4c4"/><stop offset="100%" stop-color="#4a7a8a"/>`,
    accentColor: "#6090a0",
    bowlColor: "#706050",
    riceColor: "#faf6ef",
    motif: `<!-- Snow / Hokkaido landscape -->
    <circle cx="100" cy="80" r="4" fill="white" fill-opacity="0.6"/>
    <circle cx="250" cy="120" r="3" fill="white" fill-opacity="0.5"/>
    <circle cx="550" cy="60" r="5" fill="white" fill-opacity="0.55"/>
    <circle cx="700" cy="100" r="3" fill="white" fill-opacity="0.45"/>
    <circle cx="400" cy="50" r="4" fill="white" fill-opacity="0.5"/>
    <circle cx="180" cy="150" r="3" fill="white" fill-opacity="0.4"/>
    <circle cx="620" cy="130" r="4" fill="white" fill-opacity="0.5"/>
    <!-- Snow mountains -->
    <polygon points="0,380 150,250 300,380" fill="white" fill-opacity="0.15"/>
    <polygon points="200,380 400,220 600,380" fill="white" fill-opacity="0.1"/>
    <polygon points="500,380 680,260 800,380" fill="white" fill-opacity="0.12"/>`,
  },
];

for (const p of products) {
  const svg = createRiceSvg(p);
  const buffer = Buffer.from(svg);
  await sharp(buffer)
    .resize(WIDTH, HEIGHT)
    .webp({ quality: 80 })
    .toFile(`${OUTPUT_DIR}/${p.name}.webp`);
  const stats = await import("fs").then((fs) =>
    fs.promises.stat(`${OUTPUT_DIR}/${p.name}.webp`)
  );
  console.log(`✓ ${p.name}.webp — ${(stats.size / 1024).toFixed(1)}KB`);
}

console.log("\nAll images generated successfully.");
