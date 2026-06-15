import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/site/SectionLabel";
import {
  ArrowRightIcon,
  BookOpenIcon,
  DropletIcon,
  FrameIcon,
  GlobeIcon,
  HeartIcon,
  LayersIcon,
  PencilIcon,
  SparkIcon,
} from "@/components/ui/Icons";
import JsonLd from "@/lib/seo/jsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/seo/schema";

export const metadata = createMetadata({
  title: "About Tetra | Tetra Art",
  description:
    "Meet Tetra, a Kenyan artist from Mombasa transforming recycled denim, bottle tops, timber offcuts, and memory into sustainable visual storytelling.",
  path: "/about",
  image: "/images/IMG_3886.jpg",
});

const stats = [
  { value: "700+", label: "Jeans Repurposed", Icon: LayersIcon },
  { value: "6,732", label: "Bottle Tops Collected", Icon: DropletIcon },
  { value: "2023", label: "Eco-Art Breakthrough", Icon: SparkIcon },
  { value: "2025", label: "Shadows of Legacy", Icon: FrameIcon },
];

const journeyStages = [
  {
    year: "2018",
    tag: "Early Years",
    title: "Artistic Beginnings in Mombasa",
    Icon: PencilIcon,
    image: "/images/IMG_3057.jpg",
    text: "Long before recycled denim and timber offcuts, there was a boy in Mombasa with a pencil and an eye for the everyday. The coastline, the markets, the rhythm of daily life — everything became a sketch. Drawing in school wasn't just a pastime, it was the first language I found for telling stories that words couldn't quite carry.",
  },
  {
    year: "2020",
    tag: "2018 — Present",
    title: "Academic Foundations",
    Icon: BookOpenIcon,
    image: "/images/IMG_3076.jpg",
    text: "At Katumanga High School, my work moved off the page and onto the walls. Murals and school art projects taught me that art isn't confined to a frame — it can transform a space, shift how people feel when they walk into a room. That's where I first began exploring environmental and social themes, planting the seeds for everything that came after.",
  },
  {
    year: "2023",
    tag: "2023",
    title: "Breakthrough with Recycled Materials",
    Icon: LayersIcon,
    image: "/images/IMG_3051.jpg",
    text: "Everything changed when I picked up a pair of old jeans and saw not waste, but texture, tone, and possibility. Portraits of Nelson Mandela and Dedan Kimathi — pieced together from over 700 fragments of repurposed denim — marked a major shift toward eco-art. Sustainability stopped being a theme and became my medium.",
  },
  {
    year: "2024",
    tag: "2023 — 2024",
    title: "Community Collaboration",
    Icon: HeartIcon,
    image: "/images/IMG_1632.jpg",
    text: "Art became a shared act. Working with children in community and home programs, I led creative workshops and environmental awareness activities, collecting over 6,732 bottle tops for a large-scale collaborative installation. Watching young hands turn discarded plastic into something beautiful taught me as much as it taught them.",
  },
  {
    year: "2025",
    tag: "2025",
    title: "Shadows of Legacy",
    Icon: FrameIcon,
    image: "/images/IMG_3886.jpg",
    text: "A tribute built from timber offcuts and recycled materials, Shadows of Legacy honours figures like Wangari Maathai — voices who understood that environment and heritage are inseparable. Through sculpture and mixed media, the piece explores sustainability not as a slogan, but as a story worth telling in wood and shadow.",
  },
  {
    year: "∞",
    tag: "What's Next",
    title: "The Journey Continues",
    Icon: GlobeIcon,
    image: "/images/IMG_3903.jpg",
    text: "The work keeps evolving — larger installations, more sustainable materials, and stories that weave together culture, heritage, and the environment. Every piece is a step toward a future where waste becomes wonder, and where art doesn't just decorate a space, but changes how we see the world around us.",
  },
];

