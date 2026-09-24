import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap } from "lucide-react"
import { CubeMethodBrowser } from "@/components/cube-method-browser"
import { ThreeXThreeF2LCases, ThreeXThreeOLLCases, ThreeXThreePLLCases } from "@/lib/method-data"

export default function ThreeByThreePage() {
  return <main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100"><div className="container mx-auto flex flex-col gap-8 px-4 py-8"><header className="flex flex-col gap-4"><Link href="/"><Button variant="ghost" className="w-fit"><ArrowLeft data-icon="inline-start" />Back to Home</Button></Link><div className="flex items-start gap-4"><Zap className="mt-1 text-orange-600" /><div><h1 className="text-balance text-4xl font-bold text-foreground">3×3 Cube Methods</h1><p className="mt-2 text-pretty text-lg text-muted-foreground">Solve the cube using the best CFOP algorithms.</p></div></div></header><CubeMethodBrowser options={[{ key: "3x3-f2l", label: "F2L", description: "First Two Layers", cases: ThreeXThreeF2LCases, accent: "from-orange-100 to-red-100" }, { key: "3x3-oll", label: "OLL", description: "Orientation of Last Layer", cases: ThreeXThreeOLLCases, accent: "from-yellow-100 to-orange-100" }, { key: "3x3-pll", label: "PLL", description: "Permutation of Last Layer", cases: ThreeXThreePLLCases, accent: "from-green-100 to-blue-100" }]} /></div></main>
}
