# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository nature

This is a **Next.js 14 App Router web project** for the business **Pempek 788 Mang Jai** (Batam-based pempek UMKM since 2013). The project was scaffolded in Sprint 1 from the brief documents. Stack: **Next.js 14 + TypeScript + Tailwind CSS + Vercel free tier**. No backend, no DB, no auth — order flow is **client-side cart → WhatsApp checkout**.

Three brief documents at root capture the product spec and remain authoritative as the project evolves:

- [PRD.md](PRD.md) — Product Requirements Document (14 sections, ~4.3k words). The build spec.
- [PROMPT_PRD.md](PROMPT_PRD.md) — self-contained prompt template to regenerate the PRD in a fresh AI session.
- [CLAUDE.md](CLAUDE.md) — this file (codebase quick-reference for future agents).

## Common commands

```powershell
npm install            # first time — install dependencies
npm run dev            # dev server with HMR (http://localhost:3000)
npm run build          # production build (next build) — also runs as Vercel build
npm run start          # serve production build locally
npm run lint           # ESLint with next/core-web-vitals
```

No tests configured yet (out of MVP scope).

## Architecture at a glance

- `app/` — App Router pages. `page.tsx` = route. Client components inside route folders are co-located (e.g. `app/produk/ProductCatalog.tsx`).
- `components/` — shared UI primitives. `Header` and `ProductCard` are client components (use cart); `Footer` and `FloatingWAButton` are server components.
- `data/` — hardcoded source-of-truth: `products.ts` (13 SKUs), `certifications.ts`, `retail.ts`, `types.ts`. Update prices/products here, then redeploy.
- `lib/` — pure utilities: `constants.ts` (brand facts, contacts), `format.ts` (`formatRupiah`), `whatsapp.ts` (`buildWhatsAppMessage` + URL builders), `cart.tsx` (Context + reducer; persists to `localStorage` key `mangjai-cart-v1`).
- `public/image/` — 60 photo assets (`pack-*`, `plated-*`, `hampers-*`, `slide-*`, etc.). Reference as `/image/<slug>.jpeg` in code.
- `app/globals.css` + `tailwind.config.ts` — design tokens under `brand.*` namespace (`bg-brand-primary`, `text-brand-text-muted`, etc.).

## Sprint progress

- **Sprint 1 ✅**: scaffold, design system, `/` (Beranda), `/produk` (full catalog + cart-add).
- **Sprint 2 ✅**: `/beli` (cart review + WhatsApp checkout) and `/kontak` (channel cards + Google Maps embed). Cart-to-WhatsApp flow end-to-end functional.
- **Sprint 3 ✅**: all four content pages real — `/tentang`, `/teras`, `/hampers`, `/legalitas` (with `<dialog>` modal lightbox for scans, NIK auto-hidden via `canShowScan()`).
- **Sprint 4 ✅**: launch-ready SEO + a11y polish:
  - **SEO**: `app/sitemap.ts` (route-based, all 8 pages with priority/changeFreq), `app/robots.ts` (allows all, links to sitemap), Open Graph metadata with `metadataBase` + Twitter card + canonical URL, Schema.org `FoodEstablishment` JSON-LD in homepage via `<HomepageJsonLd />` (`components/JsonLd.tsx`) with founders/address/hours/social links.
  - **a11y**: skip-to-content link (`.skip-link` in `app/globals.css`, slides in on `:focus-visible`), global `:focus-visible` ring using `theme('colors.brand.primary')`, `prefers-reduced-motion` honored. Skip link targets `<main id="main">` in `app/layout.tsx`.
  - **Resilience**: `app/error.tsx` global error boundary with retry + WA fallback, `app/not-found.tsx` custom 404 page (marked `robots: { index: false }`).
  - **Site URL**: `SITE_URL` constant in `lib/constants.ts` reads `NEXT_PUBLIC_SITE_URL` → `VERCEL_URL` → default. Used by sitemap, robots, JSON-LD, OG tags.
