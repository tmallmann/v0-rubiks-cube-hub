"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AlgorithmCard } from "@/components/algorithm-card"

interface Algorithm {
  id: string
  title: string
  algorithm: string
  image: string
}

const defaultPLLCases: Algorithm[] = [
  { id: "pll-1", title: "Aa", algorithm: "x L2 D2' L' U' L D2' L' U L' x'", image: "/images/3x3/pll/pll-1.png" },
  { id: "pll-2", title: "Ab", algorithm: "x L U' L D2' L' U L D2' L2", image: "/images/3x3/pll/pll-2.png" },
  { id: "pll-3", title: "E", algorithm: "x' R U' R' D R U R' D' R U R' D R U' R' D' x", image: "/images/3x3/pll/pll-3.png" },
  { id: "pll-4", title: "F", algorithm: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", image: "/images/3x3/pll/pll-4.png" },
  { id: "pll-5", title: "Ga", algorithm: "R2 U R' U R' U' R U' R2 D U' R' U R D'", image: "/images/3x3/pll/pll-5.png" },
  { id: "pll-6", title: "Gb", algorithm: "R' U' R U D' R2 U R' U R U' R U' R2 D", image: "/images/3x3/pll/pll-6.png" },
  { id: "pll-7", title: "Gc", algorithm: "R2' Uw' R U' R U R' Uw R2 Fw R' Fw'", image: "/images/3x3/pll/pll-7.png" },
  { id: "pll-8", title: "Gd", algorithm: "R U R' U' D R2 U' R U' R' U R' U R2 D'", image: "/images/3x3/pll/pll-8.png" },
  { id: "pll-9", title: "H", algorithm: "M2' U M2' U2 M2' U M2'", image: "/images/3x3/pll/pll-9.png" },
  { id: "pll-10", title: "Ja", algorithm: "x R2' F R F' R U2' Rw' U Rw U2' x'", image: "/images/3x3/pll/pll-10.png" },
  { id: "pll-11", title: "Jb", algorithm: "R U R' F' R U R' U' R' F R2 U' R'", image: "/images/3x3/pll/pll-11.png" },
  { id: "pll-12", title: "Na", algorithm: "z U R' D R2 U' R U D' R' D R2 U' R D' z'", image: "/images/3x3/pll/pll-12.png" },
  { id: "pll-13", title: "Nb", algorithm: "z U' R D' R2 U R' U' D R D' R2 U R' D z'", image: "/images/3x3/pll/pll-13.png" },
  { id: "pll-14", title: "Ra", algorithm: "L U2 L' U2' L F' L' U' L U L F L2'", image: "/images/3x3/pll/pll-14.png" },
  { id: "pll-15", title: "Rb", algorithm: "R' U2 R U2' R' F R U R' U' R' F' R2", image: "/images/3x3/pll/pll-15.png" },
  { id: "pll-16", title: "T", algorithm: "R U R' U' R' F R2 U' R' U' R U R' F'", image: "/images/3x3/pll/pll-16.png" },
  { id: "pll-17", title: "Ua", algorithm: "M2 U M' U2 M U M2", image: "/images/3x3/pll/pll-17.png" },
  { id: "pll-18", title: "Ub", algorithm: "M2 U' M' U2 M U' M2", image: "/images/3x3/pll/pll-18.png" },
  { id: "pll-19", title: "V", algorithm: "R' U R' U' R D' R' D R' U D' R2 U' R2' D R2", image: "/images/3x3/pll/pll-19.png" },
  { id: "pll-20", title: "Y", algorithm: "F R U' R' U' R U R' F' R U R' U' R' F R F'", image: "/images/3x3/pll/pll-20.png" },
  { id: "pll-21", title: "Z", algorithm: "M2 U M2 U M' U2 M2 U2 M'", image: "/images/3x3/pll/pll-21.png" },
]

export default function PLLPage() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("3x3-pll-algorithms")
    if (saved) {
      try {
        const savedAlgorithms = JSON.parse(saved)
        const merged = defaultPLLCases.map((defaultCase) => {
          const saved = savedAlgorithms.find((s: Algorithm) => s.id === defaultCase.id)
          return saved
            ? {
                ...defaultCase,
                title: saved.title,
                algorithm: saved.algorithm,
              }
            : defaultCase
        })
        setAlgorithms(merged)
      } catch (e) {
        setAlgorithms(defaultPLLCases)
      }
    } else {
      setAlgorithms(defaultPLLCases)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("3x3-pll-algorithms", JSON.stringify(algorithms))
  }, [algorithms])

  const handleUpdate = (id: string, updates: Partial<Algorithm>) => {
    setAlgorithms((prev) =>
      prev.map((alg) => {
        if (alg.id === id) {
          const { image, ...allowedUpdates } = updates
          return { ...alg, ...allowedUpdates }
        }
        return alg
      }),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/3x3">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to 3×3 Methods
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">PLL Cases</h1>
            <p className="text-xl text-gray-600">Permutation of Last Layer - 21 Cases</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {algorithms.map((alg) => (
            <AlgorithmCard
              key={alg.id}
              id={alg.id}
              title={alg.title}
              algorithm={alg.algorithm}
              image={alg.image}
              onUpdate={handleUpdate}
              onDelete={undefined} // Removed delete functionality
            />
          ))}
        </div>
      </div>
    </div>
  )
}
