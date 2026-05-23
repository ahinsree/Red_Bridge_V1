export interface InsightArticle {
  id: string;
  category: string;
  daysAgo: number;
  title: string;
  summary: string;
  author: string;
  imageUrl?: string;
  content: string[];
}

export const insightsData: InsightArticle[] = [
  {
    id: "slide-deck-fallacy",
    category: "Strategic Governance",
    daysAgo: 2,
    title: "The Slide Deck Fallacy: Re-aligning Strategy to Codebase Reality",
    summary: "Traditional advisory firms deliver beautiful strategic slide decks that fail in production. We argue that corporate strategy must be written directly into operating workflows and system architectures to execute successfully.",
    author: "Red Bridge Research",
    imageUrl: "/images/insight_strategy.png",
    content: [
      "Traditional advisory firms deliver beautiful strategic slide decks that fail in production. We argue that corporate strategy must be written directly into operating workflows and system architectures to execute successfully.",
      "When strategy remains locked inside PowerPoint presentation decks, product and engineering teams are left to interpret high-level business goals without structural alignment. This disconnect results in lost velocity, technical debt, and system architectures that do not match the business's real-world intent.",
      "To bridge this gap, modern enterprises must adopt a codebase-first strategy model. This means translating board-level strategy into formal API schemas, executable architecture diagrams, and system telemetry loops that track strategic outcomes directly in the codebase. When the code itself reflects the strategy, transformation ceases to be a slideshow and becomes an operational reality."
    ],
  },
  {
    id: "sub-second-telemetry",
    category: "Data Platforms",
    daysAgo: 5,
    title: "Architecting Sub-12ms Telemetry Fabrics for Real-Time Experience Loops",
    summary: "How to design data ingestion pipelines that capture user behavior telemetry, clean signal noise, and deliver structured ML scoring predictions in under 12ms.",
    author: "Systems Architecture Cluster",
    imageUrl: "/images/insight_telemetry.png",
    content: [
      "Capturing user intent signals and responding to them in real time is the hallmark of modern experience architecture. However, doing so requires engineering telemetry fabrics capable of processing billions of events under extremely tight latency thresholds.",
      "To achieve sub-12ms response times, experience systems must bypass traditional monolithic middleware databases. We outline a modular stream-inggestion architecture using high-performance message queues, distributed in-memory caching layers, and lightweight ML scoring endpoints deployed at the network edge.",
      "By optimizing pipeline serialization formats and using direct memory-mapped streams, enterprises can clean raw telemetry noise and score user intents concurrently, triggering personalized experience responses before the browser paint cycle finishes."
    ],
  },
  {
    id: "workforce-velocity",
    category: "Organizational Velocity",
    daysAgo: 14,
    title: "Developer Experience & Workforce Churn: The EX/CX Correlation Ledger",
    summary: "Correlating employee satisfaction and tooling speed directly to client satisfaction. Re-engineering internal developer pipelines can reduce engineering staff turnover by up to 62%.",
    author: "Experience Optimization Group",
    imageUrl: "/images/insight_devex.png",
    content: [
      "It is an open secret in enterprise management that internal system friction degrades client-facing software quality. We establish a direct statistical correlation between developer experience (EX) metrics and customer experience (CX) indices.",
      "When developer environments are slow, deployment pipelines are fragile, and feedback loops are long, developer velocity plummets. This environment breeds developer fatigue, leading to increased software bugs and workforce turnover. Our telemetry indicates that optimizing build times and CI/CD pipelines directly impacts external NPS scores.",
      "By investing in robust local virtualization tools, automating compliance workflows, and reducing compile-to-deploy loop latencies, enterprise systems can reduce developer friction, lower engineering staff turnover by up to 62%, and deliver cleaner software to clients."
    ],
  },
  {
    id: "agentic-compliance",
    category: "Agentic AI Systems",
    daysAgo: 30,
    title: "Agentic Compliance: Risk Management & Guardrails in LLM Workflows",
    summary: "As autonomous agent networks deploy inside enterprise data fabrics, setting strict compliance boundaries, state limits, and governance checks becomes the primary bottleneck to scaling.",
    author: "AI Risk Advisory Desk",
    imageUrl: "/images/insight_agentic.png",
    content: [
      "As autonomous AI agent networks are deployed directly into enterprise database systems, managing model behaviors, outputs, and authorization scopes becomes the primary security constraint to scaling.",
      "Agentic compliance involves establishing strict validation layers and state limits around AI model prompts and outputs. We detail a multi-layered guardrail architecture featuring real-time input sanitizers, compliance verification models, and immutable audit logs.",
      "By enforcing deterministic checks around non-deterministic LLM generations, enterprise risk desks can confidently delegate complex database read/write permissions to autonomous agents without risking data leaks or policy violations."
    ],
  },
];
