"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit2, Save, X, Trash2 } from "lucide-react"
import Image from "next/image"

interface AlgorithmCardProps {
  id: string
  title: string
  algorithm: string
  image?: string
  onUpdate: (id: string, updates: { title?: string; algorithm?: string }) => void
  onDelete?: (id: string) => void
}

export function AlgorithmCard({ id, title, algorithm, image, onUpdate, onDelete }: AlgorithmCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editAlgorithm, setEditAlgorithm] = useState(algorithm)

  const handleSave = () => {
    onUpdate(id, { title: editTitle, algorithm: editAlgorithm })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(title)
    setEditAlgorithm(algorithm)
    setIsEditing(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 py-2">
        {isEditing ? (
          <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="text-sm font-semibold" />
        ) : (
          <CardTitle className="text-sm">{title}</CardTitle>
        )}
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit2 className="h-3 w-3" />
              </Button>
              {onDelete && (
                <Button size="sm" variant="outline" onClick={() => onDelete(id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-8 px-3 pb-3">
        {image && (
          <div className="relative w-full h-24 flex items-center justify-center rounded-lg">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={120}
              height={96}
              className="rounded-lg object-contain"
            />
          </div>
        )}

        {isEditing ? (
          <Textarea
            value={editAlgorithm}
            onChange={(e) => setEditAlgorithm(e.target.value)}
            placeholder="Enter algorithm..."
            className="font-mono text-xs h-20 resize-none"
          />
        ) : (
          <div className="bg-gray-50 p-2 rounded border border-gray-200 min-h-[3rem]">
            <p className="font-mono text-xs text-gray-900 break-words">{algorithm || "No algorithm set"}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
