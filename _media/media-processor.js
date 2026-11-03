import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Usage:
//   node media-processor.js <slug>
//   npm run media:process <slug>

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const MEDIA_DIR = __dirname;
const RAW_DIR = path.join(MEDIA_DIR, 'raw');
const PROCESSED_DIR = path.join(MEDIA_DIR, 'processed');

// Hardcoded target dimensions
const TARGET_WIDTH = 1280;
const TARGET_HEIGHT = 720;
const TARGET_ASPECT = TARGET_WIDTH / TARGET_HEIGHT; // 1.7777... (16:9)

// Supported raw extensions
const VIDEO_EXTS = ['.mp4', '.mov', '.webm', '.mkv', '.avi'];
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function findRawFile(slug, extensions) {
  for (const ext of extensions) {
    const filePath = path.join(RAW_DIR, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
}

function listAvailableSlugs() {
  if (!fs.existsSync(RAW_DIR)) return [];
  const files = fs.readdirSync(RAW_DIR);
  const slugs = new Set();
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (VIDEO_EXTS.includes(ext) || IMAGE_EXTS.includes(ext)) {
      slugs.add(path.basename(file, ext));
    }
  }
  return Array.from(slugs).sort();
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getMediaDimensions(filePath) {
  try {
    const cmd = `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${filePath}"`;
    const out = execSync(cmd, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
    const [w, h] = out.split('x').map(Number);
    if (w && h) {
      return { width: w, height: h, aspectRatio: w / h };
    }
  } catch {
    // ffprobe fallback
  }
  return null;
}

function checkAspectRatio(filePath, typeLabel) {
  const dims = getMediaDimensions(filePath);
  if (!dims) return;

  const diff = Math.abs(dims.aspectRatio - TARGET_ASPECT);
  const fileName = path.basename(filePath);

  if (diff > 0.015) {
    console.warn(`\n   ⚠️  [ASPECT RATIO WARNING] ${typeLabel} "${fileName}" is ${dims.width}x${dims.height} (${dims.aspectRatio.toFixed(3)}).`);
    console.warn(`       Expected 16:9 (${TARGET_ASPECT.toFixed(3)}).`);
    console.warn(`       Center-cropping to 1280x720 to avoid ugly letterbox/pillarbox black bars.`);
  } else {
    console.log(`   📐 Dimensions: ${dims.width}x${dims.height} (16:9 matched)`);
  }
}

async function processMedia(slug) {
  if (!slug) {
    const available = listAvailableSlugs();
    console.log(`\n❌ Error: Please specify a slug to process.`);
    console.log(`\nUsage:`);
    console.log(`  node media-processor.js <slug>`);
    console.log(`  npm run media:process <slug>\n`);
    if (available.length > 0) {
      console.log(`Found raw files for slugs:`);
      for (const s of available) {
        console.log(`  • ${s}`);
      }
    } else {
      console.log(`No raw files currently found in "${RAW_DIR}".`);
    }
    process.exit(1);
  }

  ensureDir(PROCESSED_DIR);

  const rawVideo = findRawFile(slug, VIDEO_EXTS);
  const rawImage = findRawFile(slug, IMAGE_EXTS);

  if (!rawVideo && !rawImage) {
    console.error(`\n❌ Error: No raw media found for slug "${slug}" in "${RAW_DIR}".`);
    const available = listAvailableSlugs();
    if (available.length > 0) {
      console.log(`Available slugs: ${available.join(', ')}`);
    }
    process.exit(1);
  }

  console.log(`\n======================================================`);
  console.log(`🎬 Processing media pair for: "${slug}"`);
  console.log(`🎯 Target resolution: ${TARGET_WIDTH}x${TARGET_HEIGHT} (720p 16:9)`);
  console.log(`======================================================`);

  const startTime = Date.now();

  // Clean cover/crop filter: scales to cover 1280x720 and crops center (NO letterbox black bars!)
  const cropFilter = `scale=${TARGET_WIDTH}:${TARGET_HEIGHT}:force_original_aspect_ratio=increase,crop=${TARGET_WIDTH}:${TARGET_HEIGHT}`;

  // --- 1. Process Video ---
  if (rawVideo) {
    const rawVideoSize = fs.statSync(rawVideo).size;
    const outputVideo = path.join(PROCESSED_DIR, `${slug}.mp4`);
    console.log(`\n📹 Video: ${path.basename(rawVideo)} (${formatBytes(rawVideoSize)})`);
    checkAspectRatio(rawVideo, 'Video');

    // Video filter: cover scale + center crop + 30fps
    const videoFilter = `${cropFilter},fps=30`;
    const videoCmd = `ffmpeg -y -i "${rawVideo}" -an -vf "${videoFilter}" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart "${outputVideo}"`;

    try {
      execSync(videoCmd, { stdio: 'pipe' });
      const outVideoSize = fs.statSync(outputVideo).size;
      const reduction = (((rawVideoSize - outVideoSize) / rawVideoSize) * 100).toFixed(1);
      console.log(`   ✅ Saved: ${path.basename(outputVideo)} (${formatBytes(outVideoSize)})`);
      console.log(`   📉 Size reduction: ${reduction}% (${formatBytes(rawVideoSize - outVideoSize)} saved)`);
    } catch (err) {
      console.error(`   ❌ Video conversion failed:`, err.message);
    }
  } else {
    console.log(`\n📹 Video: (None found in raw/)`);
  }

  // --- 2. Process Image (or extract frame 0 if no raw image) ---
  const outputImage = path.join(PROCESSED_DIR, `${slug}.jpg`);

  if (rawImage) {
    const rawImageSize = fs.statSync(rawImage).size;
    console.log(`\n🖼️  Image: ${path.basename(rawImage)} (${formatBytes(rawImageSize)})`);
    checkAspectRatio(rawImage, 'Image');

    const imageCmd = `ffmpeg -y -i "${rawImage}" -vf "${cropFilter}" -q:v 3 -update 1 -frames:v 1 "${outputImage}"`;

    try {
      execSync(imageCmd, { stdio: 'pipe' });
      const outImageSize = fs.statSync(outputImage).size;
      const reduction = (((rawImageSize - outImageSize) / rawImageSize) * 100).toFixed(1);
      console.log(`   ✅ Saved: ${path.basename(outputImage)} (${formatBytes(outImageSize)})`);
      console.log(`   📉 Size reduction: ${reduction}% (${formatBytes(rawImageSize - outImageSize)} saved)`);
    } catch (err) {
      console.error(`   ❌ Image conversion failed:`, err.message);
    }
  } else if (rawVideo) {
    console.log(`\n🖼️  No raw image found. Auto-extracting Frame 0 from video...`);
    const extractCmd = `ffmpeg -y -ss 00:00:00.000 -i "${rawVideo}" -vf "${cropFilter}" -q:v 3 -update 1 -frames:v 1 "${outputImage}"`;
    try {
      execSync(extractCmd, { stdio: 'pipe' });
      const outImageSize = fs.statSync(outputImage).size;
      console.log(`   ✅ Extracted: ${path.basename(outputImage)} (${formatBytes(outImageSize)})`);
    } catch (err) {
      console.error(`   ❌ Frame 0 extraction failed:`, err.message);
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✨ Done in ${durationSec}s! Files saved to "${PROCESSED_DIR}".\n`);
}

const slugArg = process.argv[2];
processMedia(slugArg);
