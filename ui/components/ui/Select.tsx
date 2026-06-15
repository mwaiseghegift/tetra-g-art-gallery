import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ChevronRightIcon } from "@/components/ui/Icons";

type SelectProps = ComponentPropsWithoutRef<"select"> & {
  label?: string;
  icon?: ReactNode;
};

export default function Select({ label, icon, id, className = "", children, ...props }: SelectProps) {
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
        <select
          id={id}
          className={`w-full appearance-none rounded-lg border border-offwhite/15 bg-charcoal-soft px-4 py-2.5 text-sm text-offwhite outline-none transition-colors duration-300 focus:border-gold ${icon ? "pl-11" : ""} pr-11 ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronRightIcon className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-offwhite/40" />
      </div>
    </label>
  );
}
