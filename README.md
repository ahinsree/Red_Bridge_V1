# Red Bridge Advisory - Digital Core

This repository houses the corporate digital presence and interactive advisory portal for **Red Bridge Advisory**. Built using Next.js, React, Tailwind CSS, Vanilla CSS custom models, and Framer Motion.

---

## 🚀 Getting Started

To run the development server locally:

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## ✍️ Content & Portal Operations Guide

The website is designed for modern **Content Management (CMS)** and **Git-based portal operations**. You can update articles, AI chatbot interactions, navigation order, and styling options using visual dashboards or code.

### 1. Managing Insights (Content Management System)

Articles and briefings inside the **Insights** section are fully managed using **Decap CMS**. This allows non-technical editors to visually author, edit, and publish content without modifying code files.

#### A. Accessing the Content Manager
* **In Production**: Go to `https://<your-domain>/admin/` (or your live domain) and log in with your Git credentials.
* **In Local Development**: 
  1. Open a terminal inside the project directory and start the local CMS proxy:
     ```bash
     npx decap-server
     ```
  2. (Optional) In another terminal, run our zero-dependency hot-reloader watcher to automatically recompile CMS saves on the fly:
     ```bash
     node watch-insights.js
     ```
  3. In another terminal, run your normal dev server:
     ```bash
     npm run dev
     ```
  4. Navigate to `http://localhost:3000/admin/`.

#### B. Adding and Editing Essays
1. **Create New**: Click the **New Insights** button in the dashboard, or click on an existing post to edit it.
2. **Fill Collection Fields**:
   * **Title**: The primary headline for the essay.
   * **Publish Date**: The date when this essay should be chronologically listed (YYYY-MM-DD).
   * **Category**: The tag label displayed above the title (e.g. `Strategy`, `Leadership · Essay`).
   * **Featured Essay?**: Click this toggle to display this post as the large featured column on the left. (Note: Only one essay should have this toggle enabled at a time; all other essays are displayed in the links list on the right).
   * **Excerpt**: A brief summary of the essay (2-3 sentences) used on the landing card.
   * **Cover Image**: Upload an image. The CMS automatically saves the file inside the repository under `public/images/uploads/` and links it securely.
   * **Body**: The rich-text markdown editor where you write the core paragraphs of your briefing.
3. **Publishing**: Click the **Publish** button at the top of the interface.
   * *Local Dev*: Writes a formatted `.md` file under `src/data/insights/` instantly.
   * *Production*: Commits a `.md` file directly to the `main` branch of your GitHub repository. The automated **GitHub Pages action** detects the commit, runs our pre-build script to compile files, and deploys the live update in 2–3 minutes.

#### C. Manual Code Authoring (Developer-only)
Developers can skip the GUI and write markdown directly. Create a file under `src/data/insights/article-slug.md` with standard YAML frontmatter matching:
```yaml
---
title: "Your headline goes here"
date: "2026-05-31"
category: "Strategy"
featured: false
excerpt: "A brief summary of your article..."
image: "/images/uploads/your-graphic.png"
---
Your full body paragraphs here in standard Markdown.
```

### 2. Modifying the AI Chatbot responses
The floating chatbot assistant's keyword-matching rules and quick replies are managed in [src/components/Chatbot.tsx](file:///Users/ahinsree/Developer/Red_Bridge_/src/components/Chatbot.tsx).

* **Quick Reply Shortcut Buttons**: Update the `quickReplies` list near the top of the component:
  ```typescript
  const quickReplies = [
    { label: "Strategic Advisory", query: "Tell me about your Strategic Advisory services." },
    // Add or modify shortcut buttons here
  ];
  ```
* **Response Match Rules**: To add answers for new client questions, add keywords and matching replies into the `responseRules` array inside the `handleSend` function:
  ```typescript
  {
    keywords: ["pricing", "cost", "rates", "fees"],
    response: "Our advisory engagements are custom-scoped..."
  }
  ```

### 3. Organizing Header Navigation Order
To change the visual ordering or naming of links in the navigation bar, modify the `navLinks` list in [src/components/Header.tsx](file:///Users/ahinsree/Developer/Red_Bridge_/src/components/Header.tsx):

```typescript
const navLinks = [
  { name: "Solutions", href: "#services" },
  { name: "Industries", href: "#industries" },
  // ...
];
```

---

## 🛠️ Verification & Deployment

Before pushing changes to GitHub, always verify type safety and formatting guidelines:

```bash
# Run type check compiler
npx tsc --noEmit

# Run code linter
npm run lint
```

When changes are pushed to the `main` branch, the GitHub Actions deployment pipeline automatically compiles and deploys the production bundle to GitHub Pages.

---

## 💎 Recent Core Updates

Here are the latest portal enhancements:

1. **Header Navigation Scroll Alignment**: Reordered header menu links (`Solutions` ➔ `Industries` ➔ `What We Do` ➔ `Case Studies` ➔ `Insights` ➔ `About`) to match the exact visual scroll order of the page.
2. **Insights Ledger Section**: Created a 2x2 grid of thought leadership research papers with article summary cards, read-time indices, and slide-in hover-effects.
3. **Externalized Data Ingestion**: Decoupled content rendering in the Insights component from raw data by moving the articles database to a dedicated TS configuration module.
4. **Insights Graphic Integrations**: Added support for high-end, responsive illustrations for each article, with automatic hover zoom animations.
5. **AI Chatbot Response Expansion**: Upgraded the digital assistant with shortcut panels and rule-based query mappings for client pricing model inquiries, vertical coverage, case studies, and careers.
6. **Editorial About Section**: Implemented the corporate narrative with customized glassmorphism cards explaining the radical integration, scientific precision, and delivery sprint standards.
7. **Relative Publication Dates**: Configured relative integer publication dates (`daysAgo` parameter) that automatically compute dates dynamically, ensuring content is always fresh.
8. **Interactive Briefing Slide Drawers**: Built slide-in right drawer components inside **Insights**, **Industries**, and **Solutions (Capabilities)** sections using Framer Motion spring physics. Cards show dynamic briefings on click.
9. **Dynamic Reading Time Indicators**: Replaced static read time fields with a calculator module running at an industry-standard 200 WPM to auto-compute read-times from paragraph arrays.
10. **Header Brand Leftward Alignment**: Shifted the brand logo slightly leftwards (`-ml-3 md:-ml-6`) to optically align it flush with the left border of the text blocks.
11. **Employee Experience (EX) Re-alignment**: Aligned workforce velocity articles with Employee Experience corporate values, addressing internal environment friction.
12. **Agentic Compliance Asset Refinement**: Updated the Agentic AI compliance framework illustration asset (`public/images/insight_agentic.png`) to improve visual fidelity.
13. **Contact Form Submission Capturing**: Wired the advisory briefing request form to print lead details to the browser console and cache them in the client's `localStorage` under `contact_submissions` with timestamps for easy local verification.
14. **Solutions Drawer 3D Centering & Parallax**: Centered the 3D WebGL canvas within the Solutions slide-drawer and enabled complete cursor hover-to-rotate tilt interactions inside the drawer by wrapping it in the dynamic 3D card layout context.
15. **Live Google Sheets API Integration**: Connected the corporate briefing request form to your Google Sheets macro API endpoint, enabling secure asynchronous submissions directly to your live spreadsheet.
16. **Secure API Routing & Environment Variables**: Secured sensitive spreadsheet Web App credentials by migrating them to a server-side environment file (`.env.local`) ignored by Git, and proxying submission calls through a dedicated, local Next.js server API endpoint (`/api/contact`).





