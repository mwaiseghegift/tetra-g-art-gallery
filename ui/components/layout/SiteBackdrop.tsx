type SiteBackdropProps = {
  className?: string;
};

export default function SiteBackdrop({ className = "" }: SiteBackdropProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/IMG_3886.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center grayscale"
      />
      <div className="absolute inset-0 bg-gold/15 mix-blend-color" />
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/92 via-charcoal/84 to-charcoal/96" />
      <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/86 to-charcoal/62" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(200,162,74,0.18),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(245,241,234,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,234,0.75)_1px,transparent_1px)] bg-[size:76px_76px]" />
      <div className="absolute inset-y-0 left-0 hidden w-4 bg-tribal-pattern opacity-40 lg:block" />
      <div className="absolute inset-y-0 right-0 hidden w-4 bg-tribal-pattern opacity-40 lg:block" />
    </div>
  );
}
