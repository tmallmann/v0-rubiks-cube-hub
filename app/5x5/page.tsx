import Link from "next/link"
import { ArrowLeft, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CubeMethodBrowser } from "@/components/cube-method-browser"
import { FiveXFiveL2CCases, FiveXFiveL2ECases } from "@/lib/5x5-data"

export default function FiveByFivePage() {
  return <main className="min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-100"><div className="container mx-auto flex flex-col gap-8 px-4 py-8"><header className="flex flex-col gap-4"><Link href="/"><Button variant="ghost" className="w-fit"><ArrowLeft data-icon="inline-start" />Back to Home</Button></Link><div className="flex items-start gap-4"><Zap className="mt-1 text-violet-600" /><div><h1 className="text-balance text-4xl font-bold text-foreground">5×5 Cube Methods</h1><p className="mt-2 text-pretty text-lg text-muted-foreground">Build the last centers and edges.</p></div></div></header><CubeMethodBrowser options={[{ key: "5x5-l2c", label: "L2C", description: "Last Two Centers", cases: FiveXFiveL2CCases, accent: "from-violet-100 to-fuchsia-100", rotateImage: false }, { key: "5x5-l2e", label: "L2E", description: "Last Two Edges", cases: FiveXFiveL2ECases, accent: "from-fuchsia-100 to-pink-100" }]} /></div></main>
}
