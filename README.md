# United Combat Association — ucaboxing.com

Static rebuild of the UCA WordPress site (unitedcombatassociation.com) for
**Tom Gaffney** — 916-612-6865 — uca500@yahoo.com.

Client hosts on **Hostinger** and buys the build outright (one-off, no monthly).
Deliverable is plain HTML/CSS/JS — no build step, no database, no WordPress.

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
gallery.html        55-photo masonry gallery with lightbox
404.html            Custom error page
assets/
  css/style.css     Single stylesheet, custom properties, no framework
  js/main.js        Nav, reveals, lightbox, forms, countdown, rankings engine
  data/rankings.js  1,929 fighter entries, 2012–2026 (generated from the WP site)
  img/              85 optimised WebP images + logo/favicon
.htaccess           HTTPS redirect, 404, gzip, caching, security headers
sitemap.xml         51 URLs
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

- No jQuery, no framework, no build step. Total page weight ~11 MB of images
  across the whole site, all WebP, all lazy-loaded below the fold.
- Content and photos migrated from the client's live WordPress site — see
  `ATTRIBUTION.md`.
- Deployment steps for the client are in `DEPLOY-HOSTINGER.md`.
