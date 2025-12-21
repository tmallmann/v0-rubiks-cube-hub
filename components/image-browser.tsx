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
    F2L: [
      "/images/3x3/F2L/f2l11.png",
      "/images/3x3/F2L/f2l21.png",
      "/images/3x3/F2L/f2l31.png",
      "/images/3x3/F2L/f2l41.png",
      "/images/3x3/F2L/f2l51.png",
      "/images/3x3/F2L/f2l61.png",
      "/images/3x3/F2L/f2l71.png",
      "/images/3x3/F2L/f2l81.png",
      "/images/3x3/F2L/f2l91.png",
      "/images/3x3/F2L/f2l101.png",
      "/images/3x3/F2L/f2l111.png",
      "/images/3x3/F2L/f2l121.png",
      "/images/3x3/F2L/f2l131.png",
      "/images/3x3/F2L/f2l141.png",
      "/images/3x3/F2L/f2l151.png",
      "/images/3x3/F2L/f2l161.png",
      "/images/3x3/F2L/f2l171.png",
      "/images/3x3/F2L/f2l181.png",
      "/images/3x3/F2L/f2l191.png",
      "/images/3x3/F2L/f2l201.png",
      "/images/3x3/F2L/f2l211.png",
      "/images/3x3/F2L/f2l221.png",
      "/images/3x3/F2L/f2l231.png",
      "/images/3x3/F2L/f2l241.png",
      "/images/3x3/F2L/f2l251.png",
      "/images/3x3/F2L/f2l261.png",
      "/images/3x3/F2L/f2l271.png",
      "/images/3x3/F2L/f2l281.png",
      "/images/3x3/F2L/f2l291.png",
      "/images/3x3/F2L/f2l301.png",
      "/images/3x3/F2L/f2l311.png",
      "/images/3x3/F2L/f2l321.png",
      "/images/3x3/F2L/f2l331.png",
      "/images/3x3/F2L/f2l341.png",
      "/images/3x3/F2L/f2l351.png",
      "/images/3x3/F2L/f2l361.png",
      "/images/3x3/F2L/f2l371.png",
      "/images/3x3/F2L/f2l381.png",
      "/images/3x3/F2L/f2l391.png",
      "/images/3x3/F2L/f2l401.png",
      "/images/3x3/F2L/f2l411.png",
    ],
    OLL: [
      "/images/3x3/oll/oll1.png",
      "/images/3x3/oll/oll2.png",
      "/images/3x3/oll/oll3.png",
      "/images/3x3/oll/oll4.png",
      "/images/3x3/oll/oll5.png",
      "/images/3x3/oll/oll6.png",
      "/images/3x3/oll/oll7.png",
      "/images/3x3/oll/oll8.png",
      "/images/3x3/oll/oll9.png",
      "/images/3x3/oll/oll10.png",
      "/images/3x3/oll/oll11.png",
      "/images/3x3/oll/oll12.png",
      "/images/3x3/oll/oll13.png",
      "/images/3x3/oll/oll14.png",
      "/images/3x3/oll/oll15.png",
      "/images/3x3/oll/oll16.png",
      "/images/3x3/oll/oll17.png",
      "/images/3x3/oll/oll18.png",
      "/images/3x3/oll/oll19.png",
      "/images/3x3/oll/oll20.png",
      "/images/3x3/oll/oll21.png",
      "/images/3x3/oll/oll22.png",
      "/images/3x3/oll/oll23.png",
      "/images/3x3/oll/oll24.png",
      "/images/3x3/oll/oll25.png",
      "/images/3x3/oll/oll26.png",
      "/images/3x3/oll/oll27.png",
      "/images/3x3/oll/oll28.png",
      "/images/3x3/oll/oll29.png",
      "/images/3x3/oll/oll30.png",
      "/images/3x3/oll/oll31.png",
      "/images/3x3/oll/oll32.png",
      "/images/3x3/oll/oll33.png",
      "/images/3x3/oll/oll34.png",
      "/images/3x3/oll/oll35.png",
      "/images/3x3/oll/oll36.png",
      "/images/3x3/oll/oll37.png",
      "/images/3x3/oll/oll38.png",
      "/images/3x3/oll/oll39.png",
      "/images/3x3/oll/oll40.png",
      "/images/3x3/oll/oll41.png",
      "/images/3x3/oll/oll42.png",
      "/images/3x3/oll/oll43.png",
      "/images/3x3/oll/oll44.png",
      "/images/3x3/oll/oll45.png",
      "/images/3x3/oll/oll46.png",
      "/images/3x3/oll/oll47.png",
      "/images/3x3/oll/oll48.png",
      "/images/3x3/oll/oll49.png",
      "/images/3x3/oll/oll50.png",
      "/images/3x3/oll/oll51.png",
      "/images/3x3/oll/oll52.png",
      "/images/3x3/oll/oll53.png",
      "/images/3x3/oll/oll54.png",
      "/images/3x3/oll/oll55.png",
      "/images/3x3/oll/oll56.png",
      "/images/3x3/oll/oll57.png",
    ],
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
