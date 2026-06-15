"use client";

import { useEffect } from "react";
import Link from "next/link";
import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full bg-charcoal text-offwhite font-sans">
        <title>Application Error | Tetra Art</title>
        <main className="flex min-h-screen items-center justify-center px-6 py-16">
          <section className="w-full max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Application Error
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">
              The gallery could not open.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-sand">
              A root-level error interrupted the app shell. Retry the page, or
              return home to start from a fresh route.
            </p>
            {error.digest && (
              <p className="mx-auto mt-4 max-w-md rounded-md border border-offwhite/10 bg-charcoal-soft px-4 py-3 font-mono text-xs text-offwhite/45">
                Error digest: {error.digest}
              </p>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={unstable_retry}
                className="inline-flex items-center justify-center rounded-md border border-gold bg-gold px-6 py-3 text-sm font-medium uppercase tracking-wide text-charcoal transition-colors duration-300 hover:bg-transparent hover:text-gold"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md border border-offwhite/30 bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-wide text-offwhite transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                Return Home
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
