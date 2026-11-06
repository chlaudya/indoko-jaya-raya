"use client"

import { useEffect, useRef } from "react"

export function TaglineReveal({
  label,
  text,
}: {
  label: string
  text: string
}) {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const words = wordRefs.current.filter(
      (word): word is HTMLSpanElement => word !== null,
    )
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (reducedMotion) {
      words.forEach((word) => {
        word.dataset.active = "true"
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Number(a.target.getAttribute("data-index")) - Number(b.target.getAttribute("data-index")))

        visible.forEach((entry, order) => {
          window.setTimeout(() => {
            const word = entry.target as HTMLSpanElement
            word.dataset.active = "true"
            observer.unobserve(word)
          }, Math.min(order * 40, 360))
        })
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0.8 },
    )

    words.forEach((word) => observer.observe(word))
    return () => observer.disconnect()
  }, [text])

  return (
    <section className="bg-white" aria-label={label}>
      <div className="site-wrap section-y">
        <p className="label">{label}</p>
        <p className="heading-2 mt-8 max-w-[680px] text-balance">
          {text.split(/\s+/).map((word, index) => (
            <span
              key={`${word}-${index}`}
              ref={(element) => {
                wordRefs.current[index] = element
              }}
              data-index={index}
              className="tagline-word text-charcoal/30 data-[active=true]:text-charcoal"
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
