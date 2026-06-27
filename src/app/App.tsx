import React, { useState, useEffect, useRef, useCallback } from "react"
import { ArrowUpRight, ArrowDown, Plus, Minus } from "lucide-react"
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback"
import PrematchCaseStudy from "@/app/projects/prematch/PrematchCaseStudy"
import imgFootballer from "@/imports/Soccer.JPG"
import imgCalisthenics from "@/imports/Calisthenics-1.jpg"
import imgDesigner from "@/imports/Designer-1.jpg"
import imgGamer from "@/imports/Gamer-1.jpg"
import imgExplorer from "@/imports/Traveler.jpg"
import imgProfile from "@/imports/Mp-teaser.png"

// ─── Constants ────────────────────────────────────────────────────────────────
// ACCENT_VIVID: used on dark backgrounds and as background color with dark text
const ACCENT = "#FFFA00"
// ACCENT_TEXT: AA-readable yellow on light backgrounds (contrast ≥ 4.5:1 on #F7F6F3)
const ACCENT_TEXT = "#5C5800"
const DARK = "#0D0D0D"
const LIGHT = "#F7F6F3"

const DISPLAY = "'Big Shoulders Display', sans-serif"
const BODY = "'DM Sans', sans-serif"
const MONO = "'DM Mono', monospace"

const LINKEDIN_URL = "https://www.linkedin.com/in/meik-puchalski-939162363/"
const EMAIL_ADDRESS = "m.puchalski@live.de"
const EMAIL_URL = `mailto:${EMAIL_ADDRESS}`

// ─── Data ─────────────────────────────────────────────────────────────────────
const timeline = [
  {
    year: "2025",
    title: "A new chapter begins.",
    detail: "After 12 years with Mobilezone through multiple restructurings, this chapter ended.The next one is about focus, growth and building meaningful digital experiences.",
    accent: true,
  },
  {
    year: "2018–2025",
    title: "UI/UX Designer",
    detail: "Designed and optimised e-commerce experiences across Sparhandy, Deinhandy and High-Mobile.Worked on product pages, tariff flows, checkout processes, UX audits, Figma prototypes and design systems.",
    accent: false,
  },
  {
    year: "2016-2018",
    title: "Graphic Designer",
    detail: "Designed marketing materials and campaign visuals for print and digital channels.This was the bridge from communication design into product design.",
    accent: false,
  },
  {
    year: "2015-2016",
    title: "Sales Associate · POS",
    detail: "Worked directly with customers around smartphones, contracts and bundle offers.Learned how people make decisions when products feel complex.",
    accent: false,
  },
  {
    year: "2012-2015",
    title: "Apprenticeship · IT Management Assistant",
    detail: "Built my foundation in IT, business processes, project management and customer consulting.",
    accent: false,
  },
]

const pillars = [
  {
    symbol: "◎",
    label: "Design",
    lines: ["Creating experiences.", "Simplifying complexity.", "Making ideas tangible."],
    note: "It's not decoration. It's how I think.",
  },
  {
    symbol: "△",
    label: "Sport",
    lines: ["Football and Calisthenics.", "Competition.", "Discipline.", "Personal growth."],
    note: "Small improvements compound. Sport taught me that before design did.",
  },
  {
    symbol: "□",
    label: "Curiosity",
    lines: ["Games.", "Technology.", "Interfaces.", "Trying new things."],
    note: "The best ideas come from the most unexpected places.",
  },
]

type Project = {
  title: string
  year: string
  category: string
  tagline: string
  problem: string
  process: string
  solution: string
  learned: string
  link: string
  password?: string
  ctaLabel?: string
}

