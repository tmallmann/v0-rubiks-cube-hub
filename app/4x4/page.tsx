import { ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { CubeMethodBrowser } from "@/components/cube-method-browser"
import { FourXFourOLLCases, FourXFourPLLCases } from "@/lib/method-data"

export default function FourByFourPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-border/70 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Algorithm library / 4×4</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">4×4 parity</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Visual case recognition and parity algorithms, organized for fast reference and steady practice.</p></div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><ArrowUpRight aria-hidden="true" /> Progress saves as you practice</span>
          </div>
        </header>
        <CubeMethodBrowser options={[{ key: "4x4-oll-parity", label: "OLL Parity", description: "27 cases", algorithmDescription: "OLL Parity Algorithm: [*] = Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'", cases: FourXFourOLLCases, rotateImage: false }, { key: "4x4-pll-parity", label: "PLL Parity", description: "22 cases", algorithmDescription: "PLL Parity Algorithm: [*] = 2R2 U2 2R2 Uw2 2R2 Uw2", cases: FourXFourPLLCases, rotateImage: false }]} />
      </main>
    </div>
  )
}
