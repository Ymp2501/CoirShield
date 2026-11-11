// One render function per page. Layout only: all words and numbers come from content.js.
import { site, pages, zones, lifecycle, charts } from '../content.js';
import { esc, fmt, pageHref } from './util.js';
import { icon, puckSvg, housingSvg, glassesSvg, lifecycleSvg, carboxylateChart, breakthroughChart, unitChart } from './svg.js';
import { disclaimerBox, legend, contactLink } from './layout.js';

const SHOW_V = site.showValidatedResult === true;
const HAS_EMAIL = Boolean(site.contactEmail && site.contactEmail.trim());

/* ------------------------------------------------------------- helpers */
const reveal = (i = 0) => ` data-reveal style="--rd:${i * 80}ms"`;

const head = (h, { level = 2, id = '', center = false } = {}) => `
<div class="section-head${center ? ' center' : ''}">
  ${h.eyebrow ? `<p class="eyebrow">${fmt(h.eyebrow)}</p>` : ''}
  <h${level}${id ? ` id="${id}"` : ''}>${fmt(h.title)}</h${level}>
  ${h.lead ? `<p class="lead">${fmt(h.lead)}</p>` : ''}
</div>`;

const section = (id, inner, cls = '') =>
  `<section class="section ${cls}" aria-labelledby="${id}-h">${inner}</section>`;

const pageHero = (h, extra = '') => `
<section class="page-hero" aria-labelledby="page-h">
  <p class="eyebrow">${fmt(h.eyebrow)}</p>
  <h1 id="page-h">${fmt(h.title)}</h1>
  <p class="lead">${fmt(h.lead)}</p>
  ${extra}
</section>`;

const btn = (b, cls) =>
  `<a class="btn ${cls}" href="${pageHref(b.href)}"><span>${esc(b.label)}</span>${icon('arrow')}</a>`;

const factList = (facts, cls = '') => `
<dl class="facts ${cls}">
  ${facts
    .map(
      (f) =>
        `<div><dt>${fmt(f.label)}</dt><dd>${fmt(f.value)}${f.source ? `<span class="fact-src">${fmt(f.source)}</span>` : ''}${f.note ? `<span class="fact-src">${fmt(f.note)}</span>` : ''}</dd></div>`,
    )
    .join('')}
</dl>`;

const iconCards = (items, cls = '') => `
<ul class="card-grid ${cls}">
  ${items
    .map(
      (it, i) => `<li class="card"${reveal(i)}>
    ${it.icon ? `<span class="card-icon">${icon(it.icon)}</span>` : ''}
    <h3>${fmt(it.title)}</h3>
    <p>${fmt(it.text)}</p>
  </li>`,
    )
    .join('')}
</ul>`;

const table = (t, caption, rows = t.rows) => `
<div class="table-wrap" role="region" aria-label="${esc(caption)}" tabindex="0">
  <table>
    <caption class="sr-only">${esc(caption)}</caption>
    <thead><tr>${t.columns.map((c) => `<th scope="col">${fmt(c)}</th>`).join('')}</tr></thead>
    <tbody>
      ${rows
        .map(
          (r) =>
            `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${fmt(c)}</th>` : `<td data-label="${esc(t.columns[i])}">${fmt(c)}</td>`)).join('')}</tr>`,
        )
        .join('')}
    </tbody>
  </table>
</div>`;

const priceCards = (options) => `
<ul class="price-grid n-${options.length}">
  ${options
    .map(
      (o, i) => `<li class="price-card${o.good ? ' good' : ''}"${reveal(i)}>
    <h3>${fmt(o.title)}</h3>
    <p class="price">${fmt(o.price)}</p>
    <p>${fmt(o.note)}</p>
  </li>`,
    )
    .join('')}
</ul>`;

const zoneCards = (withChem) => `
<ol class="zone-list">
  ${zones
    .map((z, i) => {
      const target = z.target + (SHOW_V && z.validatedTarget ? ` ${z.validatedTarget}` : '');
      const chem = [...z.chemistry, ...(SHOW_V && z.validatedChemistry ? [z.validatedChemistry] : [])];
      return `<li class="zone-card zone-${i}"${reveal(i)}>
    <p class="zone-id">${esc(z.label)}</p>
    <h3>${fmt(z.name)}</h3>
    <p class="zone-plain">${fmt(z.plain)}</p>
    <p class="zone-target">${fmt(target)}</p>
    ${
      withChem
        ? `<details class="chem"><summary>${esc(z.chemistryTitle)}<span class="sr-only">: ${esc(z.label)}</span></summary>${chem.map((p) => `<p>${fmt(p)}</p>`).join('')}</details>`
        : ''
    }
  </li>`;
    })
    .join('')}