const projects: Project[] = [
  {
    title: "Prematch Challenge",
    year: "2026",
    category: "Product Design · Sports · Mobile",
    tagline: "Turning player stats into motivation, progression and recognition.",
    problem:
      "Prematch already provided player statistics, but the experience offered little motivation to return regularly. Performance data lacked context, progression and meaningful recognition.",
    process:
      "Analysed the existing stats experience, conducted user research with amateur football players and benchmarked platforms such as Kickbase, Bundesliga Fantasy Manager and Sofascore. Identified progression, comparison and recognition as the strongest opportunities.",
    solution:
      "Redesigned the stats experience around three core pillars: Current Stats, Rankings and Achievements. Introduced clearer performance metrics, Team of the Week recognition, player comparisons and an XP-based achievement system.",
    learned:
      "Statistics become significantly more engaging when they provide context. Progression, comparison and recognition transform numbers into motivation.",
    link: "/projects/prematch",
    password: "MP2016",
  },
  {
    title: "Interactive Resume",
    year: "2025",
    category: "UX Design · Self-initiated",
    tagline: "A resume that shows, not tells.",
    problem:
      "Traditional resumes flatten people. PDFs can't communicate personality, craft, or how someone thinks.",
    process:
      "Challenged myself to redesign my own story as an experience. Explored metaphors — timeline as journey, skills as ecosystem, personality through interaction.",
    solution:
      "A web-based resume where every interaction reveals something about how I work — not just what I've done.",
    learned:
      "Designing for yourself is the hardest brief. You know too much and care too much. But that's exactly why it's worth it.",
    link: "https://www.figma.com/proto/9Mu3z2h2OfnuEogPRoEkcU/CV---MP?node-id=937-62784&t=umZus3aTmzE0MUTI-1",
    ctaLabel: "Explore in Resume",
  },
  {
    title: "E WIE EINFACH Audit",
    year: "2026",
    category: "UX Audit · CRO · Energy",
    tagline: "Finding friction before users drop off.",
    problem:
      "The mobile journey from product selection to checkout contained several moments where users could lose orientation, confidence or motivation to continue.",
    process:
      "Conducted a comprehensive UX audit focused on flow continuity, visual hierarchy, decision-making friction, content clarity and tone of voice. Evaluated the complete customer journey from need discovery to checkout.",
    solution:
      "Delivered a structured audit with prioritised recommendations and actionable optimisation opportunities. Focus areas included flow continuity, experience tonality and portfolio expansion to improve user confidence and conversion potential.",
    learned:
      "A great audit does more than identify issues. It reveals where user confidence breaks and what needs to change to keep the journey moving.",
    link: "https://www.figma.com/proto/fKJiupkOHKK3lvFKAlHWrr/E-Wie-Einfach?node-id=107-5500&t=Zk44fMLNXULpVvmx-1",
  },
  {
    title: "CRO & Product Optimisation",
    year: "2018–2025",
    category: "UX/UI · CRO · E-Commerce",
    tagline: "Turning user friction into measurable improvements.",
    problem:
      "In telecom e-commerce, small moments of confusion can quickly become lost conversions. Product pages, tariff cards and checkout flows needed to explain complex offers faster and guide users more clearly.",
    process:
      "Analysed user behaviour with tools like Hotjar, reviewed conversion paths and worked with hypotheses, A/B tests and UX patterns across PDP, PLP and checkout experiences.",
    solution:
      "Designed and optimised conversion-focused components such as tariff cards, deal modules, buy-box patterns and clearer product flows for brands like Sparhandy, DeinHandy, HIGH Mobile and Mobilezone.",
    learned:
      "Good CRO is not about pushing users harder. It is about removing the reasons they hesitate.",
    link: "https://www.figma.com/proto/9Mu3z2h2OfnuEogPRoEkcU/CV-MP?node-id=0-1&p=f&viewport=471%2C316%2C0.02&t=JKMfWWwfmr4DOXaa-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1218%3A50123&show-proto-sidebar=1",
    ctaLabel: "Explore in Resume",
  },
  {
    title: "WISO MeinBüro Challenge",
    year: "2026",
    category: "UX/UI · SaaS",
    tagline: "Making administration feel less like work.",
    problem:
    "Freelancers want to focus on their business, not on taxes, invoices and legal requirements. The landing page wasn't reflecting that mindset.",
    process:
     "Questioned the existing structure, simplified complex content and explored how interaction design could reduce cognitive load while increasing confidence.",
    solution:
     "Created a cleaner and more approachable experience with stronger hierarchy, contextual visuals and conversion-focused storytelling.",
    learned:
      "The best interfaces don't make people feel efficient. They make them feel capable.",
    link: "https://www.figma.com/design/9Mu3z2h2OfnuEogPRoEkcU/CV---MP?node-id=1218-50123&t=umZus3aTmzE0MUTI-1",
  },
  {
    title: "Mobilezone Ecosystem",
    year: "2018–2025",
    category: "UX/UI · Design Systems · E-Commerce",
    tagline: "Designing experiences across brands, markets and millions of customer interactions.",
    problem:
      "Mobilezone operates multiple telecom brands across Germany and Switzerland, each with its own audience, products and business goals. Maintaining consistency while allowing flexibility was a constant challenge.",
    process:
      "Collaborated closely with product owners, developers and stakeholders across brands such as Sparhandy, DeinHandy, HIGH Mobile, TalkTalk, Simyo and Mobilezone Switzerland. Conducted UX research, created user flows and continuously improved experiences based on customer behaviour and business goals.",
    solution:
      "Contributed to a scalable design ecosystem with reusable components, consistent interaction patterns and conversion-focused experiences across product pages, checkout flows and promotional campaigns.",
    learned:
      "A design system isn't a library of components. It's a shared language that helps teams move faster while creating experiences users can trust.",
    link: "https://www.figma.com/proto/9Mu3z2h2OfnuEogPRoEkcU/CV-MP?node-id=0-1&p=f&viewport=471%2C316%2C0.02&t=JKMfWWwfmr4DOXaa-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=937%3A74313&show-proto-sidebar=1",
    ctaLabel: "Explore in Resume",
  },
  {
    title: "Padel Planner",
    year: "2025 – Present",
    category: "Product Design · Sports · Passion Project",
    tagline: "A product I'm still actively building and refining.",
    problem:
      "Organising padel sessions can become unnecessarily complex. Player availability, match planning and Americano tournament organisation are often spread across multiple tools and chat groups.",
    process:
      "Worked closely with players, mapped planning workflows, tested concepts and continuously refined the product through real-world feedback and iterative prototyping.",
    solution:
      "An evolving mobile-first platform designed to simplify session planning, player coordination and Americano tournament management for amateur padel communities.",
    learned:
      "The biggest opportunity wasn't court booking itself. It was reducing the coordination effort that happens before players ever step onto the court.",
    link: "https://www.figma.com/proto/9Mu3z2h2OfnuEogPRoEkcU/CV---MP?node-id=937-74167&p=f&viewport=471%2C316%2C0.02&t=JKMfWWwfmr4DOXaa-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=937%3A74167&show-proto-sidebar=1",
    ctaLabel: "Explore in Resume",
  },
]

