// Downloads remote framerusercontent.com media into public/media
// and replaces the URLs in src/data/*.json with local paths.
import fs from "node:fs/promises";
import path from "node:path";

const dataDir = "src/data";
const outDir = "public/media";
await fs.mkdir(outDir, { recursive: true });

const files = (await fs.readdir(dataDir)).filter((f) => f.endsWith(".json"));
const pattern = /https:\/\/framerusercontent\.com\/(?:images|assets)\/([A-Za-z0-9_-]+\.[a-z0-9]+)/g;
const done = new Map();

for (const file of files) {
  const full = path.join(dataDir, file);
  let text = await fs.readFile(full, "utf8");
  const urls = [...new Set([...text.matchAll(pattern)].map((m) => m[0]))];
  for (const url of urls) {
    if (!done.has(url)) {
      const name = url.split("/").pop();
      const res = await fetch(url);
      if (!res.ok) {
        console.warn("Skipped", url, res.status);
        continue;
      }
      await fs.writeFile(path.join(outDir, name), Buffer.from(await res.arrayBuffer()));
      done.set(url, `/media/${name}`);
      console.log("Saved", name);
    }
    text = text.split(url).join(done.get(url));
  }
  await fs.writeFile(full, text);
}
console.log(`Done: ${done.size} files.`);
