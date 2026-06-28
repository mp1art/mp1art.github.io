import achievementsImage from "@/imports/gallery-Achievements.png"
import currentStatsImage from "@/imports/gallery-Current-Stats.png"
import matchdetailsImage from "@/imports/gallery-Matchdetails.png"
import rankingsImage from "@/imports/gallery-Rankings.png"

export type EditorialGalleryItem = {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
}

export const prematchGalleryItems: EditorialGalleryItem[] = [
  {
    imageSrc: currentStatsImage,
    imageAlt: "Prematch current stats screen",
    title: "Current Stats",
    description:
      "Focused the overview on the metrics players care about most while improving readability and reducing visual noise.",
  },
  {
    imageSrc: matchdetailsImage,
    imageAlt: "Prematch match details screen",
    title: "Matchdetails",
    description: "Expanded match statistics with richer context to make every performance easier to understand and review.",
  },
  {
    imageSrc: rankingsImage,
    imageAlt: "Prematch rankings screen",
    title: "Rankings",
    description: "Introduced team rankings to encourage healthy competition and make player performance more meaningful.",
  },
  {
    imageSrc: achievementsImage,
    imageAlt: "Prematch achievements screen",
    title: "Achievements",
    description:
      "Designed a progressive achievement system where players unlock new tiers through consistent performance, creating long term motivation to collect and improve.",
  },
]
