import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND, KONTAK } from '@/lib/constants';
import { buildSimpleWaUrl } from '@/lib/whatsapp';
import { OUTLETS_BY_CHAIN, RETAIL_OUTLETS } from '@/data/retail';
import { FadeUp, ParallaxFade, StaggerItem, StaggerList } from '@/components/motion';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: `Kisah ${BRAND.namaLengkap} sejak ${BRAND.tahunBerdiri}: dapur rumahan di Plamo Garden Batam yang melestarikan kuliner Sumatera Selatan. Visi, misi, dan kapasitas produksi.`,
};

const PERALATAN = [
  { nama: 'Mesin Adonan', kapasitas: '25 ltr', qty: 1 },
  { nama: 'Mesin Giling Otomatis', qty: 1 },
  { nama: 'Vacuum Sealer', qty: 2 },
  { nama: 'Sealer', qty: 2 },
  { nama: 'Blender', qty: 2 },
  { nama: 'Kulkas 3 Pintu', qty: 1 },
  { nama: 'Freezer', kapasitas: '700 ltr', qty: 1 },
  { nama: 'Freezer', kapasitas: '300 ltr', qty: 2 },
  { nama: 'Freezer', kapasitas: '210 ltr', qty: 3 },
];

const STRUKTUR = [
  {
    peran: 'Pengadaan & Logistik',
    tugas:
      'Membeli bahan, mengolah hingga bahan setengah jadi, merangkap transportasi dan delivery.',
  },
  {
    peran: 'Customer Service & Keuangan',
    tugas: 'Melayani customer, mengatur jadwal produksi, dan mencatat keuangan.',
  },
  {
    peran: 'Produksi',
    tugas:
      'Memproduksi pempek dari adonan/bahan setengah jadi sesuai schedule.',
  },
  {
    peran: 'Packing & Stok',
    tugas: 'Packing produk dan kontrol penyimpanan stok serta bahan keluar-masuk.',
  },
];

