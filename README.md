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

The website is designed for **Git-based content management** (short-term, low-frequency updates). You can update text, articles, navigation order, and interactive AI responses directly inside the codebase.

### 1. Managing Insights (Briefings & Articles)
Articles listed in the **Insights Ledger** are managed in [src/data/insights.ts](file:///Users/ahinsree/Developer/Red_Bridge_/src/data/insights.ts). 

To add or update an article, open that file and add a new entry to the `insightsData` array matching the schema:

```typescript
{
  id: "article-slug-url-safe",                 // Unique string id (e.g. "my-article")
  category: "Strategic Governance",            // Category tag displayed above title
  daysAgo: 2,                                  // Number of days ago published (used for relative date generation)
  title: "The Slide Deck Fallacy...",          // Main headline
  summary: "Traditional advisory firms...",    // Brief description (2-3 sentences)
  author: "Red Bridge Research",               // Author signature
  imageUrl: "/images/insight_strategy.png",    // Optional: relative path to public graphic asset
  content: [                                   // Paragraph content text array for detail drawer
    "Traditional advisory firms deliver...",
    "..."
  ]
}
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
10. **Live System Clock Widget**: Embedded a real-time running clock widget inside the portal header menu that matches local time formats (`HH:MM:SS AM/PM • DD MMM YYYY`).
11. **Header Brand Leftward Alignment**: Shifted the brand logo slightly leftwards (`-ml-3 md:-ml-6`) to optically align it flush with the left border of the text blocks.
12. **Employee Experience (EX) Re-alignment**: Aligned workforce velocity articles with Employee Experience corporate values, addressing internal environment friction.
13. **Agentic Compliance Asset Refinement**: Updated the Agentic AI compliance framework illustration asset (`public/images/insight_agentic.png`) to improve visual fidelity.
14. **Contact Form Submission Capturing**: Wired the advisory briefing request form to print lead details to the browser console and cache them in the client's `localStorage` under `contact_submissions` with timestamps for easy local verification.
15. **Solutions Drawer 3D Centering & Parallax**: Centered the 3D WebGL canvas within the Solutions slide-drawer and enabled complete cursor hover-to-rotate tilt interactions inside the drawer by wrapping it in the dynamic 3D card layout context.
16. **Live Google Sheets API Integration**: Connected the corporate briefing request form to your Google Sheets macro API endpoint, enabling secure asynchronous submissions directly to your live spreadsheet.
17. **Secure API Routing & Environment Variables**: Secured sensitive spreadsheet Web App credentials by migrating them to a server-side environment file (`.env.local`) ignored by Git, and proxying submission calls through a dedicated, local Next.js server API endpoint (`/api/contact`).





