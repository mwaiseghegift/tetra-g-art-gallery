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
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-offwhite/10 bg-charcoal">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
          {/* Text */}
          <div className="flex flex-col justify-center px-6 py-16 lg:px-12 lg:py-24">
            <SectionLabel>Let&apos;s Connect</SectionLabel>

            <h1 className="mt-4 font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Get In Touch <br />
              With <span className="italic text-gold">Tetra</span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-offwhite/70">
              Whether it&apos;s a commission, collaboration, or creative
              inquiry — every message becomes part of the journey.
            </p>
          </div>

          {/* Image */}
          <div className="relative h-72 sm:h-96 lg:h-auto lg:min-h-120">
            <img
              src="/images/IMG_3886.jpg"
              alt="Tetra at work — recycled material art with gold accents"
              className="absolute inset-0 h-full w-full scale-125 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gold/10 mix-blend-color" />
            <div className="absolute inset-0 bg-linear-to-r from-charcoal from-0% via-charcoal/60 via-35% to-transparent to-80%" />
            <div className="absolute inset-0 bg-linear-to-t from-charcoal/40 via-transparent to-transparent" />
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
