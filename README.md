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
  readTime: "6 Min Read",                      // Read time indicator
  date: "Oct 24, 2025",                        // Date of publication
  title: "The Slide Deck Fallacy...",          // Main headline
  summary: "Traditional advisory firms...",    // Brief description (2-3 sentences)
  author: "Red Bridge Research",               // Author signature
  imageUrl: "/images/insight_strategy.png",    // Optional: relative path to public graphic asset
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
