"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlgorithmCard } from "@/components/algorithm-card"
import { Plus } from "lucide-react"
import type { MethodCase } from "@/lib/method-data"

type Props = {
  cube: "3x3" | "4x4"
  method: "F2L" | "OLL" | "PLL"
  description: string
  cases: MethodCase[]
  accent: string
}

function normalizeCase(item: MethodCase): MethodCase {
  const legacy = item as MethodCase & { algorithms?: string[] }
  return {
    ...item,
    algorithms: legacy.algorithms?.length ? legacy.algorithms.slice(0, 4) : [item.algorithm || "", "", "", ""],
  } as MethodCase
}

export function MethodSection({ cube, method, description, cases, accent }: Props) {
  const storageKey = `${cube}-${method.toLowerCase()}-algorithms`
  const [items, setItems] = useState<MethodCase[]>(() => cases.map(normalizeCase))

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (!saved) return
      const parsed = JSON.parse(saved) as MethodCase[]
      const savedById = new Map(parsed.map((item) => [item.id, item]))
      setItems(cases.map((item) => {
        const savedItem = savedById.get(item.id)
        return normalizeCase({ ...item, ...savedItem, title: item.title, image: item.image })
      }))
    } catch (error) {
      console.error("[v0] Failed to load method cases:", error)
    }
  }, [cases, storageKey])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items, storageKey])

  const countLabel = useMemo(() => `${items.length} ${items.length === 1 ? "Case" : "Cases"}`, [items.length])
  const updateCase = (id: string, updates: Partial<MethodCase> & { algorithms?: string[]; learningState?: MethodCase["learningState"] }) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, ...updates, title: item.title } : item))
  }
  const addCase = () => setItems((current) => [...current, normalizeCase({ id: `${method.toLowerCase()}-${Date.now()}`, title: `New ${method} Case`, algorithm: "" })])

  return (
    <section className="flex flex-col gap-4">
      <Card className={`border-0 bg-gradient-to-r ${accent}`}>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-2xl">{method}</CardTitle>
            <CardDescription>{description} · {countLabel}</CardDescription>
          </div>
          <Button variant="outline" onClick={addCase} className="shrink-0 bg-background/80">
            <Plus data-icon="inline-start" /> Add Case
          </Button>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <AlgorithmCard key={item.id} {...item} onUpdate={updateCase} />
        ))}
      </div>
    </section>
  )
}
