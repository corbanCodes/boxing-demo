# Content & image sources

All text and imagery on this site was migrated from the client's own live
WordPress site at **unitedcombatassociation.com** (redirect target of
ucaboxing.com), which the client owns and operates.

## Text
- About / committee / charities → `/uca-committee/`, `/about/`
- Rules & eligibility (26 sections) → `/rules-and-eligibility/`
- Rankings 2012–2026 → the 44 ranking pages (`/mens-ranking-*`, `/womens-ranking-*`, `/masters-*`, archives)
- Awards → `/2014-uca-hall-of-fame/`, `/uca-fight-of-the-night/`, `/golden-fists/`, `/uca-gladiator-award/`, `/trainer-of-the-year/`
- News (40 articles) → WordPress posts, July–August 2026
- Event details → `/norcal-battle-of-the-badges-returns-to-rock-brews/` and the Oct 24 fight posters

Pulled via the site's public WordPress REST API (`/wp-json/wp/v2/`).

## Images
85 images from `/wp-content/uploads/`, re-encoded to WebP and resized:

| Set | Count | Source |
|---|---|---|
| Fight posters | 15 | 2026/07–08 uploads (Oct 24 card) |
| Fighter portraits | 12 | 2026/06–07 uploads |
| Action / event | 20 | 2023–2026 uploads |
| Vertical ring shots | 8 | 2026/08 uploads |
| Gallery | 27 | 2023–2026 uploads |
| Logo + favicon | 3 | `2015/10/UCALogo_revised.png` |

The logo was recoloured (lightened) for legibility on the dark header; the
original is kept at `assets/img/logo.png`.

## Third-party
- Fonts: **Oswald** and **Barlow** via Google Fonts (SIL Open Font License).
- No stock photography, no third-party imagery, no icon libraries — icons are
  inline SVG written for this build.

## Not migrated
- `/store/` — was "Coming soon…" with no products.
- `/photos/`, `/events/` — NextGen Gallery shortcodes that render as
  `ngg_shortcode_N_placeholder` text; the underlying images were pulled into
  `gallery.html` instead.
- `/videos/` — TubePress shortcode, renders nothing.
