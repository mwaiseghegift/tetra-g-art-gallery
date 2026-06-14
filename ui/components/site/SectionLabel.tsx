import { SparkIcon } from "@/components/ui/Icons";

type SectionLabelProps = {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionLabel({
  children,
  align = "left",
  className = "",
}: SectionLabelProps) {
  return (
    <p
      className={`flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      <SparkIcon className="h-3 w-3" />
      {children}
    </p>
  );
}
