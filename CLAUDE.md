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
- Project page intro (grid 1/3 + 2/3), reading order: row 1 = name | lead (Inter 26px, lh 1.35; `lead`, else `task`,
  else `tagline`); row 2 = "project passport" (sticky): Role/Client/Year/Location as label|value rows with hairlines,
  Services as outlined pill links to /works?work=<slug>, Deliverables split on commas into grey-outlined pills | Context (`description`), Task, Solution: 18px, line-height 1.5,
  max 760px, hairline + label above each, 32px between (owner found more air too much scrolling). All open, no toggle.
- `role` — the owner's role on the project (shown first in the meta row), e.g. "In-house designer", "Freelance designer".
  Owner's case text template: Tagline / Lead / Meta / Context / Task / Solution (Mynds is the reference).
- `concept` — shown in More information after Task; if the gallery has a concept block, it fills that block instead.
- `deliverables` — optional, shown full-width in the meta row.
- `task`, `solution` — same text format as description. Empty fields are hidden.
- `thumbnail` — image for cards; `cover` — big image on the project page (falls back to thumbnail).
- `coverVideo` — optional 16:9 MP4 (no audio, ~1280×720) used instead of the image on the card and the project
  cover; `thumbnail`/`cover` then serve as poster (use its first frame).
- `gallery` — images/videos in order (`.mp4` plays as video). An item can also be a list of 2–3 paths →
  a row side by side (crop them to the same aspect ratio). Galleries with rows get 20px gaps; flat ones stay seamless.
  `seamless: true` on a work forces no gaps anywhere, rows included (Rubin — owner wants it gapless).
- Gallery item `{ "type": "concept", "image", "title", "text" }` → logo image left, white text block right
  (50/50 like the hero). Used instead of flat "KONCEPCE" slides (Iris, Alla Vakker).
- Client photo cards ("about" blocks) were tried and removed at the owner's request (Nov 2026) — don't add them back.
- Gallery item `{ "type": "feature", "image", "label", "title", "text", "detail" }` → two equal squares (visual 1:1 left, text right), right: small label,
  serif title, English text, optional small dark "detail" image (formula, highlights, sub-logo). Optional `circles`: list of square photos shown as a row of 80px round thumbnails (Rubin and Rubin Catering Instagram highlights). Replaces old slides with
  baked-in Czech text (Rubin: concept, Instagram, Rubin Catering). Crops live in /media/rubin/.
