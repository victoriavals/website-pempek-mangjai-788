# PRD: Website Pempek 788 Mang Jai

> **Status:** Draft 1.0 · **Tanggal:** 2026-05-18 · **Owner produk:** Naufal Firdaus
> **Target launch MVP:** TBD (estimasi 3-4 minggu development)
> **Tech stack tetap:** Next.js 14 App Router + TypeScript + Tailwind CSS + Vercel free tier

---

## 1. Executive Summary

Website ini adalah representasi digital lengkap untuk **PEMPEK 788 MANG JAI** — UMKM kuliner Batam yang sudah berdiri sejak 2013 dan memproduksi pempek khas Sumatera Selatan dengan kapasitas ±1.000 pcs/hari. Tujuan utama: (a) menggantikan peran company-profile PDF dan IG-bio-link sebagai sumber informasi resmi, (b) menjadi corong pemesanan online dengan alur **keranjang → checkout via WhatsApp**, dan (c) membangun trust lewat penayangan sertifikasi (Halal MUI, BPOM, NIB, P-IRT, SNI).

Target audiens: pembeli rumah tangga di Batam (delivery lokal), pelanggan luar kota Batam (ekspedisi frozen ke seluruh Indonesia), dan calon customer hampers/event. Stack final: **Next.js 14 App Router + TypeScript + Tailwind CSS**, deploy di **Vercel free tier**, konten hardcoded di repo. **Tidak ada backend, auth, atau payment gateway** — semua transaksi diselesaikan via chat WhatsApp ke nomor utama `+62 895 1019 4115`.

MVP mencakup 8 halaman, satu fitur inti (cart-to-WhatsApp dengan state `localStorage`), dan memanfaatkan 59 aset foto yang sudah dikurasi & di-rename di folder `image/`.

## 2. Tujuan Bisnis & Metrik Sukses

### 2.1 Tujuan Kualitatif
- **Trust by default**: pengunjung baru bisa menilai legitimasi bisnis dalam < 30 detik di homepage (lewat sertifikasi badge + foto outlet + social proof).
- **Frictionless ordering**: customer pilih produk → masuk keranjang → tiba di chat WhatsApp dengan ringkasan terotomatisasi, tanpa harus mengetik manual.
- **Single source of truth**: nomor sertifikat, alamat, harga, kontak — hanya ada di satu file source, diupdate via git push.
- **Mobile-first**: traffic UMKM kuliner Indonesia mayoritas dari mobile; setiap interaksi harus bisa diselesaikan dengan satu jempol.

### 2.2 Metrik Kuantitatif (target 90 hari pasca-launch)

| Metrik | Target | Cara Ukur |
|---|---|---|
| Conversion rate "kunjungan → klik WA" | ≥ 15% | Vercel Web Analytics event tracking |
| Bounce rate `/` (homepage) | < 50% | Vercel Web Analytics |
| LCP mobile | < 2.5 detik | Vercel Speed Insights |
| CLS | < 0.1 | Vercel Speed Insights |
| INP | < 200 ms | Vercel Speed Insights |
| Lighthouse Performance (mobile) | ≥ 90 | Manual run + PR check |
| Lighthouse SEO | ≥ 90 | Manual run |
| Lighthouse Accessibility | ≥ 90 | Manual run |
| Total page weight homepage (mobile) | < 500 KB | Audit lewat WebPageTest |

## 3. Persona & User Stories

### 3.1 Persona A — Bu Rina (Pembeli Rumah Tangga Batam)
**Demografi:** 35–50 tahun, ibu rumah tangga di Batam Center; smartphone Android mid-range; paket data terbatas; tidak suka install aplikasi.
**Goal:** beli pempek beberapa varian untuk lauk akhir pekan keluarga.
**Frustrasi:** ribet kalau harus ketik daftar pesanan satu-per-satu di WA; lupa harga.

**User Stories:**
- **US-A1** — Sebagai Bu Rina, saya ingin melihat daftar lengkap varian pempek dengan harga yang jelas, supaya saya bisa banding-banding sebelum pesan.
  - **AC:** Halaman `/produk` menampilkan minimal 13 SKU dengan foto, nama, isi per bungkus, dan harga (atau tag "Hubungi Kami"). Filter kategori bekerja tanpa reload halaman.
- **US-A2** — Sebagai Bu Rina, saya ingin menambahkan beberapa item ke keranjang hanya dengan satu tap per item, supaya cepat.
  - **AC:** Tombol "Tambah ke Keranjang" pada ProductCard menambah qty=1 dan menampilkan toast/snackbar konfirmasi tanpa navigasi.
- **US-A3** — Sebagai Bu Rina, saya ingin pesanan saya otomatis ter-rangkum di WhatsApp ketika klik "Pesan Sekarang", supaya tinggal kirim tanpa mengetik.
  - **AC:** Tombol di `/beli` membuka WhatsApp Web/App dengan pesan pre-filled berisi list item, qty, subtotal, dan template salam.

### 3.2 Persona B — Pak Budi (Customer Hampers Korporat)
**Demografi:** 30–45 tahun, karyawan/HRD perusahaan di Batam; butuh hadiah ulang tahun rekan atau parcel acara kantor.
**Goal:** pesan hampers custom dengan kartu ucapan untuk delivery hari tertentu.
**Frustrasi:** tidak tahu harga; takut hasil beda dengan ekspektasi; butuh konsultasi cepat.

**User Stories:**
- **US-B1** — Sebagai Pak Budi, saya ingin melihat contoh hampers yang pernah dibuat, supaya saya punya gambaran konkret bentuk akhirnya.
  - **AC:** `/hampers` menampilkan minimal 3 foto referensi dari koleksi `hampers-*` yang aman publik (`hampers-pempek-campuran-tray`, `hampers-pempek-dengan-cuko`, `hampers-platter-besar-meja-biru`).
- **US-B2** — Sebagai Pak Budi, saya ingin langsung chat owner untuk diskusi paket custom, tanpa perantara form yang bikin lama.
  - **AC:** Tombol primer "Konsultasi Hampers via WhatsApp" yang membuka WA dengan template pesan khusus hampers (menyebut jenis acara + target tanggal sebagai placeholder).
- **US-B3** — Sebagai Pak Budi, saya ingin yakin pempek-nya halal sebelum kirim ke kantor yang mayoritas muslim.
  - **AC:** Badge "Halal MUI" terlihat di header `/hampers` dan diklik mengarah ke `/legalitas`.

