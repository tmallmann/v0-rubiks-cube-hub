import { isValidImage } from "@/components/image-browser"

export function validateAndCleanImages<T extends { image?: string }>(items: T[]): T[] {
  return items.map((item) => {
    if (item.image && !isValidImage(item.image)) {
      console.log("[v0] Removing invalid image reference:", item.image)
      return { ...item, image: undefined }
    }
    return item
  })
}
