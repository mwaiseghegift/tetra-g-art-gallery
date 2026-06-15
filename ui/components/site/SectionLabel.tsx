import type { ReactNode } from "react";
import { SparkIcon } from "@/components/ui/Icons";

type SectionLabelProps = {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  icon?: ReactNode;
};

export default function SectionLabel({
  children,
  align = "left",
  className = "",
  icon,
}: SectionLabelProps) {
  return (
    <p
      className={`flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      {icon ?? <SparkIcon className="h-3 w-3" />}
      {children}
    </p>
  );
}
