import {
  ALAMAT,
  BRAND,
  JAM_BUKA,
  KONTAK,
  SITE_URL,
  SOSIAL,
} from '@/lib/constants';

export function HomepageJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: BRAND.nama,
    alternateName: BRAND.namaLengkap,
    description:
      'Pempek ikan tenggiri tradisional Sumatera Selatan, diproduksi di Batam sejak 2013. Halal MUI, BPOM, SNI. Pengiriman frozen seluruh Indonesia.',
    image: `${SITE_URL}/image/display-semua-produk-mang-jai.jpeg`,
    logo: `${SITE_URL}/image/logo-mang-jai-788.png`,
    url: SITE_URL,
    telephone: KONTAK.waUtamaDisplay,
    email: KONTAK.email,
    foundingDate: String(BRAND.tahunBerdiri),
    founder: [
      { '@type': 'Person', name: 'Zaitun Rizal' },
      { '@type': 'Person', name: 'Nurli Evi Rosita' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: ALAMAT.baris1,
      addressLocality: 'Batam Kota',
      addressRegion: 'Kepulauan Riau',
      postalCode: '29462',
      addressCountry: 'ID',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:30',
        closes: '16:30',
      },
    ],
    priceRange: 'Rp 25.000 - Rp 50.000',
    servesCuisine: ['Palembang', 'Indonesian'],
    areaServed: [
      { '@type': 'City', name: 'Batam' },
      { '@type': 'Country', name: 'Indonesia' },
    ],
    sameAs: [
      SOSIAL.instagram.url,
      SOSIAL.facebook.url,
      SOSIAL.youtube.url,
      SOSIAL.tiktok.url,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
