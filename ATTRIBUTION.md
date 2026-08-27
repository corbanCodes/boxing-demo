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
The client's full WordPress media library was downloaded: **592 of 595 items**
(the 3 failures are Elementor editor thumbnails that 404 on their own server).
After filtering out stock/theme imagery and UI screenshots, **487 images** were
re-encoded to WebP and resized:

| Set | Count | Notes |
|---|---|---|
| Champion portraits | 17 | official belt portraits, cropped 3:4 |
| Fight posters | 137 | 2023–2026, grouped by year |
| Gallery photos | 289 | event, weigh-in, ring and team photos |
| Hero / action | 20 | larger 1920px crops for page heroes |
| Vertical ring shots | 8 | |
| Fighter portraits | 12 | June 2026 card |
| Logo + favicon | 3 | `2015/10/UCALogo_revised.png` |

The logo was recoloured (lightened) for legibility on the dark header; the
original is kept at `assets/img/logo.png`.

## Third-party
- Fonts: **Oswald** and **Barlow** via Google Fonts (SIL Open Font License).
- No stock photography, no third-party imagery, no icon libraries — icons are
  inline SVG written for this build.

## Excluded on purpose
Unsplash/iStock stock photography and theme demo images that were sitting in the
media library (`*-unsplash.jpg`, `iStock-gray-matter`, `JENNIFER-LAWRENCE`),
plus UI screenshots and Elementor editor thumbnails. None of these are the
client's own imagery.

## Not migrated
- `/store/` — was "Coming soon…" with no products.
- `/photos/`, `/events/` — NextGen Gallery shortcodes that render as
  `ngg_shortcode_N_placeholder` text; the underlying images were pulled into
  `gallery.html` instead.
- `/videos/` — TubePress shortcode, renders nothing.