</ol>`;

const timeline = (steps) => `
<ol class="timeline">
  ${steps
    .map(
      (s) => `<li>
    <span class="tl-icon">${icon(s.icon)}</span>
    <div><h3>${fmt(s.title)}</h3><p>${fmt(s.text)}</p></div>
  </li>`,
    )
    .join('')}
</ol>`;

const puckFigure = (caption, opts) => `
<figure class="puck-figure">
  ${puckSvg(zones, pages.how.svg, opts)}
  <figcaption>${fmt(caption)}</figcaption>
</figure>`;

/* ----------------------------------------------------------------- HOME */
// 3D exploded puck: stacks of thin discs in CSS 3D space. No library.
function puck3d(h) {
  const slices = (n) => Array.from({ length: n }, (_, k) => `<i style="--k:${k}"></i>`).join('');
  const chips = ['Fe', 'As', 'Pb'];
  const layer = (i) => `
      <div class="p3-layer p3-z${i}" data-layer="${i}">
        ${slices(16)}
        <span class="p3-face" aria-hidden="true"></span>
        <span class="p3-tag"><b>${esc(zones[i].label)}</b> <em>${esc(zones[i].short)}</em> <small>${esc(zones[i].stops)}</small></span>
      </div>`;
  return `
<figure class="puck3d-figure">
  <div class="puck3d" role="img" aria-label="${esc(h.figureAlt)}" data-tilt>
    <div class="p3-scene">
      <div class="p3-shadow"></div>
      <span class="p3-io p3-out">${esc(h.outLabel)}</span>
      ${layer(2)}
      <div class="p3-mesh p3-m2"></div>
      ${layer(1)}
      <div class="p3-mesh p3-m1"></div>
      ${layer(0)}
      <div class="p3-ripple"></div>
      <span class="p3-io p3-in">${esc(h.inLabel)}</span>
      ${chips.map((c, i) => `<span class="p3-chip p3-c${i}">${c}</span>`).join('')}
      <span class="p3-drop d1"></span><span class="p3-drop d2"></span><span class="p3-drop d3"></span>
      <span class="p3-clean"></span>
    </div>
  </div>
  <ul class="p3-legend">
    ${zones.map((z, i) => `<li><button type="button" class="p3-key p3-key-${i}" data-zone="${i}" data-title="${esc(`${z.label} · ${z.name}`)}" data-text="${esc(z.plain)}" aria-pressed="false"><span class="p3-dot"></span>${esc(z.label)} · ${esc(z.short)}</button></li>`).join('')}
  </ul>
  <figcaption class="p3-detail" aria-live="polite"><strong></strong><span>${fmt(h.figureCaption)}</span></figcaption>
</figure>`;
}

function home() {
  const p = pages.home;
  const h1 = p.hero.title
    .map((l) => (l.startsWith('*') ? `<span class="h1-line"><em>${esc(l.slice(1))}</em></span>` : `<span class="h1-line">${esc(l)}</span>`))
    .join(' ');
  const stats = p.snapshot.stats.filter((s) => SHOW_V || !s.validatedOnly);
  const g = p.glasses;
  return `
<div class="hero-band${site.darkHero ? ' theme-dark' : ''}">
<section class="hero" aria-labelledby="page-h">
  <div class="hero-copy">
    ${p.hero.eyebrow ? `<p class="eyebrow">${fmt(p.hero.eyebrow)}</p>` : ''}
    <h1 id="page-h">${h1}</h1>
    <p class="hero-sub">${fmt(p.hero.sub)}</p>
    <p class="hero-tagline">${fmt(site.taglineHi)}</p>
    <div class="actions">${btn(p.hero.primary, 'btn-primary')}${btn(p.hero.secondary, 'btn-outline')}</div>
    <p class="proto-chip">${icon('alert')}<span>${fmt(p.hero.note)}</span></p>
  </div>
  <div class="hero-figure">${puck3d(p.hero)}</div>
