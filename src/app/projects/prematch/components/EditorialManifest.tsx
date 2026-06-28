import type { EditorialManifestContent } from "./EditorialManifestContent"
import "./EditorialManifest.css"

export type EditorialManifestProps = {
  content: EditorialManifestContent
  className?: string
}

export default function EditorialManifest({ content, className = "" }: EditorialManifestProps) {
  return (
    <section className={`editorial-manifest ${className}`.trim()} aria-label="Project manifest">
      <h2 className="editorial-manifest__statement">{content.statement}</h2>

      <div className="editorial-manifest__body">
        {content.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
