# Coir-Shield website

Static website for the Coir-Shield entry to the Conrad Challenge 2026-27 (The Water Challenge).
Plain HTML, CSS and vanilla JavaScript. Vite is the only dependency.

## How it is organised

| Path | What it is |
| --- | --- |
| `src/content.js` | **Every word, number and provenance tag.** Edit this file to change facts. |
| `src/render/` | Turns `content.js` into HTML at build time (layout only, no facts). |
| `src/styles.css` | The brand system (see `BRAND.md`). |
| `src/main.js` | Small enhancements: mobile menu, tabs, scroll reveal. The site works without it. |
| `*.html` (six files) | Empty page shells. Vite fills them from `content.js`. |
| `vite.config.js` | The build, including the small plugin that pre-renders the pages. |
| `scripts/verify.mjs` | Checks links, provenance tags and banned terms in the built site. |
| `public/` | Favicon and the logo mark. |

## Run it on your computer

You need [Node.js](https://nodejs.org) version 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open the address it prints (usually http://localhost:5173). The page reloads when you save `content.js`.

## Check it before you publish

```bash
npm run build
```

```bash
npm run verify
```

`verify` fails if a link is broken, a number has no ▲ ● ○ tag, or a banned term appears.

## Editing rules

1. Every number gets one tag straight after it: `▲` our measurement, `●` literature or standard, `○` target.
2. Unknown facts are written `[TBD: what is needed]`. They show as highlighted placeholders.
3. To let search engines index the site, set `noindex: false` near the top of `src/content.js`.
4. Never add process recipes (concentrations, times, temperatures, loadings, masses).

## Deploy to Vercel

1. Push this folder to GitHub.
2. At vercel.com choose **Add New → Project** and import the repository.
3. Vercel detects Vite. Keep the defaults: build command `npm run build`, output directory `dist`.
4. Press **Deploy**. Share the link it gives you.

## Deploy to GitHub Pages

1. Push this folder to GitHub.
2. In the repository open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Add a file `.github/workflows/deploy.yml` with this content, then commit it to `main`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - run: npm run verify
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

4. The site appears at `https://<your-username>.github.io/<repository-name>/`.

The build uses relative paths, so the same output works on both hosts.
Note: the address will contain the repository name. Rename the repository to `coir-shield` if you want the hyphen in the link.
