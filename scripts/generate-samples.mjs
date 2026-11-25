// Generates the black-and-white sample furniture illustrations in public/samples.
// Run with: pnpm samples
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/samples')
mkdirSync(out, { recursive: true })

const light = { bg: '#ececec', floor: '#d9d9d9', body: '#ffffff', face: '#f7f7f7', dark: '#111111', line: '#111111', mid: '#bdbdbd' }
const dark = { bg: '#0a0a0a', floor: '#161616', body: '#1d1d1d', face: '#262626', dark: '#ffffff', line: '#ffffff', mid: '#5a5a5a' }

const r = (x, y, w, h, fill, p, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${p.line}" stroke-width="4" ${extra}/>`
const handle = (x, y, w, h, p) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w, h) / 2}" fill="${p.dark}"/>`

function kitchen(p, modules = 3) {
  const w = 800 / modules
  let s = ''
  for (let i = 0; i < modules; i++) {
    const x = 100 + i * w
    s += r(x, 250, w, 230, p.face, p) + handle(x + w - 28, 400, 8, 60, p)
    s += r(x, 650, w, 360, p.body, p)
    if (i % 2 === 0) {
      s += r(x + 8, 664, w - 16, 100, p.face, p) + handle(x + w / 2 - 30, 700, 60, 8, p)
      s += r(x + 8, 776, w - 16, 220, p.face, p) + handle(x + w / 2 - 30, 800, 60, 8, p)
    } else {
      s += r(x + 8, 664, w - 16, 332, p.face, p) + handle(x + w - 36, 700, 8, 80, p)
    }
  }
  s += r(88, 630, 824, 24, p.dark, p)
  s += `<rect x="88" y="1010" width="824" height="16" fill="${p.mid}"/>`
  return s
}

function bed(p, storage = false) {
  let s = r(170, 360, 660, 300, p.body, p)
  for (let i = 0; i < 3; i++) s += r(200 + i * 210, 390, 200, 240, p.face, p)
  s += `<rect x="215" y="610" width="250" height="60" rx="26" fill="${p.face}" stroke="${p.line}" stroke-width="4"/>`
  s += `<rect x="535" y="610" width="250" height="60" rx="26" fill="${p.face}" stroke="${p.line}" stroke-width="4"/>`
  s += r(190, 670, 620, 110, p.body, p)
  if (storage) {
    s += r(170, 780, 660, 190, p.face, p) + r(184, 794, 310, 162, p.body, p) + r(506, 794, 310, 162, p.body, p)
    s += handle(310, 868, 60, 8, p) + handle(630, 868, 60, 8, p)
  } else {
    s += r(170, 780, 660, 50, p.face, p)
    s += r(190, 830, 36, 130, p.dark, p) + r(774, 830, 36, 130, p.dark, p)
  }
  s += `<rect x="120" y="975" width="760" height="14" fill="${p.mid}"/>`
  return s
}

function tv(p, floating = false) {
  let s = r(240, 330, 520, 300, p.dark, p)
  s += `<rect x="262" y="350" width="476" height="260" fill="${p.bg === '#0a0a0a' ? '#2b2b2b' : '#2b2b2b'}"/>`
  s += `<path d="M262 560 L420 440 L520 520 L600 460 L738 570" fill="none" stroke="#8a8a8a" stroke-width="4"/>`
  if (floating) s += r(300, 640, 400, 14, p.dark, p)
  const y = floating ? 700 : 740
  s += r(110, y, 780, 130, p.body, p)
  s += r(124, y + 14, 240, 102, p.face, p) + r(380, y + 14, 240, 102, p.face, p) + r(636, y + 14, 240, 102, p.face, p)
  s += handle(236, y + 56, 8, 30, p) + handle(492, y + 56, 8, 30, p) + handle(748, y + 56, 8, 30, p)
  if (!floating) s += r(150, y + 130, 30, 100, p.dark, p) + r(820, y + 130, 30, 100, p.dark, p)
  s += `<rect x="90" y="${y + 232}" width="820" height="14" fill="${p.mid}"/>`
  return s
}

