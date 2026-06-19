# Red Bridge Advisory Website: Deployment & CMS OAuth Setup

This document records the changes made to optimize image assets and configure the custom domain and CMS backend.

---

## 1. Image Optimization & Core Web Vitals
To resolve the `@next/next/no-img-element` warning, all raw `<img>` tags were replaced with the Next.js `<Image />` component from `next/image` in the following files:
* `src/components/Hero.tsx` (background, prioritized for LCP)
* `src/components/Insights.tsx` (featured cover and drawer covers)
* `src/components/ContactForm.tsx` (parallax background)
* `src/components/VisualPause.tsx` (parallax break background)

For background photos, we used the `fill` layout with matching CSS wrapper dimensions (`position: relative` or `position: absolute`) and appropriate responsive `sizes` (e.g., `100vw`).

---

## 2. Production Environment Settings
We updated `next.config.ts` to adapt to root custom domain hosting on Vercel:
* **`basePath`:** Changed to `""` (empty string) so assets load from `https://www.redbridgeadvisory.com/` instead of a subdirectory.
* **`output`:** Removed `"export"` (static HTML export) to enable Vercel serverless function support, which is required for API routes (contact form submission and OAuth authentication).

---

## 3. GoDaddy Custom Domain DNS Setup
To point the custom domain `redbridgeadvisory.com` to Vercel, the following records must be set in your GoDaddy DNS settings:

| Record Type | Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `216.198.79.1` (Vercel new IP) | 1 Hour |
| **CNAME** | `www` | `cname.vercel-dns.com` | 1 Hour |

*Note: Delete any duplicate A records pointing to old IP addresses to prevent invalid configuration errors.*

---

## 4. Native Decap CMS Setup & GitHub OAuth
Next.js App Router on Vercel intercepts nested static HTML files (like `/admin/index.html` inside `public/`) and returns 404 errors. To solve this, we migrated the CMS setup:

* **CMS Routing:** Moved the CMS dashboard from `public/admin/index.html` to a Next.js client-side route: `src/app/admin/page.tsx`.
* **OAuth Serverless Backend:** Since Vercel doesn't have a free OAuth gateway like Netlify, we created custom API routes to exchange authorization codes with GitHub securely:
  * `src/app/api/auth/route.ts` - Redirects the login popup to GitHub's OAuth authorize page.
  * `src/app/api/callback/route.ts` - Exchanges the OAuth code for an access token and passes it back to Decap CMS via `postMessage`.
* **Config Update:** Configured `public/admin/config.yml` to point to these endpoints:
  ```yaml
  backend:
    name: github
    repo: ahinsree/Red_Bridge_V1
    branch: main
    base_url: https://www.redbridgeadvisory.com
    auth_endpoint: api/auth
  ```

### GitHub OAuth Setup Instructions
If you ever need to recreate the GitHub OAuth Application:
1. Go to **GitHub Settings** > **Developer Settings** > **OAuth Apps** > **New OAuth App**.
2. Set the **Homepage URL** to `https://www.redbridgeadvisory.com`.
3. Set the **Authorization callback URL** to `https://www.redbridgeadvisory.com/api/callback`.
4. Register the app, generate a Client Secret, and set these as Environment Variables on your Vercel project dashboard:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`

---

## 5. Search Engine & AI Model Optimization (AISO / GEO)
We have optimized the site for standard search engines (Google, Bing) and AI search crawlers (ChatGPT, Claude, Gemini, Perplexity) to improve visibility and ensure correct information retrieval:

* **Sitemap and Crawl Settings (`src/app/sitemap.ts`):** Defines root routes for indexers to scan the site.
* **AI Bot Permissive `robots.txt` (`src/app/robots.ts`):** Explicitly lists major AI user-agents (`GPTBot`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`, `Applebot-Extended`) and authorizes them to crawl the domain while securing `/admin` and `/api/`.
* **JSON-LD Schema Markup (`src/app/layout.tsx`):** Injects a structured `ProfessionalService` Schema.org JSON block to describe Red Bridge Advisory, its address, logo, and core service categories. AI engines rely heavily on this metadata to build their knowledge bases.
* **Visually Hidden AISO Crawl Container (`src/components/Insights.tsx`):** Because your full insight essay bodies are normally hidden inside a conditional React drawer (making them invisible to non-interactive bots), we created a visually hidden SEO/AISO `sr-only` container. This renders all text essays statically in the DOM, allowing search engine and AI crawlers to fully index the entire content of every publication.