- **Sprint 5.2 ✅** (current state): **Inventory & Pricing dari Google Sheets** — owner update harga + stock lewat Google Sheets, website auto-fetch dengan ISR (5 min cache). Stock badge ("Habis" / "Sisa N") + disable tombol "Tambah" saat habis.
  - **Source of truth**: env var `GOOGLE_SHEETS_PRODUCTS_CSV_URL` (publish-to-web CSV). Fallback ke `data/default-inventory.ts` kalau env kosong atau fetch gagal.
  - **Sheet schema**: `id | isi_per_pack | satuan_label | harga_per_pack | stock_qty`. Nama produk **TIDAK** di sheet (anti-typo) — itu hardcoded di `data/products-base.ts`. 3 SKU "Hubungi Kami" (Pempek Campur, Tekwan Ikan, Kue Bawang): `stock_qty` kosong di sheet → tidak ditrack.
  - **Stock threshold**: `STOCK_LOW_THRESHOLD = 10` di `lib/sheets.ts`. `stock_qty === 0` → badge "Habis" + button disabled. `0 < stock_qty ≤ 10` → badge "Sisa N". `stock_qty > 10` atau `null` → no badge.
  - **Data architecture**: static base (`data/products-base.ts`) merged dengan dynamic inventory (Sheets via `lib/sheets.ts`) di `data/products.ts` async `getProducts()`. Pages (`/`, `/produk`, `/beli`) jadi async server component. `CheckoutClient` (client) terima `products: Product[]` prop dari `/beli` server page. Cart hydration di `lib/cart.tsx` pakai `getProductByIdSync` (fallback only) karena async tidak bisa di client.
  - **Cart price behavior**: live dari Sheets saat checkout (bukan frozen saat add-to-cart). User yang tambah Senin (harga lama), checkout Rabu (harga baru) → pesan WA pakai harga Rabu.
  - **CSV parser**: 30-line custom parser di `lib/sheets.ts` (RFC 4180 quoting, tolerate `Rp 50.000` / `50,000` / `50000` semua sama).
  - **Owner workflow**: edit Sheets → tunggu ≤ 5 menit → live. Tidak perlu redeploy.
- **Sprint 5.1 ✅**: **Testimoni feature** — homepage highlight section (4 picks) + dedicated `/testimoni` page with **19 testimoni** grouped by source (press, instagram, **tiktok**, facebook, whatsapp).
  - **Multi-media support**: `TestimoniMedia` discriminated union with 5 types — `image`, `video` (self-host MP4), `youtube`, `tiktok`, `instagram` (embeds via iframe, no SDK needed). Cards show source badge + play button overlay for video-like media; modal lightbox renders appropriate player.
  - Data: `data/testimoni.ts` (typed `Testimoni[]` with `media`, `source`, `platform`, `author`, `excerpt`, `fullQuote`, `highlight`). Sources: 2 press, 3 instagram, 8 tiktok (@mangjai788channel), 2 facebook, 4 whatsapp.
  - Components: `TestimoniCard` (portrait 9:16 with source badge + dark gradient caption) + `TestimoniGrid` (client, native `<dialog>` lightbox with media+quote two-column layout, "Buka di TikTok" external link for TikTok entries)
  - Files: 11 image testimoni + 8 TikTok poster thumbnails live in `public/image/testimoni/` with semantic slugs (`press-*`, `ig-*`, `fb-*`, `wa-*`, `poster-tiktok-*`); video testimoni use TikTok iframe embed (`https://www.tiktok.com/embed/v2/{videoId}`) for playback, locally-hosted JPEG posters for card previews.
  - **TikTok poster pipeline**: download via `oembed` once with PowerShell — fetch `https://www.tiktok.com/oembed?url={video_url}` → grab `thumbnail_url` → `Invoke-WebRequest` to local file. Posters are static after download (committed to repo); rerun script if you add new videos.
  - Nav: "Testimoni" added to header nav (between Teras & Legalitas) + footer + sitemap
