import type {ReactNode, SVGProps} from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon({children, ...props}: IconProps & {children: ReactNode}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      {children}
    </svg>
  );
}

export const Sparkles = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
    <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
    <path d="M5 14l.7 1.8L7.5 16.5l-1.8.7L5 19l-.7-1.8L2.5 16.5l1.8-.7L5 14Z" />
  </Icon>
);

export const Rocket = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14 4c3.5-1.3 6 1.2 6 6 0 4.5-3.6 8.4-8 10l-4-4C9.5 11.6 10.8 6.1 14 4Z" />
    <circle cx="15.5" cy="8.5" r="1.6" />
    <path d="M8 16l-2 2M6 14l-2 2M12 20l-2 2" />
  </Icon>
);

export const BookOpen = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z" />
    <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z" />
  </Icon>
);

export const Wrench = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14.5 6.5a4.5 4.5 0 0 0-5.9 5.9L3 18l3 3 5.6-5.6a4.5 4.5 0 0 0 5.9-5.9l-2.8 2.8-2.9-2.9 2.7-2.9Z" />
  </Icon>
);

export const Code = (p: IconProps) => (
  <Icon {...p}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </Icon>
);

export const MapIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9 4-6 3v13l6-3 6 3 6-3V4l-6 3-6-3Z" />
    <path d="M9 4v13M15 7v13" />
  </Icon>
);

export const Cpu = (p: IconProps) => (
  <Icon {...p}>
    <rect x="6" y="6" width="12" height="12" rx="3" />
    <rect x="10" y="10" width="4" height="4" rx="1" />
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
  </Icon>
);

export const Compass = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </Icon>
);

export const Bot = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="7" width="16" height="12" rx="4" />
    <path d="M12 3v4M8 13h.01M16 13h.01M9 17h6" />
    <path d="M2 12v3M22 12v3" />
  </Icon>
);

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Icon>
);

export const Github = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 19c-4 1.2-4-2.2-6-2.7M15 21v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6A4.7 4.7 0 0 0 18.7 6a4.4 4.4 0 0 0-.1-3.3s-1.1-.3-3.6 1.4a12.4 12.4 0 0 0-6.4 0C6.2 2.4 5.1 2.7 5.1 2.7A4.4 4.4 0 0 0 5 6a4.7 4.7 0 0 0-1.3 3.3c0 4.6 2.7 5.7 5.5 6-.5.5-.6 1.2-.6 2V21" />
  </Icon>
);

export const Download = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
  </Icon>
);

export const Layers = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
  </Icon>
);

export const Shield = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const Battery = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2" y="7" width="17" height="10" rx="3" />
    <path d="M22 10v4M6 10v4M10 10v4M14 10v4" />
  </Icon>
);

export const Sliders = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 6h7M15 6h5M4 12h3M11 12h9M4 18h11M19 18h1" />
    <circle cx="13" cy="6" r="2" />
    <circle cx="9" cy="12" r="2" />
    <circle cx="17" cy="18" r="2" />
  </Icon>
);

export const LifeBuoy = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <path d="m5.6 5.6 3.8 3.8M14.6 14.6l3.8 3.8M18.4 5.6l-3.8 3.8M9.4 14.6l-3.8 3.8" />
  </Icon>
);

export const Search = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </Icon>
);

export const Plus = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const Check = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12 4 4L19 6" />
  </Icon>
);

export const Book = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" />
    <path d="M5 17a3 3 0 0 1 3-3h11" />
  </Icon>
);
