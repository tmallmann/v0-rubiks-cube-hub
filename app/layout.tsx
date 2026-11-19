import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cubing Lab — Algorithm Studio",
  description: "A focused workspace for cube algorithms, case-by-case learning progress, blindfolded memo, and solve practice.",
}

export const viewport: Viewport = {
  themeColor: "#0c1118",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>{/* No style block here */}</head>
      <body>{children}</body>
    </html>
  )
}
