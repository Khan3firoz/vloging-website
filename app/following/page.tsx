import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { AdPlacement } from "@/components/ad-placement"
import { FeaturedArticle } from "@/components/featured-article"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function FollowingPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Following</h1>

      {/* Top Ad Banner */}
      <AdPlacement className="mb-8" type="banner" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="creators">Creators</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Latest from your follows</h2>
                <Button variant="outline" size="sm">
                  Manage Follows
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FeaturedArticle
                    key={i}
                    image={`/placeholder.svg?height=300&width=500&text=Following+${i + 1}`}
                    category={["Technology", "Health", "Business", "Entertainment", "Sports"][i]}
                    title={
                      [
                        "The Evolution of Web Development in 2025",
                        "New Research on Intermittent Fasting Benefits",
                        "Startup Funding Reaches Record Highs in Q2",
                        "Behind the Scenes of the Most Anticipated Series",
                        "Analysis: Championship Finals Predictions",
                      ][i]
                    }
                    excerpt="Get the latest insights and updates from the sources you follow regularly."
                    author={
                      ["Tech Insights", "Health Journal", "Business Weekly", "Entertainment Now", "Sports Analysis"][i]
                    }
                    time={`${i + 1}h ago`}
                    likes={30 + i * 5}
                    comments={12 + i}
                  />
                ))}
              </div>

              {/* In-feed Ad */}
              <AdPlacement type="in-article" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <FeaturedArticle
                    key={i}
                    image={`/placeholder.svg?height=200&width=400&text=More+${i + 1}`}
                    category={["Science", "Travel", "Food", "Fashion"][i]}
                    title={
                      [
                        "Latest Discoveries in Astronomy",
                        "Hidden Gems: Southeast Asia Edition",
                        "Plant-Based Cuisine Revolution",
                        "Sustainable Fashion: Beyond the Trends",
                      ][i]
                    }
                    excerpt="Continue exploring content from your favorite sources and topics."
                    author={["Science Today", "Travel Guide", "Culinary Arts", "Fashion Forward"][i]}
                    time={`${i + 6}h ago`}
                    likes={15 + i * 3}
                    comments={8 + i}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="topics">
              <Suspense fallback={<FollowingSkeleton />}>
                <div className="space-y-8">
                  {["Technology", "Health & Wellness", "Business", "Entertainment"].map((topic) => (
                    <div key={topic}>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">{topic}</h2>
                        <Button variant="outline" size="sm">
                          View All
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 2 }).map((_, i) => (
                          <FeaturedArticle
                            key={i}
                            image={`/placeholder.svg?height=200&width=400&text=${topic}+${i + 1}`}
                            category={topic}
                            title={`${topic} Insight ${i + 1}: Latest Developments`}
                            excerpt={`Stay updated on the latest trends and news in ${topic} with insights from leading experts and analysts.`}
                            author={`${topic} Analyst`}
                            time={`${i + 2}h ago`}
                            likes={22 + i}
                            comments={9 + i}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Suspense>
            </TabsContent>

            <TabsContent value="creators">
              <Suspense fallback={<FollowingSkeleton />}>
                <div className="space-y-6">
                  {["Tech Insights", "Health Journal", "Business Weekly", "Entertainment Now", "Sports Analysis"].map(
                    (creator, index) => (
                      <Card key={creator}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={`/placeholder.svg?text=${creator[0]}`} />
                              <AvatarFallback>{creator[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{creator}</h3>
                              <p className="text-sm text-muted-foreground">Content Creator</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array.from({ length: 2 }).map((_, i) => (
                              <FeaturedArticle
                                key={i}
                                image={`/placeholder.svg?height=150&width=300&text=${creator}+${i + 1}`}
                                category={["Technology", "Health", "Business", "Entertainment", "Sports"][index]}
                                title={`${creator} Update ${i + 1}: Latest Insights`}
                                excerpt={`New content from ${creator} exploring the latest developments.`}
                                author={creator}
                                time={`${i + 1}d ago`}
                                likes={18 + i}
                                comments={7 + i}
                              />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              </Suspense>
            </TabsContent>

            <TabsContent value="publications">
              <Suspense fallback={<FollowingSkeleton />}>
                <div className="space-y-8">
                  {["Tech Today", "Health Monthly", "Business Insider", "Entertainment Weekly"].map((publication) => (
                    <div key={publication}>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">{publication}</h2>
                        <Button variant="outline" size="sm">
                          View Publication
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <FeaturedArticle
                            key={i}
                            image={`/placeholder.svg?height=200&width=300&text=${publication}+${i + 1}`}
                            category={publication.split(" ")[0]}
                            title={`${publication} Feature ${i + 1}: In-depth Analysis`}
                            excerpt={`Exclusive content from ${publication} with comprehensive coverage.`}
                            author={publication}
                            time={`${i + 2}d ago`}
                            likes={25 + i}
                            comments={11 + i}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Suspense>
            </TabsContent>
          </Tabs>
        </main>

        <aside className="lg:col-span-4 space-y-8">
          {/* Sidebar Ad */}
          <AdPlacement type="sidebar" className="sticky top-24" />

          {/* Suggested to Follow */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Suggested to Follow</h3>
              <div className="space-y-4">
                {["Science Today", "Travel Guide", "Culinary Arts", "Fashion Forward", "Photography Pro"].map(
                  (suggestion) => (
                    <div key={suggestion} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?text=${suggestion[0]}`} />
                          <AvatarFallback>{suggestion[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{suggestion}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Follow
                      </Button>
                    </div>
                  ),
                )}
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

function FollowingSkeleton() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-24" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, j) => (
              <div key={j} className="space-y-3">
                <Skeleton className="h-40 w-full rounded-md" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
