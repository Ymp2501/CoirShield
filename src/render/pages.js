// One render function per page. Layout only: all words and numbers come from content.js.
import { site, pages, zones, lifecycle, charts } from '../content.js';
import { esc, fmt, pageHref } from './util.js';
import { icon, puckSvg, housingSvg, lifecycleSvg, carboxylateChart, breakthroughChart, unitChart } from './svg.js';
import { disclaimerBox, legend, contactLink } from './layout.js';

const SHOW_V = site.showValidatedResult === true;

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
function home() {
  const p = pages.home;
  const [t1, t2, hi, t3] = p.hero.title;
  const stats = p.snapshot.stats.filter((s) => SHOW_V || !s.validatedOnly);
  return `
<div class="hero-band${site.darkHero ? ' theme-dark' : ''}">
<section class="hero" aria-labelledby="page-h">
  <div class="hero-copy">
    <p class="eyebrow">${fmt(p.hero.eyebrow)}</p>
    <h1 id="page-h">${esc(t1)} ${esc(t2)}<em>${esc(hi)}</em>${esc(t3)}</h1>
    <p class="hero-sub">${fmt(p.hero.sub)}</p>
    <p class="hero-tagline">${fmt(site.taglineHi)}</p>
    <div class="actions">${btn(p.hero.primary, 'btn-primary')}${btn(p.hero.secondary, 'btn-outline')}</div>
    ${disclaimerBox()}
  </div>
  <div class="hero-figure">${puckFigure(p.hero.figureCaption, { id: 'hero-puck', compact: true })}</div>
</section>
</div>

${section(
  'problem',
  `<div class="split-grid top">
    <div${reveal()}>
      <p class="eyebrow">${fmt(p.problem.eyebrow)}</p>
      <h2 id="problem-h">${fmt(p.problem.title)}</h2>
      ${p.problem.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}
    </div>
    <div${reveal(1)}>${factList(p.problem.facts, 'facts-text')}</div>
  </div>`,
)}

${section(
  'solution',
  `${head(p.solution, { id: 'solution-h', center: true })}
  ${zoneCards(false)}
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
  <ul class="goal-list">${p.impact.goals.map((g) => `<li>${icon('target')}<span>${fmt(g)}</span></li>`).join('')}</ul>`,
)}

${section(
  'explore',
  `${head(p.explore, { id: 'explore-h', center: true })}
  <ul class="card-grid cols-5">
    ${p.explore.cards
      .map(
        (c, i) => `<li class="card card-link"${reveal(i)}>
      <span class="card-icon">${icon(c.icon)}</span>
      <h3><a href="${pageHref(c.href)}">${fmt(c.title)}</a></h3>
      <p>${fmt(c.text)}</p>
    </li>`,
      )
      .join('')}
  </ul>`,
)}`;
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

${section(
  'help',
  `<div class="cta-card">
    <h2 id="help-h">${fmt(p.help.title)}</h2>
    <p>${fmt(p.help.text)}</p>
    <p>${contactLink(site.footer.contactLabel)}</p>
  </div>`,
)}`;
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
        <h3>${fmt(p.research.title)} <span class="status status-pending">${fmt(p.research.label)}</span></h3>
        <p>${fmt(p.research.text)}</p>
        <p class="fact-src">${fmt(p.research.note)}</p>
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
    <p>${fmt(m.bio)}</p>
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
  <ul class="member-grid coach-row">${member(p.members.coach, p.members.coachLabel)}</ul>
  <p class="school"><strong>${fmt(p.members.schoolLabel)}:</strong> ${fmt(p.members.school)}</p>`,
)}

${section(
  'contact',
  `<div class="cta-card">
    <p class="eyebrow">${fmt(p.contact.eyebrow)}</p>
    <h2 id="contact-h">${fmt(p.contact.title)}</h2>
    <p>${fmt(p.contact.text)}</p>
    <p>${contactLink(p.contact.button)}</p>
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
};
