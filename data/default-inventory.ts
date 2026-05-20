// Fallback inventory data — used when Google Sheets fetch fails or env var
// `GOOGLE_SHEETS_PRODUCTS_CSV_URL` is not configured. Owner should keep this
// in sync with the sheet, but a stale fallback is far better than a broken site.
//
// `stock_qty: null` everywhere = stock not tracked in the fallback path
// (UI will show no stock badge). The 3 "Hubungi Kami" SKUs intentionally
// keep `harga_per_pack` and `isi_per_pack` as null.

import type { ProductInventory } from './types';

export const DEFAULT_INVENTORY: ProductInventory[] = [
  {
    id: 'pempek-kapal-selam',
    isi_per_pack: 2,
    satuan_label: '2 pcs/bungkus',
    harga_per_pack: 50000,
    stock_qty: null,
  },
  {
    id: 'pempek-lenjer',
    isi_per_pack: 10,
    satuan_label: '10 pcs/bungkus',
    harga_per_pack: 50000,
    stock_qty: null,
  },
  {
    id: 'pempek-telur',
    isi_per_pack: 10,
    satuan_label: '10 pcs/bungkus',
    harga_per_pack: 50000,
    stock_qty: null,
  },
  {
    id: 'pempek-adaan',
    isi_per_pack: 10,
    satuan_label: '10 pcs/bungkus',
    harga_per_pack: 50000,
    stock_qty: null,
  },
  {
    id: 'pempek-keriting',
    isi_per_pack: 10,
    satuan_label: '10 pcs/bungkus',
    harga_per_pack: 50000,
    stock_qty: null,
  },
  {
    id: 'pempek-pistel',
    isi_per_pack: 10,
    satuan_label: '10 pcs/bungkus',
    harga_per_pack: 50000,
    stock_qty: null,
  },
  {
    id: 'pempek-kulit',
    isi_per_pack: 10,
    satuan_label: '10 pcs/bungkus',
    harga_per_pack: 50000,
    stock_qty: null,
  },
  {
    id: 'pempek-mozzarella',
    isi_per_pack: 10,
    satuan_label: '10 pcs/bungkus',
    harga_per_pack: 50000,
    stock_qty: null,
  },
  {
    id: 'pempek-panggang',
    isi_per_pack: 6,
    satuan_label: '6 pcs/bungkus',
    harga_per_pack: 40000,
    stock_qty: null,
  },
  {
    id: 'pempek-dos',
    isi_per_pack: 10,
    satuan_label: '10 pcs/bungkus',
    harga_per_pack: 25000,
    stock_qty: null,
  },
  {
    id: 'pempek-campur',
    isi_per_pack: null,
    satuan_label: 'Paket variasi',
    harga_per_pack: null,
    stock_qty: null,
  },
  {
    id: 'tekwan-ikan',
    isi_per_pack: null,
    satuan_label: 'Sup ikan kuah kaldu',
    harga_per_pack: null,
    stock_qty: null,
  },
  {
    id: 'kue-bawang',
    isi_per_pack: null,
    satuan_label: 'Snack renyah',
    harga_per_pack: null,
    stock_qty: null,
  },
];

export const DEFAULT_INVENTORY_BY_ID: Record<string, ProductInventory> =
  Object.fromEntries(DEFAULT_INVENTORY.map((i) => [i.id, i]));
