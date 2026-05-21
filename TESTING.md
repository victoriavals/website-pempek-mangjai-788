# Testing — Pempek 788 Mang Jai

Dokumen ini berisi rencana QA untuk fitur-fitur yang ditambahkan / di-update di
versi 1.1.x:

- **Instagram Reel testimoni embed** (3 reel baru di `/testimoni`)
- **Link "Buka di Instagram"** di modal testimoni
- **Promo voucher diskon 10%** di CTA halaman `/testimoni`

Test dibagi 2:

1. **Automated tests** — Vitest, jalankan `npm test`. Mencakup: data integrity,
   pure URL builders, builder pesan WhatsApp, CSV parser sheet inventory.
2. **Manual test cases** — di bawah ini. Dijalankan di browser
   (desktop + mobile) sebelum deploy / setelah perubahan signifikan.

---

## 1. Automated test coverage

| Suite | File | Cakupan |
|---|---|---|
| WhatsApp URL builders | [tests/whatsapp.test.ts](tests/whatsapp.test.ts) | `buildWhatsAppUrl`, `buildSimpleWaUrl`, `buildTestimoniVoucherWaUrl` — encoding, phone number, isi pesan voucher |
| Testimoni data + IG helpers | [tests/testimoni.test.ts](tests/testimoni.test.ts) | 3 reel hadir, `kind: 'reel'`, postId benar, grouping, no-duplicate-id, `instagramEmbedSrc` & `instagramPermalink` |
| Sheet CSV inventory | [tests/sheets.test.ts](tests/sheets.test.ts) | `parseCsv` (quoting, CRLF, escaped quotes), `rowsToInventory` (`Rp 50.000` / `50,000` / `50000`, stock `0` vs `null`, header validation), threshold |

**Run**: `npm test` (one-shot) — `npm run test:watch` (HMR).

Terakhir dijalankan: **38 passed / 0 failed** in ~1.1s.

---

## 2. Manual test cases — UI

Konvensi:

- **ID** format `TC-<area>-<nn>`
- **Pre** = prasyarat
- **Steps** = langkah eksekusi
- **Expected** = hasil yang diharapkan
- **Status**: ☐ belum dites · ✅ pass · ❌ fail (catat bug-nya)

Jalankan tiap kali ada perubahan di file-file ini:

- `app/testimoni/page.tsx`
- `components/TestimoniGrid.tsx`
- `components/TestimoniCard.tsx`
- `data/testimoni.ts`
- `lib/whatsapp.ts` (khusus `buildTestimoniVoucherWaUrl`)

### A. Instagram Reel — kartu di section Instagram

#### TC-IG-01 — Section Instagram menampilkan 3 reel baru
- **Pre**: dev server jalan (`npm run dev`), buka `/testimoni`
- **Steps**:
  1. Scroll ke section Instagram (anchor `#instagram`)
  2. Hitung kartu yang ada
- **Expected**:
  - Kartu Instagram total = 6 (3 image lama + 3 reel baru)
  - 3 kartu reel terlihat: caption "borong / sold out", "Sosialisasi Gemar Ikan",
    "Perjalanan reseller"
  - Heading section menampilkan jumlah `6 cerita dari Instagram.`
- **Status**: ☐

#### TC-IG-02 — Kartu reel menampilkan badge & play overlay
- **Pre**: di section Instagram
- **Steps**: lihat salah satu kartu reel
- **Expected**:
  - Badge **"Instagram"** (warna merah bata) di kiri-atas
  - Tombol play bundar putih di tengah kartu
  - Caption di overlay bawah: "Instagram Reel" + nama author (mis. `@mangjaipempek788`)
  - Background = gradien hijau-merah brand (placeholder; tidak ada thumbnail karena
    Instagram tutup oEmbed publik)
- **Status**: ☐

#### TC-IG-03 — Hover effect di desktop
- **Pre**: desktop, kursor mouse
- **Steps**: hover kartu reel
- **Expected**: kartu naik ~4px (`whileHover: y -4`), shadow membesar
- **Status**: ☐

### B. Instagram Reel — modal lightbox

#### TC-IG-04 — Klik kartu reel membuka modal
- **Pre**: di kartu reel "Sosialisasi Gemar Ikan" (`ig-reel-gemar-ikan-2024`)
- **Steps**: klik kartu
- **Expected**:
  - Modal `<dialog>` terbuka, 2 kolom di desktop, stack di mobile
  - Kolom kiri: iframe Instagram Reel — URL `https://www.instagram.com/reel/C776WstAm_y/embed/`
  - Kolom kanan: platform "Instagram Reel", author "Sosialisasi Gemar Ikan",
    tanggal `7 Juni 2024`, fullQuote terlihat lengkap
  - Tombol close (X) bundar di pojok kanan atas
- **Status**: ☐

#### TC-IG-05 — Iframe me-load reel dari Instagram
- **Pre**: koneksi internet aktif, browser tidak block iframe Instagram
- **Steps**: buka modal reel `ig-reel-borong-sold-out` (`DFjlct6q4j-`)
- **Expected**:
  - Iframe menampilkan card "View this post on Instagram" milik IG embed
  - Klik area iframe → bisa play video di Instagram (dalam iframe atau buka tab baru)
- **Catatan**: kalau gagal load, biasanya karena network/CSP. Tidak ada fallback —
  user bisa klik "Buka di Instagram" sebagai gantinya
- **Status**: ☐

#### TC-IG-06 — Link "Buka di Instagram" mengarah ke reel asli
- **Pre**: modal reel terbuka (yang mana pun)
- **Steps**:
  1. Scroll kolom kanan modal ke bawah
  2. Klik link "Buka di Instagram" (ikon panah eksternal)
