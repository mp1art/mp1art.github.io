export type EditorialCoverFact = {
  label: string
  value: string
}

export type EditorialCoverContent = {
  projectLabel: string
  headline: string[]
  intro: string
  facts: EditorialCoverFact[]
}

export const prematchCoverContent: EditorialCoverContent = {
  projectLabel: "Prematch Challenge",
  headline: ["Turning", "Statistics", "into", "Motivation"],
  intro: "How might  we turn coplex football data into personal motivation for every player?",
  facts: [
    { label: "Year", value: "2016" },
    { label: "Type", value: "Challange" },
    { label: "Duration", value: "2 Days" },
    { label: "Role ", value: "Product Design" },
    { label: "Industry", value: "Football" },
  ],
}
