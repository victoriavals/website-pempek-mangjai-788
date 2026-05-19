'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/lib/cart';
import { formatRupiah, formatRupiahPlain } from '@/lib/format';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  calcSubtotal,
  countUnpriced,
  resolveCart,
} from '@/lib/whatsapp';
import { KONTAK } from '@/lib/constants';

export function CheckoutClient() {
  const { cart, hydrated, incrementQty, decrementQty, removeItem, clearCart } =
    useCart();
  const [note, setNote] = useState('');

  const resolved = useMemo(() => resolveCart(cart.items), [cart.items]);
  const subtotal = useMemo(() => calcSubtotal(cart.items), [cart.items]);
  const unpriced = useMemo(() => countUnpriced(cart.items), [cart.items]);

  const waUrl = useMemo(() => {
    if (cart.items.length === 0) return '#';
    const msg = buildWhatsAppMessage(cart.items, note);
    return buildWhatsAppUrl(msg);
  }, [cart.items, note]);

  if (!hydrated) {
    return (
      <section className="container py-32">
        <p className="display-italic text-center text-xl text-brand-text-muted">
          Memuat keranjang…
        </p>
      </section>
    );
  }

  if (cart.items.length === 0) {
    return (
      <section className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="hairline-short !w-10" />
          <p className="mt-6 eyebrow">Keranjang kosong</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight-display text-brand-text md:text-5xl">
            Belum ada pesanan
            <br />
            <span className="display-italic text-brand-text-muted">di sini.</span>
          </h2>
          <p className="mt-6 text-base text-brand-text-muted">
            Yuk pilih varian pempek favorit Anda — Kapal Selam, Lenjer, Adaan,
            dan banyak lagi.
          </p>
          <Link
            href="/produk"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-text px-8 py-4 text-sm font-semibold text-brand-bg transition-colors hover:bg-brand-primary"
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
              className="h-4 w-4"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container pb-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        {/* CART ITEMS */}
        <div className="md:col-span-7 lg:col-span-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight-display text-brand-text md:text-3xl">
              Item Pesanan ({resolved.length})
            </h2>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-medium uppercase tracking-wider text-brand-text-muted hover:text-brand-secondary"
            >
              Kosongkan
            </button>
          </div>

          <ul className="divide-y divide-brand-border border-y border-brand-border">
            <AnimatePresence initial={false}>
              {resolved.map(({ product, qty, subtotal: itemSubtotal }) => {
                const isHubungiKami = itemSubtotal === null;
                return (
                  <motion.li
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-5 py-6"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-brand-bg-soft sm:h-28 sm:w-28">
                      <Image
                        src={product.gambar}
                        alt={`Kemasan ${product.nama}`}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-display text-lg font-semibold leading-tight text-brand-text md:text-xl">
                            {product.nama}
                          </h3>
                          <p className="mt-1 text-xs uppercase tracking-wider text-brand-text-muted">
                            {product.satuan_label}
                          </p>
                          {!isHubungiKami && (
                            <p className="mt-1 text-xs text-brand-text-muted">
                              {formatRupiah(product.harga_per_pack!)} / bks
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          {isHubungiKami ? (
                            <span className="display-italic whitespace-nowrap text-sm text-brand-text-muted">
                              Konfirmasi WA
                            </span>
                          ) : (
                            <span className="whitespace-nowrap font-display text-xl font-bold tracking-tight-display text-brand-text md:text-2xl">
                              {formatRupiahPlain(itemSubtotal!)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-auto flex items-center gap-3 pt-4">
                        <div className="inline-flex items-center overflow-hidden rounded-full border border-brand-border">
                          <button
                            type="button"
                            onClick={() => decrementQty(product.id)}
                            className="h-9 w-9 text-brand-text transition-colors hover:bg-brand-text hover:text-brand-bg"
                            aria-label={`Kurangi jumlah ${product.nama}`}
                          >
                            −
                          </button>
                          <span
                            className="min-w-[2.5rem] text-center text-sm font-semibold tabular-nums"
                            aria-live="polite"
                          >
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => incrementQty(product.id)}
                            className="h-9 w-9 text-brand-text transition-colors hover:bg-brand-text hover:text-brand-bg"
                            aria-label={`Tambah jumlah ${product.nama}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          className="ml-auto text-xs font-medium uppercase tracking-wider text-brand-text-muted hover:text-brand-secondary"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          <Link
            href="/produk"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:gap-3"
          >
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
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Lanjut belanja
          </Link>
        </div>

        {/* SUMMARY */}
        <aside className="md:col-span-5 lg:col-span-4">
          <div className="md:sticky md:top-24">
            <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 md:p-7">
              <h2 className="font-display text-2xl font-bold tracking-tight-display text-brand-text">
                Ringkasan
              </h2>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-brand-text-muted">Subtotal item</dt>
                  <dd className="font-semibold text-brand-text">
                    {subtotal > 0 ? formatRupiahPlain(subtotal) : '—'}
                  </dd>
                </div>
                {unpriced > 0 && (
                  <p className="text-xs italic text-brand-text-muted">
                    + {unpriced} item perlu konfirmasi harga via WA
                  </p>
                )}
                <div className="flex justify-between border-t border-brand-border pt-3">
                  <dt className="text-brand-text-muted">Ongkir</dt>
                  <dd className="text-xs text-brand-text-muted">
                    Konfirmasi via WA
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-brand-border pt-4">
                  <dt className="font-display font-bold text-brand-text">
                    Estimasi
                  </dt>
                  <dd className="font-display text-3xl font-bold tracking-tight-display text-brand-text">
                    {subtotal > 0 ? `${formatRupiahPlain(subtotal)}+` : 'Tanya WA'}
                  </dd>
                </div>
              </dl>

              <label className="mt-6 block">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-text">
                  Catatan (opsional)
                </span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  maxLength={300}
                  placeholder="contoh: Tolong dikirim Sabtu sore..."
                  className="mt-2 w-full rounded-md border border-brand-border bg-brand-bg px-4 py-3 text-sm placeholder:text-brand-text-muted/60 focus:border-brand-primary focus:outline-none"
                />
                <span className="mt-1 block text-right text-[10px] text-brand-text-muted">
                  {note.length}/300
                </span>
              </label>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-wa px-4 py-4 text-sm font-bold text-white shadow-lg shadow-brand-wa/20 transition-all hover:bg-brand-wa-hover hover:shadow-xl"
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
                Pesan via WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-brand-text-muted">
                Dikirim ke {KONTAK.waUtamaDisplay}
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-brand-accent/40 bg-brand-accent/10 p-5">
              <p className="font-display text-sm font-semibold text-brand-text">
                Setelah klik &ldquo;Pesan via WhatsApp&rdquo;
              </p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-xs leading-relaxed text-brand-text-muted">
                <li>Pesan otomatis terisi di WhatsApp Anda</li>
                <li>Kirim — kami respons untuk ongkir &amp; pembayaran</li>
                <li>
                  Pengiriman: Batam (lokal) atau luar Batam (frozen JNE / J&amp;T)
                </li>
              </ol>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
