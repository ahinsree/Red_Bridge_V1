/* eslint-disable */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imagesDir = path.join(__dirname, 'public', 'images');

// 1. Install sharp locally (temporary dependency)
console.log('Installing sharp for high-performance image processing...');
try {
  execSync('npm install --no-save sharp', { stdio: 'inherit' });
} catch (err) {
  console.error('Failed to install sharp:', err.message);
  process.exit(1);
}

const sharp = require('sharp');

// 2. Read images directory
const files = fs.readdirSync(imagesDir);

async function optimizeImages() {
  console.log('Starting image static compression and resizing optimization...');
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') continue;
    
    // Skip already optimized/special files
    if (file.includes('-mobile') || file.includes('-desktop') || file.includes('logo-flat')) continue;
    
    const filePath = path.join(imagesDir, file);
    const basename = path.basename(file, ext);
    
    console.log(`Processing: ${file}...`);
    
    try {
      const metadata = await sharp(filePath).metadata();
      
      // A. Generate optimized desktop WebP (Max width 1920px, quality 90)
      const desktopFilename = `${basename}-desktop.webp`;
      const desktopPath = path.join(imagesDir, desktopFilename);
      
      let desktopPipeline = sharp(filePath);
      if (metadata.width > 1920) {
        desktopPipeline = desktopPipeline.resize(1920);
      }
      await desktopPipeline
        .webp({ quality: 90, effort: 6 })
        .toFile(desktopPath);
      
      const desktopSize = fs.statSync(desktopPath).size;
      console.log(`  -> Created desktop WebP: ${desktopFilename} (${Math.round(desktopSize / 1024)} KB)`);
      
      // B. Generate optimized mobile WebP (Max width 800px, quality 80)
      const mobileFilename = `${basename}-mobile.webp`;
      const mobilePath = path.join(imagesDir, mobileFilename);
      
      let mobilePipeline = sharp(filePath);
      if (metadata.width > 800) {
        mobilePipeline = mobilePipeline.resize(800);
      }
      await mobilePipeline
        .webp({ quality: 80, effort: 6 })
        .toFile(mobilePath);
        
      const mobileSize = fs.statSync(mobilePath).size;
      console.log(`  -> Created mobile WebP: ${mobileFilename} (${Math.round(mobileSize / 1024)} KB)`);
      
    } catch (err) {
      console.error(`  [ERROR] Failed to process ${file}:`, err.message);
    }
  }
  
  console.log('Static image optimization completed successfully.');
}

optimizeImages().catch(console.error);
