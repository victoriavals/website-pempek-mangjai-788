# Prompt: Buat PRD Website Company Profile — Pempek 788 Mang Jai

> Salin seluruh blok di bawah ini (mulai baris `## Peran Anda`) ke sesi Claude/ChatGPT untuk menghasilkan PRD. Prompt ini sudah self-contained — semua fakta bisnis, aset, dan keputusan teknis sudah disisipkan; AI tidak perlu akses folder atau file lain.

---

## Peran Anda

Anda adalah **Senior Product Manager** dengan pengalaman membangun website company-profile + commerce-light untuk UMKM kuliner Indonesia. Tugas Anda: menyusun **Product Requirements Document (PRD) lengkap** dalam Bahasa Indonesia untuk website Pempek 788 Mang Jai berdasarkan brief, aset, dan keputusan di bawah. PRD harus cukup detail sehingga seorang full-stack developer (Next.js + Tailwind) bisa langsung mulai coding tanpa pertanyaan tambahan.

## Konteks Bisnis (sumber kebenaran — gunakan verbatim, jangan diparafrase)

- **Brand:** PEMPEK 788 MANG JAI ("Mang Jai 788")
- **Tagline:** *"Kentel Cukonyo - Teraso Iwaknyo"* (dialek Palembang ≈ "kuahnya kental, terasa ikannya") — sub-tagline: *"One Of The Traditional Culinary Of Indonesia"*
- **Berdiri:** 2013, oleh Bapak Zaitun Rizal S.H. (suami) dan Ibu Nurli Evi Rosita S.Pd. (istri)
- **Alamat / Produksi:** Plamo Garden Blok P No. 22, Kel. Baloi Permai, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29462, Indonesia
- **Kontak:**
  - WhatsApp 1: **+62 895 1019 4115** ← gunakan ini sebagai nomor utama untuk tombol "Pesan via WhatsApp" (cart checkout)
  - WhatsApp 2: +62 813 6475 0872
  - Email: pempek788mangjai@gmail.com
- **Sosial:** Instagram `@mangjaipempek788`, Facebook `mangjai788` / `mang jai pempek`, YouTube `mangjai788channel`, TikTok `mangjai788channel`
- **Visi-Misi:** Melestarikan kuliner dan budaya Nusantara — khususnya kuliner khas Sumatera Selatan. Menyajikan kuliner bergizi, sehat, dan dapat dikonsumsi oleh anak-anak sampai orang tua.
- **Sertifikasi:** Halal MUI No. **04030021380616**, BPOM RI MD **243229017042**, P-IRT **2022171010690-23** dan **2062171020620-23**, SIUMK **IUMK/045/BK/XII/2017**, NIB **0220003690831**, SNI **1002991042023**, GMP Certified, "Batam Poenya", "Bangga Buatan Indonesia"
- **Kapasitas produksi:** ~1000 pcs/hari (≈100 pack) dengan 4 staf
- **Distribusi retail:** Diamond Supermarket, JC Supermarket, 212 Mart, Indomaret, TOP 100 Supermarket (catatan: tidak ada file logo PNG distributor; tampilkan sebagai **text chip / styled badge**, bukan grid logo)
- **Outlet fisik:** **Teras Mang Jai 788** (Grand Opening 10 September 2023) di alamat yang sama — dine-in pempek + menu pendamping (Pindang Daging) + minuman. **Jam buka: Senin–Minggu, 09:30–16:30 WIB.**
- **Cakupan pengiriman:** Area Batam (delivery lokal / pickup) + ekspedisi frozen ke seluruh Indonesia (JNE Yes, J&T Frozen, dll. — metode dikonfirmasi via WA per pesanan).
- **Status sertifikat Halal MUI:** **aktif** (sudah diperbarui pasca-2022). Boleh klaim "Tersertifikasi Halal MUI" tanpa caveat.
- **Brand kembar di aset:** Eza Food (logo terpisah; **JANGAN** dicampur ke branding Mang Jai 788 tanpa konfirmasi)

### Katalog Produk & Harga — TERBARU (per 2026, override Slide 5)

> **Penting:** harga di `image/slide-05-daftar-produk-harga.jpeg` sudah **tidak berlaku**. Gunakan daftar di bawah sebagai sumber kebenaran. Slide 5 boleh tetap ditampilkan sebagai konteks historis di halaman "Tentang" tapi **jangan dipakai sebagai sumber harga**.
>
> Skema harga baru adalah **count-based** (per jumlah potong dalam satu bungkus), bukan lagi weight-based. Kemasan default berisi **10 pcs/bungkus** untuk varian tenggiri standar, dengan beberapa SKU pengecualian.

