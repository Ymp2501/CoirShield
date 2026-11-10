// Checks the built site in dist/. Run: npm run build && npm run verify
// 1. internal links resolve   2. every numeral has a provenance tag or sits in a [TBD]
// 3. banned terms are absent   4. no nested <svg>, robots flag honoured
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
if (!existsSync(dist)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}
const htmlFiles = readdirSync(dist).filter((f) => f.endsWith('.html'));
let failures = 0;
const fail = (msg) => {
  failures++;
  console.error('  FAIL ' + msg);
};

/* ---------------------------------------------------------------- 1. links */
console.log('1. Internal links');
let linkCount = 0;
for (const f of htmlFiles) {
  const html = readFileSync(join(dist, f), 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    linkCount++;
    const [path, hash] = url.split('#');
    if (path) {
      const target = join(dist, path);
      if (!existsSync(target)) {
        fail(`${f}: broken link ${url}`);
        continue;
      }
      if (hash && path.endsWith('.html')) {
        const other = readFileSync(target, 'utf8');
        if (!other.includes(`id="${hash}"`)) fail(`${f}: missing anchor ${url}`);
      }
    } else if (hash && !ids.has(hash)) fail(`${f}: missing anchor #${hash}`);
  }
}
console.log(`  checked ${linkCount} internal links in ${htmlFiles.length} pages`);

/* ------------------------------------------------------- 2. numeral scan */
// Numerals that are names, not quantities, and so need no tag:
const ALLOW = [
  /\bzones? [0-2]\b/gi, // zone names
  /\bTable [23]\b/g, // table names inside BIS IS 10500:2012
  /\bIS 10500(?::2012)?/g, // the standard's identifier
  /\bNSF\/ANSI 53\b/g, // another standard's identifier
  /\bIS 3025 \(Part \d+\)/g, // test-method identifiers
  /\bESP32\b/g, // a part name
  /\bV[1-7]\b/g, // validation test labels
  /\b4th\b/g, // "4th edition" of the WHO guidelines
  /\b(?:19|20)\d\d(?:-\d\d)?\b/g, // years: citations, competition season, copyright
];
const TAG = /[▲●○]/;
const SPOKEN_TAG = /validated measurement|literature benchmark|design target/;
const decode = (s) =>
  s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');

console.log('2. Numeral scan (every numeral needs ▲ ● ○ or a [TBD])');
let numerals = 0;
for (const f of htmlFiles) {
  let html = readFileSync(join(dist, f), 'utf8');
  // source citations (question numbers, dates, page numbers) are part of a ● tag, not quantities
  html = html.replace(/<(a|span) class="src"[^>]*>[\s\S]*?<\/\1>/g, ' ');
  html = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '');
  const blocks = [];
  // text carried in attributes that people read or hear
  // (in spoken text the tag is written out in words, which counts as a tag)
  for (const m of html.matchAll(/\s(?:alt|aria-label|title|data-label)="([^"]*)"/g)) blocks.push({ t: m[1], spoken: true });
  for (const m of html.matchAll(/<meta name="description" content="([^"]*)"/g)) blocks.push({ t: m[1], spoken: true });
  // visible text, split at block-level boundaries
  const text = html
    .replace(/<\/?(?:p|div|li|ul|ol|dl|dt|dd|h[1-6]|td|th|tr|table|section|figure|figcaption|header|footer|nav|main|aside|button|summary|details|title|text|svg|g|caption|br)\b[^>]*>/g, '\n')
    .replace(/<[^>]+>/g, '');
  blocks.push(...text.split('\n').map((t) => ({ t, spoken: false })));
  for (const { t: raw, spoken } of blocks) {
    let b = decode(raw).replace(/\s+/g, ' ').trim();
    if (!b) continue;
    b = b.replace(/\[TBD[^\]]*\]/g, ' ');
    for (const re of ALLOW) b = b.replace(re, ' ');
    for (const m of b.matchAll(/\d[\d.,]*/g)) {
      numerals++;
      const after = b.slice(m.index, m.index + m[0].length + 48);
      if (!(TAG.test(after) || (spoken && SPOKEN_TAG.test(after)))) fail(`${f}: untagged numeral "${m[0]}" in: ${b.slice(Math.max(0, m.index - 40), m.index + 60)}`);
    }
  }
}
console.log(`  checked ${numerals} numerals`);

/* ------------------------------------------------------- 3. banned terms */
console.log('3. Banned terms');
const BANNED = [
  // names and wording
  'citize', 'boffin', 'two-stage', 'two stage', 'mercerised', 'mercerized', 'coirshield', 'coir shield', 'cartridge',
  'lid on your bucket', 'zero behaviour change', 'patent pending', 'pyrolysis', 'dithizone',
  // retired numbers
  '22–50 year', '3–8 year', 'log kf', '79×', '2.4×', '2.4x', '0.55 mmol', '85% removal', '200 million clay pot',
  '₹26', '₹75 delivered', '₹312',
  // claims we must never make
  'arsenic-free', '100% safe', 'safe to drink', 'certified safe', 'hardness exceeds who',
  'amphibian', 'ecocide', 'mining rig', 'battery',
  // retired team wording
  'swarit garg — ceo', 'ceo · strategy', 'vardaan potdar — cto', 'cto · materials', 'open role', 'role open',
];
const scanFiles = [
  ...htmlFiles.map((f) => join(dist, f)),
  ...readdirSync(join(dist, 'assets')).map((f) => join(dist, 'assets', f)),
  join(root, 'src/content.js'),
];
let hits = 0;
for (const file of scanFiles) {
  const body = readFileSync(file, 'utf8').toLowerCase();
  for (const term of BANNED)
    if (body.includes(term)) {
      hits++;
      fail(`${file.replace(root + '/', '')}: banned term "${term}"`);
    }
}
console.log(`  scanned ${scanFiles.length} files for ${BANNED.length} terms: ${hits} hits`);

/* ---------------------------------------------------------- 4. structure */
console.log('4. Structure');
const { site } = await import(join(root, 'src/content.js'));
for (const f of htmlFiles) {
  const html = readFileSync(join(dist, f), 'utf8');
  let depth = 0;
  for (const m of html.matchAll(/<(\/?)svg\b/g)) {
    depth += m[1] ? -1 : 1;
    if (depth > 1) {
      fail(`${f}: nested <svg>`);
      break;
    }
  }
  const hasNoindex = /<meta name="robots" content="noindex">/.test(html);
  if (hasNoindex !== site.noindex) fail(`${f}: robots meta does not match site.noindex`);
  if ((html.match(/<h1\b/g) || []).length !== 1) fail(`${f}: page must have exactly one <h1>`);
}
console.log(`  no nested <svg>, one <h1> per page, robots noindex = ${site.noindex}`);

console.log(failures ? `\n${failures} problem(s) found.` : '\nAll checks passed.');
process.exit(failures ? 1 : 0);
