import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { SearchIcon, ShieldCheckIcon } from "@/components/ui/Icons";
import SiteBackdrop from "./SiteBackdrop";

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
      <SiteBackdrop />

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
