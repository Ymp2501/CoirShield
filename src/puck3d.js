// Coir-Shield hero animation: an exploded, lit, rotating puck rendered on a 2D canvas.
// No library. Water percolates through each zone; iron, arsenic and lead are caught
// at the zone designed to stop them. Words and labels live in the HTML (from content.js).

const TAU = Math.PI * 2;

// Zone looks: side-band gradient (dark, lit, dark), rim highlight.
const ZONES = [
  { side: ['#5c3517', '#e0a266', '#6e411d'], band: 'rgba(60,30,8,0.35)', rim: '#ffd3a3' },
  { side: ['#0a0d10', '#4a5561', '#0f1418'], band: 'rgba(0,0,0,0.45)', rim: '#9aa6b3' },
  { side: ['#6f511c', '#efd08e', '#80602a'], band: 'rgba(90,60,15,0.32)', rim: '#fff0c8' },
];
// Contaminant colours: Fe, As, Pb. Contaminant i is captured by zone i.
const METALS = [
  [235, 150, 82],
  [246, 200, 76],
  [150, 186, 255],
];
const WATER = [140, 220, 255];
const TEAL = [79, 195, 161];

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const easeOutBack = (x) => 1 + 2.4 * Math.pow(x - 1, 3) + 1.4 * Math.pow(x - 1, 2);
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const lerp = (a, b, k) => a + (b - a) * k;

/* ------------------------------------------------------------- textures */
function inDisc(r, rnd, max = 0.97) {
  for (;;) {
    const x = rnd() * 2 - 1;
    const y = rnd() * 2 - 1;
    if (x * x + y * y < max * max) return [r + x * r, r + y * r];
  }
}

function finishFace(g, S) {
  const r = S / 2;
  // light from the upper left, darker rim
  let gr = g.createLinearGradient(0, 0, S, S);
  gr.addColorStop(0, 'rgba(255,255,255,0.22)');
  gr.addColorStop(0.45, 'rgba(255,255,255,0)');
  gr.addColorStop(1, 'rgba(0,0,0,0.25)');
  g.fillStyle = gr;
  g.fillRect(0, 0, S, S);
  gr = g.createRadialGradient(r, r, r * 0.55, r, r, r);
  gr.addColorStop(0, 'rgba(0,0,0,0)');
  gr.addColorStop(1, 'rgba(0,0,0,0.42)');
  g.fillStyle = gr;
  g.fillRect(0, 0, S, S);
}

