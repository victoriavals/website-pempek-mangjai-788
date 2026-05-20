// Fetch product inventory (harga + stock + isi) from a published Google Sheet
// (CSV format). Falls back to DEFAULT_INVENTORY when:
//   - env var GOOGLE_SHEETS_PRODUCTS_CSV_URL is not set
//   - fetch fails (network, 4xx/5xx response)
//   - CSV is malformed
//
// Cached for 5 minutes via Next.js fetch revalidate. To force refresh, redeploy
// or wait for the cache to expire.

import type { ProductInventory } from '@/data/types';
import { DEFAULT_INVENTORY, DEFAULT_INVENTORY_BY_ID } from '@/data/default-inventory';

export const STOCK_LOW_THRESHOLD = 10;
export const SHEET_REVALIDATE_SECONDS = 300; // 5 minutes

const REQUIRED_HEADERS = ['id', 'isi_per_pack', 'satuan_label', 'harga_per_pack', 'stock_qty'] as const;

/**
 * Minimal CSV parser that handles standard quoting (RFC 4180-ish):
 *   - fields separated by commas
 *   - fields wrapped in double quotes can contain commas, newlines, escaped "" quotes
 *   - line breaks separate rows
 * Returns array of row arrays (first row is the header).
 */
export function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;
  let i = 0;

  while (i < csv.length) {
    const ch = csv[i];

    if (inQuotes) {
      if (ch === '"') {
        if (csv[i + 1] === '"') {
          // Escaped quote
          currentField += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      currentField += ch;
      i++;
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      i++;
      continue;
    }

    if (ch === ',') {
      currentRow.push(currentField);
      currentField = '';
      i++;
      continue;
    }

    if (ch === '\n' || ch === '\r') {
      // Handle \r\n and \n both
      if (ch === '\r' && csv[i + 1] === '\n') i++;
      currentRow.push(currentField);
      // Only push row if it has content (avoid trailing empty rows)
      if (currentRow.some((f) => f.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
      i++;
      continue;
    }

    currentField += ch;
    i++;
  }

  // Flush final field/row
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some((f) => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Parse a single cell into number or null. Empty string, whitespace, or
 * non-numeric content all become null. Strips IDR formatting like "Rp" and ".".
 */
function parseNumberCell(raw: string | undefined): number | null {
  if (raw === undefined) return null;
  const trimmed = raw.trim();
  if (trimmed === '') return null;
  // Strip common IDR formatting artifacts so owner can type "Rp 50.000" or "50,000"
  const cleaned = trimmed.replace(/Rp/gi, '').replace(/[.\s,]/g, '');
  const n = Number(cleaned);
  if (!Number.isFinite(n)) return null;
  return n;
}

function parseStringCell(raw: string | undefined): string {
  return (raw ?? '').trim();
}

/**
 * Parse CSV rows into a ProductInventory[]. Skips rows with missing or
 * unrecognized `id`. Returns empty array if header doesn't match what we expect.
 */
export function rowsToInventory(rows: string[][]): ProductInventory[] {
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idIdx = header.indexOf('id');
  const isiIdx = header.indexOf('isi_per_pack');
  const satuanIdx = header.indexOf('satuan_label');
  const hargaIdx = header.indexOf('harga_per_pack');
  const stockIdx = header.indexOf('stock_qty');

  if (idIdx === -1) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        '[sheets] CSV header missing required column `id`. Expected columns:',
        REQUIRED_HEADERS.join(', ')
      );
    }
    return [];
  }

  const out: ProductInventory[] = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const id = parseStringCell(row[idIdx]);
    if (!id) continue;

    out.push({
      id,
      isi_per_pack: isiIdx === -1 ? null : parseNumberCell(row[isiIdx]),
      satuan_label: satuanIdx === -1 ? '' : parseStringCell(row[satuanIdx]),
      harga_per_pack: hargaIdx === -1 ? null : parseNumberCell(row[hargaIdx]),
      stock_qty: stockIdx === -1 ? null : parseNumberCell(row[stockIdx]),
    });
  }
  return out;
}

/**
 * Fetch and merge inventory: Sheets data overrides DEFAULT_INVENTORY per id.
 * Returns a Map<id, ProductInventory> so callers can lookup by id.
 */
export async function fetchInventory(): Promise<Map<string, ProductInventory>> {
  const baseMap = new Map(DEFAULT_INVENTORY.map((i) => [i.id, i]));
  const url = process.env.GOOGLE_SHEETS_PRODUCTS_CSV_URL;

  if (!url) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.info(
        '[sheets] GOOGLE_SHEETS_PRODUCTS_CSV_URL not set — using DEFAULT_INVENTORY.'
      );
    }
    return baseMap;
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: SHEET_REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const csv = await res.text();
    const rows = parseCsv(csv);
    const sheetRows = rowsToInventory(rows);

    if (sheetRows.length === 0) {
      throw new Error('No rows parsed from sheet');
    }

    // Overlay sheet rows on top of base defaults. Sheet wins per id.
    for (const row of sheetRows) {
      const base = baseMap.get(row.id);
      // If sheet has a row for an unknown id, ignore it (don't add orphan)
      if (!base) continue;
      // Merge: keep DEFAULT values where sheet is empty/null, except stock_qty
      // which is always taken from the sheet (null means "not tracked").
      baseMap.set(row.id, {
        id: row.id,
        isi_per_pack: row.isi_per_pack ?? base.isi_per_pack,
        satuan_label: row.satuan_label || base.satuan_label,
        harga_per_pack: row.harga_per_pack ?? base.harga_per_pack,
        stock_qty: row.stock_qty,
      });
    }

    return baseMap;
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        '[sheets] Failed to fetch/parse Google Sheets CSV — using DEFAULT_INVENTORY. Error:',
        err
      );
    }
    return baseMap;
  }
}

// Synchronous lookup against DEFAULT_INVENTORY only — for client-side cart
// hydration (can't await). Returns undefined if id unknown.
export function getInventoryByIdSync(id: string): ProductInventory | undefined {
  return DEFAULT_INVENTORY_BY_ID[id];
}