const coreValues = [
  {
    title: "Sustainability",
    Icon: DropletIcon,
    text: "Eco-friendly art practices rooted in environmental responsibility.",
  },
  {
    title: "Innovation",
    Icon: SparkIcon,
    text: "Creative transformation of materials through experimental methods.",
  },
  {
    title: "Education",
    Icon: BookOpenIcon,
    text: "Mentoring young and upcoming artists in sustainable creativity.",
  },
  {
    title: "Community",
    Icon: HeartIcon,
    text: "Collaboration and social impact through shared art-making.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-offwhite/10 bg-charcoal">
        <div className="absolute inset-0 bg-linear-to-br from-charcoal via-[#0d0b09] to-charcoal-soft" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(200,162,74,0.24),transparent_34%),radial-gradient(circle_at_18%_76%,rgba(198,90,58,0.14),transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(245,241,234,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,234,0.8)_1px,transparent_1px)] bg-[size:78px_78px]" />

        <div className="absolute inset-y-0 right-0 hidden w-[62%] lg:block">
          <img
            src="/images/IMG_3886.jpg"
            alt=""
            className="h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gold/15 mix-blend-color" />
          <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/80 to-charcoal/18" />
          <div className="absolute inset-0 bg-linear-to-t from-charcoal via-transparent to-charcoal/45" />
        </div>

        <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/88 to-charcoal/45 lg:to-charcoal/20" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-12 lg:items-center lg:px-12 lg:py-16">
          {/* Text */}
          <div className="relative z-20 flex flex-col justify-center lg:col-span-5">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              <span className="inline-block h-1.5 w-1.5 rotate-45 bg-gold" />
              Artist Profile
            </p>

            <h1 className="mt-4 font-serif text-6xl leading-[1.05] sm:text-7xl lg:text-8xl">
              Tetra
            </h1>

            <p className="mt-3 max-w-md font-serif text-xl italic leading-snug text-gold sm:text-2xl lg:text-3xl">
              From recycled materials to visual storytelling.
            </p>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-offwhite/70">
              An artist from Mombasa transforming waste materials into
              expressive visual narratives. Each piece reflects memory,
              identity, and environmental consciousness.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href="#journey"
                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-offwhite transition-colors duration-300 hover:text-gold"
              >
                View Journey
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-offwhite transition-colors duration-300 hover:text-gold"
              >
                Explore Gallery
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-offwhite transition-colors duration-300 hover:text-gold"
              >
                Contact
                <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-3 border-t border-offwhite/10 pt-5 text-[0.64rem] uppercase tracking-[0.22em] text-offwhite/45">
              <span>Denim</span>
              <span>Bottle tops</span>
              <span>Timber offcuts</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative z-10 h-[420px] sm:h-[520px] lg:col-span-7 lg:h-[560px]">
            <div className="absolute left-[6%] top-[9%] h-[78%] w-[70%] -rotate-3 overflow-hidden rounded-2xl border border-gold/20 opacity-35 shadow-2xl shadow-black/50 lg:left-[2%] lg:w-[62%]">
              <img
                src="/images/IMG_3051.jpg"
                alt=""
                className="h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-terracotta/35 mix-blend-color" />
              <div className="absolute inset-0 bg-charcoal/30" />
            </div>

            <div className="absolute right-[2%] top-[4%] h-[88%] w-[72%] rotate-2 overflow-hidden rounded-2xl border border-gold/30 shadow-2xl shadow-black/60 lg:right-[4%] lg:w-[68%]">
            <img
              src="/images/IMG_3886.jpg"
              alt="Tetra — recycled material portrait artwork"
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gold/15 mix-blend-color" />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/75 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.25em] text-gold">
                    Shadows of Legacy
                  </p>
                  <p className="mt-1 text-xs text-offwhite/70">
                    Recycled timber and mixed media
                  </p>
                </div>
                <span className="rounded-full border border-gold/40 bg-charcoal/70 px-3 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-gold backdrop-blur">
                  2025
                </span>
              </div>
            </div>

            <div className="absolute bottom-[7%] left-[2%] hidden max-w-48 rotate-[-4deg] border border-offwhite/10 bg-charcoal/70 p-4 shadow-xl shadow-black/40 backdrop-blur sm:block lg:left-[1%]">
              <p className="font-serif text-2xl text-offwhite">6,732</p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.24em] text-gold">
                collected bottle tops
              </p>
            </div>

            <span className="absolute right-[8%] top-[1%] h-3 w-3 rotate-45 bg-gold" />
            <span className="absolute bottom-[14%] right-[1%] h-14 w-px bg-offwhite/20" />
            <span className="absolute left-[26%] top-[6%] h-px w-36 -rotate-6 bg-gold/40" />
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="border-b border-offwhite/10 bg-charcoal-soft">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {stats.map(({ value, label, Icon }) => (
              <div key={label} className="flex flex-col items-center">
                <Icon className="h-6 w-6 text-gold" />
                <p className="mt-3 font-serif text-3xl sm:text-4xl">{value}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-offwhite/50">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Journey Timeline */}
      <section id="journey" className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="text-center">
          <SectionLabel align="center">My Artistic Journey</SectionLabel>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            Every Material Has a{" "}
            <span className="italic text-gold">Story to Tell.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-sand italic">
            From a sketchbook in Mombasa to installations that give waste a
            voice — here&apos;s how the work, and the meaning behind it,
            grew over time.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Line */}
          <div className="absolute left-[18px] top-2 hidden h-[calc(100%-2rem)] w-px bg-offwhite/10 sm:block" />

          <div className="space-y-14 lg:space-y-20">
            {journeyStages.map(
              ({ year, tag, title, image, text }, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={title}
                    className="relative grid gap-6 pl-12 sm:pl-16 lg:grid-cols-[1fr_1fr_auto] lg:items-center lg:gap-10 lg:pl-16"
                  >
                    {/* Marker */}
                    <span className="absolute left-0 top-0 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold bg-charcoal text-xs font-semibold text-gold sm:h-10 sm:w-10">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Image */}
                    <div
                      className={`overflow-hidden rounded-2xl border border-offwhite/10 shadow-xl ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <img
                        src={image}
                        alt={title}
                        className="h-56 w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 sm:h-64 lg:h-72"
                      />
                    </div>

                    {/* Text */}
                    <div
                      className={`flex flex-col justify-center ${
                        isEven
                          ? "lg:order-2 lg:pl-6"
                          : "lg:order-1 lg:pr-6 lg:text-right"
                      }`}
                    >
                      <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
                        {tag}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl sm:text-3xl">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-offwhite/70">
                        {text}
                      </p>
                    </div>

                    {/* Faint year marker */}
                    <div className="hidden items-center justify-center lg:order-3 lg:flex lg:w-24">
                      <span className="font-serif text-5xl text-offwhite/5">
                        {year}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Artist's Statement */}
      <section className="border-y border-offwhite/10 bg-charcoal-soft">
        <div className="mx-auto max-w-4xl space-y-4 px-6 py-20 text-center lg:px-12">
          <p className="font-serif text-xl italic leading-relaxed text-offwhite sm:text-2xl">
            &ldquo;I don&apos;t see waste — I see a story that hasn&apos;t
            been told yet.&rdquo;
          </p>
          <p className="font-serif text-xl italic leading-relaxed text-offwhite sm:text-2xl">
            &ldquo;Every offcut, every bottle top, every torn pair of jeans
            carries a second chance, and it&apos;s my job to give it a
            voice.&rdquo;
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">
            — Tetra
          </p>
        </div>
      </section>

      {/* Tetra G Arts Foundation */}
      <section className="border-t border-offwhite/10 bg-charcoal-soft">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <SectionLabel>Tetra G Arts Foundation</SectionLabel>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Where Art{" "}
                <span className="italic text-gold">Meets Power.</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-offwhite/70">
                Founded by George Njenga — known to the world as Tetra — the
                foundation grew out of a simple belief: sustainable art
                practices can do more than decorate. They mentor young
                artists, promote eco-friendly methods, and turn discarded
                materials into something with lasting value.
              </p>
              <Button href="/contact" variant="outline" className="mt-8 text-xs">
                Learn More About the Foundation
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {coreValues.map(({ title, Icon, text }, index) => (
                  <div
                    key={title}
                    className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-offwhite/10 bg-charcoal p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-2xl hover:shadow-black/30"
                  >
                    <span className="absolute -right-4 -top-4 font-serif text-6xl text-offwhite/5 transition-colors duration-300 group-hover:text-gold/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-charcoal">
                      <Icon className="h-6 w-6" />
                    </span>

                    <div className="relative">
                      <h3 className="font-serif text-xl">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-offwhite/60">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-linear-to-br from-gold to-terracotta text-charcoal">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Let&apos;s Turn Your Story Into{" "}
              <span className="italic">Something Lasting.</span>
            </h2>
            <p className="mt-3 max-w-md text-charcoal/80">
              Whether it&apos;s a commission, a collaboration, or a
              conversation about sustainable art — I&apos;d love to hear
              from you.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              href="/contact"
              variant="primary"
              className="border-charcoal! bg-charcoal! text-offwhite! hover:bg-transparent! hover:text-charcoal!"
            >
              Commission Art
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Button>
            <Button
              href="/gallery"
              variant="outline"
              className="border-charcoal! text-charcoal! hover:bg-charcoal! hover:text-offwhite!"
            >
              Explore Gallery
            </Button>
            <Button
              href="/contact"
              variant="outline"
              className="border-charcoal! text-charcoal! hover:bg-charcoal! hover:text-offwhite!"
            >
              Collaborate
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
