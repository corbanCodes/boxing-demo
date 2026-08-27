# Uploading to Hostinger

The site is plain static files — no PHP, no database, no WordPress. It drops
straight into the web root.

## Option A — hPanel File Manager (easiest)

1. Log in to Hostinger → **Websites** → *ucaboxing.com* → **File Manager**.
2. Open `public_html`.
3. **Back up the current site first**: select everything in `public_html`,
   right-click → *Compress* → save the archive somewhere safe (or download it).
4. Delete the old contents of `public_html` (only after the backup exists).
5. Upload `uca-boxing.zip` into `public_html`.
6. Right-click the zip → **Extract**. Make sure the files land directly in
   `public_html` — `index.html` must sit at `public_html/index.html`, not
   `public_html/uca-boxing/index.html`.
7. Delete the zip.
8. Visit https://ucaboxing.com — hard-refresh (Cmd/Ctrl + Shift + R).

## Option B — FTP

Host/user/password are in hPanel under **Files → FTP Accounts**.

```
Host: ftp.ucaboxing.com
Port: 21
```

Upload the contents of the folder (not the folder itself) to `public_html`.

## Important

- Upload the **hidden `.htaccess` file** too. In File Manager turn on
  *Show hidden files*; in an FTP client enable hidden files. It handles the
  HTTPS redirect, the custom 404 page, gzip and caching.
- Keep the folder structure intact — `assets/` and `news/` must stay as-is.
- WordPress files (`wp-admin`, `wp-content`, `wp-includes`, `wp-config.php`)
  are no longer needed once this is live, but keep the backup archive.

## After it's live

- Test both forms (Get Ranked + Contact) and confirm the email arrives.
- Submit the sitemap in Google Search Console: `https://ucaboxing.com/sitemap.xml`
- If the old WordPress had indexed URLs you want to preserve, add redirects to
  `.htaccess` — the old post URLs map to `/news/<same-slug>.html`.

## Updating rankings later

Rankings live in one file: `assets/js/../data/rankings.js` →
`assets/data/rankings.js`. It's a single line of JSON. To add a fighter, find the
year and division, and add an entry to that weight class's `c` array:

```js
{"r":4,"n":"Fighter Name","a":"Agency — Facility"}
```

`r` = rank, `n` = name, `a` = agency. To set a champion, edit that division's
`"champ"` value. Save, re-upload the one file, done.
