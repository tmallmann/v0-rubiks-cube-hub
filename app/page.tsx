import Link from "next/link"
import { ArrowUpRight, Brain, Layers3, Timer, Trophy } from "lucide-react"
import { SiteHeader } from "@/components/site-header"

const collections = [
  {
    href: "/3x3",
    number: "01",
    title: "3×3 methods",
    description: "Build efficient solves with a complete CFOP reference, from F2L pairs through last-layer cases.",
    tags: ["F2L", "OLL", "PLL"],
    tone: "text-sky-300 bg-sky-400/10 border-sky-300/20",
  },
  {
    href: "/4x4",
    number: "02",
    title: "4×4 parity",
    description: "Keep OLL and PLL parity cases at hand, with quick-reference algorithms and visual patterns.",
    tags: ["OLL parity", "PLL parity"],
    tone: "text-emerald-300 bg-emerald-400/10 border-emerald-300/20",
  },
  {
    href: "/5x5",
    number: "03",
    title: "5×5 methods",
    description: "A focused reference for last-two-center and last-two-edge solving techniques.",
    tags: ["L2C", "L2E"],
    tone: "text-violet-300 bg-violet-400/10 border-violet-300/20",
  },
  {
    href: "/bld",
    number: "04",
    title: "Blindfolded solving",
    description: "Organize letter pairs, flips, and twists for a personal blindfolded-solving system.",
    tags: ["Letter pairs", "Memory"],
    tone: "text-amber-300 bg-amber-400/10 border-amber-300/20",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card px-6 py-10 shadow-2xl shadow-black/10 sm:px-10 sm:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <Layers3 aria-hidden="true" /> The cubing reference desk
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Every case. One place to get faster.</h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              A clear, personal workspace for cube algorithms, blindfolded memo, and solve practice. Mark what you&apos;re learning and see your progress case by case.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/3x3" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/10 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                Browse algorithms <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link href="/timer" className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Timer aria-hidden="true" /> Open timer
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="collections-heading" className="flex flex-col gap-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Your workspace</p>
              <h2 id="collections-heading" className="mt-2 text-2xl font-semibold tracking-tight">Choose a collection</h2>
            </div>
            <p className="text-sm text-muted-foreground">Progress is color-coded on every algorithm card</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {collections.map((collection) => (
              <Link key={collection.href} href={collection.href} className="group rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs text-muted-foreground">/{collection.number}</span>
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground">Reference library</span>
                </div>
                <div className="mt-7 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{collection.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{collection.description}</p>
                  </div>
                  {collection.href === "/bld" ? <Brain aria-hidden="true" className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary" /> : <ArrowUpRight aria-hidden="true" className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {collection.tags.map((tag) => <span key={tag} className={`rounded-full border px-2.5 py-1 text-xs font-medium ${collection.tone}`}>{tag}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-3 border-t border-border/70 pt-6 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl bg-card/70 p-4"><Trophy aria-hidden="true" className="text-primary" /><div><p className="text-sm font-medium">Learn at your pace</p><p className="mt-0.5 text-xs text-muted-foreground">Three clear states for every case</p></div></div>
          <div className="flex items-center gap-3 rounded-xl bg-card/70 p-4"><Layers3 aria-hidden="true" className="text-primary" /><div><p className="text-sm font-medium">Organized by method</p><p className="mt-0.5 text-xs text-muted-foreground">Focused collections for each cube</p></div></div>
          <div className="flex items-center gap-3 rounded-xl bg-card/70 p-4"><Timer aria-hidden="true" className="text-primary" /><div><p className="text-sm font-medium">Practice in context</p><p className="mt-0.5 text-xs text-muted-foreground">A timer right beside your library</p></div></div>
        </section>
      </main>
    </div>
  )
}