- **Sprint 5 ✅**: **total UI/UX redesign** to Brightland-inspired editorial aesthetic. Changes:
  - **Design tokens**: new color palette (cream/gold/forest/brick) in `tailwind.config.ts`
  - **Typography**: added Fraunces variable serif as `font-display`; Plus Jakarta Sans + Inter retained
  - **Motion**: added `framer-motion` dep + `components/motion.tsx` primitives (`FadeUp`, `RevealWords`, `StaggerList`, `ParallaxFade`)
  - **All 8 pages rebuilt** with editorial pattern: eyebrow label + hairline + Fraunces split headlines + alternating dark/light sections + magazine-style asymmetric grids on `/hampers`
  - **`globals.css`** patterns: `.eyebrow`, `.display`, `.display-italic`, `.hairline`, `.drop-cap`, `.section-pad`, `.photo-warm`
  - **Components refreshed**: Header (transparent → solid on scroll), Footer (dark editorial), ProductCard (editorial — large Fraunces price), CertificateGrid (gold star icons), FloatingWAButton (subtle pulse-in animation)
- **Post-launch enhancements (out of Sprint 5 scope)**:
  - Install `@vercel/analytics` + `@vercel/speed-insights` and add `<Analytics />`/`<SpeedInsights />` to `app/layout.tsx` — enable from Vercel dashboard after first deploy.
  - Generate pixel-perfect 1200×630 OG image via `app/opengraph-image.tsx` using `next/og` (currently OG uses existing display photo).
  - Add per-page JSON-LD (e.g. `Restaurant` schema for `/teras`, `ItemList` for `/produk`).
  - Redact NIK from `slide-06-legalitas-siumk-2017.jpeg` and `slide-07-legalitas-nib-2020.jpeg`, save as `-redacted.jpeg`, then update `data/certifications.ts` so scans become viewable.

## Design system (Sprint 5 redesign — "Brightland-inspired")

The site uses an **editorial premium DTC aesthetic** inspired by Brightland (California olive oil DTC). Heritage shown as substance — not visual cliché. Cream + champagne gold palette, serif display headlines, photography-led layouts, generous whitespace.

### Color tokens (all in `tailwind.config.ts` under `brand.*`)
| Token | Hex | Use |
|---|---|---|
| `brand-bg` | `#F4ECD8` | Body background (oat cream) |
| `brand-bg-soft` | `#FAF5E6` | Alternate section bg |
| `brand-surface` | `#FFFFFF` | Cards |
| `brand-primary` | `#2D4A2F` | CTAs, links (deep forest green) |
| `brand-primary-hover` | `#243A26` | hover |
| `brand-secondary` | `#A8302E` | Accents, badges (brick red) |
| `brand-accent` | `#C9A85B` | Premium accent (champagne gold) — eyebrows, hairlines |
| `brand-accent-soft` | `#E5D5A8` | Softer gold tone |
| `brand-text` | `#1A1815` | Warm charcoal body |
| `brand-text-muted` | `#7A6F60` | Muted body |
| `brand-text-soft` | `#A89C8A` | Softest captions |
| `brand-border` | `#E0D5BD` | Borders |
| `brand-wa` `#25D366` / `brand-wa-hover` `#1FB855` | external | WhatsApp brand |

**Never hardcode hex.** Always reference tokens.

### Typography (3 font families via `next/font/google` in `app/layout.tsx`)
- **`font-display`** = **Fraunces** (variable serif, with `SOFT`/`WONK`/`opsz` axes). Use for hero/h1/h2/feature numbers/big prices. CSS class `.display` and `.display-italic` apply tasteful variations.
- **`font-heading`** = Plus Jakarta Sans. Secondary headings + nav.
- **`font-body`** = Inter. Body text + UI.

### Reusable patterns (defined in `app/globals.css` `@layer components`)
- `.eyebrow` — tiny uppercase tracked label above headings (gold accent)
- `.display` / `.display-italic` — Fraunces with optical sizing + soft/wonk axes
- `.drop-cap` — magazine-style first letter (used in `/tentang` story)
- `.hairline` — full-width gradient gold rule, `.hairline-short` — short centered gold rule
- `.section-pad` (py-20 md:py-28), `.section-pad-sm` (py-14 md:py-20) — consistent section rhythm
- `.photo-warm` — overlay gradient for editorial hero images

### Motion primitives (`components/motion.tsx`, uses `framer-motion`)
- **`<FadeUp>`** — fade + slide-up on viewport enter (most common — wraps any block)
- **`<Fade>`** — simple opacity fade
- **`<RevealWords text="..." />`** — word-by-word reveal (used for hero tagline on `/`)
- **`<StaggerList>` + `<StaggerItem>`** — orchestrated children stagger
- **`<ParallaxFade>`** — image-scale fade-in for hero photography
- All primitives respect `prefers-reduced-motion` automatically via global CSS rule.

