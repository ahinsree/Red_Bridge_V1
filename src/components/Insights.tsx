"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Clock, Calendar } from "lucide-react";
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

export default function Insights() {
  const [activePost, setActivePost] = useState<InsightPost | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("All");
  const drawerRef = useRef<HTMLDivElement>(null);

  const typedInsights = insightsData as InsightPost[];

  // Define Category Tabs
  const tabs = ["All", "Thought leadership", "Articles", "Newsletters", "Case Study", "Podcast"];

  // Filter posts mapping to ensure at least one post is present on every tab for visual transition demo
  const filteredPosts = typedInsights.filter((post) => {
    if (activeTab === "All") return true;
    const tabLower = activeTab.toLowerCase();
    const catLower = post.category.toLowerCase();
    
    if (tabLower === "thought leadership") {
      return catLower.includes("leadership") || catLower.includes("strategy");
    }
    if (tabLower === "articles") {
      return catLower.includes("essay") || catLower.includes("digital");
    }
    if (tabLower === "newsletters") {
      return post.slug === "execution-gap-policy";
    }
    if (tabLower === "case study") {
      return post.slug === "ai-readiness-adoption";
    }
    if (tabLower === "podcast") {
      return post.slug === "quiet-crisis-leadership";
    }
    return false;
  });

  // Calculate dynamic reading time based on body text length (200 words per minute)
  const calculateReadTime = (text: string): string => {
    if (!text) return "1 min read";
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Reset scroll progress when active post changes
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

  // Shared Animation Configs for high-end micro-interactions
  const cardSpringConfig = { type: "spring" as const, stiffness: 300, damping: 25 };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: cardSpringConfig }
  };

  const contentVariants = {
    initial: { y: 0 },
    hover: { 
      y: -12, 
      boxShadow: "0 -15px 30px rgba(9, 9, 11, 0.05)",
      transition: cardSpringConfig 
    }
  };

  return (
    <section className="bg-[#fafafa] py-24 relative overflow-hidden transition-colors duration-300" id="insights">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Centered Editorial Header Block */}
        <header className="mb-16 text-center max-w-2xl mx-auto reveal">
          <span className="text-[10px] font-mono tracking-widest text-[#B22030] uppercase font-bold mb-4 block">
            RED BRIDGE BRIEFINGS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-zinc-900 font-medium tracking-tight mb-4 leading-tight">
            Explore our insights
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed font-sans max-w-lg mx-auto">
            Read reports, case studies, and corporate briefs detailing strategy, delivery, and technology execution.
          </p>
        </header>

        {/* Center-aligned Interactive Filter Tabs Pill Bar */}
        <div className="flex justify-center mb-16 reveal d1">
          <div className="inline-flex flex-wrap justify-center gap-1 bg-zinc-100/80 p-1.5 rounded-2xl md:rounded-full border border-zinc-200/50 shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 rounded-xl md:rounded-full text-[10.5px] font-sans font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                  activeTab === tab ? "text-white" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                <span className="relative z-10">{tab === "All" ? "All Content" : tab}</span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#B22030] rounded-xl md:rounded-full z-0 shadow-md shadow-[#B22030]/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Centered Flex Card Layout with CLS stability */}
        <div className="min-h-[500px]">
          <motion.div 
            layout 
            className="flex flex-wrap justify-center gap-8 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.article
                  layout
                  key={post.slug}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3 }}
                  whileHover="hover"
                  className="relative h-[450px] rounded-[24px] overflow-hidden border border-zinc-200/60 bg-white group cursor-pointer w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-sm"
                >
                  {/* Absolute Image Layer */}
                  <div className="absolute top-0 left-0 w-full h-[58%] overflow-hidden bg-zinc-50 border-b border-zinc-100">
                    <motion.div
                      variants={imageVariants}
                      className="w-full h-full relative"
                      initial="initial"
                    >
                      <Image
                        src={getPostImage(post)}
                        alt={post.title}
                        fill
                        sizes="(max-width: 760px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </div>

                  {/* Floating Content Card */}
                  <motion.div
                    variants={contentVariants}
                    initial="initial"
                    className="absolute bottom-[-20px] left-0 right-0 h-[50%] bg-white rounded-t-[24px] p-6 md:p-8 pb-12 shadow-[0_-8px_30px_rgba(9,9,11,0.03)] border-t border-zinc-100 flex flex-col justify-between z-10"
                  >
                    <div>
                      {/* Category Tag */}
                      <span className="text-[9px] font-mono tracking-widest text-[#B22030] uppercase mb-2 block font-bold">
                        {post.category.split(" · ")[0]}
                      </span>

                      {/* Title Text */}
                      <h3 className="text-base md:text-lg font-serif font-bold text-zinc-900 leading-snug mb-2 line-clamp-2 group-hover:text-[#B22030] transition-colors duration-300">
                        <a href="#insights" onClick={(e) => { e.preventDefault(); setActivePost(post); }}>
                          {post.title}
                        </a>
                      </h3>

                      {/* Snippet Body */}
                      <p className="text-[11px] text-zinc-500 leading-relaxed font-sans line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Metadata Footer */}
                    <footer className="border-t border-zinc-100 pt-3 flex items-center justify-between text-[9px] font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        {calculateReadTime(post.body)}
                      </span>
                      <span>|</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </footer>
                  </motion.div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>

      {/* Slide-out detail drawer for viewing full markdown essay content */}
      <AnimatePresence>
        {activePost && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="fixed inset-0 bg-black/60 z-[250] backdrop-blur-sm"
            />

            {/* Sliding Panel */}
            <motion.div
              ref={drawerRef}
              onScroll={handleScroll}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[720px] lg:w-[820px] max-w-[92vw] bg-[#0c101b] border-l border-white/10 z-[260] insight-drawer overflow-y-auto flex flex-col justify-between shadow-2xl text-cream"
            >
              {/* Dynamic Scroll Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-50">
                <div 
                  className="h-full bg-[#B22030] transition-all duration-75"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              <div>
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#B22030] uppercase font-bold">
                    {activePost.category} • Briefing
                  </span>
                  <button
                    onClick={() => setActivePost(null)}
                    className="text-cream/50 hover:text-cream transition-colors p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer border-none"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Article Cover Image inside drawer */}
                <div className="relative w-full h-64 mb-8 overflow-hidden rounded border border-white/10 bg-black/45">
                  <Image
                    src={getPostImage(activePost)}
                    alt={activePost.title}
                    fill
                    sizes="(max-width: 720px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>

                {/* Metadata Row */}
                <div className="inline-flex items-center gap-3 text-[10.5px] font-mono text-cream/70 mb-5 bg-white/5 py-1.5 px-3.5 rounded-full border border-white/5">
                  <span>{activePost.date}</span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#B22030]" />
                    {calculateReadTime(activePost.body)}
                  </span>
                </div>

                {/* Essay Title */}
                <h3 className="text-2xl md:text-3.5xl font-serif text-cream font-medium leading-tight mb-8">
                  {activePost.title}
                </h3>

                {/* Essay Paragraph Content */}
                <div className="space-y-6 text-sm text-cream/80 leading-relaxed font-sans">
                  {renderParagraphs(activePost.body)}
                </div>
              </div>

              {/* Drawer Footer signature */}
              <div className="mt-12 pt-6 border-t border-white/5 text-[10px] font-mono text-cream/35 uppercase flex justify-between items-center">
                <span>Authored by Red Bridge Advisory</span>
                <span className="text-[#B22030] font-semibold">Red Bridge Research</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Visually hidden section for Search Engine and AI indexing */}
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
