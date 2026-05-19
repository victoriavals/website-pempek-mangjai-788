import type { Metadata } from 'next';
import Link from 'next/link';
import { buildSimpleWaUrl } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: '404 — Halaman Tidak Ditemukan',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-[10rem] font-bold leading-none tracking-tight-display text-brand-accent md:text-[16rem]">
          404
        </p>
        <span className="mx-auto block h-px w-16 bg-brand-accent" />
        <h1 className="mt-8 font-display text-3xl font-bold tracking-tight-display text-brand-text md:text-5xl">
          Halaman tidak ditemukan.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-brand-text-muted">
          Sepertinya halaman yang Anda cari sudah dipindahkan atau tidak pernah
          ada. Yuk balik ke beranda atau cek katalog produk kami.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-text px-7 py-3.5 text-sm font-semibold text-brand-bg transition-colors hover:bg-brand-primary"
          >
            ← Beranda
          </Link>
          <Link
            href="/produk"
            className="inline-flex items-center justify-center rounded-full border border-brand-text px-7 py-3.5 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-text hover:text-brand-bg"
          >
            Lihat Produk
          </Link>
          <a
            href={buildSimpleWaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-wa px-7 py-3.5 text-sm font-semibold text-brand-wa transition-colors hover:bg-brand-wa hover:text-white"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
