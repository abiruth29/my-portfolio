# 🚀 Deploy to Vercel — Step by Step

## Prerequisites
- A GitHub account
- A Vercel account (free at vercel.com — sign up with GitHub)

---

## Step 1 — Push your portfolio to GitHub

Open a terminal in the `MyPage` folder and run:

```bash
git init
git add .
git commit -m "feat: portfolio v2 — full redesign"
git branch -M main
git remote add origin https://github.com/abiruth29/my-portfolio.git
git push -u origin main
```

> Create the repo first at https://github.com/new  
> Name: `my-portfolio` | Visibility: Public | No README

---

## Step 2 — Deploy on Vercel

1. Go to **https://vercel.com** and sign in with GitHub
2. Click **"Add New → Project"**
3. Click **"Import"** next to your `my-portfolio` repository
4. Vercel auto-detects Vite — settings will be pre-filled:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **"Deploy"** — done in ~30 seconds!

---

## Step 3 — Set a custom domain (optional)

1. In Vercel dashboard → your project → **Settings → Domains**
2. Add a domain like `abiruth.dev` (buy from Namecheap/GoDaddy)
3. Or use the free Vercel subdomain: `your-project.vercel.app`

---

## Step 4 — Auto-deploys on every push

Every `git push` to `main` automatically triggers a new deployment.  
Vercel also creates preview URLs for every pull request.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server at localhost:5173 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `git push origin main` | Triggers Vercel auto-deploy |

---

## Vercel Config (already set via vite.config.js — no changes needed)

If you ever need a `vercel.json`, here it is:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This handles client-side routing for React.
