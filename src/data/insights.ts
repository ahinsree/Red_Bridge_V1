export interface InsightArticle {
  id: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  summary: string;
  author: string;
  imageUrl?: string;
}

export const insightsData: InsightArticle[] = [
  {
    id: "slide-deck-fallacy",
    category: "Strategic Governance",
    readTime: "6 Min Read",
    date: "Oct 24, 2025",
    title: "The Slide Deck Fallacy: Re-aligning Strategy to Codebase Reality",
    summary: "Traditional advisory firms deliver beautiful strategic slide decks that fail in production. We argue that corporate strategy must be written directly into operating workflows and system architectures to execute successfully.",
    author: "Red Bridge Research",
    imageUrl: "/images/insight_strategy.png",
  },
  {
    id: "sub-second-telemetry",
    category: "Data Platforms",
    readTime: "8 Min Read",
    date: "Nov 18, 2025",
    title: "Architecting Sub-12ms Telemetry Fabrics for Real-Time Experience Loops",
    summary: "How to design data ingestion pipelines that capture user behavior telemetry, clean signal noise, and deliver structured ML scoring predictions in under 12ms.",
    author: "Systems Architecture Cluster",
    imageUrl: "/images/insight_telemetry.png",
  },
  {
    id: "workforce-velocity",
    category: "Organizational Velocity",
    readTime: "5 Min Read",
    date: "Jan 12, 2026",
    title: "Developer Experience & Workforce Churn: The EX/CX Correlation Ledger",
    summary: "Correlating employee satisfaction and tooling speed directly to client satisfaction. Re-engineering internal developer pipelines can reduce engineering staff turnover by up to 62%.",
    author: "Experience Optimization Group",
    imageUrl: "/images/insight_devex.png",
  },
  {
    id: "agentic-compliance",
    category: "Agentic AI Systems",
    readTime: "7 Min Read",
    date: "Mar 05, 2026",
    title: "Agentic Compliance: Risk Management & Guardrails in LLM Workflows",
    summary: "As autonomous agent networks deploy inside enterprise data fabrics, setting strict compliance boundaries, state limits, and governance checks becomes the primary bottleneck to scaling.",
    author: "AI Risk Advisory Desk",
    imageUrl: "/images/insight_agentic.png",
  },
];
