"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import {
  ChartIcon,
  GearIcon,
  GridIcon,
  LayersIcon,
  PaletteIcon,
  QrIcon,
  ShieldCheckIcon,
} from "@/components/ui/Icons";
import { useAuth } from "@/lib/auth/AuthContext";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: GridIcon },
  { label: "Artworks", href: "/dashboard/artworks", icon: PaletteIcon },
  { label: "Collections", href: "/dashboard/collections", icon: LayersIcon },
  { label: "QR Codes", href: "/dashboard/qr-codes", icon: QrIcon },
  { label: "Signatures", href: "/dashboard/signatures", icon: ShieldCheckIcon },
  { label: "Analytics", href: "/dashboard/analytics", icon: ChartIcon },
  { label: "Settings", href: "/dashboard/settings", icon: GearIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/dashboard/login");
  }

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-offwhite/10 bg-charcoal-soft lg:flex">
      <div className="px-6 py-6">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${
                isActive
                  ? "bg-gold/10 text-gold"
                  : "text-offwhite/70 hover:bg-offwhite/5 hover:text-offwhite"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-offwhite/10 px-6 py-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 font-serif text-sm text-gold">
            {(user?.username ?? "?").slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm text-offwhite/80">{user?.username}</p>
            <p className="text-xs text-offwhite/40">Signed in as admin</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 text-xs font-medium uppercase tracking-wide text-terracotta transition-colors duration-300 hover:text-terracotta/70"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
