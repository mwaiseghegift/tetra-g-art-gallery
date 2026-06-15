import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { directContactDetails, socialLinks } from "@/lib/data/info.data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const email = directContactDetails.find((item) => item.name === "Email");

export default function Footer() {
  return (
    <footer className="border-t border-offwhite/10 bg-charcoal-soft">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-offwhite/60">
              Art is identity. Every piece has a story. Every story has a
              soul.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-offwhite/70 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Connect
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map(({ name, url, icon: Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-offwhite/15 text-offwhite/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            {email && (
              <a
                href={email.url}
                className="mt-4 flex items-center gap-2 text-sm text-offwhite/70 transition-colors duration-300 hover:text-gold"
              >
                <email.icon className="h-4 w-4" />
                {email.value}
              </a>
            )}
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Stay Inspired
            </h3>
            <p className="mt-4 text-sm text-offwhite/70">
              Get updates on new artworks, exhibitions and stories.
            </p>
            <form className="mt-4 flex overflow-hidden rounded-md border border-offwhite/15 focus-within:border-gold">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent px-4 py-2 text-sm text-offwhite placeholder:text-offwhite/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex items-center justify-center bg-gold px-4 text-charcoal transition-colors duration-300 hover:bg-terracotta"
              >
                →
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-offwhite/10 pt-6 text-center text-xs text-offwhite/50 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Tetra Art Gallery. All rights reserved.</p>
          <p>All artworks are uniquely signed and digitally verified by Tetra.</p>
        </div>
      </div>
    </footer>
  );
}
