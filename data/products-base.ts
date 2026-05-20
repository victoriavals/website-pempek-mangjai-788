// Static product base data — committed to repo, edited via PR.
// Owner does NOT edit these via Google Sheets:
//   - `nama` stays here so the owner can't introduce typos via sheet
//   - `gambar`, `deskripsi`, `tags`, `kategori` change very rarely
// Inventory-side fields (price, stock, isi_per_pack) come from
// `lib/sheets.ts` (Google Sheets CSV) or `data/default-inventory.ts` (fallback).

import type { ProductBase } from './types';

export const PRODUCTS_BASE: ProductBase[] = [
  {
    id: 'pempek-kapal-selam',
    slug: 'pempek-kapal-selam',
    nama: 'Pempek Kapal Selam',
    kategori: 'tenggiri-khusus',
    deskripsi:
      'Pempek besar isi telur ayam utuh, dibungkus adonan ikan tenggiri pilihan. Ikon Palembang yang wajib dicoba.',
    gambar: '/image/pack-pempek-kapal-selam.jpeg',
    tags: ['Best Seller', 'Halal'],
  },
  {
    id: 'pempek-lenjer',
    slug: 'pempek-lenjer',
    nama: 'Pempek Lenjer',
    kategori: 'tenggiri-standar',
    deskripsi:
      'Pempek silinder klasik dari ikan tenggiri. Tekstur kenyal dan padat, paling enak digoreng renyah.',
    gambar: '/image/pack-pempek-lenjer.jpeg',
    tags: ['Halal'],
  },
  {
    id: 'pempek-telur',
    slug: 'pempek-telur',
    nama: 'Pempek Telur',
    kategori: 'tenggiri-standar',
    deskripsi:
      'Pempek ukuran kecil berisi telur ayam di dalamnya. Versi mini dari Kapal Selam, pas untuk lauk sehari-hari.',
    gambar: '/image/pack-pempek-telur.jpeg',
    tags: ['Halal'],
  },
  {
    id: 'pempek-adaan',
    slug: 'pempek-adaan',
    nama: 'Pempek Adaan',
    kategori: 'tenggiri-standar',
    deskripsi:
      'Pempek bulat goreng langsung, tanpa direbus dulu. Lebih gurih dan empuk karena adonan langsung ke wajan.',
    gambar: '/image/pack-pempek-adaan.jpeg',
    tags: ['Halal'],
  },
  {
    id: 'pempek-keriting',
    slug: 'pempek-keriting',
    nama: 'Pempek Keriting',
    kategori: 'tenggiri-standar',
    deskripsi:
      'Pempek dengan tekstur unik menyerupai mi keriting, dibuat dengan alat khusus. Renyah di luar, kenyal di dalam.',
    gambar: '/image/pack-pempek-keriting.jpeg',
    tags: ['Halal'],
  },
  {
    id: 'pempek-pistel',
    slug: 'pempek-pistel',
    nama: 'Pempek Pistel',
    kategori: 'tenggiri-standar',
    deskripsi:
      'Pempek isi pepaya muda parut yang ditumis. Bentuk seperti pastel kecil dengan pinggir berkerut.',
    gambar: '/image/pack-pempek-pistel.jpeg',
    tags: ['Halal'],
  },
  {
    id: 'pempek-kulit',
    slug: 'pempek-kulit',
    nama: 'Pempek Kulit',
    kategori: 'tenggiri-standar',
    deskripsi:
      'Pempek dari kulit ikan tenggiri yang dihaluskan. Tekstur renyah khas, kaya rasa ikan, favorit penggemar pempek tradisional.',
    gambar: '/image/pack-pempek-kulit.jpeg',
    tags: ['Halal'],
  },
  {
    id: 'pempek-mozzarella',
    slug: 'pempek-mozzarella',
    nama: 'Pempek Mozzarella',
    kategori: 'tenggiri-standar',
    deskripsi:
      'Inovasi baru: pempek ikan tenggiri dengan isian keju mozzarella yang leleh saat digoreng. Disukai anak-anak.',
    gambar: '/image/pack-pempek-mozzarella.jpeg',
    tags: ['Premium', 'Halal'],
  },
  {
    id: 'pempek-panggang',
    slug: 'pempek-panggang',
    nama: 'Pempek Panggang',
    kategori: 'tenggiri-khusus',
    deskripsi:
      'Pempek dipanggang (juga dikenal sebagai Tunu), disajikan dengan saus khas. Aroma smoky yang berbeda dari versi goreng.',
    gambar: '/image/pack-pempek-panggang.jpeg',
    tags: ['Halal'],
  },
  {
    id: 'pempek-dos',
    slug: 'pempek-dos',
    nama: 'Pempek DOS',
    kategori: 'tanpa-ikan',
    deskripsi:
      'Pempek tanpa ikan, dibuat dari tepung saja. Pilihan ekonomis dan vegetarian-friendly, tekstur tetap kenyal.',
    gambar: '/image/pack-pempek-dos.jpeg',
    tags: ['Tanpa Ikan', 'Halal'],
  },
  {
    id: 'pempek-campur',
    slug: 'pempek-campur',
    nama: 'Pempek Campur',
    kategori: 'campur',
    deskripsi:
      'Paket mix berbagai varian pempek dari ikan laut pilihan. Cocok untuk yang ingin coba semua jenis sekaligus.',
    gambar: '/image/pack-pempek-campur.jpeg',
    tags: ['Best Seller', 'Hubungi Kami', 'Halal'],
  },
  {
    id: 'tekwan-ikan',
    slug: 'tekwan-ikan',
    nama: 'Tekwan Ikan',
    kategori: 'tenggiri-khusus',
    deskripsi:
      'Bola-bola ikan tenggiri dalam kuah kaldu udang gurih, dengan jamur kuping dan bihun. Sajian sup khas Palembang.',
    gambar: '/image/pack-tekwan-ikan.jpeg',
    tags: ['Best Seller', 'Hubungi Kami', 'Halal'],
  },
  {
    id: 'kue-bawang',
    slug: 'kue-bawang',
    nama: 'Kue Bawang',
    kategori: 'snack',
    deskripsi:
      'Camilan renyah aroma bawang, teman ngopi atau pelengkap pempek. Dibuat dengan resep rumahan.',
    gambar: '/image/pack-kue-bawang.jpeg',
    tags: ['Snack', 'Hubungi Kami', 'Halal'],
  },
];

export const PRODUCTS_BASE_BY_ID: Record<string, ProductBase> = Object.fromEntries(
  PRODUCTS_BASE.map((p) => [p.id, p])
);

export const CATEGORY_LABELS: Record<ProductBase['kategori'], string> = {
  'tenggiri-standar': 'Tenggiri Standar',
  'tenggiri-khusus': 'Tenggiri Khusus',
  'tanpa-ikan': 'Tanpa Ikan',
  campur: 'Paket Campur',
  snack: 'Snack',
};
