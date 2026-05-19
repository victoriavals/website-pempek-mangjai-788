export interface Certification {
  id: string;
  nama: string;
  nomor?: string;
  badgeLabel: string;
  scan?: string;
  catatan?: string;
}

export function canShowScan(cert: Certification): boolean {
  return Boolean(cert.scan) && !cert.catatan?.toLowerCase().includes('redaksi');
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'halal-mui',
    nama: 'Halal MUI',
    nomor: '04030021380616',
    badgeLabel: 'Halal MUI',
    scan: '/image/slide-08-legalitas-halal-mui.jpeg',
    catatan: 'Sertifikat aktif (renewal pasca-2022).',
  },
  {
    id: 'bpom',
    nama: 'BPOM RI MD',
    nomor: '243229017042',
    badgeLabel: 'BPOM RI',
    scan: '/image/slide-10-legalitas-bpom-rekomendasi.jpeg',
  },
  {
    id: 'pirt',
    nama: 'P-IRT Dinkes Batam',
    nomor: '2022171010690-23 · 2062171020620-23',
    badgeLabel: 'P-IRT',
    scan: '/image/slide-09-legalitas-pirt-dinkes.jpeg',
  },
  {
    id: 'siumk',
    nama: 'SIUMK',
    nomor: 'IUMK/045/BK/XII/2017',
    badgeLabel: 'SIUMK 2017',
    scan: '/image/slide-06-legalitas-siumk-2017.jpeg',
    catatan: 'Scan wajib di-redaksi NIK sebelum dipublikasikan.',
  },
  {
    id: 'nib',
    nama: 'NIB',
    nomor: '0220003690831',
    badgeLabel: 'NIB',
    scan: '/image/slide-07-legalitas-nib-2020.jpeg',
    catatan: 'Scan wajib di-redaksi NIK sebelum dipublikasikan.',
  },
  {
    id: 'sni',
    nama: 'SNI',
    nomor: '1002991042023',
    badgeLabel: 'SNI',
  },
  {
    id: 'gmp',
    nama: 'GMP Certified',
    badgeLabel: 'GMP',
  },
  {
    id: 'batam-poenya',
    nama: 'Batam Poenya · Bangga Buatan Indonesia',
    badgeLabel: 'Batam Poenya',
  },
];
