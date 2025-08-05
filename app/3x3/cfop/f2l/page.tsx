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

const defaultF2LCases: Algorithm[] = [
  { id: "f2l-1", title: "Basic Corner-Edge Pair", algorithm: "R U' R'" },
  { id: "f2l-2", title: "Corner Up, Edge in Slot", algorithm: "F R F' R U R U' R'" },
  { id: "f2l-3", title: "Corner in Place, Edge Up", algorithm: "R U R' F R F'" },
  { id: "f2l-4", title: "Both Pieces Up", algorithm: "R U' R' U R U R'" },
]

export default function F2LPage() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("3x3-f2l-algorithms")
    if (saved) {
      setAlgorithms(JSON.parse(saved))
    } else {
      setAlgorithms(defaultF2LCases)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("3x3-f2l-algorithms", JSON.stringify(algorithms))
  }, [algorithms])

  const handleUpdate = (id: string, updates: Partial<Algorithm>) => {
    setAlgorithms((prev) => prev.map((alg) => (alg.id === id ? { ...alg, ...updates } : alg)))
  }

  const handleDelete = (id: string) => {
    setAlgorithms((prev) => prev.filter((alg) => alg.id !== id))
  }

  const handleAdd = () => {
    const newAlgorithm: Algorithm = {
      id: `f2l-${Date.now()}`,
      title: "New F2L Case",
      algorithm: "",
    }
    setAlgorithms((prev) => [...prev, newAlgorithm])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/3x3">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to 3×3 Methods
            </Button>
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">F2L Cases</h1>
              <p className="text-xl text-gray-600">First Two Layers algorithms and cases</p>
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
