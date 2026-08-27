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
| Photos | NextGen Gallery shortcodes (broken placeholders) | 329-photo gallery + lightbox |
| Fight posters | scattered in blog posts | 137-poster archive by year |
| Champion photos | none on the site | 17 official belt portraits |
| Pages | WordPress + Elementor + LiteSpeed cache | 52 static pages, no database |

- 53 pages total (13 main + 40 news articles).
- His whole media library pulled: 592 of 595 items, re-encoded to WebP (321 MB of originals → 51 MB).
- No WordPress, so nothing to patch, no plugin updates, no login to get hacked.

## Content migrated

Everything came off his live site: about copy, committee contacts, the full
rulebook, all rankings 2012–2026, Hall of Fame, Fight of the Night, Golden
Fists, Gladiator, Coach of the Year, 40 news articles, and 85 images.

## Things to confirm with him

- **Fighter photo captions.** 17 of his 28 reigning champions now have their
  official belt portrait, matched by filename to the rankings data. The other
  11 render as gold-accented text cards — ask him for those portraits if they
  exist. The 15 contender photos and 6 coach photos are labelled from filenames;
  worth a quick confirm.
- **Victor Ibal** (Super Heavyweight champ) has no portrait in the library —
  the only `ibal` file is a post-fight ring photo with three people in it, so I
  left him as a text card rather than mislabel it.
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
