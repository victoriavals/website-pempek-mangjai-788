export type TestimoniSource =
  | 'press'
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'whatsapp';

export type TestimoniMedia =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster?: string }
  | { type: 'youtube'; videoId: string; poster?: string }
  | { type: 'tiktok'; videoId: string; username: string; poster?: string }
  | { type: 'instagram'; postId: string; poster?: string };

export interface Testimoni {
  id: string;
  media: TestimoniMedia;
  source: TestimoniSource;
  platform: string; // "Magazine F&B", "Instagram Story", "TikTok · @username", ...
  author?: string;
  excerpt?: string;
  fullQuote?: string;
  date?: string;
  highlight?: boolean;
}

export const TESTIMONI: Testimoni[] = [
  // ===== PRESS =====
  {
    id: 'press-magazine-foodbev',
    media: {
      type: 'image',
      src: '/image/testimoni/press-magazine-foodbev-feature.jpeg',
    },
    source: 'press',
    platform: 'Majalah Food & Beverage',
    author: 'Featured Product',
    excerpt:
      'Longing for Palembang’s signature heirloom pempek. Made from fresh mackerel fish from the Riau archipelago.',
    fullQuote:
      'Mang Jai 788’s business started with a family of Palembang migrants, who missed the local speciality, pempek. Pempek is a food made from fresh mackerel fish, which is an abundant marine product in the Riau archipelago, where the family settled. They struggled to find a pempek that had a flavour reminiscent of their hometown.',
    date: 'Halaman 141-143',
    highlight: true,
  },
  {
    id: 'press-plut-kumkm-opening',
    media: {
      type: 'image',
      src: '/image/testimoni/press-ig-plut-kumkm-opening-teras-2023.jpeg',
    },
    source: 'press',
    platform: 'Instagram · @plut_kumkmbatam',
    author: 'UPTD PLUT KUMKM Batam',
    excerpt:
      'Salah satu pelaku usaha binaan DinasKUM dan PLUT KUMKM Kota Batam membuka gerai penjualan di lokasi produksinya.',
    fullQuote:
      'Salah satu pelaku usaha Binaan DinasKUM dan PLUT KUMKM Kota Batam membuka gerai penjualan di lokasi produksinya, dengan nama “Teras Pempek Mangjai788”. Mangjai dan Yuk Nurli selaku owner fokus pada penjualan makanan daerah Palembang yang juga digemari oleh masyarakat batam.',
    date: '10 September 2023',
    highlight: true,
  },

  // ===== INSTAGRAM =====
  {
    id: 'ig-renynovita-quote',
    media: {
      type: 'image',
      src: '/image/testimoni/ig-renynovitaratnani-jexpo-quote.jpeg',
    },
    source: 'instagram',
    platform: 'Instagram Story',
    author: '@renynovitaratnani',
    excerpt:
      'Suka pempek yang lembut dengan rasa ikan yang kuat? Cobain @mangjaipempek788. BEDA!',
    fullQuote:
      'Suka pempek yang lembut dengan rasa ikan yg kuat? Cobain @mangjaipempek788 BEDA! Berasa makan pempek zaman kecil di lampung dulu. Lembut banget apalagi yang isi kates (pepaya muda). Maknyuus... UMKM jagoannya Batam!',
    date: 'Jexpo Kemayoran Jakarta Pusat',
    highlight: true,
  },
  {
    id: 'ig-jejebalqis-cuko-pour',
    media: {
      type: 'image',
      src: '/image/testimoni/ig-jejebalqis-cuko-pour.jpeg',
    },
    source: 'instagram',
    platform: 'Instagram Story',
    author: '@jejebalqis',
    excerpt: 'Indahnyaa... @mangjaipempek788',
  },
  {
    id: 'ig-jejebalqis-kemangi',
    media: {
      type: 'image',
      src: '/image/testimoni/ig-jejebalqis-pempek-kemangi.jpeg',
    },
    source: 'instagram',
    platform: 'Instagram Story',
    author: '@jejebalqis',
    excerpt: 'Indahnyaa... @mangjaipempek788',
  },

  // ===== TIKTOK =====
  {
    id: 'tiktok-featured',
    media: {
      type: 'tiktok',
      videoId: '7620283214447349013',
      username: 'mangjai788channel',
      poster: '/image/testimoni/poster-tiktok-featured.jpeg',
    },
    source: 'tiktok',
    platform: 'TikTok · @mangjai788channel',
    author: 'Mang Jai 788',
    excerpt: 'Video unggulan dari channel TikTok resmi kami.',
    highlight: true,
  },
  {
    id: 'tiktok-2',
    media: {
      type: 'tiktok',
      videoId: '7403147297296551173',
      username: 'mangjai788channel',
      poster: '/image/testimoni/poster-tiktok-2.jpeg',
    },
    source: 'tiktok',
    platform: 'TikTok · @mangjai788channel',
    author: 'Mang Jai 788',
    excerpt: 'Cerita dari dapur Mang Jai 788.',
  },
  {
    id: 'tiktok-3',
    media: {
      type: 'tiktok',
      videoId: '7385170210833075462',
      username: 'mangjai788channel',
      poster: '/image/testimoni/poster-tiktok-3.jpeg',
    },
    source: 'tiktok',
    platform: 'TikTok · @mangjai788channel',
    author: 'Mang Jai 788',
    excerpt: 'Cerita dari dapur Mang Jai 788.',
  },
  {
    id: 'tiktok-4',
    media: {
      type: 'tiktok',
      videoId: '7379435253586267397',
      username: 'mangjai788channel',
      poster: '/image/testimoni/poster-tiktok-4.jpeg',
    },
    source: 'tiktok',
    platform: 'TikTok · @mangjai788channel',
    author: 'Mang Jai 788',
    excerpt: 'Cerita dari dapur Mang Jai 788.',
  },
  {
    id: 'tiktok-5',
    media: {
      type: 'tiktok',
      videoId: '7375110917094132997',
      username: 'mangjai788channel',
      poster: '/image/testimoni/poster-tiktok-5.jpeg',
    },
    source: 'tiktok',
    platform: 'TikTok · @mangjai788channel',
    author: 'Mang Jai 788',
    excerpt: 'Cerita dari dapur Mang Jai 788.',
  },
  {
    id: 'tiktok-photo-carousel',
    media: {
      type: 'tiktok',
      videoId: '7403662017200114950',
      username: 'mangjai788channel',
      poster: '/image/testimoni/poster-tiktok-photo-carousel.jpeg',
    },
    source: 'tiktok',
    platform: 'TikTok Photo · @mangjai788channel',
    author: 'Mang Jai 788',
    excerpt: 'Carousel foto produk Mang Jai 788.',
  },
  {
    id: 'tiktok-event-gemar-ikan',
    media: {
      type: 'tiktok',
      videoId: '7290817070504234246',
      username: 'mangjai788channel',
      poster: '/image/testimoni/poster-tiktok-event-gemar-ikan.jpeg',
    },
    source: 'tiktok',
    platform: 'TikTok · @mangjai788channel',
    author: 'Event Sosialisasi Gemar Ikan',
    excerpt:
      'Mang Jai 788 turut serta dalam event sosialisasi Gemar Ikan — kampanye konsumsi ikan dari Kementerian Kelautan & Perikanan.',
  },
  {
    id: 'tiktok-event-bazaar-melayu-pesisir',
    media: {
      type: 'tiktok',
      videoId: '7282550694270356741',
      username: 'mangjai788channel',
      poster: '/image/testimoni/poster-tiktok-event-bazaar-melayu-pesisir.jpeg',
    },
    source: 'tiktok',
    platform: 'TikTok · @mangjai788channel',
    author: 'Event Bazaar Gemar Melayu Pesisir',
    excerpt:
      'Booth Mang Jai 788 di bazaar Gemar Melayu Pesisir — mempertemukan kuliner khas pesisir dengan masyarakat Batam.',
  },

  // ===== FACEBOOK =====
  {
    id: 'fb-rina-fairuz',
    media: {
      type: 'image',
      src: '/image/testimoni/fb-rina-fairuz-fjb-batam-2020.jpeg',
    },
    source: 'facebook',
    platform: 'Facebook · FJB Batam (Forum Jual Beli Batam)',
    author: 'Rina Fairuz',
    excerpt:
      'Cukupla utk cemilan sampe sore. Singgonyo dak beringgut lagi dari makanan @Pempek Mangjai. Makin lekat dilidah!',
    date: '6 April 2020',
  },
  {
    id: 'fb-lawastoree-dede',
    media: {
      type: 'image',
      src: '/image/testimoni/fb-lawastoree-dede-redzwan-pempek.jpeg',
    },
    source: 'facebook',
    platform: 'Facebook Story · Lawa Storee Batam',
    author: '@dede_redzwan (via Lawa Storee Batam)',
    excerpt: 'Seenak ituuuhhh! Memang pempek nya Mangjai Pempek.',
  },

  // ===== WHATSAPP =====
  {
    id: 'wa-lucy-piayu',
    media: {
      type: 'image',
      src: '/image/testimoni/wa-lucy-piayu-promo-kuliner-group.jpeg',
    },
    source: 'whatsapp',
    platform: 'WhatsApp Group · Promo Kuliner Batam',
    author: 'Lucy Piayu',
    excerpt:
      'Makasih mbk Nurli. Pempek nya dh smpi. Enak mbk pempek, terasa ikannya, lembut. Cukonya mantap.',
  },
  {
    id: 'wa-customer-cuko-bottle',
    media: {
      type: 'image',
      src: '/image/testimoni/wa-customer-cuko-bottle-office.jpeg',
    },
    source: 'whatsapp',
    platform: 'WhatsApp · Customer Pribadi',
    author: 'Pelanggan kantor',
    excerpt:
      'Lenyap langsung yuk, Alhamdulillah! [respons owner: MasyaAllah, senang men habis, kesenangan yang masak kalau makanannya dimakan habis...]',
  },
  {
    id: 'wa-customer-packages',
    media: {
      type: 'image',
      src: '/image/testimoni/wa-customer-packages-received.jpeg',
    },
    source: 'whatsapp',
    platform: 'WhatsApp · Customer Pribadi',
    author: 'Pelanggan luar Batam',
    excerpt:
      'Udah nyampe ni Ma. [paket pempek Tekwan, Lenjer, Campur, Telur sampai aman]',
  },
  {
    id: 'wa-customer-fragile',
    media: {
      type: 'image',
      src: '/image/testimoni/wa-customer-fragile-shipping.jpeg',
    },
    source: 'whatsapp',
    platform: 'WhatsApp · Customer Pribadi',
    author: 'Pelanggan luar Batam',
    excerpt:
      'Makasih ya Ma. Aamiin Yaa Rabbal‘Aalamiin. [paket FRAGILE sampai dengan aman lewat ekspedisi]',
  },
];

// Group testimoni by source for /testimoni page sections
export const TESTIMONI_BY_SOURCE: Record<TestimoniSource, Testimoni[]> = {
  press: TESTIMONI.filter((t) => t.source === 'press'),
  instagram: TESTIMONI.filter((t) => t.source === 'instagram'),
  tiktok: TESTIMONI.filter((t) => t.source === 'tiktok'),
  facebook: TESTIMONI.filter((t) => t.source === 'facebook'),
  whatsapp: TESTIMONI.filter((t) => t.source === 'whatsapp'),
};

export const SOURCE_LABELS: Record<TestimoniSource, string> = {
  press: 'Liputan Media',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  whatsapp: 'WhatsApp',
};

// Selected for homepage highlight
export const TESTIMONI_HIGHLIGHTS = TESTIMONI.filter((t) => t.highlight);
