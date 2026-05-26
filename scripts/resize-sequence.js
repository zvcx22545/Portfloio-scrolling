/**
Image Sequence Optimizer and Resizer Script
This script inspects the source WebP image sequence and resizes them to 
optimized mobile dimensions (960x540 by default) using the high-performance 'sharp' library.

Usage:
1. npm install
2. node scripts/resize-sequence.js
*/

const fs = require('fs');
const path = require('path');

// Dynamically require sharp, output friendly message if not installed
let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: "sharp" is not installed.');
  console.error('\x1b[33m%s\x1b[0m', 'Please run "npm install -D sharp" to install the image resizing engine.');
  process.exit(1);
}

const SOURCE_DIR = path.join(__dirname, '..', 'public', 'image_sequence');
const TARGET_DIR = path.join(__dirname, '..', 'public', 'image_sequence_mobile');

const MOBILE_WIDTH = 960; // 960x540 aspect ratio (16:9)
const QUALITY = 75;      // WebP compression quality for mobile

async function optimizeSequence() {
  console.log('\x1b[36m%s\x1b[0m', '🚀 Cinematic Image Sequence Optimization Utility');
  console.log('Source Directory:', SOURCE_DIR);
  console.log('Target Directory:', TARGET_DIR);

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error('\x1b[31m%s\x1b[0m', `Error: Source directory ${SOURCE_DIR} does not exist.`);
    process.exit(1);
  }

  // Ensure target directory exists
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log('Created mobile target directory:', TARGET_DIR);
  }

  // Get and sort all frames
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(file => file.endsWith('.webp'))
    .sort();

  if (files.length === 0) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: No WebP images found in source directory.');
    process.exit(1);
  }

  console.log(`Found ${files.length} WebP source frames to process.`);

  // Inspect the first frame to determine original dimensions and format
  const firstFramePath = path.join(SOURCE_DIR, files[0]);
  const metadata = await sharp(firstFramePath).metadata();
  console.log('\x1b[32m%s\x1b[0m', `Original Frame Dimensions: ${metadata.width}x${metadata.height} (${metadata.format.toUpperCase()})`);
  console.log(`Targeting Mobile Dimensions: ${MOBILE_WIDTH}x${Math.round(metadata.height * (MOBILE_WIDTH / metadata.width))} (Quality: ${QUALITY}%)`);

  console.log('\nStarting resize processing... This may take a few seconds.');
  const startTime = Date.now();

  let processedCount = 0;

  // Process in chunks of 10 to avoid excessive CPU/memory load
  const chunkSize = 10;
  for (let i = 0; i < files.length; i += chunkSize) {
    const chunk = files.slice(i, i + chunkSize);
    const promises = chunk.map(async (file) => {
      const srcPath = path.join(SOURCE_DIR, file);
      const destPath = path.join(TARGET_DIR, file);

      // Perform the high-quality resize using Sharp
      await sharp(srcPath)
        .resize({
          width: MOBILE_WIDTH,
          withoutEnlargement: true,
        })
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(destPath);

      processedCount++;
    });

    await Promise.all(promises);
    process.stdout.write(`Progress: ${processedCount}/${files.length} frames optimized...\r`);
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log('\n\x1b[32m%s\x1b[0m', `✓ Optimization complete! Processed ${processedCount} frames in ${duration}s.`);
  
  // Print size comparison
  const originalSize = getDirSize(SOURCE_DIR);
  const mobileSize = getDirSize(TARGET_DIR);
  console.log(`Original Sequence Total Size: ${(originalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Mobile Sequence Total Size:   \x1b[32m${(mobileSize / (1024 * 1024)).toFixed(2)} MB\x1b[0m (~${Math.round((1 - mobileSize / originalSize) * 100)}% bandwidth reduction!)`);
}

function getDirSize(dir) {
  const files = fs.readdirSync(dir);
  return files.reduce((size, file) => {
    const stats = fs.statSync(path.join(dir, file));
    return size + stats.size;
  }, 0);
}

optimizeSequence().catch(err => {
  console.error('\x1b[31m%s\x1b[0m', 'An error occurred during resizing:', err);
});
