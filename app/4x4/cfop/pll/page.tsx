"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import { AlgorithmCard } from "@/components/algorithm-card"

interface Algorithm {
  id: string
  title: string
  algorithm: string
  image?: string
}

const default4x4PLLCases: Algorithm[] = [
  { id: "4x4-pll-1", title: "4x4 PLL Parity", algorithm: "Rw2 B2 U2 Lw U2 Rw' U2 Rw U2 F2 Rw F2 Lw' B2 Rw2" },
  { id: "4x4-pll-2", title: "Standard Aa Perm", algorithm: "x R' U R' D2 R U' R' D2 R2 x'" },
  { id: "4x4-pll-3", title: "Standard T Perm", algorithm: "R U R' F' R U R' U' R' F R2 U' R'" },
]

export default function FourByFourPLLPage() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("4x4-pll-algorithms")
    if (saved) {
      setAlgorithms(JSON.parse(saved))
    } else {
      setAlgorithms(default4x4PLLCases)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("4x4-pll-algorithms", JSON.stringify(algorithms))
  }, [algorithms])

  const handleUpdate = (id: string, updates: Partial<Algorithm>) => {
    setAlgorithms((prev) => prev.map((alg) => (alg.id === id ? { ...alg, ...updates } : alg)))
  }

  const handleDelete = (id: string) => {
    setAlgorithms((prev) => prev.filter((alg) => alg.id !== id))
  }

  const handleAdd = () => {
    const newAlgorithm: Algorithm = {
      id: `4x4-pll-${Date.now()}`,
      title: "New 4x4 PLL Case",
      algorithm: "",
    }
    setAlgorithms((prev) => [...prev, newAlgorithm])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/4x4">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to 4×4 Methods
            </Button>
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">4×4 PLL Cases</h1>
              <p className="text-xl text-gray-600">4×4 Permute Last Layer algorithms including parity cases</p>
            </div>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Case
            </Button>
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
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
