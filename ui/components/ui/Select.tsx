import type { ComponentPropsWithoutRef } from "react";

type SelectProps = ComponentPropsWithoutRef<"select"> & {
  label?: string;
};

export default function Select({ label, id, className = "", children, ...props }: SelectProps) {
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      {label && (
        <span className="text-xs font-medium uppercase tracking-wide text-sand">
          {label}
        </span>
      )}
      <select
        id={id}
        className={`rounded-lg border border-offwhite/15 bg-charcoal-soft px-4 py-2.5 text-sm text-offwhite outline-none transition-colors duration-300 focus:border-gold ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
