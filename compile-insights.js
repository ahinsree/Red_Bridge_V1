const fs = require("fs");
const path = require("path");

const directory = path.join(__dirname, "src/data/insights");
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

// Create sample posts if directory is empty to keep the site populated
const files = fs.readdirSync(directory);
if (files.filter(f => f.endsWith(".md")).length === 0) {
  const sample1 = `---
title: "The quiet crisis in institutional leadership — why the talent at the top is no longer enough"
date: "2026-05-30"
category: "THOUGHT LEADERSHIP"
contentType: "Thought Leadership"
sector: "Public Policy & Govt"
serviceLine: "Strategy & Transformation"
author: "Red Bridge Research"
featured: true
excerpt: "Leadership quality has never been higher in many of the organisations we advise. And yet delivery has never felt more precarious. The gap between capability at the top and execution throughout the system is the defining challenge of the moment."
image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
---
Leadership quality has never been higher in many of the organisations we advise. And yet delivery has never felt more precarious. The gap between capability at the top and execution throughout the system is the defining challenge of the moment.
`;

  fs.writeFileSync(path.join(directory, "quiet-crisis-leadership.md"), sample1);
}

const mdFiles = fs.readdirSync(directory).filter(f => f.endsWith(".md"));
const posts = mdFiles.map(file => {
  const slug = file.replace(/\.md$/, "");
  const fileContents = fs.readFileSync(path.join(directory, file), "utf8");

  const match = fileContents.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;

  const [, frontmatterYaml, body] = match;
  const metadata = {};

  frontmatterYaml.split("\n").forEach(line => {
    const parts = line.split(":");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let value = parts.slice(1).join(":").trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      
      if (value === "true") metadata[key] = true;
      else if (value === "false") metadata[key] = false;
      else metadata[key] = value;
    }
  });

  return {
    slug,
    title: metadata.title || "Untitled",
    date: metadata.date || "",
    category: metadata.category || "ARTICLE",
    contentType: metadata.contentType || "Article",
    sector: metadata.sector || "Infrastructure & Cities",
    serviceLine: metadata.serviceLine || "Strategy & Transformation",
    author: metadata.author || "Red Bridge Advisory",
    featured: !!metadata.featured,
    excerpt: metadata.excerpt || "",
    image: metadata.image || "",
    body: body.trim()
  };
}).filter(p => p !== null);

posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const outputDir = path.join(__dirname, "src/data");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
fs.writeFileSync(path.join(outputDir, "insights.json"), JSON.stringify(posts, null, 2));
console.log(`Successfully compiled ${posts.length} insight posts.`);
