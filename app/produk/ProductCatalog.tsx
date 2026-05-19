'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { Product, ProductCategory } from '@/data/types';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter, type FilterValue } from '@/components/CategoryFilter';
import { useCart } from '@/lib/cart';

interface ProductCatalogProps {
  products: Product[];
}

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [filter, setFilter] = useState<FilterValue>('all');
  const { totalQty, hydrated } = useCart();

  const availableCategories = useMemo<ProductCategory[]>(() => {
    const set = new Set<ProductCategory>();
    products.forEach((p) => set.add(p.kategori));
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    if (filter === 'all') return products;
    return products.filter((p) => p.kategori === filter);
  }, [products, filter]);

  return (
    <>
      <CategoryFilter
        value={filter}
        onChange={setFilter}
        available={availableCategories}
      />

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="display-italic text-2xl text-brand-text-muted">
            Tidak ada produk dalam kategori ini.
          </p>
        </div>
      ) : (
        <div
          key={filter}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-14 md:mt-14 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:grid-cols-4"
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {hydrated && totalQty > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 sm:left-auto sm:right-24 sm:translate-x-0"
          >
            <Link
              href="/beli"
              className="inline-flex items-center gap-3 rounded-full bg-brand-text px-6 py-4 text-sm font-semibold text-brand-bg shadow-2xl transition-transform hover:scale-[1.03]"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-brand-text">
                {totalQty}
              </span>
              Lanjut ke Checkout
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
