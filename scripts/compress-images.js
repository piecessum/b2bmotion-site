/**
 * Сжатие растровых изображений в public/ «на месте» (пути и расширения
 * сохраняются, поэтому менять код не нужно).
 *
 * Что делает:
 *  - ограничивает ширину до MAX_WIDTH (огромные исходники — основной вес);
 *  - пере-кодирует PNG/JPEG с разумным качеством;
 *  - SVG/GIF не трогает.
 *
 * Запуск:
 *   node scripts/compress-images.js          # dry-run: только отчёт, файлы не меняются
 *   node scripts/compress-images.js --apply  # применить изменения
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const APPLY = process.argv.includes("--apply");
const MAX_WIDTH = 1920; // ни одна картинка на сайте не шире вьюпорта
const PNG_OPTS = { compressionLevel: 9, effort: 8, quality: 80, palette: true };
const JPEG_OPTS = { quality: 78, mozjpeg: true };

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return null;

  const before = fs.statSync(file).size;
  let img = sharp(file, { failOn: "none" });
  const meta = await img.metadata();
  if (meta.width > MAX_WIDTH) img = img.resize({ width: MAX_WIDTH });

  img =
    ext === ".png"
      ? img.png(PNG_OPTS)
      : img.jpeg(JPEG_OPTS);

  const buf = await img.toBuffer();
  // Пишем только если реально стало меньше.
  if (buf.length >= before) return { file, before, after: before, changed: false };
  if (APPLY) fs.writeFileSync(file, buf);
  return { file, before, after: buf.length, changed: true };
}

function mb(n) {
  return (n / 1024 / 1024).toFixed(2) + " MB";
}

(async () => {
  const files = walk(PUBLIC_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  const changes = [];

  for (const f of files) {
    try {
      const r = await processFile(f);
      if (!r) continue;
      totalBefore += r.before;
      totalAfter += r.after;
      if (r.changed) changes.push(r);
    } catch (e) {
      console.warn("skip", path.relative(PUBLIC_DIR, f), e.message);
    }
  }

  changes.sort((a, b) => b.before - b.after - (a.before - a.after));
  for (const c of changes.slice(0, 25)) {
    console.log(
      `${mb(c.before).padStart(9)} -> ${mb(c.after).padStart(9)}  ` +
        path.relative(PUBLIC_DIR, c.file)
    );
  }

  console.log("\n" + (APPLY ? "ПРИМЕНЕНО" : "DRY-RUN (файлы не изменены)"));
  console.log(`Файлов затронуто: ${changes.length}`);
  console.log(`Итого: ${mb(totalBefore)} -> ${mb(totalAfter)} (экономия ${mb(totalBefore - totalAfter)})`);
})();
