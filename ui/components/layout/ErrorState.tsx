import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { SearchIcon, ShieldCheckIcon } from "@/components/ui/Icons";

type ErrorStateAction =
  | {
      label: string;
      href: string;
      variant?: "primary" | "outline";
      icon?: ReactNode;
    }
  | {
      label: string;
      onClick: () => void;
      variant?: "primary" | "outline";
      icon?: ReactNode;
    };

type ErrorStateProps = {
  eyebrow: string;
  title: string;
  message: string;
  code?: string;
  details?: string;
  actions?: ErrorStateAction[];
  compact?: boolean;
};

export default function ErrorState({
  eyebrow,
  title,
  message,
  code,
  details,
  actions = [],
  compact = false,
}: ErrorStateProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-8rem)] items-center overflow-hidden border-b border-offwhite/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/IMG_3886.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center grayscale"
      />
      <div className="absolute inset-0 bg-gold/15 mix-blend-color" />
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/92 via-charcoal/84 to-charcoal/96" />
      <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/86 to-charcoal/62" />
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(245,241,234,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,234,0.75)_1px,transparent_1px)] bg-[size:76px_76px]" />
      <div className="absolute inset-y-0 left-0 hidden w-4 bg-tribal-pattern opacity-40 lg:block" />
      <div className="absolute inset-y-0 right-0 hidden w-4 bg-tribal-pattern opacity-40 lg:block" />

      <div
        className={`relative mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:px-12 ${
          compact ? "lg:grid-cols-1" : ""
        }`}
      >
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-sand">
            {message}
          </p>

          {details && (
            <p className="mt-4 max-w-xl rounded-md border border-offwhite/10 bg-charcoal/50 px-4 py-3 font-mono text-xs text-offwhite/45">
              {details}
            </p>
          )}

          {actions.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {actions.map((action) => {
                const children = (
                  <>
                    {action.label}
                    {action.icon}
                  </>
                );

                if ("href" in action) {
                  return (
                    <Button
                      key={action.label}
                      href={action.href}
                      variant={action.variant}
                      className="text-xs"
                    >
                      {children}
                    </Button>
                  );
                }

                return (
                  <Button
                    key={action.label}
                    type="button"
                    onClick={action.onClick}
                    variant={action.variant}
                    className="text-xs"
                  >
                    {children}
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        {!compact && (
          <div className="rounded-2xl border border-gold/30 bg-charcoal/70 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-center justify-between gap-4 border-b border-offwhite/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-sand">
                  Signal
                </p>
                <p className="mt-1 font-serif text-3xl text-offwhite">
                  {code || "Error"}
                </p>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
                {code === "404" ? (
                  <SearchIcon className="h-5 w-5" />
                ) : (
                  <ShieldCheckIcon className="h-5 w-5" />
                )}
              </span>
            </div>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-gold">
                  Status
                </dt>
                <dd className="mt-1 text-sm text-offwhite/70">
                  {code === "404" ? "Record not found" : "Recovery available"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-gold">
                  Next Step
                </dt>
                <dd className="mt-1 text-sm text-offwhite/70">
                  Use the actions here to return to the gallery, dashboard, or
                  retry the request.
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
