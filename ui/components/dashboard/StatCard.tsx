import Card from "@/components/ui/Card";

type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
};

export default function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-sand">{label}</p>
      <p className="mt-3 font-serif text-4xl text-offwhite">{value}</p>
      {hint && <p className="mt-2 text-xs text-offwhite/40">{hint}</p>}
    </Card>
  );
}
