import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { CERTIFICATIONS } from '@/data/certifications';
import { RETAIL_PARTNERS } from '@/data/retail';
import { BRAND, KONTAK } from '@/lib/constants';
import { ProductCard } from '@/components/ProductCard';
import { HomepageJsonLd } from '@/components/JsonLd';
import { buildSimpleWaUrl } from '@/lib/whatsapp';
import { FadeUp, RevealWords, ParallaxFade } from '@/components/motion';

const BEST_SELLERS = PRODUCTS.filter((p) =>
  ['pempek-kapal-selam', 'pempek-lenjer', 'pempek-adaan', 'pempek-kulit'].includes(p.id)
);

const VALUES = [
  {
    no: '01',
    judul: 'Ikan Tenggiri Pilihan',
    desc: 'Dari perairan laut Kepulauan Riau, bukan ikan beku impor.',
  },
  {
    no: '02',
    judul: 'Diproduksi Sendiri',
    desc: '1.000 pcs per hari di dapur rumah Plamo Garden, Batam.',
  },
  {
    no: '03',
    judul: 'Tersertifikasi Halal',
    desc: 'Halal MUI, BPOM, SNI, P-IRT — standar mutu nasional.',
  },
  {
    no: '04',
    judul: 'Kirim Ke Seluruh Indonesia',
    desc: 'Frozen shipping via JNE Yes & J&T Frozen.',
  },
];

