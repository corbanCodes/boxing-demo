# United Combat Association — ucaboxing.com

Static rebuild of the UCA WordPress site (unitedcombatassociation.com) for
**Tom Gaffney** — 916-612-6865 — uca500@yahoo.com.

Repo: `github.com/corbanCodes/boxing-demo`

Client hosts on **Hostinger** and buys the build outright (one-off, no monthly).
Deliverable is plain HTML/CSS/JS — no build step, no database, no WordPress.

## Two designs

- **Design A** — repo root. Dark navy + gold, the original demo.
- **Design B** — `b/`. Black / white / one red, UFC-style. Built 4 Sep 2026 after
  Tom said the first pass was "busy" and pointed at UFC.com. Shares every asset
  in `assets/` (images, rankings data); has its own `b/assets/css/b.css` and
  `b/assets/js/b.js`.

Both carry a `.vswitch` pill linking to the other. Remove it before final handover.

## Structure

```
index.html          Home — hero, next event, champions, matchups, news, gallery
event.html          NorCal Battle of the Badges (Oct 24, 2026) — full fight card
rankings.html       Interactive rankings — 15 years, 4 divisions, search
fighters.html       28 reigning champions + fighter portraits
news.html           News index → news/*.html (40 article pages)
awards.html         Hall of Fame, Fight of the Night, Golden Fists, Gladiator, Coach of the Year
rules.html          Full 26-section rulebook with sticky contents nav
about.html          About the UCA, committee contacts, charities
get-ranked.html     Fighter sign-up form  → Formspree
contact.html        General contact form  → Formspree
gallery.html        329-photo masonry gallery, lightbox, batched loading
posters.html        137-poster fight archive, grouped by year
404.html            Custom error page
assets/
  css/style.css     Single stylesheet, custom properties, no framework
  js/main.js        Nav, reveals, lightbox, forms, countdown, rankings engine
  data/rankings.js  1,929 fighter entries, 2012–2026 (generated from the WP site)
  img/              487 optimised WebP images + logo/favicon
                    champions/ 17 · posters/ 137 · gallery/ 289 · action/ 20 · vertical/ 8 · fighters/ 12
.htaccess           HTTPS redirect, 404, gzip, caching, security headers
sitemap.xml         52 URLs
robots.txt
```

## Forms

Both forms POST to `https://formspree.io/f/xojeqvng` (60MS account) via fetch,
with distinct `_subject` lines:

- `UCA — New Fighter Sign-Up (Get Ranked)`
- `UCA — Website Contact Form`

Each has a `_gotcha` honeypot, inline success/error states, and a phone/email
fallback in the error message. **Swap the endpoint to the client's own Formspree
form before final handover if they want submissions going to them directly.**

## Rankings data

`assets/data/rankings.js` is generated, not hand-written. It holds every ranking
page from the WordPress site, keyed by year → division → weight class:

| Years | Divisions | Weight classes | Fighter entries |
|---|---|---|---|
| 2012–2026 (15) | Men's Open, Women's Open, Masters, Women's Masters | up to 17 | 1,929 |

To update a year, edit that file — the page re-renders from it. No other change
needed. Champions are the `champ` field; contenders are the `c` array.

## Local preview

```bash
python3 -m http.server 8791 --directory .
```

## Notes

- No jQuery, no framework, no build step. ~51 MB of images across the whole
  site, all WebP, all lazy-loaded; the gallery renders 48 at a time behind a
  Load more button so the initial page stays light.
- The client's entire WordPress media library (592 of 595 items — the 3 misses
  are Elementor editor thumbnails that 404 server-side) was downloaded and
  re-encoded. Stock/theme images and UI screenshots were filtered out.
- Content and photos migrated from the client's live WordPress site — see
  `ATTRIBUTION.md`.
- Deployment steps for the client are in `DEPLOY-HOSTINGER.md`.
