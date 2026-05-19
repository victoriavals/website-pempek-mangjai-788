import type { CartItem, Product } from '@/data/types';
import { getProductById } from '@/data/products';
import { KONTAK } from './constants';
import { formatRupiahPlain } from './format';

interface ResolvedItem {
  product: Product;
  qty: number;
  subtotal: number | null;
}

export function resolveCart(items: CartItem[]): ResolvedItem[] {
  return items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      const subtotal =
        product.harga_per_pack === null ? null : product.harga_per_pack * item.quantity;
      return { product, qty: item.quantity, subtotal };
    })
    .filter((x): x is ResolvedItem => x !== null);
}

export function calcSubtotal(items: CartItem[]): number {
  return resolveCart(items).reduce(
    (sum, it) => sum + (it.subtotal ?? 0),
    0
  );
}

export function countUnpriced(items: CartItem[]): number {
  return resolveCart(items).filter((it) => it.subtotal === null).length;
}

export function buildWhatsAppMessage(items: CartItem[], note?: string): string {
  const resolved = resolveCart(items);
  if (resolved.length === 0) {
    return `Halo Pempek 788 Mang Jai 👋\nSaya ingin bertanya tentang produk Anda. Terima kasih!`;
  }

  const lines: string[] = [];
  lines.push('Halo Pempek 788 Mang Jai 👋');
  lines.push('Saya ingin memesan:');
  lines.push('');

  resolved.forEach((it, idx) => {
    const num = `${idx + 1}.`;
    const nama = it.product.nama;
    const isiText = it.product.isi_per_pack
      ? ` (${it.product.satuan_label})`
      : '';
    if (it.subtotal === null) {
      lines.push(`${num} ${nama}${isiText} × ${it.qty} bks — *konfirmasi harga via WA*`);
    } else {
      lines.push(
        `${num} ${nama}${isiText} × ${it.qty} bks — ${formatRupiahPlain(it.subtotal)}`
      );
    }
  });

  const subtotal = calcSubtotal(items);
  const unpriced = countUnpriced(items);
  lines.push('');
  if (subtotal > 0 && unpriced > 0) {
    lines.push(
      `Subtotal: ${formatRupiahPlain(subtotal)} (+ ${unpriced} item perlu konfirmasi)`
    );
  } else if (subtotal > 0) {
    lines.push(`Subtotal: ${formatRupiahPlain(subtotal)}`);
  } else {
    lines.push('Subtotal: harga akan dikonfirmasi via WA');
  }

  if (note && note.trim()) {
    lines.push(`Catatan: ${note.trim()}`);
  }

  lines.push('');
  lines.push('Mohon info ongkir & cara pembayaran. Terima kasih!');

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string, phone: string = KONTAK.waUtama): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildSimpleWaUrl(
  text: string = 'Halo Pempek 788 Mang Jai 👋',
  phone: string = KONTAK.waUtama
): string {
  return buildWhatsAppUrl(text, phone);
}

export function buildAskPriceWaUrl(productName: string): string {
  const msg = `Halo Pempek 788 Mang Jai 👋\nSaya ingin tanya harga produk: ${productName}.\nTerima kasih!`;
  return buildWhatsAppUrl(msg);
}

export function buildHampersConsultationWaUrl(): string {
  const msg = [
    'Halo Pempek 788 Mang Jai 👋',
    'Saya tertarik untuk pesan hampers/catering.',
    '',
    'Jenis acara: [...]',
    'Target tanggal: [...]',
    'Estimasi jumlah: [...]',
    'Budget perkiraan: [...]',
    '',
    'Mohon info paket & harga. Terima kasih!',
  ].join('\n');
  return buildWhatsAppUrl(msg);
}

export function buildTerasReservationWaUrl(): string {
  const msg = [
    'Halo Pempek 788 Mang Jai 👋',
    'Saya ingin konfirmasi ketersediaan menu / reservasi tempat di Teras Mang Jai 788.',
    '',
    'Tanggal: [...]',
    'Jumlah orang: [...]',
    '',
    'Terima kasih!',
  ].join('\n');
  return buildWhatsAppUrl(msg);
}
