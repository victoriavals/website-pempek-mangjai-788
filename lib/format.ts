export function formatRupiah(value: number): string {
  return `Rp ${value.toLocaleString('id-ID')},-`;
}

export function formatRupiahPlain(value: number): string {
  return `Rp ${value.toLocaleString('id-ID')}`;
}
