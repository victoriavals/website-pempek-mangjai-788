'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/data/types';
import { useCart } from '@/lib/cart';
import { formatRupiah } from '@/lib/format';
import { STOCK_LOW_THRESHOLD } from '@/lib/sheets';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const TAG_STYLES: Record<string, string> = {
  'Best Seller': 'bg-brand-secondary text-white',
  Premium: 'bg-brand-accent text-brand-text',
  Halal: 'border border-brand-primary/30 bg-transparent text-brand-primary',
  'Tanpa Ikan': 'border border-brand-border bg-brand-bg text-brand-text',
  Snack: 'border border-brand-border bg-brand-bg text-brand-text',
  'Hubungi Kami':
    'border border-brand-accent/60 bg-brand-accent/10 text-brand-text',
};

type StockBadge =
  | { kind: 'habis' }
  | { kind: 'terbatas'; qty: number }
  | null;

function deriveStockBadge(stockQty: number | null): StockBadge {
  if (stockQty === null) return null;
  if (stockQty === 0) return { kind: 'habis' };
  if (stockQty <= STOCK_LOW_THRESHOLD) return { kind: 'terbatas', qty: stockQty };
  return null;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const isHubungiKami = product.harga_per_pack === null;
  const stockBadge = deriveStockBadge(product.stock_qty);
  const isHabis = stockBadge?.kind === 'habis';

  const handleAdd = () => {
    if (isHabis) return;
    addItem(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const featuredTag = product.tags?.find(
    (t) => t === 'Best Seller' || t === 'Premium' || t === 'Hubungi Kami'
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-brand-bg-soft">
        <Image
          src={product.gambar}
          alt={`Kemasan ${product.nama}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
            isHabis ? 'opacity-60 grayscale' : ''
          }`}
        />

        {/* Featured tag (top-left) */}
        {featuredTag && (
          <div className="absolute left-3 top-3">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                TAG_STYLES[featuredTag] ?? 'bg-brand-text/10 text-brand-text'
              }`}
            >
              {featuredTag}
            </span>
          </div>
        )}

        {/* Stock badge (top-right) */}
        {stockBadge && (
          <div className="absolute right-3 top-3">
            {stockBadge.kind === 'habis' ? (
              <span className="inline-flex rounded-full bg-brand-text px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-bg">
                Habis
              </span>
            ) : (
              <span className="inline-flex rounded-full bg-brand-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                Sisa {stockBadge.qty}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-xl font-semibold leading-tight tracking-tight-display text-brand-text md:text-2xl">
          {product.nama}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-wider text-brand-text-muted">
          {product.satuan_label}
        </p>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-brand-text-muted">
          {product.deskripsi}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            {isHubungiKami ? (
              <span className="display-italic text-lg text-brand-text-muted">
                Hubungi Kami
              </span>
            ) : (
              <span className="font-display text-2xl font-bold tracking-tight-display text-brand-text md:text-3xl">
                {formatRupiah(product.harga_per_pack!)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isHabis}
            aria-disabled={isHabis}
            title={isHabis ? 'Sedang habis — konfirmasi via WhatsApp' : undefined}
            className={`inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-all ${
              isHabis
                ? 'cursor-not-allowed border border-brand-border bg-brand-bg-soft text-brand-text-muted'
                : added
                  ? 'bg-brand-primary text-white'
                  : 'border border-brand-text bg-transparent text-brand-text hover:border-brand-primary hover:bg-brand-primary hover:text-white'
            }`}
            aria-label={
              isHabis
                ? `${product.nama} sedang habis`
                : `Tambah ${product.nama} ke keranjang`
            }
          >
            {isHabis ? (
              'Habis'
            ) : added ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Ditambahkan
              </>
            ) : (
              <>
                Tambah
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
