import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ALAMAT, BRAND, JAM_BUKA, KONTAK, TERAS } from '@/lib/constants';
import { buildTerasReservationWaUrl } from '@/lib/whatsapp';
import { FadeUp, ParallaxFade, StaggerItem, StaggerList } from '@/components/motion';

export const metadata: Metadata = {
  title: TERAS.nama,
  description: `Outlet dine-in resmi ${BRAND.nama} di ${ALAMAT.baris1}, Batam. Buka ${JAM_BUKA.hari} jam ${JAM_BUKA.jam}. Nikmati pempek panas + menu pendamping seperti Pindang Daging.`,
};

const MAPS_QUERY = encodeURIComponent(
  'Pempek 788 Mang Jai, Plamo Garden Blok P No. 22, Batam'
);
const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${MAPS_QUERY}&output=embed`;
const MAPS_OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export default function TerasPage() {
  return (
    <>
      {/* HERO — full bleed editorial */}
      <section className="relative">
        <ParallaxFade className="relative h-[70vh] min-h-[500px] w-full overflow-hidden md:h-[85vh]">
          <Image
            src="/image/teras-mang-jai-grand-opening-storefront.jpeg"
            alt={`Fasad outlet ${TERAS.nama} di Plamo Garden Batam`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 photo-warm" />

          <div className="absolute inset-x-0 bottom-0">
            <div className="container pb-12 md:pb-20">
              <FadeUp>
                <div className="flex items-center gap-3">
                  <span className="hairline-short !mx-0 !w-10 !bg-brand-accent" />
                  <span className="eyebrow !text-brand-accent">Outlet Dine-in</span>
                </div>
              </FadeUp>
              <FadeUp delay={0.15}>
                <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight-display text-white drop-shadow-lg md:text-7xl lg:text-[6.5rem]">
                  Teras Mang Jai
                  <br />
                  <span className="display-italic text-brand-accent">788.</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
                  Grand Opening {TERAS.grandOpening}. Pempek hangat langsung
                  dari dapur, ditambah hidangan khas Palembang lainnya.
                </p>
              </FadeUp>
            </div>
          </div>
        </ParallaxFade>
      </section>

      {/* INFO BLOCK */}
      <section className="border-b border-brand-border bg-brand-bg-soft">
        <div className="container py-14 md:py-20">
          <StaggerList className="grid gap-6 md:grid-cols-3 md:gap-8" staggerDelay={0.1}>
            <StaggerItem>
              <div className="border-l-2 border-brand-accent pl-5">
                <p className="eyebrow">Alamat</p>
                <p className="mt-3 font-display text-lg leading-tight text-brand-text md:text-xl">
                  {ALAMAT.baris1}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-brand-text-muted">
                  {ALAMAT.baris2}
                  <br />
                  {ALAMAT.baris3}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-brand-accent pl-5">
                <p className="eyebrow">Jam Buka</p>
                <p className="mt-3 font-display text-3xl font-bold tracking-tight-display text-brand-text md:text-4xl">
                  {JAM_BUKA.jam}
                </p>
                <p className="mt-1 text-sm text-brand-text-muted">
                  {JAM_BUKA.hari}
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="border-l-2 border-brand-accent pl-5">
                <p className="eyebrow">Reservasi</p>
                <p className="mt-3 font-display text-lg font-semibold text-brand-text">
                  {KONTAK.waUtamaDisplay}
                </p>
                <a
                  href={buildTerasReservationWaUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:gap-2"
                >
                  Chat untuk reservasi
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </StaggerItem>
          </StaggerList>
        </div>
      </section>

      {/* GALERI OUTLET — 2 foto besar */}
      <section className="container section-pad">
        <FadeUp>
          <div className="mb-12 grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10" />
                <span className="eyebrow">Galeri Outlet</span>
              </div>
              <h2 className="mt-6 font-display text-4xl font-bold tracking-tight-display text-brand-text md:text-5xl lg:text-6xl">
                Suasana kami,
                <br />
                <span className="text-brand-text-muted">apa adanya.</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-base text-brand-text-muted">
                Tempat di mana resep, produksi, dan ruang makan bertemu — semua
                di alamat yang sama di Plamo Garden Blok P.
              </p>
            </div>
          </div>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-12">
          <FadeUp className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/image/teras-mang-jai-grand-opening-storefront.jpeg"
                alt="Fasad outlet Teras Mang Jai 788 saat grand opening"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </FadeUp>
          <FadeUp className="md:col-span-5" delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/image/teras-mang-jai-pendiri-portrait.jpeg"
                alt={`${BRAND.founder.suami} dan ${BRAND.founder.istri} di ${TERAS.nama}`}
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* MENU TERAS — editorial */}
      <section className="bg-brand-text text-brand-bg">
        <div className="container section-pad">
          <FadeUp>
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="hairline-short !w-10 !bg-brand-accent" />
                <span className="eyebrow !text-brand-accent">Menu Spesial</span>
                <span className="hairline-short !w-10 !bg-brand-accent" />
              </div>
              <h2 className="mt-6 font-display text-4xl font-bold tracking-tight-display md:text-5xl lg:text-6xl">
                Lebih dari sekedar
                <br />
                <span className="display-italic text-brand-accent">pempek.</span>
              </h2>
              <p className="mt-6 text-base text-brand-bg/70">
                Hanya di outlet, Anda bisa menikmati hidangan khas Palembang
                yang tidak ada di kemasan retail.
              </p>
            </div>
          </FadeUp>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-10">
            <FadeUp>
              <article>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/image/menu-pindang-daging-container.jpeg"
                    alt="Pindang Daging dalam container takeaway"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight-display md:text-3xl">
                  Pindang Daging
                </h3>
                <p className="mt-3 text-base leading-relaxed text-brand-bg/70">
                  Sup khas Palembang dengan daging sapi empuk, kuah asam-pedas
                  yang segar. Tersedia juga dalam kemasan takeaway untuk dibawa
                  pulang.
                </p>
              </article>
            </FadeUp>

            <FadeUp delay={0.15}>
              <article>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/image/menu-pindang-pelengkap-sayur.jpeg"
                    alt="Pelengkap pindang: kemangi, kol, sambal"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight-display md:text-3xl">
                  Pelengkap Sayur Pindang
                </h3>
                <p className="mt-3 text-base leading-relaxed text-brand-bg/70">
                  Kemangi, kol segar, dan sambal pelengkap — kombinasi sempurna
                  yang memperkuat rasa pindang.
                </p>
              </article>
            </FadeUp>
          </div>

          <p className="mt-10 text-center text-xs uppercase tracking-wider text-brand-bg/50">
            Menu lengkap dapat berubah · Hubungi WA untuk ketersediaan harian
          </p>
        </div>
      </section>

      {/* PETA */}
      <section className="container section-pad">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="hairline-short !mx-0 !w-10" />
              <span className="eyebrow">Lokasi</span>
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight-display text-brand-text md:text-4xl lg:text-5xl">
              Mudah diakses
              <br />
              <span className="text-brand-text-muted">dari Batam Kota.</span>
            </h2>
          </FadeUp>
          <a
            href={MAPS_OPEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand-primary hover:underline"
          >
            Buka di Google Maps →
          </a>
        </div>

        <FadeUp>
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

      {/* CTA */}
      <section className="container pb-24">
        <FadeUp>
          <div className="rounded-3xl bg-brand-primary px-8 py-20 text-center text-white md:px-16 md:py-28">
            <h2 className="font-display text-4xl font-bold tracking-tight-display md:text-6xl">
              Mau mampir?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base text-white/80">
              Konfirmasi ketersediaan menu sebelum datang untuk pengalaman
              terbaik.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={buildTerasReservationWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-bg px-8 py-4 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-accent"
              >
                Hubungi Sebelum Datang
              </a>
              <Link
                href="/produk"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-primary"
              >
                Atau pesan online →
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
