"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, ArrowRight, Share2, Check, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ScrollToggle from "@/components/ScrollToggle";
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
  leadership: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  strategy: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
  ai: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  digital: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  experience: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
  investment: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  infrastructure: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  startup: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
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

const calculateReadTime = (text: string): string => {
  if (!text) return "1 min read";
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

const CATEGORIES = [
  "All Insights",
  "Leadership",
  "Strategy",
  "AI & Digital",
  "Experience & Design",
  "Investment & Infrastructure",
];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Insights");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePost, setActivePost] = useState<InsightPost | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const typedInsights = insightsData as InsightPost[];

  // Scroll reveal setup
  useEffect(() => {
    document.documentElement.classList.add("js-ready");
    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    const vh = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh - 16) el.classList.add("in");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06 }
    );

    revealEls.forEach((el) => {
      if (!el.classList.contains("in")) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return typedInsights.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Insights"
          ? true
          : post.category.toLowerCase().includes(selectedCategory.toLowerCase().replace(" & digital", "").replace(" & design", "").replace(" & infrastructure", ""));

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [typedInsights, selectedCategory, searchQuery]);

  // Main featured post (first featured or top item)
  const featuredPost = useMemo(() => {
    if (selectedCategory !== "All Insights" || searchQuery !== "") {
      return filteredPosts[0] || null;
    }
    return typedInsights.find((p) => p.featured) || typedInsights[0];
  }, [filteredPosts, typedInsights, selectedCategory, searchQuery]);

  // Regular grid posts (excluding the spotlight featured post)
  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
  }, [filteredPosts, featuredPost]);

  // Scroll progress in detail drawer
  useEffect(() => {
    setScrollProgress(0);
    setCopied(false);
  }, [activePost]);

  const handleScroll = () => {
    const el = drawerRef.current;
    if (!el) return;
    const totalHeight = el.scrollHeight - el.clientHeight;
    if (totalHeight > 0) {
      setScrollProgress((el.scrollTop / totalHeight) * 100);
    }
  };

  const handleShare = () => {
    if (!activePost) return;
    const url = `${window.location.origin}/insights#${activePost.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Render article markdown content
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
        const listLines = p.split(/\n?- /).map((item) => item.trim()).filter(Boolean);
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
    <div className="relative min-h-screen bg-[#0A0D14] text-cream selection:bg-[#B22030] selection:text-white">
      {/* Navigation Header */}
      <Header />

      {/* Hero Banner Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/10 overflow-hidden bg-gradient-to-b from-[#0F1420] via-[#0A0D14] to-[#0A0D14]">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#B22030]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-muted/60 uppercase mb-6 tracking-widest">
            <Link href="/" className="hover:text-cream transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#B22030] font-semibold">Insights &amp; Publications</span>
          </div>

          <div className="max-w-3xl mb-12">
            <h1 className="text-3xl md:text-5xl font-serif text-cream font-medium tracking-tight leading-[1.15] mb-6">
              Perspectives from the field — Bridging Insight to Impact
            </h1>
            <p className="text-base md:text-lg text-cream/70 leading-relaxed font-sans font-light">
              Strategic essays, empirical research, and institutional policy analysis authored by Red Bridge Advisory partners to navigate enterprise transformation and public delivery.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="space-y-6">
            {/* Search Input Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, strategy, or key term..."
                className="w-full pl-11 pr-10 py-3.5 bg-white/[0.04] border border-white/12 rounded-lg text-cream placeholder:text-cream/35 text-sm focus:outline-none focus:border-[#B22030] focus:ring-1 focus:ring-[#B22030] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream p-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/5 pt-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap border cursor-pointer ${
                      isActive
                        ? "bg-[#B22030] text-white border-[#B22030] shadow-md shadow-[#B22030]/20 font-semibold"
                        : "bg-white/[0.03] text-cream/70 border-white/10 hover:border-white/25 hover:text-cream hover:bg-white/[0.06]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-16 md:py-24">
        <div className="container">
          {filteredPosts.length === 0 ? (
            /* Empty Search/Filter State */
            <div className="text-center py-20 bg-white/[0.02] rounded-xl border border-white/5 max-w-lg mx-auto">
              <Sparkles className="w-10 h-10 text-[#B22030] mx-auto mb-4 opacity-80" />
              <h3 className="text-lg font-serif text-cream mb-2">No matching insights found</h3>
              <p className="text-xs text-cream/60 mb-6 font-sans">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All Insights");
                  setSearchQuery("");
                }}
                className="btn btn--primary text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Featured Spotlight Card */}
              {featuredPost && (
                <div className="reveal in">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#B22030] font-semibold mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured Spotlight</span>
                  </div>

                  <div className="group relative bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:border-white/20 transition-all duration-300 shadow-xl">
                    <div className="relative lg:col-span-7 h-64 lg:h-auto min-h-[300px] overflow-hidden bg-black/40">
                      <Image
                        src={getPostImage(featuredPost)}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-transparent lg:hidden" />
                    </div>

                    <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-cream/60 uppercase mb-4 tracking-wider">
                          <span className="px-2.5 py-1 rounded bg-[#B22030]/20 text-[#B22030] font-semibold border border-[#B22030]/30">
                            {featuredPost.category}
                          </span>
                          <span>•</span>
                          <span>{featuredPost.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-[#B22030]" />
                            {calculateReadTime(featuredPost.body)}
                          </span>
                        </div>

                        <h2 className="text-xl md:text-2.5xl font-serif text-cream font-medium leading-tight mb-4 group-hover:text-white transition-colors">
                          {featuredPost.title}
                        </h2>

                        <p className="text-xs md:text-sm text-cream/70 leading-relaxed font-sans mb-8">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <button
                        onClick={() => setActivePost(featuredPost)}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B22030] font-semibold group-hover:translate-x-1 transition-transform cursor-pointer border-none bg-transparent"
                      >
                        <span>Read Full Essay</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Regular Insights */}
              {gridPosts.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                    <h3 className="text-lg font-serif text-cream font-medium">
                      All Publications ({filteredPosts.length})
                    </h3>
                    <span className="text-[11px] font-mono text-cream/40 uppercase">
                      Category: {selectedCategory}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {gridPosts.map((post) => (
                      <article
                        key={post.slug}
                        onClick={() => setActivePost(post)}
                        className="group bg-white/[0.02] border border-white/8 rounded-xl overflow-hidden hover:border-[#B22030]/50 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1 shadow-lg"
                      >
                        <div>
                          {/* Image */}
                          <div className="relative w-full h-48 overflow-hidden bg-black/40 border-b border-white/5">
                            <Image
                              src={getPostImage(post)}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                            <div className="absolute top-3 left-3">
                              <span className="text-[9px] font-mono uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-cream border border-white/10">
                                {post.category}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <div className="flex items-center gap-3 text-[9.5px] font-mono text-cream/50 uppercase mb-3">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-[#B22030]" />
                                {calculateReadTime(post.body)}
                              </span>
                            </div>

                            <h4 className="text-base font-serif text-cream font-medium leading-snug mb-3 group-hover:text-white transition-colors line-clamp-2">
                              {post.title}
                            </h4>

                            <p className="text-xs text-cream/65 leading-relaxed font-sans line-clamp-3 mb-4">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="px-6 pb-6 pt-0 flex justify-between items-center border-t border-white/5 mt-auto text-[11px] font-mono text-cream/50 group-hover:text-[#B22030] transition-colors">
                          <span>Read Essay</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Slide-out Full Briefing Reader Drawer */}
      <AnimatePresence>
        {activePost && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="fixed inset-0 bg-black/75 z-50 backdrop-blur-sm"
            />

            {/* Sliding Drawer */}
            <motion.div
              ref={drawerRef}
              onScroll={handleScroll}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[720px] lg:w-[840px] max-w-[92vw] bg-[#0C101B] border-l border-white/10 z-50 overflow-y-auto flex flex-col justify-between shadow-2xl text-cream p-6 md:p-10"
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
                    {activePost.category} • Executive Briefing
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleShare}
                      title="Copy link to briefing"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cream/70 hover:text-cream transition-colors p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer border-none"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                      <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
                    </button>
                    <button
                      onClick={() => setActivePost(null)}
                      className="text-cream/50 hover:text-cream transition-colors p-2 rounded bg-white/5 hover:bg-white/10 cursor-pointer border-none"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Article Cover Image */}
                <div className="relative w-full h-64 md:h-80 mb-8 overflow-hidden rounded-xl border border-white/10 bg-black/45 shadow-inner">
                  <Image
                    src={getPostImage(activePost)}
                    alt={activePost.title}
                    fill
                    sizes="(max-width: 720px) 100vw, 840px"
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
                <h2 className="text-2xl md:text-3.5xl font-serif text-cream font-medium leading-tight mb-8">
                  {activePost.title}
                </h2>

                {/* Essay Body Paragraph Content */}
                <div className="space-y-6 text-sm text-cream/80 leading-relaxed font-sans">
                  {renderParagraphs(activePost.body)}
                </div>
              </div>

              {/* Drawer Footer Signature */}
              <div className="mt-16 pt-6 border-t border-white/5 text-[10px] font-mono text-cream/40 uppercase flex justify-between items-center">
                <span>Authored by Red Bridge Advisory Partners</span>
                <span className="text-[#B22030] font-semibold">Red Bridge Research</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer Navigation */}
      <Footer />

      {/* Floating Utilities */}
      <Chatbot />
      <ScrollToggle />
    </div>
  );
}
