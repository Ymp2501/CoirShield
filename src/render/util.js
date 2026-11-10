// Small text helpers shared by every renderer.

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const TAGS = {
  '▲': ['v', 'validated measurement'],
  '●': ['l', 'literature benchmark'],
  '○': ['t', 'design target, pending validation'],
};

/** A provenance tag: visible glyph + screen-reader wording. */
export const prov = (ch) =>
  `<span class="prov prov-${TAGS[ch][0]}"><span aria-hidden="true">${ch}</span><span class="sr-only"> (${TAGS[ch][1]})</span></span>`;

/** Escape text, then apply the small markup set: [[source|url]], {{hi|…}}, [TBD], **bold**, provenance tags. */
export function fmt(s) {
  return esc(s)
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, label, url) => `<a class="src" href="${url}" rel="noopener noreferrer">${label}</a>`)
    .replace(/\[\[([^\]|]+)\]\]/g, (_, label) => `<span class="src">${label}</span>`)
    .replace(/\{\{hi\|([^}]+)\}\}/g, (_, t) => `<span lang="hi" class="hi">${t}</span>`)
    .replace(/\[TBD[^\]]*\]/g, (m) => `<mark class="tbd">${m}</mark>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/( ?)([▲●○])/g, (_, sp, ch) => (sp ? '&nbsp;' : '') + prov(ch));
}

/** Relative link to another page. */
export const pageHref = (id) => `./${id}.html`;

export const isTbd = (s) => /\[TBD/.test(String(s));
