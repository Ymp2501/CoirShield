import { defineConfig } from 'vite';
import { resolve, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

// One HTML shell per page. Each shell is filled at build time from src/content.js.
const PAGES = ['index', 'how-it-works', 'customers', 'evidence', 'business', 'team'];

function coirShieldPages() {
  let server;
  return {
    name: 'coir-shield-pages',
    configureServer(s) {
      server = s;
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        const mod = server
          ? await server.ssrLoadModule('/src/render/index.js')
          : await import('./src/render/index.js');
        const out = mod.renderPage(basename(ctx.filename, '.html'));
        return html
          .replace('<!--cs:head-->', () => out.head)
          .replace('<body>', () => `<body class="${out.bodyClass}">`)
          .replace('<!--cs:body-->', () => out.body);
      },
    },
    handleHotUpdate({ file, server: s }) {
      if (/src\/(content\.js|render\/)/.test(file)) {
        s.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

export default defineConfig({
  base: './', // relative paths: works on GitHub Pages (sub-folder) and Vercel (root)
  plugins: [coirShieldPages()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(PAGES.map((p) => [p, resolve(root, `${p}.html`)])),
    },
  },
});
