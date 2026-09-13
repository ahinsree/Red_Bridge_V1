"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, BookOpen, Share2, Check, Sparkles, User } from "lucide-react";
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
  contentType?: string;
  sector?: string;
  serviceLine?: string;
  author?: string;
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
  const catLower = (post.category + " " + (post.contentType || "")).toLowerCase();
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

// Filter Dropdown Options matching Grant Thornton structure
const CONTENT_TYPES = ["All Content Types", "Article", "Case Study", "Thought Leadership", "Newsletter", "Chapter Report"];
const INDUSTRIES = ["All Industries", "Infrastructure & Cities", "Public Policy & Govt", "Digital & Technology", "Tourism & Livelihoods", "Enterprise"];
const SERVICE_LINES = ["All Practice Areas", "Strategy & Transformation", "AI, Digital & Data", "Experience & Service Design", "Investment & Economic Advisory"];
const FOCUS_AREAS = ["All Focus Areas", "AI Readiness", "Institutional Leadership", "Execution Gap", "Public Governance"];

export default function InsightsPage() {
  const [selectedType, setSelectedType] = useState("All Content Types");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedService, setSelectedService] = useState("All Practice Areas");
  const [selectedFocus, setSelectedFocus] = useState("All Focus Areas");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const [visibleCount, setVisibleCount] = useState(8);
  const [activePost, setActivePost] = useState<InsightPost | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const typedInsights = insightsData as InsightPost[];

  // Filter logic across 4 dropdown controls
  const filteredPosts = useMemo(() => {
    return typedInsights.filter((post) => {
      const matchType = selectedType === "All Content Types" || (post.contentType && post.contentType.toLowerCase() === selectedType.toLowerCase()) || post.category.toLowerCase().includes(selectedType.toLowerCase());
      const matchIndustry = selectedIndustry === "All Industries" || (post.sector && post.sector.toLowerCase().includes(selectedIndustry.toLowerCase().split(" ")[0]));
      const matchService = selectedService === "All Practice Areas" || (post.serviceLine && post.serviceLine.toLowerCase().includes(selectedService.toLowerCase().split(" ")[0]));
      const matchFocus = selectedFocus === "All Focus Areas" || post.title.toLowerCase().includes(selectedFocus.toLowerCase()) || post.excerpt.toLowerCase().includes(selectedFocus.toLowerCase());
      const matchTheme = !selectedTheme || post.category.toLowerCase().includes(selectedTheme.toLowerCase()) || (post.contentType && post.contentType.toLowerCase().includes(selectedTheme.toLowerCase()));

      return matchType && matchIndustry && matchService && matchFocus && matchTheme;
    });
  }, [typedInsights, selectedType, selectedIndustry, selectedService, selectedFocus, selectedTheme]);

  // "What's New" featured posts (Spotlight, Middle 2 stacked)
  const spotlightPost = useMemo(() => {
    return typedInsights.find((p) => p.featured) || typedInsights[0];
  }, [typedInsights]);

  const middlePosts = useMemo(() => {
    return typedInsights.filter((p) => p.slug !== spotlightPost?.slug).slice(0, 2);
  }, [typedInsights, spotlightPost]);

  const trendingArticles = useMemo(() => {
    return typedInsights.slice(0, 3);
  }, [typedInsights]);

  // Scroll progress for detail drawer
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

  // Render markdown article body
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
      {/* Top Header Navigation */}
      <Header />

      {/* Hero Section - Matching Grant Thornton structure */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 border-b border-white/10 bg-gradient-to-r from-[#1A080C] via-[#0E0507] to-[#121724]">
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-muted/60 uppercase mb-6 tracking-widest">
            <Link href="/" className="hover:text-cream transition-colors">Home</Link>
            <span>•</span>
            <span className="text-[#B22030] font-semibold">Insights</span>
          </div>

          <div className="max-w-3xl mb-8">
            <h1 className="text-4xl md:text-6xl font-serif text-cream font-bold tracking-tight leading-[1.1] mb-4">
              Explore our insights
            </h1>
            <p className="text-base md:text-xl text-cream/75 font-sans font-light">
              Read reports, case studies, articles &amp; more
            </p>
          </div>

          {/* Quick Access Topic Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {["GST Compendium", "Dealtracker", "Podcasts", "AI Readiness"].map((pill) => (
              <button
                key={pill}
                onClick={() => setSelectedTheme(selectedTheme === pill ? null : pill)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all border cursor-pointer ${
                  selectedTheme === pill
                    ? "bg-[#B22030] text-white border-[#B22030] shadow-lg shadow-[#B22030]/20 font-semibold"
                    : "bg-white/10 text-cream/80 border-white/15 hover:bg-white/20 hover:text-cream"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Control Bar - 4 Dropdown Select Controls */}
      <section className="bg-[#0D1019] border-b border-white/10 py-4">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-xs">
            <span className="text-cream/50 font-mono uppercase tracking-wider shrink-0 font-medium">
              Filter insights by:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
              {/* Dropdown 1: Content Type */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full appearance-none bg-[#141A28] border border-white/15 rounded-full px-4 py-2.5 pr-8 text-cream text-xs focus:outline-none focus:border-[#B22030] cursor-pointer transition-colors"
                >
                  {CONTENT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[#0C101B] text-cream">
                      {t}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50 pointer-events-none" />
              </div>

              {/* Dropdown 2: Industry / Sector */}
              <div className="relative">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full appearance-none bg-[#141A28] border border-white/15 rounded-full px-4 py-2.5 pr-8 text-cream text-xs focus:outline-none focus:border-[#B22030] cursor-pointer transition-colors"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind} className="bg-[#0C101B] text-cream">
                      {ind}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50 pointer-events-none" />
              </div>

              {/* Dropdown 3: Service Line */}
              <div className="relative">
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full appearance-none bg-[#141A28] border border-white/15 rounded-full px-4 py-2.5 pr-8 text-cream text-xs focus:outline-none focus:border-[#B22030] cursor-pointer transition-colors"
                >
                  {SERVICE_LINES.map((s) => (
                    <option key={s} value={s} className="bg-[#0C101B] text-cream">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50 pointer-events-none" />
              </div>

              {/* Dropdown 4: Focus Areas */}
              <div className="relative">
                <select
                  value={selectedFocus}
                  onChange={(e) => setSelectedFocus(e.target.value)}
                  className="w-full appearance-none bg-[#141A28] border border-white/15 rounded-full px-4 py-2.5 pr-8 text-cream text-xs focus:outline-none focus:border-[#B22030] cursor-pointer transition-colors"
                >
                  {FOCUS_AREAS.map((f) => (
                    <option key={f} value={f} className="bg-[#0C101B] text-cream">
                      {f}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section 1: "What's New" & Sidebar */}
      <section className="py-16 md:py-20 border-b border-white/10">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left & Middle: What's New Block (lg:col-span-9) */}
            <div className="lg:col-span-9 space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-cream font-medium">
                What&apos;s New
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Large Featured Spotlight Card (md:col-span-7) */}
                {spotlightPost && (
                  <article
                    onClick={() => setActivePost(spotlightPost)}
                    className="md:col-span-7 bg-[#121726] border border-white/10 rounded-2xl overflow-hidden hover:border-[#B22030]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl group"
                  >
                    <div>
                      <div className="relative w-full h-64 overflow-hidden bg-black/40">
                        <Image
                          src={getPostImage(spotlightPost)}
                          alt={spotlightPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 55vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          priority
                        />
                      </div>
                      <div className="p-6 md:p-8">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#B22030] font-bold block mb-3">
                          {spotlightPost.category}
                        </span>
                        <h3 className="text-xl md:text-2.5xl font-serif text-cream font-medium leading-tight mb-4 group-hover:text-white transition-colors">
                          {spotlightPost.title}
                        </h3>
                        <p className="text-xs md:text-sm text-cream/70 leading-relaxed font-sans line-clamp-3 mb-6">
                          {spotlightPost.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 md:px-8 pb-6 text-[10px] font-mono text-cream/50 uppercase border-t border-white/5 pt-4">
                      {spotlightPost.date}
                    </div>
                  </article>
                )}

                {/* Middle Stacked Column (md:col-span-5) */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  {middlePosts.map((post) => (
                    <article
                      key={post.slug}
                      onClick={() => setActivePost(post)}
                      className="bg-[#121726] border border-white/10 rounded-2xl overflow-hidden hover:border-[#B22030]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg group flex-1"
                    >
                      <div>
                        <div className="relative w-full h-36 overflow-hidden bg-black/40">
                          <Image
                            src={getPostImage(post)}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        </div>
                        <div className="p-5">
                          <span className="text-[9.5px] font-mono uppercase tracking-widest text-[#B22030] font-bold block mb-2">
                            {post.category}
                          </span>
                          <h4 className="text-sm font-serif text-cream font-medium leading-snug mb-2 group-hover:text-white transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          {post.author && (
                            <div className="flex items-center gap-2 text-[10px] font-mono text-cream/50 mt-3">
                              <User className="w-3 h-3 text-[#B22030]" />
                              <span>{post.author}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="px-5 pb-4 text-[9.5px] font-mono text-cream/50 uppercase flex items-center justify-between border-t border-white/5 pt-3">
                        <span>{calculateReadTime(post.body)}</span>
                        <span>{post.date}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Themes & Trending Articles (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-8 border-l border-white/10 lg:pl-8">
              {/* Themes Tag Cloud */}
              <div>
                <h3 className="text-xl font-serif text-cream font-medium mb-4">Themes</h3>
                <div className="flex flex-wrap gap-2">
                  {["2026", "Thought leadership", "Articles", "Newsletters", "Case Study", "Podcast"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTheme(selectedTheme === tag ? null : tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all border cursor-pointer ${
                        selectedTheme === tag
                          ? "bg-[#B22030] text-white border-[#B22030] font-medium"
                          : "bg-white/5 text-cream/70 border-white/10 hover:border-white/25 hover:text-cream"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Articles Ranking List */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-xl font-serif text-cream font-medium mb-4">Trending articles</h3>
                <div className="space-y-4">
                  {trendingArticles.map((article) => (
                    <div
                      key={article.slug}
                      onClick={() => setActivePost(article)}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/8 hover:border-[#B22030]/50 transition-all cursor-pointer group"
                    >
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#B22030] font-bold block mb-1">
                        {article.category}
                      </span>
                      <h5 className="text-xs font-serif text-cream/90 font-medium leading-snug mb-2 group-hover:text-white line-clamp-2">
                        {article.title}
                      </h5>
                      <div className="flex items-center gap-2 text-[9px] font-mono text-cream/40 uppercase">
                        <span>{calculateReadTime(article.body)}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section 2: "Our Insights" (4-Column Grid) */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/10">
            <h2 className="text-2xl md:text-3.5xl font-serif text-cream font-medium">
              Our Insights
            </h2>
            <span className="text-xs font-mono text-cream/40 uppercase">
              Showing {Math.min(visibleCount, filteredPosts.length)} of {filteredPosts.length} Insights
            </span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white/[0.02] rounded-xl border border-white/5 max-w-md mx-auto">
              <Sparkles className="w-8 h-8 text-[#B22030] mx-auto mb-3" />
              <p className="text-sm text-cream/70 mb-4">No publications match your selected filters.</p>
              <button
                onClick={() => {
                  setSelectedType("All Content Types");
                  setSelectedIndustry("All Industries");
                  setSelectedService("All Practice Areas");
                  setSelectedFocus("All Focus Areas");
                  setSelectedTheme(null);
                }}
                className="btn btn--primary text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* 4-Column Grid matching Grant Thornton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPosts.slice(0, visibleCount).map((post) => (
                  <article
                    key={post.slug}
                    onClick={() => setActivePost(post)}
                    className="group bg-[#121724] border border-white/10 rounded-xl overflow-hidden hover:border-[#B22030]/60 hover:bg-[#161D2E] transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-md hover:-translate-y-1"
                  >
                    <div>
                      {/* Image Top */}
                      <div className="relative w-full h-44 overflow-hidden bg-black/40 border-b border-white/5">
                        <Image
                          src={getPostImage(post)}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#B22030] font-bold block mb-2">
                          {post.category}
                        </span>

                        <h4 className="text-sm font-serif text-cream font-medium leading-snug mb-3 group-hover:text-white transition-colors line-clamp-3">
                          {post.title}
                        </h4>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-0 text-[9.5px] font-mono text-cream/45 uppercase border-t border-white/5 pt-3 mt-auto">
                      {calculateReadTime(post.body)} | {post.date}
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More Centered Pagination Button */}
              {visibleCount < filteredPosts.length && (
                <div className="text-center pt-6">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 4)}
                    className="px-8 py-3 rounded-md bg-transparent border border-white/25 text-cream text-xs font-mono uppercase tracking-wider hover:border-[#B22030] hover:bg-[#B22030]/10 hover:text-white transition-all cursor-pointer"
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Slide-out Full Briefing Reader Drawer */}
      <AnimatePresence>
        {activePost && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            />

            {/* Sliding Panel */}
            <motion.div
              ref={drawerRef}
              onScroll={handleScroll}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[720px] lg:w-[840px] max-w-[92vw] bg-[#0C101B] border-l border-white/10 z-50 overflow-y-auto flex flex-col justify-between shadow-2xl text-cream p-6 md:p-10"
            >
              {/* Scroll Progress Bar */}
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
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleShare}
                      title="Copy link"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cream/70 hover:text-cream p-2 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border-none"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                      <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
                    </button>
                    <button
                      onClick={() => setActivePost(null)}
                      className="text-cream/50 hover:text-cream p-2 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border-none"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="relative w-full h-64 md:h-80 mb-8 overflow-hidden rounded-xl border border-white/10 bg-black/45 shadow-inner">
                  <Image
                    src={getPostImage(activePost)}
                    alt={activePost.title}
                    fill
                    sizes="(max-width: 720px) 100vw, 840px"
                    className="object-cover"
                  />
                </div>

                {/* Metadata */}
                <div className="inline-flex items-center gap-3 text-[10.5px] font-mono text-cream/70 mb-5 bg-white/5 py-1.5 px-3.5 rounded-full border border-white/5">
                  <span>{activePost.date}</span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#B22030]" />
                    {calculateReadTime(activePost.body)}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3.5xl font-serif text-cream font-medium leading-tight mb-8">
                  {activePost.title}
                </h2>

                {/* Essay Body Content */}
                <div className="space-y-6 text-sm text-cream/80 leading-relaxed font-sans">
                  {renderParagraphs(activePost.body)}
                </div>
              </div>

              {/* Drawer Footer */}
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

      {/* Utilities */}
      <Chatbot />
      <ScrollToggle />
    </div>
  );
}
