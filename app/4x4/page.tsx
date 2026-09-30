import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap } from "lucide-react"
import { CubeMethodBrowser } from "@/components/cube-method-browser"
import { FourXFourOLLCases, FourXFourPLLCases } from "@/lib/method-data"

export default function FourByFourPage() {
  return <main className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100"><div className="container mx-auto flex flex-col gap-8 px-4 py-8"><header className="flex flex-col gap-4"><Link href="/"><Button variant="ghost" className="w-fit"><ArrowLeft data-icon="inline-start" />Back to Home</Button></Link><div className="flex items-start gap-4"><Zap className="mt-1 text-teal-600" /><div><h1 className="text-balance text-4xl font-bold text-foreground">4×4 Cube Methods</h1><p className="mt-2 text-pretty text-lg text-muted-foreground">Master the 4x4 parity cases.</p></div></div></header><CubeMethodBrowser options={[{ key: "4x4-oll-parity", label: "OLL Parity", description: "27 cases", algorithmDescription: "OLL Parity Algorithm: [*] = Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'", cases: FourXFourOLLCases, accent: "from-teal-100 to-cyan-100", rotateImage: false }, { key: "4x4-pll-parity", label: "PLL Parity", description: "22 cases", algorithmDescription: "PLL Parity Algorithm: [*] = 2R2 U2 2R2 Uw2 2R2 Uw2", cases: FourXFourPLLCases, accent: "from-blue-100 to-teal-100", rotateImage: false }]} /></div></main>
}
