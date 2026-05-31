"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen } from "lucide-react";
import insightsData from "@/data/insights.json";

export default function Insights() {
  const [activePost, setActivePost] = useState<any | null>(null);

  // Find the featured post, fallback to the first post if none are explicitly flagged
  const featuredPost = insightsData.find((post) => post.featured) || insightsData[0];
  
  // All other posts are listed as standard rows
  const regularPosts = insightsData.filter((post) => post.slug !== featuredPost?.slug);

  // Calculate dynamic reading time based on body text length (200 words per minute)
  const calculateReadTime = (text: string): string => {
    if (!text) return "1 min read";
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Split markdown body by double newlines to render proper spacing paragraphs
  const paragraphs = activePost?.body
    ? activePost.body.split(/\r?\n\r?\n/).map((p: string) => p.trim()).filter(Boolean)
    : [];

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
              <span className="insight-featured__cat">{featuredPost.category}</span>
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-[#1B263B] border-l border-white/10 z-50 p-8 md:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl text-cream"
            >
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
                <div className="flex items-center gap-6 text-[10px] font-mono text-cream/45 uppercase mb-4">
                  <span>{activePost.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {calculateReadTime(activePost.body)}
                  </span>
                </div>

                {/* Essay Title */}
                <h3 className="text-2xl md:text-3xl font-serif text-cream leading-tight mb-8">
                  {activePost.title}
                </h3>

                {/* Essay Paragraph Content */}
                <div className="space-y-6 text-sm text-cream/80 leading-relaxed font-sans">
                  {paragraphs.map((p: string, idx: number) => (
                    <p key={idx}>{p}</p>
                  ))}
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
