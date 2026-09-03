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
}

const orientations = [0, 90, 180, 270]

export function AlgorithmCard({ id, title, algorithm, algorithms, orientations: orientationRecords, image, learningState = "not-learned", onUpdate, rotateImage = true }: AlgorithmCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [orientation, setOrientation] = useState(0)
  const orientationAlgorithms = orientationRecords?.map((record) => record.algorithm) ?? []
  const currentAlgorithms = algorithms?.length
    ? [...algorithms, "", "", ""].slice(0, 4)
    : [...orientationAlgorithms, "", "", ""].slice(0, 4)
  const [editAlgorithms, setEditAlgorithms] = useState(currentAlgorithms)

  useEffect(() => {
    setEditAlgorithms(currentAlgorithms)
  }, [algorithm, algorithms])

  const isF2LCase = Boolean(orientationRecords?.length === 4 && orientationRecords.some((record) => record.image && record.image !== image))
  const orientationCase = orientationRecords?.[orientation / 90]
  const displayedImage = orientationCase?.image ?? image
  const currentAlgorithm = currentAlgorithms[rotateImage ? orientation / 90 : 0] || "No algorithm set"
  const save = () => {
    onUpdate?.(id, { algorithms: editAlgorithms })
    setIsEditing(false)
  }
  const cancel = () => {
    setEditAlgorithms(currentAlgorithms)
    setIsEditing(false)
  }
  const cycleLearningState = () => {
    const next: Record<LearningState, LearningState> = { "not-learned": "learning", learning: "learned", learned: "not-learned" }
    onUpdate?.(id, { learningState: next[learningState] })
  }
  const statusIcon = learningState === "learned" ? <CheckCircle2 /> : learningState === "learning" ? <CircleDot /> : <Circle />

  return (
    <Card className="w-full overflow-hidden border-l-4 border-l-primary">
      <CardHeader className="flex flex-row items-center justify-between gap-2 px-3 py-2">
        <CardTitle className="truncate text-sm" title={title}>{title}</CardTitle>
        <div className="flex shrink-0 items-center gap-1">
          {isEditing ? <>
            <Button size="sm" onClick={save} aria-label="Save algorithms"><Save data-icon="inline-start" />Save</Button>
            <Button size="sm" variant="outline" onClick={cancel} aria-label="Cancel editing"><X /></Button>
          </> : <>
            <Button size="sm" variant="ghost" onClick={cycleLearningState} aria-label={`Learning status: ${learningState}`}>{statusIcon}</Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} aria-label={`Edit ${title}`}><Edit2 /></Button>
          </>}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-3 pb-3">
        {displayedImage && <div className="relative flex h-20 items-center justify-center overflow-hidden rounded-lg bg-transparent">
          <Image src={displayedImage} alt={`${title} case`} width={isF2LCase ? 92 : 72} height={isF2LCase ? 72 : 56} className="rounded-lg object-contain" style={isF2LCase || !rotateImage ? undefined : { transform: `rotate(${orientation}deg)` }} />
          {(isF2LCase || rotateImage) && <Button type="button" size="icon" variant="secondary" className="absolute bottom-1 right-1 size-8" onClick={() => setOrientation((value) => (value + 90) % 360)} aria-label={isF2LCase ? `Switch to case image ${orientation / 90 + 2 > 4 ? 1 : orientation / 90 + 2}` : `Rotate case image to ${(orientation + 90) % 360} degrees`} title={isF2LCase ? `Image ${orientation / 90 + 1} of 4` : `Orientation: ${orientation}°`}><RotateCw /></Button>}
        </div>}
        {isEditing ? <div className="grid gap-2">
          {orientations.map((degrees, index) => <label key={degrees} className="flex flex-col gap-1 text-xs font-medium">{degrees}° algorithm<Input value={editAlgorithms[index]} onChange={(event) => setEditAlgorithms((current) => current.map((value, i) => i === index ? event.target.value : value))} placeholder={`Enter ${degrees}° algorithm`} className="font-mono text-xs" /></label>)}
        </div> : <div className="flex flex-col gap-1"><div className="flex items-center justify-between text-xs text-muted-foreground"><span>{isF2LCase ? `Image ${orientation / 90 + 1} of 4` : rotateImage ? `${orientation}° orientation` : "Case image"}</span><span>{isF2LCase ? "Rotate" : rotateImage ? "Rotate to switch" : ""}</span></div><div className="min-h-12 rounded border bg-muted/40 p-2"><p className="break-words font-mono text-xs">{currentAlgorithm}</p></div></div>}
      </CardContent>
    </Card>
  )
}
