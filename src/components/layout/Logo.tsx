import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="EigenH Reach home"
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <span
        aria-hidden="true"
        className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-clinical-blue shadow-soft"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12c0-4.5 3-8 8-8s8 3.5 8 8" />
          <path d="M7 13a3 3 0 0 1 6 0v3a3 3 0 0 1-3 3" opacity="0.85" />
          <circle cx="17" cy="14" r="2" fill="currentColor" stroke="none" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-clinical-green ring-2 ring-white" />
      </span>
      <span className="flex items-baseline">
        <span className="text-base font-semibold tracking-tight text-navy">
          EigenH
        </span>
        <span className="ml-1 text-base font-semibold tracking-tight text-clinical-blue">
          Reach
        </span>
      </span>
    </Link>
  );
}
