import React, { useEffect, useMemo, useRef, useState } from "react"
import { ArrowUpRight, Minus, Plus } from "lucide-react"
import "./PrematchCaseStudy.css"

const assetModules = import.meta.glob("../../../imports/*", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>

const asset = (fileName: string) => assetModules[`../../../imports/${fileName}`] ?? ""

const assets = {
  hero: asset("heroimagep-prematch.png"),
  floodlight: asset("content-flutlicht-prematch.png"),
  framework: asset("design principles.png"),
  research: asset("Research-result.png"),
  currentStats: asset("Current-Stats.png"),
  galleryCurrentStats: asset("gallery-Current-Stats.png"),
  galleryMatchDetails: asset("gallery-Matchdetails.png"),
  galleryRankings: asset("gallery-Rankings.png"),
  galleryAchievements: asset("gallery-Achievements.png"),
  video: asset("Video.webm"),
}

type EditorialImageVariant = "desktop" | "mobile" | "small" | "medium" | "large" | "contained" | "fullBleed"

type EditorialImageProps = {
  src: string
  alt: string
  variant?: EditorialImageVariant
  loading?: "eager" | "lazy"
}

function EditorialImage({ src, alt, variant = "large", loading = "lazy" }: EditorialImageProps) {
  const className = [
    "prematch-image",
    variant === "contained" ? "prematch-image--contained" : "",
    variant === "fullBleed" ? "prematch-image--full-bleed" : "",
  ]
    .filter(Boolean)
    .join(" ")

  if (!src) {
    return <div className={`${className} prematch-missing`}>Missing asset: {alt}</div>
  }

  return (
    <picture className={className}>
      <img src={src} alt={alt} loading={loading} decoding={loading === "eager" ? "sync" : "async"} />
    </picture>
  )
}

function EditorialCover() {
  return (
    <section className="prematch-cover prematch-section">
      <EditorialImage src={assets.hero} alt="Prematch football pitch at night" variant="desktop" loading="eager" />
      <div className="prematch-cover__shade" />
      <div className="prematch-cover__content prematch-shell">
        <p className="prematch-cover__kicker prematch-mono">Prematch Challenge</p>
        <h1 className="prematch-cover__title prematch-display">Turning statistics into motivation</h1>
        <div className="prematch-cover__bottom">
          <p className="prematch-cover__intro">
            How might we turn match statistics into personal motivation for every player?
          </p>
          <div className="prematch-meta" aria-label="Project metadata">
            {[
              ["Year", "2026"],
              ["Role", "UX/UI Design"],
              ["Platform", "Mobile"],
              ["Category", "Sports Product"],
            ].map(([label, value]) => (
              <span key={label}>
                <span className="prematch-meta__label prematch-mono">{label}</span>
                <span className="prematch-meta__value prematch-mono">{value}</span>
              </span>
            ))}
          </div>
          <a className="prematch-cover__cta prematch-mono" href="#project-breakdown">
            Project Breakdown
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

function EditorialManifest() {
  return (
    <section className="prematch-manifest prematch-shell">
      <h2 className="prematch-manifest__statement">Turning statistics into motivation.</h2>
      <p className="prematch-manifest__text">
        Prematch already proved player statistics. The real opportunity wasn&apos;t adding more numbers. It was creating progression, recognition and a reason for players to return every week.
      </p>
    </section>
  )
}

type SplitNarrativeProps = {
  eyebrow: string
  headline: string
  body: string
  image: React.ReactNode
  desktopVariant?: "textLeft" | "textRight"
  mobileVariant?: "textFirst" | "imageFirst"
}

function EditorialSplitNarrative({
  eyebrow,
  headline,
  body,
  image,
  desktopVariant = "textLeft",
  mobileVariant = "textFirst",
}: SplitNarrativeProps) {
  const className = [
    "prematch-split prematch-shell",
    desktopVariant === "textRight" ? "prematch-split--text-right" : "",
    mobileVariant === "imageFirst" ? "prematch-split--mobile-image-first" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={className}>
      <div className="prematch-split__content">
        <p className="prematch-eyebrow prematch-mono">{eyebrow}</p>
        <h2 className="prematch-split__headline">{headline}</h2>
        <p className="prematch-split__body">{body}</p>
      </div>
      <div className="prematch-split__media">{image}</div>
    </section>
  )
}

function FrameworkSection() {
  return (
    <section className="prematch-framework prematch-shell">
      <div className="prematch-framework__image">
        <EditorialImage src={assets.framework} alt="Prematch design principles framework" variant="contained" />
      </div>
    </section>
  )
}

function useLoadOnView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "180px 0px" }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [shouldLoad])

  return { ref, shouldLoad }
}

