"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Save, X, Circle, CircleDot, CheckCircle2, RotateCw } from "lucide-react"
import Image from "next/image"

type LearningState = "not-learned" | "learning" | "learned"

type AlgorithmCardProps = {
  id: string
  title: string
  algorithm: string
  algorithms?: string[]
  orientations?: { id: string; title: string; algorithm: string; image?: string }[]
  image?: string
  learningState?: LearningState
  onUpdate?: (id: string, updates: Record<string, unknown>) => void
  onDelete?: (id: string) => void
  rotateImage?: boolean
  imageScale?: number
}

const orientationDegrees = [0, 90, 180, 270]
const stateLabels: Record<LearningState, string> = {
  "not-learned": "Not started",
  learning: "Learning",
  learned: "Mastered",
}

export function AlgorithmCard({ id, title, algorithm, algorithms, orientations: orientationRecords, image, learningState = "not-learned", onUpdate, rotateImage = true, imageScale = 1 }: AlgorithmCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [orientation, setOrientation] = useState(0)
  const orientationAlgorithms = orientationRecords?.map((record) => record.algorithm) ?? []
  const currentAlgorithms = algorithms?.length ? [...algorithms, "", "", ""].slice(0, 4) : [...orientationAlgorithms, "", "", ""].slice(0, 4)
  const [editAlgorithms, setEditAlgorithms] = useState(currentAlgorithms)

  useEffect(() => {
    setEditAlgorithms(currentAlgorithms)
  }, [algorithm, algorithms])

  const isF2LCase = Boolean(orientationRecords?.length === 4 && orientationRecords.some((record) => record.image && record.image !== image))
  const orientationCase = orientationRecords?.[orientation / 90]
  const displayedImage = orientationCase?.image ?? image
  const currentAlgorithm = currentAlgorithms[rotateImage ? orientation / 90 : 0] || currentAlgorithms[0] || "No algorithm set"
  const nextState: Record<LearningState, LearningState> = { "not-learned": "learning", learning: "learned", learned: "not-learned" }
  const stateIcon = learningState === "learned" ? <CheckCircle2 aria-hidden="true" /> : learningState === "learning" ? <CircleDot aria-hidden="true" /> : <Circle aria-hidden="true" />
  const stateTone = learningState === "learned"
    ? "border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 to-emerald-950/20 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-950/20"
    : learningState === "learning"
      ? "border-amber-500/40 bg-gradient-to-br from-amber-950/40 to-amber-950/20 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-950/20"
      : "border-border/50 bg-gradient-to-br from-card to-card/80 hover:border-border/70 hover:shadow-lg hover:shadow-black/5"
  const markerTone = learningState === "learned" ? "bg-emerald-500" : learningState === "learning" ? "bg-amber-500" : "bg-muted-foreground/40"
  const labelTone = learningState === "learned"
    ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-200 font-semibold"
    : learningState === "learning"
      ? "border-amber-500/30 bg-amber-500/15 text-amber-200 font-semibold"
      : "border-border/30 bg-muted/50 text-muted-foreground font-medium"

  const save = () => {
    onUpdate?.(id, { algorithms: editAlgorithms })
    setIsEditing(false)
  }
  const cancel = () => {
    setEditAlgorithms(currentAlgorithms)
    setIsEditing(false)
  }
  const cycleLearningState = () => onUpdate?.(id, { learningState: nextState[learningState] })

  return (
    <Card className={`group flex h-full w-full flex-col overflow-hidden border transition-all duration-300 ${stateTone}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-3 px-4 pb-2 pt-4 border-b border-border/20">
        <div className="flex min-w-0 items-center gap-2.5">
          <span aria-hidden="true" className={`size-3 shrink-0 rounded-full shadow-lg ${markerTone}`} />
          <CardTitle className="truncate text-sm font-semibold" title={title}>{title}</CardTitle>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          {isEditing ? <>
            <Button size="sm" onClick={save} aria-label="Save algorithms" variant="default"><Save data-icon="inline-start" size={16} />Save</Button>
            <Button size="icon" variant="ghost" onClick={cancel} aria-label="Cancel editing"><X size={18} /></Button>
          </> : <>
            <Button size="icon" variant="ghost" onClick={cycleLearningState} aria-label={`${title}: ${stateLabels[learningState]}. Change to ${stateLabels[nextState[learningState]]}`} title={`Change progress: ${stateLabels[learningState]}`} className="hover:bg-primary/10">{stateIcon}</Button>
            <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)} aria-label={`Edit ${title}`} title={`Edit ${title}`} className="hover:bg-primary/10"><Edit2 size={18} /></Button>
          </>}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] shadow-sm ${labelTone}`}>{stateLabels[learningState]}</span>
          {rotateImage && <span className="text-[11px] font-medium text-muted-foreground/70">{isF2LCase ? `View ${orientation / 90 + 1} of 4` : `${orientation}° view`}</span>}
        </div>
        {displayedImage && <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-lg border border-border/40 bg-background/50 backdrop-blur-sm">
          <Image src={displayedImage} alt={`${title} case diagram`} width={Math.round((isF2LCase ? 92 : 72) * imageScale)} height={Math.round((isF2LCase ? 72 : 56) * imageScale)} className="object-contain" style={isF2LCase || !rotateImage ? undefined : { transform: `rotate(${orientation}deg)` }} />
          {(isF2LCase || rotateImage) && <Button type="button" size="sm" variant="secondary" className="absolute bottom-2 right-2 h-8 w-8 p-0 shadow-lg" onClick={() => setOrientation((value) => (value + 90) % 360)} aria-label={isF2LCase ? `Switch to case image ${orientation / 90 + 2 > 4 ? 1 : orientation / 90 + 2}` : `Rotate case image to ${(orientation + 90) % 360} degrees`} title={isF2LCase ? `Image ${orientation / 90 + 1} of 4` : `Orientation: ${orientation}°`}><RotateCw size={16} /></Button>}
        </div>}
        {isEditing ? <div className="grid gap-2">
          {orientationDegrees.map((degrees, index) => <label key={degrees} className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground/80">{degrees}°<Input value={editAlgorithms[index]} onChange={(event) => setEditAlgorithms((current) => current.map((value, i) => i === index ? event.target.value : value))} placeholder={`${degrees}° algorithm`} className="font-mono text-xs text-foreground bg-background/50 border-border/50" /></label>)}
        </div> : <div className="flex flex-1 flex-col gap-1.5">
          {!displayedImage && <div className="flex min-h-24 items-center justify-center rounded-lg border border-dashed border-border/40 bg-background/30 text-xs text-muted-foreground/60">Diagram unavailable</div>}
          <div className="flex-1 rounded-lg border border-border/40 bg-background/40 backdrop-blur-sm p-3 flex items-center">
            <p className="break-words font-mono text-xs leading-5 text-foreground/80">{currentAlgorithm}</p>
          </div>
        </div>}
      </CardContent>
    </Card>
  )
}
