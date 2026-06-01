"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen } from "lucide-react";
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

export default function Insights() {
  const [activePost, setActivePost] = useState<InsightPost | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  const typedInsights = insightsData as InsightPost[];

  // Find the featured post, fallback to the first post if none are explicitly flagged
  const featuredPost = typedInsights.find((post) => post.featured) || typedInsights[0];
  
  // All other posts are listed as standard rows
  const regularPosts = typedInsights.filter((post) => post.slug !== featuredPost?.slug);

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

  // Parse custom markdown elements for rich semantic rendering
  const renderParagraphs = (bodyText: string) => {
    if (!bodyText) return null;
    const items = bodyText.split(/\r?\n\r?\n/).map((p) => p.trim()).filter(Boolean);

    return items.map((p, idx) => {
      // 1. Level 3 Subheading
      if (p.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-[17px] md:text-[19px] font-serif font-medium text-cream mt-10 mb-5 border-l-2 border-[#B22030] pl-4 leading-snug">
            {p.replace(/^###\s+/, "")}
          </h4>
        );
      }
      // 2. Level 2 Subheading
      if (p.startsWith("## ")) {
        return (
          <h3 key={idx} className="text-[20px] md:text-[22px] font-serif font-medium text-cream mt-12 mb-5 border-l-2 border-[#B22030] pl-4 leading-snug">
            {p.replace(/^##\s+/, "")}
          </h3>
        );
      }
      // 3. Blockquotes
      if (p.startsWith("> ")) {
        return (
          <blockquote key={idx} className="border-l-2 border-[#B22030] bg-white/[0.03] pl-6 py-4 pr-4 italic my-8 text-cream/90 rounded-r text-[13.5px] md:text-[14.5px] leading-relaxed shadow-sm">
            “{p.replace(/^>\s+/, "").replace(/"/g, "")}”
          </blockquote>
        );
      }
      // 4. Bullet lists
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
      // 5. Standard paragraph
      return (
        <p key={idx} className="text-[14px] md:text-[14.5px] text-cream/75 leading-[1.85] mb-6 tracking-wide font-sans">
          {p}
        </p>
      );
    });
  };

  return (
    <section className="section section--cream" id="insights">
      <div className="container">
        <div className="insights__header reveal">
          <div>
            <span className="sec-label">Insights</span>
            <h2 className="sec-title">Perspectives from the field</h2>
          </div>
          <a href="#contact" className="btn btn--ghost">
            All Insights &rarr;
          </a>
        </div>

        {featuredPost && (
          <div className="insight-featured reveal d1">
            <div className="insight-featured__img">
              <img
                src={featuredPost.image || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"}
                alt={featuredPost.title}
              />
            </div>
            <div className="insight-featured__body">
              <div className="flex items-center gap-3 text-[9.5px] font-mono text-muted/60 uppercase mb-3.5 tracking-wider">
                <span className="text-[#B22030] font-semibold">{featuredPost.category}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {calculateReadTime(featuredPost.body)}
                </span>
              </div>
              <h2 className="insight-featured__title">
                {featuredPost.title}
              </h2>
              <p className="insight-featured__excerpt">
                {featuredPost.excerpt}
              </p>
              <a
                href="#insights"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePost(featuredPost);
                }}
                className="insight-featured__read"
              >
                Read the Essay &rarr;
              </a>
            </div>
          </div>
        )}

        {regularPosts.length > 0 && (
          <div className="insight-links reveal d2">
            {regularPosts.map((post) => (
              <a
                key={post.slug}
                href="#insights"
                onClick={(e) => {
                  e.preventDefault();
                  setActivePost(post);
                }}
                className="insight-link"
              >
                <div className="insight-link__left">
                  <span className="insight-link__cat">{post.category}</span>
                  <span className="insight-link__title">{post.title}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono text-muted/50 uppercase md:mr-6 shrink-0">
                  <span>{post.date}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {calculateReadTime(post.body)}
                  </span>
                </div>
                <span className="insight-link__cta">Read &rarr;</span>
              </a>
            ))}
          </div>
        )}
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
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />

            {/* Sliding Panel */}
            <motion.div
              ref={drawerRef}
              onScroll={handleScroll}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-[#0c101b] border-l border-white/10 z-50 insight-drawer overflow-y-auto flex flex-col justify-between shadow-2xl text-cream"
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
                {activePost.image && (
                  <div className="relative w-full h-64 mb-8 overflow-hidden rounded border border-white/10 bg-black/45">
                    <img
                      src={activePost.image}
                      alt={activePost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

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
    </section>
  );
}
