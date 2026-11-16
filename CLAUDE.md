# Mila Parsec — portfolio site

Static portfolio site built with Astro, rebuilt from the original Framer project.
The owner edits the site only by chatting with Claude, so keep changes simple,
explain them in plain language (she writes in Russian), and never leave the build broken.

## Where things live

| What to change | File |
| --- | --- |
| Name, role, location, About me texts and photo, contacts, socials, footer | `src/data/site.json` |
| Projects (Works): titles, descriptions, client, year, images, homepage selection | `src/data/works.json` |
| Services (cards on the homepage and filters on /works) | `src/data/services.json` |
| Archives page items | `src/data/archives.json` |
| Colors, fonts, sizes, spacing | `src/styles/global.css` (variables at the top) |
| Page layouts | `src/pages/*.astro`, `src/layouts/Layout.astro` |

### works.json fields
- `slug` — URL part: `/works/<slug>`. Lowercase, latin letters, hyphens.
- `showOnHomepage` — `true` to show in "Selected Works" on the homepage.
- `services` — list of service `slug`s from `services.json` (used for filters).
- `description` — plain text; `**bold**`, blank line = new paragraph.
- `thumbnail` — image for cards; `cover` — big image on the project page (falls back to thumbnail).
- `gallery` — images/videos shown on the project page, in order (`.mp4` plays as video).
- `nextProjects` — optional list of slugs; otherwise the next projects in the list are shown.
- Order of projects in the file = order on the site.

## Images
- New images: put files in `public/media/` and reference them as `/media/file.jpg`.
  Compress large photos first (max ~2400px wide, JPEG/WebP).
- Some images still point to `framerusercontent.com`. The manual workflow
  "Copy images from Framer into the repo" (`.github/workflows/localize-images.yml`)
  downloads them into `public/media` and rewrites the JSON.

## Workflow
1. Edit files, run `npm run build` to check it builds.
2. Commit to `main` with a short message → GitHub Actions deploys to GitHub Pages automatically (~1–2 min).
3. Tell the owner what changed and where to look.
