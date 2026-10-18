import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // 1440 fits common desktop viewports; 420/480/820 match the ~410px card slots at 1x/2x.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 420, 480, 820],
    // Only the optimised copies may go through the image optimiser —
    // the HEIC originals in /public/image are never served.
    localPatterns: [{ pathname: "/images/optimized/**", search: "" }],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
}

export default nextConfig
