import { isValidImage } from "@/components/image-browser"

export function validateAndCleanImages(items: Array<{ image?: string }>): any[] {
  return items.map((item) => {
    if (item.image && !isValidImage(item.image)) {
      console.log("[v0] Removing invalid image reference:", item.image)
      return { ...item, image: undefined }
    }
    return item
  })
}