### 3.3 Persona C — Mbak Lisa (Pengunjung Luar Kota Batam)
**Demografi:** 25–35 tahun, tinggal di Jakarta/Surabaya/Bandung; kerabat orang Sumsel; kangen pempek autentik.
**Goal:** cari pempek autentik yang bisa dikirim frozen ke alamat luar kota.
**Frustrasi:** takut produk rusak di jalan; tidak tahu pempek mana yang tahan lama.

**User Stories:**
- **US-C1** — Sebagai Mbak Lisa, saya ingin tahu apakah ada pengiriman ke luar Batam dan metode apa, supaya tidak buang waktu menghubungi.
  - **AC:** Info "Pengiriman frozen ke seluruh Indonesia" muncul jelas di hero homepage dan halaman `/kontak`.
- **US-C2** — Sebagai Mbak Lisa, saya ingin tahu sertifikasi produk (Halal MUI, BPOM) supaya yakin produk bukan abal-abal.
  - **AC:** Halaman `/legalitas` menampilkan badge minimal 5 sertifikat yang bisa di-klik untuk lihat scan asli (yang sudah diredaksi NIK).
- **US-C3** — Sebagai Mbak Lisa, saya ingin foto produk yang menarik & profesional, supaya bisa bayangkan rasanya sebelum bayar.
  - **AC:** Setiap ProductCard di `/produk` menggunakan foto dari koleksi `pack-*` dengan rasio konsisten 4:5 atau 1:1 (di-crop saat upload).

## 4. Information Architecture & Sitemap

```
/
├── /produk                     (katalog + tambah ke keranjang)
├── /beli                       (review keranjang + checkout WA)
├── /tentang                    (kisah founder + visi-misi)
├── /hampers                    (paket hadiah, custom-only via WA)
├── /teras                      (outlet dine-in)
├── /legalitas                  (badge & scan sertifikat)
└── /kontak                     (WA, alamat, peta, sosial)
```

| Path | Halaman | Tujuan utama | Audience |
|---|---|---|---|
| `/` | Beranda | Funnel awareness → click WA / browse produk | Semua persona |
| `/produk` | Produk Kami | Eksplorasi katalog + add to cart | A, C |
| `/beli` | Beli Sekarang | Review keranjang + checkout via WA | A, C |
| `/tentang` | Tentang Kami | Build trust, ceritakan founder | A, B, C |
| `/hampers` | Hampers & Catering | Lead generation hampers custom | B |
| `/teras` | Teras Mang Jai | Drive foot traffic ke outlet | A (lokal) |
| `/legalitas` | Legalitas & Sertifikasi | Validasi kredibilitas | B, C |
| `/kontak` | Kontak | Conversion path terakhir | Semua |

**Komponen Global Wajib (semua halaman):**
- **Header**: logo (`logo-mang-jai-788.jpeg`), nav menu, indikator jumlah item di keranjang (badge merah pada ikon keranjang)
- **Footer**: alamat, kontak, sosial, mini cert badge (Halal/BPOM/NIB)
- **Floating WhatsApp Button (FAB)**: pojok kanan bawah, persistent di semua halaman, satu klik menuju WA tanpa template (hanya salam)
- **CartProvider context**: di-mount di root layout

## 5. Page-by-Page Specification

### 5.1 `/` Beranda

**Tujuan:** beri kesan profesional + autentik dalam 5 detik; arahkan pengunjung ke `/produk` atau langsung klik WA.
**Audience:** semua persona.

**Wireframe:**
```
[Header global]
┌─────────────────────────────────────────────────┐
│ HERO                                             │
│ ┌──────────────┐  PEMPEK 788 MANG JAI           │
│ │              │  Kentel Cukonyo - Teraso        │
│ │  display-    │  Iwaknyo                        │
│ │  semua-      │  ──────────────────             │
│ │  produk-     │  Pempek asli Palembang sejak    │
│ │  mang-jai    │  2013, diproduksi di Batam.     │
│ │  .jpeg       │  Halal MUI · BPOM · SNI         │
│ │              │  ──────────────────             │
│ │              │  [Lihat Produk] [Chat WA]       │
│ └──────────────┘                                 │
│ Sub-line: Pengiriman frozen ke seluruh Indonesia│
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ USP Strip — 4 kolom ikon + 1 baris teks         │
│ 🐟 Ikan Tenggiri | 🏭 Diproduksi Sendiri       │
│ 🛡️ Halal MUI     | 🚚 Kirim Seluruh Indonesia  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Produk Best Seller (carousel 4 kartu)           │
│ - Pempek Kapal Selam · Lenjer · Adaan · Kulit   │
│ [Lihat Semua Produk →]                          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Section "Tentang Singkat"                       │
│ Foto: teras-mang-jai-pendiri-portrait.jpeg     │
│ Teks: 2 paragraf kisah founder Bapak Zaitun     │
│ Rizal & Ibu Nurli Evi sejak 2013                │
│ [Selengkapnya →]                                │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Sertifikasi Strip — 8 badge horizontal          │
│ Halal MUI · BPOM · P-IRT · NIB · SNI ·          │
│ GMP · Batam Poenya · Bangga Buatan Indonesia    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Distribusi Retail (text-only chip)              │
│ "Tersedia juga di:"                              │
│ [Diamond Supermarket] [JC Supermarket]          │
│ [212 Mart] [Indomaret] [TOP 100 Supermarket]    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Testimonial (3 kartu social-*)                  │
│ Screenshot IG @plut_kumkmbatam, @metamorphozelv │
│ + Wikia-style caption "[username] · [Instagram] │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Final CTA banner                                │
│ "Siap pesan? Chat kami sekarang"                │
│ [Pesan via WhatsApp]                            │
└─────────────────────────────────────────────────┘

[Footer global]
```

**Aset yang dipakai:**
- Hero: `image/display-semua-produk-mang-jai.jpeg`
- Tentang singkat: `image/teras-mang-jai-pendiri-portrait.jpeg`
- Sertifikasi badge: scan-down dari `image/slide-08-legalitas-halal-mui.jpeg`, `image/slide-07-legalitas-nib-2020.jpeg`, `image/slide-09-legalitas-pirt-dinkes.jpeg`, `image/slide-10-legalitas-bpom-rekomendasi.jpeg` (dibuat versi badge SVG/PNG terpisah saat build; original scan dilink di `/legalitas`)
- Testimonial: `image/social-ig-plut-kumkm-opening.jpeg`, `image/social-ig-metamorphozelv-pempek.jpeg`, `image/social-ig-metamorphozelv-makan.jpeg`

**CTA primer:** "Pesan via WhatsApp" (hero & final banner) → `wa.me/6289510194115`
**CTA sekunder:** "Lihat Produk" → `/produk`