function ProductDemoVideo() {
  const { ref, shouldLoad } = useLoadOnView<HTMLDivElement>()

  return (
    <section className="prematch-video prematch-shell" ref={ref}>
      <div className="prematch-split__content">
        <p className="prematch-eyebrow prematch-mono">Product Demo</p>
        <h2 className="prematch-split__headline">A connected experience built around player motivation.</h2>
        <p className="prematch-split__body">
          The product interaction brings statistics, rankings and achievements together in one focused mobile experience.
        </p>
      </div>
      <div className="prematch-split__media">
        <div className="prematch-phone" aria-label="Prematch mobile product demo">
          <div className="prematch-phone__screen">
            {shouldLoad && assets.video ? (
              <video autoPlay muted loop playsInline preload="metadata">
                <source src={assets.video} type="video/webm" />
              </video>
            ) : (
              <EditorialImage src={assets.currentStats} alt="Prematch mobile interface preview" variant="mobile" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const galleryItems = [
  {
    title: "Current Stats",
    text: "Focused the overview on the metrics players care about most while improving readability and reducing visual noise.",
    image: assets.galleryCurrentStats,
  },
  {
    title: "Match Details",
    text: "Expanded match statistics with richer context to make every performance easier to understand and review.",
    image: assets.galleryMatchDetails,
  },
  {
    title: "Rankings",
    text: "Introduced team rankings to encourage healthy competition and make player performance more meaningful.",
    image: assets.galleryRankings,
  },
  {
    title: "Achievements",
    text: "Designed a tier based achievement system where players unlock new levels through consistent performance, creating long term motivation to collect and improve.",
    image: assets.galleryAchievements,
  },
]

function FeatureGallery() {
  return (
    <section className="prematch-gallery prematch-shell" aria-label="Prematch feature gallery">
      <div className="prematch-gallery__grid">
        {galleryItems.map((item) => (
          <article className="prematch-gallery__item" key={item.title}>
            <div className="prematch-gallery__image">
              <EditorialImage src={item.image} alt={`Prematch ${item.title} screen`} variant="small" />
            </div>
            <h3 className="prematch-gallery__title">{item.title}</h3>
            <p className="prematch-gallery__text">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

const breakdownItems = [
  {
    number: "01",
    title: "Problem",
    teaser: "Turning player stats into motivation, progression and recognition.",
    subline: "Current Experience • Pain Points • Opportunity",
    body: "Prematch already offered detailed player statistics, making it easy to review match performance after every game. While the data was informative, it provided little value beyond the final whistle. Players could see what happened, but they lacked reasons to return throughout the week. The opportunity was not to add more statistics, but to transform existing data into an experience that encouraged progression, comparison and long term engagement.",
  },
  {
    number: "02",
    title: "Approach",
    teaser: "Research driven decisions instead of assumptions.",
    subline: "Research • Benchmark • User Insights",
    body: "To understand the real opportunity, I combined competitor analysis with qualitative user research. I benchmarked leading football products including Kickbase, SofaScore and Bundesliga Fantasy Manager while collecting feedback from amateur players. The findings consistently highlighted progression, comparison and recognition as the strongest opportunities to drive long term engagement, forming the foundation for every design decision that followed.",
  },
  {
    number: "03",
    title: "Solution",
    teaser: "A connected experience built around player motivation.",
    subline: "Framework • Features • Experience",
    body: "The final concept transformed player statistics into a connected product experience. Current Stats improved clarity, Match Details added meaningful context, Rankings encouraged healthy competition and Achievements introduced long term progression through a tier based reward system. The Personal Scout completed the experience by turning performance data into personalised feedback that motivates players to return and improve.",
  },
]

function ProjectBreakdownAccordion() {
  const [openItem, setOpenItem] = useState(0)

  return (
    <section className="prematch-breakdown prematch-shell" id="project-breakdown">
      <h2 className="prematch-breakdown__title prematch-display">Project Breakdown</h2>
      <div className="prematch-accordion">
        {breakdownItems.map((item, index) => {
          const isOpen = openItem === index
          const panelId = `prematch-breakdown-panel-${index}`

          return (
            <article className={`prematch-accordion__item ${isOpen ? "is-open" : ""}`} key={item.title}>
              <button
                className="prematch-accordion__button"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenItem(isOpen ? -1 : index)}
              >
                <span className="prematch-accordion__left">
                  <span className="prematch-accordion__number prematch-mono">{item.number}</span>
                  <span>
                    <span className="prematch-accordion__title prematch-display">{item.title}</span>
                    <span className="prematch-accordion__teaser">{item.teaser}</span>
                  </span>
                </span>
                <span className="prematch-accordion__meta prematch-mono">
                  {item.subline}
                  <span className="prematch-accordion__icon" aria-hidden="true">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </span>
                <span className="prematch-accordion__icon prematch-accordion__mobile-icon" aria-hidden="true">
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              <div className="prematch-accordion__panel" id={panelId}>
                <div className="prematch-accordion__copy">
                  <p className="prematch-accordion__mobile-note prematch-mono">{item.subline}</p>
                  {item.body}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="prematch-final prematch-shell">
      <div className="prematch-final__words">
        <p className="prematch-final__word prematch-final__word--accent prematch-display">Curious.</p>
        <p className="prematch-final__word prematch-display">Learning.</p>
        <p className="prematch-final__word prematch-display">Building.</p>
        <p className="prematch-final__text">Thanks for taking the time to get to know me.</p>
        <div className="prematch-final__actions">
          <a className="prematch-button prematch-mono" href="mailto:m.puchalski@live.de">
            Let&apos;s create something together
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <a className="prematch-button prematch-final__secondary prematch-mono" href="/Lebenslauf-MP-English-New.pdf" target="_blank" rel="noopener noreferrer">
            Download CV
          </a>
        </div>
      </div>
      <footer className="prematch-final__footer prematch-mono">
        <span>Meik Puchalski - UX/UI Designer - 2026</span>
        <span className="prematch-final__links">
          <a href="https://www.linkedin.com/in/meik-puchalski-939162363/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:m.puchalski@live.de">Email</a>
        </span>
      </footer>
    </section>
  )
}

export default function PrematchCaseStudy() {
  const splitNarratives = useMemo(
    () => [
      {
        eyebrow: "The Challenge",
        headline: "Statistics existed. Motivation didn't.",
        body: "Prematch already provided player statistics after each match, making it easy to review individual performance after every game. While the data was useful, it remained passive and rarely gave players a reason to return once the match was over. Players could see what happened, but the information did not connect strongly to week-to-week motivation or progression.",
        image: <EditorialImage src={assets.currentStats} alt="Prematch current stats concept" variant="medium" />,
        desktopVariant: "textLeft" as const,
        mobileVariant: "textFirst" as const,
      },
      {
        eyebrow: "Research",
        headline: "Understanding what motivates amateur football players.",
        body: "To understand the real opportunity, I combined competitor analysis with qualitative user research. I explored football products such as Kickbase, SofaScore and Bundesliga Fantasy Manager while collecting feedback from amateur players. The findings consistently highlighted progression, comparison and recognition as the strongest opportunities for long-term engagement.",
        image: <EditorialImage src={assets.research} alt="Prematch research result" variant="medium" />,
        desktopVariant: "textRight" as const,
        mobileVariant: "imageFirst" as const,
      },
      {
        eyebrow: "The Solution",
        headline: "One system. Four connected experiences.",
        body: "The solution was designed as a connected product experience that turns statistics into motivation. Current Stats improved clarity, Match Details added context, Rankings encouraged comparison and Achievements introduced progression through a tier based reward system.",
        image: (
          <div className="prematch-phone">
            <div className="prematch-phone__screen">
              <EditorialImage src={assets.currentStats} alt="Prematch connected mobile experience" variant="mobile" />
            </div>
          </div>
        ),
        desktopVariant: "textLeft" as const,
        mobileVariant: "textFirst" as const,
      },
    ],
    []
  )

  return (
    <main className="prematch-page">
      <EditorialCover />
      <EditorialManifest />
      <EditorialImage src={assets.floodlight} alt="Floodlight on football pitch" variant="fullBleed" />
      {splitNarratives.slice(0, 1).map((section) => (
        <EditorialSplitNarrative key={section.headline} {...section} />
      ))}
      <EditorialImage src={assets.research} alt="Prematch research results" variant="contained" />
      {splitNarratives.slice(1, 2).map((section) => (
        <EditorialSplitNarrative key={section.headline} {...section} />
      ))}
      <FrameworkSection />
      {splitNarratives.slice(2).map((section) => (
        <EditorialSplitNarrative key={section.headline} {...section} />
      ))}
      <ProductDemoVideo />
      <FeatureGallery />
      <ProjectBreakdownAccordion />
      <FinalCTA />
    </main>
  )
}
