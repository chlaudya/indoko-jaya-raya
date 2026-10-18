import Image from "next/image"
import { pickLocale, type Locale } from "@/lib/i18n"
import { IMAGES, type ImageKey } from "@/lib/images"

const heights = {
  tall: "min-h-[560px] lg:min-h-[80vh]",
  medium: "min-h-[480px] lg:min-h-[62vh]",
  short: "min-h-[380px] lg:min-h-[48vh]",
}

/**
 * Full-bleed photo (or muted looping video) hero with a bottom-left gradient
 * and one large statement. Only hero images get `preload`.
 */
export function HeroFullBleed({
  locale,
  image,
  videoSrc,
  eyebrow,
  title,
  lead,
  children,
  bottom,
  height = "tall",
  titleSize = "display-xl",
  as: Heading = "h1",
}: {
  locale: Locale
  image?: ImageKey
  videoSrc?: string
  eyebrow?: string
  title: string
  lead?: string
  children?: React.ReactNode
  bottom?: React.ReactNode
  height?: keyof typeof heights
  titleSize?: "display-xl" | "display-h1"
  as?: "h1" | "h2"
}) {
  const meta = image ? IMAGES[image] : undefined
  return (
    <section data-hero className={`relative isolate flex overflow-hidden bg-forest text-white ${heights[height]}`}>
      <div className="absolute inset-0 -z-10">
        {meta ? (
          <Image src={meta.src} alt={pickLocale(meta.alt, locale)} fill preload sizes="100vw" className="object-cover" />
        ) : (
          <div className="ph ph-field absolute inset-0" />
        )}
        {videoSrc && (
          <video
            className="absolute inset-0 size-full object-cover motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            poster={meta?.src}
            aria-hidden="true"
          >
            <source src={videoSrc} />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,30,22,0.75)] via-[rgba(13,30,22,0.25)] to-transparent lg:hidden" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(13,30,22,0.88)_0%,rgba(13,30,22,0.55)_40%,rgba(13,30,22,0.05)_80%)]" />
      </div>
      <div className={`site-wrap flex w-full flex-col justify-end ${bottom ? "pt-32 pb-28 lg:pt-36 lg:pb-32" : "pt-32 pb-16 lg:pt-36 lg:pb-24"}`}>
        <div className="fade-up max-w-4xl">
          {eyebrow && <p className="label text-soft-sage!">{eyebrow}</p>}
          <Heading className={`display ${titleSize} mt-5 text-balance`}>{title}</Heading>
          {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 lg:text-xl">{lead}</p>}
          {children && <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">{children}</div>}
        </div>
      </div>
      {bottom}
    </section>
  )
}