**SEO meta default:**
- `<title>`: Pempek 788 Mang Jai — Pempek Asli Palembang dari Batam | Halal MUI · BPOM
- `<meta description>`: Pempek Ikan Tenggiri produksi UMKM Batam sejak 2013. Halal MUI 04030021380616, BPOM RI MD 243229017042. Pengiriman frozen seluruh Indonesia. Pesan via WA: +62 895 1019 4115.
- Open Graph image: `image/display-semua-produk-mang-jai.jpeg` (export 1200×630 di build)

### 5.2 `/produk` Produk Kami

**Tujuan:** tampilkan katalog penuh, izinkan customer tambah-ke-keranjang per item, filter berdasar kategori.
**Audience:** A, C.

**Wireframe:**
```
[Header]
┌─────────────────────────────────────────────────┐
│ Page Hero                                       │
│ "Produk Kami" + sub: "13 varian pempek &        │
│  pelengkap, dari Tenggiri pilihan Kepri"        │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Filter chips (sticky on scroll)                 │
│ [Semua] [Tenggiri Standar] [Tenggiri Khusus]    │
│ [Campur] [Tanpa Ikan] [Panggang] [Snack]        │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Product Grid (3 kolom desktop, 2 mobile)        │
│ ┌─────┐ ┌─────┐ ┌─────┐                         │
│ │ 📦  │ │ 📦  │ │ 📦  │                         │
│ │     │ │     │ │     │                         │
│ │ Nama│ │ Nama│ │ Nama│                         │
│ │ Isi │ │ Isi │ │ Isi │                         │
│ │ Rp  │ │ Rp  │ │ Rp  │                         │
│ │[+]  │ │[+]  │ │[+]  │                         │
│ └─────┘ └─────┘ └─────┘                         │
└─────────────────────────────────────────────────┘

[Floating "Keranjang (3)" pill di bottom-right
 mobile, fixed di tablet+]

[Footer]
```

**ProductCard anatomy (komponen reusable):**
- Foto produk (rasio 4:5, lazy loaded via `next/image`)
- Nama produk (h3)
- Tag chip kalau ada (mis. "Best Seller", "Hubungi Kami", "Halal")
- Isi per bungkus (mis. "10 pcs/bungkus")
- Harga: `Rp 50.000,-` bold, atau "Hubungi Kami" italic abu-abu
- Tombol "+ Tambah ke Keranjang" untuk **semua** SKU (termasuk Hubungi Kami). Item Hubungi Kami tetap masuk cart dengan subtotal `null`; harga akan dikonfirmasi via WA saat checkout.

**Daftar produk yang ditampilkan (urutan, 10 SKU aktif):**

| # | Produk | Foto | Isi/bks | Harga | Tag |
|---|---|---|---|---|---|
| 1 | Pempek Kapal Selam | `pack-pempek-kapal-selam.jpeg` | 2 pcs | Rp 50.000 | Best Seller |
| 2 | Pempek Lenjer | `pack-pempek-lenjer.jpeg` | 10 pcs | Rp 50.000 | — |
| 3 | Pempek Telur | `pack-pempek-telur.jpeg` | 10 pcs | Rp 50.000 | — |
| 4 | Pempek Adaan | `pack-pempek-adaan.jpeg` | 10 pcs | Rp 50.000 | — |
| 5 | Pempek Keriting | `pack-pempek-keriting.jpeg` | 10 pcs | Rp 50.000 | — |
| 6 | Pempek Pistel | `pack-pempek-pistel.jpeg` | 10 pcs | Rp 50.000 | — |
| 7 | Pempek Kulit | `pack-pempek-kulit.jpeg` | 10 pcs | Rp 50.000 | — |
| 8 | Pempek Mozzarella | `pack-pempek-mozzarella.jpeg` | 10 pcs | Rp 50.000 | Premium |
| 9 | Pempek Panggang | `pack-pempek-panggang.jpeg` | 6 pcs | Rp 40.000 | — |
| 10 | Pempek DOS | `pack-pempek-dos.jpeg` | 10 pcs | Rp 25.000 | Tanpa Ikan |
| 11 | Pempek Campur | `pack-pempek-campur.jpeg` | — | Hubungi Kami | — |
| 12 | Tekwan Ikan | `pack-tekwan-ikan.jpeg` | — | Hubungi Kami | — |
| 13 | Kue Bawang | `pack-kue-bawang.jpeg` | — | Hubungi Kami | Snack |

**Catatan:**
- "Pempek Panggang" disebut juga **"Pempek Tunu"** di varian lain — sama produknya. Pakai "Panggang" sebagai nama kanonik karena lebih dikenal umum; sebut "(juga dikenal sebagai Tunu)" di deskripsi produk.
- SKU yang **tidak dimasukkan** di MVP: Pempek Premium, Otak-Otak. Tidak perlu placeholder.
- 3 SKU "Hubungi Kami" (Campur, Tekwan, Kue Bawang) **tetap bisa di-add ke keranjang**. Tombol pakai label normal "+ Tambah ke Keranjang", tapi di card ditampilkan badge "Hubungi Kami" + harga ditulis "Konfirmasi via WA". Saat checkout, item tetap muncul di pesan WA dengan format `*konfirmasi harga via WA*` (lihat section 6.4).

**CTA primer:** "+ Tambah ke Keranjang" per card
**CTA sekunder:** Floating pill "Keranjang (n) → Beli Sekarang" yang muncul saat n>0, navigasi ke `/beli`

**SEO meta:**
- `<title>`: Daftar Produk Pempek — Pempek 788 Mang Jai
- description: 16 varian pempek halal dari ikan tenggiri Kepri. Kapal Selam, Lenjer, Adaan, Keriting, Pistel, Kulit & lainnya. Mulai Rp 25.000/bungkus. Pesan via WhatsApp.

### 5.3 `/beli` Beli Sekarang (Checkout)

**Tujuan:** review keranjang, edit jumlah, lalu buka WhatsApp dengan pesan ter-rangkum.
**Audience:** A, C.

