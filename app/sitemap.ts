import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

const ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '', changeFrequency: 'monthly', priority: 1.0 },
  { path: '/produk', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/beli', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/tentang', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/hampers', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/teras', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/legalitas', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/kontak', changeFrequency: 'yearly', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
