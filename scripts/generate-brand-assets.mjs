import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const BRAND_BLUE = '#2163CC';
const BRAND_NAVY = '#0B1C2D';
const BRAND_CHARCOAL = '#333333';
const BRAND_WHITE = '#FFFFFF';

// Profit Point Ribbon Mark
// Symmetrical flow ribbon with:
// 1) Upper right 'P' ribbon with 26-degree diagonal cuts
// 2) Lower left 'd'/'P' ribbon with 26-degree diagonal cuts
const markTopRight = `
  M 124,18 
  L 230,18 
  C 272,18 304,50 304,90 
  C 304,130 272,162 230,162 
  L 198,162 
  L 174,202 
  L 134,202 
  L 158,162 
  L 146,162 
  L 170,122 
  L 230,122 
  C 248,122 264,108 264,90 
  C 264,72 248,58 230,58 
  L 100,58 
  Z 
  M 96,18 
  L 136,18 
  L 76,122 
  L 36,122 
  Z
`;

const markBottomLeft = `
  M 196,182 
  L 90,182 
  C 48,182 16,150 16,110 
  C 16,70 48,38 90,38 
  L 122,38 
  L 146,-2 
  L 186,-2 
  L 162,38 
  L 174,38 
  L 150,78 
  L 90,78 
  C 72,78 56,92 56,110 
  C 56,128 72,142 90,142 
  L 220,142 
  Z 
  M 224,182 
  L 184,182 
  L 244,78 
  L 284,78 
  Z
`;

function getMarkSvg(color = BRAND_BLUE) {
  return `
    <g fill="${color}">
      <path fill-rule="evenodd" clip-rule="evenodd" d="${markTopRight.trim()}" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="${markBottomLeft.trim()}" />
    </g>
  `;
}

// Letter paths for "PROFIT POINT"
const wordmarkPaths = `
  <!-- P -->
  <path d="M 360,64 L 396,64 C 412,64 424,74 424,88 C 424,102 412,112 396,112 L 376,112 L 376,136 L 360,136 Z M 376,78 L 376,98 L 394,98 C 402,98 408,94 408,88 C 408,82 402,78 394,78 Z" />
  <!-- R -->
  <path d="M 436,64 L 472,64 C 486,64 496,73 496,86 C 496,96 488,104 478,107 L 498,136 L 479,136 L 462,110 L 452,110 L 452,136 L 436,136 Z M 452,78 L 452,97 L 470,97 C 476,97 480,93 480,87.5 C 480,82 476,78 470,78 Z" />
  <!-- O -->
  <path d="M 542,64 C 564,64 580,80 580,100 C 580,120 564,136 542,136 C 520,136 504,120 504,100 C 504,80 520,64 542,64 Z M 542,78 C 528,78 520,88 520,100 C 520,112 528,122 542,122 C 556,122 564,112 564,100 C 564,88 556,78 542,78 Z" />
  <!-- F -->
  <path d="M 592,64 L 634,64 L 634,78 L 608,78 L 608,93 L 630,93 L 630,106 L 608,106 L 608,136 L 592,136 Z" />
  <!-- I -->
  <path d="M 646,64 L 662,64 L 662,136 L 646,136 Z" />
  <!-- T -->
  <path d="M 672,64 L 720,64 L 720,78 L 704,78 L 704,136 L 688,136 L 688,78 L 672,78 Z" />
  <!-- P -->
  <path d="M 746,64 L 782,64 C 798,64 810,74 810,88 C 810,102 798,112 782,112 L 762,112 L 762,136 L 746,136 Z M 762,78 L 762,98 L 780,98 C 788,98 794,94 794,88 C 794,82 788,78 780,78 Z" />
  <!-- O -->
  <path d="M 852,64 C 874,64 890,80 890,100 C 890,120 874,136 852,136 C 830,136 814,120 814,100 C 814,80 830,64 852,64 Z M 852,78 C 838,78 830,88 830,100 C 830,112 838,122 852,122 C 866,122 874,112 874,100 C 874,88 866,78 852,78 Z" />
  <!-- I -->
  <path d="M 902,64 L 918,64 L 918,136 L 902,136 Z" />
  <!-- N -->
  <path d="M 930,64 L 946,64 L 974,110 L 974,64 L 990,64 L 990,136 L 974,136 L 946,90 L 946,136 L 930,136 Z" />
  <!-- T -->
  <path d="M 1002,64 L 1050,64 L 1050,78 L 1034,78 L 1034,136 L 1018,136 L 1018,78 L 1002,78 Z" />
`;

// 1. Horizontal Logo (Light variant - charcoal text)
const svgHorizontalLight = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 200" width="1080" height="200" fill="none">
  <g id="profit-point-horizontal-light">
    <!-- Symbol -->
    <g transform="translate(10, 0)">
      ${getMarkSvg(BRAND_BLUE)}
    </g>
    <!-- Wordmark -->
    <g fill="${BRAND_CHARCOAL}">
      ${wordmarkPaths}
    </g>
  </g>
</svg>
`;

// 2. Horizontal Logo (Dark variant - white text)
const svgHorizontalDark = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 200" width="1080" height="200" fill="none">
  <g id="profit-point-horizontal-dark">
    <!-- Symbol -->
    <g transform="translate(10, 0)">
      ${getMarkSvg(BRAND_BLUE)}
    </g>
    <!-- Wordmark -->
    <g fill="${BRAND_WHITE}">
      ${wordmarkPaths}
    </g>
  </g>
</svg>
`;

// 3. Mark only SVG
const svgMark = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200" width="320" height="200" fill="none">
  <g id="profit-point-mark">
    <g transform="translate(0, 0)">
      ${getMarkSvg(BRAND_BLUE)}
    </g>
  </g>