function wardrobe(p, open = false) {
  let s = r(190, 200, 620, 800, p.body, p)
  if (open) {
    s += r(204, 214, 592, 772, p.face, p)
    s += `<line x1="500" y1="214" x2="500" y2="986" stroke="${p.line}" stroke-width="4"/>`
    s += `<line x1="224" y1="300" x2="480" y2="300" stroke="${p.line}" stroke-width="6"/>`
    for (let i = 0; i < 6; i++) s += `<path d="M${250 + i * 38} 306 L${250 + i * 38} 520 L${270 + i * 38} 520 L${270 + i * 38} 306" fill="${p.mid}" stroke="${p.line}" stroke-width="3"/>`
    for (let i = 0; i < 5; i++) s += r(520, 260 + i * 150, 260, 8, p.dark, p)
    s += r(520, 880, 260, 90, p.body, p) + handle(630, 920, 40, 8, p)
  } else {
    for (let i = 0; i < 3; i++) s += r(204 + i * 197, 214, 197, 772, p.face, p) + handle(204 + i * 197 + (i === 2 ? 22 : 150), 560, 8, 120, p)
  }
  s += `<rect x="150" y="1000" width="700" height="14" fill="${p.mid}"/>`
  return s
}

function shelf(p, boxes = true) {
  let s = r(210, 260, 580, 740, p.body, p)
  const cw = 580 / 3
  const rh = 740 / 4
  for (let row = 0; row < 4; row++) {
    for (let c = 0; c < 3; c++) {
      const x = 210 + c * cw, y = 260 + row * rh
      s += r(x, y, cw, rh, p.body, p)
      if (boxes && (row + c) % 2 === 0) s += r(x + 14, y + 40, cw - 28, rh - 54, p.face, p) + handle(x + cw / 2 - 20, y + 70, 40, 8, p)
      else if (boxes && row === 1) s += r(x + 30, y + 80, 40, rh - 94, p.dark, p) + r(x + 80, y + 50, 36, rh - 64, p.mid, p)
    }
  }
  s += `<rect x="170" y="1010" width="660" height="14" fill="${p.mid}"/>`
  return s
}

const wrap = (p, inner, w = 1000, h = 1250, title = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"><title>${title}</title><rect width="${w}" height="${h}" fill="${p.bg}"/><rect y="${h * 0.82}" width="${w}" height="${h * 0.18}" fill="${p.floor}" opacity="${w > h ? 0 : 0.5}"/>${inner}</svg>`

const items = {
  'kitchen-linea': ['Linea modular kitchen cabinets', (p) => kitchen(p, 3), (p) => kitchen(p, 4)],
  'kitchen-corner': ['Compact kitchen base and wall units', (p) => kitchen(p, 2), (p) => kitchen(p, 3)],
  'bed-frame': ['Platform bed frame', (p) => bed(p, false), (p) => bed(p, false)],
  'bed-storage': ['Storage bed with two drawers', (p) => bed(p, true), (p) => bed(p, true)],
  'tv-float': ['Floating TV rack', (p) => tv(p, true), (p) => tv(p, true)],
  'tv-stand': ['TV rack with legs', (p) => tv(p, false), (p) => tv(p, false)],
  wardrobe: ['Wardrobe with sliding doors', (p) => wardrobe(p, false), (p) => wardrobe(p, true)],
  shelving: ['Grid shelving unit', (p) => shelf(p, true), (p) => shelf(p, false)],
}

for (const [name, [title, a, b]] of Object.entries(items)) {
  writeFileSync(path.join(out, `${name}.svg`), wrap(light, a(light), 1000, 1250, title))
  writeFileSync(path.join(out, `${name}-alt.svg`), wrap(dark, b(dark), 1000, 1250, title + ' (dark finish)'))
}

// Wide hero illustration: wardrobe, bed and TV rack side by side.
const scale = (inner, x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`
const hero =
  scale(wardrobe(dark, true), -50, 140, 0.62) +
  scale(bed(dark, true), 375, 147, 0.62) +
  scale(tv(dark, false), 900, 149, 0.62)
writeFileSync(path.join(out, 'hero.svg'), wrap(dark, hero, 1500, 900, 'Modular wardrobe, bed and TV rack'))

console.log('Sample images written to public/samples')