**Tier "Rp 50.000 / bungkus isi 10 pcs"** — varian Pempek Ikan Tenggiri standar:
| SKU | Isi/bks | Harga |
|---|---|---|
| Pempek Lenjer | 10 pcs | Rp 50.000 |
| Pempek Telur | 10 pcs | Rp 50.000 |
| Pempek Keriting | 10 pcs | Rp 50.000 |
| Pempek Adaan | 10 pcs | Rp 50.000 |
| Pempek Kulit | 10 pcs | Rp 50.000 |
| Pempek Pistel | 10 pcs | Rp 50.000 |
| Pempek Mozzarella | 10 pcs | Rp 50.000 |

**SKU dengan kemasan/harga khusus:**
| SKU | Isi/bks | Harga |
|---|---|---|
| Pempek Kapal Selam | 2 pcs | Rp 50.000 |
| Pempek Panggang (alias "Tunu") | 6 pcs | Rp 40.000 |
| Pempek DOS (tanpa ikan) | 10 pcs | Rp 25.000 |

> Catatan: **Pempek Panggang = Pempek Tunu** — dua nama untuk produk yang sama. Pakai "Pempek Panggang" sebagai nama kanonik di UI; sebut "(juga dikenal sebagai Tunu)" di deskripsi.

**SKU "Hubungi Kami" — tampil di katalog tapi harga dikonfirmasi via WhatsApp saat checkout:**
- **Pempek Campur** (`pack-pempek-campur.jpeg`)
- **Tekwan Ikan** (`pack-tekwan-ikan.jpeg`)
- **Kue Bawang** (`pack-kue-bawang.jpeg`)

Item Hubungi Kami **tetap bisa di-add ke cart**; di pesan WhatsApp tampil dengan tag `*konfirmasi harga via WA*` (tanpa subtotal numerik).

**SKU yang sengaja tidak dimasukkan ke MVP** (per keputusan owner): Pempek Premium, Otak-Otak.

## Inventori Aset Visual

Semua aset di folder `image/` (60 file `.jpeg`) sudah di-rename ke slug kebab-case berdasarkan isi. Gunakan slug ini **verbatim** di PRD — jangan mengarang nama file.

### Slide deck company-profile (`slide-01` … `slide-13`)
1. `slide-01-company-profile-cover.jpeg` — cover dengan mosaik kemasan + contact card
2. `slide-02-tentang-pendiri-visi-misi.jpeg` — bio founder + visi-misi + list sertifikasi
3. `slide-03-struktur-organisasi-kapasitas.jpeg` — struktur 4 orang + klaim 1000 pcs/hari
4. `slide-04-mesin-produksi-pemasaran.jpeg` — list peralatan + saluran distribusi retail
5. `slide-05-daftar-produk-harga.jpeg` — daftar harga lama (weight-based). ⚠️ **SUDAH TIDAK BERLAKU** — gunakan tabel harga baru di section "Katalog Produk & Harga — TERBARU" di atas. Slide ini hanya untuk konteks historis.
6. `slide-06-legalitas-siumk-2017.jpeg` — SIUMK 2017 ⚠️ **mengandung NIK pribadi pemilik — crop/blur sebelum publish**
7. `slide-07-legalitas-nib-2020.jpeg` — NIB 0220003690831, 3 Juni 2020
8. `slide-08-legalitas-halal-mui.jpeg` — Halal MUI No. 04030021380616 (validitas tercetak 25 Agustus 2022 — **jangan klaim "masih berlaku" tanpa verifikasi ulang**)
9. `slide-09-legalitas-pirt-dinkes.jpeg` — PIRT Dinkes Batam (13 Aug 2018)
10. `slide-10-legalitas-bpom-rekomendasi.jpeg` — surat rekomendasi BPOM (nilai B/Baik)
11. `slide-11-denah-ruang-produksi.jpeg` — denah ruang produksi
12. `slide-12-peta-lokasi-usaha.jpeg` — peta tangan lokasi Plamo Garden
13. `slide-13-terima-kasih-display-produk.jpeg` — slide penutup + handle sosial

