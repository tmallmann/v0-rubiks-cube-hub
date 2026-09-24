"use client"

import { useState } from "react"
import { MethodSection } from "@/components/method-section"
import type { MethodCase } from "@/lib/method-data"
import { cn } from "@/lib/utils"

type MethodOption = { key: string; label: string; description: string; cases: MethodCase[]; accent: string; rotateImage?: boolean }

type Props = { options: MethodOption[] }

export function CubeMethodBrowser({ options }: Props) {
  const [activeKey, setActiveKey] = useState(options[0]?.key ?? "")
  const active = options.find((option) => option.key === activeKey) ?? options[0]
  if (!active) return null

  return (
    <section aria-label="Method selector" className="flex flex-col gap-6">
      <div className="rounded-2xl border border-black/10 bg-white/70 p-2 shadow-sm backdrop-blur dark:border-white/10 dark:bg-black/20">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Cube methods">
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              role="tab"
              aria-selected={option.key === active.key}
              onClick={() => setActiveKey(option.key)}
              className={cn(
                "flex-1 rounded-xl px-4 py-3 text-left transition-colors sm:min-w-40",
                option.key === active.key ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10",
              )}
            >
              <span className="block font-semibold">{option.label}</span>
              <span className="block text-xs opacity-70">{option.description}</span>
            </button>
          ))}
        </div>
      </div>
      <MethodSection cube={active.key.startsWith("5x5") ? "5x5" : active.key.startsWith("4x4") ? "4x4" : "3x3"} method={active.label as never} description={active.description} cases={active.cases} accent={active.accent} rotateImage={active.rotateImage} />
    </section>
  )
}
