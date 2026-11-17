# Coir-Shield brand notes

These rules keep the website consistent with the deck and the video.

## Name

Always **Coir-Shield**, with the hyphen and both capitals. The product is a **puck**.

## Logo

`public/logo-mark.svg` (and inline in `src/render/svg.js`).

- A shield outline: protection.
- Three bands inside it: the three zones of the puck, getting stronger from top to bottom, in flow order.
- A drop leaving the point of the shield: filtered water coming out.

The wordmark is live text, "Coir-Shield" in Syne 800, set to the right of the mark.
Keep clear space around the lockup equal to the height of one band group. Do not recolour the mark outside the palette, stretch it, or drop the hyphen.

## Typefaces (Google Fonts)

| Role | Typeface | Why |
| --- | --- | --- |
| Display headings | Syne 700 / 800 | Existing brand face, shared with the deck and video. |
| Numbers, labels, ▲ ● ○ tags | Space Mono 400 / 700 | Existing brand face. Fixed-width digits line numbers and their tags up. Kept to short labels and figures; full sentences are never set in it. |
| Body text | Inter 400–700 | A screen-first sans-serif with a tall x-height, so long passages stay easy to read on low-cost phones. It is neutral, which lets the wide Syne headings carry the personality. |
| Hindi | Mukta 600 | One of the best-drawn Devanagari web fonts; used only for Hindi lines, marked `lang="hi"`. |

## Hindi

- Product line: जाँच शील्ड
- Tagline: जाँच से भरोसा: Trust you can test.

Both are set in `site.nameHi` and `site.taglineHi` in `src/content.js`, written as `{{hi|…}}` so they are marked as Hindi for screen readers.

## Colour

Light scheme on every page, set by `theme: 'light'` in `src/content.js`. The Home hero alone sits on a dark band (`darkHero: true`; set it to `false` for an all-light Home).

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#FAF6EE` | Page background |
| Surface | `#FFFFFF` | Cards |
| Ink | `#10202A` | Text |
| Deep teal | `#0B5C4E` | Links, buttons, labels, validated ▲ |
| Coir brown | `#7A4A1E` | Target ○, status pills, callout edges |
| Blue | `#1F4FA3` | Literature ● |
| Signal teal | `#4FC3A1` | Fills and decoration only. Never text on a light background (contrast is too low). |
| Night | `#0A0E14` | Home hero band only, with Signal teal |
| Placeholder | `#FFF0C2` | [TBD] highlights and warnings |

Diagrams follow the scheme of the area they sit in. The biochar zone stays dark in both, because biochar is black.

## Logo rules

No certification-seal, government-emblem or ISI/BIS-style shapes. The mark is a plain shield outline with three bands and a drop; it carries no tick, star, ring of text or laurel.

## Provenance marks

▲ validated · ● literature · ○ target. Shape carries the meaning, colour only supports it. Every number has exactly one.

## Voice

- Plain, short sentences. Say what a zone does, not how it is made.
- Honest about status: "designed to", "target", "pending". Never "safe", never "certified".
- Problem framing: human drinking-water exposure in the Indo-Gangetic Plain.
- For customers: no jargon, one action per step.