// ─── Collage card content ─────────────────────────────────────────────────────
const cardContent: Record<string, { subtitle: string; lines: string[]; mobileLines: string[] }> = {
  footballer: {
    subtitle: "More than a hobby.",
    lines: [
      "Football taught me teamwork, accountability and how to perform under pressure.",
      "I've been playing since childhood and currently serve as co-captain of my team.",
    ],
    mobileLines: [
      "Football taught me teamwork, accountability and how to perform under pressure.",
      "Co-Captain · FC Bergheim 2000",
    ],
  },
  calisthenics: {
    subtitle: "Progress you can't fake.",
    lines: [
      "Every skill starts with failure. That's what I love about it.",
      "You earn every rep, every hold and every breakthrough.",
    ],
    mobileLines: [
      "Every skill starts with failure.",
      "That's exactly what makes it rewarding.",
    ],
  },
  designer: {
    subtitle: "Curiosity became a career.",
    lines: [
      "What started with banners and landing pages evolved into UX, CRO and product design.",
      "I still enjoy solving problems more than designing screens.",
    ],
    mobileLines: [
      "What started with visual design evolved into solving problems through digital products.",
    ],
  },
  gamer: {
    subtitle: "Stories. Systems. Exploration.",
    lines: [
      "Favourite games: The Last of Us Part I & II",
      "Most anticipated: GTA VI · Favourite anime: One Piece",
      "Gaming shaped how I think about progression, motivation and user experiences.",
    ],
    mobileLines: [
      "Favourite Games: The Last of Us Part I & II",
      "Most Anticipated: GTA VI",
      "Favourite Anime: One Piece",
      "Gaming shaped how I think about progression, motivation and user experiences.",
    ],
  },
  explorer: {
    subtitle: "New places. New perspectives.",
    lines: [
      "Whether travelling, meeting people or simply trying something unfamiliar —",
      "the best ideas often come from outside your comfort zone.",
    ],
    mobileLines: [
      "The best ideas rarely come from staying in the same environment.",
    ],
  },
}

const aboutCards = [
  { id: "footballer", imageName: "footballer", src: imgFootballer, alt: "Meik playing football", objectPos: "object-center", gridColumn: "1 / 2", gridRow: "1 / 3", delay: 0 },
  { id: "calisthenics", imageName: "calisthenics", src: imgCalisthenics, alt: "Meik doing calisthenics", objectPos: "object-center", gridColumn: "2 / 4", gridRow: "1 / 2", delay: 80 },
  { id: "designer", imageName: "designer", src: imgDesigner, alt: "Late night design session", objectPos: "object-center", gridColumn: "2 / 3", gridRow: "2 / 3", delay: 160 },
  { id: "gamer", imageName: "gamer", src: imgGamer, alt: "Gaming setup", objectPos: "object-center", gridColumn: "3 / 4", gridRow: "2 / 3", delay: 240 },
  { id: "explorer", imageName: "explorer", src: imgExplorer, alt: "Travel and exploration", objectPos: "object-center", gridColumn: "4 / 5", gridRow: "1 / 3", delay: 320 },
] as const

// ─── Reveal hook ──────────────────────────────────────────────────────────────
function useReveal() {
  const [visible, setVisible] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) {
            setVisible((prev) => new Set([...prev, e.target.id]))
          }
        })
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    )
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return useCallback((id: string) => visible.has(id), [visible])
}

