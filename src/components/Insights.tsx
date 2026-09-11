"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import insightsData from "@/data/insights.json";

interface InsightPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  featured: boolean;
  excerpt: string;
  image?: string;
  body: string;
}

const categoryImages: Record<string, string> = {
  "leadership": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  "strategy": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
  "ai": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  "digital": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  "experience": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
  "investment": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "infrastructure": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "startup": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
};

const getPostImage = (post: InsightPost): string => {
  if (post.image && post.image.trim() !== "") return post.image;
  
  const catLower = post.category.toLowerCase();
  for (const [key, url] of Object.entries(categoryImages)) {
    if (catLower.includes(key)) {
      return url;
    }
  }
  return "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80";
};

const filterCategories = [
  "Featured",
  "Thought Leadership",
  "Strategy",
  "AI & Digital",
  "Governance",
  "Policy"
];

export default function Insights() {
  const [activePost, setActivePost] = useState<InsightPost | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Featured");
  const [scrollProgress, setScrollProgress] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  const typedInsights = insightsData as InsightPost[];

  // Filter posts based on selected category pill
  const filteredPosts = typedInsights.filter((post) => {
    if (activeFilter === "Featured") return true;
    const catLower = post.category.toLowerCase();
    const filterLower = activeFilter.toLowerCase();
    return catLower.includes(filterLower) || filterLower.includes(catLower);
  });

  const featuredPost = filteredPosts.find((post) => post.featured) || filteredPosts[0] || typedInsights[0];
  const secondaryPosts = filteredPosts.filter((post) => post.slug !== featuredPost?.slug).slice(0, 2);

  const calculateReadTime = (text: string): string => {
    if (!text) return "1 min read";
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  useEffect(() => {
    setScrollProgress(0);
  }, [activePost]);

  const handleScroll = () => {
    const el = drawerRef.current;
    if (!el) return;
    const totalHeight = el.scrollHeight - el.clientHeight;
    if (totalHeight > 0) {
      setScrollProgress((el.scrollTop / totalHeight) * 100);
    }
  };

  const renderParagraphs = (bodyText: string) => {
    if (!bodyText) return null;
    const items = bodyText.split(/\r?\n\r?\n/).map((p) => p.trim()).filter(Boolean);

    return items.map((p, idx) => {
      if (p.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-[17px] md:text-[19px] font-serif font-medium text-cream mt-10 mb-5 border-l-2 border-[#B22030] pl-4 leading-snug">
            {p.replace(/^###\s+/, "")}
          </h4>
        );
      }
      if (p.startsWith("## ")) {
        return (
          <h3 key={idx} className="text-[20px] md:text-[22px] font-serif font-medium text-cream mt-12 mb-5 border-l-2 border-[#B22030] pl-4 leading-snug">
            {p.replace(/^##\s+/, "")}
          </h3>
        );
      }
      if (p.startsWith("> ")) {
        return (
          <blockquote key={idx} className="border-l-2 border-[#B22030] bg-white/[0.03] pl-6 py-4 pr-4 italic my-8 text-cream/90 rounded-r text-[13.5px] md:text-[14.5px] leading-relaxed shadow-sm">
            “{p.replace(/^>\s+/, "").replace(/"/g, "")}”
          </blockquote>
        );
      }
      if (p.includes("\n- ") || p.startsWith("- ")) {
        const listLines = p.split(/\n?- /).map(item => item.trim()).filter(Boolean);
        return (
          <ul key={idx} className="list-none space-y-4 my-6 pl-1">
            {listLines.map((item, i) => {
              const boldMatch = item.match(/^\*\*(.*?)\*\*:(.*)$/);
              if (boldMatch) {
                return (
                  <li key={i} className="text-[13.5px] md:text-[14px] leading-relaxed text-cream/80 flex items-start gap-3">
                    <span className="text-[#B22030] font-bold mt-0.5">•</span>
                    <span>
                      <strong className="text-cream font-medium">{boldMatch[1]}:</strong>{" "}
                      <span className="text-cream/70">{boldMatch[2].trim()}</span>
                    </span>
                  </li>
                );
              }
              return (
                <li key={i} className="text-[13.5px] md:text-[14px] leading-relaxed text-cream/80 flex items-start gap-3">
                  <span className="text-[#B22030] font-bold mt-0.5">•</span>
                  <span className="text-cream/70">{item}</span>
                </li>
              );
            })}
          </ul>
        );
      }
      return (
        <p key={idx} className="text-[14px] md:text-[14.5px] text-cream/75 leading-[1.85] mb-6 tracking-wide font-sans">
          {p}
        </p>
      );
    });
  };

  return (
    <section className="py-24 md:py-36 bg-[#FAFAF8]" id="insights">
      <div className="container mx-auto px-6 md:px-12 max-w-[1440px]">
        
        {/* Section Header & Filter Pills */}
        <div className="mb-12 reveal">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-zinc-200/80">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#B22030] uppercase font-bold mb-3 block">
                INSIGHTS & PERSPECTIVES
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#09090b] font-medium tracking-tight">
                Latest insights, reports and strategy briefs
              </h2>
            </div>
            
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#B22030] uppercase tracking-wider hover:text-zinc-900 transition-colors"
            >
              <span>Explore All Publications</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-3 flex-wrap">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-250 cursor-pointer border ${
                  activeFilter === cat
                    ? "bg-[#B22030] text-white border-[#B22030] shadow-md"
                    : "bg-white text-zinc-700 border-zinc-200 hover:border-[#B22030] hover:text-[#B22030]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grant Thornton Bharat Grid Layout (2fr 1fr 1fr -> Featured Hero + 2 Secondary Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch reveal d1">
          
          {/* Featured Wide Card (Spans 2 columns on desktop) */}
          {featuredPost && (
            <article
              onClick={() => setActivePost(featuredPost)}
              className="group relative lg:col-span-2 min-h-[440px] flex flex-col justify-end rounded-[20px] overflow-hidden bg-zinc-950 cursor-pointer border border-zinc-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_32px_-4px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-[380ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform"
            >
              {/* Full Bleed Image with Zoom */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={getPostImage(featuredPost)}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover opacity-85 transition-transform duration-[550ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f071e] via-[#0f071e]/60 to-transparent" />
              </div>

              {/* Featured Card Overlay Content Stack */}
              <div className="relative z-10 p-8 sm:p-10 text-white">
                <span className="text-xs font-mono font-bold tracking-widest text-[#f0808a] uppercase mb-3 block">
                  {featuredPost.category} • FEATURED BRIEF
                </span>
                
                <h3 className="text-2xl sm:text-3.5xl font-serif font-bold leading-tight mb-3 group-hover:text-white transition-colors">
                  {featuredPost.title}
                </h3>
                
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans mb-6 max-w-2xl line-clamp-2">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/20 text-xs font-mono text-zinc-300">
                  <span>{calculateReadTime(featuredPost.body)} | {featuredPost.date}</span>
                  <span className="inline-flex items-center gap-1.5 text-white font-bold group-hover:text-[#f0808a] transition-colors">
                    Read Essay <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* Standard Secondary Cards Stack (1 Column) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {secondaryPosts.map((post) => (
              <article
                key={post.slug}
                onClick={() => setActivePost(post)}
                className="group flex flex-col flex-1 rounded-[20px] overflow-hidden bg-white cursor-pointer border border-zinc-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_32px_-4px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-[380ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform"
              >
                {/* Top Image Container */}
                <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden bg-zinc-900 shrink-0">
                  <Image
                    src={getPostImage(post)}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover opacity-90 transition-transform duration-[550ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Standard Content Block */}
                <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#B22030] uppercase mb-2 block">
                      {post.category}
                    </span>
                    <h4 className="text-lg font-serif font-bold text-zinc-900 leading-snug mb-3 group-hover:text-[#B22030] transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h4>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>{calculateReadTime(post.body)} | {post.date}</span>
                    <ArrowUpRight size={14} className="text-[#B22030] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>

      {/* Slide-out detail drawer for reading full essay content */}
      <AnimatePresence>
        {activePost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />

            <motion.div
              ref={drawerRef}
              onScroll={handleScroll}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[720px] lg:w-[820px] max-w-[92vw] bg-[#0c101b] border-l border-white/10 z-50 insight-drawer overflow-y-auto flex flex-col justify-between shadow-2xl text-cream p-8 sm:p-12"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-50">
                <div 
                  className="h-full bg-[#B22030] transition-all duration-75"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#B22030] uppercase font-bold">
                    {activePost.category} • Strategic Briefing
                  </span>
                  <button
                    onClick={() => setActivePost(null)}
                    className="text-cream/70 hover:text-cream transition-colors p-2 rounded-full bg-white/5 hover:bg-white/10 cursor-pointer border-none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative w-full h-64 mb-8 overflow-hidden rounded-xl border border-white/10 bg-black/45">
                  <Image
                    src={getPostImage(activePost)}
                    alt={activePost.title}
                    fill
                    sizes="(max-width: 720px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>

                <div className="inline-flex items-center gap-3 text-[10.5px] font-mono text-cream/70 mb-5 bg-white/5 py-1.5 px-3.5 rounded-full border border-white/10">
                  <span>{activePost.date}</span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#B22030]" />
                    {calculateReadTime(activePost.body)}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3.5xl font-serif text-cream font-medium leading-tight mb-8">
                  {activePost.title}
                </h3>

                <div className="space-y-6 text-sm text-cream/80 leading-relaxed font-sans">
                  {renderParagraphs(activePost.body)}
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-white/10 text-[10px] font-mono text-cream/40 uppercase flex justify-between items-center">
                <span>Authored by Red Bridge Advisory</span>
                <span className="text-[#B22030] font-semibold">Red Bridge Research</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SEO hidden index */}
      <div className="sr-only" aria-hidden="true" style={{ display: "none" }}>
        {typedInsights.map((post) => (
          <article key={post.slug}>
            <h2>{post.title}</h2>
            <p>Category: {post.category}</p>
            <p>Published: {post.date}</p>
            <div>{post.excerpt}</div>
            <div>{post.body}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

