// Product accessors — merges static base (`products-base.ts`) with dynamic
// inventory (Google Sheets via `lib/sheets.ts`, with `default-inventory.ts`
// as fallback). All async functions are intended for use in Server Components
// or server-side data-fetching paths. For client-side validation (e.g. cart
// hydration), use the *Sync variants which only read DEFAULT_INVENTORY.

import type { Product } from './types';
import { PRODUCTS_BASE, PRODUCTS_BASE_BY_ID, CATEGORY_LABELS } from './products-base';
import { DEFAULT_INVENTORY_BY_ID } from './default-inventory';
import { fetchInventory } from '@/lib/sheets';

// Re-export for backwards-compat & convenience
export { CATEGORY_LABELS } from './products-base';

/**
 * Async — fetches inventory from Google Sheets (with ISR cache) and merges
 * with the static base. Use this in Server Components (app/produk/page.tsx,
 * app/beli/page.tsx, homepage Best Sellers section, etc.).
 */
export async function getProducts(): Promise<Product[]> {
  const inventoryMap = await fetchInventory();

  return PRODUCTS_BASE.map((base) => {
    const inv = inventoryMap.get(base.id) ?? DEFAULT_INVENTORY_BY_ID[base.id];
    return {
      ...base,
      isi_per_pack: inv?.isi_per_pack ?? null,
      satuan_label: inv?.satuan_label ?? '',
      harga_per_pack: inv?.harga_per_pack ?? null,
      stock_qty: inv?.stock_qty ?? null,
    };
  });
}

/**
 * Async getProductById — uses live inventory. Use in server contexts only.
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

/**
 * Synchronous accessor — uses DEFAULT_INVENTORY fallback only.
 * For client-side use (cart hydration validation) where async fetch isn't
 * possible. The returned product's price/stock may be stale; callers that
 * need live data should fetch products via server props instead.
 */
export function getProductByIdSync(id: string): Product | undefined {
  const base = PRODUCTS_BASE_BY_ID[id];
  if (!base) return undefined;
  const inv = DEFAULT_INVENTORY_BY_ID[id];
  return {
    ...base,
    isi_per_pack: inv?.isi_per_pack ?? null,
    satuan_label: inv?.satuan_label ?? '',
    harga_per_pack: inv?.harga_per_pack ?? null,
    stock_qty: inv?.stock_qty ?? null,
  };
}
