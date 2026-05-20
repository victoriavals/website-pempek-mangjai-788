export type ProductCategory =
  | 'tenggiri-standar'
  | 'tenggiri-khusus'
  | 'tanpa-ikan'
  | 'campur'
  | 'snack';

export type ProductTag =
  | 'Best Seller'
  | 'Premium'
  | 'Halal'
  | 'Tanpa Ikan'
  | 'Snack'
  | 'Hubungi Kami';

// Static base data — committed to repo, edited via PR.
// Owner does NOT change these via Google Sheets (to avoid typos in product names).
export interface ProductBase {
  id: string;
  slug: string;
  nama: string;
  kategori: ProductCategory;
  deskripsi: string;
  gambar: string;
  tags?: ProductTag[];
}

// Dynamic inventory — sourced from Google Sheets (or DEFAULT_INVENTORY fallback).
// These fields can change daily/weekly via the spreadsheet.
export interface ProductInventory {
  id: string;
  isi_per_pack: number | null; // null = not a fixed-pack item (e.g. Tekwan kuah)
  satuan_label: string; // ready-to-display string like "10 pcs/bungkus"
  harga_per_pack: number | null; // null = "Hubungi Kami"
  stock_qty: number | null; // null = not tracked, 0 = habis, positive = available
}

// Merged product (base + inventory) — what UI components consume.
export interface Product extends ProductBase, ProductInventory {}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  updatedAt: number;
}
