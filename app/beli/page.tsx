import type { Metadata } from 'next';
import { CheckoutClient } from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout',
  description:
    'Review keranjang Anda dan kirim pesanan ke WhatsApp Pempek 788 Mang Jai. Estimasi total, catatan, dan info pengiriman.',
};

export default function BeliPage() {
  return (
    <>
      <section className="bg-brand-bg">
        <div className="container py-14 md:py-20">
          <div className="flex items-center gap-3">
            <span className="hairline-short !mx-0 !w-10" />
            <span className="eyebrow">Checkout</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight-display text-brand-text md:text-6xl lg:text-7xl">
            Tinggal sebungkus chat.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-text-muted">
            Review pesanan Anda, lalu kirim ringkasan langsung ke WhatsApp kami.
            Ongkir dan pembayaran kami konfirmasi via chat.
          </p>
        </div>
      </section>

      <CheckoutClient />
    </>
  );
}
