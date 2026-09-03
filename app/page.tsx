import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scroll as Scroll, Brain, Timer } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Scroll className="h-16 w-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Algs Database</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master the Rubik's Cube with comprehensive algorithm collections and practice tools for speedcubing and blindfolded
            solving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/3x3">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">3×3</span>
                  </div>
                </div>
                <CardTitle className="text-2xl">3×3 Cube</CardTitle>
                <CardDescription>The classic Rubik's Cube with CFOP method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">🎯</span>
                    CFOP
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/4x4">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">4×4</span>
                  </div>
                </div>
                <CardTitle className="text-2xl">4×4 Cube</CardTitle>
                <CardDescription>Advanced cube solving with reduction methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">🎯</span>
                    CFOP
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/bld">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Brain className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">BLD Method</CardTitle>
                <CardDescription>Blindfolded solving with letter pair memorization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">🆎</span>
                    Letter Pairs
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">🧠</span>
                    Memory
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/timer">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Timer className="h-12 w-12 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Speedcubing Timer</CardTitle>
                <CardDescription>Practice with scrambles and track your solving times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">🎲</span>
                    Scrambles
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-1">📊</span>
                    Statistics
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
