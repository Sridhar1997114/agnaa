import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function convertDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let totalOrig = 0;
  let totalWebp = 0;
  let count = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const srcPath = path.join(dirPath, file);
      const baseName = path.basename(file, ext);
      const webpPath = path.join(dirPath, `${baseName}.webp`);

      const origSize = fs.statSync(srcPath).size;
      totalOrig += origSize;

      try {
        await sharp(srcPath)
          .resize({ width: 2000, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(webpPath);

        const newSize = fs.statSync(webpPath).size;
        totalWebp += newSize;
        count++;

        console.log(`[${count}] ${file} (${(origSize/1024/1024).toFixed(2)} MB) -> ${baseName}.webp (${(newSize/1024).toFixed(1)} KB) [${Math.round((1 - newSize/origSize)*100)}% saved]`);
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err.message);
      }
    }
  }

  console.log(`\nDirectory: ${dirPath}`);
  console.log(`Converted: ${count} images`);
  console.log(`Original Total: ${(totalOrig/1024/1024).toFixed(2)} MB`);
  console.log(`WebP Total: ${(totalWebp/1024/1024).toFixed(2)} MB`);
  console.log(`Total Reduction: ${Math.round((1 - totalWebp/totalOrig)*100)}%\n`);
}

async function run() {
  const projDir = 'i:\\AGNAA\\agnaa_in\\public\\projects';
  const manilaDir = 'i:\\AGNAA\\agnaa_in\\public\\projects\\manila';

  console.log('--- Converting projects/ ---');
  await convertDirectory(projDir);

  console.log('--- Converting projects/manila/ ---');
  await convertDirectory(manilaDir);
}

run();
