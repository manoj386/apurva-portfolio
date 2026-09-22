# Apurva Vyas — DevOps & Cloud Engineer Portfolio

A premium, dark-themed, single-page portfolio built with plain HTML/CSS/JS — no build step, no framework, fully static.

## Structure

```
.
├── index.html      # All page markup & sections
├── style.css       # Dark theme, blue-accent design system, animations, responsive layout
├── script.js       # Scroll reveals, nav behavior, typing effect, counters, masked contact
└── vercel.json     # Static hosting config (clean URLs, security headers)
```

## Sections

Hero · About · Experience Timeline · Technical Skills · Projects · Achievements · Education · Contact

## Privacy / Contact masking

- **Phone number is not displayed anywhere** on the site.
- **Email is not present as plain text** in the page source. It's reconstructed at runtime from character codes only when the visitor clicks the reveal (eye) icon in the Contact section, to deter bot/scraper harvesting while staying usable for real recruiters.
- LinkedIn is linked directly since it's a public professional profile.

## Deploy to Vercel

### Option A — Vercel CLI
```bash
npm i -g vercel
cd Cyberportfolio
vercel        # preview deploy
vercel --prod # production deploy
```

### Option B — Git + Vercel Dashboard
1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Other** (static site) — no build command needed.
4. Deploy.

### Option C — Drag & drop
Go to [vercel.com/new](https://vercel.com/new) → drag the project folder into the browser.

No environment variables, build step, or backend are required — it's 100% static.

## Local preview

Just open `index.html` in a browser, or serve it locally:
```bash
npx serve .
```
