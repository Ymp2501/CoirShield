// One render function per page. Layout only: all words and numbers come from content.js.
import { site, pages, zones, lifecycle, charts } from '../content.js';
import { esc, fmt, pageHref } from './util.js';
import { icon, puckSvg, lifecycleSvg, carboxylateChart, breakthroughChart, costChart } from './svg.js';
import { disclaimerBox, legend, contactLink } from './layout.js';

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

const pageHero = (h) => `
<section class="page-hero" aria-labelledby="page-h">
  <p class="eyebrow">${fmt(h.eyebrow)}</p>
  <h1 id="page-h">${fmt(h.title)}</h1>
  <p class="lead">${fmt(h.lead)}</p>
</section>`;

const btn = (b, cls) =>
  `<a class="btn ${cls}" href="${pageHref(b.href)}"><span>${esc(b.label)}</span>${icon('arrow')}</a>`;

const factList = (facts) => `
<dl class="facts">
  ${facts.map((f) => `<div><dt>${fmt(f.label)}</dt><dd>${fmt(f.value)}</dd></div>`).join('')}
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

const table = (t, caption) => `
<div class="table-wrap" role="region" aria-label="${esc(caption)}" tabindex="0">
  <table>
    <caption class="sr-only">${esc(caption)}</caption>
    <thead><tr>${t.columns.map((c) => `<th scope="col">${fmt(c)}</th>`).join('')}</tr></thead>
    <tbody>
      ${t.rows
        .map(
          (r) =>
            `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${fmt(c)}</th>` : `<td data-label="${esc(t.columns[i])}">${fmt(c)}</td>`)).join('')}</tr>`,
        )
        .join('')}
    </tbody>
  </table>
</div>`;

const zoneCards = (withChem) => `
<ol class="zone-list">
  ${zones
    .map(
      (z, i) => `<li class="zone-card zone-${i}"${reveal(i)}>
    <p class="zone-id">${esc(z.label)}</p>
    <h3>${fmt(z.name)}</h3>
    <p class="zone-plain">${fmt(z.plain)}</p>
    <p class="zone-target">${fmt(z.target)}</p>
    ${
      withChem
        ? `<details class="chem"><summary>${esc(z.chemistryTitle)}<span class="sr-only">: ${esc(z.label)}</span></summary>${z.chemistry.map((p) => `<p>${fmt(p)}</p>`).join('')}</details>`
        : ''
    }
  </li>`,
    )
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
  return `
<section class="hero" aria-labelledby="page-h">
  <div class="hero-copy">
    <p class="eyebrow">${fmt(p.hero.eyebrow)}</p>
    <h1 id="page-h">${esc(t1)} ${esc(t2)}<em>${esc(hi)}</em>${esc(t3)}</h1>
    <p class="hero-sub">${fmt(p.hero.sub)}</p>
    <div class="actions">${btn(p.hero.primary, 'btn-primary')}${btn(p.hero.secondary, 'btn-outline')}</div>
    ${disclaimerBox()}
  </div>
  <div class="hero-figure">${puckFigure(p.hero.figureCaption, { id: 'hero-puck', compact: true })}</div>
</section>

${section(
  'problem',
  `<div class="split-grid">
    <div${reveal()}>
      <p class="eyebrow">${fmt(p.problem.eyebrow)}</p>
      <h2 id="problem-h">${fmt(p.problem.title)}</h2>
      ${p.problem.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}
    </div>
    <div${reveal(1)}>${factList(p.problem.facts)}</div>
  </div>`,
)}

${section(
  'solution',
  `${head(p.solution, { id: 'solution-h', center: true })}
  ${zoneCards(false)}
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
        ${p.snapshot.stats.map((s) => `<div><dd>${fmt(s.value)}</dd><dt>${fmt(s.label)}</dt></div>`).join('')}
      </dl>
    </div>
  </div>`,
)}

${section(
  'impact',
  `${head(p.impact, { id: 'impact-h', center: true })}
  ${iconCards(p.impact.items, 'cols-4')}
  <p class="center-row">${fmt(p.impact.tbd)}</p>`,
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
  return `
${pageHero(p.hero)}

${section(
  'model',
  `<h2 id="model-h" class="sr-only">${fmt(m.title)}</h2>
  <div class="model-grid">
    <div class="model-figure">${puckFigure(m.figureCaption, { id: 'model-puck' })}</div>
    <div class="model-detail">
      ${zoneCards(true)}
      <div class="mini-grid">
        <div class="mini"><h3>${fmt(m.window.title)}</h3><p class="mini-value">${fmt(m.window.value)}</p><p>${fmt(m.window.text)}</p></div>
        <div class="mini"><h3>${fmt(m.capacity.title)}</h3><p class="mini-value">${fmt(m.capacity.value)}</p><p>${fmt(m.capacity.text)}</p></div>
      </div>
    </div>
  </div>`,
)}

${section(
  'benefits',
  `<div class="section-head center"><h2 id="benefits-h">${fmt(m.benefitsTitle)}</h2></div>
  ${iconCards(m.benefits, 'cols-4')}`,
)}

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
    ${p.scope.items.map((s, i) => `<li${reveal(i)}><span class="scope-x" aria-hidden="true">✕</span><div><h3>${fmt(s.name)}</h3><p>${fmt(s.reason)}</p></div></li>`).join('')}
  </ul>`,
  'scope',
)}`;
}

/* -------------------------------------------------------- FOR CUSTOMERS */
function customers() {
  const p = pages.customers;
  return `
