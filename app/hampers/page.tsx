import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND, KONTAK } from '@/lib/constants';
import { buildHampersConsultationWaUrl } from '@/lib/whatsapp';
import { FadeUp, ParallaxFade, StaggerItem, StaggerList } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Hampers & Catering',
  description: `Pesan hampers pempek custom untuk ulang tahun, acara kantor, dan momen spesial. ${BRAND.namaLengkap} melayani paket hadiah dengan kartu ucapan, parcel korporat, dan catering pempek. Halal MUI.`,
};

const GALERI = [
  {
    src: '/image/hampers-pempek-campuran-tray.jpeg',
    alt: 'Hampers tray berisi campuran berbagai varian pempek',
    caption: 'Mix Variant Tray',
    span: 'md:col-span-7',
    aspect: 'aspect-[4/3]',
  },
  {
    src: '/image/hampers-pempek-dengan-cuko.jpeg',
    alt: 'Hampers pempek dengan botol cuko khas Mang Jai',
    caption: 'Set dengan Cuko',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/3]',
  },
  {
    src: '/image/hampers-platter-besar-meja-biru.jpeg',
    alt: 'Platter pempek besar untuk acara grup',
    caption: 'Platter Besar untuk Event',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/3]',
  },
  {
    src: '/image/plated-palembang-platter-spiral.jpeg',
    alt: 'Sajian hidangan tradisional Palembang dalam platter spiral',
    caption: 'Sajian Tradisional Palembang',
    span: 'md:col-span-7',
    aspect: 'aspect-[4/3]',
  },
];

const JENIS_HAMPERS = [
  {
    no: '01',
    judul: 'Hampers Ulang Tahun',
    desc: 'Tumpeng pempek dengan kartu ucapan, packaging custom — untuk hadiah keluarga atau rekan kerja.',
  },
  {
    no: '02',
    judul: 'Parcel Korporat',
    desc: 'Lebaran, Natal, Imlek, atau apresiasi karyawan — dengan branding dan jumlah custom.',
  },
  {
    no: '03',
    judul: 'Catering Event',
    desc: 'Arisan, gathering kantor, atau acara komunitas — diatur jumlah dan variannya.',
  },
  {
    no: '04',
    judul: 'Custom Konsep',
    desc: 'Punya konsep sendiri? Diskusikan — kami fleksibel mengikuti kebutuhan acara Anda.',
  },
];

const LANGKAH = [
  {
    judul: 'Chat WhatsApp',
    desc: 'Tombol konsultasi membuka chat dengan template pertanyaan kami yang umum.',
  },
  {
    judul: 'Diskusi Konsep',
    desc: 'Jenis acara, target tanggal, estimasi jumlah, dan budget. Kami bantu pilih.',
  },
  {
    judul: 'Konfirmasi & Bayar',
    desc: 'Setelah disepakati, kami siapkan hampers Anda untuk pickup atau delivery.',
  },
];

