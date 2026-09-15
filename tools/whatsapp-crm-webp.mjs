/**
 * Rebuilds the WebP set the featured WhatsApp CRM section imports.
 *
 *   npm run assets:crm
 *
 * The marketing renders in "src/assets/wahtsapp CRM/marketing/out" are 2–3 MB
 * PNGs — 73 MB for the full set. The section only needs a curated slice, at
 * display resolution, so this resizes and re-encodes them to ~800 KB total.
 *
 * Only light-theme desktop screens are used: the clean-screen set is mostly
 * light, and mixing the two themes in one gallery reads as a mistake rather
 * than a choice. The two dark phone screens are the exception — there is no
 * light mobile chat render, and they sit in their own band.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src/assets/wahtsapp CRM/marketing/out");
const DST = path.join(ROOT, "src/assets/whatsapp-crm");

/* [source png, output name, target width] */
const JOBS = [
  ["hero-primary", "hero", 2000],
  ["showcase-multidevice", "multidevice", 2000],

  ["screen-inbox-light", "inbox-light", 1700],
  ["screen-dashboard", "dashboard", 1700],
  ["screen-deals", "deals", 1700],
  ["screen-analytics", "analytics", 1700],
  ["screen-automation", "automation", 1700],
  ["screen-broadcasts", "broadcasts", 1700],
  ["screen-ai-config", "ai-config", 1700],
  ["screen-contacts", "contacts", 1700],
  ["screen-team", "team", 1700],

  ["screen-mobile-inbox", "phone-inbox", 520],
  ["screen-mobile-chat", "phone-chat", 520],
];

await mkdir(DST, { recursive: true });

let total = 0;
for (const [src, name, width] of JOBS) {
  const { size } = await sharp(path.join(SRC, `${src}.png`))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(DST, `${name}.webp`));
  total += size;
  console.log(`${name.padEnd(14)} ${(size / 1024).toFixed(0).padStart(4)} KB`);
}
console.log(`\n${JOBS.length} files · ${(total / 1024 / 1024).toFixed(2)} MB`);
