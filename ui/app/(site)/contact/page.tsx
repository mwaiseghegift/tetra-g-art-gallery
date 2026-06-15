import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import SectionLabel from "@/components/site/SectionLabel";
import {
  ArrowRightIcon,
  BrushIcon,
  HandshakeIcon,
  ImageIcon,
  LeafIcon,
  ListIcon,
  PencilIcon,
  SendIcon,
  UserIcon,
} from "@/components/ui/Icons";
import { MailIcon } from "@/components/ui/SocialIcons";
import { directContactDetails, socialLinks } from "@/lib/data/info.data";
import JsonLd from "@/lib/seo/jsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, personSchema } from "@/lib/seo/schema";

export const metadata = createMetadata({
  title: "Contact Tetra | Tetra Art",
  description:
    "Contact Tetra for commissions, exhibitions, collaborations, sustainable art projects, and questions about original verified artworks.",
  path: "/contact",
  image: "/images/IMG_3886.jpg",
});

const contactReasons = [
  {
    title: "Commissions",
    Icon: BrushIcon,
    text: "Custom artwork using recycled materials and storytelling techniques tailored to your vision.",
  },
  {
    title: "Exhibitions",
    Icon: ImageIcon,
    text: "Gallery showcases, installations, and art events. Let's bring art spaces to life together.",
  },
  {
    title: "Collaborations",
    Icon: HandshakeIcon,
    text: "Creative partnerships with brands, communities, and institutions for meaningful impact.",
  },
  {
    title: "Impact Projects",
    Icon: LeafIcon,
    text: "Sustainability-driven art initiatives that inspire awareness and create real change.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-offwhite/10 bg-charcoal">
        <div className="absolute inset-0 bg-linear-to-br from-charcoal via-[#0d0b09] to-charcoal-soft" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(200,162,74,0.26),transparent_34%),radial-gradient(circle_at_18%_80%,rgba(198,90,58,0.16),transparent_30%)]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(245,241,234,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,234,0.75)_1px,transparent_1px)] bg-[size:82px_82px]" />

        <div className="absolute inset-y-0 right-0 hidden w-[62%] lg:block">
          <img
            src="/images/IMG_3886.jpg"
            alt=""
            className="h-full w-full scale-110 object-cover object-center grayscale"
          />
          <div className="absolute inset-0 bg-gold/15 mix-blend-color" />
          <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/82 to-charcoal/20" />
          <div className="absolute inset-0 bg-linear-to-t from-charcoal via-transparent to-charcoal/40" />
        </div>

        <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/90 to-charcoal/35 lg:to-charcoal/15" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-12 lg:items-center lg:px-12 lg:py-16">
          {/* Text */}
          <div className="relative z-20 flex flex-col justify-center lg:col-span-5">
            <SectionLabel>Let&apos;s Connect</SectionLabel>

            <h1 className="mt-4 font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Get In Touch <br />
              With <span className="italic text-gold">Tetra</span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-offwhite/70">
              Whether it&apos;s a commission, collaboration, or creative
              inquiry — every message becomes part of the journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Commissions", "Exhibitions", "Collaborations"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-offwhite/15 bg-offwhite/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-offwhite/60 backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-3 border-t border-offwhite/10 pt-5 text-[0.64rem] uppercase tracking-[0.22em] text-offwhite/45">
              <span>Nyeri, Kenya</span>
              <span>Originals</span>
              <span>Eco-art</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative z-10 h-[420px] sm:h-[520px] lg:col-span-7 lg:h-[540px]">
            <div className="absolute left-[3%] top-[11%] h-[76%] w-[58%] -rotate-6 overflow-hidden rounded-2xl border border-gold/20 opacity-50 shadow-2xl shadow-black/50">
              <img
                src="/images/IMG_3057.jpg"
                alt=""
                className="h-full w-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-terracotta/35 mix-blend-color" />
              <div className="absolute inset-0 bg-charcoal/35" />
            </div>

            <div className="absolute right-[3%] top-[5%] h-[84%] w-[72%] rotate-2 overflow-hidden rounded-2xl border border-gold/30 shadow-2xl shadow-black/60 lg:right-[5%] lg:w-[66%]">
              <img
                src="/images/IMG_3886.jpg"
                alt="Tetra at work — recycled material art with gold accents"
                className="absolute inset-0 h-full w-full scale-110 object-cover object-center grayscale"
              />
              <div className="absolute inset-0 bg-gold/15 mix-blend-color" />
              <div className="absolute inset-0 bg-linear-to-t from-charcoal/78 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.25em] text-gold">
                    Open Studio
                  </p>
                  <p className="mt-1 text-xs text-offwhite/70">
                    Commissions, exhibitions, and impact projects
                  </p>
                </div>
                <span className="rounded-full border border-gold/40 bg-charcoal/70 px-3 py-1 text-[0.58rem] uppercase tracking-[0.18em] text-gold backdrop-blur">
                  Contact
                </span>
              </div>
            </div>

            <div className="absolute bottom-[8%] left-[1%] hidden max-w-52 rotate-[-4deg] border border-offwhite/10 bg-charcoal/75 p-4 shadow-xl shadow-black/40 backdrop-blur sm:block">
              <MailIcon className="h-5 w-5 text-gold" />
              <p className="mt-3 font-serif text-xl text-offwhite">Start a conversation</p>
              <p className="mt-2 text-[0.62rem] uppercase tracking-[0.22em] text-offwhite/45">
                Every story begins with a message
              </p>
            </div>

            <span className="absolute right-[9%] top-[2%] h-3 w-3 rotate-45 bg-gold" />
            <span className="absolute bottom-[16%] right-[1%] h-14 w-px bg-offwhite/20" />
            <span className="absolute left-[22%] top-[7%] h-px w-36 -rotate-6 bg-gold/40" />
          </div>
        </div>
      </section>

      {/* Form + Direct Connection */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="rounded-2xl border border-offwhite/10 bg-charcoal-soft p-6 sm:p-10 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Send a Message */}
            <div className="lg:col-span-7">
              <SectionLabel icon={<SendIcon className="h-3.5 w-3.5" />}>
                Send a Message
              </SectionLabel>

              <form className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    aria-label="Full Name"
                    icon={<UserIcon className="h-4 w-4" />}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    aria-label="Email Address"
                    icon={<MailIcon className="h-4 w-4" />}
                  />
                </div>

                <Select name="subject" aria-label="Subject" defaultValue="" icon={<ListIcon className="h-4 w-4" />}>
                  <option value="" disabled>
                    Subject
                  </option>
                  <option value="commission">Commission</option>
                  <option value="exhibition">Exhibition</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="impact">Impact Project</option>
                  <option value="other">Other</option>
                </Select>

                <Textarea
                  name="message"
                  placeholder="Your Message"
                  aria-label="Your Message"
                  rows={6}
                  icon={<PencilIcon className="h-4 w-4" />}
                />

                <Button type="submit" variant="primary">
                  Send Message
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Button>
              </form>
            </div>

            {/* Direct Connection */}
            <div className="lg:col-span-5">
              <SectionLabel icon={<UserIcon className="h-3.5 w-3.5" />}>
                Direct Connection
              </SectionLabel>

              <div className="mt-6 divide-y divide-offwhite/10">
                {directContactDetails.map(({ name, value, url, icon: Icon }) => (
                  <a
                    key={name}
                    href={url}
                    className="flex items-center gap-4 py-4 transition-colors duration-300 first:pt-0 hover:text-gold"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-offwhite/50">
                        {name}
                      </p>
                      <p className="mt-1 text-sm text-offwhite">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <h3 className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Follow and Connect
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ name, url, icon: Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/15 text-offwhite/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <blockquote className="mt-10">
                <p className="font-serif text-xl italic leading-snug text-offwhite sm:text-2xl">
                  &ldquo;Art speaks when words fall short.&rdquo;
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold">
                  — Tetra
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* What can you contact me for */}
      <section className="border-t border-offwhite/10 bg-charcoal-soft">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
          <SectionLabel align="center">What Can You Contact Me For?</SectionLabel>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactReasons.map(({ title, Icon, text }) => (
              <div
                key={title}
                className="group flex flex-col gap-5 rounded-2xl border border-offwhite/10 bg-charcoal p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-2xl hover:shadow-black/30"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-charcoal">
                  <Icon className="h-6 w-6" />
                </span>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.15em]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-offwhite/60">
                    {text}
                  </p>
                </div>

                <span className="mt-auto block h-px w-10 bg-gold/40 transition-all duration-300 group-hover:w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-linear-to-br from-gold to-terracotta text-charcoal">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            Let&apos;s Turn Ideas Into Art
          </h2>
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
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Button>
            <Button
              href="/about#journey"
              variant="outline"
              className="border-charcoal! text-charcoal! hover:bg-charcoal! hover:text-offwhite!"
            >
              View Journey
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