### `pack-*` — foto kemasan retail (13 file, latar bersih, MFG/EXP terlihat)
`pack-pempek-kapal-selam`, `pack-pempek-lenjer`, `pack-pempek-telur`, `pack-pempek-adaan`, `pack-pempek-keriting`, `pack-pempek-pistel`, `pack-pempek-kulit`, `pack-pempek-campur`, `pack-pempek-mozzarella`, `pack-pempek-panggang`, `pack-pempek-dos`, `pack-tekwan-ikan`, `pack-kue-bawang`. **Gunakan sebagai foto utama tile produk di halaman katalog.**

### `plated-*` — foto sajian di piring (6 file, blue-rim porcelain, ada watermark "MANG JAI 788")
`plated-pempek-adaan`, `plated-pempek-kapal-selam`, `plated-pempek-keriting`, `plated-pempek-lenjer`, `plated-pempek-pistel`, `plated-palembang-platter-spiral` (hidangan besar tradisional). **Gunakan untuk hero / dine-in imagery.**

### `hampers-*` — paket hadiah / tumpeng (7 file)
`hampers-pempek-campuran-tray`, `hampers-pempek-dengan-cuko`, `hampers-platter-besar-meja-biru` (aman untuk publik). ⚠️ `hampers-hbd-pak-jasman`, `hampers-hbd-pak-acun-bni`, `hampers-hbd-display-kemasan`, `hampers-hbd-display-kemasan-alt` menampilkan nama customer asli — **redaksi atau jangan gunakan public-facing**.

### `menu-*` — side dish dine-in Teras (2 file)
`menu-pindang-daging-container` (3 container takeaway), `menu-pindang-pelengkap-sayur` (kemangi, sambal, kol).

### `logo-*` — brand marks (3 file)
- `logo-mang-jai-788.jpeg` — logo utama, latar hitam ⇒ untuk header/favicon
- `logo-mang-jai-788-business-card.jpeg` — logo + cert badge + contact ⇒ untuk footer/about
- `logo-eza-food.jpeg` — brand kembar, jangan dicampur

### `legal-*` — dokumen legal resolusi tinggi (2 file)
`legal-nib-rizal-2020`, `legal-surat-keterangan-usaha-mikro-2024` (valid 10/09/2024 – 10/09/2025). ⚠️ keduanya mengandung NIK + email pribadi — **redaksi sebelum publish**.

### `teras-*` — foto outlet Teras Mang Jai (6 file)
`teras-mang-jai-grand-opening-storefront` (fasad opening), `teras-mang-jai-pendiri-portrait` (founder), `teras-mang-jai-keluarga-makan`, `teras-mang-jai-meeting-pria`, `teras-mang-jai-grup-makan-selfie`, `teras-mang-jai-grup-menu-board`. Foto dengan wajah customer butuh izin sebelum publish.

### `event-*` (1 file)
`event-donor-darah-booth-mang-jai` — booth Mang Jai di acara donor darah 20 Mei 2023.

### `social-*` — screenshot social proof (5 file)
`social-ig-plut-kumkm-opening`, `social-ig-metamorphozelv-pempek`, `social-ig-metamorphozelv-makan`, `social-ig-mangjaipempek788-repost`, `social-wa-ucapan-pembukaan-teras`. **Hanya boleh dipakai sebagai testimonial dengan atribusi**, tidak sebagai own-brand imagery.

### Konteks lain (2 file)
- `produksi-rumah-plamo-garden-eksterior` — eksterior rumah produksi
- `display-semua-produk-mang-jai` — 11 SKU retail tertata bersamaan ⇒ **kandidat utama hero homepage**

## Keputusan yang Sudah Final (JANGAN dipertanyakan ulang)

| Aspek | Keputusan |
|---|---|
| Framework | **Next.js 14+ App Router** (TypeScript wajib) |
| Styling | **Tailwind CSS** + shadcn/ui (atau sejenis) |
| Image optimization | `next/image` dengan static import |
| Hosting | **Vercel free tier** |
| Bahasa UI | **Bahasa Indonesia** (tidak bilingual) |
| Mata uang | IDR, format `Rp 50.000,-` (titik ribuan, sufiks `,-`) |
| Alur pemesanan | **Cart client-side → tombol "Pesan via WhatsApp" → buka `wa.me/6289510194115?text=...`** dengan pesan pre-filled berisi ringkasan |
| Backend / API | **Tidak ada** (no auth, no DB, no payment gateway) |
| State cart | `localStorage` + React Context atau Zustand (pilih yang ringan) |
| Sumber konten | **Hardcoded** di `data/products.ts` + `content/*.ts` (atau MDX) — update via git push |
| CMS | Tidak pakai (MVP) |
| Analytics | Vercel Web Analytics (built-in free tier) |
| Domain | Mulai dengan `*.vercel.app`, custom domain opsional di fase 2 |

