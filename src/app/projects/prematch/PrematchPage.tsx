import { useEffect, useState } from "react"
import SiteContactModal from "@/app/components/site/SiteContactModal"
import SiteContactSection from "@/app/components/site/SiteContactSection"
import SiteHeader from "@/app/components/site/SiteHeader"
import EditorialCover from "./components/EditorialCover"
import { prematchCoverContent } from "./components/EditorialCoverContent"
import EditorialManifest from "./components/EditorialManifest"
import { prematchManifestContent } from "./components/EditorialManifestContent"
import EditorialSplitNarrative from "./components/EditorialSplitNarrative"
import { prematchSplitNarrativeSections } from "./components/EditorialSplitNarrativeContent"
import EditorialGallery from "./components/EditorialGallery"
import { prematchGalleryItems } from "./components/EditorialGalleryContent"
import ProjectBreakdownAccordion from "./components/ProjectBreakdownAccordion"
import { prematchBreakdownItems } from "./components/ProjectBreakdownAccordionContent"
import "./PrematchCaseStudy.css"

export default function PrematchPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)

    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setContactOpen(false)
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="prematch-page" style={{ cursor: "none" }}>
      <SiteHeader
        currentPage="case-study"
        menuOpen={menuOpen}
        navScrolled={navScrolled}
        onContactClick={() => setContactOpen(true)}
        setMenuOpen={setMenuOpen}
        variant="dark"
      />
      {contactOpen && <SiteContactModal onClose={() => setContactOpen(false)} />}
      <EditorialCover content={prematchCoverContent} />
      <EditorialManifest content={prematchManifestContent} />
      {prematchSplitNarrativeSections.map((section) => (
        <EditorialSplitNarrative content={section} key={section.eyebrow} />
      ))}
      <EditorialGallery items={prematchGalleryItems} />
      <ProjectBreakdownAccordion items={prematchBreakdownItems} />
      <SiteContactSection onContactClick={() => setContactOpen(true)} variant="dark" />
    </div>
  )
}