// ─── Revealed wrapper ─────────────────────────────────────────────────────────
function Reveal({
  id,
  delay = 0,
  children,
  className = "",
  style: extraStyle,
}: {
  id: string
  delay?: number
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const isVisible = useReveal()
  const vis = isVisible(id)
  return (
    <div
      id={id}
      data-reveal
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
function HomePage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [copiedPassword, setCopiedPassword] = useState(false)

  const copyPassword = (pw: string) => {
    try {
      const el = document.createElement("textarea")
      el.value = pw
      el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0"
      document.body.appendChild(el)
      el.focus()
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopiedPassword(true)
      setTimeout(() => setCopiedPassword(false), 2000)
    } catch {
      // silent fail
    }
  }
  const [activeSection, setActiveSection] = useState<string>("")
  const [contactOpen, setContactOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [cursorHover, setCursorHover] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const imgRefMobile = useRef<HTMLDivElement>(null)
  const imgRefDesktop = useRef<HTMLDivElement>(null)
  const [heroClipPath, setHeroClipPath] = useState("inset(0px 100% 0px 0px)")
  const rafRef = useRef<number | null>(null)

  const updateHeroClip = useCallback(() => {
    const isMobile = window.innerWidth < 768
    const imgEl = isMobile ? imgRefMobile.current : imgRefDesktop.current
    const textEl = heroTextRef.current
    if (!imgEl || !textEl) return
    const imgRect = imgEl.getBoundingClientRect()
    const textRect = textEl.getBoundingClientRect()
    const top    = Math.max(0, imgRect.top    - textRect.top)
    const right  = Math.max(0, textRect.right  - imgRect.right)
    const bottom = Math.max(0, textRect.bottom - imgRect.bottom)
    const left   = Math.max(0, imgRect.left   - textRect.left)
    setHeroClipPath(`inset(${top}px ${right}px ${bottom}px ${left}px)`)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
      // Update clip after each CSS transition frame
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateHeroClip)
    }
    const onScroll = () => { setNavScrolled(window.scrollY > 60); updateHeroClip() }

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setContactOpen(false) }

    // Active section observer
    const sectionObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.3 }
    )
    const sections = ["section-story", "section-drive", "section-work", "section-about"]
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) sectionObs.observe(el)
    })

    const onResize = () => updateHeroClip()
    setTimeout(updateHeroClip, 120)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("scroll", onScroll)
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
      sectionObs.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateHeroClip])

  // Attach hover listeners for interactive elements
  useEffect(() => {
    const els = document.querySelectorAll("a, button, [data-hoverable]")
    const on = () => setCursorHover(true)
    const off = () => setCursorHover(false)
    els.forEach((el) => {
      el.addEventListener("mouseenter", on)
      el.addEventListener("mouseleave", off)
    })
    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", on)
        el.removeEventListener("mouseleave", off)
      })
    }
  }, [])

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: BODY, cursor: "none" }}
    >
      {/* ── Custom cursor ── */}
      <div
        className="fixed z-[999] pointer-events-none mix-blend-difference"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: cursorHover ? 40 : 10,
          height: cursorHover ? 40 : 10,
          borderRadius: "50%",
          background: LIGHT,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s ease, height 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            color: "#FFF800",
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1,
            opacity: cursorHover ? 1 : 0,
            transition: "opacity 0.25s ease",
            userSelect: "none",
          }}
        >
          +
        </span>
      </div>

      {/* ── Nav ── */}
      {(() => {
        const scrollTo = (id: string) => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        }
        const navLinks = [
          { label: "My Story", id: "section-story" },
          { label: "Drive",    id: "section-drive" },
          { label: "Work",     id: "section-work"  },
          { label: "About",    id: "section-about" },
        ]
        return (
          <>
            <nav
              className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-5 flex items-center justify-between transition-all duration-500"
              style={{
                backdropFilter: navScrolled || menuOpen ? "blur(14px)" : "none",
                borderBottom: navScrolled ? `1px solid rgba(13,13,13,0.08)` : "1px solid transparent",
                background: navScrolled || menuOpen ? "rgba(247,246,243,0.97)" : "transparent",
              }}
            >
              {/* Logo */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.22em", background: "none", border: "none", cursor: "none" }}
                data-hoverable
              >
                <span
                  className="uppercase transition-colors duration-300"
                  style={{ color: DARK }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ACCENT_TEXT)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = DARK)}
                >
                  MP
                </span>
              </button>

              {/* Desktop center links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map(({ label, id }) => {
                  const isActive = activeSection === id
                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      style={{
                        fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em",
                        background: "none", border: "none", cursor: "none",
                        color: isActive ? DARK : "#9A9890",
                        transition: "color 0.25s ease",
                        position: "relative", paddingBottom: 2,
                      }}
                      className="uppercase"
                      data-hoverable
                      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = DARK }}
                      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "#9A9890" }}
                    >
                      {label}
                      <span style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                        background: ACCENT,
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        transition: "transform 0.3s ease", transformOrigin: "left",
                      }} />
                    </button>
                  )
                })}
              </div>

              {/* Right side */}
              <div className="flex items-center gap-4">
                {/* Contact — always visible */}
                <button
                  onClick={() => setContactOpen(true)}
                  className="border border-foreground px-5 py-2 hover:bg-foreground hover:text-background transition-all duration-300"
                  style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", cursor: "none" }}
                  data-hoverable
                >
                  Contact
                </button>
                {/* Hamburger — mobile only */}
                <button
                  className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 items-center"
                  onClick={() => setMenuOpen((v) => !v)}
                  style={{ background: "none", border: "none", cursor: "none" }}
                  aria-label="Menu"
                  data-hoverable
                >
                  <span style={{ display: "block", width: 22, height: 1.5, background: DARK, transition: "transform 0.3s ease, opacity 0.3s ease", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
                  <span style={{ display: "block", width: 22, height: 1.5, background: DARK, transition: "opacity 0.3s ease", opacity: menuOpen ? 0 : 1 }} />
                  <span style={{ display: "block", width: 22, height: 1.5, background: DARK, transition: "transform 0.3s ease, opacity 0.3s ease", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
                </button>
              </div>
            </nav>

            {/* ── Mobile Menu Overlay ── */}
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
              {/* Top bar — mirrors the nav */}
              <div
                className="flex items-center justify-between px-8 py-5 shrink-0"
                style={{ borderBottom: `1px solid rgba(13,13,13,0.08)` }}
              >
                {/* MP logo */}
                <button
                  onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false) }}
                  style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.22em", background: "none", border: "none", cursor: "none", color: DARK }}
                  data-hoverable
                >
                  MP
                </button>

                {/* Contact */}
                <button
                  onClick={() => { setMenuOpen(false); setContactOpen(true) }}
                  className="border border-foreground px-5 py-2"
                  style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", cursor: "none", color: DARK }}
                  data-hoverable
                >
                  Contact
                </button>

                {/* Close */}
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{ background: "none", border: "none", cursor: "none", color: DARK, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}
                  aria-label="Close menu"
                  data-hoverable
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col px-8 pt-10 pb-16 justify-between flex-1">
                <nav className="flex flex-col gap-1">
                  {navLinks.map(({ label, id }, i) => {
                    const isActive = activeSection === id
                    return (
                      <button
                        key={id}
                        onClick={() => { scrollTo(id); setMenuOpen(false) }}
                        style={{
                          fontFamily: DISPLAY, fontWeight: 900, textAlign: "left",
                          fontSize: "clamp(52px, 13vw, 88px)", lineHeight: 0.92,
                          background: "none", border: "none", cursor: "none",
                          color: isActive ? DARK : "#CCCCC6",
                          transition: "color 0.25s ease",
                          letterSpacing: "-0.01em",
                          transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
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
      })()}

      {/* ── Contact Modal ── */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{
            background: "rgba(13,13,13,0.55)",
            backdropFilter: "blur(6px)",
            animation: "fadeIn 250ms ease forwards",
          }}
          onClick={() => setContactOpen(false)}
        >
          <div
            className="relative"
            style={{
              background: "#FAF8F4",
              border: `1px solid rgba(13,13,13,0.12)`,
              padding: "clamp(40px, 6vw, 72px)",
              maxWidth: 520,
              width: "90vw",
              animation: "scaleIn 300ms cubic-bezier(0.16,1,0.3,1) forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setContactOpen(false)}
              className="absolute top-6 right-6"
              style={{ background: "none", border: "none", cursor: "none", color: "#9A9890" }}
              data-hoverable
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Headline */}
            <h2
              className="uppercase mb-3"
              style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 0.9, color: DARK }}
            >
              Let's connect.
            </h2>
            <p style={{ color: "#787870", fontSize: 15, lineHeight: 1.7, fontWeight: 300, marginBottom: 48, maxWidth: 360 }}>
              Whether it's design, product thinking, freelance work or a new opportunity — feel free to reach out.
            </p>

            {/* Contact links */}
            <div className="flex flex-col gap-5">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
                style={{ textDecoration: "none", cursor: "none" }}
                data-hoverable
              >
                <div style={{ width: 40, height: 40, border: `1px solid rgba(13,13,13,0.12)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s ease, border-color 0.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = DARK; (e.currentTarget as HTMLElement).style.borderColor = DARK }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(13,13,13,0.12)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ transition: "color 0.2s ease" }}>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.15em", color: ACCENT_TEXT, marginBottom: 2 }} className="uppercase">LinkedIn</p>
                  <p style={{ color: DARK, fontSize: 15, fontWeight: 400 }}>LinkedIn Profile</p>
                </div>
                <ArrowUpRight size={16} className="ml-auto opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
              </a>

              <div style={{ height: 1, background: "rgba(13,13,13,0.08)" }} />

              <a
                href={EMAIL_URL}
                className="flex items-center gap-4 group"
                style={{ textDecoration: "none", cursor: "none" }}
                data-hoverable
              >
                <div style={{ width: 40, height: 40, border: `1px solid rgba(13,13,13,0.12)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s ease, border-color 0.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = DARK; (e.currentTarget as HTMLElement).style.borderColor = DARK }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(13,13,13,0.12)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.15em", color: ACCENT_TEXT, marginBottom: 2 }} className="uppercase">Email</p>
                  <p style={{ color: DARK, fontSize: 15, fontWeight: 400 }}>{EMAIL_ADDRESS}</p>
                </div>
                <ArrowUpRight size={16} className="ml-auto opacity-30 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
              </a>
            </div>

            {/* Footer */}
            <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.15em", color: "#AEACA6", marginTop: 40 }} className="uppercase">
              Based in Cologne, Germany.
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-end pb-20 px-8 md:px-16 overflow-hidden"
      >
        {/* Dot-grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(13,13,13,0.12) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: 0.5,
          }}
        />


        {/* Profile image — mobile: anchored to upper-right, clears meta row */}
        <div
          ref={imgRefMobile}
          className="absolute pointer-events-none md:hidden"
          style={{ top: "8%", right: "-8%", height: "52vh", width: "auto", zIndex: 5 }}
        >
          <ImageWithFallback
            src={imgProfile}
            alt="Meik Puchalski"
            className="h-full w-auto select-none object-top"
            style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.08))" }}
          />
        </div>

        {/* Profile image — desktop: right side, bottom-anchored, fills right half */}
        <div
          ref={imgRefDesktop}
          className="absolute pointer-events-none hidden md:block"
          style={{
            bottom: 0,
            right: "4rem",
            height: "90vh",
            width: "auto",
            transform: `translate(${mouse.x * -6}px, ${mouse.y * -6}px)`,
            transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: 5,
          }}
        >
          <ImageWithFallback
            src={imgProfile}
            alt="Meik Puchalski"
            className="h-full w-auto select-none"
            style={{ filter: "drop-shadow(0 12px 48px rgba(0,0,0,0.08))" }}
          />
        </div>

        {/* Hero name block */}
        <div
          className="relative z-10 select-none"
          style={{
            transform: `translate(${mouse.x * -10}px, ${mouse.y * -10}px)`,
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Ref wrapper for clip-path measurement */}
          <div ref={heroTextRef} style={{ position: "relative" }}>
            {/* Base layer — black */}
            <div
              style={{
                fontFamily: DISPLAY,
                fontWeight: 900,
                fontSize: "clamp(72px, 16vw, 260px)",
                lineHeight: 0.88,
                letterSpacing: "-0.01em",
              }}
            >
              <span className="block text-foreground">Hi, I&apos;m Meik</span>
              <span
                className="block"
                style={{ WebkitTextStroke: "2px #0D0D0D", color: "transparent" }}
              >
                Puchalski
              </span>
            </div>

            {/* Yellow overlay — clipped to exact portrait bounds */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                clipPath: heroClipPath,
                fontFamily: DISPLAY,
                fontWeight: 900,
                fontSize: "clamp(72px, 16vw, 260px)",
                lineHeight: 0.88,
                letterSpacing: "-0.01em",
              }}
            >
              <span className="block" style={{ color: "#FFF800" }}>Hi, I&apos;m Meik</span>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div
          className="relative z-10 mt-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-20"
          style={{
            transform: `translate(${mouse.x * -5}px, ${mouse.y * -5}px)`,
            transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div>
            <p
              style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: ACCENT_TEXT }}
              className="uppercase mb-3"
            >
              UX / UI Designer
            </p>
            <p
              className="leading-relaxed whitespace-nowrap"
              style={{ color: "#4A4A44", fontWeight: 300, fontSize: "clamp(14px, 1.4vw, 22px)" }}
            >
              I build digital experiences that are easy to use,
              <br />
              fun to explore and meaningful to&nbsp;people.
            </p>
          </div>

          <div className="flex items-center gap-4" style={{ fontFamily: MONO, fontSize: 12, color: "#787870" }}>
            <div className="flex flex-col gap-1">
              <span>8 yrs experience</span>
              <span>Self-taught</span>
              <span>33 years old</span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce"
          style={{ opacity: 0.3 }}
        >
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em" }} className="uppercase">
            Scroll
          </span>
          <ArrowDown size={12} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — MY STORY
      ═══════════════════════════════════════════════ */}
      <section id="section-story" className="py-32 px-8 md:px-16 border-t border-border">
        <Reveal id="s2-header" className="mb-24">
          <p
            style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: ACCENT_TEXT }}
            className="uppercase mb-5"
          >
            01 — My Story
          </p>
          <h2
            style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(48px, 9vw, 130px)", lineHeight: 0.9 }}
            className="uppercase"
          >
            How I got here
          </h2>
        </Reveal>

        <div className="relative max-w-2xl">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-2"
            style={{ width: 1, bottom: 0, background: "linear-gradient(to bottom, #0D0D0D 80%, transparent)" }}
          />

          {timeline.map((item, i) => (
            <Reveal key={i} id={`tl-${i}`} delay={i * 120} className="relative pl-12 pb-16 last:pb-0">
              {/* Node */}
              <div
                className="absolute left-0 top-[7px] -translate-x-1/2"
                style={{
                  width: 10,
                  height: 10,
                  border: `2px solid ${item.accent ? ACCENT : DARK}`,
                  background: item.accent ? ACCENT : LIGHT,
                }}
              />

              <p style={{ fontFamily: MONO, fontSize: 12, color: ACCENT_TEXT, letterSpacing: "0.1em" }} className="mb-2">
                {item.year}
              </p>
              <h3
                className="mb-2"
                style={{
                  fontSize: "clamp(20px, 3vw, 30px)",
                  fontWeight: item.accent ? 700 : 400,
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "#787870", lineHeight: 1.7 }}>{item.detail}</p>

              {item.accent && (
                <p
                  className="mt-6 text-lg italic pl-5"
                  style={{
                    color: "#787870",
                    borderLeft: `3px solid ${ACCENT}`,
                    fontWeight: 300,
                  }}
                >
                  "Sometimes progress starts when plans end."
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — WHAT DRIVES ME
      ═══════════════════════════════════════════════ */}
      <section id="section-drive" className="py-32 px-8 md:px-16 border-t border-border" style={{ background: DARK, color: LIGHT }}>
        <Reveal id="s3-header" className="mb-24">
          <p
            style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: ACCENT }}
            className="uppercase mb-5"
          >
            02 — What drives me
          </p>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontWeight: 900,
              fontSize: "clamp(48px, 9vw, 130px)",
              lineHeight: 0.9,
              color: LIGHT,
            }}
            className="uppercase"
          >
            Three pillars
          </h2>
        </Reveal>

        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ border: "1px solid rgba(247,246,243,0.1)" }}
        >
          {pillars.map((p, i) => (
            <Reveal
              key={i}
              id={`pillar-${i}`}
              delay={i * 150}
              className="px-10 py-14 md:px-14"
              style={{
                borderRight: i < 2 ? "1px solid rgba(247,246,243,0.1)" : "none",
              } as React.CSSProperties}
            >
              <div
                style={{ fontSize: 32, opacity: 0.25, fontFamily: MONO, marginBottom: 32, display: "block" }}
              >
                {p.symbol}
              </div>
              <h3
                className="uppercase mb-8"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 900,
                  fontSize: "clamp(40px, 5vw, 72px)",
                  lineHeight: 1,
                  color: LIGHT,
                }}
              >
                {p.label}
              </h3>
              <ul className="space-y-2 mb-10">
                {p.lines.map((line, j) => (
                  <li key={j} style={{ color: "rgba(247,246,243,0.55)", fontSize: 18 }}>
                    {line}
                  </li>
                ))}
              </ul>
              <p
                className="pt-6"
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: "rgba(247,246,243,0.3)",
                  borderTop: "1px solid rgba(247,246,243,0.1)",
                  lineHeight: 1.6,
                }}
              >
                {p.note}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — SELECTED WORK
      ═══════════════════════════════════════════════ */}
      <section id="section-work" className="py-32 px-8 md:px-16 border-t border-border">
        <Reveal id="s4-header" className="mb-20">
          <p
            style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: ACCENT_TEXT }}
            className="uppercase mb-5"
          >
            03 — Selected Work
          </p>
          <h2
            style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(48px, 9vw, 130px)", lineHeight: 0.9 }}
            className="uppercase"
          >
            Projects
          </h2>
        </Reveal>

        <div>
          {projects.map((proj, i) => {
            const open = activeProject === i
            return (
              <Reveal key={i} id={`proj-${i}`} delay={i * 80}>
                {/* Row */}
                <button
                  className="w-full text-left border-t border-border py-8 md:py-10 group"
                  style={{ cursor: "none" }}
                  onClick={() => setActiveProject(open ? null : i)}
                  data-hoverable
                >
                  <div className="flex items-start md:items-center justify-between gap-4">
                    <div className="flex items-baseline gap-5 md:gap-10">
                      <span
                        style={{ fontFamily: MONO, fontSize: 12, color: "#787870", minWidth: "2ch" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3
                          className="uppercase leading-none"
                          style={{
                            fontFamily: DISPLAY,
                            fontWeight: 900,
                            fontSize: "clamp(28px, 4.5vw, 64px)",
                            color: open ? ACCENT_TEXT : DARK,
                            transition: "color 0.3s ease",
                          }}
                        >
                          {proj.title}
                        </h3>
                        <p
                          className="mt-1 hidden md:block"
                          style={{ color: "#787870", fontSize: 15, fontWeight: 300 }}
                        >
                          {proj.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span
                        className="hidden lg:block"
                        style={{ fontFamily: MONO, fontSize: 11, color: "#787870", letterSpacing: "0.1em" }}
                      >
                        {proj.category}
                      </span>
                      <span
                        style={{ fontFamily: MONO, fontSize: 12, color: "#787870" }}
                      >
                        {proj.year}
                      </span>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          border: `1px solid ${open ? ACCENT_TEXT : "rgba(13,13,13,0.15)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "border-color 0.3s ease",
                          color: open ? ACCENT_TEXT : DARK,
                          flexShrink: 0,
                        }}
                      >
                        {open ? <Minus size={14} /> : <Plus size={14} />}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded detail */}
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: open ? 2000 : 0,
                    opacity: open ? 1 : 0,
                    transition: "max-height 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
                  }}
                >
                  <div className="pb-12 border-b border-border pl-4 md:pl-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                      {[
                        { label: "Problem", text: proj.problem },
                        { label: "Process", text: proj.process },
                        { label: "Solution", text: proj.solution },
                        { label: "Learned", text: proj.learned },
                      ].map((cell) => (
                        <div key={cell.label}>
                          <p
                            className="uppercase mb-3"
                            style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: ACCENT_TEXT }}
                          >
                            {cell.label}
                          </p>
                          <p style={{ fontSize: 14, lineHeight: 1.75, color: "#4A4A44" }}>{cell.text}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      <a
                        href={proj.link}
                        target={proj.link.startsWith("/") ? undefined : "_blank"}
                        rel={proj.link.startsWith("/") ? undefined : "noopener noreferrer"}
                        className="inline-flex items-center gap-3 group"
                        style={{
                          fontFamily: DISPLAY,
                          fontWeight: 900,
                          fontSize: "clamp(18px, 2vw, 28px)",
                          color: DARK,
                          textDecoration: "none",
                          cursor: "none",
                        }}
                        data-hoverable
                      >
                        <span
                          className="uppercase transition-colors duration-300"
                          style={{ borderBottom: `2px solid ${DARK}`, paddingBottom: 2 }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = ACCENT_TEXT)}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = DARK)}
                        >
                          {proj.ctaLabel ?? "View Case Study"}
                        </span>
                        <ArrowUpRight
                          size={22}
                          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
                        />
                      </a>
                      {proj.password && (
                        <div className="flex items-center gap-3" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em" }}>
                          <span style={{ color: "#787870" }}>Password:</span>
                          <span style={{ color: DARK, fontWeight: 500 }}>{proj.password}</span>
                          <button
                            onClick={() => copyPassword(proj.password!)}
                            title="Copy password"
                            data-hoverable
                            style={{
                              background: "none",
                              border: `1px solid ${copiedPassword ? ACCENT_TEXT : "rgba(13,13,13,0.15)"}`,
                              cursor: "none",
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "3px 8px",
                              color: copiedPassword ? ACCENT_TEXT : "#787870",
                              transition: "color 0.2s ease, border-color 0.2s ease",
                              fontSize: 10,
                              letterSpacing: "0.12em",
                            }}
                          >
                            {copiedPassword ? (
                              <span>Copied</span>
                            ) : (
                              <>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                </svg>
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}

          {/* Closing border */}
          <div className="border-t border-border" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — A FEW THINGS ABOUT ME
      ═══════════════════════════════════════════════ */}
      <section id="section-about" className="py-32 px-8 md:px-16 border-t border-border" style={{ background: "#EFEDE8" }}>
        <Reveal id="s5-header" className="mb-20">
          <p
            style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: ACCENT_TEXT }}
            className="uppercase mb-5"
          >
            04 — A few things about me
          </p>
          <h2
            style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(48px, 9vw, 130px)", lineHeight: 0.9 }}
            className="uppercase"
          >
            Beyond the screen
          </h2>
        </Reveal>

        {/* ── Mobile stacked cards ── */}
        {(() => {
          return (
            <div className="md:hidden flex flex-col gap-px mb-16" style={{ border: `1px solid rgba(13,13,13,0.08)` }}>
              {aboutCards.map((card) => {
                const isOpen = expandedCard === card.id
                const content = cardContent[card.id]
                return (
                  <div key={card.id} style={{ background: "#D0CEC8" }}>
                    {/* Image tap area */}
                    <button
                      className="w-full relative overflow-hidden"
                      style={{ aspectRatio: "16/9", display: "block", cursor: "none" }}
                      onClick={() => setExpandedCard(isOpen ? null : card.id)}
                      data-hoverable
                    >
                      <ImageWithFallback
                        src={card.src}
                        alt={card.alt}
                        className={`w-full h-full object-cover ${card.objectPos} transition-all duration-500 ${isOpen ? "grayscale" : "grayscale"}`}
                      />
                      {/* Label */}
                      <span
                        className="absolute bottom-4 left-4 uppercase"
                        style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.15em", color: LIGHT, opacity: 0.8 }}
                      >
                        {card.imageName}
                      </span>
                      {/* Toggle icon */}
                      <div className="absolute top-4 right-4">
                        <div style={{ width: 28, height: 28, border: `1px solid rgba(247,246,243,0.6)`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: LIGHT, fontSize: 16, lineHeight: 1, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.3s ease", display: "block" }}>+</span>
                        </div>
                      </div>
                    </button>

                    {/* Expandable content */}
                    <div
                      style={{
                        overflow: "hidden",
                        maxHeight: isOpen ? 400 : 0,
                        transition: "max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <div style={{ background: "#FAF8F4", borderTop: `1px solid rgba(13,13,13,0.1)`, padding: "28px 24px 32px" }}>
                        <p
                          className="uppercase mb-2"
                          style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 40, lineHeight: 0.9, color: DARK }}
                        >
                          {card.imageName}
                        </p>
                        <p style={{ fontSize: 13, color: "#787870", fontStyle: "italic", fontWeight: 300, marginBottom: 16, lineHeight: 1.5 }}>
                          {content.subtitle}
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {content.mobileLines.map((line, i) => (
                            <p key={i} style={{ fontSize: 14, color: DARK, lineHeight: 1.7 }}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })()}

        {/* ── Desktop bento grid ── */}
        {/* Collage */}
        <div
          className="hidden md:grid gap-2 mb-16"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "300px 300px",
          }}
        >
          {/* Footballer — tall left */}
          {aboutCards.map((card) => {
            const isOpen = expandedCard === card.id
            const content = cardContent[card.id]
            return (
              <Reveal
                key={card.id}
                id={card.id}
                delay={card.delay}
                style={{ gridColumn: card.gridColumn, gridRow: card.gridRow, overflow: "hidden", background: "#D0CEC8", cursor: "none" } as React.CSSProperties}
              >
                <div
                  className="w-full h-full relative overflow-hidden"
                  onClick={() => setExpandedCard(isOpen ? null : card.id)}
                  data-hoverable
                >
                  {/* Image */}
                  <ImageWithFallback
                    src={card.src}
                    alt={card.alt}
                    className={`w-full h-full object-cover ${card.objectPos} transition-all duration-500 ${isOpen ? "grayscale scale-100" : "grayscale scale-105"}`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
                  />

                  {/* Default label — hidden when open */}
                  <span
                    className="absolute bottom-4 left-4 uppercase transition-opacity duration-300"
                    style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.15em", color: LIGHT, opacity: isOpen ? 0 : 0.7 }}
                  >
                    {card.imageName}
                  </span>

                  {/* Hint — tap to explore */}
                  <div
                    className="absolute top-4 right-4 transition-opacity duration-300"
                    style={{ opacity: isOpen ? 0 : 0.5 }}
                  >
                    <div style={{ width: 20, height: 20, border: `1px solid ${LIGHT}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Plus size={10} color={LIGHT} />
                    </div>
                  </div>

                  {/* Editorial reveal panel */}
                  <div
                    className="absolute inset-x-0 bottom-0"
                    style={{
                      background: "#FAF8F4",
                      borderTop: `1px solid ${DARK}`,
                      transform: isOpen ? "translateY(0%)" : "translateY(100%)",
                      transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                      height: "68%",
                      padding: "clamp(16px, 3%, 28px)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p
                        className="uppercase mb-2"
                        style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: "clamp(22px, 3vw, 40px)", lineHeight: 1, color: DARK }}
                      >
                        {card.imageName}
                      </p>
                      <p
                        className="italic mb-4"
                        style={{ fontSize: "clamp(11px, 1.2vw, 14px)", color: "#787870", fontWeight: 300, lineHeight: 1.4 }}
                      >
                        {content.subtitle}
                      </p>
                      <div className="space-y-2">
                        {content.lines.map((line, i) => (
                          <p key={i} style={{ fontSize: "clamp(10px, 1.1vw, 13px)", color: DARK, lineHeight: 1.65, fontWeight: 400 }}>
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                    <p
                      className="uppercase"
                      style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.15em", color: "#787870", opacity: 0.6 }}
                    >
                      Click to close
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Personal notes */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12"
          style={{ borderTop: "1px solid rgba(13,13,13,0.12)" }}
        >
          {[
            { label: "Origin", value: "Polish roots, German-raised." },
            { label: "Balance", value: "Football + Calisthenics keep me honest." },
            { label: "Currently", value: "Always mid-project." },
            { label: "Motto", value: "Make it make sense." },
          ].map((note, i) => (
            <Reveal key={i} id={`note-${i}`} delay={i * 100}>
              <p
                className="uppercase mb-2"
                style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: ACCENT_TEXT }}
              >
                {note.label}
              </p>
              <p style={{ lineHeight: 1.6 }}>{note.value}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 6 — FINAL CTA
      ═══════════════════════════════════════════════ */}
      <section
        className="min-h-screen flex flex-col justify-between py-24 px-8 md:px-16 border-t border-border"
        style={{ background: DARK, color: LIGHT }}
      >
        <Reveal id="s6-top" className="flex-1 flex flex-col justify-center pt-16">
          {/* Outlined "STILL" */}
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

          {/* Solid words with the last in accent */}
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

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 group"
              style={{
                background: ACCENT,
                color: DARK,
                fontWeight: 500,
                fontSize: 15,
                cursor: "none",
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
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = LIGHT
                ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(247,246,243,0.4)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = "rgba(247,246,243,0.5)"
                ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(247,246,243,0.15)"
              }}
              data-hoverable
            >
              Download CV
            </a>
          </div>
        </Reveal>

        {/* Footer strip */}
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
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = LIGHT)}
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "rgba(247,246,243,0.25)")
                }
                data-hoverable
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function App() {
  return window.location.pathname === "/projects/prematch" ? <PrematchCaseStudy /> : <HomePage />
}
