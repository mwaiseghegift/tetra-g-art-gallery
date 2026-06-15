"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { useAuth } from "@/lib/auth/AuthContext";

export default function DashboardShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const isLoginPage = pathname === "/dashboard/login";

  useEffect(() => {
    if (isLoading || isLoginPage) return;
    if (!user || !user.is_staff) {
      router.replace("/dashboard/login");
    }
  }, [isLoading, isLoginPage, user, router]);

  if (isLoginPage) {
    return <main className="flex-1">{children}</main>;
  }

  if (isLoading || !user || !user.is_staff) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p className="text-sm uppercase tracking-wide text-offwhite/50">
          Loading dashboard…
        </p>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
