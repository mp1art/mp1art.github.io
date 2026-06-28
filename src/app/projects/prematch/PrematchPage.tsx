import EditorialCover from "./components/EditorialCover"
import { prematchCoverContent } from "./components/EditorialCoverContent"
import EditorialManifest from "./components/EditorialManifest"
import { prematchManifestContent } from "./components/EditorialManifestContent"
import EditorialSplitNarrative from "./components/EditorialSplitNarrative"
import { prematchSplitNarrativeSections } from "./components/EditorialSplitNarrativeContent"
import EditorialGallery from "./components/EditorialGallery"
import { prematchGalleryItems } from "./components/EditorialGalleryContent"

export default function PrematchPage() {
  return (
    <>
      <EditorialCover content={prematchCoverContent} />
      <EditorialManifest content={prematchManifestContent} />
      {prematchSplitNarrativeSections.map((section) => (
        <EditorialSplitNarrative content={section} key={section.eyebrow} />
      ))}
      <EditorialGallery items={prematchGalleryItems} />
    </>
  )
}
