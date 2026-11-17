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
- `tagline` — one sentence shown on the card hover (bottom, full width). Keep it short (~100 chars).
- `showOnHomepage` — unused. Homepage "Selected Works" is curated in `site.json` → `homeWorks`
  ({category slug: [project slugs]}); opens on Visual Identity (`homeCategory` in index.astro).
  /works still filters by each project's `services`.
- `services` — list of service `slug`s from `services.json` (used for filters).
- `description` — plain text; `**bold**`, blank line = new paragraph.
- Project page intro (andwalsh-style): name (left 1/3) + lead text (right 2/3, Inter 26px). Lead = `task`, or `tagline`
  if no task. "More information +" expands: Services/Client/Location/Year, Info (`description`), Solution, live link.
- `task`, `solution` — same text format as description. Empty fields are hidden.
- `thumbnail` — image for cards; `cover` — big image on the project page (falls back to thumbnail).
- `coverVideo` — optional 16:9 MP4 (no audio, ~1280×720) used instead of the image on the card and the project
  cover; `thumbnail`/`cover` then serve as poster (use its first frame).
- `gallery` — images/videos in order (`.mp4` plays as video). An item can also be a list of 2–3 paths →
  a row side by side (crop them to the same aspect ratio). Galleries with rows get 20px gaps; flat ones stay seamless.
- `nextProjects` — optional list of slugs; otherwise the next projects in the list are shown.
- Order of projects in the file = order on the site.

## Images
- New images: put files in `public/media/` and reference them as `/media/file.jpg`.
  Compress large photos first (max ~2400px wide, JPEG/WebP).
- Any remote `framerusercontent.com` URL in `src/data` is downloaded into `public/media`
  and committed automatically by the deploy workflow (`scripts/localize-images.mjs`).
  After a deploy, run `git pull` before editing the JSON files.

## Workflow
1. Edit files, run `npm run build` to check it builds.
2. Commit to `main` with a short message → GitHub Actions deploys to GitHub Pages automatically (~1–2 min).
3. Tell the owner what changed and where to look.

## Design consistency (check before every change)
- Type scale is defined at the top of `src/styles/global.css` — never introduce new sizes.
  Body text 18px everywhere (incl. hero intro), uppercase UI 16px, labels 14px, project lead 26px Inter.
  Serif (Instrument Serif) only for headings/names — never for running text.
- Spacing: multiples of 4/8; card gaps 20px; page margins 40px (20px on phones).
- After a change, compare the edited block with the rest of the site (sizes, spacing, colors).

## Hero
- Left half (desktop) / top block (mobile): `hero.video` (+ `videoMobile`, `videoPoster`) if set, else `hero.image`.
  Current reel: 11 works × 0.6 s, 4:5, 1080×1350 (desktop) / 720×900 (mobile), H.264 no audio, built with ffmpeg
  (center 4:5 crops; poster = first frame). Keep desktop under ~4 MB, mobile under ~1.5 MB.

## Fonts
- Google Fonts: Instrument Serif, Inter (loaded in `src/layouts/Layout.astro`).
- Adobe Fonts (Adobe Handwriting Ernie for the hero signature): set `fonts.adobeKitId` in `site.json`
  to the owner's Adobe Fonts web project ID. Adobe's terms forbid self-hosting these files —
  always load them via the kit. While the ID is empty, the hero shows the signature PNG instead.
