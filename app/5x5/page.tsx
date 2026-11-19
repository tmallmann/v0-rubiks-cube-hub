import { SiteHeader } from "@/components/site-header"
import { CubeMethodBrowser } from "@/components/cube-method-browser"
import { FiveXFiveL2CCases, FiveXFiveL2ECases } from "@/lib/5x5-data"

export default function FiveByFivePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-border/70 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Algorithm library / 5×5</p>
          <div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">5×5 methods</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Focused techniques for the final centers and edges, with room to make each algorithm your own.</p></div>
        </header>
        <CubeMethodBrowser options={[{ key: "5x5-l2c", label: "L2C", description: "Last Two Centers", cases: FiveXFiveL2CCases, rotateImage: false }, { key: "5x5-l2e", label: "L2E", description: "Last Two Edges", cases: FiveXFiveL2ECases }]} />
      </main>
    </div>
  )
}
