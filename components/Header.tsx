'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { BRAND } from '@/lib/constants';

const NAV_ITEMS = [
  { href: '/produk', label: 'Produk' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/hampers', label: 'Hampers' },
  { href: '/teras', label: 'Teras' },
  { href: '/legalitas', label: 'Legalitas' },
  { href: '/kontak', label: 'Kontak' },
];

export function Header() {
  const { totalQty, hydrated } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-brand-border bg-brand-bg/95 backdrop-blur-md'
          : 'border-b border-transparent bg-brand-bg/0'
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={BRAND.namaLengkap}
        >
          <span className="font-display text-2xl font-bold leading-none tracking-tight-display text-brand-primary">
            Mang Jai
          </span>
          <span className="flex h-7 items-center rounded-full bg-brand-accent/80 px-2 font-display text-xs font-bold text-brand-text">
            788
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Navigasi utama"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-brand-text transition-colors hover:text-brand-primary"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/beli"
            className="group relative inline-flex h-11 items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-4 text-sm font-medium text-brand-text transition-all hover:border-brand-primary hover:text-brand-primary"
            aria-label="Lihat keranjang"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="hidden sm:inline">Keranjang</span>
            {hydrated && totalQty > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-secondary px-1.5 text-[10px] font-bold text-white">
                {totalQty}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-text hover:border-brand-primary hover:text-brand-primary lg:hidden"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-brand-border bg-brand-bg lg:hidden"
          aria-label="Navigasi mobile"
        >
          <div className="container flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-brand-text hover:bg-brand-primary/5 hover:text-brand-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
