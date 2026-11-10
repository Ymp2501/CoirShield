// Shared page chrome: <head> tags, header, footer.
import { site } from '../content.js';
import { esc, fmt, pageHref, isTbd } from './util.js';
import { logoMark, icon } from './svg.js';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Mukta:wght@400;600&family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap';

export function renderHead(page) {
  return [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}">`,
    site.noindex ? '<meta name="robots" content="noindex">' : '',
    `<meta name="theme-color" content="${site.theme === 'dark' ? '#0a0e14' : '#f6f3ec'}">`,
    '<link rel="icon" href="./favicon.svg" type="image/svg+xml">',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    `<link rel="stylesheet" href="${FONTS}">`,
    // Marks the page as JS-enabled before first paint so reveal animations never hide content without JS.
    "<script>document.documentElement.classList.add('js')</script>",
  ]
    .filter(Boolean)
    .join('\n');
}

export const brand = () =>
  `<a class="brand" href="${pageHref('index')}" aria-label="${esc(site.name)} — home">${logoMark(30)}<span class="brand-word">${esc(site.name)}</span></a>`;

export function renderHeader(currentId) {
  const links = site.nav
    .map(
      (n) =>
        `<li><a href="${pageHref(n.id)}"${n.id === currentId ? ' aria-current="page"' : ''}>${esc(n.label)}</a></li>`,
    )
    .join('');
  return `
<a class="skip-link" href="#main">${esc(site.skipLink)}</a>
<header class="site-header">
  <div class="header-inner">
    ${brand()}
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span class="nav-toggle-bars" aria-hidden="true"></span><span>${esc(site.navToggleLabel)}</span>
    </button>
    <nav id="site-nav" class="site-nav" aria-label="Main"><ul>${links}</ul></nav>
  </div>
</header>`;
}

export function contactLink(label, cls = 'btn btn-primary') {
  const email = site.contactEmail;
  const href = isTbd(email) ? 'mailto:' : `mailto:${esc(email)}`;
  return `<a class="${cls}" href="${href}">${icon('arrow')}<span>${esc(label)}</span></a> <span class="contact-address">${fmt(email)}</span>`;
}

export function disclaimerBox() {
  return `
<aside class="disclaimer" role="note" aria-label="${esc(site.disclaimer.title)}">
  ${icon('alert')}
  <p><strong>${esc(site.disclaimer.title)}.</strong> ${fmt(site.disclaimer.text)}</p>
</aside>`;
}

export function legend(full = true) {
  const p = site.provenance;
  return `
<div class="legend${full ? ' legend-full' : ''}">
  ${full ? `<h2 class="legend-title">${esc(p.title)}</h2><p class="legend-intro">${fmt(p.intro)}</p>` : ''}
  <ul class="legend-list">
    ${p.items.map((i) => `<li><span class="legend-tag">${fmt(i.tag)}</span><span><strong>${esc(i.name)}</strong>${full ? `<br>${fmt(i.desc)}` : ''}</span></li>`).join('')}
  </ul>
</div>`;
}

export function renderFooter() {
  const f = site.footer;
  return `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      ${brand()}
      <p class="footer-tagline">${fmt(site.taglineHi)}</p>
      <p>${fmt(f.blurb)}</p>
      <p class="footer-context">${fmt(f.context)}<br>${fmt(f.school)}</p>
    </div>
    <nav class="footer-col" aria-label="Footer">
      <h2>${esc(f.navTitle)}</h2>
      <ul>${site.nav.map((n) => `<li><a href="${pageHref(n.id)}">${esc(n.label)}</a></li>`).join('')}</ul>
    </nav>
    <div class="footer-col">
      <h2>${esc(f.legendTitle)}</h2>
      ${legend(false)}
      ${site.contactEmail && site.contactEmail.trim() ? `<h2 class="footer-contact-title">${esc(f.contactTitle)}</h2>
      <p>${contactLink(f.contactLabel, 'text-link')}</p>` : ''}
    </div>
  </div>
  <p class="footer-disclaimer"><strong>${esc(site.disclaimer.title)}.</strong> ${fmt(site.disclaimer.text)}</p>
  <p class="copyright">© ${new Date().getFullYear()} ${fmt(f.rights)}</p>
</footer>`;
}
