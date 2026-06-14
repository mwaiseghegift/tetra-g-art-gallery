import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v3h2v8h3v-8h3l1-3h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2H21.5l-7.5 8.57L22 22h-6.91l-5.4-7.06L3.5 22H0.24l8.04-9.18L2 2h6.91l4.88 6.44L18.244 2Zm-2.43 18h1.7L8.27 4H6.46l9.354 16Z" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5l4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TiktokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 3h2.2c.2 1.6 1.2 3 2.8 3.6V9c-1.5 0-2.9-.5-4-1.3v6.2a5 5 0 1 1-4-4.9v2.2a2.8 2.8 0 1 0 2 2.7V3Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function PinterestIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-3.6 19.3c-.05-.8-.1-2 .03-2.9.13-.9.85-3.8.85-3.8s-.22-.43-.22-1.07c0-1 .58-1.75 1.3-1.75.6 0 .9.46.9 1 0 .6-.4 1.5-.6 2.35-.17.7.36 1.27 1.05 1.27 1.27 0 2.25-1.34 2.25-3.27 0-1.7-1.23-2.9-2.98-2.9-2.03 0-3.22 1.52-3.22 3.1 0 .6.23 1.25.5 1.6a.4.4 0 0 1 .1.39c-.1.4-.3 1.25-.35 1.43-.06.23-.2.28-.43.17-1.2-.56-1.96-2.3-1.96-3.7 0-3 2.18-5.76 6.3-5.76 3.3 0 5.87 2.35 5.87 5.5 0 3.3-2.07 5.94-4.96 5.94-1 0-1.92-.5-2.24-1.16 0 0-.53 2.04-.66 2.53-.2.83-.86 1.86-1.27 2.5A10 10 0 1 0 12 2Z" />
    </svg>
  );
}
