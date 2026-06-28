import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import type { ProjectBreakdownItem } from "./ProjectBreakdownAccordionContent"
import "./ProjectBreakdownAccordion.css"

export type ProjectBreakdownAccordionProps = {
  items: ProjectBreakdownItem[]
  heading?: string
  className?: string
}

export default function ProjectBreakdownAccordion({
  items,
  heading = "Project Breakdown",
  className = "",
}: ProjectBreakdownAccordionProps) {
  const [openItem, setOpenItem] = useState(items[0]?.number ?? "")

  return (
    <section className={`project-breakdown ${className}`.trim()} aria-labelledby="project-breakdown-heading">
      <div className="project-breakdown__heading-wrap">
        <h2 className="project-breakdown__heading" id="project-breakdown-heading">
          {heading}
        </h2>
      </div>

      <div className="project-breakdown__accordion">
        {items.map((item) => {
          const isOpen = openItem === item.number
          const panelId = `project-breakdown-panel-${item.number}`

          return (
            <article className={`project-breakdown__item ${isOpen ? "is-open" : ""}`.trim()} key={item.number}>
              <button
                className="project-breakdown__trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenItem(isOpen ? "" : item.number)}
              >
                <span className="project-breakdown__summary">
                  <span className="project-breakdown__number">{item.number}</span>
                  <span className="project-breakdown__title-group">
                    <span className="project-breakdown__title">{item.title}</span>
                  </span>
                </span>

                <span className="project-breakdown__meta">
                  <span className="project-breakdown__pillnotes project-breakdown__pillnotes--desktop">
                    {item.pillnotes}
                  </span>
                  <span className="project-breakdown__icon" aria-hidden="true">
                    {isOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
                  </span>
                </span>
              </button>

              <div
                className="project-breakdown__panel"
                id={panelId}
                aria-hidden={!isOpen}
                style={{ maxHeight: isOpen ? 900 : 0, opacity: isOpen ? 1 : 0 }}
              >
                <div className="project-breakdown__panel-inner">
                  <p className="project-breakdown__pillnotes project-breakdown__pillnotes--panel">{item.pillnotes}</p>
                  <p className="project-breakdown__body">{item.body}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
