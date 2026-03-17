"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AlgorithmCard } from "@/components/algorithm-card"

type LearningState = "not-learned" | "learning" | "learned"

interface Algorithm {
  id: string
  title: string
  algorithm: string
  image?: string
  learningState?: LearningState
}

const defaultF2LCases: Algorithm[] = [
  { id: "f2l-1", title: "F2L Case 1", algorithm: "U R U' R'", image: "/images/3x3/F2L/f2l-1.png" },
  { id: "f2l-2", title: "F2L Case 2", algorithm: "F R' F' R", image: "/images/3x3/F2L/f2l-2.png" },
  { id: "f2l-3", title: "F2L Case 3", algorithm: "F' U' F", image: "/images/3x3/F2L/f2l-3.png" },
  { id: "f2l-4", title: "F2L Case 4", algorithm: "R U R'", image: "/images/3x3/F2L/f2l-4.png" },
  { id: "f2l-5", title: "F2L Case 5", algorithm: "U' R U R' U2 R U' R'", image: "/images/3x3/F2L/f2l-5.png" },
  { id: "f2l-6", title: "F2L Case 6", algorithm: "U' Rw U' R' U R U Rw'", image: "/images/3x3/F2L/f2l-6.png" },
  { id: "f2l-7", title: "F2L Case 7", algorithm: "U' R U2' R' U2 R U' R'", image: "/images/3x3/F2L/f2l-7.png" },
  { id: "f2l-8", title: "F2L Case 8", algorithm: "Dw R' U2' R U R' U2' R", image: "/images/3x3/F2L/f2l-8.png" },
  { id: "f2l-9", title: "F2L Case 9", algorithm: "U' R U' R' U F' U' F", image: "/images/3x3/F2L/f2l-9.png" },
  { id: "f2l-10", title: "F2L Case 10", algorithm: "U' R U R' U R U R'", image: "/images/3x3/F2L/f2l-10.png" },
  { id: "f2l-11", title: "F2L Case 11", algorithm: "U' R U2' R' U F' U' F", image: "/images/3x3/F2L/f2l-11.png" },
  { id: "f2l-12", title: "F2L Case 12", algorithm: "R' U2' R2 U R2' U R", image: "/images/3x3/F2L/f2l-12.png" },
  { id: "f2l-13", title: "F2L Case 13", algorithm: "R U' R' U R' F R F' R U' R'", image: "/images/3x3/F2L/f2l-13.png" },
  { id: "f2l-14", title: "F2L Case 14", algorithm: "U' R U' R' U R U R'", image: "/images/3x3/F2L/f2l-14.png" },
  { id: "f2l-15", title: "F2L Case 15", algorithm: "R' D' R U' R' D R U R U' R'", image: "/images/3x3/F2L/f2l-15.png" },
  { id: "f2l-16", title: "F2L Case 16", algorithm: "R U' R' U2 F' U' F", image: "/images/3x3/F2L/f2l-16.png" },
  { id: "f2l-17", title: "F2L Case 17", algorithm: "R U2' R' U' R U R'", image: "/images/3x3/F2L/f2l-17.png" },
  { id: "f2l-18", title: "F2L Case 18", algorithm: "R' F R F' R U' R' U R U' R'", image: "/images/3x3/F2L/f2l-18.png" },
  { id: "f2l-19", title: "F2L Case 19", algorithm: "U R U2' R' U R U' R'", image: "/images/3x3/F2L/f2l-19.png" },
  { id: "f2l-20", title: "F2L Case 20", algorithm: "U' R U' R2' F R F' R U' R'", image: "/images/3x3/F2L/f2l-20.png" },
  { id: "f2l-21", title: "F2L Case 21", algorithm: "U2' R U R' U R U' R'", image: "/images/3x3/F2L/f2l-21.png" },
  { id: "f2l-22", title: "F2L Case 22", algorithm: "Rw U' Rw' U2 Rw U Rw'", image: "/images/3x3/F2L/f2l-22.png" },
  { id: "f2l-23", title: "F2L Case 23", algorithm: "U R U' R' U' R U' R' U R U' R'", image: "/images/3x3/F2L/f2l-23.png",},
  { id: "f2l-24", title: "F2L Case 24", algorithm: "F U R U' R' F' R U' R'", image: "/images/3x3/F2L/f2l-24.png" },
  { id: "f2l-25", title: "F2L Case 25", algorithm: "U' R' F R F' R U R'", image: "/images/3x3/F2L/f2l-25.png" },
  { id: "f2l-26", title: "F2L Case 26", algorithm: "U R U' R' F R' F' R", image: "/images/3x3/F2L/f2l-26.png" },
  { id: "f2l-27", title: "F2L Case 27", algorithm: "R U' R' U R U' R'", image: "/images/3x3/F2L/f2l-27.png" },
  { id: "f2l-28", title: "F2L Case 28", algorithm: "R U R' U2' F' U F", image: "/images/3x3/F2L/f2l-28.png" },
  { id: "f2l-29", title: "F2L Case 29", algorithm: "M' U R U' R' U R U' Rw'", image: "/images/3x3/F2L/f2l-29.png" },
  { id: "f2l-30", title: "F2L Case 30", algorithm: "R U R' U' R U R'", image: "/images/3x3/F2L/f2l-30.png" },
  { id: "f2l-31", title: "F2L Case 31", algorithm: "U' R' F R F' R U' R'", image: "/images/3x3/F2L/f2l-31.png" },
  { id: "f2l-32", title: "F2L Case 32", algorithm: "U R U' R' U R U' R' U R U' R'", image: "/images/3x3/F2L/f2l-32.png",},
  { id: "f2l-33", title: "F2L Case 33", algorithm: "U' R U' R' U2 R U' R'", image: "/images/3x3/F2L/f2l-33.png" },
  { id: "f2l-34", title: "F2L Case 34", algorithm: "U R U R' U2 R U R'", image: "/images/3x3/F2L/f2l-34.png" },
  { id: "f2l-35", title: "F2L Case 35", algorithm: "U M' U R U' Rw' R U' R'", image: "/images/3x3/F2L/f2l-35.png" },
  { id: "f2l-36", title: "F2L Case 36", algorithm: "U2 R' F R F' U2 R U R'", image: "/images/3x3/F2L/f2l-36.png" },
  { id: "f2l-37", title: "F2L Case 37", algorithm: "R2' U2' F R2 F' U2' R' U R'", image: "/images/3x3/F2L/f2l-37.png" },
  { id: "f2l-38", title: "F2L Case 38", algorithm: "R U' R' U' R U R' U2 R U' R'", image: "/images/3x3/F2L/f2l-38.png",},
  { id: "f2l-39", title: "F2L Case 39", algorithm: "R U' R' U R U2' R' U R U' R'", image: "/images/3x3/F2L/f2l-39.png",},
  { id: "f2l-40", title: "F2L Case 40", algorithm: "F' L' U2 L F R U R'", image: "/images/3x3/F2L/f2l-40.png" },
  { id: "f2l-41", title: "F2L Case 41", algorithm: "R U' R' F' L' U2 L F", image: "/images/3x3/F2L/f2l-41.png" },
]

export default function F2LPage() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>(defaultF2LCases)

  useEffect(() => {
    const saved = localStorage.getItem("3x3-f2l-algorithms")
    if (saved) {
      const parsed = JSON.parse(saved)
      const merged = defaultF2LCases.map((defaultCase) => {
        const savedCase = parsed.find((c: Algorithm) => c.id === defaultCase.id)
        if (savedCase) {
          return {
            ...defaultCase,
            title: savedCase.title || defaultCase.title,
            algorithm: savedCase.algorithm || defaultCase.algorithm,
          }
        }
        return defaultCase
      })
      setAlgorithms(merged)
    }
  }, [])

  useEffect(() => {
    if (algorithms.length > 0) {
      localStorage.setItem("3x3-f2l-algorithms", JSON.stringify(algorithms))
    }
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
              <p className="text-xl text-gray-600">First Two Layers - 41 Cases</p>
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
