# UCA demo — talking points

**Client:** Tom Gaffney, United Combat Association (ucaboxing.com →
unitedcombatassociation.com). Sacramento / Central CA. Public-safety boxing.

**Deal:** $299 one-off build. No monthly. He hosts on Hostinger, owns the files.
He said "you build the whole site first and I will pay 299." Pricing page put him
off — he does not want a subscription. Do not re-pitch monthly on this call.

**Watch-out:** he went back and forth before committing. Keep the call short,
show the thing, send the payment link, send the files.

## What to show, in order

1. **Home** — hero is their own championship-belt faceoff photo. Point out it's
   *their* photography, not stock.
2. **Oct 24 event page** — this is the hook. Live countdown to first bell, all
   15 announced bouts with fighter + agency + division, the two-belt unification
   super fight flagged in gold, and every fight poster in a lightbox.
3. **Rankings** — the big one. 15 years of rankings (2012–2026), all four
   divisions, 1,929 fighter entries. Type "CDCR" or a fighter's name in the
   search box and it filters instantly. On the old site each year is a separate
   static page you have to hunt for.
4. **Rules** — all 26 sections of the rulebook, with a sticky contents nav.
5. **Get Ranked form** — replaces the old empty "Sign Up" page, which literally
   had no form on it. This is where his new fighters come from.
6. **Mobile** — pull it up on a phone. The old site is not usable on one.

## Numbers worth saying out loud

| | Old site | This |
|---|---|---|
| Rankings | ~44 separate pages | 1 page, searchable, 15 years |
| Fighter sign-up | page exists, no form | working form → email |
| Fight card | scattered across blog posts | one page, all bouts |
| Photos | NextGen Gallery shortcodes (broken placeholders) | 55-photo gallery + lightbox |
| Pages | WordPress + Elementor + LiteSpeed cache | 52 static pages, no database |

- 52 pages total (12 main + 40 news articles).
- Every image re-encoded to WebP: 23 MB of originals → 11 MB total site.
- No WordPress, so nothing to patch, no plugin updates, no login to get hacked.

## Content migrated

Everything came off his live site: about copy, committee contacts, the full
rulebook, all rankings 2012–2026, Hall of Fame, Fight of the Night, Golden
Fists, Gladiator, Coach of the Year, 40 news articles, and 85 images.

## Things to confirm with him

- **Fighter photo captions.** The eight portraits on the Fighters page are from
  the June card; only the four champions are labelled by name (Navo, Ibal,
  Olson, Vega — matched by filename/rankings). The rest are uncaptioned on
  purpose. Ask him to name them.
- **Store page.** Old site had "UCA Store — Coming soon…". Left out entirely.
  Ask if he wants it, and whether it's real commerce or a placeholder.
- **Video page.** Old site used a TubePress shortcode that renders nothing.
  Left out. Ask if he has a YouTube channel to embed.
- **Broadcast team** exists as a news post, not a page. Fine as-is.
- **Forms currently point at the 60MS Formspree.** If he wants submissions in
  his own inbox directly, he creates a free Formspree form and we swap one URL
  in two files (or just point it at uca500@yahoo.com).
- A couple of source typos were carried over or lightly corrected (e.g.
  "Investagator" → "Investigator"). Worth a quick pass with him.

## After he pays

1. Zip the folder, send it (or upload for him — `DEPLOY-HOSTINGER.md` has both).
2. He needs to upload the hidden `.htaccess` — that's the usual snag.
3. Tell him rankings are one file to edit; show him the snippet in the deploy doc.