</section>
</div>

${section(
  'glasses',
  `<div class="split-grid">
    <figure class="glasses-figure"${reveal()}>
      ${glassesSvg(g)}
      <figcaption>${fmt(g.note)}</figcaption>
    </figure>
    <div${reveal(1)}>
      <p class="eyebrow">${fmt(g.eyebrow)}</p>
      <h2 id="glasses-h">${fmt(g.title)}</h2>
      <p class="lead">${fmt(g.text)}</p>
    </div>
  </div>`,
)}

${section(
  'problem',
  `<h2 id="problem-h" class="sr-only">${fmt(p.problem.title)}</h2>
  <div class="bigstat"${reveal()}>
    <p class="bigstat-value">${fmt(p.problem.big.value)}</p>
    <div>
      <p class="bigstat-text">${fmt(p.problem.big.text)}</p>
      <p class="fact-src">${fmt(p.problem.big.source)}</p>
    </div>
  </div>
  <div class="prose-2">${p.problem.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}</div>
  ${factList(p.problem.facts, 'facts-text facts-row')}`,
  'section-flush',
)}

${section(
  'solution',
  `${head(p.solution, { id: 'solution-h', center: true })}
  <div class="story" data-story>
    <div class="story-figure">${puckFigure(pages.how.model.figureCaption, { id: 'story-puck' })}</div>
    <ol class="story-steps">
      ${zones
        .map((z, i) => {
          const target = z.target + (SHOW_V && z.validatedTarget ? ` ${z.validatedTarget}` : '');
          return `<li class="zone-card zone-${i}" data-step="${i}">
        <p class="zone-id">${esc(z.label)}</p>
        <h3>${fmt(z.name)}</h3>
        <p class="zone-plain">${fmt(z.plain)}</p>
        <p class="zone-target">${fmt(target)}</p>
      </li>`;
        })
        .join('')}
    </ol>
  </div>
  <div class="callout"${reveal()}>
    <h3>${fmt(p.positioning.title)}</h3>
    <p>${fmt(p.positioning.text)}</p>
  </div>
  <p class="center-row">${btn(p.solution.cta, 'btn-outline')}</p>`,
)}

${section(
  'snapshot',
  `<div class="split-grid">
    <div${reveal()}>
      <p class="eyebrow">${fmt(p.snapshot.eyebrow)}</p>
      <h2 id="snapshot-h">${fmt(p.snapshot.title)}</h2>
      <p class="lead">${fmt(p.snapshot.lead)}</p>
      ${legend(false)}
      <p>${btn(p.snapshot.cta, 'btn-primary')}</p>
    </div>
    <div class="dash"${reveal(1)}>
      <div class="dash-top"><span>${fmt(p.snapshot.cardTitle)}</span><span class="status status-preliminary">${fmt(p.snapshot.cardStatus)}</span></div>
      <dl class="dash-stats">
        ${stats.map((s) => `<div><dd>${fmt(s.value)}</dd><dt>${fmt(s.label)}</dt></div>`).join('')}
      </dl>
    </div>
  </div>`,
)}

${section(
  'impact',
  `${head(p.impact, { id: 'impact-h', center: true })}
  ${iconCards(p.impact.items, 'cols-4')}
  <ul class="goal-list">${p.impact.goals.map((x) => `<li>${icon('target')}<span>${fmt(x)}</span></li>`).join('')}</ul>`,
)}

<section class="cta-band" aria-labelledby="cta-h">
  <div class="cta-band-inner">
    <h2 id="cta-h">${fmt(p.cta.title)}</h2>
    <p>${fmt(p.cta.text)}</p>
    <div class="actions">${btn(p.cta.primary, 'btn-light')}${btn(p.cta.secondary, 'btn-ghost-light')}</div>
    <p class="cta-more"><span>${fmt(p.cta.moreLabel)}:</span> ${p.cta.more.map((m) => `<a href="${pageHref(m.href)}">${esc(m.label)}</a>`).join(' ')}</p>
  </div>
</section>`;
}

/* --------------------------------------------------------- HOW IT WORKS */
function how() {
  const p = pages.how;
  const m = p.model;
  const d = p.device;
  return `
${pageHero(p.hero)}

