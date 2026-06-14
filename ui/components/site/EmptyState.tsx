import { SparkIcon } from "@/components/ui/Icons";

type EmptyStateProps = {
  title: string;
  message: string;
};

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-offwhite/15 px-6 py-16 text-center">
      <SparkIcon className="h-5 w-5 text-gold/60" />
      <p className="font-serif text-xl text-offwhite">{title}</p>
      <p className="max-w-sm text-sm text-offwhite/50">{message}</p>
    </div>
  );
}
