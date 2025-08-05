import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap, RotateCcw, Eye, Layers } from "lucide-react"

export default function FourByFourPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">4×4 Cube Methods</h1>
          <p className="text-xl text-gray-600">Advanced cube solving methods for the 4×4 cube.</p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Zap className="h-12 w-12 text-teal-600" />
              </div>
              <CardTitle className="text-2xl">CFOP Method</CardTitle>
              <CardDescription>Reduction method with CFOP for 4×4 cubes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/4x4/cfop/f2l">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  F2L (First Two Layers)
                </Button>
              </Link>
              <Link href="/4x4/cfop/oll">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Eye className="h-4 w-4 mr-2" />
                  OLL (Orient Last Layer)
                </Button>
              </Link>
              <Link href="/4x4/cfop/pll">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Layers className="h-4 w-4 mr-2" />
                  PLL (Permute Last Layer)
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
