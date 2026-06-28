export type ProjectBreakdownItem = {
  number: string
  title: string
  pillnotes: string
  body: string
}

export const prematchBreakdownItems: ProjectBreakdownItem[] = [
  {
    number: "01",
    title: "Problem",
    pillnotes: "Current Experience • Pain Points • Opportunity",
    body: "Prematch already offered detailed player statistics, making it easy to review match performance after every game. While the data was informative, it provided little value beyond the final whistle. Players could see what happened, but they lacked reasons to return throughout the week. The opportunity was not to add more statistics, but to transform existing data into an experience that encouraged progression, comparison and long term engagement.",
  },
  {
    number: "02",
    title: "Approach",
    pillnotes: "Research • Benchmark • User Insights",
    body: "To understand the real opportunity, I combined competitor analysis with qualitative user research. I benchmarked leading football products including Kickbase, SofaScore and Bundesliga Fantasy Manager while collecting feedback from amateur players. The findings consistently highlighted progression, comparison and recognition as the strongest opportunities to drive long term engagement, forming the foundation for every design decision that followed.",
  },
  {
    number: "03",
    title: "Solution",
    pillnotes: "Framework • Features • Experience",
    body: "The final concept transformed player statistics into a connected product experience. Current Stats improved clarity, Match Details added meaningful context, Rankings encouraged healthy competition and Achievements introduced long term progression through a tier based reward system. The Personal Scout completed the experience by turning performance data into personalised feedback that motivates players to return and improve.",
  },
]
