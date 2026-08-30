import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap } from "lucide-react"
import { MethodSection } from "@/components/method-section"
import { FourXFourOLLCases, FourXFourPLLCases } from "@/lib/method-data"

export default function FourByFourPage() {
  return <main className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100"><div className="container mx-auto flex flex-col gap-8 px-4 py-8"><header className="flex flex-col gap-4"><Link href="/"><Button variant="ghost" className="w-fit"><ArrowLeft data-icon="inline-start" />Back to Home</Button></Link><div className="flex items-start gap-4"><Zap className="mt-1 text-teal-600" /><div><h1 className="text-balance text-4xl font-bold text-foreground">4×4 Cube Methods</h1><p className="mt-2 text-pretty text-lg text-muted-foreground">Master OLL parity and PLL parity from one focused workspace.</p></div></div></header><div className="flex flex-col gap-10"><MethodSection cube="4x4" method="OLL Parity" description="3 cases" cases={FourXFourOLLCases.filter((item) => item.title.includes("Parity"))} accent="from-teal-100 to-cyan-100" rotateImage={false} /><MethodSection cube="4x4" method="PLL Parity" description="22 cases" cases={FourXFourPLLCases.filter((item) => item.title.includes("Parity"))} accent="from-blue-100 to-teal-100" rotateImage={false} /></div></div></main>
}
