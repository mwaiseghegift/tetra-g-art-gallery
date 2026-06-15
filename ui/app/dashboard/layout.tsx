import { createMetadata } from "@/lib/seo/metadata";
import DashboardShell from "./DashboardShell";

export const metadata = createMetadata({
  title: "Admin Dashboard | Tetra Art",
  description: "Private Tetra Art dashboard for managing artworks.",
  path: "/dashboard",
  noIndex: true,
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
