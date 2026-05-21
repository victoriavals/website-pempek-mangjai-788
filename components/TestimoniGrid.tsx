'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Testimoni, TestimoniMedia } from '@/data/testimoni';
import { instagramEmbedSrc, instagramPermalink } from '@/data/testimoni';
import { TestimoniCard } from './TestimoniCard';

interface TestimoniGridProps {
  items: Testimoni[];
  columns?: 2 | 3 | 4;
}

export function TestimoniGrid({ items, columns = 3 }: TestimoniGridProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Testimoni | null>(null);

  const open = (t: Testimoni) => {
    setActive(t);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => setActive(null);
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, []);

  const gridCols =
    columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : columns === 2
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <>
      <div className={`grid grid-cols-1 gap-8 ${gridCols} md:gap-10`}>
        {items.map((t, i) => (
          <TestimoniCard key={t.id} testimoni={t} index={i} onClick={() => open(t)} />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-labelledby="testimoni-dialog-title"
      >
        {active && (
          <div
            className="relative grid max-h-[92vh] w-[min(96vw,1100px)] grid-cols-1 overflow-hidden rounded-3xl bg-brand-surface shadow-2xl md:grid-cols-[1fr_1.2fr]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-bg/95 text-brand-text shadow-md backdrop-blur hover:bg-brand-text hover:text-brand-bg"
              aria-label="Tutup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Media side */}
            <div className="relative flex max-h-[60vh] items-center justify-center overflow-hidden bg-brand-bg-soft md:max-h-[92vh]">
              <ModalMedia media={active.media} platform={active.platform} />
            </div>

            {/* Content side */}
            <div className="flex max-h-[40vh] flex-col overflow-y-auto bg-brand-bg p-6 md:max-h-[92vh] md:p-10">
              <p className="eyebrow">{active.platform}</p>
              <h2
                id="testimoni-dialog-title"
                className="mt-4 font-display text-2xl font-bold tracking-tight-display text-brand-text md:text-3xl"
              >
                {active.author ?? 'Testimoni Pelanggan'}
              </h2>
              {active.date && (
                <p className="mt-1 text-xs uppercase tracking-wider text-brand-text-muted">
                  {active.date}
                </p>
              )}

              <div className="mt-6 h-px w-12 bg-brand-accent" />

              {active.fullQuote ? (
                <blockquote className="mt-6 font-display text-lg leading-relaxed text-brand-text md:text-xl">
                  “{active.fullQuote}”
                </blockquote>
              ) : active.excerpt ? (
                <blockquote className="mt-6 font-display text-lg leading-relaxed text-brand-text md:text-xl">
                  “{active.excerpt}”
                </blockquote>
              ) : null}

              <TikTokDirectLink media={active.media} />
              <InstagramDirectLink media={active.media} />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function ModalMedia({
  media,
  platform,
}: {
  media: TestimoniMedia;
  platform: string;
}) {
  switch (media.type) {
    case 'image':
      return (
        <Image
          src={media.src}
          alt={`Testimoni ${platform}`}
          width={900}
          height={1600}
          className="h-auto w-full object-contain"
        />
      );

    case 'tiktok':
      return (
        <iframe
          title={`TikTok ${platform}`}
          src={`https://www.tiktok.com/embed/v2/${media.videoId}`}
          width="325"
          height="585"
          allowFullScreen
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          className="max-h-[85vh] w-full max-w-[420px] border-0"
          scrolling="no"
        />
      );

    case 'youtube':
      return (
        <iframe
          title={`YouTube ${platform}`}
          src={`https://www.youtube.com/embed/${media.videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="aspect-video w-full border-0"
        />
      );

    case 'instagram':
      return (
        <iframe
          title={`Instagram ${platform}`}
          src={instagramEmbedSrc(media.postId, media.kind)}
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="aspect-[9/14] w-full max-w-[440px] border-0"
          scrolling="no"
        />
      );

    case 'video':
      return (
        <video
          src={media.src}
          poster={media.poster}
          controls
          preload="metadata"
          className="max-h-[85vh] w-full"
        >
          Your browser does not support video playback.
        </video>
      );
  }
}

function TikTokDirectLink({ media }: { media: TestimoniMedia }) {
  if (media.type !== 'tiktok') return null;
  const url = `https://www.tiktok.com/@${media.username}/video/${media.videoId}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:gap-3"
    >
      Buka di TikTok
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
        aria-hidden="true"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}

function InstagramDirectLink({ media }: { media: TestimoniMedia }) {
  if (media.type !== 'instagram') return null;
  const url = instagramPermalink(media.postId, media.kind);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:gap-3"
    >
      Buka di Instagram
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
        aria-hidden="true"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}
