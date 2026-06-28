import { ArrowUpRight } from "lucide-react"

type SiteContactModalProps = {
  onClose: () => void
}

const ACCENT_TEXT = "#5C5800"
const DARK = "#0D0D0D"
const DISPLAY = "'Big Shoulders Display', sans-serif"
const MONO = "'DM Mono', monospace"
const LINKEDIN_URL = "https://www.linkedin.com/in/meik-puchalski-939162363/"
const EMAIL_ADDRESS = "m.puchalski@live.de"
const EMAIL_URL = `mailto:${EMAIL_ADDRESS}`

export default function SiteContactModal({ onClose }: SiteContactModalProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: "rgba(13,13,13,0.55)",
        backdropFilter: "blur(6px)",
        animation: "fadeIn 250ms ease forwards",
      }}
      onClick={onClose}
    >
      <div
        className="relative"
        style={{
          background: "#FAF8F4",
          border: "1px solid rgba(13,13,13,0.12)",
          padding: "clamp(40px, 6vw, 72px)",
          maxWidth: 520,
          width: "90vw",
          animation: "scaleIn 300ms cubic-bezier(0.16,1,0.3,1) forwards",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6"
          style={{ background: "none", border: "none", cursor: "none", color: "#9A9890" }}
          data-hoverable
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2
          className="uppercase mb-3"
          style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 0.9, color: DARK }}
        >
          Let's connect.
        </h2>
        <p style={{ color: "#787870", fontSize: 15, lineHeight: 1.7, fontWeight: 300, marginBottom: 48, maxWidth: 360 }}>
          Whether it's design, product thinking, freelance work or a new opportunity — feel free to reach out.
        </p>

        <div className="flex flex-col gap-5">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
            style={{ textDecoration: "none", cursor: "none" }}
            data-hoverable
          >
            <div
              style={{ width: 40, height: 40, border: "1px solid rgba(13,13,13,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s ease, border-color 0.2s ease" }}
              onMouseEnter={(event) => {
                ;(event.currentTarget as HTMLElement).style.background = DARK
                ;(event.currentTarget as HTMLElement).style.borderColor = DARK
              }}
              onMouseLeave={(event) => {
                ;(event.currentTarget as HTMLElement).style.background = "transparent"
                ;(event.currentTarget as HTMLElement).style.borderColor = "rgba(13,13,13,0.12)"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ transition: "color 0.2s ease" }}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.15em", color: ACCENT_TEXT, marginBottom: 2 }} className="uppercase">
                LinkedIn
              </p>
              <p style={{ color: DARK, fontSize: 15, fontWeight: 400 }}>LinkedIn Profile</p>
            </div>
            <ArrowUpRight size={16} className="ml-auto opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
          </a>

          <div style={{ height: 1, background: "rgba(13,13,13,0.08)" }} />

          <a href={EMAIL_URL} className="flex items-center gap-4 group" style={{ textDecoration: "none", cursor: "none" }} data-hoverable>
            <div
              style={{ width: 40, height: 40, border: "1px solid rgba(13,13,13,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s ease, border-color 0.2s ease" }}
              onMouseEnter={(event) => {
                ;(event.currentTarget as HTMLElement).style.background = DARK
                ;(event.currentTarget as HTMLElement).style.borderColor = DARK
              }}
              onMouseLeave={(event) => {
                ;(event.currentTarget as HTMLElement).style.background = "transparent"
                ;(event.currentTarget as HTMLElement).style.borderColor = "rgba(13,13,13,0.12)"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.15em", color: ACCENT_TEXT, marginBottom: 2 }} className="uppercase">
                Email
              </p>
              <p style={{ color: DARK, fontSize: 15, fontWeight: 400 }}>{EMAIL_ADDRESS}</p>
            </div>
            <ArrowUpRight size={16} className="ml-auto opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
          </a>
        </div>

        <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.15em", color: "#AEACA6", marginTop: 40 }} className="uppercase">
          Based in Cologne, Germany.
        </p>
      </div>
    </div>
  )
}
