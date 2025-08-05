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

const default4x4F2LCases: Algorithm[] = [
  { id: "4x4-f2l-1", title: "4x4 Edge Pairing", algorithm: "Uw R U' R' F R F' Uw'" },
  { id: "4x4-f2l-2", title: "Center Building", algorithm: "r U r' F r F' r'" },
  { id: "4x4-f2l-3", title: "3x3 Stage F2L", algorithm: "R U' R' U R U R'" },
]

export default function FourByFourF2LPage() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("4x4-f2l-algorithms")
    if (saved) {
      setAlgorithms(JSON.parse(saved))
    } else {
      setAlgorithms(default4x4F2LCases)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("4x4-f2l-algorithms", JSON.stringify(algorithms))
  }, [algorithms])

  const handleUpdate = (id: string, updates: Partial<Algorithm>) => {
    setAlgorithms((prev) => prev.map((alg) => (alg.id === id ? { ...alg, ...updates } : alg)))
  }

  const handleDelete = (id: string) => {
    setAlgorithms((prev) => prev.filter((alg) => alg.id !== id))
  }

  const handleAdd = () => {
    const newAlgorithm: Algorithm = {
      id: `4x4-f2l-${Date.now()}`,
      title: "New 4x4 F2L Case",
      algorithm: "",
    }
    setAlgorithms((prev) => [...prev, newAlgorithm])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-green-100">
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">4×4 F2L Cases</h1>
              <p className="text-xl text-gray-600">4×4 First Two Layers algorithms and reduction techniques</p>
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