**Wireframe:**
```
[Header]
┌─────────────────────────────────────────────────┐
│ "Keranjang Anda"                                │
└─────────────────────────────────────────────────┘

[Kondisi A: cart kosong]
┌─────────────────────────────────────────────────┐
│ 🛒 Keranjang Anda masih kosong                  │
│ [Lihat Produk →]                                │
└─────────────────────────────────────────────────┘

[Kondisi B: cart terisi]
┌─────────────────────────────────────────────────┐
│ ┌───┐ Pempek Kapal Selam                        │
│ │📦 │ 2 pcs/bungkus                             │
│ └───┘ [- 2 +]      Rp 100.000      [Hapus]      │
├─────────────────────────────────────────────────┤
│ ┌───┐ Pempek Lenjer                             │
│ │📦 │ 10 pcs/bungkus                            │
│ └───┘ [- 1 +]      Rp 50.000       [Hapus]      │
├─────────────────────────────────────────────────┤
│ ┌───┐ Tekwan Ikan                               │
│ │📦 │ Hubungi Kami                              │
│ └───┘ [- 1 +]      Konfirmasi WA   [Hapus]      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Subtotal item dengan harga: Rp 150.000          │
│ + Item perlu konfirmasi: 1                      │
│ Ongkir: dikonfirmasi via WA                     │
│ ─────────────────────────────                   │
│ Estimasi Total: Rp 150.000+                     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Catatan untuk owner (opsional)                  │
│ ┌──────────────────────────────────────────┐    │
│ │ contoh: "Tolong dikirim Sabtu sore..."   │    │
│ └──────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ [    🟢 Pesan via WhatsApp    ]                 │
│ Pesanan akan dikirim ke +62 895 1019 4115       │
└─────────────────────────────────────────────────┘

[Footer]
```

**CTA primer:** Tombol "Pesan via WhatsApp" (full-width, hijau brand) → trigger `buildWhatsAppMessage()` + `window.open(wa.me URL, "_blank")`

**Edge case copy:**
- Cart kosong: tombol disabled, tampilkan empty state
- Hanya berisi item Hubungi Kami: subtotal `Rp 0`, tampilkan "Estimasi total: Hubungi Kami via WA"

### 5.4 `/tentang` Tentang Kami

**Tujuan:** ceritakan kisah brand, founder, visi-misi, kapasitas, struktur — build trust.

**Wireframe:**
```
[Hero kompak]
"Tentang Pempek 788 Mang Jai"
foto: teras-mang-jai-pendiri-portrait.jpeg

[Section "Kisah Kami"]
- Paragraf 1: berdiri 2013 oleh Bapak Zaitun Rizal S.H. & Ibu Nurli Evi Rosita S.Pd.
- Paragraf 2: dari dapur rumah Plamo Garden ke distribusi 5 supermarket
- Foto pendukung: produksi-rumah-plamo-garden-eksterior.jpeg

[Section "Visi & Misi"]
2 kolom: visi (Melestarikan kuliner Nusantara, khususnya Sumsel)
         misi (Sajikan kuliner bergizi, sehat, untuk semua usia)

[Section "Struktur & Kapasitas"]
- Embed image: slide-03-struktur-organisasi-kapasitas.jpeg
- Caption: 4 staf, 1.000 pcs/hari

[Section "Peralatan Produksi"]
- List dari slide-04: Mesin Adonan, Giling Otomatis, Vacuum Sealer x2, Sealer x2, Blender x2, Kulkas 3 pintu, Freezer x2
- Foto: produksi-rumah-plamo-garden-eksterior.jpeg

[Section "Konteks Historis" — collapsed]
- Embed slide-05 sebagai foto historical "Daftar harga lama 2020"
  ⚠️ disertai disclaimer: "Harga di slide ini sudah tidak berlaku. Lihat halaman Produk untuk harga terbaru."

[Final CTA]
"Penasaran rasanya? [Lihat Produk]"
```

**Aset:** `teras-mang-jai-pendiri-portrait.jpeg`, `produksi-rumah-plamo-garden-eksterior.jpeg`, `slide-03-struktur-organisasi-kapasitas.jpeg`, `slide-04-mesin-produksi-pemasaran.jpeg`, `slide-05-daftar-produk-harga.jpeg` (historical only, dengan disclaimer)

### 5.5 `/hampers` Hampers & Catering

**Tujuan:** lead generation untuk pesanan hampers custom — **tidak ada cart, semua via WA**.
**Audience:** B.

**Wireframe:**
```
[Hero]
"Hampers & Catering Pempek 788 Mang Jai"
sub: "Hadiah pempek premium untuk ulang tahun,
       acara kantor, dan momen spesial"

[Section "Contoh Hampers"]
Grid galeri 2x2 (mobile 1 kolom)
- hampers-pempek-campuran-tray.jpeg
- hampers-pempek-dengan-cuko.jpeg
- hampers-platter-besar-meja-biru.jpeg
- plated-palembang-platter-spiral.jpeg

[Section "Yang Bisa Kami Buat"]
List 4 bullets:
- Tumpeng Pempek (mix variant)
- Hampers Ulang Tahun (dengan kartu ucapan)
- Parcel Korporat (Lebaran, Natal, dll)
- Catering Pempek untuk acara

[Section "Cara Pesan"]
3-step ilustrasi:
1. Chat kami via WhatsApp
2. Diskusi konsep, jumlah, tanggal
3. Konfirmasi harga & pengiriman

[CTA besar]
[🟢 Konsultasi Hampers via WhatsApp]
sub: "Tim kami akan respons dalam 1 jam pada jam kerja"
```

**Implementasi tombol:** buka `wa.me/6289510194115?text=` dengan template:
```
Halo Pempek 788 Mang Jai 👋
Saya tertarik untuk pesan hampers/catering.

Jenis acara: [...]
Target tanggal: [...]
Estimasi jumlah: [...]
Budget perkiraan: [...]

Mohon info paket & harga. Terima kasih!
```

**Catatan PII:** koleksi `hampers-hbd-pak-jasman.jpeg`, `hampers-hbd-pak-acun-bni.jpeg`, `hampers-hbd-display-kemasan.jpeg`, `hampers-hbd-display-kemasan-alt.jpeg` mengandung nama customer asli — **wajib redaksi sebelum publish** atau jangan dipakai sama sekali.

### 5.6 `/teras` Teras Mang Jai

**Tujuan:** drive foot traffic ke outlet dine-in di Plamo Garden.

