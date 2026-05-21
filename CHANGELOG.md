# Changelog

Riwayat versi website **Pempek 788 Mang Jai**. Versi yang sedang live tampil di
footer situs (sumber: `lib/version.ts`). Format mengikuti
[Semantic Versioning](https://semver.org/lang/id/): `MAJOR.MINOR.PATCH`.

- **PATCH** (x.y.Z) — perbaikan kecil, ubah copy/teks, edit data
- **MINOR** (x.Y.0) — section / fitur baru
- **MAJOR** (X.0.0) — redesign besar / perubahan fundamental

---

## [1.1.5] — 2026-05-21

### Ubah
- **Logo Mang Jai 788 jadi PNG transparan** — background hitam pada
  `logo-mang-jai-788.jpeg` di-strip via alpha thresholding (max RGB < 30 →
  transparan, 30-60 → alpha feathering anti-halo), lalu auto-crop ke bounding
  box konten (540×540 → **540×337**). File JPEG lama dihapus.
- Header kiri-atas: ukuran disesuaikan ke `h-12 w-auto` (rounded-corner dibuang
  karena tidak perlu lagi). Logo kini tampil ~77×48 dengan aspek wordmark asli.
- Favicon + Open Graph logo + Schema.org `Organization.logo` semua diperbarui
  ke `.png`.

---

## [1.1.4] — 2026-05-21

### Ubah
- **Logo Mang Jai 788 di kiri-atas header** — menggantikan wordmark teks
  "Mang Jai" + badge "788" dengan gambar logo asli (`logo-mang-jai-788.jpeg`).
  Tampil 48×48 dengan `rounded-lg` di seluruh halaman.

### Tambah
- **Favicon situs** — logo Mang Jai 788 kini jadi icon tab browser + apple-touch
  icon (sebelumnya pakai default Next.js).

---

## [1.1.3] — 2026-05-21

### Ubah
- **Refresh foto kemasan produk** — 12 dari 13 SKU pack di `/produk` pakai
  foto baru (style seragam: latar tembok kuning + alas rumput sintetis,
  sudut & pencahayaan konsisten). SKU yang diperbarui: Dos, Kulit, Pistel,
  Adaan, Keriting, Telur, Lenjer, Campur, Mozzarella, Tekwan Ikan, Panggang,
  Kapal Selam. Pack Kue Bawang masih pakai foto lama (belum ada penggantinya).

---

## [1.1.2] — 2026-05-21

### Internal (tanpa perubahan tampilan)
- **QA: Vitest + suite unit test** — 38 tes lulus (whatsapp builders, data
  testimoni, helper URL Instagram, CSV parser sheet inventory). Jalankan
  `npm test`.
- **Refactor**: ekstrak `buildTestimoniVoucherWaUrl()` ke `lib/whatsapp.ts`
  dan `instagramEmbedSrc()` + `instagramPermalink()` ke `data/testimoni.ts`
  supaya URL builder bisa di-unit-test (perilaku identik dengan v1.1.1).
- **Dokumentasi**: `TESTING.md` berisi test case manual UI (modal, voucher box,
  regresi, a11y).

---

## [1.1.1] — 2026-05-20

### Tambah
- **Promo voucher diskon 10%** di CTA halaman `/testimoni` — pelanggan yang
  posting testimoni & tag @mangjaipempek788 di Instagram/Facebook dapat voucher
  diskon 10% untuk pembelian berikutnya (klaim dengan menunjukkan postingan saat
  pesan via WhatsApp). Tombol WhatsApp kini pre-fill pesan klaim voucher.

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
