import Link from "next/link"
import { Blocks, Timer } from "lucide-react"

const links = [
  { href: "/3x3", label: "3×3" },
  { href: "/4x4", label: "4×4" },
  { href: "/5x5", label: "5×5" },
  { href: "/bld", label: "Blindfolded" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-gradient-to-b from-background to-background/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Cubing Lab home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
            <Blocks size={22} aria-hidden="true" />
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="text-base font-bold tracking-tight">Cubing Lab</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">Studio</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex min-w-0 items-center gap-1 overflow-x-auto">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {link.label}
            </Link>
          ))}
          <Link href="/timer" className="flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Timer size={18} aria-hidden="true" />
            <span>Timer</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
