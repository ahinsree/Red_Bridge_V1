import { Metadata } from "next";

// Define the practices metadata mapping
const practicesMetadata: Record<string, { title: string; description: string }> = {
  "strategy-transformation": {
    title: "Strategy & Institution Building | Red Bridge Advisory",
    description: "Operating model design, growth strategy, restructuring, governance and capacity building for sovereign agencies and enterprises."
  },
  "ai-digital-data": {
    title: "AI, Digital & Data Advisory | Red Bridge Advisory",
    description: "Enterprise AI readiness, data governance, technology roadmaps and architecture designed with strategic judgement, not novelty."
  },
  "experience-service-design": {
    title: "Experience & Service Design | Red Bridge Advisory",
    description: "Bridging the gap between strategy and citizen/customer experience. Service design, journey mapping, and delivery frameworks."
  },
  "investment-economic-infrastructure": {
    title: "Investment & Economic Advisory | Red Bridge Advisory",
    description: "Market feasibility, detailed project reports, economic development strategy, and public-private partnerships structuring."
  },
  "entrepreneurship-innovation-startup": {
    title: "Startup & Innovation Advisory | Red Bridge Advisory",
    description: "Incubation support, start-up mission advisory, MSME development and innovation challenge designs for universities and governments."
  },
  "programme-management-monitoring": {
    title: "Programme Management & M&E | Red Bridge Advisory",
    description: "Dedicated project management units (PMU), Third-party concurrent monitoring, and independent baseline/impact evaluations."
  }
};

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = practicesMetadata[slug];
  
  if (!meta) {
    return {
      title: "Practice Area | Red Bridge Advisory",
      description: "Boutique management consulting services and advisory capabilities for institutional complexity."
    };
  }
  
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `https://www.redbridgeadvisory.com/practices/${slug}`
    }
  };
}

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