${section(
  'device',
  `${head(d, { id: 'device-h' })}
  <div class="model-grid">
    <div class="model-figure"><figure class="puck-figure housing-figure">${housingSvg(d)}</figure></div>
    <div class="model-detail">
      <h3 class="parts-title">${fmt(d.partsTitle)}</h3>
      <ul class="parts">
        ${d.parts.map((x) => `<li><span class="part-key" aria-hidden="true">${esc(x.key)}</span><div><h4><span class="sr-only">${esc(x.key)}: </span>${fmt(x.name)}</h4><p>${fmt(x.text)}</p></div></li>`).join('')}
      </ul>
      ${factList(d.facts)}
    </div>
  </div>`,
)}

${section(
  'model',
  `<div class="section-head"><h2 id="model-h">${fmt(m.title)}</h2><p class="lead">${fmt(m.order.text)}</p></div>
  <div class="model-grid">
    <div class="model-figure">${puckFigure(m.figureCaption, { id: 'model-puck' })}</div>
    <div class="model-detail">
      ${zoneCards(true)}
      <div class="mini-grid">
        <div class="mini"><h3>${fmt(m.window.title)}</h3><p class="mini-value">${fmt(m.window.value)}</p><p>${fmt(m.window.text)}</p></div>
        <div class="mini"><h3>${fmt(m.capacity.title)}</h3><p class="mini-value">${fmt(m.capacity.value)}</p><p>${fmt(m.capacity.text)}</p></div>
        <div class="mini mini-wide"><h3>${fmt(m.influent.title)}</h3><p>${fmt(m.influent.text)}</p>
          <dl class="spec">${m.influent.rows.map((x) => `<div><dt>${fmt(x.label)}</dt><dd>${fmt(x.value)}</dd></div>`).join('')}</dl>
          <p class="fact-src">${fmt(m.influent.source)}</p></div>
      </div>
    </div>
  </div>`,
)}

${section('monitoring', `${head(p.monitoring, { id: 'monitoring-h' })}${iconCards(p.monitoring.items, 'cols-4')}`)}

${section(
  'lifecycle',
  `${head(p.lifecycle, { id: 'lifecycle-h', center: true })}
  <div class="loop-grid">
    <figure class="loop-figure"${reveal()}>${lifecycleSvg(lifecycle)}</figure>
    ${timeline(lifecycle.steps)}
  </div>`,
)}

${section(
  'scope',
  `${head(p.scope, { id: 'scope-h' })}
  <ul class="scope-list">
    ${p.scope.items.map((s, i) => `<li${reveal(i % 2)}><span class="scope-x" aria-hidden="true">✕</span><div><h3>${fmt(s.name)}</h3><p>${fmt(s.reason)}</p></div></li>`).join('')}
  </ul>`,
  'scope',
)}`;
}

/* -------------------------------------------------------- FOR CUSTOMERS */
function customers() {
  const p = pages.customers;
  return `
${pageHero(p.hero, `<p class="hero-tagline">${fmt(site.nameHi)} · ${fmt(site.taglineHi)}</p>`)}
<div class="section section-tight">
  <aside class="disclaimer" role="note">${icon('alert')}<p>${fmt(p.hero.notice)}</p></aside>
</div>

<div class="section section-tight tabs" data-tabs>
  <div class="tablist" role="tablist" aria-label="${esc(p.tabsLabel)}">
    ${p.tabs.map((t, i) => `<button type="button" role="tab" id="tab-${t.id}" aria-controls="panel-${t.id}" aria-selected="${i === 0}">${esc(t.label)}</button>`).join('')}
  </div>
  ${p.tabs
    .map(
      (t) => `
  <section class="tabpanel" role="tabpanel" id="panel-${t.id}" aria-labelledby="tab-${t.id}" tabindex="0">
    <h2>${fmt(t.title)}</h2>
    <p class="lead">${fmt(t.intro)}</p>
    ${timeline(t.steps)}
    ${t.prices ? `<h3 class="sub-title">${fmt(t.pricesTitle)}</h3><p class="sub-note">${fmt(t.pricesNote)}</p>${priceCards(t.prices)}` : ''}
    ${t.earn ? `<h3 class="sub-title">${fmt(t.earnTitle)}</h3>${priceCards(t.earn)}` : ''}
    <div class="notes">
      <h3>${fmt(t.notesTitle)}</h3>
      <ul>${t.notes.map((n) => `<li>${fmt(n)}</li>`).join('')}</ul>
    </div>
  </section>`,
    )
    .join('')}
