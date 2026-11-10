// Entry point used by vite.config.js: turns a page id into finished HTML.
import { renderHead, renderHeader, renderFooter } from './layout.js';
import { PAGE_MAP } from './pages.js';

export function renderPage(id) {
  const page = PAGE_MAP[id];
  if (!page) throw new Error(`Unknown page: ${id}`);
  return {
    head: renderHead(page.data),
    bodyClass: page.bodyClass,
    body: `${renderHeader(id)}\n<main id="main" tabindex="-1">${page.render()}</main>\n${renderFooter()}`,
  };
}
