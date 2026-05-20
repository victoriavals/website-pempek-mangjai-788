# Changelog

Riwayat versi website **Pempek 788 Mang Jai**. Versi yang sedang live tampil di
footer situs (sumber: `lib/version.ts`). Format mengikuti
[Semantic Versioning](https://semver.org/lang/id/): `MAJOR.MINOR.PATCH`.

- **PATCH** (x.y.Z) — perbaikan kecil, ubah copy/teks, edit data
- **MINOR** (x.Y.0) — section / fitur baru
- **MAJOR** (X.0.0) — redesign besar / perubahan fundamental

---

## [1.1.0] — 2026-05-20

### Tambah
- **Embed Instagram Reel di Testimoni** — halaman `/testimoni` kini bisa
  menampilkan video Instagram Reel (selain TikTok), dengan modal lightbox.
- 3 testimoni Instagram Reel baru: pelanggan borong (pempek sold out jam 5 sore),
  sosialisasi Gemar Ikan 7 Juni 2024, dan refleksi perjalanan reseller.
- Tautan "Buka di Instagram" di modal testimoni untuk membuka reel/post asli.

---

## [1.0.0] — 2026-05-20

Baseline rilis fitur-lengkap. Versi pertama yang ditampilkan di footer.

**Ringkasan fitur yang sudah ada di v1.0.0:**
- Versi situs tampil di footer (single source: `lib/version.ts`)
- **Inventory & Harga via Google Sheets** — owner update stok + harga lewat
  spreadsheet, auto-sync ke web (ISR 5 menit). Badge "Habis" / "Sisa N",
  tombol "Tambah" disable saat habis.
- **Testimoni** — highlight di homepage + halaman `/testimoni` (press,
  Instagram, TikTok, Facebook, WhatsApp) dengan modal lightbox + embed TikTok.
- **Total redesign** editorial (Brightland-inspired): palet cream/gold/forest,
  Fraunces serif, motion framer-motion.
- **8 halaman**: Beranda, Produk, Beli (cart→WhatsApp), Tentang, Hampers,
  Teras, Testimoni, Legalitas, Kontak.
- **SEO + a11y**: sitemap, robots, JSON-LD, Open Graph, skip-link, 404/error.

<!--
Template entry untuk perubahan berikutnya:

## [1.0.1] — YYYY-MM-DD
### Ubah
- ...
### Tambah
- ...
### Perbaiki
- ...
-->
