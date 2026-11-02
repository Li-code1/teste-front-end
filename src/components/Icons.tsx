import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export const ShieldIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5.1 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </svg>
);
export const TruckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z" />
    <circle cx="7" cy="17.5" r="1.7" />
    <circle cx="17" cy="17.5" r="1.7" />
  </svg>
);
export const CardIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18M6.5 14.5h4" />
  </svg>
);
export const SearchIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.8-3.8" />
  </svg>
);
export const OrdersIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4h16v16H4zM4 9h16" />
    <path d="M13 14.5H8m0 0 2-2m-2 2 2 2" />
  </svg>
);
export const HeartIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
  </svg>
);
export const UserIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 18.2c1.3-2 3.2-3 5.5-3s4.2 1 5.5 3" />
  </svg>
);
export const CartIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 4h2.5l2 11h10.5l2-8H6.5" />
    <circle cx="9" cy="19" r="1.4" />
    <circle cx="17" cy="19" r="1.4" />
  </svg>
);
export const CrownIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m3 8 4.5 4L12 5l4.5 7L21 8l-2 10H5L3 8Z" />
  </svg>
);
export const ChevronLeftIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="m15 5-7 7 7 7" />
  </svg>
);
export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={2} {...p}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);
export const CloseIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.6} {...p}>
    <path d="m5 5 14 14M19 5 5 19" />
  </svg>
);
export const MinusIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.6} {...p}>
    <path d="M6 12h12" />
  </svg>
);
export const PlusIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.8} {...p}>
    <path d="M6 12h12M12 6v12" />
  </svg>
);
export const InstagramIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.6} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </svg>
);
export const FacebookIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.6} {...p}>
    <path d="M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2H8v3.5h2.5V21H14v-7.5h2.5L17 10h-3V8.5c0-.3.2-.5.5-.5Z" />
  </svg>
);
export const LinkedinIcon = (p: IconProps) => (
  <svg {...base} strokeWidth={1.6} {...p}>
    <path d="M6 10v8M6 6.5v.1M10.5 18v-8m0 3c0-2 1.5-3 3-3s3 1 3 3.2V18" />
  </svg>
);
