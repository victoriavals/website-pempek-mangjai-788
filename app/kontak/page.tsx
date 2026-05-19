import type { Metadata } from 'next';
import { ALAMAT, BRAND, JAM_BUKA, KONTAK, SOSIAL, TERAS } from '@/lib/constants';
import { buildSimpleWaUrl } from '@/lib/whatsapp';
import { FadeUp, StaggerItem, StaggerList } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Kontak',
  description: `Hubungi ${BRAND.nama} via WhatsApp ${KONTAK.waUtamaDisplay}, email ${KONTAK.email}, atau kunjungi outlet di ${ALAMAT.baris1}, ${ALAMAT.baris3}.`,
};

const SOSIAL_LIST = [
  { ...SOSIAL.instagram, label: 'Instagram' },
  { ...SOSIAL.facebook, label: 'Facebook' },
  { ...SOSIAL.youtube, label: 'YouTube' },
  { ...SOSIAL.tiktok, label: 'TikTok' },
];

const MAPS_QUERY = encodeURIComponent(
  'Pempek 788 Mang Jai, Plamo Garden Blok P No. 22, Batam'
);
const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${MAPS_QUERY}&output=embed`;
const MAPS_OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export default function KontakPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-brand-bg">
        <div className="container py-16 md:py-24">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10" />
                <span className="eyebrow">Kontak</span>
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight-display text-brand-text md:text-7xl lg:text-[6rem]">
                Mari mengobrol.
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-base leading-relaxed text-brand-text-muted">
                Kami biasanya respons dalam 1 jam pada jam kerja. Pilih kanal
                yang paling nyaman untuk Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHANNEL CARDS — editorial */}
      <section className="container section-pad-sm">
        <StaggerList className="grid gap-6 md:grid-cols-3 md:gap-8" staggerDelay={0.1}>
          {/* WhatsApp */}
          <StaggerItem>
            <article className="group flex h-full flex-col rounded-2xl border border-brand-border bg-brand-surface p-8 transition-shadow hover:shadow-lg">
              <p className="eyebrow !text-brand-wa">WhatsApp · Tercepat</p>
              <h2 className="mt-6 font-display text-2xl font-bold tracking-tight-display text-brand-text md:text-3xl">
                Chat langsung dengan kami.
              </h2>
              <p className="mt-3 break-all font-display text-base font-semibold text-brand-text">
                {KONTAK.waUtamaDisplay}
              </p>
              <a
                href={buildSimpleWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-wa px-6 py-3 pt-3 text-sm font-semibold text-white transition-colors hover:bg-brand-wa-hover"
              >
                Chat Sekarang
              </a>
            </article>
          </StaggerItem>

          {/* Outlet */}
          <StaggerItem>
            <article className="group flex h-full flex-col rounded-2xl border border-brand-border bg-brand-surface p-8 transition-shadow hover:shadow-lg">
              <p className="eyebrow">Outlet</p>
              <h2 className="mt-6 font-display text-2xl font-bold tracking-tight-display text-brand-text md:text-3xl">
                {TERAS.nama}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-text">
                {ALAMAT.baris1}
                <br />
                {ALAMAT.baris2}
                <br />
                {ALAMAT.baris3}
              </p>
              <a
                href={MAPS_OPEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center rounded-full border border-brand-text px-6 py-3 pt-3 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-text hover:text-brand-bg"
              >
                Buka di Maps
              </a>
            </article>
          </StaggerItem>

          {/* Email */}
          <StaggerItem>
            <article className="group flex h-full flex-col rounded-2xl border border-brand-border bg-brand-surface p-8 transition-shadow hover:shadow-lg">
              <p className="eyebrow">Email · Inquiry Resmi</p>
              <h2 className="mt-6 font-display text-2xl font-bold tracking-tight-display text-brand-text md:text-3xl">
                Untuk keperluan formal.
              </h2>
              <p className="mt-3 break-all font-display text-base font-semibold text-brand-text">
                {KONTAK.email}
              </p>
              <a
                href={`mailto:${KONTAK.email}`}
                className="mt-auto inline-flex items-center justify-center rounded-full border border-brand-border px-6 py-3 pt-3 text-sm font-semibold text-brand-text transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                Kirim Email
              </a>
            </article>
          </StaggerItem>
        </StaggerList>
      </section>

      {/* INFO GRID */}
      <section className="border-y border-brand-border bg-brand-bg-soft">
        <div className="container py-16 md:py-20">
          <StaggerList className="grid gap-12 md:grid-cols-3 md:gap-16" staggerDelay={0.1}>
            <StaggerItem>
              <p className="eyebrow">Jam Operasional</p>
              <p className="mt-4 font-display text-3xl font-bold tracking-tight-display text-brand-text md:text-4xl">
                {JAM_BUKA.jam}
              </p>
              <p className="text-sm text-brand-text-muted">{JAM_BUKA.hari}</p>
              <p className="mt-3 text-xs uppercase tracking-wider text-brand-text-muted">
                Produksi + outlet dine-in
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="eyebrow">Pengiriman</p>
              <div className="mt-4 space-y-3 text-sm">
                <p>
                  <strong className="font-display text-lg text-brand-text">Batam</strong>
                  <br />
                  <span className="text-brand-text-muted">
                    Delivery dalam kota / pickup di outlet
                  </span>
                </p>
                <p>
                  <strong className="font-display text-lg text-brand-text">Luar Batam</strong>
                  <br />
                  <span className="text-brand-text-muted">
                    Ekspedisi frozen seluruh Indonesia (JNE Yes, J&amp;T Frozen)
                  </span>
                </p>
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider text-brand-text-muted">
                Metode dikonfirmasi per pesanan
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="eyebrow">Kontak Cadangan</p>
              <a
                href={`https://wa.me/${KONTAK.waCadangan}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-display text-xl font-bold tracking-tight-display text-brand-text hover:text-brand-primary md:text-2xl"
              >
                {KONTAK.waCadanganDisplay}
              </a>
              <p className="mt-2 text-xs text-brand-text-muted">
                Owner — kalau nomor utama sibuk
              </p>
            </StaggerItem>
          </StaggerList>
        </div>
      </section>

      {/* SOSIAL */}
      <section className="container section-pad-sm">
        <FadeUp>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="hairline-short !w-10" />
              <span className="eyebrow">Ikuti Kami</span>
              <span className="hairline-short !w-10" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight-display text-brand-text md:text-4xl">
              Cerita harian di sosial media.
            </h2>
          </div>
        </FadeUp>

        <StaggerList className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6" staggerDelay={0.08}>
          {SOSIAL_LIST.map((s) => (
            <StaggerItem key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-start gap-2 rounded-2xl border border-brand-border bg-brand-surface p-6 transition-all hover:border-brand-primary hover:shadow-md"
              >
                <p className="font-display text-lg font-semibold text-brand-text">
                  {s.label}
                </p>
                <p className="break-all text-xs text-brand-text-muted">
                  {s.handle}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-primary transition-all group-hover:gap-2">
                  Kunjungi
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </a>
            </StaggerItem>
          ))}
        </StaggerList>
      </section>

      {/* PETA */}
      <section className="container pb-24">
        <FadeUp>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10" />
                <span className="eyebrow">Lokasi</span>
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold tracking-tight-display text-brand-text md:text-4xl lg:text-5xl">
                Plamo Garden Blok P.
              </h2>
            </div>
            <a
              href={MAPS_OPEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand-primary hover:underline"
            >
              Buka di Google Maps →
            </a>
          </div>

          <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-brand-border md:aspect-[21/9]">
            <iframe
              title={`Peta lokasi ${TERAS.nama}`}
              src={MAPS_EMBED_SRC}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </FadeUp>
      </section>
    </>
  );
}