- **Expected**:
  - Tab baru terbuka ke `https://www.instagram.com/reel/<postId>/`
  - `target="_blank"` + `rel="noopener noreferrer"` (cek dev tools)
- **Status**: ☐

#### TC-IG-07 — Tutup modal (3 cara)
- **Steps**:
  1. Klik tombol X → tutup
  2. Klik area gelap di luar modal → tutup
  3. Tekan **Esc** → tutup
- **Expected**: semua 3 cara menutup modal, fokus kembali ke kartu sebelumnya
- **Status**: ☐

### C. Promo voucher diskon 10%

#### TC-VC-01 — Section CTA "Punya cerita sendiri?" menampilkan voucher box
- **Pre**: scroll ke paling bawah `/testimoni` (sebelum footer)
- **Expected**:
  - Section hijau gelap dengan heading "Bagikan momen Anda *bersama kami.*"
  - Body paragraph menyebut "voucher diskon 10%"
  - **Kotak emas dengan emoji 🎁** terlihat di antara paragraph dan tombol —
    border gold transparan, isi: "**Voucher diskon 10%** untuk pembelian
    berikutnya — tag kami, lalu tunjukkan postingan Anda saat pesan via
    WhatsApp untuk klaim."
- **Status**: ☐

#### TC-VC-02 — Tombol "Kirim Testimoni via WhatsApp" mengisi pesan klaim
- **Pre**: di CTA section
- **Steps**: klik tombol "Kirim Testimoni via WhatsApp"
- **Expected**:
  - Tab baru / app WhatsApp terbuka dengan nomor +62 895 1019 4115
  - Pesan pre-filled persis seperti ini (setiap baris baru = newline):
    ```
    Halo Pempek 788 Mang Jai 👋
    Saya mau berbagi testimoni & klaim voucher diskon 10%.
    Saya sudah tag @mangjaipempek788 di Instagram/Facebook.
    Ini link/screenshot postingannya: [tempel di sini]

    Terima kasih!
    ```
- **Status**: ☐

#### TC-VC-03 — Tombol "Lihat Produk" mengarah ke `/produk`
- **Steps**: klik tombol outline di sebelah tombol WhatsApp
- **Expected**: navigasi ke `/produk`
- **Status**: ☐

#### TC-VC-04 — Tampilan voucher box di mobile (< 640px)
- **Pre**: viewport 360–414px
- **Expected**:
  - Voucher box tetap dalam satu garis baca, tidak overflow
  - Emoji + teks sejajar (gap 4)
  - Tombol-tombol stack vertikal (`flex-col sm:flex-row`)
- **Status**: ☐

### D. Versioning & changelog

#### TC-VER-01 — Footer menampilkan versi terbaru
- **Pre**: setiap halaman
- **Expected**: di footer paling bawah tertulis `Versi situs v1.1.x` sesuai
  [lib/version.ts](lib/version.ts)
- **Status**: ☐

### E. Regresi — fitur yang sudah ada tidak rusak

#### TC-REG-01 — Section TikTok masih embed video TikTok
- **Steps**: buka modal salah satu kartu TikTok (mis. featured)
- **Expected**: iframe TikTok player, plus link "Buka di TikTok"
- **Status**: ☐

#### TC-REG-02 — Kartu testimoni image (press / IG image / Facebook / WA) tetap render
- **Expected**:
  - Press: 2 kartu (Magazine F&B, PLUT KUMKM)
  - Instagram image: 3 kartu (renynovita, jejebalqis ×2) — masih ada di section IG
  - Facebook: 2, WhatsApp: 4
- **Status**: ☐

#### TC-REG-03 — Cart → WhatsApp checkout flow
- **Steps**:
  1. Tambah 2 SKU dari `/produk` ke cart
  2. Buka `/beli`, klik "Pesan via WhatsApp"
- **Expected**: pesan WA berformat lama (judul "Saya ingin memesan:"), tidak
  tercemar oleh perubahan voucher (kedua flow pakai builder berbeda)
- **Status**: ☐

#### TC-REG-04 — Footer "Versi situs" + cert badges + nav links
- **Expected**: footer tidak ada perubahan layout
- **Status**: ☐

### F. Accessibility

#### TC-A11Y-01 — Modal keyboard-trap & focus
- **Steps**: tab ke kartu reel → Enter membuka modal → tab di dalam modal
- **Expected**:
  - Fokus pindah ke tombol close saat modal dibuka (native `<dialog>` behavior)
  - Tab tidak keluar ke konten di belakang
  - Esc menutup modal
- **Status**: ☐

#### TC-A11Y-02 — Reduced motion
- **Pre**: aktifkan "prefers-reduced-motion" di OS
- **Expected**: animasi `FadeUp` di section CTA tidak menyentak (motion primitives
  hormati `prefers-reduced-motion` via global CSS)
- **Status**: ☐

#### TC-A11Y-03 — Kontras teks pada voucher box
- **Expected**: teks gold pada background gold-soft-transparan tetap terbaca
  jelas (≥ 4.5:1 untuk body). Cek dengan dev tools / WCAG color checker.
- **Status**: ☐

---

## 3. Smoke checklist pra-deploy

Sebelum `git push` / Vercel deploy, jalankan:

```powershell
npm run lint        # ✓ 0 warnings
npx tsc --noEmit    # ✓ 0 errors
npm test            # ✓ all tests pass
npm run build       # ✓ build sukses, 14 halaman generate
```

Plus minimal **TC-IG-04, TC-VC-02, TC-REG-03** secara manual di
browser. Kalau ke-3 ini hijau, deploy aman.
