import currentStatsImage from "@/imports/Current-Stats.png"
import researchResultImage from "@/imports/Research-result.png"
import solutionVideo from "@/imports/Video.webm"

export type EditorialSplitNarrativeLayout = "text-left" | "text-right"
export type EditorialSplitNarrativeMobileOrder = "text-first" | "image-first"
export type EditorialSplitNarrativeMediaType = "image" | "video"

export type EditorialSplitNarrativeContent = {
  eyebrow: string
  headline: string
  body: string[]
  mediaSrc: string
  mediaAlt: string
  mediaType?: EditorialSplitNarrativeMediaType
  desktopLayout: EditorialSplitNarrativeLayout
  mobileOrder: EditorialSplitNarrativeMobileOrder
}

export const prematchChallengeNarrativeContent: EditorialSplitNarrativeContent = {
  eyebrow: "The Challenge",
  headline: "Statistics informed players but did not motivate them to return.",
  body: [
    "Prematch already provided players with detailed match statistics, making it easy to review individual performance after every game. While the information was valuable, its purpose ended once the match was over. Players could see what happened but had little reason to return during the week. The challenge was not to introduce more statistics. The real opportunity was to transform existing data into an experience that encouraged progression, recognition and long term engagement.",
  ],
  mediaSrc: currentStatsImage,
  mediaAlt: "Prematch current stats interface shown on a football pitch",
  desktopLayout: "text-left",
  mobileOrder: "text-first",
}

export const prematchResearchNarrativeContent: EditorialSplitNarrativeContent = {
  eyebrow: "Research",
  headline: "Understanding what motivates amateur football players.",
  body: [
    "To understand the real opportunity, I combined competitor analysis with qualitative user research. I analysed football products such as Kickbase, SofaScore and Promateur while also exploring products outside the category that successfully encourage long term engagement. The survey confirmed a clear pattern. Players were not asking for more statistics. They wanted visible progress, meaningful comparison and recognition for their performance. These insights became the foundation for every design decision that followed.",
  ],
  mediaSrc: researchResultImage,
  mediaAlt: "Research result cards showing survey insights for Prematch",
  desktopLayout: "text-right",
  mobileOrder: "image-first",
}

export const prematchSolutionNarrativeContent: EditorialSplitNarrativeContent = {
  eyebrow: "The Solution",
  headline: "One system. Four connected experiences.",
  body: [
    "The solution was designed as a connected product experience rather than a collection of individual features. Rankings encouraged healthy competition between teammates. Achievements rewarded consistency throughout the season. The Personal Scout translated statistics into meaningful feedback, while the redesigned overview made performance easier to understand at a glance. Each feature reinforced the same goal by giving players more reasons to return beyond match day.",
  ],
  mediaSrc: solutionVideo,
  mediaAlt: "Prematch product interaction video",
  mediaType: "video",
  desktopLayout: "text-left",
  mobileOrder: "text-first",
}

export const prematchSplitNarrativeSections: EditorialSplitNarrativeContent[] = [
  prematchChallengeNarrativeContent,
  prematchResearchNarrativeContent,
  prematchSolutionNarrativeContent,
]