</div>

${
  HAS_EMAIL
    ? section(
        'help',
        `<div class="cta-card">
    <h2 id="help-h">${fmt(p.help.title)}</h2>
    <p>${fmt(p.help.text)}</p>
    <p>${contactLink(site.footer.contactLabel)}</p>
  </div>`,
      )
    : ''
}`;
}

/* -------------------------------------------------------------- EVIDENCE */
function evidence() {
  const p = pages.evidence;
  const v = p.validated;
  const planRows = p.plan.rows.map((r) => r.map((c) => (c === '@V1' ? (SHOW_V ? p.plan.v1Done : p.plan.v1Planned) : c)));
  const validatedBlock = SHOW_V
    ? `<div class="split-grid top">
    <div${reveal()}>
      <p class="eyebrow">${fmt(v.eyebrow)}</p>
      <h2 id="validated-h">${fmt(v.title)}</h2>
      ${v.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}
      <h3>${fmt(v.methodTitle)}</h3>
      <ul class="ticks">${v.method.map((x) => `<li>${icon('check')}<span>${fmt(x)}</span></li>`).join('')}</ul>
      <h3>${fmt(v.limitsTitle)}</h3>
      <p>${fmt(v.limits)}</p>
    </div>
    <div${reveal(1)}>${carboxylateChart(charts.carboxylate)}</div>
  </div>`
    : `<div class="callout">
      <p class="eyebrow">${fmt(p.noValidated.eyebrow)}</p>
      <h2 id="validated-h">${fmt(p.noValidated.title)}</h2>
      <p>${fmt(p.noValidated.text)}</p>
    </div>`;
  return `
${pageHero(p.hero)}
<div class="section section-tight">
  ${legend(true)}
  ${disclaimerBox()}
</div>

${section('validated', validatedBlock)}

${section(
  'interval',
  `<div class="split-grid top">
    <div class="eol"${reveal()}>
      <p class="eyebrow">${fmt(p.interval.eyebrow)}</p>
      <h2 id="interval-h">${fmt(p.interval.title)}</h2>
      ${p.interval.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}
    </div>
    <div${reveal(1)}>${breakthroughChart(charts.breakthrough)}</div>
  </div>`,
)}

${section('bench', `${head(p.bench, { id: 'bench-h' })}${iconCards(p.bench.items, 'cols-2')}`)}

${section('plan', `${head(p.plan, { id: 'plan-h' })}${table(p.plan, p.plan.title, planRows)}`)}

${section(
  'regulatory',
  `${head(p.regulatory, { id: 'regulatory-h' })}${table(p.regulatory, p.regulatory.title)}
  <p class="table-note"><strong>${fmt(p.regulatory.framing)}</strong></p>
  <p class="table-note">${fmt(p.regulatory.note)}</p>
  <p class="table-note fact-src">${fmt(p.regulatory.source)}</p>`,
)}`;
}

/* -------------------------------------------------------------- BUSINESS */
function business() {
  const p = pages.business;
  return `
${pageHero(p.hero)}

${section(
  'market',
  `<div class="split-grid top">
    <div${reveal()}>
      <p class="eyebrow">${fmt(p.market.eyebrow)}</p>
      <h2 id="market-h">${fmt(p.market.title)}</h2>
      ${p.market.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}
      <div class="callout research">
        <p class="eyebrow">${fmt(p.research.eyebrow)}</p>
        <h3>${fmt(p.research.title)}</h3>
        ${
          p.research.conversations.length
            ? `<ul class="convos">${p.research.conversations.map((c) => `<li><p class="fact-src">${fmt(c.who)} · ${fmt(c.when)}</p><p>${fmt(c.said)}</p><p><strong>What it changed:</strong> ${fmt(c.learned)}</p></li>`).join('')}</ul>`
            : `<p>${fmt(p.research.empty)}</p>`
        }
      </div>
    </div>
    <div${reveal(1)}>${factList(p.market.facts)}</div>
  </div>`,
)}