- Gallery item `{ "type": "site", "image", "address", "url", "button" }` → dark Rubin block (owner's textured background /media/rubin/site-bg-*.jpg, dark browser bar) with a browser window whose
  live site in an iframe (`url?embed=1`, scrollable in place; loaded lazily, desktop ≥810px only;
  embed hides the prototype badge) + hint + pill button opening `url` in a new tab. Phones: the self-scrolling screenshot instead.
- `public/rubin-site/` — live HTML prototype of the owner's Rubin Production homepage (desktop), rebuilt from Figma
  file fD2eQpiDJRQ1bz3flg6Deu, Frame 35 (node 3006:17). Static HTML, sizes in design px × --u, self-hosted Montserrat +
  Permanent Marker. Grunges lettering ("the best", "our", "about your project"), the grey heading and CLICK are
  outlines/rasters exported from the owner's RubinMain.svg (positions = SVG coords − 10px offset). Menu: no language switch.
  Motion (owner chose "camera / recording" style, Nov 2026): headings type letter by letter with a red blinking caret
  ([data-type] text; [data-typeimg] outlined lettering uncovered in letter steps, data-clip/data-end/data-n), in order per
  section (data-order); no viewfinder/REC overlay (owner removed it); everything else
  only fades in (.rv). No wipes, slide-ups, spins or parallax — she disliked them. Old site, company has since rebranded → present as a past website.
  Showreel section: click plays assets/showreel.mp4 in place (fills the section, with sound), click again pauses,
  back to the cover when it ends. No popup player, no typing on the lockup.
  Hover style is the same everywhere on these pages: text links (menu, social, contacts, footer) get a 1px accent line
  growing from the left, colour unchanged; buttons fill with the accent and the arrow slides; photos zoom slightly.
  Footer has z-index 3 (it was hidden under the portfolio section).
- `public/rubin-site/scooty/` — Scooty case page of that site (from the owner's Scooty.svg, 1440×7625). Background = the
  design rendered at 2x without the animated parts (a/bg0-7.jpg, edges trimmed); animated parts are transparent WebP
  layers placed in design px (positions in scooty/meta.json, generated by a Playwright export of the SVG). Same motion
  rules: lettering headings type in (INSTAGRAM GRID, LANDING, LET'S TALK…; logos never animate), the rest fades in,
  photos zoom slightly on hover, two grey Grunges lines run as marquees along the -3.44° slant, live lime form.
  Homepage card Scooty (c1) links to scooty/. Embedded detection = window.top check (badge hidden in the case iframe).
- `public/rubin-site/elite-voyage/` — Elite Voyage case page (owner's Elite.svg, 1440×8689), built the same way as Scooty
  (gold #b9965a accent; RUS/GER removed from its menu, nav shifted to align like Scooty). Homepage card c3 links to it.
- `public/rubin-site/gamechanger/` — GameChanger case page (owner's GameChanger.svg, 1440×7689), same build (purple #7055ec;
  per-marquee angle in meta.json). Homepage card c2 links to it. All 3 portfolio cards now open case pages.
  Still to do: mobile version (Figma MCP Starter plan hit its call limit, Nov 2026).
  Preview screenshot: /media/rubin/site-home-*.jpg (re-shoot full page at 1440 after changes).
- Gallery item `{ "type": "ads", "label", "handle", "avatar", "rows": [[{ "src" }, …], …] }` → dark textured Rubin
  background like the other Rubin blocks (owner removed film strips, tabs, texts and format captions as "too much"): small label + a row of 4
  just the ad images with 12px corners (owner removed frames, then the handle/"Sponsored" captions as noise); 2 per row below 1024px.
  Rubin: row 1 = 4 recruitment ads (4:5), row 2 = 4 service ads (1:1, cut from the owner's 2-up images), after the Instagram feature.
- Gallery item `{ "type": "stories", "items": [9:16 images] }` → dark Rubin background, three stories in view (16px corners),
  the rest scroll horizontally: round arrows (scroll by one, disabled at the ends), mouse drag, swipe, keyboard arrows.
  Auto-scrolls one story every 4 s while ≥50% in view (no hover pause — owner saw no motion with the mouse over it; pauses only while pressed, waits 6 s after manual
  scrolling, loops to start).
  Story width = min(360px, (100svh − 200px)·9/16, (100vw − 288px)/3) → always fits the window; phones: 68vw, swipe, peek.
  Owner tried an auto-playing single-phone player and food plates in the corners — replaced by this (Nov 2026).
  Used for Rubin Catering (7 stories, 720×1280), after the Catering feature (old 3-stories image removed).
- Gallery item `{ "type": "set", "title", "items": [...] }` → small label + a row (e.g. one ad campaign per book;
  4 per row on desktop, 2 on phones). Used in First Class Social Ads.
- Gallery item `{ "type": "heading", "title" }` → small chapter label inside a gallery (Space Karlín: "Wayfinding & signage" / "Menus").
  Space Karlín Menus chapter: bar photo (full width), then a row of 3 squares: menu wall close-up, printed CZ/EN
  menus mockup, Christmas menus mockup (owner's AI mockups, Nov 2026). Window photo closes the gallery.
- `titleScript` — optional word after the title in Adobe Handwriting (e.g. la FORMULA + "Christmas").
- `nextProjects` — "You might also like": 3 hand-picked slugs per project, chosen by theme and mood (set for all
  10 in Nov 2026 — update when adding a project). If fewer than 3, it's topped up with the next projects in the list.
- Order of projects in the file = order on the site.

## Links & sharing
- `?work=<service slug or its start>` opens that tab on the homepage or /works (e.g. `/?work=social`, `/works?work=packaging`).
- Link previews (Open Graph): `site.json` → `seo.image` (1200×630) for most pages; project pages use `cover`/`thumbnail` (non-GIF) and `tagline`.

## Images
- New images: put files in `public/media/` and reference them as `/media/file.jpg`.
  Compress large photos first (max ~2400px wide, JPEG/WebP).
- Any remote `framerusercontent.com` URL in `src/data` is downloaded into `public/media`
  and committed automatically by the deploy workflow (`scripts/localize-images.mjs`).
  After a deploy, run `git pull` before editing the JSON files.

- When replacing an image, ALWAYS use a new file name (e.g. add a short hash): browsers and GitHub Pages
  cache files by name for a while, so reusing a name makes the change invisible to the owner.

- `site.json` → `cv.enabled: false` hides the CV everywhere (nav, About row, Contact); also remove the PDF if asked to hide it.
  It was hidden 20–24 Nov 2026 and restored; the PDF can always be recovered with `git checkout 281e0d9 -- public/cv/...`.
- CV: `public/cv/Mila-Parsec-Brand-Designer-CV.pdf` (`site.json` → `cv`). Linked in nav (opens new tab), About
  (last row) and Contact. To update: replace the file keep the same name so shared links keep working (GitHub Pages may cache it ~10 min) and bump the date in `cv.label`.

## Workflow
1. Edit files, run `npm run build` to check it builds.
2. Commit to `main` with a short message → GitHub Actions deploys to GitHub Pages automatically (~1–2 min).
3. Tell the owner what changed and where to look.

## Design consistency (check before every change)
- Type scale is defined at the top of `src/styles/global.css` — never introduce new sizes.
  Body text 18px everywhere (incl. hero intro), uppercase UI 16px, labels 14px, project lead 26px Inter.
  Serif (Instrument Serif) only for headings/names — never for running text.
- Spacing: multiples of 4/8; card gaps 20px; page margins 40px (20px on phones).
- Typography: no short words (a, and, of, to, the, I…) hanging at line ends. `scripts/typography.mjs` glues them
  to the next word with &nbsp; in every built page — keep it enabled; check line breaks in screenshots.
- After a change, compare the edited block with the rest of the site (sizes, spacing, colors).
- Running text everywhere: line-height 1.5 + text-wrap: pretty (rule at the end of global.css) — same as the case
  texts; add new text classes there. Headings/labels keep their tighter line-height.

## Hero
- `hero.availability` — "Open to …" text shown as a running line (white strip with hairlines, uppercase 16px, navy accent dot;
  owner dislikes black blocks — keep it light)
  across the bottom of the first screen; links to /contact, pauses on hover; empty string hides it. under the intro (small label with an accent dot). Keep it to one line on phones.
- Homepage section "Expertise" (nav label too) shows `services.json`; its anchor stays `#services`.
- Left half (desktop) / top block (mobile): `hero.video` (+ `videoMobile`, `videoPoster`) if set, else `hero.image`.
  Current reel: 11 works × 0.6 s, 4:5, 1080×1350 (desktop) / 720×900 (mobile), H.264 no audio, built with ffmpeg
  (center 4:5 crops; poster = first frame). Keep desktop under ~4 MB, mobile under ~1.5 MB.

- `hero.intro`: `\n` = forced line break (first sentence on its own line).

## Analytics
- Google Analytics 4: `site.json` → `analytics.gaId` (G-EHQ1K4ZLZ2). Loaded only after the visitor clicks Accept in the
  cookie banner (Layout.astro; choice in localStorage `mp-cookie-consent`); "Cookies" button in the footer reopens it.

## Fonts
- Google Fonts: Instrument Serif, Inter (loaded in `src/layouts/Layout.astro`).
- Adobe Fonts (Adobe Handwriting Ernie for the hero signature): set `fonts.adobeKitId` in `site.json`
  to the owner's Adobe Fonts web project ID. Adobe's terms forbid self-hosting these files —
  always load them via the kit. While the ID is empty, the hero shows the signature PNG instead.
