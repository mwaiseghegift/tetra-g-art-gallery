import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteBackdrop from "@/components/layout/SiteBackdrop";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="relative isolate flex-1 overflow-hidden">
        <SiteBackdrop />
        <main className="relative z-10 flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