</svg>
`;

// 4. Vertical Logo
const verticalWordmarkPaths = `
  <!-- P -->
  <path d="M 40,240 L 76,240 C 92,240 104,250 104,264 C 104,278 92,288 76,288 L 56,288 L 56,312 L 40,312 Z M 56,254 L 56,274 L 74,274 C 82,274 88,270 88,264 C 88,258 82,254 74,254 Z" />
  <!-- R -->
  <path d="M 116,240 L 152,240 C 166,240 176,249 176,262 C 176,272 168,280 158,283 L 178,312 L 159,312 L 142,286 L 132,286 L 132,312 L 116,312 Z M 132,254 L 132,273 L 150,273 C 156,273 160,269 160,263.5 C 160,258 156,254 150,254 Z" />
  <!-- O -->
  <path d="M 222,240 C 244,240 260,256 260,276 C 260,296 244,312 222,312 C 200,312 184,296 184,276 C 184,256 200,240 222,240 Z M 222,254 C 208,254 200,264 200,276 C 200,288 208,298 222,298 C 236,298 244,288 244,276 C 244,264 236,254 222,254 Z" />
  <!-- F -->
  <path d="M 272,240 L 314,240 L 314,254 L 288,254 L 288,269 L 310,269 L 310,282 L 288,282 L 288,312 L 272,312 Z" />
  <!-- I -->
  <path d="M 326,240 L 342,240 L 342,312 L 326,312 Z" />
  <!-- T -->
  <path d="M 352,240 L 400,240 L 400,254 L 384,254 L 384,312 L 368,312 L 368,254 L 352,254 Z" />
  <!-- P -->
  <path d="M 426,240 L 462,240 C 478,240 490,250 490,264 C 490,278 478,288 462,288 L 442,288 L 442,312 L 426,312 Z M 442,254 L 442,274 L 460,274 C 468,274 474,270 474,264 C 474,258 468,254 460,254 Z" />
  <!-- O -->
  <path d="M 532,240 C 554,240 570,256 570,276 C 570,296 554,312 532,312 C 510,312 494,296 494,276 C 494,256 510,240 532,240 Z M 532,254 C 518,254 510,264 510,276 C 510,288 518,298 532,298 C 546,298 554,288 554,276 C 554,264 546,254 532,254 Z" />
  <!-- I -->
  <path d="M 582,240 L 598,240 L 598,312 L 582,312 Z" />
  <!-- N -->
  <path d="M 610,240 L 626,240 L 654,286 L 654,240 L 670,240 L 670,312 L 654,312 L 626,266 L 626,312 L 610,312 Z" />
  <!-- T -->
  <path d="M 682,240 L 730,240 L 730,254 L 714,254 L 714,312 L 698,312 L 698,254 L 682,254 Z" />
`;

const svgVerticalLight = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 770 340" width="770" height="340" fill="none">
  <g id="profit-point-vertical-light">
    <!-- Symbol centered -->
    <g transform="translate(225, 10)">
      ${getMarkSvg(BRAND_BLUE)}
    </g>
    <!-- Wordmark centered below -->
    <g fill="${BRAND_CHARCOAL}">
      ${verticalWordmarkPaths}
    </g>
  </g>
</svg>
`;

const svgVerticalDark = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 770 340" width="770" height="340" fill="none">
  <g id="profit-point-vertical-dark">
    <!-- Symbol centered -->
    <g transform="translate(225, 10)">
      ${getMarkSvg(BRAND_BLUE)}
    </g>
    <!-- Wordmark centered below -->
    <g fill="${BRAND_WHITE}">
      ${verticalWordmarkPaths}
    </g>
  </g>
</svg>
`;

const dir = path.join(process.cwd(), 'public', 'brand');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'profit-point-logo-horizontal.svg'), svgHorizontalLight.trim());
fs.writeFileSync(path.join(dir, 'profit-point-logo-horizontal-dark.svg'), svgHorizontalDark.trim());
fs.writeFileSync(path.join(dir, 'profit-point-logo-vertical.svg'), svgVerticalLight.trim());
fs.writeFileSync(path.join(dir, 'profit-point-logo-vertical-dark.svg'), svgVerticalDark.trim());
fs.writeFileSync(path.join(dir, 'profit-point-mark.svg'), svgMark.trim());
fs.writeFileSync(path.join(dir, 'favicon.svg'), svgMark.trim());

console.log('SVGs saved to:', dir);

async function generatePngs() {
  const tasks = [
    { svg: svgHorizontalDark, file: 'profit-point-logo.png', width: 1080 },
    { svg: svgHorizontalDark, file: 'profit-point-logo-white.png', width: 1080 },
    { svg: svgHorizontalLight, file: 'profit-point-logo-light.png', width: 1080 },
    { svg: svgHorizontalLight, file: 'profit-point-logo-horizontal.png', width: 1080 },
    { svg: svgVerticalLight, file: 'profit-point-logo-vertical.png', width: 770 },
    { svg: svgVerticalDark, file: 'profit-point-logo-vertical-dark.png', width: 770 },
    { svg: svgMark, file: 'profit-point-mark.png', width: 320 }
  ];

  for (const t of tasks) {
    const buffer = Buffer.from(t.svg);
    const outPath = path.join(dir, t.file);
    await sharp(buffer, { density: 300 })
      .resize(t.width)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(outPath);
    console.log(`Generated PNG: ${t.file}`);
  }
}

generatePngs()
  .then(() => console.log('All brand PNG assets successfully generated.'))
  .catch(err => {
    console.error('Error generating PNGs:', err);
    process.exit(1);
  });