## Key conventions

- **Brand colors** live in Tailwind under `brand.*` — never hardcode hex.
- **Typography uses semantic class names** (`font-display`, `font-heading`, `font-body`) or composed shorthand (`.display`, `.display-italic`).
- **Editorial rhythm**: every section starts with `<span className="hairline-short !mx-0 !w-10" />` + `<span className="eyebrow">Section Name</span>`, then a Fraunces h2 with line-break + italic accent for the second half (pattern visible across all pages).
- **No backend.** Anything that would need a server (auth, payment, email) is out of scope. All "checkout" flows lead to `wa.me/${KONTAK.waUtama}` with pre-filled text.
- **Indonesian copy.** UI is `lang="id"`. Currency format: `Rp 50.000,-` via `formatRupiah(value)` from [lib/format.ts](lib/format.ts).
- **Images use `next/image` with paths starting `/image/`.** All real photos are in `public/image/`; the slugs are stable and listed in the "Image inventory" section below.
- **PII redaction is enforced via comments and data.** Certain assets contain personal NIK or customer names — see "Image inventory" entries flagged with ⚠️ and the table in PRD §8.4.
- **Cart state.** Single source: `useCart()` from [lib/cart.tsx](lib/cart.tsx). Hydration-aware: components reading `totalQty` should also check `hydrated` to avoid SSR mismatch (see `Header.tsx` for pattern).
- **Motion**: prefer the primitives in `components/motion.tsx` over direct `motion.*` calls — keeps timing consistent across the site.

All images have already been renamed from the original `SlideN.JPG.jpeg` / `WhatsApp Image 2026-05-16 at HH.MM.SS.jpeg` form to semantic kebab-case slugs grouped by a category prefix (`slide-`, `pack-`, `plated-`, `hampers-`, `logo-`, `legal-`, `menu-`, `event-`, `teras-`, `social-`, `produksi-`, `display-`). Use these slugs verbatim when wiring `<img src>` / `next/image` — they are stable and sortable.

## Business facts (from the slides — use these verbatim in any site copy)

These are first-party facts extracted from the `slide-01-*` through `slide-13-*` images. Treat them as the source of truth for site content; do not paraphrase the certificate numbers or contact details.

- **Brand:** PEMPEK 788 MANG JAI ("Mang Jai 788") — tagline *"Kentel Cukonyo - Teraso Iwaknyo"*, *"One Of The Traditional Culinary Of Indonesia"*
- **Founded:** 2013, by Bapak Zaitun Rizal S.H. (owner) and Ibu Nurli Evi Rosita S.Pd.
- **Address:** Plamo Garden Blok P No. 22, Kel. Baloi Permai, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29462, Indonesia
- **Contacts:** WhatsApp +62 895 1019 4115 and +62 813 6475 0872 — Email pempek788mangjai@gmail.com
- **Social:** Instagram @mangjaipempek788, Facebook `mangjai788` / `mang jai pempek`, YouTube `mangjai788channel`, TikTok `mangjai788channel`
- **Certifications:** Halal MUI (No. 04030021380616 — **status active, renewed post-2022**), BPOM RI MD 243229017042, P-IRT 2022171010690-23 / 2062171020620-23, SIUMK IUMK/045/BK/XII/2017, NIB 0220003690831, SNI 1002991042023, GMP Certified, "Batam Poenya", "Bangga Buatan Indonesia"
- **Production capacity:** ~1000 pcs/day (~100 packs) with 4 staff
- **Retail distribution:** 12 outlet supermarket di Batam across 6 chains — TOP 100 (×4 lokasi), JC/Jodoh Centre (×2), Hypermart, Diamond, Gogo (×2), Indogrosir + outlet sendiri Teras Mang Jai 788. Full list in [data/retail.ts](data/retail.ts) (`RETAIL_OUTLETS`). No distributor logo files available — render as text chips/cards.
- **Physical outlet:** Teras Mang Jai 788 (grand-opened 10 September 2023, same Plamo Garden address) — dine-in pempek + drink menu. **Operating hours: Senin–Minggu, 09:30–16:30 WIB.**
- **Shipping coverage:** Batam (local delivery / pickup) + frozen shipping nationwide via **Paxel**
- **Sister brand visible in assets:** Eza Food (separate logo file)

