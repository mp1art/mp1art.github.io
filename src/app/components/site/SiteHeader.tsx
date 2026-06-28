type SiteHeaderProps = {
  activeSection?: string
  currentPage?: "home" | "case-study"
  menuOpen: boolean
  navScrolled: boolean
  onContactClick: () => void
  setMenuOpen: (open: boolean | ((open: boolean) => boolean)) => void
  variant?: "light" | "dark"
}

const ACCENT = "#FFFA00"
const ACCENT_TEXT = "#5C5800"
const DARK = "#0D0D0D"
const LIGHT = "#F7F6F3"
const DISPLAY = "'Big Shoulders Display', sans-serif"
const MONO = "'DM Mono', monospace"

const navLinks = [
  { label: "My Story", id: "section-story" },
  { label: "Drive", id: "section-drive" },
  { label: "Work", id: "section-work" },
  { label: "About", id: "section-about" },
]

export default function SiteHeader({
  activeSection = "",
  currentPage = "home",
  menuOpen,
  navScrolled,
  onContactClick,
  setMenuOpen,
  variant = "light",
}: SiteHeaderProps) {
  const isDarkVariant = variant === "dark" && !navScrolled && !menuOpen
  const logoColor = isDarkVariant ? LIGHT : DARK
  const contactButtonColor = isDarkVariant ? LIGHT : DARK
  const contactButtonBorder = isDarkVariant ? LIGHT : DARK
  const menuLineColor = isDarkVariant ? LIGHT : DARK

  const navigateToSection = (id: string) => {
    if (currentPage === "home") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      return
    }

    window.location.assign(`/#${id}`)
  }

  const navigateHome = () => {
    if (currentPage === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    window.location.assign("/")
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-5 flex items-center justify-between transition-all duration-500"
        style={{
          backdropFilter: navScrolled || menuOpen ? "blur(14px)" : "none",
          borderBottom: navScrolled ? "1px solid rgba(13,13,13,0.08)" : "1px solid transparent",
          background: navScrolled || menuOpen ? "rgba(247,246,243,0.97)" : "transparent",
        }}
      >
        <button
          onClick={navigateHome}
          style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.22em", background: "none", border: "none", cursor: "none" }}
          data-hoverable
        >
          <span
            className="uppercase transition-colors duration-300"
            style={{ color: logoColor }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ACCENT_TEXT)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = logoColor)}
          >
            MP
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, id }) => {
            const isActive = currentPage === "home" && activeSection === id
            return (
              <button
                key={id}
                onClick={() => navigateToSection(id)}
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  background: "none",
                  border: "none",
                  cursor: "none",
                  color: isActive ? DARK : "#9A9890",
                  transition: "color 0.25s ease",
                  position: "relative",
                  paddingBottom: 2,
                }}
                className="uppercase"
                data-hoverable
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = DARK
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = "#9A9890"
                }}
              >
                {label}
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: ACCENT,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 0.3s ease",
                    transformOrigin: "left",
                  }}
                />
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onContactClick}
            className="px-5 py-2 transition-all duration-300"
            style={{
              border: `1px solid ${contactButtonBorder}`,
              color: contactButtonColor,
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.1em",
              cursor: "none",
            }}
            onMouseEnter={(event) => {
              ;(event.currentTarget as HTMLElement).style.background = contactButtonColor
              ;(event.currentTarget as HTMLElement).style.color = isDarkVariant ? DARK : LIGHT
            }}
            onMouseLeave={(event) => {
              ;(event.currentTarget as HTMLElement).style.background = "transparent"
              ;(event.currentTarget as HTMLElement).style.color = contactButtonColor
            }}
            data-hoverable
          >
            Contact
          </button>
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 items-center"
            onClick={() => setMenuOpen((open) => !open)}
            style={{ background: "none", border: "none", cursor: "none" }}
            aria-label="Menu"
            data-hoverable
          >
            <span style={{ display: "block", width: 22, height: 1.5, background: menuLineColor, transition: "transform 0.3s ease, opacity 0.3s ease", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: menuLineColor, transition: "opacity 0.3s ease", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: menuLineColor, transition: "transform 0.3s ease, opacity 0.3s ease", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </nav>

      <div
        className="fixed inset-0 z-[170] md:hidden flex flex-col"
        style={{
          background: LIGHT,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div className="flex items-center justify-between px-8 py-5 shrink-0" style={{ borderBottom: "1px solid rgba(13,13,13,0.08)" }}>
          <button
            onClick={() => {
              navigateHome()
              setMenuOpen(false)
            }}
            style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.22em", background: "none", border: "none", cursor: "none", color: DARK }}
            data-hoverable
          >
            MP
          </button>

          <button
            onClick={() => {
              setMenuOpen(false)
              onContactClick()
            }}
            className="border border-foreground px-5 py-2"
            style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", cursor: "none", color: DARK }}
            data-hoverable
          >
            Contact
          </button>

          <button
            onClick={() => setMenuOpen(false)}
            style={{ background: "none", border: "none", cursor: "none", color: DARK, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label="Close menu"
            data-hoverable
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col px-8 pt-10 pb-16 justify-between flex-1">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ label, id }, index) => {
              const isActive = currentPage === "home" && activeSection === id
              return (
                <button
                  key={id}
                  onClick={() => {
                    navigateToSection(id)
                    setMenuOpen(false)
                  }}
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 900,
                    textAlign: "left",
                    fontSize: "clamp(52px, 13vw, 88px)",
                    lineHeight: 0.92,
                    background: "none",
                    border: "none",
                    cursor: "none",
                    color: isActive ? DARK : "#CCCCC6",
                    transition: "color 0.25s ease",
                    letterSpacing: "-0.01em",
                    transitionDelay: menuOpen ? `${index * 50}ms` : "0ms",
                  }}
                  className="uppercase"
                  data-hoverable
                >
                  {label}
                </button>
              )
            })}
          </nav>
          <p style={{ fontFamily: MONO, fontSize: 11, color: "#AEACA6", letterSpacing: "0.1em" }} className="uppercase">
            Meik Puchalski — UX/UI Designer
          </p>
        </div>
      </div>
    </>
  )
}
