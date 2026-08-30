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
  { id: "oll-1", title: "OLL 1", algorithm: "R U2' R2' F R F' U2 R' F R F'", image: "/images/3x3/oll/oll-1.png" },
  { id: "oll-2", title: "OLL 2", algorithm: "r U r' U2 r U2 R' U2 R U' r'", image: "/images/3x3/oll/oll-2.png" },
  { id: "oll-3", title: "OLL 3", algorithm: "r' R2 U R' U r U2' r' U M'", image: "/images/3x3/oll/oll-3.png" },
  { id: "oll-4", title: "OLL 4", algorithm: "l L2 U' L U' l' U2 l U' M'", image: "/images/3x3/oll/oll-4.png" },
  { id: "oll-5", title: "OLL 5", algorithm: "r' U2' R U R' U r", image: "/images/3x3/oll/oll-5.png" },
  { id: "oll-6", title: "OLL 6", algorithm: "r U2' R' U' R U' r'", image: "/images/3x3/oll/oll-6.png" },
  { id: "oll-7", title: "OLL 7", algorithm: "r U R' U R U2' r'", image: "/images/3x3/oll/oll-7.png" },
  { id: "oll-8", title: "OLL 8", algorithm: "r' U' R U' R' U2 r",   image: "/images/3x3/oll/oll-8.png" },
  { id: "oll-9", title: "OLL 9", algorithm: "R U R' U' R' F R2 U R' U' F'", image: "/images/3x3/oll/oll-9.png" },
  { id: "oll-10", title: "OLL 10", algorithm: "r R2' U2' R U R' U R U R r'", image: "/images/3x3/oll/oll-10.png" },
  { id: "oll-11", title: "OLL 11", algorithm: "r U R' U R' F R F' R U2' r'", image: "/images/3x3/oll/oll-11.png" },
  { id: "oll-12", title: "OLL 12", algorithm: "M' R' U' R U' R' U2 R U' R r'", image: "/images/3x3/oll/oll-12.png" },
  { id: "oll-13", title: "OLL 13", algorithm: "r U' r' U' r U r' F' U F", image: "/images/3x3/oll/oll-13.png" },
  { id: "oll-14", title: "OLL 14", algorithm: "R' F R U R' F' R F U' F'", image: "/images/3x3/oll/oll-14.png" },
  { id: "oll-15", title: "OLL 15", algorithm: "l' U' l L' U' L U l' U l", image: "/images/3x3/oll/oll-15.png" },
  { id: "oll-16", title: "OLL 16", algorithm: "r U r' R U R' U' r U' r'", image: "/images/3x3/oll/oll-16.png" },
  { id: "oll-17", title: "OLL 17", algorithm: "F R' F' R2 r' U R U' R' U' M'", image: "/images/3x3/oll/oll-17.png" },
  { id: "oll-18", title: "OLL 18", algorithm: "r U R' U R U2' r2' U' R U' R' U2 r", image: "/images/3x3/oll/oll-18.png" },
  { id: "oll-19", title: "OLL 19", algorithm: "M U R U R' U' M' R' F R F'", image: "/images/3x3/oll/oll-19.png" },
  { id: "oll-20", title: "OLL 20", algorithm: "M U R U R' U' M2' U R U' r'", image: "/images/3x3/oll/oll-20.png" },
  { id: "oll-21", title: "OLL 21", algorithm: "R U2' R' U' R U R' U' R U' R'", image: "/images/3x3/oll/oll-21.png" },
  { id: "oll-22", title: "OLL 22", algorithm: "R U2' R2' U' R2 U' R2' U2' R", image: "/images/3x3/oll/oll-22.png" },
  { id: "oll-23", title: "OLL 23", algorithm: "R2 D R' U2 R D' R' U2 R'", image: "/images/3x3/oll/oll-23.png" },
  { id: "oll-24", title: "OLL 24", algorithm: "r U R' U' r' F R F'", image: "/images/3x3/oll/oll-24.png" },
  { id: "oll-25", title: "OLL 25", algorithm: "F R' F' r U R U' r'", image: "/images/3x3/oll/oll-25.png" },
  { id: "oll-26", title: "OLL 26", algorithm: "R' U' R U' R' U2 R", image: "/images/3x3/oll/oll-26.png" },
  { id: "oll-27", title: "OLL 27", algorithm: "R U R' U R U2' R'", image: "/images/3x3/oll/oll-27.png" },
  { id: "oll-28", title: "OLL 28", algorithm: "r U R' U' M U R U' R'", image: "/images/3x3/oll/oll-28.png" },
  { id: "oll-29", title: "OLL 29", algorithm: "R U R' U' R U' R' F' U' F R U R'", image: "/images/3x3/oll/oll-29.png" },
  { id: "oll-30", title: "OLL 30", algorithm: "F R' F R2 U' R' U' R U R' F2'", image: "/images/3x3/oll/oll-30.png" },
  { id: "oll-31", title: "OLL 31", algorithm: "R' U' F U R U' R' F' R", image: "/images/3x3/oll/oll-31.png" },
  { id: "oll-32", title: "OLL 32", algorithm: "S R U R' U' R' F R f'", image: "/images/3x3/oll/oll-32.png" },
  { id: "oll-33", title: "OLL 33", algorithm: "R U R' U' R' F R F'", image: "/images/3x3/oll/oll-33.png" },
  { id: "oll-34", title: "OLL 34", algorithm: "R U R2' U' R' F R U R U' F'", image: "/images/3x3/oll/oll-34.png" },
  { id: "oll-35", title: "OLL 35", algorithm: "R U2' R2' F R F' R U2' R'", image: "/images/3x3/oll/oll-35.png" },
  { id: "oll-36", title: "OLL 36", algorithm: "L' U' L U' L' U L U L F' L' F", image: "/images/3x3/oll/oll-36.png" },
  { id: "oll-37", title: "OLL 37", algorithm: "F R' F' R U R U' R'", image: "/images/3x3/oll/oll-37.png" },
  { id: "oll-38", title: "OLL 38", algorithm: "R U R' U R U' R' U' R' F R F'", image: "/images/3x3/oll/oll-38.png" },
  { id: "oll-39", title: "OLL 39", algorithm: "R B' R' U' R U B U' R'", image: "/images/3x3/oll/oll-39.png" },
  { id: "oll-40", title: "OLL 40", algorithm: "R' F R U R' U' F' U R", image: "/images/3x3/oll/oll-40.png" },
  { id: "oll-41", title: "OLL 41", algorithm: "R U R' U R U2 R' F R U R' U' F'", image: "/images/3x3/oll/oll-41.png" },
  { id: "oll-42", title: "OLL 42", algorithm: "R' U' R U' R' U2 R F R U R' U' F'", image: "/images/3x3/oll/oll-42.png",},
  { id: "oll-43", title: "OLL 43", algorithm: "f' L' U' L U f", image: "/images/3x3/oll/oll-43.png" },
  { id: "oll-44", title: "OLL 44", algorithm: "F U R U' R' F'", image: "/images/3x3/oll/oll-44.png" },
  { id: "oll-45", title: "OLL 45", algorithm: "F R U R' U' F'", image: "/images/3x3/oll/oll-45.png" },
  { id: "oll-46", title: "OLL 46", algorithm: "R' U' R' F R F' U R", image: "/images/3x3/oll/oll-46.png" },
  { id: "oll-47", title: "OLL 47", algorithm: "F' L' U' L U L' U' L U F", image: "/images/3x3/oll/oll-47.png" },
  { id: "oll-48", title: "OLL 48", algorithm: "F R U R' U' R U R' U' F'", image: "/images/3x3/oll/oll-48.png" },
  { id: "oll-49", title: "OLL 49", algorithm: "r U' r2' U r2 U r2' U' r", image: "/images/3x3/oll/oll-49.png" },
  { id: "oll-50", title: "OLL 50", algorithm: "r' U r2 U' r2' U' r2 U r'", image: "/images/3x3/oll/oll-50.png" },
  { id: "oll-51", title: "OLL 51", algorithm: "F U R U' R' U R U' R' F'", image: "/images/3x3/oll/oll-51.png" },
  { id: "oll-52", title: "OLL 52", algorithm: "R U R' U R U' B U' B' R'", image: "/images/3x3/oll/oll-52.png" },
  { id: "oll-53", title: "OLL 53", algorithm: "l' U2 L U L' U' L U L' U l", image: "/images/3x3/oll/oll-53.png" },
  { id: "oll-54", title: "OLL 54", algorithm: "r U2' R' U' R U R' U' R U' r'", image: "/images/3x3/oll/oll-54.png" },
  { id: "oll-55", title: "OLL 55", algorithm: "R' F R U R U' R2' F' R2 U' R' U R U R'", image: "/images/3x3/oll/oll-55.png",},
  { id: "oll-56", title: "OLL 56", algorithm: "r U r' (U R U' R') U R U' M' U' r'", image: "/images/3x3/oll/oll-56.png",},
  { id: "oll-57", title: "OLL 57", algorithm: "R U R' U' M' U R U' r'", image: "/images/3x3/oll/oll-57.png" },
]

export default function OLLPage() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>(defaultOLLCases)

  useEffect(() => {
    const saved = localStorage.getItem("3x3-oll-algorithms")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const merged = defaultOLLCases.map((defaultCase) => {
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
      } catch (e) {
        console.error("[v0] Failed to parse saved OLL algorithms:", e)
        setAlgorithms(defaultOLLCases)
      }
    }
  }, [])

  useEffect(() => {
    if (algorithms.length > 0) {
      localStorage.setItem("3x3-oll-algorithms", JSON.stringify(algorithms))
    }
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
              <p className="text-xl text-gray-600">Orientation of Last Layer - 57 Cases</p>
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
