import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full py-6 border-b border-secondary/10">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
          Pencil Art
        </Link>
        <div className="flex gap-8 text-sm font-medium text-secondary">
          <Link href="/" className="hover:text-primary transition-colors">
            Work
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/order" className="hover:text-primary transition-colors">
            Order Art
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