${section(
  'gtm',
  `${head(p.gtm, { id: 'gtm-h' })}
  <ol class="flow">
    ${p.gtm.steps.map((s, i) => `<li${reveal(i)}><span class="card-icon">${icon(s.icon)}</span><h3>${fmt(s.title)}</h3><p>${fmt(s.text)}</p></li>`).join('')}
  </ol>`,
)}

${section(
  'pricing',
  `${head(p.pricing, { id: 'pricing-h', center: true })}
  ${priceCards(p.pricing.options)}
  <div class="streams">
    <h3>${fmt(p.pricing.streamsTitle)}</h3>
    <ul class="ticks">${p.pricing.streams.map((x) => `<li>${icon('check')}<span>${fmt(x)}</span></li>`).join('')}</ul>
  </div>`,
)}

${section(
  'unit',
  `<div class="split-grid top">
    <div${reveal()}>
      <p class="eyebrow">${fmt(p.unit.eyebrow)}</p>
      <h2 id="unit-h">${fmt(p.unit.title)}</h2>
      ${p.unit.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}
      ${factList(p.unit.facts)}
    </div>
    <div${reveal(1)}>${unitChart(charts.unit)}</div>
  </div>`,
)}

${section(
  'eol',
  `<div class="eol">
    <p class="eyebrow">${fmt(p.eol.eyebrow)}</p>
    <h2 id="eol-h">${fmt(p.eol.title)} <span class="status status-pending">${fmt(p.eol.status)}</span></h2>
    ${p.eol.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}
    <p><a class="text-link" href="${pageHref('how-it-works')}#lifecycle-h">${fmt(p.eol.link)}</a></p>
  </div>`,
)}

${section(
  'advantage',
  `<div class="callout">
    <p class="eyebrow">${fmt(p.advantage.eyebrow)}</p>
    <h2 id="advantage-h">${fmt(p.advantage.title)}</h2>
    <p>${fmt(p.advantage.text)}</p>
    <p class="fact-src">${fmt(p.advantage.note)}</p>
  </div>`,
)}

${section(
  'competition',
  `${head(p.competition, { id: 'competition-h' })}${table(p.competition, p.competition.title)}
  <p class="table-note">${fmt(p.competition.signal)}</p>`,
)}

${section('impact', `${head(p.impact, { id: 'impact-h' })}${iconCards(p.impact.items, 'cols-3')}`)}

${section('risks', `${head(p.risks, { id: 'risks-h' })}${iconCards(p.risks.items, 'cols-2')}`)}`;
}

/* ------------------------------------------------------------------ TEAM */
function team() {
  const p = pages.team;
  const member = (m, tag = '') => `
  <li class="member">
    <span class="avatar" aria-hidden="true">${icon('users')}</span>
    ${tag ? `<p class="eyebrow">${fmt(tag)}</p>` : ''}
    <h3>${fmt(m.name)}</h3>
    <p class="member-role">${fmt(m.role)}</p>
    ${m.resp ? `<p class="member-resp">${fmt(m.resp)}</p>` : ''}
    ${m.bio ? `<p>${fmt(m.bio)}</p>` : ''}
  </li>`;
  return `
${pageHero(p.hero)}

${section(
  'story',
  `<div class="prose">
    <p class="eyebrow">${fmt(p.story.eyebrow)}</p>
    <h2 id="story-h">${fmt(p.story.title)}</h2>
    ${p.story.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}
  </div>`,
)}

${section(
  'mvv',
  `<h2 id="mvv-h" class="sr-only">${fmt(p.mvv.mission.title)}, ${fmt(p.mvv.vision.title)}, ${fmt(p.mvv.valuesTitle)}</h2>
  <div class="mv-grid">
    <div class="mv"${reveal()}><h3>${fmt(p.mvv.mission.title)}</h3><p>${fmt(p.mvv.mission.text)}</p></div>
    <div class="mv"${reveal(1)}><h3>${fmt(p.mvv.vision.title)}</h3><p>${fmt(p.mvv.vision.text)}</p></div>
  </div>
  <h3 class="values-title">${fmt(p.mvv.valuesTitle)}</h3>
  ${iconCards(p.mvv.values, 'cols-4')}`,
)}

