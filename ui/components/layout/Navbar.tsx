"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-offwhite/10 bg-charcoal/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                  isActive ? "text-gold" : "text-offwhite hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="outline" className="text-xs">
            Commission Art
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center text-offwhite lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="sr-only">Toggle menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-offwhite/10 px-6 pb-6 lg:hidden">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                  isActive ? "text-gold" : "text-offwhite hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button
            href="/contact"
            variant="outline"
            className="mt-4 w-full text-xs"
            onClick={() => setOpen(false)}
          >
            Commission Art
          </Button>
        </nav>
      )}
    </header>
  );
}