export default function TentangPage() {
  return (
    <>
      {/* HERO — editorial */}
      <section className="bg-brand-bg">
        <div className="container py-16 md:py-24">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10" />
                <span className="eyebrow">Tentang Kami</span>
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight-display text-brand-text md:text-7xl lg:text-[6rem]">
                Sepiring kuliner,
                <br />
                <span className="display-italic text-brand-text-muted">satu dekade cinta.</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="text-base leading-relaxed text-brand-text-muted">
                {BRAND.namaLengkap} adalah cerita tentang pasangan suami-istri
                dari Batam yang membawa rasa autentik Palembang ke meja makan
                keluarga Indonesia — sejak {BRAND.tahunBerdiri}, satu pempek
                pada satu waktu.
              </p>
            </div>
          </div>
        </div>

        <ParallaxFade className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src="/image/teras-mang-jai-pendiri-portrait.jpeg"
            alt={`${BRAND.founder.suami} dan ${BRAND.founder.istri}, pendiri ${BRAND.nama}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 photo-warm" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
            <p className="display-italic text-xl text-white drop-shadow md:text-3xl">
              &ldquo;Kami hanya ingin memastikan setiap potong pempek terasa
              seperti yang nenek buat — jujur dan ikan-nya berasa.&rdquo;
            </p>
            <p className="mt-3 text-xs uppercase tracking-wider text-white/80">
              — Bapak Zaitun Rizal, Pendiri
            </p>
          </div>
        </ParallaxFade>
      </section>

      {/* KISAH KAMI — drop cap editorial */}
      <section className="container section-pad">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-3">
            <FadeUp>
              <div className="flex items-center gap-3">
                <span className="hairline-short !mx-0 !w-10" />
                <span className="eyebrow">Kisah</span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight-display text-brand-text md:text-4xl">
                Dari dapur rumah Plamo Garden.
              </h2>
            </FadeUp>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <FadeUp>
              <p className="drop-cap font-display text-lg leading-relaxed text-brand-text md:text-xl">
                Tahun {BRAND.tahunBerdiri}, di sebuah rumah di Plamo Garden Blok
                P, {BRAND.founder.suami} bersama istrinya {BRAND.founder.istri}{' '}
                mulai membuat pempek dari dapur rumah mereka. Resepnya sederhana
                — ikan tenggiri pilihan, sagu, dan cuko yang kental seperti yang
                mereka kenal sejak kecil di Sumatera Selatan.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="mt-6 text-base leading-relaxed text-brand-text-muted">
                Lebih dari satu dekade kemudian, pempek frozen kami telah hadir
                di <strong className="text-brand-text">12 outlet supermarket di Batam</strong>{' '}
                — TOP 100, JC (Jodoh Centre), Hypermart, Diamond, Gogo, dan
                Indogrosir — sekaligus dapat dikirim frozen via Paxel untuk para
                perantau Sumsel yang merindukan rasa rumah.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="mt-6 text-base leading-relaxed text-brand-text-muted">
                Pada <strong className="text-brand-text">10 September 2023</strong>,
                kami membuka <strong className="text-brand-text">Teras Mang Jai 788</strong> — outlet
                dine-in di alamat produksi yang sama, agar setiap pelanggan
                bisa menikmati pempek langsung dari sumbernya, sambil bertemu
                tim yang membuatnya.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* DISTRIBUSI — outlet locations */}
      <section className="bg-brand-bg-soft">
        <div className="container section-pad">
          <FadeUp>
            <div className="mb-12 grid items-end gap-6 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="flex items-center gap-3">
                  <span className="hairline-short !mx-0 !w-10" />
                  <span className="eyebrow">Tempat Beli</span>
                </div>
                <h2 className="mt-6 font-display text-4xl font-bold tracking-tight-display text-brand-text md:text-5xl lg:text-6xl">
                  {RETAIL_OUTLETS.length} outlet di Batam,
                  <br />
                  <span className="text-brand-text-muted">satu rasa autentik.</span>
                </h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-base leading-relaxed text-brand-text-muted">
                  Pempek frozen kami tersedia di jaringan supermarket pilihan di
                  Batam. Untuk pelanggan luar kota, kami melayani pengiriman
                  frozen via Paxel.
                </p>
              </div>
            </div>
          </FadeUp>

          <StaggerList
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {OUTLETS_BY_CHAIN.map((group) => {
              const isOwn = group.chain.startsWith('Teras');
              return (
                <StaggerItem key={group.chain}>
                  <div
                    className={`h-full rounded-2xl border p-6 ${
                      isOwn
                        ? 'border-brand-accent bg-brand-accent/10'
                        : 'border-brand-border bg-brand-surface'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3 border-b border-brand-border pb-4">
                      <h3 className="font-display text-xl font-semibold text-brand-text md:text-2xl">
                        {group.chain}
                      </h3>
                      <span className="font-display text-sm font-medium text-brand-accent">
                        {group.lokasi.length} outlet
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {group.lokasi.map((l) => (
                        <li
                          key={l}
                          className="flex items-start gap-2.5 text-sm leading-snug text-brand-text-muted"
                        >
                          <span
                            className="mt-1.5 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-brand-accent"
                            aria-hidden="true"
                          />
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerList>

          <FadeUp delay={0.2}>
            <p className="mt-10 text-center text-sm text-brand-text-muted">
              Daftar dapat berubah sewaktu-waktu. Hubungi kami via WhatsApp
              untuk ketersediaan harian.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* VISI MISI — full bleed dark */}
      <section className="relative bg-brand-text text-brand-bg">
        <div className="container section-pad">
          <div className="grid gap-16 md:grid-cols-2 md:gap-20">
            <FadeUp>
              <p className="eyebrow !text-brand-accent">Visi</p>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight-display md:text-5xl">
                Melestarikan kuliner dan budaya Nusantara —
                <span className="display-italic text-brand-accent"> khususnya Sumatera Selatan.</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="eyebrow !text-brand-accent">Misi</p>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight-display md:text-5xl">
                Menyajikan kuliner yang bergizi, sehat, dan
                <span className="display-italic text-brand-accent"> dapat dinikmati semua usia.</span>
              </h2>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* STRUKTUR & PERALATAN */}
      <section className="container section-pad">
        <FadeUp>
          <div className="mb-14 flex items-center gap-3">
            <span className="hairline-short !mx-0 !w-10" />
            <span className="eyebrow">Tim & Peralatan</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight-display text-brand-text md:text-5xl lg:text-6xl">
            Empat orang,
            <br />
            <span className="text-brand-text-muted">±1.000 pcs per hari.</span>
          </h2>
        </FadeUp>

        <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <FadeUp>
              <p className="eyebrow">Struktur Tim</p>
            </FadeUp>
            <StaggerList className="mt-6 space-y-6">
              {STRUKTUR.map((s, idx) => (
                <StaggerItem key={s.peran}>
                  <div className="flex gap-5 border-b border-brand-border pb-6 last:border-b-0">
                    <span className="font-display text-3xl font-bold tracking-tight-display text-brand-accent md:text-4xl">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-brand-text md:text-xl">
                        {s.peran}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-brand-text-muted">
                        {s.tugas}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>

          <div>
            <FadeUp>
              <p className="eyebrow">Peralatan Produksi</p>
              <p className="mt-4 text-sm leading-relaxed text-brand-text-muted">
                Setup peralatan yang mendukung produksi harian:
              </p>
            </FadeUp>
            <StaggerList className="mt-6 divide-y divide-brand-border border-y border-brand-border">
              {PERALATAN.map((p) => (
                <StaggerItem key={p.nama}>
                  <div className="flex items-baseline justify-between py-4">
                    <span className="text-brand-text">
                      {p.nama}
                      {p.kapasitas && (
                        <span className="ml-2 text-xs text-brand-text-muted">
                          ({p.kapasitas})
                        </span>
                      )}
                    </span>
                    <span className="font-display text-lg font-semibold text-brand-primary">
                      ×{p.qty}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </div>
      </section>

      {/* PRODUKSI — foto besar parallax */}
      <section className="relative">
        <ParallaxFade className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
          <Image
            src="/image/produksi-rumah-plamo-garden-eksterior.jpeg"
            alt="Rumah produksi Pempek 788 Mang Jai di Plamo Garden, Batam"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-text/30" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="container">
              <p className="eyebrow !text-brand-accent">Plamo Garden Blok P No. 22</p>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight-display text-white md:text-5xl lg:text-6xl">
                Tempat semuanya
                <br />
                <span className="display-italic">dimulai.</span>
              </h3>
            </div>
          </div>
        </ParallaxFade>
      </section>

      {/* CTA */}
      <section className="container section-pad">
        <FadeUp>
          <div className="rounded-3xl bg-brand-primary px-8 py-20 text-center text-white md:px-16 md:py-28">
            <h2 className="font-display text-4xl font-bold tracking-tight-display md:text-6xl">
              Penasaran rasanya?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base text-white/80">
              Pilih varian favorit Anda, atau hubungi kami langsung untuk
              konsultasi.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/produk"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-bg px-8 py-4 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-accent"
              >
                Lihat Produk →
              </Link>
              <a
                href={buildSimpleWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-primary"
              >
                Chat WhatsApp
              </a>
            </div>
            <p className="mt-4 text-xs text-white/60">{KONTAK.waUtamaDisplay}</p>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
