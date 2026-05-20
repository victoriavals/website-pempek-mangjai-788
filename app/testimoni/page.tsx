import type { Metadata } from 'next';
import Link from 'next/link';
import {
  SOURCE_LABELS,
  TESTIMONI,
  TESTIMONI_BY_SOURCE,
  type TestimoniSource,
} from '@/data/testimoni';
import { BRAND, KONTAK } from '@/lib/constants';
import { buildSimpleWaUrl } from '@/lib/whatsapp';
import { TestimoniGrid } from '@/components/TestimoniGrid';
import { FadeUp } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Testimoni Pelanggan',
  description: `Apa kata pelanggan dan media tentang ${BRAND.namaLengkap}. Liputan majalah F&B, story Instagram, post Facebook, dan testimoni WhatsApp dari pelanggan kami.`,
};

const SOURCE_DESCRIPTIONS: Record<TestimoniSource, string> = {
  press:
    'Liputan dari publikasi F&B dan akun resmi UMKM pemerintah Kota Batam.',
  instagram:
    'Story dan post Instagram dari pelanggan dan rekan brand yang menandai kami.',
  tiktok:
    'Video dari channel TikTok resmi @mangjai788channel — cerita dapur, produk, dan momen pelanggan.',
  facebook:
    'Post dan story Facebook dari pelanggan di komunitas dan halaman publik.',
  whatsapp:
    'Testimoni langsung dari pelanggan via chat WhatsApp — kebanyakan pengiriman luar Batam.',
};

const ORDER: TestimoniSource[] = [
  'press',
  'tiktok',
  'instagram',
  'facebook',
  'whatsapp',
];

export default function TestimoniPage() {
  const voucherWaUrl = buildSimpleWaUrl(
    [
      'Halo Pempek 788 Mang Jai 👋',
      'Saya mau berbagi testimoni & klaim voucher diskon 10%.',
      'Saya sudah tag @mangjaipempek788 di Instagram/Facebook.',
      'Ini link/screenshot postingannya: [tempel di sini]',
      '',
      'Terima kasih!',
    ].join('\n')
  );

  return (
    <>
      {/* HERO */}
      <section className="bg-brand-bg">
        <div className="container py-16 md:py-24">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10" />
                <span className="eyebrow">Suara Pelanggan & Media</span>
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight-display text-brand-text md:text-7xl lg:text-[6rem]">
                Cerita
                <br />
                <span className="display-italic text-brand-text-muted">tentang kami.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-base leading-relaxed text-brand-text-muted">
                {TESTIMONI.length} cerita pilihan — dari liputan publikasi F&amp;B,
                story Instagram pelanggan, post Facebook, hingga chat WhatsApp
                yang membuat kami terus berkembang sejak {BRAND.tahunBerdiri}.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {ORDER.map((src) => (
                  <a
                    key={src}
                    href={`#${src}`}
                    className="rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-xs font-medium uppercase tracking-wider text-brand-text transition-colors hover:border-brand-primary hover:text-brand-primary"
                  >
                    {SOURCE_LABELS[src]} ({TESTIMONI_BY_SOURCE[src].length})
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS PER SOURCE */}
      {ORDER.map((src, idx) => {
        const items = TESTIMONI_BY_SOURCE[src];
        if (items.length === 0) return null;

        return (
          <section
            key={src}
            id={src}
            className={idx % 2 === 1 ? 'bg-brand-bg-soft' : ''}
          >
            <div className="container section-pad-sm">
              <FadeUp>
                <div className="mb-12 grid items-end gap-6 md:grid-cols-12">
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-3">
                      <span className="hairline-short !mx-0 !w-10" />
                      <span className="eyebrow">{SOURCE_LABELS[src]}</span>
                    </div>
                    <h2 className="mt-6 font-display text-3xl font-bold tracking-tight-display text-brand-text md:text-4xl lg:text-5xl">
                      {items.length} cerita dari{' '}
                      <span className="display-italic text-brand-text-muted">
                        {SOURCE_LABELS[src]}
                      </span>
                      .
                    </h2>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-sm leading-relaxed text-brand-text-muted md:text-base">
                      {SOURCE_DESCRIPTIONS[src]}
                    </p>
                  </div>
                </div>
              </FadeUp>

              <TestimoniGrid items={items} columns={items.length >= 4 ? 4 : 3} />
            </div>
          </section>
        );
      })}

      {/* CTA — submit your own testimoni */}
      <section className="container section-pad">
        <FadeUp>
          <div className="rounded-3xl bg-brand-primary px-8 py-16 text-center text-white md:px-16 md:py-24">
            <p className="eyebrow !text-brand-accent">Punya cerita sendiri?</p>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight-display md:text-5xl">
              Bagikan momen Anda
              <br />
              <span className="display-italic text-brand-accent">bersama kami.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-white/80">
              Tag <strong>@mangjaipempek788</strong> di Instagram atau Facebook
              saat menikmati pempek kami — cerita Anda kami repost, dan Anda
              dapat voucher diskon 10%. Belum sempat posting? Kirim langsung via
              WhatsApp.
            </p>

            <div className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-2xl border border-brand-accent/40 bg-brand-accent/10 p-5 text-left">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-accent text-2xl"
                aria-hidden="true"
              >
                🎁
              </span>
              <p className="text-sm leading-relaxed text-white/90">
                <strong className="text-brand-accent">Voucher diskon 10%</strong>{' '}
                untuk pembelian berikutnya — tag kami, lalu tunjukkan postingan
                Anda saat pesan via WhatsApp untuk klaim.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={voucherWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-bg px-8 py-4 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-accent"
              >
                Kirim Testimoni via WhatsApp
              </a>
              <Link
                href="/produk"
                className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-primary"
              >
                Lihat Produk
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/60">{KONTAK.waUtamaDisplay}</p>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