### Product catalog with prices (current, count-based — supersedes Slide 5)

The owner has switched from weight-based to count-based pricing. Slide 5 (`slide-05-daftar-produk-harga.jpeg`) shows historical weight prices and **must not be used** as the live price source. Authoritative catalog:

**Tier "Rp 50.000 / 10 pcs per pack"** — standard tenggiri variants: Pempek Lenjer, Telur, Keriting, Adaan, Kulit, Pistel, Mozzarella.

**Special-pack SKUs:**
- Pempek Kapal Selam — 2 pcs/pack — Rp 50.000
- Pempek Panggang — 6 pcs/pack — Rp 40.000 (**also known as Pempek Tunu** — same product, two names; use "Panggang" as canonical)
- Pempek DOS (no fish) — 10 pcs/pack — Rp 25.000

**"Hubungi Kami" SKUs** (still in catalog, but price confirmed via WhatsApp at checkout): Pempek Campur, Tekwan Ikan, Kue Bawang.

**Removed from MVP per owner decision:** Pempek Premium, Otak-Otak. Do not include in catalog or open-questions.

## Image inventory

Every file lives in [image/](image/). Categories below match the filename prefix — sorting the directory alphabetically groups related shots together.

### `slide-01` … `slide-13` — company-profile deck (13 files)
- `slide-01-company-profile-cover.jpeg` — cover with packaging mosaic + contact card.
- `slide-02-tentang-pendiri-visi-misi.jpeg` — founder bios, visi-misi, certifications list.
- `slide-03-struktur-organisasi-kapasitas.jpeg` — 4-person org chart + 1000 pcs/day capacity claim.
- `slide-04-mesin-produksi-pemasaran.jpeg` — equipment list + retail-channel list.
- `slide-05-daftar-produk-harga.jpeg` — **historical price list (weight-based, no longer valid)**. Live prices are count-based — see "Product catalog with prices" section above. **Not rendered anywhere in the live site** (owner removed the archive section from /tentang in Sprint 5). File kept in `public/image/` for archival purposes only.
- `slide-06-legalitas-siumk-2017.jpeg` — SIUMK 2017. **Contains owner's personal NIK — file is gitignored, crop/blur before publishing.**
- `slide-07-legalitas-nib-2020.jpeg` — NIB 0220003690831 issued 3 Juni 2020.
- `slide-08-legalitas-halal-mui.jpeg` — Halal MUI decree (No. 04030021380616). Printed validity runs to 25 Agustus 2022 but **owner has confirmed the certification was renewed post-2022 and is currently active** — safe to claim active status in copywriting.
- `slide-09-legalitas-pirt-dinkes.jpeg` — PIRT certificate from Dinkes Kota Batam (13 Aug 2018).
- `slide-10-legalitas-bpom-rekomendasi.jpeg` — BPOM recommendation letter (13 Des 2019, nilai B/Baik).
- `slide-11-denah-ruang-produksi.jpeg` — production-room floor plan.
- `slide-12-peta-lokasi-usaha.jpeg` — hand-drawn location map (Plamo Garden, Batam).
- `slide-13-terima-kasih-display-produk.jpeg` — closing slide with social handles burned in.

### `pack-*` — retail packaging shots (13 files)
Canonical product photos on clean background with MFG/EXP stickers visible. Use these for catalog tiles. SKUs covered: `pempek-kapal-selam`, `tekwan-ikan`, `pempek-campur`, `pempek-panggang`, `pempek-telur`, `pempek-adaan`, `pempek-mozzarella`, `pempek-pistel`, `pempek-kulit`, `pempek-dos`, `pempek-keriting`, `pempek-lenjer`, `kue-bawang`. One image per SKU.

