# CLAUDE.md — agent notes for samizdat-blog

The site for the [Samizdat project](https://github.com/tokahuke/samizdat) — a P2P content-addressed publishing protocol. The blog is itself deployed *on* Samizdat. Treat the design system as a values statement, not just chrome: restraint is the point.

## Stack

| Piece | Version / location |
|---|---|
| Hugo | `0.139.2+extended` (requires `+extended` for SCSS-era; current build uses Tailwind, but `+extended` is still needed for `js.Build`) |
| Tailwind CSS | v4, via Hugo Pipe `css.TailwindCSS`. **Requires the standalone `tailwindcss` binary in `$PATH`** — `brew install tailwindcss`. No `tailwind.config.js`; v4 config lives in `assets/css/main.css` `@theme`. |
| Build | `./build.sh` → `rm -rf public && hugo` |
| Local dev | `hugo serve --bind 127.0.0.1 -p 1313` (recall: kill + restart if template changes don't reflect — Hugo's auto-reload sometimes goes stale) |
| Deploy | `samizdat watch` / `samizdat commit` against the local node |

Theme dir (`themes/hugo-whisper-theme/`) is a stub. All layouts live in top-level `layouts/`.

## Samizdat-network conventions

These look like bugs but are intentional. **Do not "fix" them without thinking.**

- `baseURL = '~'` in `config.toml` is the Samizdat-network root marker. Hugo's `.Permalink` then returns `~/path/...` URLs that resolve correctly inside a Samizdat node but **404 in local `hugo serve`**.
- **For asset URLs (CSS, JS, images), use `.RelPermalink`**, not `.Permalink` — `RelPermalink` returns `/path/...` which works in both local dev and on the Samizdat network (the node serves `/` as the series root).
- `<script src="~/samizdat.js">` in `baseof.html` references the local Samizdat node's runtime shim. It 404s in vanilla HTTP — that's correct. The `defer` keeps the 404 from blocking parsing.
- `<a class="samizdat-link">` elements have their `href` rewritten at load to `http://localhost:4510/_series/<publicKey>/<path>`. The path is the markdown link's *text content* — see `assets/js/main.js`.
- `${origin}` placeholders inside `<pre class="template-origin">` blocks get replaced with `window.origin` at load. Used in install-page `curl` commands.

The Samizdat public key lives in `config.toml` `[Params].samizdatPublicKey`. It's injected into the page via a single inline `<script>` in `baseof.html` as `window.__samizdatPublicKey`. That's the ONE inline-JS exception in the codebase.

## JS contracts (assets/js/main.js)

Seven feature-detected initializers run on every page; each is a no-op if its relevant DOM is absent. **Verify they still work after any layout change.**

1. `substituteTemplateOrigin()` — `.template-origin` `${origin}` → `window.origin`
2. `rewriteSamizdatLinks()` — `a.samizdat-link` href rewriter (needs `window.__samizdatPublicKey`)
3. `rewriteHasOriginLinks()` — `a.has-origin` href rewriter (Windows download button on install page)
4. `initOsTabs()` — install-page OS-tab UI: platform auto-detect, click + arrow-key navigation, ARIA `aria-selected` / `tabindex` management
5. `initCopyButtons()` — `.pre-container` clipboard-copy buttons; reads `<pre>` content at click time so substitutions are already applied
6. `initDocsToc()` — builds `#toc .toc` from `.docs-content h2/h3`

`<a class="samizdat-link">` is the most fragile contract: its text content is the path, so if you escape or transform link text in templates you'll break it.

## Design system

### Tokens (`assets/css/main.css` `@theme`)

```
paper            #f7f5f0   newsprint cream (~90% of any view)
paper-deep       #efece4   folded-edge tone for bands
ink              #1a1a1a   near-black, never pure
ink-faded        rgb 70%   secondary text
ink-soft         rgb 50%   tertiary / rules
stamp            #c8102e   Pantone-186 territory, Soviet poster red

display+body     Geist Mono     (one face, weight differentiates)
accent           Special Elite  (eyebrows, .stamp only)
code             JetBrains Mono (block + inline)
```

Type scale: Perfect Fourth from 16px base (`--text-xs` 13px → `--text-5xl` 56px).

### Components

| Name | Where |
|---|---|
| `.stamp` | rotated rubber-stamp text, stamp red on transparent, bordered |
| `.eyebrow` | small uppercase accent tag in Special Elite — also used by `.docs-sidebar-title`, `.docs-toc-title`, `.docs-pager-label`, `.post-list-date` via shared selector |
| `.btn-arrow` | text-only `› UPPERCASE LABEL` button. No box, no fill. Underline on hover. |
| `.brand` | wordmark mark. Use `{{ partial "brand.html" "lg"|"sm" }}` — never re-inline the markup. |
| `.link-nav` | nav links; `[aria-current="page"]` gets a stamp-red underline |
| `.note` | `<aside>` call-out: left stamp-red rule + faint red wash |
| `.prose-samizdat` | long-form markdown wrapper (article body, marketing pages, docs content) |
| `.hero-split` + `.hero-image` + `.hero-text` | homepage hero — 50/50 grid on desktop, stacked on `< 64rem` |
| `.section`, `.section-band`, `.section-title` | homepage section wrappers |
| `.steps` + `.step-num` | 3-column numbered step list, big stamp-red numerals |
| `.pull-headline` + `.pull-body` | UPPERCASE pull-quote sections |
| `.upside-grid` | two-column asymmetric tiles |
| `.os-tabs`, `.tab-btn`, `.tab-panel` | install-page OS tabs (ARIA-complete) |
| `.pre-container`, `.copy-btn` | code blocks with corner copy button |
| `.docs-layout`, `.docs-sidebar`, `.docs-main`, `.docs-toc`, `.docs-pager` | docs three-column layout |

### Aesthetic principles (don't violate without discussion)

- **3 colors, 3 fonts, mono everywhere.** Hierarchy comes from weight + size + opacity, not new colors. No sans-serif fallback.
- **No `border-radius`.** Rectangles only.
- **No inline `style="..."` attributes.** Extract to `@layer components` or use Tailwind utilities.
- **ALL CAPS for major headings** (hero title, section titles, pull headlines) — manifesto register.
- **`<u>` is rendered as a 5px stamp-red highlight** — preserves the original copy's emphasis markers as visual highlights, not sober underlines.
- **The hero is the Red Wedge** (El Lissitzky, 1919). It's the single artistic mark — don't replace lightly. Public domain. Aspect ratio is handled by a 50/50 split; image is `object-fit: contain` so the geometry stays intact.
- **A single solid stamp-red corner triangle** sits in the upper-right of the hero image panel. That's the only block of pure red on the page; it's load-bearing.

### Code discipline

- Semantic HTML throughout: `<header>`, `<main id="main">`, `<nav>` with `aria-label`, `<article>`, `<aside>`, `<section>`.
- Every page has a skip-link to `#main` (in `baseof.html`).
- `scroll-margin-top: 5rem` on heading anchors (sticky header offset).
- ARIA tabs pattern is fully implemented (selected/controls/labelledby + arrow-key + Home/End).
- No copy-pasted markup across partials. The brand mark, nav items, and chrome live in their own partials.

## Out of scope (intentional gaps)

- **`content/docs/architecture/*` stubs** — empty heading scaffolds (`collections.md`, `series.md`, `objects.md`, `network.md`, `autovacuum.md`, `subscriptions.md`). Content gaps, not design gaps; the author hasn't written them and the redesign explicitly skipped them.
- **No dark mode.** Paper + ink is the worldview.
- **No signature gimmicks** — no watermarks, no "GO UNDERGROUND" toggle, no orchestrated page-load motion, no decorative components beyond the three above. We tried; user explicitly rejected.

## Build verification

After substantive edits:

```bash
cd ~/external/samizdat-blog && rm -rf public && hugo --minify
```

29 pages should build cleanly in ~600–950ms. There is a pre-existing `WARN  No such document type %!s(<nil>)` from `layouts/_default/single.html` when `.Params.type` is unset — it predates the redesign and isn't a regression.

Cross-page sanity:
```bash
for p in / /install/ /about-us/ /donate/ /blog/ /blog/samizdat-and-hugo/ /docs/ /docs/getting-started/ /docs/architecture/; do
  curl -s -o /dev/null -w "%{http_code} %-50s\n" "$p" "http://127.0.0.1:1313$p"
done
```

Hard-refresh the browser when you change anything in `@theme` or `@layer base` — Tailwind regenerates the CSS hash and stale browser caches can mislead.

## Common pitfalls

- **`tailwindcss` not in `$PATH`** → Hugo's `css.TailwindCSS` fails silently or with a binary-not-found error. `brew install tailwindcss`.
- **Using `.Permalink` on assets** → URLs become `~/css/main.xxx.css` and 404 in local dev. Switch to `.RelPermalink`.
- **Markdown inside HTML `<div>` blocks** → Goldmark by default doesn't parse markdown inside block-level HTML. Either inline raw HTML for the whole block (see `content/install.md` OS tabs) or use blank lines + careful indentation.
- **Hugo serve stale template state** → if a template change isn't reflected after save, kill `hugo serve` and restart. Don't trust `curl`-only verification.
- **Adding decorative elements "to make it more X"** → don't. We learned this the hard way. The visual vocabulary is paper + ink + stamp + Special Elite accents + the Wedge. Anything else should fight for its life before being added.

## Skills

When iterating on this repo with Claude, the relevant installed skills are:
- `frontend-design` (Anthropic) — invoke before substantive visual changes
- `typography` (petekp/claude-code-setup) — for scale/rhythm work
- `theme-factory` (Anthropic) — useful only when defining a new theme; the existing one is locked
- `web-design-guidelines` (vercel-labs) — accessibility audit pass
- `simplify` — duplication/quality audit pass

Run `simplify` and `web-design-guidelines` at the end of each substantive change set, not as a single final pass.
