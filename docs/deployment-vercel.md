# Deployment (Vercel)

Vercel is the only host for redbridgeadvisory.com. The site needs a server for:

- `/api/contact`: contact form → Zoho CRM Leads
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
| `ZOHO_CLIENT_ID` | Production, Preview | `/api/contact` | Zoho Self Client ID. The three `ZOHO_*` credentials are **required in production**: without them the form returns an error (503). Locally it is mocked. |
| `ZOHO_CLIENT_SECRET` | Production, Preview | `/api/contact` | Keep secret. |
| `ZOHO_REFRESH_TOKEN` | Production, Preview | `/api/contact` | Long-lived refresh token (see Zoho CRM setup). Keep secret. |
| `ZOHO_ACCOUNTS_URL` | optional | `/api/contact` | Defaults to `https://accounts.zoho.in` (India data center). |
| `ZOHO_API_URL` | optional | `/api/contact` | Defaults to `https://www.zohoapis.in`. |
| `ZOHO_LEAD_SOURCE` | optional | `/api/contact` | Sets the Lead Source field. Must exactly match an existing picklist value, otherwise Zoho rejects the lead. |
| `GITHUB_CLIENT_ID` | Production | `/api/auth`, `/api/callback` | GitHub OAuth App for Decap CMS. |
| `GITHUB_CLIENT_SECRET` | Production | `/api/callback` | Keep secret. Never expose it to the browser (no `NEXT_PUBLIC_` prefix). |

### Zoho CRM setup (contact form leads)

Each form submission creates a record in Zoho CRM → **Leads**:

| Form field | Zoho field |
|---|---|
| First / last name | First Name / Last Name |
| Email | Email |
| Phone Number (optional) | Phone |
| Organisation | Company (`Not provided` if blank) |
| Area of Interest + message | Description |

One-time setup (India data center):

1. Open https://api-console.zoho.in → **Add Client → Self Client**. Note the Client ID and Client Secret.
2. In the Self Client, **Generate Code** with scope `ZohoCRM.modules.leads.CREATE`, any description, duration 10 minutes. Copy the code.
3. Exchange it for a refresh token within those 10 minutes:
   ```bash
   curl -X POST "https://accounts.zoho.in/oauth/v2/token?grant_type=authorization_code&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&code=CODE"
   ```
   Copy `refresh_token` from the response (it does not expire unless revoked).
4. Add `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` in Vercel (and `.env.local` to test locally), then redeploy.
5. Check the Leads layout in Zoho: any extra custom field marked mandatory will make lead creation fail (`MANDATORY_NOT_FOUND` in the Vercel function logs).
6. Optional: add a Zoho workflow rule on Leads (owner assignment, email alert). The API call triggers workflows.

### GitHub OAuth App (Decap CMS login)

GitHub → Settings → Developer settings → OAuth Apps:

- **Homepage URL:** `https://www.redbridgeadvisory.com`
- **Authorization callback URL:** `https://www.redbridgeadvisory.com/api/callback`

Open the CMS at `https://www.redbridgeadvisory.com/admin/` (the `www` host). The login popup only hands the token to the origin it runs on.

## Domain / DNS

In Vercel → Project → Settings → Domains, add `www.redbridgeadvisory.com` (primary) and `redbridgeadvisory.com` (redirect to `www`). Then point DNS at Vercel as the dashboard instructs (typically an `A` record for the apex and a `CNAME` for `www`).

## Checks after a deploy

1. Submit the contact form → a new lead appears in Zoho CRM → Leads. Delete the test lead afterwards.
2. `curl -I https://www.redbridgeadvisory.com` shows `Content-Security-Policy`, `Strict-Transport-Security`, etc.
3. `https://www.redbridgeadvisory.com/ahinsree` redirects to `/ahinsree-b`.
4. `/admin/` → "Login with GitHub" works.
