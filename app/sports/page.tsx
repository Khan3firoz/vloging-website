import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { AdPlacement } from "@/components/ad-placement"
import { FeaturedArticle } from "@/components/featured-article"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function SportsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Sports</h1>

      {/* Top Ad Banner */}
      <AdPlacement className="mb-8" type="banner" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Sports</TabsTrigger>
              <TabsTrigger value="cricket">Cricket</TabsTrigger>
              <TabsTrigger value="football">Football</TabsTrigger>
              <TabsTrigger value="tennis">Tennis</TabsTrigger>
              <TabsTrigger value="basketball">Basketball</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {/* Live Matches */}
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Live Matches</h3>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      LIVE
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        sport: "Cricket",
                        team1: "India",
                        team2: "Australia",
                        score: "245/6 (42.3)",
                        status: "India batting",
                      },
                      { sport: "Football", team1: "Manchester City", team2: "Liverpool", score: "2-1", status: "75'" },
                    ].map((match, i) => (
                      <Card key={i} className="bg-background">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary">{match.sport}</Badge>
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            >
                              LIVE
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{match.team1}</span>
                            <span className="text-sm">{match.score.split("-")[0] || match.score.split("(")[0]}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{match.team2}</span>
                            <span className="text-sm">
                              {match.score.includes("-") ? match.score.split("-")[1] : ""}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{match.status}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeaturedArticle
                  image="/placeholder.svg?height=400&width=600"
                  category="Cricket"
                  title="Star Player's Performance Raises Questions About Team Selection"
                  excerpt="Recent test failures have sparked debate about selection criteria in professional cricket."
                  author="Sports Analyst"
                  time="3h ago"
                  likes={89}
                  comments={112}
                  featured
                />
                <div className="grid grid-rows-2 gap-6">
                  <FeaturedArticle
                    image="/placeholder.svg?height=200&width=400"
                    category="Football"
                    title="Transfer Window: Top Clubs Compete for Rising Star"
                    excerpt="Major European clubs in bidding war for talented young midfielder."
                    author="Football Insider"
                    time="5h ago"
                    likes={76}
                    comments={54}
                  />
                  <FeaturedArticle
                    image="/placeholder.svg?height=200&width=400"
                    category="Tennis"
                    title="Grand Slam Preview: Players to Watch"
                    excerpt="Analysis of contenders and dark horses for upcoming tournament."
                    author="Tennis Expert"
                    time="6h ago"
                    likes={62}
                    comments={31}
                  />
                </div>
              </div>

              {/* In-feed Ad */}
              <AdPlacement type="in-article" />

              <div className="grid grid-cols-1 gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FeaturedArticle
                    key={i}
                    image={`/placeholder.svg?height=250&width=500&text=Sports+${i + 1}`}
                    category={["Basketball", "Golf", "Formula 1", "Athletics", "Olympics"][i]}
                    title={
                      [
                        "NBA Playoffs: Underdog Team Makes Surprising Run",
                        "Golf Championship: Veteran Player Returns to Form",
                        "Formula 1: Technical Innovations Changing the Sport",
                        "Track and Field Records Fall at International Meet",
                        "Olympic Committee Announces Changes to Future Games",
                      ][i]
                    }
                    excerpt="Comprehensive coverage with expert analysis and behind-the-scenes insights."
                    author={
                      ["Basketball Reporter", "Golf Digest", "Racing Analyst", "Athletics Weekly", "Olympic Observer"][
                        i
                      ]
                    }
                    time={`${i + 4}h ago`}
                    likes={45 + i * 5}
                    comments={28 + i * 3}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Other tab contents would follow similar pattern */}
            <TabsContent value="cricket">
              <Suspense fallback={<SportsSkeleton />}>
                <div className="space-y-6">
                  {/* Cricket specific content would go here */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <FeaturedArticle
                      key={i}
                      image={`/placeholder.svg?height=250&width=500&text=Cricket+${i + 1}`}
                      category="Cricket"
                      title={`Cricket Update ${i + 1}: Latest News and Analysis`}
                      excerpt="Stay informed about matches, player performances, and cricket developments."
                      author="Cricket Correspondent"
                      time={`${i + 2}h ago`}
                      likes={35 + i}
                      comments={22 + i}
                    />
                  ))}
                </div>
              </Suspense>
            </TabsContent>

            {/* Additional tab contents for Football, Tennis, Basketball would be similar */}
          </Tabs>
        </main>

        <aside className="lg:col-span-4 space-y-8">
          {/* Sidebar Ad */}
          <AdPlacement type="sidebar" className="sticky top-24" />

          {/* Upcoming Matches */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Upcoming Matches</h3>
              <div className="space-y-4">
                {[
                  { sport: "Cricket", team1: "England", team2: "South Africa", time: "Tomorrow, 14:00" },
                  { sport: "Football", team1: "Barcelona", team2: "Real Madrid", time: "Sunday, 20:45" },
                  { sport: "Tennis", team1: "Djokovic", team2: "Nadal", time: "Saturday, 15:30" },
                  { sport: "Basketball", team1: "Lakers", team2: "Celtics", time: "Friday, 02:00" },
                  { sport: "Formula 1", team1: "Monaco Grand Prix", team2: "", time: "Next Sunday, 15:00" },
                ].map((match, i) => (
                  <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{match.sport}</Badge>
                      <span className="text-xs text-muted-foreground">{match.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{match.team1}</span>
                      <span className="text-xs">vs</span>
                      <span className="text-sm font-medium">{match.team2}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* League Tables */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Premier League Table</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-8 text-xs font-medium text-muted-foreground">
                  <div className="col-span-4">Team</div>
                  <div className="text-center">P</div>
                  <div className="text-center">W</div>
                  <div className="text-center">D</div>
                  <div className="text-center">L</div>
                </div>
                <Separator />
                {[
                  { pos: 1, team: "Manchester City", p: 36, w: 27, d: 5, l: 4 },
                  { pos: 2, team: "Arsenal", p: 36, w: 25, d: 5, l: 6 },
                  { pos: 3, team: "Liverpool", p: 36, w: 23, d: 9, l: 4 },
                  { pos: 4, team: "Aston Villa", p: 36, w: 20, d: 7, l: 9 },
                  { pos: 5, team: "Tottenham", p: 35, w: 18, d: 6, l: 11 },
                ].map((team) => (
                  <div key={team.pos} className="grid grid-cols-8 text-sm py-1">
                    <div className="col-span-4 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{team.pos}</span>
                      <span className="font-medium">{team.team}</span>
                    </div>
                    <div className="text-center">{team.p}</div>
                    <div className="text-center">{team.w}</div>
                    <div className="text-center">{team.d}</div>
                    <div className="text-center">{team.l}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Second Sidebar Ad */}
          <AdPlacement type="sidebar" />
        </aside>
      </div>
    </div>
  )
}

function SportsSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-32 w-48 rounded-md flex-shrink-0" />
          <div className="space-y-2 flex-grow">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
