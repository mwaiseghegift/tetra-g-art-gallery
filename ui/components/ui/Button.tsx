import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "outline";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-charcoal border border-gold hover:bg-transparent hover:text-gold",
  outline:
    "bg-transparent text-offwhite border border-offwhite/30 hover:border-gold hover:text-gold",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium uppercase tracking-wide transition-colors duration-300";

type ButtonProps = {
  variant?: ButtonVariant;
} & (
  | ({ href: string } & ComponentPropsWithoutRef<typeof Link>)
  | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
);

export default function Button({
  variant = "primary",
  className = "",
  href,
  ...props
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<ComponentPropsWithoutRef<typeof Link>, "href">)}
      />
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)} />
  );
}
