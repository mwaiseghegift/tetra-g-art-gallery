"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Artworks", href: "/dashboard/artworks" },
  { label: "Collections", href: "/dashboard/collections" },
  { label: "QR Codes", href: "/dashboard/qr-codes" },
  { label: "Signatures", href: "/dashboard/signatures" },
  { label: "Analytics", href: "/dashboard/analytics" },
  { label: "Settings", href: "/dashboard/settings" },
];

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/artworks": "Manage Artworks",
  "/dashboard/collections": "Collections",
  "/dashboard/qr-codes": "QR Codes",
  "/dashboard/signatures": "Signatures",
  "/dashboard/analytics": "Analytics",
  "/dashboard/settings": "Settings",
};

function pageTitle(pathname: string) {
  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith("/dashboard/artworks")) return "Artwork Editor";
  return "Dashboard";
}

export default function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/dashboard/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-offwhite/10 bg-charcoal/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <p className="font-serif text-xl text-offwhite">{pageTitle(pathname)}</p>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-medium uppercase tracking-wide text-offwhite/60 transition-colors duration-300 hover:text-gold"
          >
            View site
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center text-offwhite lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
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
              link.href === "/dashboard"
                ? pathname === "/dashboard"
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
          <Link
            href="/"
            target="_blank"
            onClick={() => setOpen(false)}
            className="py-3 text-sm font-medium uppercase tracking-wide text-offwhite/60 hover:text-gold"
          >
            View site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="py-3 text-left text-sm font-medium uppercase tracking-wide text-terracotta hover:text-terracotta/70"
          >
            Sign out
          </button>
        </nav>
      )}
    </header>
  );
}
