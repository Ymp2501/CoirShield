// All original artwork: logo, icons, puck cross-section, lifecycle ring, charts.
// Rule: never nest <svg> elements. Icons inside diagrams are <g transform="..."> groups.
import { esc, fmt } from './util.js';

/* ------------------------------------------------------------------ LOGO */
// Shield outline holding three bands (the three zones), with a drop leaving the point.
export const logoInner = `
  <path d="M16 2.5 27 6.6v8.2c0 7-4.6 11.6-11 14.7C9.6 26.4 5 21.8 5 14.8V6.6Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  <path d="M9.2 9.6h13.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity=".55"/>
  <path d="M9.2 14h13.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>
  <path d="M10.8 18.4h10.4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M16 21.2c1.5 1.7 2.2 2.8 2.2 3.8a2.2 2.2 0 0 1-4.4 0c0-1 .7-2.1 2.2-3.8Z" fill="currentColor"/>`;

export const logoMark = (size = 30) =>
  `<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">${logoInner}</svg>`;

/* ----------------------------------------------------------------- ICONS */
const I = {
  factory: '<path d="M3 21V10l6 4v-4l6 4V5h6v16Z"/><path d="M7 17h2M12 17h2M17 17h2"/>',
  shop: '<path d="M4 10v10h16V10"/><path d="m3 10 2-6h14l2 6Z"/><path d="M9 20v-6h6v6"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/>',
  return: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
  truck: '<path d="M2 6h11v10H2Z"/><path d="M13 9h5l3 4v3h-8"/><circle cx="6.5" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
  flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4 0 2 1 3 2 3 0-3-1-5 1-9Z"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M9 8.5h6M9 11.5h6M10.5 8.5c3.5 0 3.5 6 0 6H9l4 3.5"/>',
  leaf: '<path d="M5 19c0-9 5-14 15-14 0 10-5 15-14 15"/><path d="M5 19c3-5 6-8 10-10"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  flask: '<path d="M9 3h6"/><path d="M10 3v6L5 18.5A1.7 1.7 0 0 0 6.5 21h11a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7.5 15h9"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/><path d="M3 3l18 18"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  fit: '<path d="M12 3v9"/><path d="m8 8 4 4 4-4"/><path d="M4 15h16v6H4Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  box: '<path d="m3 8 9-5 9 5v8l-9 5-9-5Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="m12 18 4-6"/><path d="M4 18h16"/>',
  megaphone: '<path d="M3 10v4h3l8 4V6l-8 4Z"/><path d="M17 9a4 4 0 0 1 0 6"/><path d="M7 14v5h3v-3.5"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  alert: '<path d="M12 3 2 20h20Z"/><path d="M12 10v5M12 17.5v.500"/>',
};

export const iconInner = (name) => I[name] || I.drop;