## Sitemap yang Wajib

1. `/` — **Beranda** (hero, USP, highlight produk, sertifikasi, testimoni, CTA WA)
2. `/produk` — **Produk Kami** (katalog lengkap, filter kategori, tombol "Tambah ke Keranjang" per item)
3. `/beli` — **Beli Sekarang** (review keranjang, ubah qty, total estimasi, tombol "Pesan via WhatsApp")
4. `/tentang` — **Tentang Kami** (kisah founder, visi-misi, struktur, kapasitas)
5. `/hampers` — **Hampers & Catering** (foto referensi `hampers-*` + tombol "Konsultasi via WhatsApp" dengan template khusus hampers — **tidak ada cart untuk hampers, semua custom-only via WA**)
6. `/teras` — **Teras Mang Jai** (outlet dine-in, menu pendamping, jam buka, peta, alamat)
7. `/legalitas` — **Legalitas & Sertifikasi** (badge grid Halal, BPOM, NIB, PIRT, SNI; klik untuk lihat sertifikat — gambar yang sudah diredaksi)
8. `/kontak` — **Kontak** (WA, alamat, jam buka, embed Google Maps, sosial)

Komponen global wajib: **Header (logo + nav + indikator jumlah cart)**, **Footer (kontak + sosial + sertifikasi mini)**, **Floating WhatsApp button** di setiap halaman.

## Spec Detail Fitur Cart-to-WhatsApp

PRD harus menjelaskan hal-hal berikut dengan presisi cukup untuk langsung di-implementasikan:

1. **Struktur data produk** (TypeScript interface): `id`, `slug`, `nama`, `kategori` (`tenggiri-standar` | `tenggiri-khusus` | `campur` | `tanpa-ikan` | `panggang` | `snack`), `isi_per_pack` (jumlah pcs dalam 1 bungkus, contoh: 10 untuk Lenjer, 2 untuk Kapal Selam, 6 untuk Tunu), `harga_per_pack` (number, nullable untuk SKU "Hubungi Kami"), `satuan_label` (string siap-tampil, contoh: `"10 pcs/bungkus"`, `"2 pcs/bungkus"`), `deskripsi`, `gambar` (path ke `image/pack-*.jpeg`; gunakan placeholder kalau tidak ada — lihat Open Questions), `tags?` (mis. "Best Seller", "Halal", "Premium", "Hubungi Kami").
2. **Struktur data cart item**: `productId`, `quantity` (≥1).
3. **Aksi cart:** `addItem`, `removeItem`, `incrementQty`, `decrementQty` (auto-remove kalau jadi 0), `clearCart`, `getSubtotal`, `getTotalQty`.
4. **Persistensi:** `localStorage` key `mangjai-cart-v1`, hydrate di mount client-side untuk hindari SSR mismatch.
5. **Template pesan WhatsApp** (URL-encoded, multiline) — wajib mencakup format **count-based per bungkus**:

   ```
   Halo Pempek 788 Mang Jai 👋
   Saya ingin memesan:

   1. Pempek Kapal Selam (2 pcs/bks) × 2 bks — Rp 100.000
   2. Pempek Lenjer (10 pcs/bks) × 1 bks — Rp 50.000
   3. Pempek Panggang (6 pcs/bks) × 1 bks — Rp 40.000
   4. Tekwan Ikan × 1 bks — *konfirmasi harga via WA*
   ...

   Subtotal: Rp 190.000 (+ item perlu konfirmasi)
   Catatan: [kosong/kalau diisi]

   Mohon info ongkir & cara pembayaran. Terima kasih!
   ```

   PRD harus mendefinisikan fungsi `buildWhatsAppMessage(cart, note?)` dengan format persis di atas. Subtotal hanya menjumlahkan item yang punya `harga_per_pack` non-null. Item "Hubungi Kami" tetap tampil di list tapi tanpa subtotal numerik.
