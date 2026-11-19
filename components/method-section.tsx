"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlgorithmCard } from "@/components/algorithm-card"
import type { MethodCase } from "@/lib/method-data"

type Props = {
  cube: "3x3" | "4x4" | "5x5"
  method: "F2L" | "OLL" | "PLL" | "SV" | "WV" | "OLL Parity" | "PLL Parity" | "L2C" | "L2E"
  description: string
  algorithmDescription?: string
  cases: MethodCase[]
  rotateImage?: boolean
}

function normalizeCase(item: MethodCase): MethodCase {
  const sourceAlgorithms = item.algorithms ?? item.orientations?.map((orientation) => orientation.algorithm) ?? [item.algorithm]
  return { ...item, algorithms: [...sourceAlgorithms, "", "", ""].slice(0, 4) }
}

export function MethodSection({ cube, method, description, algorithmDescription, cases, rotateImage }: Props) {
  const storageKey = `${cube}-${method.toLowerCase()}-algorithms-v2`
  const [items, setItems] = useState<MethodCase[]>(() => cases.map(normalizeCase))
  const [loadedKey, setLoadedKey] = useState<string | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      const parsed = saved ? JSON.parse(saved) as MethodCase[] : []
      const savedById = new Map((Array.isArray(parsed) ? parsed : []).map((item) => [item.id, item]))
      setItems(cases.map((item) => {
        const savedItem = savedById.get(item.id)
        const savedAlgorithms = savedItem?.algorithms
        const hasSavedAlgorithms = savedAlgorithms?.some((value) => typeof value === "string" && value.trim().length > 0)
        return normalizeCase({
          ...item,
          ...(savedItem ? { learningState: savedItem.learningState } : undefined),
          ...(hasSavedAlgorithms ? { algorithms: savedAlgorithms } : undefined),
          title: item.title,
          image: item.image,
          orientations: item.orientations,
        })
      }))
    } catch (error) {
      console.error("[v0] Failed to load method cases:", error)
      setItems(cases.map(normalizeCase))
    } finally {
      setLoadedKey(storageKey)
    }
  }, [cases, storageKey])

  useEffect(() => {
    if (loadedKey !== storageKey) return
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [loadedKey, items, storageKey])

  const progress = useMemo(() => {
    const learned = items.filter((item) => item.learningState === "learned").length
    const learning = items.filter((item) => item.learningState === "learning").length
    return { learned, learning, total: items.length, percent: items.length ? Math.round((learned / items.length) * 100) : 0 }
  }, [items])
  const countLabel = useMemo(() => `${items.length} ${items.length === 1 ? "case" : "cases"}`, [items.length])
  const imageScale = cube === "4x4" ? 1.1 : cube === "5x5" ? 1.2 : 1
  const updateCase = (id: string, updates: Partial<MethodCase> & { algorithms?: string[]; learningState?: MethodCase["learningState"] }) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, ...updates, title: item.title } : item))
  }

  return (
    <section className="flex flex-col gap-6">
      <Card className="overflow-hidden border-border/40 bg-gradient-to-br from-card to-card/50 shadow-lg shadow-black/5">
        <CardHeader className="gap-6 p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/80">{description}</p>
              <CardTitle className="mt-3 text-3xl font-bold tracking-tight">{method}</CardTitle>
              {algorithmDescription ? <CardDescription className="mt-3 max-w-4xl break-words font-mono text-sm leading-6 text-muted-foreground/80 bg-background/40 rounded-lg p-3 border border-border/30">{algorithmDescription}</CardDescription> : null}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-3">
              <div className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 px-4 py-3 text-right shadow-lg shadow-primary/10">
                <p className="font-mono text-3xl font-bold tabular-nums text-primary">{progress.percent}%</p>
                <p className="text-xs font-semibold text-primary/70 uppercase tracking-wide mt-1">mastered</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-muted-foreground/80">
              <span className="text-foreground font-semibold">{progress.learned} of {progress.total} cases mastered</span>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2"><span className="size-2.5 rounded-full bg-amber-500 shadow-sm" /><span className="text-foreground">{progress.learning} learning</span></span>
                <span className="text-muted-foreground/60">{countLabel}</span>
              </div>
            </div>
            <div role="progressbar" aria-label={`${method} mastery progress`} aria-valuemin={0} aria-valuemax={progress.total} aria-valuenow={progress.learned} aria-valuetext={`${progress.learned} of ${progress.total} cases mastered`} className="h-2.5 overflow-hidden rounded-full bg-muted/50 shadow-inset border border-border/20">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-[width] duration-500 shadow-lg shadow-emerald-500/30" style={{ width: `${progress.percent}%` }} />
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium px-4 py-3 rounded-lg bg-background/40 border border-border/30 backdrop-blur-sm" aria-label="Progress color legend">
        <span className="text-foreground font-bold">Card Status:</span>
        <span className="inline-flex items-center gap-2"><span className="size-2.5 rounded-full bg-muted-foreground/50 shadow-sm" /><span className="text-muted-foreground">Not Started</span></span>
        <span className="inline-flex items-center gap-2"><span className="size-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/30" /><span className="text-amber-200">Learning</span></span>
        <span className="inline-flex items-center gap-2"><span className="size-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/30" /><span className="text-emerald-200">Mastered</span></span>
        <span className="ml-auto text-muted-foreground/70">Click status icon to cycle</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 auto-rows-max">
        {items.map((item) => <AlgorithmCard key={item.id} {...item} rotateImage={rotateImage} imageScale={imageScale} onUpdate={updateCase} />)}
      </div>
    </section>
  )
}
