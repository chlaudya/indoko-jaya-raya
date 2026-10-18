import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Only the optimised copies may go through the image optimiser —
    // the HEIC originals in /public/image are never served.
    localPatterns: [{ pathname: "/images/optimized/**", search: "" }],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
}

export default nextConfig
