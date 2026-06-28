import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import SiteFooter from "./SiteFooter"

type SiteContactSectionProps = {
  onContactClick: () => void
  variant?: "light" | "dark"
}

const ACCENT = "#FFFA00"
const DARK = "#0D0D0D"
const LIGHT = "#F7F6F3"
const DISPLAY = "'Big Shoulders Display', sans-serif"

export default function SiteContactSection({ onContactClick, variant = "light" }: SiteContactSectionProps) {
  const revealRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const isDarkVariant = variant === "dark"
  const contactButtonStyle = isDarkVariant
    ? {
        background: "transparent",
        border: `1px solid ${LIGHT}`,
        color: LIGHT,
      }
    : {
        background: ACCENT,
        border: "1px solid transparent",
        color: DARK,
      }

  useEffect(() => {
    const element = revealRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="min-h-screen flex flex-col justify-between py-24 px-8 md:px-16 border-t border-border"
      style={{ background: DARK, color: LIGHT }}
    >
      <div
        ref={revealRef}
        id="s6-top"
        data-reveal
        className="flex-1 flex flex-col justify-center pt-16"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0px)" : "translateY(28px)",
          transition: "opacity 0.8s ease 0ms, transform 0.8s ease 0ms",
        }}
      >
        <h2
          className="uppercase leading-none mb-0"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: "clamp(64px, 14vw, 200px)",
            WebkitTextStroke: "2px rgba(247,246,243,0.2)",
            color: "transparent",
            lineHeight: 0.88,
          }}
        >
          STILL
        </h2>

        {[
          { word: "curious.", color: ACCENT },
          { word: "learning.", color: LIGHT },
          { word: "building.", color: LIGHT },
        ].map(({ word, color }) => (
          <p
            key={word}
            className="uppercase leading-none"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontSize: "clamp(64px, 14vw, 200px)",
              color,
              lineHeight: 0.92,
            }}
          >
            {word}
          </p>
        ))}

        <p
          className="mt-16 max-w-xs"
          style={{ color: "rgba(247,246,243,0.4)", fontSize: 17, lineHeight: 1.8, fontWeight: 300 }}
        >
          Thanks for taking the time
          <br />
          to get to know me.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onContactClick}
            className="inline-flex items-center gap-3 px-8 py-4 group"
            style={{
              ...contactButtonStyle,
              fontWeight: 500,
              fontSize: 15,
              cursor: "none",
              transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
            }}
            data-hoverable
            aria-haspopup="dialog"
          >
            <span>Let's create something together</span>
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
            />
          </button>
          <a
            href="/Lebenslauf-MP-English-New.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4"
            style={{
              border: "1px solid rgba(247,246,243,0.15)",
              color: "rgba(247,246,243,0.5)",
              fontSize: 15,
              cursor: "none",
              transition: "color 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(event) => {
              ;(event.currentTarget as HTMLElement).style.color = LIGHT
              ;(event.currentTarget as HTMLElement).style.borderColor = "rgba(247,246,243,0.4)"
            }}
            onMouseLeave={(event) => {
              ;(event.currentTarget as HTMLElement).style.color = "rgba(247,246,243,0.5)"
              ;(event.currentTarget as HTMLElement).style.borderColor = "rgba(247,246,243,0.15)"
            }}
            data-hoverable
          >
            Download CV
          </a>
        </div>
      </div>

      <SiteFooter />
    </section>
  )
}
