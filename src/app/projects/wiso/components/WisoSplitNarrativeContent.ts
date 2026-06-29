import wisoSplit01Image from "@/imports/wiso-split-01.png"
import wisoSplit02Image from "@/imports/wiso-split-02.png"
import wisoSplit03Image from "@/imports/wiso-split-03.png"
import wisoSplit04Image from "@/imports/wiso-split-04.png"
import type { EditorialSplitNarrativeContent } from "../../prematch/components/EditorialSplitNarrativeContent"

export const wisoSplitNarrativeSections: EditorialSplitNarrativeContent[] = [
  {
    eyebrow: "The Challenge",
    headline: "Business owners don't buy software.",
    body: [
      "Running a business means constantly switching between customers, emails, deadlines and administrative tasks. Accounting software should reduce that complexity, not add to it. While WISO MeinBüro already offered a comprehensive feature set, the landing page didn't fully communicate the confidence and simplicity the product actually delivers.",
    ],
    mediaSrc: wisoSplit01Image,
    mediaAlt: "WISO invoice paperwork on a desk",
    desktopLayout: "text-left",
    mobileOrder: "text-first",
  },
  {
    eyebrow: "First Impressions",
    headline: "Every decision starts before the first click.",
    body: [
      "Visitors form an opinion within the first few seconds. A clear value proposition, strong visual hierarchy and focused messaging help users understand the product faster and reduce uncertainty before they even begin exploring its features.",
    ],
    mediaSrc: wisoSplit02Image,
    mediaAlt: "WISO interface preview on a laptop",
    desktopLayout: "text-right",
    mobileOrder: "image-first",
  },
  {
    eyebrow: "Design Principles",
    headline: "Clarity removes unnecessary friction.",
    body: [
      "Every section was designed to guide users toward the next logical step. Content was prioritised, visual noise reduced and information grouped into digestible sections. The goal wasn't to remove functionality, but to make every decision feel easier.",
    ],
    mediaSrc: wisoSplit03Image,
    mediaAlt: "Stack of invoices and business documents on a desk",
    desktopLayout: "text-left",
    mobileOrder: "text-first",
  },
  {
    eyebrow: "The Outcome",
    headline: "Design that builds confidence.",
    body: [
      "The redesign focused on making the product feel as approachable as it is powerful. By improving clarity, strengthening information hierarchy and creating a more focused conversion journey, the experience better reflects the value WISO MeinBüro already provides.",
    ],
    mediaSrc: wisoSplit04Image,
    mediaAlt: "WISO business software interface on a laptop in a workspace",
    desktopLayout: "text-right",
    mobileOrder: "image-first",
  },
]
