import type { ComponentPropsWithoutRef } from "react";

type TextareaProps = ComponentPropsWithoutRef<"textarea"> & {
  label?: string;
  hint?: string;
};

export default function Textarea({ label, hint, id, className = "", ...props }: TextareaProps) {
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      {label && (
        <span className="text-xs font-medium uppercase tracking-wide text-sand">
          {label}
        </span>
      )}
      <textarea
        id={id}
        className={`min-h-28 rounded-lg border border-offwhite/15 bg-charcoal-soft px-4 py-2.5 text-sm text-offwhite placeholder:text-offwhite/30 outline-none transition-colors duration-300 focus:border-gold ${className}`}
        {...props}
      />
      {hint && <span className="text-xs text-offwhite/40">{hint}</span>}
    </label>
  );
}