**Wireframe:**
```
[Hero]
Foto: teras-mang-jai-grand-opening-storefront.jpeg
Title: "Teras Mang Jai 788"
sub: "Outlet dine-in resmi sejak 10 September 2023"

[Info Block]
📍 Plamo Garden Blok P No. 22, Baloi Permai,
   Batam Kota, Batam, Kepri 29462
🕒 Senin – Minggu · 09:30 – 16:30 WIB
📞 +62 895 1019 4115

[Section "Galeri Outlet"]
Grid 2x2 (mobile 1 kolom):
- teras-mang-jai-keluarga-makan.jpeg
- teras-mang-jai-grup-makan-selfie.jpeg
- teras-mang-jai-grup-menu-board.jpeg
- teras-mang-jai-meeting-pria.jpeg

⚠️ Catatan: foto-foto ini menampilkan wajah customer asli;
    pastikan ada izin sebelum publish. Kalau tidak, ganti
    dengan teras-mang-jai-grand-opening-storefront.jpeg
    dan teras-mang-jai-pendiri-portrait.jpeg saja.

[Section "Menu di Teras"]
Highlight menu pendamping (selain pempek):
- Pindang Daging — foto: menu-pindang-daging-container.jpeg
- Pelengkap Sayur — foto: menu-pindang-pelengkap-sayur.jpeg
Caption: "Sajian khas Palembang yang hanya tersedia di outlet"

[Section "Peta"]
Embed Google Maps dengan koordinat Plamo Garden Blok P No. 22
Fallback: tampilkan slide-12-peta-lokasi-usaha.jpeg
          (peta tangan asli sebagai charming alternative)

[CTA]
[📞 Hubungi Sebelum Datang]
sub: "Reservasi atau cek ketersediaan menu via WA"
```

### 5.7 `/legalitas` Legalitas & Sertifikasi

**Tujuan:** validasi kredibilitas — tampilkan scan asli sertifikat (yang sudah diredaksi PII).

**Wireframe:**
```
[Hero]
Title: "Legalitas & Sertifikasi"
sub: "Komitmen kami terhadap kualitas, keamanan
      pangan, dan kepatuhan hukum"

[Badge Grid — 8 kartu]
Setiap kartu: ikon SVG + nama + nomor + tahun

1. Halal MUI         · No. 04030021380616  · Aktif
2. BPOM RI MD        · 243229017042
3. P-IRT             · 2022171010690-23, 2062171020620-23
4. SIUMK             · IUMK/045/BK/XII/2017 (2017)
5. NIB               · 0220003690831 (2020)
6. SNI               · 1002991042023
7. GMP Certified
8. Batam Poenya · Bangga Buatan Indonesia

[Klik kartu → modal lightbox dengan scan asli]
- Halal MUI  → slide-08-legalitas-halal-mui.jpeg
- BPOM       → slide-10-legalitas-bpom-rekomendasi.jpeg
- P-IRT      → slide-09-legalitas-pirt-dinkes.jpeg
- SIUMK      → slide-06-legalitas-siumk-2017.jpeg
                ⚠️ WAJIB REDAKSI NIK pemilik
- NIB        → legal-nib-rizal-2020.jpeg ATAU
               slide-07-legalitas-nib-2020.jpeg
                ⚠️ WAJIB REDAKSI NIK
- Surat Keterangan Usaha Mikro 2024 →
               legal-surat-keterangan-usaha-mikro-2024.jpeg
                ⚠️ WAJIB REDAKSI NIK + email pribadi

[Section "Distribusi Retail"]
"Produk kami juga tersedia di:"
Text chip 5 retail (tanpa logo, karena file logo distributor
belum tersedia — gunakan styled text badge dengan border):
Diamond Supermarket · JC Supermarket · 212 Mart ·
Indomaret · TOP 100 Supermarket
```

**Catatan implementasi**: scan asli sertifikat **harus disimpan ulang setelah diedit** (NIK di-blur/di-crop). Beri suffix `-redacted` pada file hasil redaksi, mis. `slide-06-legalitas-siumk-2017-redacted.jpeg`. Jangan publish file original di production.

### 5.8 `/kontak` Kontak

**Tujuan:** menjadi rest stop terakhir — pengunjung punya semua channel kontak.

**Wireframe:**
```
[Hero kompak]
Title: "Hubungi Kami"
sub: "Kami biasanya respons dalam 1 jam pada jam kerja"

[Section "Channel Utama"]
3 kartu besar:
┌──────────┐ ┌──────────┐ ┌──────────┐
│ 🟢 WA    │ │ 📍 Outlet│ │ 📧 Email │
│ +62 895  │ │ Plamo    │ │ pempek-  │
│ 1019     │ │ Garden   │ │ 788mang  │
│ 4115     │ │ ...      │ │ jai@gmail│
│ [Chat]   │ │ [Peta]   │ │ [Mail]   │
└──────────┘ └──────────┘ └──────────┘

[Section "Jam Operasional"]
Senin – Minggu: 09:30 – 16:30 WIB
(Produksi & outlet dine-in)

[Section "Pengiriman"]
🛵 Batam: delivery dalam kota & pickup di outlet
📦 Luar Batam: ekspedisi frozen (JNE Yes, J&T Frozen, dll)
                konfirmasi metode & ongkir via WA

[Section "Nomor WA Cadangan"]
+62 813 6475 0872 (Owner)

[Section "Sosial Media"]
Ikon link ke:
- Instagram: @mangjaipempek788
- Facebook : mangjai788 / mang jai pempek
- YouTube  : mangjai788channel
- TikTok   : mangjai788channel

[Embed peta Google Maps]
Koordinat Plamo Garden Blok P No. 22, Baloi Permai, Batam
```

## 6. Fitur Inti: Cart-to-WhatsApp

### 6.1 Type Definitions

```ts
// data/types.ts
export type ProductCategory =
  | 'tenggiri-standar'
  | 'tenggiri-khusus'
  | 'campur'
  | 'tanpa-ikan'
  | 'panggang'
  | 'snack';

export type ProductTag =
  | 'Best Seller'
  | 'Premium'
  | 'Halal'
  | 'Tanpa Ikan'
  | 'Snack'
  | 'Hubungi Kami';

export interface Product {
  id: string;                    // 'pempek-kapal-selam'
  slug: string;                  // sama dengan id, untuk URL detail (fase 2)
  nama: string;                  // 'Pempek Kapal Selam'
  kategori: ProductCategory;
  isi_per_pack: number;          // 2, 10, 6
  satuan_label: string;          // '2 pcs/bungkus'
  harga_per_pack: number | null; // null = Hubungi Kami
  deskripsi: string;             // 1-2 kalimat untuk tooltip / detail
  gambar: string;                // '/image/pack-pempek-kapal-selam.jpeg'
  tags?: ProductTag[];
}

export interface CartItem {
  productId: string;
  quantity: number; // >= 1
}

export interface Cart {
  items: CartItem[];
  updatedAt: number; // epoch ms, untuk debug
}
```

### 6.2 Aksi Cart (`lib/cart.ts`)

```ts
addItem(productId: string): void          // qty +=1 atau create
removeItem(productId: string): void       // hapus dari array
incrementQty(productId: string): void     // qty +=1
decrementQty(productId: string): void     // qty -=1, auto-remove kalau jadi 0
clearCart(): void                         // reset ke []
getSubtotal(): number                     // sum dari item dengan harga != null
getTotalQty(): number                     // sum semua qty
getUnpricedCount(): number                // jumlah item bertag "Hubungi Kami"
```

