import EditorialCover from "./components/EditorialCover"
import { prematchCoverContent } from "./components/EditorialCoverContent"
import EditorialManifest from "./components/EditorialManifest"
import { prematchManifestContent } from "./components/EditorialManifestContent"

export default function PrematchPage() {
  return (
    <>
      <EditorialCover content={prematchCoverContent} />
      <EditorialManifest content={prematchManifestContent} />
    </>
  )
}
