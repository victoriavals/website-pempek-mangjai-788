import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingWAButton } from '@/components/FloatingWAButton';
import { BRAND, KONTAK, SITE_URL } from '@/lib/constants';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const heading = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.nama} — Pempek Asli Palembang dari Batam`,
    template: `%s | ${BRAND.nama}`,
  },
  description: `Pempek ikan tenggiri produksi UMKM Batam sejak ${BRAND.tahunBerdiri}. Halal MUI, BPOM, NIB. Pengiriman frozen seluruh Indonesia. Pesan via WhatsApp: ${KONTAK.waUtamaDisplay}.`,
  keywords: [
    'pempek',
    'pempek batam',
    'pempek halal',
    'pempek palembang',
    'mang jai 788',
    'tenggiri',
    'kapal selam',
    'lenjer',
    'pempek online',
    'frozen pempek',
  ],
  authors: [{ name: BRAND.namaLengkap }],
  creator: BRAND.namaLengkap,
  publisher: BRAND.namaLengkap,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${BRAND.nama} — Pempek Asli Palembang`,
    description: `Pempek ikan tenggiri halal sejak ${BRAND.tahunBerdiri}. Pengiriman frozen seluruh Indonesia.`,
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: BRAND.nama,
    images: [
      {
        url: '/image/display-semua-produk-mang-jai.jpeg',
        width: 1200,
        height: 800,
        alt: `Koleksi produk ${BRAND.namaLengkap}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.nama} — Pempek Asli Palembang`,
    description: `Pempek ikan tenggiri halal sejak ${BRAND.tahunBerdiri}. Halal MUI, BPOM, SNI.`,
    images: ['/image/display-semua-produk-mang-jai.jpeg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#2D4A2F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${heading.variable} ${body.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Lompat ke konten utama
        </a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWAButton />
        </CartProvider>
      </body>
    </html>
  );
}
