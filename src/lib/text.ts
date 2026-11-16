// Turns simple text into safe HTML: **bold**, blank line = new paragraph.
const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function richText(input: string): string {
  return input
    .split(/\n\s*\n/)
    .filter((p) => p.trim())
    .map((p) => `<p>${escape(p.trim()).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export const url = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;

// Image/video paths: full URLs stay as they are, "/media/..." gets the site base path.
export const media = (src: string) => (src && src.startsWith("/") ? url(src) : src);
