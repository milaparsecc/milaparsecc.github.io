// Typographic clean-up applied to every built HTML page (text only, never tags/attributes/scripts):
// short words (articles, conjunctions, prepositions, any 1–3 letter word) are glued to the next word
// with a non-breaking space, so they never hang at the end of a line; a dash is glued to the word before it.
import fs from "node:fs/promises";
import path from "node:path";

const LONG = "from|with|into|onto|over|than|that|this|your|each|both|upon";
const glue = new RegExp(`(^|[\\s(“‘])((?:[A-Za-zÀ-ž’']{1,3}|${LONG}))[ ](?=[^\\s<])`, "gi");

export function fixText(t) {
  let out = t;
  for (let i = 0; i < 2; i++) out = out.replace(glue, "$1$2 "); // twice: "a bit of a"
  out = out.replace(/ ([—–]) /g, " $1 ");
  return out;
}

export function fixHtml(html) {
  return html.replace(/(<(script|style|svg)\b[\s\S]*?<\/\2>)|(<[^>]+>)|([^<]+)/gi, (m, block, _t, tag, text) =>
    text ? fixText(text) : m
  );
}

async function walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (p.endsWith(".html")) await fs.writeFile(p, fixHtml(await fs.readFile(p, "utf8")));
  }
}

export default function typography() {
  return {
    name: "typography",
    hooks: { "astro:build:done": async ({ dir }) => walk(new URL(dir).pathname) },
  };
}
