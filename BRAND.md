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
| Headings | Syne 700 / 800 | Existing brand face. |
| Data, labels, tags, figures | Space Mono 400 / 700 | Existing brand face. Fixed-width digits make numbers and their ▲ ● ○ tags line up. |
| Body | Inter 400 / 600 | Chosen companion. Syne is wide and expressive, so body text needs a quiet, narrow-ish face with a tall x-height that stays readable at small sizes on low-cost phones. Inter also covers the characters this site needs (₹, µ, subscripts and superscripts such as ₂ and ²⁺). |

## Colour

The site uses the **light scheme** on every page. The scheme is set by one line in `src/content.js`:
`theme: 'light'` (change to `'dark'` for teal on near-black, to match the deck). It is a build setting, not a visitor toggle.

Light scheme (current):

| Token | Value | Use |
| --- | --- | --- |
| Background | `#f6f3ec` | Page |
| Surface | `#ffffff` | Cards |
| Ink | `#10202a` | Text |
| Muted | `#44545e` | Secondary text |
| Brand teal | `#4fc3a1` | Fills and decoration only: puck outline, chart bar, heading underline, page glow |
| Deep teal | `#0b6b55` | Links, buttons, labels, validated ▲ (the brand teal is too pale for text on a light page) |
| Blue | `#1f4fa3` | Literature ● |
| Amber-brown | `#7d5200` | Target ○, status pills |
| Placeholder | `#fff0c2` | [TBD] highlights and warnings |

Dark scheme (available, matches the deck):

| Token | Value | Use |
| --- | --- | --- |
| Background | `#0a0e14` | Page |
| Surface | `#121a24` | Cards |
| Ink | `#eef3f6` | Text |
| Teal | `#4fc3a1` | Accent, links, validated ▲ |
| Blue | `#9cc0ff` | Literature ● |
| Amber | `#f2c14e` | Target ○, placeholders, warnings |

The light values are our best match to the poster. If the poster uses different exact values, change the first token block at the top of `src/styles.css`.

Diagrams follow the page scheme. The biochar zone stays dark in both, because biochar is black.

## Provenance marks

▲ validated · ● literature · ○ target. Shape carries the meaning, colour only supports it. Every number has exactly one.

## Voice

- Plain, short sentences. Say what a zone does, not how it is made.
- Honest about status: "designed to", "target", "pending". Never "safe", never "certified".
- Problem framing: human drinking-water exposure in the Indo-Gangetic Plain.
- For customers: no jargon, one action per step.