export const icon = (name, cls = '') =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${iconInner(name)}</svg>`;

/* ------------------------------------------------------ PUCK CROSS-SECTION */
function dots(x0, y0, w, h, n, r, seed) {
  // deterministic pseudo-random scatter so the build is reproducible
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280), s / 233280);
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = (x0 + r + rnd() * (w - 2 * r)).toFixed(1);
    const y = (y0 + r + rnd() * (h - 2 * r)).toFixed(1);
    out += `<circle cx="${x}" cy="${y}" r="${(r * (0.6 + rnd() * 0.7)).toFixed(1)}"/>`;
  }
  return out;
}

function fibres(x0, y0, w, h, rows) {
  let out = '';
  for (let i = 0; i < rows; i++) {
    const y = y0 + ((i + 0.5) * h) / rows;
    const a = i % 2 ? 5 : -5;
    out += `<path d="M${x0} ${y.toFixed(1)}q${w / 8} ${a} ${w / 4} 0t${w / 4} 0 ${w / 4} 0 ${w / 4} 0"/>`;
  }
  return out;
}

const chip = (x, y, label, cls) =>
  `<g class="pk-chip ${cls}"><circle cx="${x}" cy="${y}" r="13"/><text x="${x}" y="${y + 4}" text-anchor="middle">${label}</text></g>`;

/**
 * The model. zones = content zones array, t = pages.how.svg text.
 * Portrait layout so labels stay readable on a 360px phone.
 */
export function puckSvg(zones, t, { id = 'puck', compact = false } = {}) {
  const X = 50, W = 260;
  const Z = [
    { y: 92, h: 84 },
    { y: 180, h: 132 },
    { y: 316, h: 112 },
  ];
  const stops = [t.stops.zone0, t.stops.zone1, t.stops.zone2];
  const chips = ['Fe', 'As', 'Pb'];
  const zoneG = Z.map((z, i) => {
    const fill =
      i === 0
        ? `<g class="pk-tex pk-tex-0">${dots(X, z.y, W, z.h, 46, 3.2, 7)}</g>`
        : i === 1
          ? `<g class="pk-tex pk-tex-1">${dots(X, z.y, W, z.h, 90, 3.6, 21)}</g>`
          : `<g class="pk-tex pk-tex-2">${fibres(X + 6, z.y + 4, W - 12, z.h - 8, 9)}</g>`;
    return `
    <g class="pk-zone pk-zone-${i}">
      <rect x="${X}" y="${z.y}" width="${W}" height="${z.h}" class="pk-zone-bg"/>
      ${fill}
      <rect x="${X + 10}" y="${z.y + 10}" width="${compact ? 96 : 116}" height="${compact ? 26 : 44}" rx="8" class="pk-label-bg"/>
      <text x="${X + 20}" y="${z.y + 28}" class="pk-zone-id">${esc(zones[i].label.toUpperCase())}</text>
      ${compact ? '' : `<text x="${X + 20}" y="${z.y + 45}" class="pk-zone-name">${esc(zones[i].short)}</text>`}
      ${chip(X + W - 30, z.y + z.h - 26, chips[i], `pk-chip-${i}`)}
      ${compact ? '' : `<text x="${X + W - 14}" y="${z.y + z.h - 48}" text-anchor="end" class="pk-stop">${esc(stops[i])}</text>`}
    </g>`;
  }).join('');

  return `
<svg class="puck-svg" viewBox="0 0 360 540" role="img" aria-labelledby="${id}-title" preserveAspectRatio="xMidYMid meet">
  <title id="${id}-title">${esc(t.alt)}</title>
  <defs>
    <clipPath id="${id}-clip"><rect x="${X}" y="84" width="${W}" height="352" rx="26"/></clipPath>
    <marker id="${id}-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 9 5 1 9Z" class="pk-arrowhead"/></marker>
  </defs>

  <text x="180" y="22" text-anchor="middle" class="pk-io">${esc(t.inlet)}</text>
  ${chip(134, 50, 'Fe', 'pk-chip-0')}${chip(180, 50, 'As', 'pk-chip-1')}${chip(226, 50, 'Pb', 'pk-chip-2')}

  <g clip-path="url(#${id}-clip)">${zoneG}</g>
  <rect x="${X}" y="84" width="${W}" height="352" rx="26" class="pk-shell"/>
  <path d="M${X} 178h${W}M${X} 314h${W}" class="pk-divider"/>

  <path d="M180 70V448" class="pk-flow" marker-end="url(#${id}-arrow)"/>
  <g class="pk-drops" aria-hidden="true">
    <circle cx="180" cy="80" r="4" class="pk-drop d1"/>
    <circle cx="180" cy="80" r="4" class="pk-drop d2"/>
    <circle cx="180" cy="80" r="4" class="pk-drop d3"/>
  </g>

  <path d="M180 462c9 10.5 13 17 13 23a13 13 0 0 1-26 0c0-6 4-12.5 13-23Z" class="pk-outdrop"/>
  <text x="180" y="528" text-anchor="middle" class="pk-io">${esc(t.outlet)}</text>
