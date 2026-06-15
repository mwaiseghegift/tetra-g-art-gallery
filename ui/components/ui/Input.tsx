import type { ComponentPropsWithoutRef, ReactNode } from "react";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  hint?: string;
  icon?: ReactNode;
};

export default function Input({ label, hint, icon, id, className = "", ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      {label && (
        <span className="text-xs font-medium uppercase tracking-wide text-sand">
          {label}
        </span>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-offwhite/40">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`w-full rounded-lg border border-offwhite/15 bg-charcoal-soft px-4 py-2.5 text-sm text-offwhite placeholder:text-offwhite/30 outline-none transition-colors duration-300 focus:border-gold ${icon ? "pl-11" : ""} ${className}`}
          {...props}
        />
      </div>
      {hint && <span className="text-xs text-offwhite/40">{hint}</span>}
    </label>
  );
}
