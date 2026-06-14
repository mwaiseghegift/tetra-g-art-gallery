import type { ComponentPropsWithoutRef } from "react";

type CardProps = ComponentPropsWithoutRef<"div">;

export default function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-offwhite/10 bg-charcoal-soft p-6 ${className}`}
      {...props}
    />
  );
}
