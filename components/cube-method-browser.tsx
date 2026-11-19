"use client"

import { useState } from "react"
import { MethodSection } from "@/components/method-section"
import type { MethodCase } from "@/lib/method-data"
import { cn } from "@/lib/utils"

type MethodOption = { key: string; label: string; description: string; algorithmDescription?: string; cases: MethodCase[]; rotateImage?: boolean }

type Props = { options: MethodOption[] }

export function CubeMethodBrowser({ options }: Props) {
  const [activeKey, setActiveKey] = useState(options[0]?.key ?? "")
  const active = options.find((option) => option.key === activeKey) ?? options[0]
  if (!active) return null

  return (
    <section aria-label="Method selector" className="flex flex-col gap-5">
      <div className="rounded-2xl border border-border/70 bg-card p-2 shadow-sm">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3" role="tablist" aria-label="Cube methods">
          {options.map((option) => {
            const selected = option.key === active.key
            return (
              <button
                key={option.key}
                id={`${option.key}-tab`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="method-panel"
                onClick={() => setActiveKey(option.key)}
                className={cn(
                  "rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected ? "border-primary/30 bg-primary/10 text-foreground" : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-semibold">{option.label}</span>
                  <span className="text-[11px] font-medium opacity-70">{option.description}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <div id="method-panel" role="tabpanel" aria-labelledby={`${active.key}-tab`}>
        <MethodSection cube={active.key.startsWith("5x5") ? "5x5" : active.key.startsWith("4x4") ? "4x4" : "3x3"} method={active.label as never} description={active.description} algorithmDescription={active.algorithmDescription} cases={active.cases} rotateImage={active.rotateImage} />
      </div>
    </section>
  )
}
