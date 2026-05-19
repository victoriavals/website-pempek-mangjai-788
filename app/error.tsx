'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { buildSimpleWaUrl } from '@/lib/whatsapp';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <section className="container py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto block h-px w-16 bg-brand-accent" />
        <p className="eyebrow mt-8">Terjadi Kesalahan</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight-display text-brand-text md:text-5xl">
          Maaf, ada yang tidak beres.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-brand-text-muted">
          Halaman ini gagal dimuat. Anda bisa mencoba lagi, atau hubungi kami
          langsung via WhatsApp.
        </p>

        {error.digest && (
          <p className="mt-3 font-mono text-xs text-brand-text-soft">
            Ref: {error.digest}
          </p>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-text px-7 py-3.5 text-sm font-semibold text-brand-bg transition-colors hover:bg-brand-primary"
          >
            Coba Lagi
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-brand-text px-7 py-3.5 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-text hover:text-brand-bg"
          >
            Kembali ke Beranda
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
