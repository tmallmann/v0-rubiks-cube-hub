import { ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { CubeMethodBrowser } from "@/components/cube-method-browser"
import { ThreeXThreeF2LCases, ThreeXThreeOLLCases, ThreeXThreePLLCases, ThreeXThreeSVCases, ThreeXThreeWVCases } from "@/lib/method-data"

export default function ThreeByThreePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-border/70 pb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Algorithm library / 3×3</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">3×3 methods</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">A complete CFOP reference. Track each case from first look to muscle memory.</p></div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><ArrowUpRight aria-hidden="true" /> Progress saves as you practice</span>
          </div>
        </header>
        <CubeMethodBrowser options={[{ key: "3x3-f2l", label: "F2L", description: "First Two Layers", cases: ThreeXThreeF2LCases }, { key: "3x3-oll", label: "OLL", description: "Orientation of Last Layer", cases: ThreeXThreeOLLCases }, { key: "3x3-pll", label: "PLL", description: "Permutation of Last Layer", cases: ThreeXThreePLLCases }, { key: "3x3-sv", label: "SV", description: "Summer Variation", cases: ThreeXThreeSVCases, rotateImage: false }, { key: "3x3-wv", label: "WV", description: "Winter Variation", cases: ThreeXThreeWVCases, rotateImage: false }]} />
      </main>
    </div>
  )
}
