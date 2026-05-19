'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CERTIFICATIONS,
  canShowScan,
  type Certification,
} from '@/data/certifications';
import { buildSimpleWaUrl } from '@/lib/whatsapp';

export function CertificateGrid() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Certification | null>(null);

  const open = (cert: Certification) => {
    setActive(cert);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  const close = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => setActive(null);
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, []);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CERTIFICATIONS.map((c, i) => (
          <CertCard key={c.id} cert={c} index={i} onView={() => open(c)} />
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-labelledby="cert-dialog-title"
      >
        {active && (
          <div
            className="relative max-h-[90vh] w-[min(92vw,820px)] overflow-hidden rounded-3xl bg-brand-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-brand-border bg-brand-bg-soft px-6 py-5">
              <div className="min-w-0">
                <p className="eyebrow">Sertifikat</p>
                <h2
                  id="cert-dialog-title"
                  className="mt-1 font-display text-xl font-bold tracking-tight-display text-brand-text md:text-2xl"
                >
                  {active.nama}
                </h2>
                {active.nomor && (
                  <p className="mt-1 break-all text-xs uppercase tracking-wider text-brand-text-muted">
                    {active.nomor}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-brand-border text-brand-text hover:border-brand-primary hover:text-brand-primary"
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
            </div>

            {active.scan && (
              <div className="relative flex max-h-[72vh] items-center justify-center overflow-auto bg-brand-bg p-5">
                <Image
                  src={active.scan}
                  alt={`Scan ${active.nama}`}
                  width={1200}
                  height={1600}
                  className="h-auto max-h-[65vh] w-auto object-contain"
                />
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

interface CertCardProps {
  cert: Certification;
  index: number;
  onView: () => void;
}

function CertCard({ cert, index, onView }: CertCardProps) {
  const showable = canShowScan(cert);
  const hasScan = Boolean(cert.scan);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col rounded-2xl border border-brand-border bg-brand-surface p-6 transition-shadow hover:shadow-lg"
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 2 9 9l-7 1 5 5-1 7 6-3 6 3-1-7 5-5-7-1z" />
        </svg>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-brand-text">
        {cert.nama}
      </h3>
      {cert.nomor && (
        <p className="mt-1 break-all text-[11px] uppercase tracking-wider text-brand-text-muted">
          {cert.nomor}
        </p>
      )}

      <div className="mt-auto pt-5">
        {showable ? (
          <button
            type="button"
            onClick={onView}
            className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-brand-text px-4 py-2.5 text-xs font-semibold text-brand-text transition-all hover:bg-brand-text hover:text-brand-bg"
          >
            Lihat Scan
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        ) : hasScan ? (
          <a
            href={buildSimpleWaUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-brand-accent/50 bg-brand-accent/10 px-4 py-2.5 text-xs font-medium text-brand-text transition-colors hover:bg-brand-accent/20"
            title="Sertifikat asli tersedia atas permintaan via WhatsApp (sedang dalam proses redaksi data pribadi)"
          >
            Tersedia via WA
          </a>
        ) : (
          <span className="inline-flex w-full items-center justify-center rounded-full bg-brand-bg-soft px-4 py-2.5 text-xs font-medium text-brand-text-muted">
            Terdaftar resmi
          </span>
        )}
      </div>
    </motion.div>
  );
}
