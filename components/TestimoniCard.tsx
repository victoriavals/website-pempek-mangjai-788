'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Testimoni, TestimoniMedia, TestimoniSource } from '@/data/testimoni';

interface TestimoniCardProps {
  testimoni: Testimoni;
  index?: number;
  onClick: () => void;
}

const SOURCE_BADGE: Record<TestimoniSource, { label: string; bg: string }> = {
  press: { label: 'Liputan Media', bg: 'bg-brand-accent text-brand-text' },
  instagram: { label: 'Instagram', bg: 'bg-brand-secondary text-white' },
  tiktok: { label: 'TikTok', bg: 'bg-brand-text text-brand-bg' },
  facebook: { label: 'Facebook', bg: 'bg-brand-primary text-white' },
  whatsapp: { label: 'WhatsApp', bg: 'bg-brand-wa text-white' },
};

export function TestimoniCard({
  testimoni,
  index = 0,
  onClick,
}: TestimoniCardProps) {
  const badge = SOURCE_BADGE[testimoni.source];
  const isVideoLike = testimoni.media.type !== 'image';

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group flex flex-col text-left"
      aria-label={`Buka testimoni dari ${testimoni.author ?? testimoni.platform}`}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-brand-bg-soft shadow-sm transition-shadow group-hover:shadow-xl">
        <CardMedia media={testimoni.media} platform={testimoni.platform} />

        {/* Source badge top-left */}
        <div className="absolute left-3 top-3 z-10">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${badge.bg}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Play button overlay for video types */}
        {isVideoLike && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl backdrop-blur transition-transform group-hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-1 h-7 w-7 text-brand-text"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        )}

        {/* Caption bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-brand-text via-brand-text/85 to-transparent p-4 pt-12 text-brand-bg">
          <p className="text-[10px] font-medium uppercase tracking-wider text-brand-accent">
            {testimoni.platform}
          </p>
          {testimoni.author && (
            <p className="mt-0.5 font-display text-sm font-semibold leading-tight md:text-base">
              {testimoni.author}
            </p>
          )}
        </div>
      </div>

      {testimoni.excerpt && (
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-brand-text-muted">
          “{testimoni.excerpt}”
        </p>
      )}
    </motion.button>
  );
}

function CardMedia({
  media,
  platform,
}: {
  media: TestimoniMedia;
  platform: string;
}) {
  if (media.type === 'image') {
    return (
      <Image
        src={media.src}
        alt={`Testimoni ${platform}`}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 80vw"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    );
  }

  // Video-like media (tiktok / youtube / instagram / mp4) — show poster or styled placeholder
  if (media.poster) {
    return (
      <Image
        src={media.poster}
        alt={`Testimoni ${platform}`}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 80vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    );
  }

  // No poster — branded gradient placeholder
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-text to-brand-secondary opacity-90 transition-opacity group-hover:opacity-100" />
  );
}