### 6.3 Persistensi

- **Storage key:** `mangjai-cart-v1` (kalau struktur berubah di fase 2, naikkan ke `-v2` dan migrasikan)
- **Hydration strategy:** baca dari `localStorage` di `useEffect` setelah mount; sebelum mount, render dengan cart kosong. Hindari SSR hydration mismatch.
- **Persistence trigger:** setiap perubahan state cart → setItem ke localStorage immediately.

### 6.4 Template Pesan WhatsApp

Fungsi `buildWhatsAppMessage(cart: Cart, products: Product[], note?: string): string` menghasilkan multiline string:

```
Halo Pempek 788 Mang Jai 👋
Saya ingin memesan:

1. Pempek Kapal Selam (2 pcs/bks) × 2 bks — Rp 100.000
2. Pempek Lenjer (10 pcs/bks) × 1 bks — Rp 50.000
3. Pempek Panggang (6 pcs/bks) × 1 bks — Rp 40.000
4. Tekwan Ikan × 1 bks — *konfirmasi harga via WA*

Subtotal: Rp 190.000 (+ 1 item perlu konfirmasi)
Catatan: [isi catatan kalau ada]

Pengiriman: [Batam / Luar Batam — frozen]
Mohon info ongkir & cara pembayaran. Terima kasih!
```

Setelah encode: `https://wa.me/6289510194115?text=${encodeURIComponent(message)}`

**Aturan format:**
- Nomor urut item pakai angka biasa (1., 2., 3.)
- Format mata uang: `Rp 50.000` (tanpa `,-` di dalam WA message agar lebih clean)
- Item Hubungi Kami: pakai italic dengan asterisk markdown WA `*konfirmasi harga via WA*`
- Subtotal hanya jumlahkan item yang punya `harga_per_pack !== null`
- Kalau `getUnpricedCount() > 0`, tambahkan `(+ N item perlu konfirmasi)` di line subtotal

### 6.5 Edge Cases

| Case | Behavior |
|---|---|
| Cart kosong | Tombol checkout disabled; tampilkan empty state dengan link ke `/produk` |
| Hanya berisi item Hubungi Kami | Subtotal Rp 0; tetap boleh checkout; template WA: "Subtotal: harga akan dikonfirmasi" |
| Qty diturunkan ke 0 | Auto-remove item dari cart |
| Customer share URL `/beli` ke teman | Cart tidak ikut tersalin (localStorage milik device); fase 2: serialize cart ke query param |
| localStorage disabled (private mode) | Cart tetap berfungsi di memory selama sesi; warn via toast satu kali |
| Produk di-rename/dihapus di code | `productId` di cart tidak match → filter saat hydration, log warning |

## 7. Design System Singkat

### 7.1 Palet Warna (usulan)

Diambil dari kemasan & branding existing:

| Token | Hex | Penggunaan |
|---|---|---|
| `--color-primary` | `#1F5C2E` (hijau kemasan) | Tombol primer, link, accent |
| `--color-primary-hover` | `#174922` | State hover/active |
| `--color-secondary` | `#C9202F` (merah Pempek dari kemasan) | Highlight harga, badge "Best Seller" |
| `--color-accent` | `#F5A623` (coklat hangat) | Tag "Premium", border |
| `--color-bg` | `#FFFBF5` (krim hangat) | Background body |
| `--color-surface` | `#FFFFFF` | Card, modal |
| `--color-text` | `#1A1A1A` | Body text |
| `--color-text-muted` | `#6B6B6B` | Caption, helper text |
| `--color-success` | `#25D366` (WhatsApp green) | Tombol WA |
| `--color-border` | `#E5E0D5` | Border, divider |

### 7.2 Tipografi

