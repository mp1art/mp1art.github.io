import type { EditorialSplitNarrativeContent } from "./EditorialSplitNarrativeContent"
import "./EditorialSplitNarrative.css"

export type EditorialSplitNarrativeProps = {
  content: EditorialSplitNarrativeContent
  className?: string
}

export default function EditorialSplitNarrative({ content, className = "" }: EditorialSplitNarrativeProps) {
  const layoutClass =
    content.desktopLayout === "text-right"
      ? "editorial-split-narrative--text-right"
      : "editorial-split-narrative--text-left"
  const mobileClass =
    content.mobileOrder === "image-first"
      ? "editorial-split-narrative--mobile-image-first"
      : "editorial-split-narrative--mobile-text-first"

  return (
    <section className={`editorial-split-narrative ${layoutClass} ${mobileClass} ${className}`.trim()}>
      <div className="editorial-split-narrative__text">
        <div className="editorial-split-narrative__heading-group">
          <p className="editorial-split-narrative__eyebrow">{content.eyebrow}</p>
          <h2 className="editorial-split-narrative__headline">{content.headline}</h2>
        </div>

        <div className="editorial-split-narrative__body">
          {content.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="editorial-split-narrative__image-wrap">
        {content.mediaType === "video" ? (
          <video
            className="editorial-split-narrative__image"
            src={content.mediaSrc}
            aria-label={content.mediaAlt}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            className="editorial-split-narrative__image"
            src={content.mediaSrc}
            alt={content.mediaAlt}
            loading="lazy"
          />
        )}
      </div>
    </section>
  )
}