function texture(i, S) {
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  const r = S / 2;
  const rnd = rng(11 + i * 97);
  const u = S / 300; // size unit
  g.save();
  g.beginPath();
  g.arc(r, r, r, 0, TAU);
  g.clip();

  if (i === 0) {
    // Zone 0: granular iron-removal media
    const gr = g.createRadialGradient(r * 0.7, r * 0.6, r * 0.1, r, r, r);
    gr.addColorStop(0, '#f0bd86');
    gr.addColorStop(1, '#a0592a');
    g.fillStyle = gr;
    g.fillRect(0, 0, S, S);
    const pal = ['#c7834a', '#b5703a', '#d99a5c', '#8f5328', '#e8b07a', '#7a4320', '#f2c08f'];
    const n = Math.min(2600, Math.round((S * S) / 110));
    for (let k = 0; k < n; k++) {
      const [x, y] = inDisc(r, rnd);
      const s = (0.7 + rnd() * 1.9) * u;
      g.fillStyle = pal[(rnd() * pal.length) | 0];
      g.beginPath();
      g.arc(x, y, s, 0, TAU);
      g.fill();
      g.fillStyle = 'rgba(255,236,210,0.35)';
      g.beginPath();
      g.arc(x - s * 0.35, y - s * 0.35, s * 0.42, 0, TAU);
      g.fill();
    }
  } else if (i === 1) {
    // Zone 1: porous Fe-Mn biochar
    const gr = g.createRadialGradient(r * 0.7, r * 0.6, r * 0.1, r, r, r);
    gr.addColorStop(0, '#525d69');
    gr.addColorStop(1, '#14191e');
    g.fillStyle = gr;
    g.fillRect(0, 0, S, S);
    const n = Math.min(2400, Math.round((S * S) / 120));
    for (let k = 0; k < n; k++) {
      const [x, y] = inDisc(r, rnd);
      const pick = rnd();
      const s = (0.6 + rnd() * 2.2) * u;
      g.fillStyle = pick < 0.55 ? '#0b0e11' : pick < 0.8 ? '#2b333c' : pick < 0.93 ? '#6b7682' : '#9b5a30';
      g.beginPath();
      g.ellipse(x, y, s * (1 + rnd()), s, rnd() * TAU, 0, TAU);
      g.fill();
    }
    for (let k = 0; k < 70; k++) {
      const [x, y] = inDisc(r, rnd);
      g.fillStyle = 'rgba(255,255,255,0.7)';
      g.beginPath();
      g.arc(x, y, 0.7 * u, 0, TAU);
      g.fill();
    }
  } else {
    // Zone 2: wound coir fibre with silver specks
    const gr = g.createRadialGradient(r * 0.7, r * 0.6, r * 0.1, r, r, r);
    gr.addColorStop(0, '#f1d79e');
    gr.addColorStop(1, '#a8823e');
    g.fillStyle = gr;
    g.fillRect(0, 0, S, S);
    const pal = ['rgba(248,226,170,0.8)', 'rgba(196,155,82,0.75)', 'rgba(150,112,48,0.7)', 'rgba(232,200,134,0.8)'];
    const n = Math.round(S * 2.4);
    g.lineCap = 'round';
    for (let k = 0; k < n; k++) {
      const [x, y] = inDisc(r, rnd);
      const a = Math.atan2(y - r, x - r) + Math.PI / 2 + (rnd() - 0.5) * 0.7;
      const len = (12 + rnd() * 26) * u;
      const bend = (rnd() - 0.5) * len * 0.5;
      g.strokeStyle = pal[(rnd() * pal.length) | 0];
      g.lineWidth = (0.6 + rnd() * 1.1) * u;
      g.beginPath();
      g.moveTo(x - Math.cos(a) * len * 0.5, y - Math.sin(a) * len * 0.5);
      g.quadraticCurveTo(x + Math.cos(a + 1.57) * bend, y + Math.sin(a + 1.57) * bend, x + Math.cos(a) * len * 0.5, y + Math.sin(a) * len * 0.5);
      g.stroke();
    }
    for (let k = 0; k < 90; k++) {
      const [x, y] = inDisc(r, rnd);
      const s = (0.8 + rnd() * 1.2) * u;
      const gl = g.createRadialGradient(x, y, 0, x, y, s * 4);
      gl.addColorStop(0, 'rgba(255,255,255,0.95)');
      gl.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gl;
      g.fillRect(x - s * 4, y - s * 4, s * 8, s * 8);
    }
  }
  finishFace(g, S);
  g.restore();
  return c;
}

