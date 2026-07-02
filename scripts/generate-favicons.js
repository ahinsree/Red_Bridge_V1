const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgPath = path.join(__dirname, '..', 'public', 'images', 'logo-flat.svg');
const publicDir = path.join(__dirname, '..', 'public');
const appDir = path.join(__dirname, '..', 'src', 'app');

async function generateFavicons() {
  console.log('Generating standardized favicons from logo-flat.svg...');
  
  if (!fs.existsSync(svgPath)) {
    console.error('Error: logo-flat.svg not found at:', svgPath);
    process.exit(1);
  }

  try {
    // 1. Generate src/app/icon.png (32x32) for default browser favicons
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(appDir, 'icon.png'));
    console.log('✔ Generated src/app/icon.png (32x32)');

    // 2. Generate src/app/apple-icon.png (180x180) for iOS home screens
    await sharp(svgPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(appDir, 'apple-icon.png'));
    console.log('✔ Generated src/app/apple-icon.png (180x180)');

    // 3. Generate public/favicon.ico (32x32 png renamed/formatted)
    // Most modern browsers and crawlers support PNG-encoded favicons in the .ico route
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✔ Generated public/favicon.ico (32x32)');
    
    // Also save in app directory for Next.js app router route fallback
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(appDir, 'favicon.ico'));
    console.log('✔ Generated src/app/favicon.ico (32x32)');

    // 4. Generate public/images/logo-flat.png (512x512) for OpenGraph metadata and high-res previews
    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'images', 'logo-flat.png'));
    console.log('✔ Generated public/images/logo-flat.png (512x512)');

    console.log('Favicon generation completed successfully.');
  } catch (err) {
    console.error('Error generating favicons:', err.message);
  }
}

generateFavicons();