${section(
  'members',
  `${head(p.members, { id: 'members-h' })}
  <ul class="member-grid">
    ${p.members.list.map((m) => member(m)).join('')}
  </ul>
  ${p.members.coach ? `<ul class="member-grid coach-row">${member(p.members.coach, p.members.coachLabel)}</ul>` : ''}
  <p class="school"><strong>${fmt(p.members.schoolLabel)}:</strong> ${fmt(p.members.school)}</p>`,
)}

${
  HAS_EMAIL
    ? section(
        'contact',
        `<div class="cta-card">
    <p class="eyebrow">${fmt(p.contact.eyebrow)}</p>
    <h2 id="contact-h">${fmt(p.contact.title)}</h2>
    <p>${fmt(p.contact.text)}</p>
    <p>${contactLink(p.contact.button)}</p>
  </div>`,
      )
    : ''
}`;
}

/* -------------------------------------------------------------- PARTNERS */
function partners() {
  const p = pages.partners;
  const f = p.form;
  const hasEmail = Boolean(site.contactEmail) && !/\[TBD/.test(site.contactEmail);
  const field = (x) => `
      <div class="field">
        <label for="f-${x.name}">${fmt(x.label)}${x.required ? ' <span aria-hidden="true">*</span>' : ''}</label>
        <input id="f-${x.name}" name="${x.name}" type="${x.type}" data-label="${esc(x.label)}"${x.required ? ' required' : ''}${x.autocomplete ? ` autocomplete="${x.autocomplete}"` : ''}>
      </div>`;
  const formBlock = f.externalFormUrl
    ? `<p class="center-row"><a class="btn btn-primary" href="${esc(f.externalFormUrl)}" rel="noopener noreferrer"><span>${esc(f.externalFormLabel)}</span>${icon('arrow')}</a></p>`
    : `<form class="reg-form" action="mailto:${hasEmail ? esc(site.contactEmail) : ''}" method="post" enctype="text/plain" data-mailto="${hasEmail ? esc(site.contactEmail) : ''}" data-subject="${esc(f.subject)}">
      <p class="form-note">${fmt(f.requiredNote)}</p>
      <div class="field-grid">${f.fields.map(field).join('')}</div>
      <fieldset class="field">
        <legend>${fmt(f.rolesLabel)}</legend>
        <div class="checks">${f.roles.map((x, i) => `<label class="check"><input type="checkbox" name="role" value="${esc(x)}" id="f-role-${i}"><span>${fmt(x)}</span></label>`).join('')}</div>
      </fieldset>
      <div class="field">
        <label for="f-message">${fmt(f.messageLabel)}</label>
        <textarea id="f-message" name="message" rows="4" data-label="${esc(f.messageLabel)}"></textarea>
      </div>
      <button class="btn btn-primary" type="submit"><span>${esc(f.submit)}</span>${icon('arrow')}</button>
      <p class="form-note">${fmt(f.privacy)}</p>
      ${hasEmail ? '' : `<p class="form-note">${fmt(f.noEmail)} ${fmt(site.contactEmail || '')}</p>`}
    </form>`;
  return `
${pageHero(p.hero)}
<div class="section section-tight">
  <aside class="disclaimer" role="note">${icon('alert')}<p>${fmt(p.hero.notice)}</p></aside>
</div>

${section('role', `${head(p.role, { id: 'role-h' })}${iconCards(p.role.items, 'cols-4')}`)}

${section(
  'register',
  `<div class="split-grid top">
    <div>
      <p class="eyebrow">${fmt(f.eyebrow)}</p>
      <h2 id="register-h">${fmt(f.title)}</h2>
      <p class="lead">${fmt(f.lead)}</p>
      <h3 class="sub-title">${fmt(p.next.title)}</h3>
      ${timeline(p.next.steps)}
    </div>
    <div class="reg-card">${formBlock}</div>
  </div>`,
)}`;
}

const bodyClass = `theme-${site.theme === 'dark' ? 'dark' : 'light'}`;

export const PAGE_MAP = {
  index: { data: pages.home, render: home, bodyClass },
  'how-it-works': { data: pages.how, render: how, bodyClass },
  customers: { data: pages.customers, render: customers, bodyClass },
  evidence: { data: pages.evidence, render: evidence, bodyClass },
  business: { data: pages.business, render: business, bodyClass },
  team: { data: pages.team, render: team, bodyClass },
  partners: { data: pages.partners, render: partners, bodyClass },
};
