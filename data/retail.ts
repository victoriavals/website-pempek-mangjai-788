export interface RetailOutlet {
  chain: string;
  lokasi: string;
}

export const RETAIL_OUTLETS: RetailOutlet[] = [
  { chain: 'TOP 100', lokasi: 'Grand Batam Mall' },
  { chain: 'TOP 100', lokasi: 'Plaza Tanjung Uncang' },
  { chain: 'TOP 100', lokasi: 'Plaza Jalan Bakal — Anggrek Mas' },
  { chain: 'TOP 100', lokasi: 'Tembesi' },
  { chain: 'JC (Jodoh Centre)', lokasi: 'One Batam Mall' },
  { chain: 'JC (Jodoh Centre)', lokasi: 'BCS Mall' },
  { chain: 'Hypermart', lokasi: 'Nagoya Hill' },
  { chain: 'Diamond', lokasi: 'DC Mall' },
  { chain: 'Gogo', lokasi: 'Botanis Mall 2' },
  { chain: 'Gogo', lokasi: 'Sei Panas — Bengkong' },
  { chain: 'Indogrosir', lokasi: 'Muka Kuning' },
  { chain: 'Teras Mang Jai 788', lokasi: 'Plamo Garden Blok P (Outlet Resmi)' },
];

// Unique chain names — preserves insertion order
export const RETAIL_CHAINS = Array.from(
  new Set(RETAIL_OUTLETS.map((o) => o.chain))
);

// Outlets grouped by chain — for dedicated "Distribusi" section in /tentang
export const OUTLETS_BY_CHAIN: { chain: string; lokasi: string[] }[] =
  RETAIL_CHAINS.map((chain) => ({
    chain,
    lokasi: RETAIL_OUTLETS.filter((o) => o.chain === chain).map((o) => o.lokasi),
  }));

// Third-party retail chains only — for compact display in homepage strip and
// /legalitas section. Excludes "Teras Mang Jai 788" since that is the brand's
// own outlet (shown separately in /tentang Distribusi section).
export const RETAIL_PARTNERS: string[] = RETAIL_CHAINS.filter(
  (chain) => chain !== 'Teras Mang Jai 788'
);