${pageHero(p.hero)}
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
  return `
${pageHero(p.hero)}
<div class="section section-tight">
  ${legend(true)}
  ${disclaimerBox()}
</div>

${section(
  'validated',
  `<div class="split-grid">
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
  </div>`,
)}

${section('bench', `${head(p.bench, { id: 'bench-h' })}${iconCards(p.bench.items, 'cols-2')}`)}

${section(
  'charts',
  `${head(p.chartsBlock, { id: 'charts-h' })}
  <div class="chart-grid">${breakthroughChart(charts.breakthrough)}${costChart(charts.cost)}</div>`,
)}

${section('pending', `${head(p.pending, { id: 'pending-h' })}${table(p.pending, p.pending.title)}`)}

${section(
  'regulatory',
  `${head(p.regulatory, { id: 'regulatory-h' })}${table(p.regulatory, p.regulatory.title)}
  <p class="table-note">${fmt(p.regulatory.note)}</p>`,
)}`;
}

/* -------------------------------------------------------------- BUSINESS */
function business() {
  const p = pages.business;
  return `
${pageHero(p.hero)}

${section(
  'market',
  `<div class="split-grid">
    <div${reveal()}>
      <p class="eyebrow">${fmt(p.market.eyebrow)}</p>
      <h2 id="market-h">${fmt(p.market.title)}</h2>
      ${p.market.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}
    </div>
    <div${reveal(1)}>${factList(p.market.facts)}</div>
  </div>`,
)}

${section('gtm', `${head(p.gtm, { id: 'gtm-h' })}${iconCards(p.gtm.items, 'cols-2')}`)}

${section(
  'pricing',
  `${head(p.pricing, { id: 'pricing-h', center: true })}
  <ul class="price-grid">
    ${p.pricing.options
      .map(
        (o, i) => `<li class="price-card${o.good ? ' good' : ''}"${reveal(i)}>
      <h3>${fmt(o.title)}</h3>
      <p class="price">${fmt(o.price)}</p>
      <p>${fmt(o.note)}</p>
    </li>`,
      )
      .join('')}
  </ul>
  <p class="center-row narrow">${fmt(p.pricing.why)}</p>`,
)}

${section(
  'cost',
  `<div class="split-grid">
    <div${reveal()}>
      <p class="eyebrow">${fmt(p.cost.eyebrow)}</p>
      <h2 id="cost-h">${fmt(p.cost.title)}</h2>
      ${p.cost.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}
      ${factList(p.cost.facts)}
    </div>
    <div${reveal(1)}>${costChart(charts.cost)}</div>
  </div>`,
)}

${section(
  'eol',
  `<div class="eol">
    <p class="eyebrow">${fmt(p.eol.eyebrow)}</p>
    <h2 id="eol-h">${fmt(p.eol.title)} <span class="status status-pending">${fmt(p.eol.status)}</span></h2>
    ${p.eol.paras.map((x) => `<p>${fmt(x)}</p>`).join('')}
    <p><a class="text-link" href="${pageHref('how-it-works')}#lifecycle-h">${fmt(pages.how.lifecycle.title)}</a></p>
  </div>`,
)}

${section('competition', `${head(p.competition, { id: 'competition-h' })}${table(p.competition, p.competition.title)}`)}

${section(
  'risks',
  `${head(p.risks, { id: 'risks-h' })}${iconCards(p.risks.items, 'cols-2')}`,
)}`;
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
    ${member(p.members.coach, p.members.coachLabel)}
  </ul>
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

export const PAGE_MAP = {
  index: { data: pages.home, render: home, bodyClass: `theme-${site.theme === 'dark' ? 'dark' : 'light'}` },
  'how-it-works': { data: pages.how, render: how, bodyClass: `theme-${site.theme === 'dark' ? 'dark' : 'light'}` },
  customers: { data: pages.customers, render: customers, bodyClass: `theme-${site.theme === 'dark' ? 'dark' : 'light'}` },
  evidence: { data: pages.evidence, render: evidence, bodyClass: `theme-${site.theme === 'dark' ? 'dark' : 'light'}` },
  business: { data: pages.business, render: business, bodyClass: `theme-${site.theme === 'dark' ? 'dark' : 'light'}` },
  team: { data: pages.team, render: team, bodyClass: `theme-${site.theme === 'dark' ? 'dark' : 'light'}` },
};
