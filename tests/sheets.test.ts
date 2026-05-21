import { describe, it, expect } from 'vitest';
import {
  parseCsv,
  rowsToInventory,
  STOCK_LOW_THRESHOLD,
} from '@/lib/sheets';

describe('parseCsv (RFC 4180-ish)', () => {
  it('parses a simple grid', () => {
    const rows = parseCsv('a,b,c\n1,2,3');
    expect(rows).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('handles quoted fields containing commas', () => {
    const rows = parseCsv('id,label\nx,"10 pcs, besar"');
    expect(rows[1]).toEqual(['x', '10 pcs, besar']);
  });

  it('handles escaped double quotes inside quoted fields', () => {
    const rows = parseCsv('a\n"she said ""hi"""');
    expect(rows[1]).toEqual(['she said "hi"']);
  });

  it('handles CRLF line endings and skips blank trailing rows', () => {
    const rows = parseCsv('a,b\r\n1,2\r\n\r\n');
    expect(rows).toEqual([
      ['a', 'b'],
      ['1', '2'],
    ]);
  });
});

describe('rowsToInventory', () => {
  const header = [
    'id',
    'isi_per_pack',
    'satuan_label',
    'harga_per_pack',
    'stock_qty',
  ];

  it('tolerates "Rp 50.000", "50,000", and "50000" as the same price', () => {
    const inv = rowsToInventory([
      header,
      ['pempek-lenjer', '10', '10 pcs/bungkus', 'Rp 50.000', '8'],
      ['pempek-adaan', '10', '10 pcs/bungkus', '50,000', '24'],
      ['pempek-dos', '10', '10 pcs/bungkus', '25000', '0'],
    ]);
    expect(inv).toHaveLength(3);
    expect(inv[0].harga_per_pack).toBe(50000);
    expect(inv[1].harga_per_pack).toBe(50000);
    expect(inv[2].harga_per_pack).toBe(25000);
  });

  it('preserves stock_qty === 0 as the "Habis" signal', () => {
    const inv = rowsToInventory([
      header,
      ['pempek-dos', '10', '10 pcs/bungkus', '25000', '0'],
    ]);
    expect(inv[0].stock_qty).toBe(0);
  });

  it('treats empty harga/stock as null (Hubungi Kami / not tracked)', () => {
    const inv = rowsToInventory([
      header,
      ['tekwan-ikan', '', 'Sup ikan kuah kaldu', '', ''],
    ]);
    expect(inv[0].harga_per_pack).toBeNull();
    expect(inv[0].stock_qty).toBeNull();
  });

  it('skips rows with empty id', () => {
    const inv = rowsToInventory([header, ['', '10', 'x', '50000', '5']]);
    expect(inv).toHaveLength(0);
  });

  it('returns [] when required id column is missing', () => {
    const inv = rowsToInventory([
      ['foo', 'bar'],
      ['1', '2'],
    ]);
    expect(inv).toEqual([]);
  });

  it('returns [] for empty input', () => {
    expect(rowsToInventory([])).toEqual([]);
    expect(rowsToInventory([header])).toEqual([]);
  });
});

describe('STOCK_LOW_THRESHOLD', () => {
  it('matches the documented threshold of 10', () => {
    expect(STOCK_LOW_THRESHOLD).toBe(10);
  });
});
