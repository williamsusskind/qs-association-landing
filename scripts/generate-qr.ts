import { schools } from "../src/config/schools";
import QRCode from "qrcode";
import { mkdirSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.BASE_URL || "https://example.com";
const OUTPUT_DIR = path.resolve(__dirname, "../public/qr-codes");

async function main() {
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  if (schools.length === 0) {
    console.log("No schools in registry. Add entries to src/config/schools.ts");
    return;
  }

  for (const school of schools) {
    const url = `${BASE_URL}/s/${school.slug}`;
    const outputPath = path.join(OUTPUT_DIR, `${school.slug}.png`);
    await QRCode.toFile(outputPath, url, {
      width: 1024,
      margin: 2,
      color: { dark: "#070b16", light: "#ffffff" },
    });
    console.log(`  ${school.slug}.png -> ${url}`);
  }

  console.log(`\nDone. ${schools.length} QR codes in ${OUTPUT_DIR}`);
}

main();
