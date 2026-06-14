import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <section className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/80 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-12">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
          African Stories. Global Soul.
        </p>

        <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
          Art That Lives Beyond{" "}
          <span className="italic text-gold">the Canvas.</span>
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-sand">
          I create art rooted in emotion, identity, and African storytelling
          traditions reimagined for the digital age.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/gallery" variant="primary">
            Explore Gallery
          </Button>
          <Button href="/about" variant="outline">
            Meet the Artist
          </Button>
        </div>
      </div>
    </section>
  );
}
