"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit2, Save, X, Upload, Trash2 } from "lucide-react"
import Image from "next/image"

interface AlgorithmCardProps {
  id: string
  title: string
  algorithm: string
  image?: string
  onUpdate: (id: string, updates: { title?: string; algorithm?: string; image?: string }) => void
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        onUpdate(id, { image: imageData })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    onUpdate(id, { image: undefined })
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
      <CardContent className="space-y-2 px-3 pb-3">
        {image && (
          <div className="relative">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={80}
              height={60}
              className="rounded-lg object-cover"
            />
            <Button size="sm" variant="destructive" className="absolute top-2 right-2" onClick={handleRemoveImage}>
              <X className="h-2 w-2" />
            </Button>
          </div>
        )}

        {isEditing ? (
          <Textarea
            value={editAlgorithm}
            onChange={(e) => setEditAlgorithm(e.target.value)}
            placeholder="Enter algorithm..."
            className="font-mono text-xs h-16"
          />
        ) : (
          <div className="bg-gray-100 p-2 rounded text-xs">
            <code>{algorithm || "No algorithm set"}</code>
          </div>
        )}

        <div className="flex space-x-2">
          <label className="cursor-pointer">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <Button size="sm" variant="outline" asChild>
              <span>
                <Upload className="h-3 w-3 mr-2" />
                {image ? "Change Image" : "Add Image"}
              </span>
            </Button>
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
