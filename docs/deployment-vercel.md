# Deployment (Vercel)

Vercel is the only host for redbridgeadvisory.com. The site needs a server for:

- `/api/contact`: contact form → Google Sheets
- `/api/auth`, `/api/callback`: Decap CMS GitHub login
- `redirects()` and security `headers()` in `next.config.ts`
- `next/image` optimization (AVIF/WebP, resized per device)

None of these work on static hosts such as GitHub Pages.

## How deploys happen

- **Production:** every push to `main` (including CMS publishes, which commit to `main`) triggers a Vercel build.
- **Previews:** every other branch or PR gets its own preview URL.
- **Build command:** `npm run build`. `prebuild` runs `compile-insights.js`, which regenerates `src/data/insights.json` from `src/data/insights/*.md`.
- **Framework preset:** Next.js. No `vercel.json` needed.

## Environment variables

Set in Vercel → Project → Settings → Environment Variables. Copy `.env.example` to `.env.local` for local development.

| Variable | Environments | Used by | Notes |
|---|---|---|---|
| `GOOGLE_SCRIPT_URL` | Production, Preview | `/api/contact` | Google Apps Script web-app URL that appends a row to the leads sheet. **Required in production**: without it the form returns an error (503). Locally it is mocked. |
| `GITHUB_CLIENT_ID` | Production | `/api/auth`, `/api/callback` | GitHub OAuth App for Decap CMS. |
| `GITHUB_CLIENT_SECRET` | Production | `/api/callback` | Keep secret. Never expose it to the browser (no `NEXT_PUBLIC_` prefix). |

### GitHub OAuth App (Decap CMS login)

GitHub → Settings → Developer settings → OAuth Apps:

- **Homepage URL:** `https://www.redbridgeadvisory.com`
- **Authorization callback URL:** `https://www.redbridgeadvisory.com/api/callback`

Open the CMS at `https://www.redbridgeadvisory.com/admin/` (the `www` host). The login popup only hands the token to the origin it runs on.

## Domain / DNS

In Vercel → Project → Settings → Domains, add `www.redbridgeadvisory.com` (primary) and `redbridgeadvisory.com` (redirect to `www`). Then point DNS at Vercel as the dashboard instructs (typically an `A` record for the apex and a `CNAME` for `www`).

## Checks after a deploy

1. Submit the contact form → a row appears in the Google Sheet.
2. `curl -I https://www.redbridgeadvisory.com` shows `Content-Security-Policy`, `Strict-Transport-Security`, etc.
3. `https://www.redbridgeadvisory.com/ahinsree` redirects to `/ahinsree-b`.
4. `/admin/` → "Login with GitHub" works.
