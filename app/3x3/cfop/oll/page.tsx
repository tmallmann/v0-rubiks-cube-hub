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

const defaultOLLCases: Algorithm[] = [
  { id: "oll-1", title: "OLL 1 - Dot", algorithm: "R U2 R2 F R F' U2 R' F R F'" },
  { id: "oll-2", title: "OLL 2 - Line", algorithm: "F R U R' U' F'" },
  { id: "oll-3", title: "OLL 3 - L Shape", algorithm: "f R U R' U' f'" },
  { id: "oll-4", title: "OLL 4 - Cross", algorithm: "F R U R' U' F' f R U R' U' f'" },
]

export default function OLLPage() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("3x3-oll-algorithms")
    if (saved) {
      setAlgorithms(JSON.parse(saved))
    } else {
      setAlgorithms(defaultOLLCases)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("3x3-oll-algorithms", JSON.stringify(algorithms))
  }, [algorithms])

  const handleUpdate = (id: string, updates: Partial<Algorithm>) => {
    setAlgorithms((prev) => prev.map((alg) => (alg.id === id ? { ...alg, ...updates } : alg)))
  }

  const handleDelete = (id: string) => {
    setAlgorithms((prev) => prev.filter((alg) => alg.id !== id))
  }

  const handleAdd = () => {
    const newAlgorithm: Algorithm = {
      id: `oll-${Date.now()}`,
      title: "New OLL Case",
      algorithm: "",
    }
    setAlgorithms((prev) => [...prev, newAlgorithm])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">OLL Cases</h1>
              <p className="text-xl text-gray-600">Orient Last Layer algorithms</p>
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
