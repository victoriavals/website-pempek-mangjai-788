import Link from 'next/link';
import { ALAMAT, BRAND, JAM_BUKA, KONTAK, SOSIAL } from '@/lib/constants';
import { CERTIFICATIONS } from '@/data/certifications';
import { APP_VERSION } from '@/lib/version';

const SOSIAL_LIST = [
  { ...SOSIAL.instagram, label: 'Instagram' },
  { ...SOSIAL.facebook, label: 'Facebook' },
  { ...SOSIAL.youtube, label: 'YouTube' },
  { ...SOSIAL.tiktok, label: 'TikTok' },
];

const MINI_CERTS = CERTIFICATIONS.filter((c) =>
  ['halal-mui', 'bpom', 'pirt', 'nib', 'sni'].includes(c.id)
);

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-text text-brand-bg">
      <div className="hairline opacity-40" />

      <div className="container py-20">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <p className="font-display text-4xl font-bold tracking-tight-display md:text-5xl">
              Mang Jai
              <span className="ml-3 inline-flex h-9 items-center rounded-full bg-brand-accent px-3 align-middle text-base text-brand-text">
                788
              </span>
            </p>
            <p className="display-italic mt-4 text-xl text-brand-accent md:text-2xl">
              {BRAND.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-bg/70">
              {BRAND.subTagline}. Pempek ikan tenggiri asli Palembang, diproduksi
              dengan cinta di Batam sejak {BRAND.tahunBerdiri}.
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {MINI_CERTS.map((c) => (
                <li
                  key={c.id}
                  className="rounded-full border border-brand-bg/20 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-brand-bg/80"
                >
                  {c.badgeLabel}
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div className="md:col-span-3">
            <h4 className="eyebrow text-brand-accent">Hubungi</h4>
            <ul className="mt-5 space-y-3 text-sm text-brand-bg/85">
              <li>
                <a
                  href={`https://wa.me/${KONTAK.waUtama}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-accent hover:underline"
                >
                  {KONTAK.waUtamaDisplay}
                </a>
                <p className="text-xs text-brand-bg/50">WhatsApp utama</p>
              </li>
              <li>
                <a
                  href={`mailto:${KONTAK.email}`}
                  className="break-all hover:text-brand-accent"
                >
                  {KONTAK.email}
                </a>
              </li>
              <li className="pt-2 text-xs text-brand-bg/60">
                Teras buka {JAM_BUKA.hari}
                <br />
                {JAM_BUKA.jam}
              </li>
            </ul>
          </div>

          {/* Alamat */}
          <div className="md:col-span-2">
            <h4 className="eyebrow text-brand-accent">Outlet</h4>
            <p className="mt-5 text-sm leading-relaxed text-brand-bg/85">
              {ALAMAT.baris1}
              <br />
              {ALAMAT.baris2}
              <br />
              {ALAMAT.baris3}
            </p>
          </div>

          {/* Navigasi */}
          <div className="md:col-span-2">
            <h4 className="eyebrow text-brand-accent">Jelajah</h4>
            <ul className="mt-5 space-y-2 text-sm">
              <li>
                <Link href="/produk" className="hover:text-brand-accent">
                  Produk
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-brand-accent">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="/hampers" className="hover:text-brand-accent">
                  Hampers
                </Link>
              </li>
              <li>
                <Link href="/teras" className="hover:text-brand-accent">
                  Teras
                </Link>
              </li>
              <li>
                <Link href="/testimoni" className="hover:text-brand-accent">
                  Testimoni
                </Link>
              </li>
              <li>
                <Link href="/legalitas" className="hover:text-brand-accent">
                  Legalitas
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-brand-accent">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 hairline opacity-30" />

        <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-xs text-brand-bg/50">
            © {new Date().getFullYear()} {BRAND.namaLengkap}. Hak cipta
            dilindungi.
          </p>

          <ul className="flex flex-wrap gap-4 text-xs text-brand-bg/60">
            {SOSIAL_LIST.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-[11px] tracking-wider text-brand-bg/35">
          Versi situs v{APP_VERSION}
        </p>
      </div>
    </footer>
  );
}
