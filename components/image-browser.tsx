"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Folder, ImageIcon, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface ImageBrowserProps {
  isOpen: boolean
  onClose: () => void
  onSelectImage: (imagePath: string) => void
  category?: string
}

const imageStructure = {
  "3x3": {
    F2L: [],
    OLL: [],
    PLL: [] as string[],
  },
  "4x4": {
    F2L: [] as string[],
    OLL: [] as string[],
    PLL: [] as string[],
  },
  BLD: {
    "Letter Pairs": ["/images/bld/pairs/aa.png", "/images/bld/pairs/ab.png"],
    Flips: ["/images/bld/flips/ub.png", "/images/bld/flips/ur.png"],
    Twists: ["/images/bld/twists/ubl.png", "/images/bld/twists/ubr.png"],
  },
}

export function isValidImage(imagePath: string | undefined): boolean {
  if (!imagePath) return false

  for (const category of Object.values(imageStructure)) {
    for (const images of Object.values(category)) {
      if (Array.isArray(images) && images.includes(imagePath)) {
        return true
      }
    }
  }
  return false
}

export function getAllValidImages(): string[] {
  const allImages: string[] = []
  for (const category of Object.values(imageStructure)) {
    for (const images of Object.values(category)) {
      if (Array.isArray(images)) {
        allImages.push(...images)
      }
    }
  }
  return allImages
}

export function ImageBrowser({ isOpen, onClose, onSelectImage, category }: ImageBrowserProps) {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  if (!isOpen) return null

  const getCurrentContent = () => {
    if (currentPath.length === 0) {
      // Show main categories
      return Object.keys(imageStructure)
    } else if (currentPath.length === 1) {
      // Show subfolders for selected category
      const categoryData = imageStructure[currentPath[0] as keyof typeof imageStructure]
      return categoryData ? Object.keys(categoryData) : []
    } else if (currentPath.length === 2) {
      // Show images in selected subfolder
      const categoryData = imageStructure[currentPath[0] as keyof typeof imageStructure]
      if (categoryData) {
        const subfolderData = categoryData[currentPath[1] as keyof typeof categoryData]
        return subfolderData || []
      }
    }
    return []
  }

  const handleFolderClick = (folderName: string) => {
    setCurrentPath([...currentPath, folderName])
  }

  const handleBackClick = () => {
    setCurrentPath(currentPath.slice(0, -1))
  }

  const handleImageSelect = (imagePath: string) => {
    onSelectImage(imagePath)
    onClose()
  }

  const content = getCurrentContent()
  const isShowingImages = currentPath.length === 2

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            {currentPath.length > 0 && (
              <Button size="sm" variant="outline" onClick={handleBackClick}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <CardTitle>
              {currentPath.length === 0
                ? "Select Image Category"
                : currentPath.length === 1
                  ? `${currentPath[0]} - Select Subfolder`
                  : `${currentPath[0]} > ${currentPath[1]} - Select Image`}
            </CardTitle>
          </div>
          <Button size="sm" variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[60vh]">
          {isShowingImages ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(content as string[]).map((imagePath, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-2 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleImageSelect(imagePath)}
                >
                  <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                    <Image
                      src={imagePath || "/placeholder.svg?height=100&width=100"}
                      alt={`Image ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded object-cover"
                    />
                  </div>
                  <p className="text-xs text-center text-gray-600 truncate">
                    {imagePath.split("/").pop()?.replace(".png", "")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(content as string[]).map((folderName, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors flex flex-col items-center"
                  onClick={() => handleFolderClick(folderName)}
                >
                  <Folder className="h-12 w-12 text-blue-500 mb-2" />
                  <p className="text-sm font-medium text-center">{folderName}</p>
                </div>
              ))}
            </div>
          )}
          {content.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No images found in this folder</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