- **Heading**: `Plus Jakarta Sans` (Google Fonts, weight 600-800) — modern, ramah, sesuai brand muda.
- **Body**: `Inter` atau system stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`) — readable di mobile.
- **Skala**: Tailwind default (`text-xs`–`text-5xl`).
- **Line-height**: 1.5 body, 1.2 heading.

### 7.3 Komponen Reusable

- **`<ProductCard>`** — foto + nama + tag + isi + harga + tombol tambah
- **`<CartItem>`** — foto kecil + nama + qty controls + harga + tombol hapus
- **`<SectionHero>`** — section heading dengan title + sub + optional foto kanan
- **`<BadgeSertifikasi>`** — kartu sertifikat (di `/legalitas` & footer)
- **`<FloatingWAButton>`** — FAB bulat dengan ikon WA, fixed bottom-right
- **`<TestimonialCard>`** — screenshot social + atribusi
- **`<RetailLogo>`** — logo distributor di homepage strip

### 7.4 Spacing & Layout

- Container max-width: 1200 px desktop, full-width mobile dengan padding 16 px
- Grid gap default: 16 px mobile, 24 px desktop
- Section vertical padding: 48 px mobile, 80 px desktop

## 8. Konten & Copy Guidelines

### 8.1 Verbatim Wajib (jangan paraphrase)

Salinan eksak dari berikut harus muncul **persis** di website:

- **Nama brand**: "PEMPEK 788 MANG JAI" (semua caps di logo, "Pempek 788 Mang Jai" di body text)
- **Tagline**: *"Kentel Cukonyo - Teraso Iwaknyo"* (dialek Palembang; sediakan tooltip "≈ kuahnya kental, terasa ikannya")
- **Sub-tagline**: "One Of The Traditional Culinary Of Indonesia"
- **Alamat**: Plamo Garden Blok P No. 22, Kel. Baloi Permai, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29462
- **Nomor WA**: +62 895 1019 4115 (utama), +62 813 6475 0872 (cadangan)
- **Email**: pempek788mangjai@gmail.com
- **Sertifikat**: nomor-nomor di section 5.7 **tidak boleh diparafrase atau disingkat**

### 8.2 Format Harga

- Selalu: `Rp 50.000,-` di body text (titik ribuan, sufiks koma-strip)
- Di WhatsApp message: `Rp 50.000` (tanpa sufiks koma-strip, lebih clean di chat)
- "Hubungi Kami" untuk SKU tanpa harga: tidak tampilkan angka

### 8.3 Tone Copywriting

- **Hangat & familier**: bayangkan ngobrol sama tetangga, bukan PR perusahaan
- **Bumbu dialek Palembang sekali-sekali** untuk warna brand (mis. "kentel cukonyo" di hero), tapi mainstream body text tetap Bahasa Indonesia baku agar accessible
- **Hindari kata bombastis tanpa bukti** ("terbaik", "nomor 1") — fokus ke fakta verifiable ("sejak 2013", "1.000 pcs/hari", "Halal MUI")

### 8.4 PII Protection (CRITICAL)

Setiap kali asset visual digunakan, cek list ini:

| Aset | PII yang harus diredaksi |
|---|---|
| `slide-06-legalitas-siumk-2017.jpeg` | NIK pemilik |
| `slide-07-legalitas-nib-2020.jpeg` | NIK pemilik |
| `legal-nib-rizal-2020.jpeg` | NIK + email pribadi |
| `legal-surat-keterangan-usaha-mikro-2024.jpeg` | NIK + email pribadi + tanda tangan |
| `hampers-hbd-pak-jasman.jpeg` | Nama customer "Pak Jasman" |
| `hampers-hbd-pak-acun-bni.jpeg` | Nama customer "Pak Acun" + perusahaan "BNI" |
| `hampers-hbd-display-kemasan.jpeg` | Nama customer di kartu |
| `hampers-hbd-display-kemasan-alt.jpeg` | Nama customer di kartu |
| `teras-mang-jai-keluarga-makan.jpeg` | Wajah customer (perlu izin) |
| `teras-mang-jai-grup-makan-selfie.jpeg` | Wajah customer (perlu izin) |
| `teras-mang-jai-meeting-pria.jpeg` | Wajah customer (perlu izin) |
| `teras-mang-jai-grup-menu-board.jpeg` | Wajah customer (perlu izin) |

**Aturan operasional**: simpan versi redaksi sebagai `<original-name>-redacted.jpeg` dan hanya commit versi redaksi ke production. Versi asli tetap lokal sebagai master.

### 8.5 Klaim Halal MUI

**Status sesuai konfirmasi owner: aktif (sudah diperbarui pasca-2022).** Boleh klaim "Tersertifikasi Halal MUI" tanpa caveat di copywriting. Nomor sertifikat 04030021380616 tetap tampil sebagai referensi.

## 9. Non-Functional Requirements

### 9.1 Performance
- LCP < 2.5 s, INP < 200 ms, CLS < 0.1 di mobile 3G fast simulation
- Lighthouse Performance score ≥ 90 di semua halaman
- Gambar pakai `next/image` dengan `sizes` prop tepat + `priority` hanya untuk hero LCP
- Format output: WebP + AVIF fallback otomatis dari Next.js
- Maksimum bundle JS halaman: 150 KB gzipped

### 9.2 SEO
- Setiap halaman punya `<title>`, `<meta name="description">`, dan Open Graph metadata via `export const metadata` (Next.js 14 convention)
- `sitemap.xml` di-generate via `app/sitemap.ts`
- `robots.txt` di `public/robots.txt` allow semua + reference sitemap
- Structured data JSON-LD: `LocalBusiness` schema di homepage dengan alamat, geo, jam, telepon

### 9.3 Accessibility (WCAG 2.1 AA)
- Color contrast minimum 4.5:1 untuk text, 3:1 untuk UI components
- Semua interactive element keyboard-accessible (Tab, Enter, Esc)
- Semua image dengan `alt` deskriptif dalam Bahasa Indonesia
- `aria-label` pada tombol icon-only (mis. FAB WhatsApp)
- Form input (search filter, catatan checkout) punya `<label>` proper
- Lighthouse Accessibility ≥ 90

### 9.4 Mobile-First
- Layout responsive dari 320 px width ke atas
- Touch target minimum 44×44 px untuk semua tombol
- Bottom nav / FAB tidak menutupi konten utama (gunakan safe-area padding)

### 9.5 Compatibility
- Browser support: Chrome 100+, Safari 15+, Firefox 100+, Edge 100+
- iOS Safari 15+ tested manually (untuk WhatsApp deep link)

## 10. Technical Architecture

### 10.1 Struktur Folder

```
pempek-mangjai-788/
├── app/
│   ├── layout.tsx              # Root layout + CartProvider
│   ├── page.tsx                # / Beranda
│   ├── produk/
│   │   └── page.tsx
│   ├── beli/
│   │   └── page.tsx
│   ├── tentang/
│   │   └── page.tsx
│   ├── hampers/
│   │   └── page.tsx
│   ├── teras/
│   │   └── page.tsx
│   ├── legalitas/
│   │   └── page.tsx
│   ├── kontak/
│   │   └── page.tsx
│   ├── sitemap.ts
│   └── opengraph-image.tsx     # OG image generator
├── components/
│   ├── ui/                     # primitives (button, dialog, dst.)
│   ├── ProductCard.tsx
│   ├── CartItem.tsx
│   ├── FloatingWAButton.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BadgeSertifikasi.tsx
│   ├── TestimonialCard.tsx
│   └── SectionHero.tsx
├── data/
│   ├── products.ts             # array Product[] hardcoded
│   ├── certifications.ts
│   ├── retail.ts
│   └── testimonials.ts
├── content/
│   ├── about.ts                # copy untuk /tentang
│   └── teras.ts                # copy untuk /teras
├── lib/
│   ├── cart.ts                 # logic + Context provider
│   ├── format.ts               # formatRupiah, formatItemLine
│   ├── whatsapp.ts             # buildWhatsAppMessage + buildWAUrl
│   └── constants.ts            # WA_NUMBER, ADDRESS, dll.
├── public/
│   ├── image/                  # 60 file aset (sudah ada)
│   ├── robots.txt
│   └── favicon.ico
├── styles/
│   └── globals.css
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 10.2 Data Flow Cart

```
[ProductCard "Tambah"] ─┐
                        │
[CartItem "+/-/Hapus"] ─┼─→ useCart() hook
                        │     ↓
                        │   setState
                        │     ↓
                        │   useEffect → localStorage.setItem('mangjai-cart-v1', JSON.stringify(state))
                        │
[Beli "Pesan via WA"] ──┘
       ↓
buildWhatsAppMessage(cart, products, note)
       ↓
window.open('https://wa.me/...?text=...', '_blank')
```

### 10.3 Image Strategy

- Semua aset di `public/image/` (move dari `image/` saat scaffold)
- Static import di TypeScript file untuk dapat dimensions otomatis:
  ```ts
  import packKapalSelam from '@/public/image/pack-pempek-kapal-selam.jpeg';
  ```
- Gunakan `<Image src={packKapalSelam} alt="..." />` — Next.js generate srcset & blur placeholder otomatis
- Hero image: tambah `priority` dan `sizes="100vw"`
- Card image di grid: `sizes="(min-width: 768px) 33vw, 50vw"`

