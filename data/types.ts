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

export interface Product {
  id: string;
  slug: string;
  nama: string;
  kategori: ProductCategory;
  isi_per_pack: number | null;
  satuan_label: string;
  harga_per_pack: number | null;
  deskripsi: string;
  gambar: string;
  tags?: ProductTag[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  updatedAt: number;
}