### `plated-*` — cooked/plated food (6 files)
Pempek served on a blue-rim porcelain plate (Mang Jai 788 watermark across the image). Use for menu / dine-in imagery: `plated-pempek-adaan`, `plated-pempek-kapal-selam`, `plated-pempek-keriting`, `plated-pempek-lenjer`, `plated-pempek-pistel`, plus `plated-palembang-platter-spiral` (large round display dish — likely lenggang or similar Palembang spread).

### `hampers-*` — gift / event trays (7 files)
"Nasi-tumpeng"-style trays mixing several pempek variants, often with HBD cards or cuko bottles. Use for a "Catering / Hampers / Hadiah" section. Notable: `hampers-hbd-pak-jasman` and `hampers-hbd-pak-acun-bni` show real customer names on cards — redact or pick the generic ones (`hampers-pempek-campuran-tray`, `hampers-pempek-dengan-cuko`, `hampers-platter-besar-meja-biru`) for public-facing copy.

### `menu-*` — dine-in side dishes (2 files)
`menu-pindang-daging-container` shows three takeaway tubs of pindang daging; `menu-pindang-pelengkap-sayur` shows the accompanying basil / cabbage / sambal tray. These are the Teras menu beyond pempek.

### `logo-*` — brand marks (3 files)
- `logo-mang-jai-788.jpeg` — primary logo, clean black background. Prefer this for headers/favicons.
- `logo-mang-jai-788-business-card.jpeg` — same logo composed with cert badges and contact block (good for footer / about page).
- `logo-eza-food.jpeg` — sister brand "EZA" wordmark; keep but do not mix with Mang Jai 788 branding without user confirmation.

### `legal-*` — higher-res legal docs (2 files)
`legal-nib-rizal-2020.jpeg` and `legal-surat-keterangan-usaha-mikro-2024.jpeg` (the latter valid 10/09/2024 – 10/09/2025, registration 240100128). Same NIK-redaction rule as the slides — both expose the owner's NIK and personal email.

### `teras-*` — Teras Mang Jai 788 dine-in venue (6 files)
Grand-opening / interior photos dated Aug–Nov 2023: `teras-mang-jai-grand-opening-storefront`, `teras-mang-jai-pendiri-portrait` (founders under the Teras banner), `teras-mang-jai-keluarga-makan`, `teras-mang-jai-meeting-pria`, `teras-mang-jai-grup-makan-selfie`, `teras-mang-jai-grup-menu-board`. Good for an "About / Visit Us" hero. Photos with identifiable guests need consent before publishing.

### `event-*` — community events (1 file)
`event-donor-darah-booth-mang-jai.jpeg` — Mang Jai booth at a blood-donor drive (Donor Darah, Batam 20 Mei 2023).

### `social-*` — social-proof screenshots (5 files)
Instagram and WhatsApp screenshots from third-party accounts (`plut_kumkmbatam`, `metamorphozelv`, `mangjaipempek788`'s own repost, and a WA group congrats thread). Use only as quoted testimonials **with attribution**; do not rehost as own-brand imagery.

### `produksi-*` and `display-*` — context shots (2 files)
- `produksi-rumah-plamo-garden-eksterior.jpeg` — exterior of the production house at Plamo Garden.
- `display-semua-produk-mang-jai.jpeg` — all 11 retail SKUs laid out together. Best single hero shot for the homepage "Our Products" section.

## Language / locale

All source text is **Indonesian** (with Palembang/Sumsel dialect on packaging: *"Kentel Cukonyo - Teraso Iwaknyo"* ≈ "thick broth, tastes of fish"). Default any UI copy to Bahasa Indonesia unless the user asks for English. Currency is IDR with the Indonesian dot-thousands convention (`Rp 49.000,-`).

## Working in this folder

- The shell is **PowerShell on Windows** (`win32`). Use PowerShell idioms (`$env:VAR`, `;` for sequencing) — `&&` is unavailable on Windows PowerShell 5.1. Image filenames are now safe ASCII kebab-case so quoting is no longer required.
- The folder is **not** a git repo. If the user starts coding, ask whether to `git init` before making many changes.
- Images are JPEGs averaging ~100–200 KB; total ~7 MB. Safe to commit as-is, but if a static-site framework is chosen, run them through an image pipeline (sharp, `next/image`, astro `<Image>`) for WebP/AVIF + responsive sizes rather than shipping the originals.
