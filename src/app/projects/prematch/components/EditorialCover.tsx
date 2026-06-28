import { ArrowDown, ArrowUpRight } from "lucide-react"
import heroImage from "@/imports/heroimagep-prematch.png"
import type { EditorialCoverContent } from "./EditorialCoverContent"
import "./EditorialCover.css"

export type EditorialCoverProps = {
  content: EditorialCoverContent
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export default function EditorialCover({
  content,
  imageSrc = heroImage,
  imageAlt = "",
  className = "",
}: EditorialCoverProps) {
  return (
    <section className={`editorial-cover ${className}`.trim()} aria-label={`${content.projectLabel} cover`}>
      <img className="editorial-cover__image" src={imageSrc} alt={imageAlt} aria-hidden={imageAlt ? undefined : true} />

      <div className="editorial-cover__content">
        <div className="editorial-cover__headline-group">
          <p className="editorial-cover__label">{content.projectLabel}</p>
          <h1 className="editorial-cover__headline">
            {content.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
        </div>

        <div className="editorial-cover__subcontent">
          <p className="editorial-cover__intro">{content.intro}</p>

          <dl className="editorial-cover__facts">
            {content.facts.map((fact) => (
              <div className="editorial-cover__fact" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          {content.actions && (
            <div className="editorial-cover__actions" aria-label="Project actions">
              {content.actions.map((action) => {
                const isSecondary = action.variant === "secondary"

                return (
                  <a
                    className={`editorial-cover__action ${isSecondary ? "editorial-cover__action--secondary" : "editorial-cover__action--primary"}`}
                    href={action.href}
                    key={action.label}
                    data-hoverable
                  >
                    <span>{action.label}</span>
                    {isSecondary ? <ArrowDown size={17} aria-hidden="true" /> : <ArrowUpRight size={17} aria-hidden="true" />}
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
