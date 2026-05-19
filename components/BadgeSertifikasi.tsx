import type { Certification } from '@/data/certifications';

interface BadgeSertifikasiProps {
  cert: Certification;
  compact?: boolean;
}

export function BadgeSertifikasi({ cert, compact = false }: BadgeSertifikasiProps) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-xs font-medium uppercase tracking-wider text-brand-text">
        <span className="inline-block h-1 w-1 rounded-full bg-brand-accent" aria-hidden="true" />
        {cert.badgeLabel}
      </span>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-brand-border bg-brand-surface p-6 transition-shadow hover:shadow-md">
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
      <h3 className="font-display text-base font-semibold text-brand-text">
        {cert.nama}
      </h3>
      {cert.nomor && (
        <p className="break-all text-[11px] uppercase tracking-wider text-brand-text-muted">
          {cert.nomor}
        </p>
      )}
    </div>
  );
}
