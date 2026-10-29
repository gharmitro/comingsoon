# GharMitro coming soon

Static landing page for [gharmitro.in](https://gharmitro.in). It is plain HTML, CSS, and a few lines of JavaScript. There is no build step, framework, or backend.

Open `index.html` in a browser, or serve this folder with any static host. Paths are relative, so the page works on GitHub Pages, GoDaddy, and other file hosts.

## Preview locally

From this folder:

```bash
cd coming-soon
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

You can also open `index.html` directly. The page does not fetch remote assets.

## Files

```text
coming-soon/
├── index.html
├── styles.css
├── script.js          # sets the copyright year
├── CNAME              # GitHub Pages custom domain
├── .nojekyll          # stops GitHub Pages from running Jekyll
├── assets/
│   ├── logo.png
│   └── favicon.png
└── README.md
```

`script.js` only updates the year in the footer. If JavaScript is unavailable, the footer still shows 2026.

## Brand assets

`assets/logo.png` and `assets/favicon.png` are copies of the existing app artwork:

| Web file | Source | Size |
| --- | --- | --- |
| `assets/logo.png` | `mobile/assets/icon.png` | 512×512 (resized for the web) |
| `assets/favicon.png` | `mobile/assets/favicon.png` | 48×48 |

The originals in `mobile/assets/` were not changed. To use a new mark, replace the two files in `coming-soon/assets/` and keep the same filenames. Prefer a PNG logo around 512×512 and a PNG favicon around 48×48.

Colors match the app palette: home green `#1F6B4F`, mitro yellow `#F4B400`, warm neutral `#F5F1E8`, charcoal `#2E2E2E`.

## Publish with GitHub Pages

This folder lives inside the GharMitro monorepo. Publish **only** `coming-soon/` so `https://gharmitro.in/` serves `index.html` at the site root.

GitHub Pages on a free account is available for public repositories. If this repo stays private, host the files on GoDaddy instead (see below), or use a plan that includes Pages for private repos.

1. On GitHub, open the repository **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Add this workflow as `.github/workflows/coming-soon.yml` in the repository (do not put it inside `coming-soon/`):

```yaml
name: Deploy coming soon site

on:
  push:
    branches: [main]
    paths:
      - "coming-soon/**"
      - ".github/workflows/coming-soon.yml"
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Upload site
        uses: actions/upload-pages-artifact@v3
        with:
          path: coming-soon

      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

4. Push to `main`, or run the workflow with **Run workflow**.
5. When the job succeeds, the temporary site is `https://<user>.github.io/<repo>/`. The `CNAME` file in this folder asks GitHub to serve it as `gharmitro.in` once DNS is in place.

Confirm the action versions in [GitHub’s Pages deploy guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) if you add this workflow later.

## Connect gharmitro.in from GoDaddy

Keep the domain registered at GoDaddy. Point its DNS at GitHub Pages. These records are the ones GitHub documents for apex domains; recheck [GitHub’s custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) before you change DNS, in case the addresses have been updated.

1. Sign in to GoDaddy → **Domain** → **DNS** for `gharmitro.in`.
2. Remove parking or forwarding records that already use `@` or `www`.
3. Add four **A** records. Host `@`, each pointing at one address:

   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

4. Add four **AAAA** records for `@`:

   - `2606:50c0:8000::153`
   - `2606:50c0:8001::153`
   - `2606:50c0:8002::153`
   - `2606:50c0:8003::153`

5. Add a **CNAME** record. Host `www`, value `<github-user>.github.io` (your GitHub username or organization, not the repository name).
6. In the GitHub repository, open **Settings → Pages → Custom domain**, enter `gharmitro.in`, and save.
7. Wait for DNS to propagate. This often takes under an hour and can take up to 24–48 hours. Leave the default GoDaddy TTL unless you are about to switch and want a shorter TTL first.

Do not turn on GoDaddy domain forwarding at the same time. Forwarding fights the A records.

## Enable HTTPS

**GitHub Pages.** After the custom domain check succeeds, open **Settings → Pages** and turn on **Enforce HTTPS**. GitHub provisions the certificate. The checkbox can stay disabled until DNS is correct, sometimes for a few hours after the domain is verified. Visitors should then use `https://gharmitro.in`.

**GoDaddy hosting.** If you upload the site to GoDaddy web hosting instead of GitHub Pages:

1. Upload the **contents** of `coming-soon/` into `public_html`, so `index.html` is at the hosting root rather than inside another folder.
2. In the hosting dashboard, turn on the free SSL certificate (cPanel: **SSL/TLS Status**, or GoDaddy’s **Hosting → SSL**).
3. Turn on the HTTPS redirect so `http://` requests go to `https://`.

The certificate only covers the domain after DNS points at the server that requested it. Finish DNS, then enable HTTPS, then confirm the padlock on `https://gharmitro.in`.

## What this page does not include

No launch date, countdown, phone number, signup form, reviews, or statistics. The only contact action is the `mailto:hello@gharmitro.in` link.
