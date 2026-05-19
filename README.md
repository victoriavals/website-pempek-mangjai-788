# Pempek 788 Mang Jai — Website

Website company profile + cart-to-WhatsApp untuk **PEMPEK 788 MANG JAI**, UMKM kuliner Batam yang memproduksi pempek khas Sumatera Selatan sejak 2013.

Built with **Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion**, deploy ke Vercel free tier.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS dengan custom design tokens (`brand.*`)
- **Animation**: Framer Motion
- **Fonts**: Fraunces (display serif), Plus Jakarta Sans (heading), Inter (body) — via `next/font/google`
- **Hosting**: Vercel free tier
- **State**: Client-side cart context dengan `localStorage` persistence
- **Backend**: Tidak ada (semua transaksi via WhatsApp deeplink)

## Getting started

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:3000)
npm run dev

# Production build (also runs on Vercel)
npm run build
npm run start

# Lint
npm run lint
```

## Architecture

```
app/              # Next.js App Router pages
├── beli/         # Cart review + WhatsApp checkout
├── hampers/      # Custom hampers gallery + WA consultation
├── kontak/       # Contact info + Google Maps embed
├── legalitas/    # Certification grid with scan modal
├── produk/       # Product catalog with filter
├── tentang/      # Founder story + visi-misi
├── teras/        # Outlet dine-in info
├── layout.tsx    # Root layout (fonts + CartProvider)
├── page.tsx      # Beranda
├── sitemap.ts    # SEO sitemap
├── robots.ts     # SEO robots
├── not-found.tsx # 404
└── error.tsx     # Error boundary

components/       # Reusable UI primitives
data/             # Hardcoded source-of-truth (products, certs, retail)
lib/              # Utilities (cart, format, whatsapp, constants)
public/image/     # Photo assets (some excluded from git — see below)
```

## Order flow (no backend)

1. User browse `/produk`, klik "Tambah" pada card
2. Cart state tersimpan di `localStorage` key `mangjai-cart-v1`
3. Di `/beli`, review cart + tambah catatan opsional
4. Klik "Pesan via WhatsApp" → buka `wa.me/6289510194115` dengan template pesan ter-fill (lihat `lib/whatsapp.ts → buildWhatsAppMessage`)

## SEO + a11y

- `sitemap.xml` dan `robots.txt` auto-generated dari `app/sitemap.ts` dan `app/robots.ts`
- Schema.org `FoodEstablishment` JSON-LD di homepage (`components/JsonLd.tsx`)
- Open Graph + Twitter card metadata di `app/layout.tsx`
- Skip-to-content link, `:focus-visible` ring, `prefers-reduced-motion` respected

## Environment variables

Tidak ada `.env` yang wajib untuk MVP. Opsional:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com  # untuk canonical URL & sitemap
```

Default fallback ke `pempek-mangjai-788.vercel.app` atau `VERCEL_URL` env yang Vercel inject otomatis.

## Deploy to Vercel

1. Push repo ke GitHub
2. Import ke Vercel dashboard → pilih repo
3. Framework auto-detect: Next.js
4. Default build settings (`next build`)
5. Tambah environment variable `NEXT_PUBLIC_SITE_URL` di Settings (opsional)
6. Enable Vercel Web Analytics di dashboard

## Private assets (NOT in repo)

Beberapa file image di `public/image/` mengandung data pribadi (NIK pemilik, nama customer, foto wajah customer tanpa consent eksplisit) — file-file ini di-list di `.gitignore` dan **tidak di-push ke GitHub**. Mereka tetap di disk lokal untuk development, tapi tidak ke-publish.

Daftar file private:

- `slide-06-legalitas-siumk-2017.jpeg`, `slide-07-legalitas-nib-2020.jpeg` (NIK)
- `legal-nib-rizal-2020.jpeg`, `legal-surat-keterangan-usaha-mikro-2024.jpeg` (NIK + email pribadi)
- `hampers-hbd-*.jpeg` (4 file, nama customer)
- `teras-mang-jai-keluarga-makan.jpeg`, `teras-mang-jai-grup-makan-selfie.jpeg`, `teras-mang-jai-meeting-pria.jpeg`, `teras-mang-jai-grup-menu-board.jpeg` (foto wajah customer)
- `social-*.jpeg` (5 file screenshot dari third-party — hak cipta orang lain)

Site **tetap berfungsi penuh** tanpa file-file ini karena:
- Sertifikat NIK-bearing tidak pernah di-render (lihat `data/certifications.ts → canShowScan()` filter)
- Hampers HBD tidak direferensikan di code (galeri pakai file lain)
- Foto customer tidak direferensikan di code (halaman `/teras` pakai storefront + founder portrait)

## Working documents

- [PRD.md](PRD.md) — Product Requirements Document
- [PROMPT_PRD.md](PROMPT_PRD.md) — Prompt template untuk regenerate PRD
- [CLAUDE.md](CLAUDE.md) — Codebase quick-reference untuk AI agents

## License

Proprietary — © Pempek 788 Mang Jai. Semua hak cipta dilindungi.
