import { describe, it, expect } from 'vitest';
import {
  buildWhatsAppUrl,
  buildSimpleWaUrl,
  buildTestimoniVoucherWaUrl,
} from '@/lib/whatsapp';
import { KONTAK } from '@/lib/constants';

function decodeText(url: string): string {
  const idx = url.indexOf('?text=');
  return idx === -1 ? '' : decodeURIComponent(url.slice(idx + '?text='.length));
}

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me URL with the default phone and url-encoded text', () => {
    const url = buildWhatsAppUrl('Halo dunia & teman');
    expect(url.startsWith(`https://wa.me/${KONTAK.waUtama}?text=`)).toBe(true);
    expect(url).toContain('%20'); // space encoded
    expect(decodeText(url)).toBe('Halo dunia & teman');
  });

  it('respects a custom phone number', () => {
    const url = buildWhatsAppUrl('hi', '6280000000000');
    expect(url.startsWith('https://wa.me/6280000000000?text=')).toBe(true);
  });

  it('escapes newlines into %0A', () => {
    const url = buildWhatsAppUrl('line1\nline2');
    expect(url).toContain('%0Aline2');
  });
});

describe('buildSimpleWaUrl', () => {
  it('defaults to the standard greeting', () => {
    expect(decodeText(buildSimpleWaUrl())).toBe('Halo Pempek 788 Mang Jai 👋');
  });

  it('passes custom text through buildWhatsAppUrl', () => {
    expect(decodeText(buildSimpleWaUrl('custom'))).toBe('custom');
  });
});

describe('buildTestimoniVoucherWaUrl (voucher 10% promo)', () => {
  const url = buildTestimoniVoucherWaUrl();
  const text = decodeText(url);

  it('targets the primary WhatsApp number', () => {
    expect(url.startsWith(`https://wa.me/${KONTAK.waUtama}?text=`)).toBe(true);
  });

  it('opens with the standard greeting', () => {
    expect(text.startsWith('Halo Pempek 788 Mang Jai')).toBe(true);
  });

  it('mentions the 10% voucher claim', () => {
    expect(text).toContain('voucher diskon 10%');
  });

  it('mentions the @mangjaipempek788 tag handle', () => {
    expect(text).toContain('@mangjaipempek788');
  });

  it('references both Instagram and Facebook as posting platforms', () => {
    expect(text).toMatch(/Instagram\/Facebook/i);
  });

  it('includes a placeholder for the post link or screenshot', () => {
    expect(text).toContain('[tempel di sini]');
  });

  it('ends with a courteous closing', () => {
    expect(text.trimEnd().endsWith('Terima kasih!')).toBe(true);
  });

  it('produces a stable URL across calls (idempotent)', () => {
    expect(buildTestimoniVoucherWaUrl()).toBe(buildTestimoniVoucherWaUrl());
  });
});
