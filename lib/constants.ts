export const BRAND = {
  nama: 'Pempek 788 Mang Jai',
  namaLengkap: 'PEMPEK 788 MANG JAI',
  tagline: 'Kentel Cukonyo - Teraso Iwaknyo',
  subTagline: 'One Of The Traditional Culinary Of Indonesia',
  tahunBerdiri: 2013,
  founder: {
    suami: 'Bapak Zaitun Rizal S.H.',
    istri: 'Ibu Nurli Evi Rosita S.Pd.',
  },
};

export const KONTAK = {
  waUtama: '6289510194115',
  waUtamaDisplay: '+62 895 1019 4115',
  waCadangan: '6281364750872',
  waCadanganDisplay: '+62 813 6475 0872',
  email: 'pempek788mangjai@gmail.com',
};

export const ALAMAT = {
  baris1: 'Plamo Garden Blok P No. 22',
  baris2: 'Kel. Baloi Permai, Kec. Batam Kota',
  baris3: 'Kota Batam, Kepulauan Riau 29462',
  baris4: 'Indonesia',
  full:
    'Plamo Garden Blok P No. 22, Kel. Baloi Permai, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29462, Indonesia',
};

export const JAM_BUKA = {
  hari: 'Senin – Minggu',
  jam: '09:30 – 16:30 WIB',
};

export const SOSIAL = {
  instagram: { handle: '@mangjaipempek788', url: 'https://instagram.com/mangjaipempek788' },
  facebook: { handle: 'mang jai pempek', url: 'https://facebook.com/mangjai788' },
  youtube: { handle: 'mangjai788channel', url: 'https://youtube.com/@mangjai788channel' },
  tiktok: { handle: 'mangjai788channel', url: 'https://tiktok.com/@mangjai788channel' },
};

export const TERAS = {
  nama: 'Teras Mang Jai 788',
  grandOpening: '10 September 2023',
  jamBuka: JAM_BUKA,
};

export const CART_STORAGE_KEY = 'mangjai-cart-v1';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
  'https://pempek-mangjai-788.vercel.app';
