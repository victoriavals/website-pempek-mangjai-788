'use client';

import { CATEGORY_LABELS } from '@/data/products';
import type { ProductCategory } from '@/data/types';

export type FilterValue = ProductCategory | 'all';

interface CategoryFilterProps {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
  available: ProductCategory[];
}

export function CategoryFilter({
  value,
  onChange,
  available,
}: CategoryFilterProps) {
  const options: { value: FilterValue; label: string }[] = [
    { value: 'all', label: 'Semua' },
    ...available.map((c) => ({ value: c, label: CATEGORY_LABELS[c] })),
  ];

  return (
    <div
      role="tablist"
      aria-label="Filter kategori produk"
      className="sticky top-20 z-20 -mx-5 flex gap-3 overflow-x-auto border-y border-brand-border bg-brand-bg/95 px-5 py-4 backdrop-blur md:mx-0 md:rounded-full md:border md:px-3"
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all ${
              active
                ? 'bg-brand-text text-brand-bg'
                : 'text-brand-text-muted hover:bg-brand-text/5 hover:text-brand-text'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
