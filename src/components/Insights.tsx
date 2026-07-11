"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Clock, Calendar, TrendingUp } from "lucide-react";
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

// Simulated trending list to populate the sidebar exactly like Grant Thornton
const trendingArticles = [
  {
    title: "Explainer: Why capacity building overrides policy design in public reforms",
    category: "Strategy & Institution",
    date: "08 Jul 2026",
    readTime: "4 min read"
  },
  {
    title: "The vector database playbook: Structuring corporate knowledge base for AI",
    category: "AI & Digital",
    date: "05 Jul 2026",
    readTime: "6 min read"
  },
  {
    title: "Citizen journeys first: Re-designing municipal licensing systems",
    category: "Experience Design",
    date: "02 Jul 2026",
    readTime: "5 min read"
  }
];

export default function Insights() {
  const [activePost, setActivePost] = useState<InsightPost | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const drawerRef = useRef<HTMLDivElement>(null);

  const typedInsights = insightsData as InsightPost[];

  // Filter posts based on selected category tab
  const filteredPosts = typedInsights.filter((post) => {
    if (selectedCategory === "All") return true;
    return post.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  // Split out the featured post and column posts for the default "All" landing grid
  const featuredPost = typedInsights[0];
  const stackedColumnPosts = typedInsights.slice(1, 3); // next 2 posts

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

  const handleTrendingClick = (e: React.MouseEvent, title: string, category: string) => {
    e.preventDefault();
    const contactForm = document.getElementById("contact");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" });
      const selectEl = document.getElementById("interest-select") as HTMLSelectElement | null;
      const msgEl = document.getElementById("message-input") as HTMLTextAreaElement | null;
      
      if (selectEl) {
        if (category.includes("AI")) {
          selectEl.value = "AI, Digital & Data Advisory";
        } else if (category.includes("Experience")) {
          selectEl.value = "Experience & Service Design";
        } else {
          selectEl.value = "Strategy & Institution Building";
        }
      }
      if (msgEl) {
        msgEl.value = `Hi Red Bridge team, I would like to schedule a discussion regarding your trending brief: "${title}".`;
        const event = new Event('input', { bubbles: true });
        msgEl.dispatchEvent(event);
      }
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
    <section className="section section--cream py-24" id="insights">
      <div className="container mx-auto">
        
        {/* Dynamic explore banner (Grant Thornton style) */}
        <div className="bg-[#0c101b] border border-white/10 rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden shadow-xl reveal">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#B22030]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/3 rounded-full blur-2xl pointer-events-none" />
          
          <span className="text-[10px] font-mono tracking-widest text-[#B22030] uppercase font-bold mb-4 block">
            Red Bridge Perspectives
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-cream font-medium tracking-tight mb-4 leading-tight">
            Explore our insights
          </h1>
          <h2 className="text-sm md:text-base text-cream/70 max-w-xl mb-8 leading-relaxed font-sans font-normal">
            Read reports, case studies, essays & articles from our corporate strategy and operational field experience.
          </h2>
          
          {/* Categories lister (Filter insights by:) */}
          <div className="border-t border-white/10 pt-6 flex flex-wrap gap-3 items-center">
            <span className="text-xs font-mono text-cream/50 mr-2 uppercase tracking-wider">Filter insights by:</span>
            <div className="flex flex-wrap gap-2">
              {["All", "Leadership", "Strategy", "AI & Digital"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#B22030] text-white border-[#B22030] shadow-md shadow-[#B22030]/10"
                      : "bg-white/5 text-cream/70 border-white/10 hover:bg-white/10 hover:text-cream"
                  }`}
                >
                  {cat === "All" ? "All Content" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* What's New Grid - displayed only on "All" filter to mirror Grant Thornton */}
        {selectedCategory === "All" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start reveal d1">
            
            {/* Left Column: What's New Content (Grid col-span-9) */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Highlight Large Card (md:col-span-7) */}
              {featuredPost && (
                <div className="md:col-span-7 flex">
                  <div className="bg-white border border-[var(--divider-soft)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#B22030]/20 transition-all duration-300 flex flex-col w-full group">
                    <div className="relative w-full h-[280px] overflow-hidden bg-black/5">
                      <Image
                        src={getPostImage(featuredPost)}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 760px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        priority
                      />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                      <div>
                        <span className="text-[#B22030] text-[10px] font-mono uppercase tracking-wider block mb-3 font-semibold">
                          {featuredPost.category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-serif text-[var(--charcoal)] font-medium leading-snug mb-3 group-hover:text-[#B22030] transition-colors">
                          <a href="#insights" onClick={(e) => { e.preventDefault(); setActivePost(featuredPost); }}>
                            {featuredPost.title}
                          </a>
                        </h3>
                        <p className="text-xs text-[var(--muted)] leading-relaxed mb-6 font-sans">
                          {featuredPost.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center justify-between border-t border-[var(--divider-soft)] pt-4 text-[10px] font-mono text-[var(--muted)]/70 uppercase">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {calculateReadTime(featuredPost.body)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {featuredPost.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Stacked Small Cards (md:col-span-5) */}
              <div className="md:col-span-5 flex flex-col gap-6">
                {stackedColumnPosts.map((post) => (
                  <div 
                    key={post.slug}
                    className="bg-white border border-[var(--divider-soft)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#B22030]/20 transition-all duration-300 flex flex-col w-full group"
                  >
                    <div className="relative w-full h-[130px] overflow-hidden bg-black/5">
                      <Image
                        src={getPostImage(post)}
                        alt={post.title}
                        fill
                        sizes="(max-width: 760px) 100vw, 30vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <span className="text-[#B22030] text-[9px] font-mono uppercase tracking-wider block mb-2 font-semibold">
                          {post.category}
                        </span>
                        <h4 className="text-sm md:text-base font-serif text-[var(--charcoal)] font-medium leading-snug mb-3 group-hover:text-[#B22030] transition-colors">
                          <a href="#insights" onClick={(e) => { e.preventDefault(); setActivePost(post); }}>
                            {post.title}
                          </a>
                        </h4>
                      </div>
                      <div className="flex items-center justify-between border-t border-[var(--divider-soft)] pt-3 text-[9px] font-mono text-[var(--muted)]/70 uppercase">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {calculateReadTime(post.body)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Trending Articles Sidebar (Grid col-span-3) */}
            <div className="lg:col-span-3 bg-white border border-[var(--divider-soft)] rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[var(--divider-soft)]">
                <TrendingUp className="w-4 h-4 text-[#B22030]" />
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--charcoal)] font-sans">
                  Trending Articles
                </h2>
              </div>
              <div className="flex flex-col divide-y divide-[var(--divider-soft)]">
                {trendingArticles.map((article, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 group">
                    <span className="text-[8.5px] font-mono uppercase tracking-wider text-[#B22030] block mb-1 font-semibold">
                      {article.category}
                    </span>
                    <h3 className="text-xs font-serif font-medium text-[var(--charcoal)] leading-snug mb-3 group-hover:text-[#B22030] transition-colors">
                      <a 
                        href="#contact" 
                        onClick={(e) => handleTrendingClick(e, article.title, article.category)}
                        className="hover:underline"
                      >
                        {article.title}
                      </a>
                    </h3>
                    <div className="flex items-center gap-3 text-[8.5px] font-mono text-[var(--muted)]/60 uppercase">
                      <span>{article.readTime}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Our Insights Section (Grid results) */}
        <div className="reveal d2">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[var(--divider-soft)]">
            <h2 className="text-xl md:text-2xl font-serif text-[var(--charcoal)] font-semibold">
              {selectedCategory === "All" ? "Our Insights" : `Insights in ${selectedCategory}`}
            </h2>
            <span className="text-xs font-mono text-[var(--muted)]">
              Showing {filteredPosts.length} briefing{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div 
                  key={post.slug}
                  className="bg-white border border-[var(--divider-soft)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#B22030]/20 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative w-full h-[180px] overflow-hidden bg-black/5">
                    <Image
                      src={getPostImage(post)}
                      alt={post.title}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-[#B22030] text-[9.5px] font-mono uppercase tracking-wider block mb-2.5 font-semibold">
                        {post.category}
                      </span>
                      <h3 className="text-base md:text-lg font-serif text-[var(--charcoal)] font-medium leading-snug mb-3 group-hover:text-[#B22030] transition-colors">
                        <a href="#insights" onClick={(e) => { e.preventDefault(); setActivePost(post); }}>
                          {post.title}
                        </a>
                      </h3>
                      <p className="text-xs text-[var(--muted)] leading-relaxed mb-6 font-sans line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-[var(--divider-soft)] pt-4 text-[9.5px] font-mono text-[var(--muted)]/70 uppercase">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {calculateReadTime(post.body)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-[var(--divider-soft)] rounded-xl">
              <p className="text-sm text-[var(--muted)]">No insights found matching this category.</p>
            </div>
          )}
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