export default function HomePage() {
  return (
    <>
      <HomepageJsonLd />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-brand-bg">
        <div className="container relative grid items-center gap-12 pb-24 pt-12 md:grid-cols-12 md:gap-8 md:pb-32 md:pt-20">
          <div className="md:col-span-7">
            <FadeUp>
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10" />
                <span className="eyebrow">Sejak {BRAND.tahunBerdiri} · Asli Palembang</span>
              </div>
            </FadeUp>

            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight-display text-brand-text md:text-7xl lg:text-[5.5rem]">
              <RevealWords text="Pempek tenggiri" />
              <br />
              <span className="text-brand-text-muted">
                <RevealWords text="dari dapur Batam." delay={0.3} />
              </span>
            </h1>

            <FadeUp delay={0.6}>
              <p className="display-italic mt-8 text-2xl text-brand-secondary md:text-3xl">
                &ldquo;{BRAND.tagline}&rdquo;
              </p>
              <p className="mt-2 text-sm text-brand-text-muted">
                Kuahnya kental, terasa ikannya — dalam dialek asli Sumsel.
              </p>
            </FadeUp>

            <FadeUp delay={0.8}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/produk"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-text px-8 py-4 text-sm font-semibold text-brand-bg transition-all hover:bg-brand-primary"
                >
                  Jelajahi Produk
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <a
                  href={buildSimpleWaUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-text bg-transparent px-8 py-4 text-sm font-semibold text-brand-text transition-all hover:bg-brand-text hover:text-brand-bg"
                >
                  Chat WhatsApp
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={1}>
              <p className="mt-8 max-w-md text-xs uppercase tracking-wider text-brand-text-muted">
                Pengiriman lokal Batam · Ekspedisi frozen seluruh Indonesia
              </p>
            </FadeUp>
          </div>

          <div className="md:col-span-5">
            <ParallaxFade className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/image/display-semua-produk-mang-jai.jpeg"
                alt="Koleksi lengkap produk Pempek 788 Mang Jai"
                fill
                priority
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 photo-warm" />

              {/* Stat overlay */}
              <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-brand-bg/95 p-5 backdrop-blur md:bottom-8 md:left-8 md:right-8">
                <p className="eyebrow !text-brand-secondary">Kapasitas Produksi</p>
                <p className="mt-1 font-display text-3xl font-bold tracking-tight-display text-brand-text md:text-4xl">
                  ±1.000 pcs/hari
                </p>
                <p className="mt-1 text-xs text-brand-text-muted">
                  Setara 100 bungkus, 4 tim produksi.
                </p>
              </div>
            </ParallaxFade>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="border-y border-brand-border bg-brand-surface">
        <div className="container section-pad-sm">
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="hairline-short !mx-0 !w-10" />
              <span className="eyebrow">Kenapa Mang Jai 788</span>
            </div>
          </FadeUp>

          <div className="mt-12 grid gap-10 md:grid-cols-4 md:gap-8">
            {VALUES.map((v, i) => (
              <FadeUp key={v.no} delay={i * 0.1}>
                <div>
                  <p className="font-display text-5xl font-bold tracking-tight-display text-brand-accent md:text-6xl">
                    {v.no}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-brand-text md:text-2xl">
                    {v.judul}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-text-muted">
                    {v.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEST SELLER ===== */}
      <section className="container section-pad">
        <div className="mb-14 flex items-end justify-between gap-4">
          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="hairline-short !mx-0 !w-10" />
              <span className="eyebrow">Best Seller</span>
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight-display text-brand-text md:text-5xl lg:text-6xl">
              Yang paling dicari
              <br />
              <span className="text-brand-text-muted">pelanggan kami.</span>
            </h2>
          </FadeUp>
          <Link
            href="/produk"
            className="group hidden flex-shrink-0 text-sm font-semibold text-brand-text hover:text-brand-primary sm:inline-flex sm:items-center sm:gap-1"
          >
            Lihat semua
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {BEST_SELLERS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/produk"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-primary"
          >
            Lihat semua produk →
          </Link>
        </div>
      </section>

      {/* ===== KISAH SINGKAT ===== */}
      <section className="relative overflow-hidden bg-brand-text text-brand-bg">
        <div className="container grid gap-12 py-24 md:grid-cols-12 md:gap-16 md:py-32">
          <div className="md:col-span-6">
            <FadeUp>
              <ParallaxFade className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/image/teras-mang-jai-pendiri-portrait.jpeg"
                  alt={`${BRAND.founder.suami} dan ${BRAND.founder.istri}, pendiri Pempek 788 Mang Jai`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </ParallaxFade>
            </FadeUp>
          </div>

          <div className="flex flex-col justify-center md:col-span-6">
            <FadeUp>
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10 !bg-brand-accent" />
                <span className="eyebrow !text-brand-accent">Kisah Kami</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h2 className="mt-6 font-display text-4xl font-bold tracking-tight-display md:text-5xl lg:text-6xl">
                Dari satu dapur rumah,
                <br />
                <span className="text-brand-accent">untuk seluruh Nusantara.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="mt-8 max-w-lg text-base leading-relaxed text-brand-bg/80">
                Berdiri tahun {BRAND.tahunBerdiri} oleh {BRAND.founder.suami}{' '}
                bersama istrinya {BRAND.founder.istri}, Mang Jai 788 lahir dari
                kerinduan akan pempek autentik Sumatera Selatan — yang kini hadir
                di lima jaringan supermarket Batam dan dapat dikirim frozen ke
                seluruh Indonesia.
              </p>
              <Link
                href="/tentang"
                className="group mt-8 inline-flex items-center gap-2 border-b border-brand-accent pb-1 text-sm font-semibold text-brand-accent transition-all hover:gap-3"
              >
                Baca kisah lengkapnya
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ===== SERTIFIKASI ===== */}
      <section className="container section-pad">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="hairline-short !w-10" />
              <span className="eyebrow">Terpercaya & Tersertifikasi</span>
              <span className="hairline-short !w-10" />
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight-display text-brand-text md:text-5xl">
              Standar mutu yang dapat
              <br />
              <span className="text-brand-text-muted">Anda andalkan.</span>
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {CERTIFICATIONS.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-brand-text"
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-brand-accent"
                  aria-hidden="true"
                />
                {c.badgeLabel}
              </span>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="mt-8 text-center">
            <Link
              href="/legalitas"
              className="text-sm font-semibold text-brand-primary hover:underline"
            >
              Lihat scan sertifikat →
            </Link>
          </p>
        </FadeUp>
      </section>

      {/* ===== DISTRIBUSI ===== */}
      <section className="border-y border-brand-border bg-brand-bg-soft">
        <div className="container py-16">
          <FadeUp>
            <p className="text-center font-display italic text-lg text-brand-text-muted md:text-xl">
              Juga tersedia di
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
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

      {/* ===== FINAL CTA ===== */}
      <section className="container section-pad">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl bg-brand-primary px-8 py-20 text-center text-white md:px-16 md:py-28">
            <span className="absolute left-1/2 top-8 hairline-short !-translate-x-1/2 !bg-brand-accent" />

            <p className="eyebrow !text-brand-accent">Siap pesan?</p>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight-display md:text-6xl lg:text-7xl">
              Pesan dalam
              <br />
              <span className="display-italic text-brand-accent">satu chat.</span>
            </h2>

            <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/80">
              Tim kami siap menjawab pertanyaan Anda tentang varian, ongkir, dan
              paket hampers — langsung di WhatsApp.
            </p>

            <a
              href={buildSimpleWaUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-brand-bg px-10 py-5 text-base font-semibold text-brand-text shadow-xl transition-all hover:bg-brand-accent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-brand-wa"
                aria-hidden="true"
              >
                <path d="M.057 24l1.687-6.163A11.867 11.867 0 0 1 .133 11.892C.137 5.335 5.473 0 12.031 0a11.86 11.86 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.34 11.892-11.892 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
              </svg>
              Pesan via WhatsApp
            </a>

            <p className="mt-4 text-xs text-white/60">{KONTAK.waUtamaDisplay}</p>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
