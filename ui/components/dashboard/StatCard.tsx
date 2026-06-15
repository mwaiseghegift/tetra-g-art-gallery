import type { ReactNode } from "react";
import Card from "@/components/ui/Card";

type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
};

export default function StatCard({ label, value, hint, icon }: StatCardProps) {
  return (
    <Card className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sand">{label}</p>
        <p className="mt-3 font-serif text-4xl text-offwhite">{value}</p>
        {hint && <p className="mt-2 text-xs text-offwhite/40">{hint}</p>}
      </div>
      {icon && (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
          {icon}
        </span>
      )}
    </Card>
  );
}
