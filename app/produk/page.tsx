import type { Metadata } from 'next';
import { getProducts } from '@/data/products';
import { ProductCatalog } from './ProductCatalog';

export const metadata: Metadata = {
  title: 'Daftar Produk Pempek',
  description:
    '13 varian pempek halal dari ikan tenggiri Kepri. Kapal Selam, Lenjer, Adaan, Keriting, Pistel, Kulit & lainnya. Mulai Rp 25.000/bungkus. Pesan via WhatsApp.',
};

export default async function ProdukPage() {
  const products = await getProducts();
  return (
    <>
      <section className="bg-brand-bg">
        <div className="container py-16 md:py-24">
          <div className="flex items-center gap-3">
            <span className="hairline-short !mx-0 !w-10" />
            <span className="eyebrow">Katalog Lengkap</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight-display text-brand-text md:text-7xl lg:text-[5.5rem]">
            Produk Kami.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-brand-text-muted md:text-lg">
            13 varian pempek &amp; pelengkap, dari Tenggiri pilihan perairan
            Kepulauan Riau. Pilih, tambahkan ke keranjang, dan pesan via
            WhatsApp.
          </p>
        </div>
      </section>

      <section className="container pb-24">
        <ProductCatalog products={products} />
      </section>
    </>
  );
}
