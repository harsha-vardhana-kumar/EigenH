import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 16.92V21a1 1 0 0 1-1.11 1 19 19 0 0 1-8.27-3.05 18.86 18.86 0 0 1-6-6A19 19 0 0 1 3.57 4.11 1 1 0 0 1 4.56 3h4.09a1 1 0 0 1 1 .76 12.18 12.18 0 0 0 .67 2.65 1 1 0 0 1-.23 1.05L8.21 9.21a16 16 0 0 0 6 6l1.74-1.86a1 1 0 0 1 1.05-.23 12.18 12.18 0 0 0 2.65.67 1 1 0 0 1 .76 1Z" />
  </svg>
);

export const CalendarIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);

export const MessageIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.16L4 21l1.84-5.4A8 8 0 1 1 21 12Z" />
  </svg>
);

export const AlertIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3 2 20h20L12 3Z" />
    <path d="M12 10v4" />
    <circle cx="12" cy="17" r="0.6" fill="currentColor" />
  </svg>
);

export const HeadsetIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 13a8 8 0 1 1 16 0v4a3 3 0 0 1-3 3h-1v-7h4" />
    <path d="M4 13v4a3 3 0 0 0 3 3h1v-7H4" />
  </svg>
);

export const ToothIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 3.5C5 3.5 3.5 5.4 4 8c.5 2.4 1 3.6 1 6 0 2.5.6 6.5 2 6.5 1.3 0 1.6-2.5 2.5-4.5.5-1 1.5-1 2 0 .9 2 1.2 4.5 2.5 4.5 1.4 0 2-4 2-6.5 0-2.4.5-3.6 1-6 .5-2.6-1-4.5-3-4.5-1.6 0-2.4 1-4 1s-2.4-1-4-1Z" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ChartIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 21h18" />
    <path d="M6 17V9" />
    <path d="M11 17V5" />
    <path d="M16 17v-6" />
    <path d="M21 17v-3" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12 4 4L19 7" />
  </svg>
);

export const SparkleIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
  </svg>
);

export const GlobeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
);

export const CardIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path d="M3 10h18" />
    <path d="M7 15h4" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

export const TransferIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h12l-3-3" />
    <path d="M20 17H8l3 3" />
  </svg>
);

export const FileIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" />
    <path d="M14 3v6h6" />
    <path d="M8 14h8M8 17h6" />
  </svg>
);

export const RefreshIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 12a9 9 0 1 1-3-6.7" />
    <path d="M21 4v5h-5" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);
