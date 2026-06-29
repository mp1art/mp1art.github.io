import { useEffect, useState } from "react"
import SiteContactModal from "@/app/components/site/SiteContactModal"
import SiteHeader from "@/app/components/site/SiteHeader"
import wisoHeroImage from "@/imports/Hero-Wiso.png"
import EditorialCover from "../prematch/components/EditorialCover"
import EditorialManifest from "../prematch/components/EditorialManifest"
import { wisoCoverContent } from "./components/WisoCoverContent"
import { wisoManifestContent } from "./components/WisoManifestContent"
import "./WisoCaseStudy.css"

export default function WisoPage() {
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
    <div className="wiso-page" style={{ cursor: "none" }}>
      <SiteHeader
        currentPage="case-study"
        menuOpen={menuOpen}
        navScrolled={navScrolled}
        onContactClick={() => setContactOpen(true)}
        setMenuOpen={setMenuOpen}
        variant="dark"
      />
      {contactOpen && <SiteContactModal onClose={() => setContactOpen(false)} />}
      <EditorialCover
        className="editorial-cover--wiso"
        content={wisoCoverContent}
        imageAlt="WISO MeinBuro invoicing redesign shown on a mobile phone"
        imageSrc={wisoHeroImage}
      />
      <EditorialManifest content={wisoManifestContent} />
      <div id="case-study" aria-hidden="true" />
    </div>
  )
}
