import Link from 'next/link';
import { buildSimpleWaUrl } from '@/lib/whatsapp';
import { KONTAK } from '@/lib/constants';

interface PlaceholderPageProps {
  judul: string;
  deskripsi: string;
  ikon?: string;
}

export function PlaceholderPage({
  judul,
  deskripsi,
  ikon = '🔧',
}: PlaceholderPageProps) {
  return (
    <section className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-5xl" aria-hidden="true">
          {ikon}
        </div>
        <h1 className="mt-6 font-heading text-3xl font-extrabold text-brand-text md:text-4xl">
          {judul}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-brand-text-muted">
          {deskripsi}
        </p>
        <p className="mt-2 text-sm text-brand-text-muted">
          Sementara itu, silakan jelajahi produk atau hubungi kami langsung via
          WhatsApp.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/produk"
            className="inline-flex items-center justify-center rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
          >
            Lihat Produk →
          </Link>
          <a
            href={buildSimpleWaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-brand-wa bg-brand-surface px-6 py-3 text-sm font-semibold text-brand-wa transition-colors hover:bg-brand-wa hover:text-white"
          >
            Chat WhatsApp ({KONTAK.waUtamaDisplay})
          </a>
        </div>
      </div>
    </section>
  );
}