</svg>`;
}

/* --------------------------------------------------------- LIFECYCLE RING */
export function lifecycleSvg(lc) {
  const C = 200, R = 132, n = lc.steps.length;
  let nodes = '', heads = '';
  lc.steps.forEach((s, i) => {
    const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
    const x = C + R * Math.cos(a), y = C + R * Math.sin(a);
    nodes += `
    <g class="lc-node">
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="30"/>
      <g transform="translate(${(x - 13).toFixed(1)} ${(y - 13).toFixed(1)}) scale(1.08)" class="lc-icon">${iconInner(s.icon)}</g>
      <text x="${x.toFixed(1)}" y="${(y + 49).toFixed(1)}" text-anchor="middle">${esc(s.short)}</text>
    </g>`;
    const m = -90 + ((i + 0.5) * 360) / n; // arrowhead halfway to the next node
    const mr = (m * Math.PI) / 180;
    const hx = C + R * Math.cos(mr), hy = C + R * Math.sin(mr);
    heads += `<path d="M-7 -6 7 0 -7 6Z" transform="translate(${hx.toFixed(1)} ${hy.toFixed(1)}) rotate(${(m + 90).toFixed(1)})" class="lc-head"/>`;
  });
  return `
<svg class="lifecycle-svg" viewBox="0 0 400 400" role="img" aria-labelledby="lc-title">
  <title id="lc-title">${esc(lc.alt)}</title>
  <circle cx="${C}" cy="${C}" r="${R}" class="lc-ring"/>
  ${heads}
  ${nodes}
  <text x="${C}" y="${C - 2}" text-anchor="middle" class="lc-centre">${esc(lc.centre[0])}</text>
  <text x="${C}" y="${C + 20}" text-anchor="middle" class="lc-centre">${esc(lc.centre[1])}</text>
</svg>`;
}

/* ----------------------------------------------------------------- CHARTS */
const pct = (v, max) => `${((v / max) * 100).toFixed(2)}%`;
const num = (v) => (Number.isInteger(v) ? v.toFixed(1) : String(v));

/** Horizontal bar: our measurement against a benchmark range. Built from charts.carboxylate. */
export function carboxylateChart(c) {
  const m = c.measured, b = c.benchmark;
  const summary = `${c.title}. ${m.label}: ${m.value} ${c.unit}, validated measurement. ${b.label}: ${num(b.low)} to ${num(b.high)} ${c.unit}, literature benchmark.`;
  return `
<figure class="chart chart-bars" data-status="${c.status}">
  <figcaption class="chart-head"><span class="chart-title">${fmt(c.title)}</span><span class="status status-${c.status}">${fmt(c.statusLabel)}</span></figcaption>
  <div class="bars" role="img" aria-label="${esc(summary)}">
    <div class="bar-row">
      <div class="bar-label">${fmt(m.label)}</div>
      <div class="bar-track"><div class="bar-fill bar-measured" style="width:${pct(m.value, c.axisMax)}"></div></div>
      <div class="bar-value">${fmt(`${m.value} ${c.unit} ${m.tag}`)}</div>
    </div>
    <div class="bar-row">
      <div class="bar-label">${fmt(b.label)}</div>
      <div class="bar-track"><div class="bar-fill bar-range" style="left:${pct(b.low, c.axisMax)};width:${pct(b.high - b.low, c.axisMax)}"></div><div class="bar-ghost" style="width:${pct(b.low, c.axisMax)}"></div></div>
      <div class="bar-value">${fmt(`${num(b.low)}–${num(b.high)} ${c.unit} ${b.tag}`)}</div>
    </div>
  </div>
  <p class="chart-caption">${fmt(c.caption)}</p>
