import type { EditorialGalleryItem } from "./EditorialGalleryContent"
import "./EditorialGallery.css"

export type EditorialGalleryProps = {
  items: EditorialGalleryItem[]
  className?: string
}

export default function EditorialGallery({ items, className = "" }: EditorialGalleryProps) {
  return (
    <section className={`editorial-gallery ${className}`.trim()} aria-label="Feature gallery">
      <div className="editorial-gallery__grid">
        {items.map((item, index) => {
          const isTextFirst = index % 2 === 1

          return (
            <article
              className={`editorial-gallery__item ${
                isTextFirst ? "editorial-gallery__item--text-first" : "editorial-gallery__item--image-first"
              }`.trim()}
              key={item.title}
            >
              <div className="editorial-gallery__media">
                <img className="editorial-gallery__image" src={item.imageSrc} alt={item.imageAlt} loading="lazy" />
              </div>

              <div className="editorial-gallery__copy">
                <h2 className="editorial-gallery__title">{item.title}</h2>
                <p className="editorial-gallery__description">{item.description}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
