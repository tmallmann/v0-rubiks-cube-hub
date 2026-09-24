"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlgorithmCard } from "@/components/algorithm-card"
import type { MethodCase } from "@/lib/method-data"

type Props = {
  cube: "3x3" | "4x4" | "5x5"
  method: "F2L" | "OLL" | "PLL" | "OLL Parity" | "PLL Parity" | "L2C" | "L2E"
  description: string
  cases: MethodCase[]
  accent: string
  rotateImage?: boolean
}

function normalizeCase(item: MethodCase): MethodCase {
  const sourceAlgorithms = item.algorithms ?? item.orientations?.map((orientation) => orientation.algorithm) ?? [item.algorithm]
  return {
    ...item,
    algorithms: [...sourceAlgorithms, "", "", ""].slice(0, 4),
  }
}

export function MethodSection({ cube, method, description, cases, accent, rotateImage }: Props) {
  const storageKey = `${cube}-${method.toLowerCase()}-algorithms-v2`
  const [items, setItems] = useState<MethodCase[]>(() => cases.map(normalizeCase))

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (!saved) return
      const parsed = JSON.parse(saved) as MethodCase[]
      const savedById = new Map(parsed.map((item) => [item.id, item]))
      setItems(cases.map((item) => {
        const savedItem = savedById.get(item.id)
        const savedAlgorithms = savedItem?.algorithms
        const hasSavedAlgorithms = savedAlgorithms?.some((value) => value.trim().length > 0)
        return normalizeCase({
          ...item,
          ...(hasSavedAlgorithms ? savedItem : undefined),
          title: item.title,
          image: item.image,
          orientations: item.orientations,
        })
      }))
    } catch (error) {
      console.error("[v0] Failed to load method cases:", error)
    }
  }, [cases, storageKey])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items, storageKey])

  const countLabel = useMemo(() => `${items.length} ${items.length === 1 ? "Case" : "Cases"}`, [items.length])
  const imageScale = cube === "4x4" ? 1.1 : cube === "5x5" ? 1.2 : 1
  const updateCase = (id: string, updates: Partial<MethodCase> & { algorithms?: string[]; learningState?: MethodCase["learningState"] }) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, ...updates, title: item.title } : item))
  }
  return (
    <section className="flex flex-col gap-4">
      <Card className={`border-0 bg-gradient-to-r ${accent}`}>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-2xl">{method}</CardTitle>
            <CardDescription>{description} · {countLabel}</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <AlgorithmCard key={item.id} {...item} rotateImage={rotateImage} imageScale={imageScale} onUpdate={updateCase} />
        ))}
      </div>
    </section>
  )
}
