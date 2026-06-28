const LIGHT = "#F7F6F3"
const MONO = "'DM Mono', monospace"
const LINKEDIN_URL = "https://www.linkedin.com/in/meik-puchalski-939162363/"
const EMAIL_URL = "mailto:m.puchalski@live.de"

export default function SiteFooter() {
  return (
    <div
      className="mt-24 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      style={{ borderTop: "1px solid rgba(247,246,243,0.08)" }}
    >
      <span style={{ fontFamily: MONO, fontSize: 11, color: "rgba(247,246,243,0.25)", letterSpacing: "0.1em" }}>
        Meik Puchalski — UX/UI Designer — 2026
      </span>
      <div className="flex gap-6">
        {[
          { label: "LinkedIn", href: LINKEDIN_URL, external: true },
          { label: "Email", href: EMAIL_URL, external: false },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: "rgba(247,246,243,0.25)",
              letterSpacing: "0.08em",
              cursor: "none",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(event) => ((event.currentTarget as HTMLElement).style.color = LIGHT)}
            onMouseLeave={(event) => ((event.currentTarget as HTMLElement).style.color = "rgba(247,246,243,0.25)")}
            data-hoverable
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
