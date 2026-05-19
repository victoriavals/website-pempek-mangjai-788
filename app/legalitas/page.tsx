import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND, KONTAK } from '@/lib/constants';
import { RETAIL_PARTNERS } from '@/data/retail';
import { buildSimpleWaUrl } from '@/lib/whatsapp';
import { CertificateGrid } from './CertificateGrid';
import { FadeUp, StaggerItem, StaggerList } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Legalitas & Sertifikasi',
  description: `${BRAND.namaLengkap} tersertifikasi Halal MUI, BPOM, P-IRT, NIB, dan SNI. Lihat detail nomor sertifikat dan scan dokumen resmi.`,
};

const HIGHLIGHTS = [
  {
    label: 'Halal MUI',
    nomor: 'No. 04030021380616',
    note: 'Aktif & diperbarui',
  },
  {
    label: 'BPOM RI',
    nomor: 'MD 243229017042',
    note: 'Sesuai standar pangan',
  },
  {
    label: 'GMP & SNI',
    nomor: 'SNI 1002991042023',
    note: 'Good Manufacturing Practice',
  },
];

export default function LegalitasPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-brand-bg">
        <div className="container py-16 md:py-24">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10" />
                <span className="eyebrow">Legalitas & Sertifikasi</span>
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight-display text-brand-text md:text-7xl lg:text-[6rem]">
                Standar mutu
                <br />
                <span className="display-italic text-brand-text-muted">yang dapat diandalkan.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-base leading-relaxed text-brand-text-muted">
                Sejak {BRAND.tahunBerdiri}, kami berkomitmen pada kualitas,
                keamanan pangan, dan kepatuhan hukum. Berikut sertifikasi resmi
                yang telah kami penuhi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container section-pad-sm">
        <StaggerList className="grid gap-6 md:grid-cols-3 md:gap-8" staggerDelay={0.1}>
          {HIGHLIGHTS.map((h) => (
            <StaggerItem key={h.label}>
              <div className="border-t border-brand-accent pt-6">
                <p className="eyebrow !text-brand-accent">{h.note}</p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight-display text-brand-text md:text-3xl">
                  {h.label}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-wider text-brand-text-muted">
                  {h.nomor}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </section>

      {/* CERTIFICATE GRID */}
      <section className="container section-pad-sm">
        <FadeUp>
          <div className="mb-12 grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10" />
                <span className="eyebrow">Daftar Sertifikat</span>
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight-display text-brand-text md:text-4xl lg:text-5xl">
                Bukti dari delapan otoritas.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-sm leading-relaxed text-brand-text-muted">
                Klik &ldquo;Lihat Scan&rdquo; untuk membuka dokumen. Beberapa
                sertifikat berisi data pribadi pemilik dan sedang dalam proses
                redaksi — silakan minta langsung via WhatsApp jika diperlukan
                untuk keperluan resmi.
              </p>
            </div>
          </div>
        </FadeUp>

        <CertificateGrid />
      </section>

      {/* DISTRIBUSI RETAIL */}
      <section className="bg-brand-bg-soft">
        <div className="container py-16">
          <FadeUp>
            <p className="text-center font-display italic text-lg text-brand-text-muted md:text-xl">
              Tersedia juga di
            </p>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {RETAIL_PARTNERS.map((r) => (
                <li
                  key={r}
                  className="font-display text-xl font-medium tracking-tight-display text-brand-text-muted transition-colors hover:text-brand-text md:text-2xl"
                >
                  {r}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="container section-pad">
        <FadeUp>
          <div className="rounded-3xl border border-brand-border bg-brand-surface px-8 py-16 text-center md:px-16 md:py-20">
            <div className="mx-auto h-px w-16 bg-brand-accent" />
            <h2 className="mt-8 font-display text-3xl font-bold tracking-tight-display text-brand-text md:text-5xl">
              Butuh dokumen lengkap?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-brand-text-muted">
              Untuk keperluan tender, kerjasama, atau audit resmi, kami dapat
              mengirimkan salinan sertifikat asli (dengan data pribadi diredaksi
              sesuai etika privasi).
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={buildSimpleWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-wa px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-wa-hover"
              >
                Minta via WhatsApp
              </a>
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center rounded-full border border-brand-border px-7 py-3.5 text-sm font-semibold text-brand-text transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                Lihat Kanal Lain
              </Link>
            </div>
            <p className="mt-4 text-xs text-brand-text-muted">
              {KONTAK.waUtamaDisplay}
            </p>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
