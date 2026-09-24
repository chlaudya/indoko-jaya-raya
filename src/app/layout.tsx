import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "PT Indoco Jaya Raya",
  description: "Company profile & commodity e-catalog",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