export default function HampersPage() {
  const waUrl = buildHampersConsultationWaUrl();

  return (
    <>
      {/* HERO */}
      <section className="bg-brand-bg">
        <div className="container py-16 md:py-24">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10" />
                <span className="eyebrow">Hampers & Catering</span>
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight-display text-brand-text md:text-7xl lg:text-[6rem]">
                Hadiah pempek
                <br />
                <span className="display-italic text-brand-text-muted">untuk momen spesial.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-base leading-relaxed text-brand-text-muted">
                Ulang tahun, acara kantor, parcel korporat, atau catering — kami
                siapkan paket hampers pempek sesuai konsep Anda. Halal, segar,
                dikemas rapi.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-wa px-7 py-4 text-sm font-bold text-white shadow-lg shadow-brand-wa/20 transition-all hover:bg-brand-wa-hover"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M.057 24l1.687-6.163A11.867 11.867 0 0 1 .133 11.892C.137 5.335 5.473 0 12.031 0a11.86 11.86 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.34 11.892-11.892 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z" />
                </svg>
                Konsultasi Hampers
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GALERI EDITORIAL — asymmetric grid */}
      <section className="container section-pad">
        <FadeUp>
          <div className="mb-12 grid items-end gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10" />
                <span className="eyebrow">Galeri Karya</span>
              </div>
              <h2 className="mt-6 font-display text-4xl font-bold tracking-tight-display text-brand-text md:text-5xl lg:text-6xl">
                Beberapa karya
                <br />
                <span className="text-brand-text-muted">yang pernah kami buat.</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-base text-brand-text-muted">
                Setiap pesanan kami sesuaikan dengan konsep dan budget Anda.
                Galeri di bawah ini hanya sebagian — untuk inspirasi.
              </p>
            </div>
          </div>
        </FadeUp>

        <StaggerList className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-6" staggerDelay={0.1}>
          {GALERI.map((g) => (
            <StaggerItem key={g.src} className={g.span}>
              <figure className={`relative ${g.aspect} overflow-hidden rounded-2xl bg-brand-bg-soft`}>
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
                <figcaption className="absolute bottom-4 left-4 right-4 rounded-lg bg-brand-bg/90 px-4 py-2 backdrop-blur">
                  <p className="display-italic text-sm text-brand-text md:text-base">
                    {g.caption}
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerList>
      </section>

      {/* JENIS HAMPERS */}
      <section className="bg-brand-bg-soft">
        <div className="container section-pad">
          <FadeUp>
            <div className="mb-14 flex items-center gap-3">
              <span className="hairline-short !mx-0 !w-10" />
              <span className="eyebrow">Yang bisa kami buat</span>
            </div>
            <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight-display text-brand-text md:text-5xl lg:text-6xl">
              Pilih sesuai acara Anda.
            </h2>
          </FadeUp>

          <StaggerList className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16" staggerDelay={0.1}>
            {JENIS_HAMPERS.map((j) => (
              <StaggerItem key={j.no}>
                <div className="border-t border-brand-border pt-6">
                  <p className="font-display text-4xl font-bold tracking-tight-display text-brand-accent">
                    {j.no}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-brand-text md:text-3xl">
                    {j.judul}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-text-muted md:text-base">
                    {j.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* CARA PESAN — 3 langkah */}
      <section className="container section-pad">
        <FadeUp>
          <div className="mb-14 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="hairline-short !w-10" />
              <span className="eyebrow">Cara Pesan</span>
              <span className="hairline-short !w-10" />
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight-display text-brand-text md:text-5xl lg:text-6xl">
              Tiga langkah,
              <br />
              <span className="display-italic text-brand-text-muted">satu kali chat.</span>
            </h2>
          </div>
        </FadeUp>

        <StaggerList className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8" staggerDelay={0.15}>
          {LANGKAH.map((l, i) => (
            <StaggerItem key={l.judul}>
              <div className="text-center">
                <p className="font-display text-6xl font-bold tracking-tight-display text-brand-accent md:text-7xl">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold text-brand-text md:text-2xl">
                  {l.judul}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-brand-text-muted">
                  {l.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </section>

      {/* TIPS BOX */}
      <section className="container pb-16">
        <FadeUp>
          <div className="rounded-3xl border border-brand-border bg-brand-surface p-8 md:p-12">
            <p className="eyebrow">Tips dari kami</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3 md:gap-10">
              <p className="text-sm leading-relaxed text-brand-text-muted">
                <strong className="block font-display text-lg text-brand-text">
                  Pesan jauh-jauh hari
                </strong>
                Akhir pekan dan hari libur slot terbatas — pesan minimal 3 hari
                sebelum.
              </p>
              <p className="text-sm leading-relaxed text-brand-text-muted">
                <strong className="block font-display text-lg text-brand-text">
                  Sertakan referensi
                </strong>
                Punya konsep visual? Kirim foto referensi via WA — kami senang
                berdiskusi detail.
              </p>
              <p className="text-sm leading-relaxed text-brand-text-muted">
                <strong className="block font-display text-lg text-brand-text">
                  Pengiriman frozen
                </strong>
                Tersedia untuk hampers ke luar Batam. Kami bantu pilih ekspedisi
                yang aman.
              </p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <FadeUp>
          <div className="rounded-3xl bg-brand-primary px-8 py-20 text-center text-white md:px-16 md:py-28">
            <h2 className="font-display text-4xl font-bold tracking-tight-display md:text-6xl lg:text-7xl">
              Punya konsep di kepala?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-white/80">
              Ceritakan ke kami via WhatsApp — kami bantu wujudkan sesuai budget
              dan timeline Anda.
            </p>
            <a
              href={waUrl}
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
              Konsultasi Sekarang
            </a>
            <p className="mt-4 text-xs text-white/60">{KONTAK.waUtamaDisplay}</p>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
