import type { Metadata } from "next"
import Link from "next/link"
import { DEFAULT_LOCALE } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: true },
}

/** Root fallback when no locale segment is present. */
export default function RootNotFound() {
  return (
    <div className="band-lime">
      <div className="site-wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="label">404</p>
        <h1 className="display display-h1 mt-4 text-forest">Halaman tidak ditemukan</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          Maaf, halaman yang Anda cari tidak tersedia. Kembali ke beranda untuk menjelajahi komoditi kami.
        </p>
        <Link
          href={`/${DEFAULT_LOCALE}`}
          className="mt-10 inline-flex min-h-12 items-center rounded-[8px] btn-lime bg-lime px-6 text-sm font-semibold text-forest hover:bg-lime-tint"
        >
          Kembali ke beranda
        </Link>
      </div>
    </div>
  )
}