/* ---------------------------------------------------------------- scene */
export function initPuck3d(stage) {
  const canvas = stage.querySelector('canvas');
  const ctx = canvas && canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;
  stage.classList.add('p3-live');

  const fig = stage.closest('figure') || stage;
  const labels = [...stage.querySelectorAll('[data-zi]')];
  const ioIn = stage.querySelector('.p3-in');
  const ioOut = stage.querySelector('.p3-out');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const rnd = Math.random;

  let W = 0, H = 0, dpr = 1, R = 0, T = 0, GAP = 0, cx = 0, cy = 0, narrow = false;
  let tex = [];
  let t = 0, last = 0, running = false, visible = true, started = false;
  const angle = [0.4, 1.9, 3.1];
  const lift = [0, 0, 0];
  const dim = [1, 1, 1];
  let mx = 0, my = 0, tmx = 0, tmy = 0;
  let parts = [];
  const dots = [[], [], []];
  const flashes = [];
  const ripples = [];
  const motes = [];
  const spawnAcc = [0, 0, 0, 0];
  const sprites = new Map();

  function sprite(rgb) {
    const key = rgb.join();
    let s = sprites.get(key);
    if (!s) {
      s = document.createElement('canvas');
      s.width = s.height = 64;
      const g = s.getContext('2d');
      const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, `rgba(${rgb},1)`);
      gr.addColorStop(0.22, `rgba(${rgb},0.55)`);
      gr.addColorStop(0.55, `rgba(${rgb},0.14)`);
      gr.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = gr;
      g.fillRect(0, 0, 64, 64);
      sprites.set(key, s);
    }
    return s;
  }
  const glow = (x, y, size, rgb, a) => {
    if (a <= 0.01) return;
    ctx.globalAlpha = Math.min(1, a);
    ctx.drawImage(sprite(rgb), x - size / 2, y - size / 2, size, size);
  };

  /* --------------------------------------------------------- layout */
  function resize() {
    const box = stage.getBoundingClientRect();
    W = box.width;
    H = box.height;
    if (!W || !H) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    narrow = W < 440;
    stage.classList.toggle('p3-narrow', narrow);
    // labelled layout needs ~254px to the right of the disc for the label card
    R = narrow ? Math.min(W * 0.34, H * 0.19) : Math.min((W - 290) / 2, H * 0.205, 175);
    T = R * 0.3;
    GAP = R * 0.62;
    cx = narrow ? W / 2 : Math.max(R + 22, Math.min(W / 2 - 60, W - R - 256));
    // keep the 'water in' label on the stage
    cy = Math.max(H * 0.47, R * 1.45 + 20 + (3 * T + 2 * GAP) / 2);
    const S = Math.round(R * 2 * dpr);
    tex = [0, 1, 2].map((i) => texture(i, S));
    motes.length = 0;
    for (let k = 0; k < 38; k++) motes.push({ x: rnd() * W, y: rnd() * H, v: 5 + rnd() * 12, p: rnd() * TAU, s: 3 + rnd() * 6 });
    if (reduce) {
      seedStatic();
      frame(0);
    }
  }

  function geometry(e) {
    const total = 3 * T + 2 * GAP * e;
    const top = cy - total / 2;
    const yTop = [0, 1, 2].map((i) => top + i * (T + GAP * e) - lift[i]);
    return { yTop, inletY: top - R * 0.95, poolY: top + total + R * 0.62 };
  }

  /* ------------------------------------------------------ particles */
  function spawn(type, G, k) {
    parts.push({
      type,
      px: (rnd() - 0.5) * R * (type < 0 ? 0.22 : 0.3),
      z: (rnd() - 0.5) * R * 0.22,
      y: G.inletY - rnd() * R * 0.25,
      vy: R * (type < 0 ? 1.1 : 0.8) * (0.85 + rnd() * 0.3),
      seg: -1,
      hold: 0,
      k,
    });
  }

  function capture(n, p) {
    const rr = Math.hypot(p.px, p.z) / R;
    dots[n].push({ rr: Math.min(0.92, rr), th: Math.atan2(p.z, p.px) - angle[n], born: t });
    if (dots[n].length > 70) dots[n].shift();
    flashes.push({ n, px: p.px, z: p.z, born: t });
  }

  function seedStatic() {
    t = 4;
    for (let n = 0; n < 3; n++) {
      dots[n].length = 0;
      for (let k = 0; k < 26; k++) {
        const a = rnd() * TAU, rr = Math.sqrt(rnd()) * 0.85;
        dots[n].push({ rr, th: a, born: t - 1 - rnd() * 6 });
      }
    }
  }

  function update(dt, G, k) {
    // spawn after the intro
    if (t > 2.1) {
      const rates = [22, 1.1, 1.1, 1.1];
      for (let s = 0; s < 4; s++) {
        spawnAcc[s] += dt * rates[s];
        while (spawnAcc[s] >= 1 && parts.length < 190) {
          spawnAcc[s] -= 1;
          spawn(s - 1, G, k);
        }
      }
    }
    for (const p of parts) {
      if (p.hold > 0) {
        p.hold -= dt;
        if (p.hold <= 0) {
          const i = p.seg;
          let a, rr;
          do {
            a = rnd() * TAU;
            rr = Math.sqrt(rnd()) * 0.72;
          } while (false);
          p.px = Math.cos(a) * rr * R;
          p.z = Math.sin(a) * rr * R;
          p.y = G.yTop[i] + T + p.z * k;
          p.vy = R * 0.15;
        }
        continue;
      }
      p.vy = Math.min(p.vy + R * 3.4 * dt, R * 2.6);
      p.y += p.vy * dt;
      const n = p.seg + 1;
      if (n <= 2) {
        const hit = G.yTop[n] + p.z * k;
        if (p.y >= hit) {
          if (p.type === n) {
            capture(n, p);
            p.dead = true;
          } else {
            p.seg = n;
            p.hold = 0.22 + rnd() * 0.45;
          }
        }
      } else if (p.y >= G.poolY + p.z * 0.25) {
        ripples.push({ px: p.px * 0.6, born: t });
        if (ripples.length > 30) ripples.shift();
        p.dead = true;
      }
    }
    parts = parts.filter((p) => !p.dead);
    while (flashes.length && t - flashes[0].born > 0.9) flashes.shift();
    while (ripples.length && t - ripples[0].born > 1.1) ripples.shift();
  }

  /* --------------------------------------------------------- drawing */
  // A soft vertical shaft of light: nested strips, brightest in the middle.
  function beam(x, y1, y2, w, a, fadeTop) {
    if (a <= 0.01 || y2 <= y1) return;
    ctx.globalCompositeOperation = 'lighter';
    for (const [fw, fa] of [[1, 0.18], [0.62, 0.28], [0.34, 0.42], [0.12, 0.8]]) {
      const gr = ctx.createLinearGradient(0, y1, 0, y2);
      gr.addColorStop(0, `rgba(${WATER},${fadeTop ? 0 : fa * a})`);
      gr.addColorStop(fadeTop ? 0.55 : 0.4, `rgba(${WATER},${fa * a})`);
      gr.addColorStop(1, `rgba(${WATER},${fadeTop ? fa * a : 0})`);
      ctx.fillStyle = gr;
      ctx.globalAlpha = 1;
      const bw = w * fw;
      ctx.fillRect(x - bw / 2, y1, bw, y2 - y1);
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  function ellipse(x, y, rx, ry) {
    ctx.beginPath();
    ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), 0, 0, TAU);
  }

  function drawDisc(i, x, y, k, alpha, focus) {
    if (alpha <= 0.01) return;
    const Z = ZONES[i];
    const ry = R * k;
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = alpha;

    // side band
    ctx.beginPath();
    ctx.moveTo(x - R, y);
    ctx.lineTo(x - R, y + T);
    ctx.ellipse(x, y + T, R, ry, 0, Math.PI, 0, true);
    ctx.lineTo(x + R, y);
    ctx.ellipse(x, y, R, ry, 0, 0, Math.PI, false);
    ctx.closePath();
    const sg = ctx.createLinearGradient(x - R, 0, x + R, 0);
    sg.addColorStop(0, Z.side[0]);
    sg.addColorStop(0.3, Z.side[1]);
    sg.addColorStop(0.55, Z.side[1]);
    sg.addColorStop(1, Z.side[2]);
    ctx.fillStyle = sg;
    ctx.fill();
    ctx.save();
    ctx.clip();
    // compressed-media striations
    ctx.lineWidth = 1;
    for (let s = 1; s < 7; s++) {
      ctx.strokeStyle = s % 2 ? Z.band : 'rgba(255,255,255,0.08)';
      ctx.beginPath();
      ctx.ellipse(x, y + (T * s) / 7, R, ry, 0, 0, Math.PI);
      ctx.stroke();
    }
    // seams that turn with the disc
    for (let m = 0; m < 8; m++) {
      const phi = (m * TAU) / 8 + angle[i];
      const s = Math.sin(phi);
      if (s <= 0) continue;
      const px = x + R * Math.cos(phi);
      ctx.strokeStyle = `rgba(0,0,0,${0.25 * s})`;
      ctx.beginPath();
      ctx.moveTo(px, y + ry * s);
      ctx.lineTo(px, y + ry * s + T);
      ctx.stroke();
    }
    // specular sheen on the lit side
    const sh = ctx.createLinearGradient(x - R, 0, x - R * 0.2, 0);
    sh.addColorStop(0, 'rgba(255,255,255,0)');
    sh.addColorStop(0.55, 'rgba(255,255,255,0.18)');
    sh.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = sh;
    ctx.fillRect(x - R, y - ry, R, T + ry * 2);
    ctx.restore();

    // top face, rotating
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, k);
    ctx.rotate(angle[i]);
    ctx.drawImage(tex[i], -R, -R, R * 2, R * 2);
    ctx.restore();

    // a slow band of light sweeping across the face
    const ph = ((t * 0.16 + i * 0.22) % 1.4) - 0.2;
    if (ph > -0.2 && ph < 1.2) {
      ctx.save();
      ellipse(x, y, R, ry);
      ctx.clip();
      ctx.globalCompositeOperation = 'lighter';
      const sx = x - R * 1.4 + ph * R * 2.8;
      const sw = ctx.createLinearGradient(sx - R * 0.35, y - ry, sx + R * 0.35, y + ry);
      sw.addColorStop(0, 'rgba(255,255,255,0)');
      sw.addColorStop(0.5, 'rgba(255,248,230,0.22)');
      sw.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = sw;
      ctx.globalAlpha = alpha;
      ctx.fillRect(x - R, y - ry, R * 2, ry * 2);
      ctx.restore();
    }

    // rim
    ellipse(x, y, R, ry);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = Z.rim;
    ctx.globalAlpha = alpha * 0.85;
    ctx.stroke();
    ellipse(x, y + T, R, ry);
    ctx.globalAlpha = alpha * 0.25;
    ctx.strokeStyle = 'rgba(0,0,0,0.9)';
    ctx.stroke();

    // focus glow
    if (focus > 0.01) {
      ctx.globalCompositeOperation = 'lighter';
      for (const [w, a] of [[16, 0.07], [8, 0.16], [3, 0.6]]) {
        ellipse(x, y, R + 2, ry + 1);
        ctx.lineWidth = w;
        ctx.strokeStyle = `rgba(${TEAL},${a * focus})`;
        ctx.globalAlpha = 1;
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    // captured metal, embedded in the face and turning with it
    ctx.globalCompositeOperation = 'lighter';
    const rgb = METALS[i];
    for (const d of dots[i]) {
      const age = t - d.born;
      const a = age < 0.35 ? 1 : Math.max(0.38, 1 - (age - 0.35) / 7);
      const th = d.th + angle[i];
      const px = x + d.rr * R * Math.cos(th);
      const py = y + d.rr * R * k * Math.sin(th);
      const size = R * (0.09 + 0.22 * Math.max(0, 1 - age * 1.6));
      glow(px, py, size, rgb, a * alpha);
    }
    // capture flashes: a ring on the disc plane
    for (const f of flashes) {
      if (f.n !== i) continue;
      const age = t - f.born;
      const fx = x + f.px, fy = y + f.z * k;
      const rad = R * (0.04 + age * 0.55);
      ellipse(fx, fy, rad, rad * k);
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(${rgb},${Math.max(0, 1 - age / 0.9) * 0.9})`;
      ctx.globalAlpha = alpha;
      ctx.stroke();
      if (age < 0.3) glow(fx, fy, R * 0.55 * (1 - age / 0.3) + R * 0.1, rgb, (1 - age / 0.3) * alpha);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }

  function drawParticles(seg, G, k, par) {
    const x0 = cx + par;
    // water as short streaks, batched
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    ctx.lineWidth = 1.7;
    ctx.strokeStyle = `rgba(${WATER},0.85)`;
    ctx.globalAlpha = 1;
    ctx.beginPath();
    for (const p of parts) {
      if (p.seg !== seg || p.hold > 0 || p.type >= 0) continue;
      const len = Math.min(16, 3 + p.vy * 0.035);
      const x = x0 + p.px;
      ctx.moveTo(x, p.y - len);
      ctx.lineTo(x, p.y);
    }
    ctx.stroke();
    for (const p of parts) {
      if (p.seg !== seg || p.hold > 0 || p.type >= 0) continue;
      glow(x0 + p.px, p.y, 7, WATER, 0.35);
    }
    // metals as glowing orbs
    for (const p of parts) {
      if (p.seg !== seg || p.hold > 0 || p.type < 0) continue;
      const x = x0 + p.px;
      glow(x, p.y, R * 0.24, METALS[p.type], 0.85);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgb(${METALS[p.type]})`;
      ctx.beginPath();
      ctx.arc(x, p.y, Math.max(3, R * 0.028), 0, TAU);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.beginPath();
      ctx.arc(x - 1, p.y - 1, Math.max(1.1, R * 0.01), 0, TAU);
      ctx.fill();
      ctx.globalCompositeOperation = 'lighter';
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }

  function drawMesh(y, k, x, a) {
    if (a <= 0.01) return;
    ctx.globalCompositeOperation = 'lighter';
    ellipse(x, y, R * 0.94, R * 0.94 * k);
    ctx.globalAlpha = a * 0.12;
    ctx.fillStyle = `rgb(${TEAL})`;
    ctx.fill();
    ctx.globalAlpha = a * 0.7;
    ctx.setLineDash([2, 6]);
    ctx.lineDashOffset = -t * 14;
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = `rgb(${TEAL})`;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }

  function frame(dt) {
    // ---- timeline
    const intro = reduce ? 10 : t;
    const drop = [0, 1, 2].map((i) => clamp01((intro - (2 - i) * 0.16) / 0.7));
    const ex = clamp01((intro - 1.25) / 1.05);
    let e = intro < 1.25 ? 0 : easeOutBack(ex);
    if (intro > 2.3) e = 1 + 0.035 * Math.sin((intro - 2.3) * 0.9);

    // ---- pointer and focus
    if (!finePointer && !reduce) {
      tmx = 0.22 * Math.sin(t * 0.35);
      tmy = 0.1 * Math.sin(t * 0.27);
    }
    const ease = Math.min(1, dt * 4);
    mx = lerp(mx, tmx, ease || 1);
    my = lerp(my, tmy, ease || 1);
    const k = 0.35 - my * 0.11;
    const focus = fig.dataset.focus != null ? +fig.dataset.focus : -1;
    for (let i = 0; i < 3; i++) {
      lift[i] = lerp(lift[i], focus === i ? R * 0.14 : 0, ease || 1);
      dim[i] = lerp(dim[i], focus >= 0 && focus !== i ? 0.42 : 1, ease || 1);
      const spin = (0.2 + i * 0.05) * (i % 2 ? -1 : 1);
      angle[i] += dt * spin * (intro < 1.4 ? 1 + (1.4 - intro) * 4 : 1);
    }
    const par = [0, 1, 2].map((i) => mx * (26 - i * 10));
    const G = geometry(e);
    const dropY = drop.map((d) => -(1 - easeOutCubic(d)) * H * 0.55);

    if (dt > 0) update(dt, G, k);

    // ---- background
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    const midY = (G.yTop[0] + G.yTop[2]) / 2;
    glow(cx + par[1], midY, R * 4.6, TEAL, 0.2 * clamp01(intro));
    for (const m of motes) {
      if (dt) {
        m.y -= m.v * dt;
        if (m.y < -10) {
          m.y = H + 10;
          m.x = rnd() * W;
        }
      }
      glow(m.x, m.y, m.s * 2.2, TEAL, 0.25 + 0.2 * Math.sin(t * 1.3 + m.p));
    }

    // ---- outlet pool
    const showFlow = clamp01((intro - 2.0) / 0.8);
    const poolX = cx + par[2];
    glow(poolX, G.poolY, R * 2.6, WATER, 0.28 * showFlow);
    ellipse(poolX, G.poolY, R * 0.7, R * 0.7 * k * 0.6);
    ctx.globalAlpha = 0.5 * showFlow;
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = `rgba(${WATER},0.8)`;
    ctx.stroke();
    for (const rp of ripples) {
      const age = t - rp.born;
      const rad = R * (0.06 + age * 0.55);
      ellipse(poolX + rp.px, G.poolY, rad, rad * k * 0.6);
      ctx.globalAlpha = Math.max(0, 1 - age / 1.1) * 0.8;
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgb(${WATER})`;
      ctx.stroke();
    }
    // stream from the bottom face to the pool
    const sy = G.yTop[2] + T + R * k;
    ctx.globalCompositeOperation = 'source-over';
    beam(poolX, sy, G.poolY, R * 0.9, 0.3 * showFlow, true);

    // ---- stack, painted back to front
    drawParticles(2, G, k, par[2]);
    drawDisc(2, cx + par[2], G.yTop[2] + dropY[2], k, easeOutCubic(drop[2]) * dim[2], focus === 2 ? 1 : 0);
    drawMesh((G.yTop[1] + T + G.yTop[2]) / 2, k, cx + (par[1] + par[2]) / 2, clamp01(e) * clamp01((intro - 1.3) / 0.6));
    drawParticles(1, G, k, par[1]);
    drawDisc(1, cx + par[1], G.yTop[1] + dropY[1], k, easeOutCubic(drop[1]) * dim[1], focus === 1 ? 1 : 0);
    drawMesh((G.yTop[0] + T + G.yTop[1]) / 2, k, cx + (par[0] + par[1]) / 2, clamp01(e) * clamp01((intro - 1.3) / 0.6));
    drawParticles(0, G, k, par[0]);
    drawDisc(0, cx + par[0], G.yTop[0] + dropY[0], k, easeOutCubic(drop[0]) * dim[0], focus === 0 ? 1 : 0);

    // ---- inlet: a soft pour onto the top face
    beam(cx + par[0], G.inletY - R * 0.5, G.yTop[0], R * 0.34, 0.55 * showFlow, true);
    ctx.globalCompositeOperation = 'lighter';
    glow(cx + par[0], G.yTop[0], R * 0.9, WATER, 0.35 * showFlow);
    ctx.globalCompositeOperation = 'source-over';
    drawParticles(-1, G, k, par[0]);

    // ---- intro burst as the puck splits
    const b = intro - 1.25;
    if (b > 0 && b < 1) {
      ctx.globalCompositeOperation = 'lighter';
      const rad = R * (1.05 + b * 1.5);
      ellipse(cx, midY, rad, rad * k);
      ctx.globalAlpha = (1 - b) * 0.7;
      ctx.lineWidth = 3;
      ctx.strokeStyle = `rgb(${TEAL})`;
      ctx.stroke();
      glow(cx, midY, R * 3.2, TEAL, (1 - b) * 0.5);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }

    // ---- HTML labels follow the discs
    const labelA = clamp01((intro - 2.0) / 0.6);
    labels.forEach((el, i) => {
      const x = cx + par[i] + R + 14;
      const y = G.yTop[i] + T * 0.5 + dropY[i];
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      el.style.opacity = (labelA * (focus >= 0 && focus !== i ? 0.4 : 1)).toFixed(2);
      el.classList.toggle('on', focus === i);
    });
    if (ioIn) {
      ioIn.style.transform = `translate(${(cx + par[0]).toFixed(1)}px, ${(G.inletY - R * 0.45).toFixed(1)}px)`;
      ioIn.style.opacity = showFlow.toFixed(2);
    }
    if (ioOut) {
      ioOut.style.transform = `translate(${poolX.toFixed(1)}px, ${(G.poolY + R * 0.38).toFixed(1)}px)`;
      ioOut.style.opacity = showFlow.toFixed(2);
    }
  }

  /* --------------------------------------------------------- loop */
  function loop(now) {
    if (!running) return;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    t += dt;
    frame(dt);
    requestAnimationFrame(loop);
  }
  function play() {
    if (running || reduce || !visible || document.hidden || !started) return;
    running = true;
    last = 0;
    requestAnimationFrame(loop);
  }
  const pause = () => {
    running = false;
  };

  // pointer tilt and parallax
  if (finePointer && !reduce) {
    const area = stage.closest('.hero') || stage;
    area.addEventListener('pointermove', (ev) => {
      const r = stage.getBoundingClientRect();
      tmx = Math.max(-0.6, Math.min(0.6, (ev.clientX - (r.left + r.width / 2)) / r.width));
      tmy = Math.max(-0.6, Math.min(0.6, (ev.clientY - (r.top + r.height / 2)) / r.height));
    });
    area.addEventListener('pointerleave', () => {
      tmx = 0;
      tmy = 0;
    });
  }

  // repaint a still frame when the focus changes under reduced motion
  if (reduce) new MutationObserver(() => frame(0)).observe(fig, { attributes: true, attributeFilter: ['data-focus'] });

  let rt;
  new ResizeObserver(() => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      resize();
      if (!running && !reduce && started) frame(0);
    }, 60);
  }).observe(stage);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((en) => {
      visible = en[0].isIntersecting;
      visible ? play() : pause();
    }).observe(stage);
  }
  document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));

  // build textures when the browser is idle, so first paint stays fast
  const start = () => {
    resize();
    started = true;
    if (reduce) frame(0);
    else play();
  };
  const idle = window.requestIdleCallback || ((f) => setTimeout(f, 120));
  if (document.readyState === 'complete') idle(start, { timeout: 600 });
  else window.addEventListener('load', () => idle(start, { timeout: 600 }), { once: true });
}