</figure>`;
}

/** Breakthrough curve. Plots charts.breakthrough.points when present; otherwise a clearly labelled pending frame. */
export function breakthroughChart(c) {
  const L = 46, T = 20, W = 290, H = 170; // plot box inside a 360 x 250 viewBox
  const has = c.points.length > 0;
  const xMax = Math.max(c.target.value * 1.25, ...c.points.map((p) => p.litres));
  const yMax = Math.max(c.limit.value * 2, ...c.points.map((p) => p.ugL));
  const px = (v) => L + (v / xMax) * W;
  const py = (v) => T + H - (v / yMax) * H;
  const limY = py(c.limit.value), tgtX = px(c.target.value);
  const line = has
    ? `<polyline class="bt-line" points="${c.points.map((p) => `${px(p.litres).toFixed(1)},${py(p.ugL).toFixed(1)}`).join(' ')}"/>` +
      c.points.map((p) => `<circle class="bt-pt" cx="${px(p.litres).toFixed(1)}" cy="${py(p.ugL).toFixed(1)}" r="3.5"/>`).join('')
    : `<text x="${L + W / 2}" y="${T + H / 2 + 34}" text-anchor="middle" class="bt-pending">${esc(c.pendingLabel)}</text>`;
  const limitLabel = `${c.limit.label} ${c.limit.value} ${c.limit.unit} ${c.limit.tag}`;
  const targetLabel = `${c.target.label} ${c.target.approx ? '~' : ''}${c.target.value} ${c.target.unit} ${c.target.tag}`;
  const summary = `${c.title}. ${limitLabel.replace('●', '(literature benchmark)')}. ${targetLabel.replace('○', '(design target)')}. ${has ? c.preliminaryNote : c.pendingNote}`;
  return `
<figure class="chart chart-bt" data-status="${c.status}">
  <figcaption class="chart-head"><span class="chart-title">${fmt(c.title)}</span><span class="status status-${c.status}">${fmt(c.statusLabel)}</span></figcaption>
  <svg viewBox="0 0 360 250" role="img" aria-label="${esc(summary)}" class="bt-svg">
    <path d="M${L} ${T}V${T + H}H${L + W}" class="bt-axis"/>
    <path d="M${L} ${limY.toFixed(1)}H${L + W}" class="bt-limit"/>
    <text x="${L + 6}" y="${(limY - 7).toFixed(1)}" class="bt-lbl bt-lbl-l">${esc(limitLabel)}</text>
    <path d="M${tgtX.toFixed(1)} ${T}V${T + H}" class="bt-target"/>
    <text x="${(tgtX - 6).toFixed(1)}" y="${T + 12}" text-anchor="end" class="bt-lbl bt-lbl-t">${esc(targetLabel)}</text>
    ${line}
    <text x="${L + W / 2}" y="${T + H + 34}" text-anchor="middle" class="bt-axis-lbl">${esc(c.xLabel)}</text>
    <text transform="translate(16 ${T + H / 2}) rotate(-90)" text-anchor="middle" class="bt-axis-lbl">${esc(c.yLabel)}</text>
  </svg>
  <p class="chart-caption">${fmt(has ? c.preliminaryNote : c.pendingNote)} ${fmt(c.influent)}</p>
</figure>`;
}

/** Cost split bar. Built from charts.cost. */
export function costChart(c) {
  const summary = `${c.title}. ${c.silverLabel}: about ${c.silverShare} percent, design target. ${c.otherLabel}.`;
  return `
<figure class="chart chart-cost" data-status="${c.status}">
  <figcaption class="chart-head"><span class="chart-title">${fmt(c.title)}</span><span class="status status-${c.status}">${fmt(c.statusLabel)}</span></figcaption>
  <p class="cost-total">${fmt(c.total)}</p>
  <div class="split" role="img" aria-label="${esc(summary)}">
    <div class="split-a" style="width:${c.silverShare}%"></div><div class="split-b"></div>
  </div>
  <ul class="split-key">
    <li><span class="key key-a"></span>${fmt(`${c.silverLabel}: ~${c.silverShare}% ${c.silverTag}`)}</li>
    <li><span class="key key-b"></span>${fmt(c.otherLabel)}</li>
  </ul>
  <p class="chart-caption">${fmt(c.caption)}</p>
  <p class="chart-foot">${fmt(c.footnote)}</p>
</figure>`;
}
