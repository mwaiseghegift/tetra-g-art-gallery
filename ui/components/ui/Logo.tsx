import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-baseline gap-2 leading-none">
      <span className="font-serif text-2xl italic text-offwhite">Tetra</span>
      <span className="text-[0.65rem] font-medium tracking-[0.3em] text-gold uppercase">
        Art Gallery
      </span>
    </Link>
  );
}