6. **Tombol checkout**: `https://wa.me/6289510194115?text=${encodeURIComponent(message)}` — gunakan format internasional **tanpa `+`** di awal nomor.
7. **Edge cases yang harus dispek:**
   - Cart kosong → tombol disabled / arahkan ke `/produk`
   - Produk tanpa harga (Mozzarella, Panggang, Kue Bawang) → tag "Hubungi Kami", boleh masuk cart tapi subtotal-nya `null` dan pesan WA mencantumkan "harga: konfirmasi via WA"
   - Cart di-load lewat URL share (fase 2 — boleh masuk Out of Scope)

## Struktur PRD yang Harus Dihasilkan

PRD ditulis dalam **Markdown**, urutan section persis seperti ini:

1. **Executive Summary** (≤200 kata: apa yang dibangun, untuk siapa, hasil yang diharapkan)
2. **Tujuan Bisnis & Metrik Sukses** (kualitatif + kuantitatif — mis. % pengunjung yang lanjut ke WA, target Core Web Vitals)
3. **Persona & User Stories** (minimal 3 persona: pembeli rumah tangga online, customer hampers/event, pengunjung yang cari outlet — masing-masing 2-3 user story format "Sebagai X, saya ingin Y, supaya Z" + acceptance criteria)
4. **Information Architecture & Sitemap** (diagram tekstual + tabel halaman vs tujuan)
5. **Page-by-Page Specification** (untuk **setiap** halaman di sitemap: tujuan, audience, wireframe tekstual section-by-section, aset gambar yang dipakai dengan path `image/<slug>.jpeg`, CTA primer & sekunder, SEO meta default)
6. **Fitur Inti: Cart-to-WhatsApp** (struktur data, aksi, persistensi, template pesan, edge cases — sesuai spec di atas)
7. **Design System Singkat** (palet warna usulan yang sesuai brand — hijau/coklat hangat dari kemasan, tipografi heading & body, komponen reusable: ProductCard, CartItem, SectionHero, BadgeSertifikasi)
8. **Konten & Copy Guidelines** (verbatim facts wajib, larangan paraphrase nomor sertifikat, larangan publish NIK & nama customer di hampers, format harga, dialek Palembang sebagai bumbu copywriting tapi clarify dalam tooltip)
9. **Non-Functional Requirements** (Lighthouse target ≥ 90 di semua kategori, mobile-first, accessibility WCAG AA, SEO `metadata` per halaman + Open Graph + sitemap.xml + robots.txt, PWA bukan target MVP)
10. **Technical Architecture** (struktur folder `app/`, `components/`, `data/`, `lib/`, `content/`; data flow cart; image strategy dengan `next/image` static import)
11. **Deployment & CI/CD** (Vercel: git integration, preview deployment, env vars yang dibutuhkan kalaupun ada, custom domain opsional fase 2)
12. **Roadmap & Milestone** (MVP = fase 1, plus 2-3 fase berikutnya seperti: review produk, blog resep, integrasi Tokopedia/Shopee link, PWA, multi-bahasa)
13. **Out of Scope untuk MVP** (eksplisit sebut: auth user, payment gateway, admin panel, multi-bahasa, blog, integrasi marketplace)
14. **Open Questions** (hal yang masih ambigu dan butuh konfirmasi user sebelum coding — minimal 5 pertanyaan tajam)

## Aturan Penulisan PRD

- **Bahasa**: Indonesia (istilah teknis boleh tetap Inggris: cart, checkout, hero, CTA, dst.)
- **Citation aset**: setiap kali menyebut gambar, tulis path lengkapnya: `image/pack-pempek-kapal-selam.jpeg` — jangan parafrase nama file
- **Verbatim**: nama brand, tagline, alamat, nomor WA, dan nomor sertifikat **harus persis** seperti di section Konteks Bisnis di atas
- **PII protection**: setiap kali menyebut gambar yang mengandung NIK / nama customer, sertakan catatan "**wajib redaksi sebelum publish**"
- **Format harga**: `Rp 50.000,-` (titik ribuan, sufiks koma-strip)
- **Wireframe tekstual**: pakai indented list atau ASCII box — JANGAN bilang "lihat figma" karena tidak ada Figma
- **No fluff**: setiap bagian harus actionable. Hindari kalimat seperti "website harus user-friendly" tanpa kriteria konkret
- **Panjang**: PRD lengkap ekspektasinya 3.000-5.000 kata. Jangan ringkas; tapi juga jangan padding

## Output

Kembalikan **hanya isi PRD** dalam satu blok Markdown panjang, tanpa preamble seperti "Berikut PRD-nya:". Mulai langsung dari `# PRD: Website Pempek 788 Mang Jai`.