## 11. Deployment & CI/CD

### 11.1 Vercel Setup
1. Push repo ke GitHub (private repo)
2. Import ke Vercel dashboard, pilih framework "Next.js" (auto-detected)
3. Build settings: default (`next build`)
4. Tidak ada environment variables di MVP (semua hardcoded)
5. Aktifkan **Vercel Web Analytics** + **Speed Insights** (free tier sudah cukup)
6. Domain default: `pempek-mangjai-788.vercel.app` atau alias dipilih owner

### 11.2 Workflow
- Branch `main` → production deployment otomatis
- Pull request → preview deployment otomatis (URL unik untuk review)
- Setiap PR wajib lulus:
  - `next build` (no error)
  - `next lint` (no error)
  - Lighthouse CI optional di fase 2

### 11.3 Custom Domain (Fase 2)
Saat domain final dibeli (mis. `pempekmangjai.id` atau `mangjaipempek.com`):
- Tambah di Vercel dashboard → Domains
- Set DNS A/CNAME sesuai instruksi Vercel
- Free SSL otomatis via Let's Encrypt

## 12. Roadmap & Milestone

### Fase 1 — MVP (3-4 minggu)
- Sprint 1 (Minggu 1): Scaffold + layout + design system + halaman `/`, `/produk`
- Sprint 2 (Minggu 2): Fitur cart-to-WhatsApp + halaman `/beli`, `/kontak`
- Sprint 3 (Minggu 3): Halaman `/tentang`, `/hampers`, `/teras`, `/legalitas`
- Sprint 4 (Minggu 4): SEO polish, performance tuning, Lighthouse fix, QA mobile + launch

### Fase 2 — Polish (post-launch)
- Custom domain
- Halaman detail produk `/produk/[slug]` (deskripsi panjang, foto galeri, related products)
- Foto produk yang belum ada (`pack-pempek-kulit`, `pack-pempek-tunu`, dll.)
- Update sertifikat ke versi diredaksi yang lebih clean
- Cart shareable via URL (serialize ke query string)

### Fase 3 — Growth (3-6 bulan)
- Blog resep & tips memasak pempek (SEO play)
- Integrasi link ke Shopee/Tokopedia (kalau owner buka toko)
- Review produk dengan foto (lewat embed Instagram tag)
- Multi-bahasa (English) untuk pasar diaspora

### Fase 4 — Skala
- Pertimbangkan migrasi konten ke headless CMS (Sanity/Decap) kalau update frequency naik
- Kalau order volume signifikan: integrasikan payment gateway (Midtrans/Xendit) + admin dashboard sederhana
- PWA: offline-first browsing katalog

## 13. Out of Scope untuk MVP

Hal-hal berikut **tidak dibangun di MVP** dan tidak perlu di-stub:
- User authentication / login
- Payment gateway (Midtrans, Xendit, dll.)
- Admin panel / CMS dashboard
- Bahasa Inggris atau multi-bahasa
- Blog / artikel
- Integrasi marketplace (Shopee, Tokopedia, GoFood)
- Review & rating produk
- Wishlist
- Notifikasi push / email
- Cart shareable via URL
- Halaman detail per produk (`/produk/[slug]`)
- PWA / offline mode
- A/B testing
- Customer account / order history

## 14. Open Questions (perlu konfirmasi sebelum coding)

1. **Daftar paket hampers** — meskipun struktur halaman `/hampers` adalah custom-only-via-WA, akan sangat membantu kalau ada 2-3 contoh paket dengan harga estimasi (mis. "Paket Mini Rp 150.000", "Paket Tumpeng Rp 400.000") sebagai "anchor expectation" customer. Boleh disediakan owner?
2. **Foto customer di Teras Mang Jai** (`teras-mang-jai-keluarga-makan`, `teras-mang-jai-grup-makan-selfie`, dll.) — apakah ada izin tertulis dari customer untuk dipublikasi? Kalau tidak, halaman `/teras` akan pakai 2 foto yang aman saja (`teras-mang-jai-grand-opening-storefront` + `teras-mang-jai-pendiri-portrait`).
3. **Disclaimer hukum** — apakah perlu halaman Kebijakan Privasi & Syarat Ketentuan di MVP? Default-nya tidak, tapi kalau pengiriman ke luar Batam melibatkan data alamat customer di chat WhatsApp, mungkin perlu disclaimer minimal di footer (mis. "Data pesanan hanya digunakan untuk pengiriman, tidak disimpan oleh website").
4. **Domain final** — apakah ada nama domain target yang sudah dipikirkan (`pempekmangjai.id`, `mangjai788.com`, dll.) supaya OG image dan canonical URL bisa di-set sejak awal? Kalau belum, default ke `pempek-mangjai-788.vercel.app`.
5. **Foto founder yang clean** — `teras-mang-jai-pendiri-portrait.jpeg` bagus tapi diambil di outlet dengan banner ramai sebagai latar. Apakah owner mau sediakan foto portrait formal terpisah untuk halaman `/tentang`, atau yang ada sudah cukup?
6. **Harga 3 SKU "Hubungi Kami"** (Pempek Campur, Tekwan Ikan, Kue Bawang) — secara prinsip checkout via WhatsApp sudah disepakati. Tapi kalau owner mau, harga estimasi bisa dimasukkan ke deskripsi tooltip ProductCard supaya customer dapat *expectation range* sebelum chat.
7. **Konsistensi jam buka di slide dan di slide produksi** — slide 11/12 tidak sebut jam operasional. Pastikan jam 09:30–16:30 yang dipakai di website konsisten dengan jam yang tertera di Google Business profile / Instagram bio (kalau ada).

> **Catatan resolusi (dari iterasi sebelumnya, tidak perlu ditanyakan ulang):**
>
> - ✅ Foto Pempek Kulit sudah tersedia (`pack-pempek-kulit.jpeg`)
> - ✅ Pempek Tunu = Pempek Panggang (digabung jadi satu SKU dengan harga Rp 40.000 / 6 pcs)
> - ✅ Pempek Premium dan Otak-Otak **tidak masuk MVP** — dihapus dari katalog
> - ✅ Status Halal MUI: aktif (sudah diperbarui pasca-2022)
> - ✅ Logo retail distributor: tidak dipakai; gunakan text chip dengan nama retail saja
> - ✅ Jam buka Teras: Senin–Minggu 09:30–16:30 WIB

---

**Sign-off:**
PRD ini siap diteruskan ke development. Pertanyaan terbuka di section 14 boleh dikejar paralel dengan Sprint 1 — tidak memblokir kickoff coding.
