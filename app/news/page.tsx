import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { AdPlacement } from "@/components/ad-placement"
import { FeaturedArticle } from "@/components/featured-article"
import { Button } from "@/components/ui/button"

export default function NewsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">News</h1>

      {/* Top Ad Banner */}
      <AdPlacement className="mb-8" type="banner" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8">
          <Tabs defaultValue="top-stories" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="top-stories">Top Stories</TabsTrigger>
              <TabsTrigger value="world">World</TabsTrigger>
              <TabsTrigger value="politics">Politics</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
            </TabsList>

            <TabsContent value="top-stories" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeaturedArticle
                  image="/placeholder.svg?height=400&width=600"
                  category="World"
                  title="Global Summit Addresses Climate Change Initiatives"
                  excerpt="World leaders gather to discuss ambitious new targets for reducing carbon emissions."
                  author="Global News"
                  time="2h ago"
                  likes={56}
                  comments={32}
                  featured
                />
                <div className="grid grid-rows-2 gap-6">
                  <FeaturedArticle
                    image="/placeholder.svg?height=200&width=400"
                    category="Politics"
                    title="New Legislation Aims to Reform Healthcare System"
                    excerpt="Lawmakers introduce comprehensive bill addressing key healthcare challenges."
                    author="Political Insight"
                    time="3h ago"
                    likes={42}
                    comments={28}
                  />
                  <FeaturedArticle
                    image="/placeholder.svg?height=200&width=400"
                    category="Technology"
                    title="Tech Giants Face New Regulatory Challenges"
                    excerpt="Proposed regulations could reshape how major tech companies operate globally."
                    author="Tech Report"
                    time="4h ago"
                    likes={38}
                    comments={19}
                  />
                </div>
              </div>

              {/* Breaking News Section */}
              <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">BREAKING</span>
                    <span className="text-sm text-red-600 dark:text-red-400">Updated 15 minutes ago</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Major Development in International Diplomatic Relations</h3>
                  <p className="text-sm">
                    Unexpected announcement signals potential shift in longstanding international policies. Experts
                    analyzing potential global implications.
                  </p>
                  <Button variant="link" className="text-red-600 dark:text-red-400 p-0 h-auto mt-2">
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>

              {/* In-feed Ad */}
              <AdPlacement type="in-article" />

              <div className="grid grid-cols-1 gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FeaturedArticle
                    key={i}
                    image={`/placeholder.svg?height=250&width=500&text=News+${i + 1}`}
                    category={["Economy", "Health", "Education", "Environment", "Science"][i]}
                    title={
                      [
                        "Economic Forecast: Experts Predict Growth Despite Challenges",
                        "New Medical Research Breakthrough Could Transform Treatments",
                        "Education Reform: New Approaches to Learning in Digital Age",
                        "Environmental Report Highlights Urgent Conservation Needs",
                        "Scientific Discovery Opens New Possibilities in Quantum Computing",
                      ][i]
                    }
                    excerpt="Comprehensive coverage of the latest developments with expert analysis and insights."
                    author={
                      ["Economic Times", "Health Journal", "Education Today", "Environmental Watch", "Science Daily"][i]
                    }
                    time={`${i + 5}h ago`}
                    likes={30 + i * 4}
                    comments={15 + i * 2}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Other tab contents would follow similar pattern */}
            <TabsContent value="world">
              <Suspense fallback={<NewsSkeleton />}>
                <div className="space-y-6">
                  {/* World news content would go here */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <FeaturedArticle
                      key={i}
                      image={`/placeholder.svg?height=250&width=500&text=World+${i + 1}`}
                      category={
                        [
                          "Asia",
                          "Europe",
                          "Americas",
                          "Africa",
                          "Middle East",
                          "Oceania",
                          "International",
                          "Diplomacy",
                        ][i]
                      }
                      title={`World News ${i + 1}: Global Developments and Regional Updates`}
                      excerpt="Stay informed about important events and trends shaping our world today."
                      author="Global Correspondent"
                      time={`${i + 2}h ago`}
                      likes={25 + i}
                      comments={12 + i}
                    />
                  ))}
                </div>
              </Suspense>
            </TabsContent>

            {/* Additional tab contents for Politics, Business, Technology would be similar */}
          </Tabs>
        </main>

        <aside className="lg:col-span-4 space-y-8">
          {/* Sidebar Ad */}
          <AdPlacement type="sidebar" className="sticky top-24" />

          {/* Latest Updates */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Latest Updates</h3>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
                    <span className="text-xs text-muted-foreground">{`${i * 15 + 5} minutes ago`}</span>
                    <p className="text-sm font-medium mt-1">
                      {
                        [
                          "Stock markets respond to central bank announcement",
                          "Weather alert issued for coastal regions",
                          "Sports championship final results announced",
                          "Tech company unveils innovative new product",
                          "Entertainment awards ceremony highlights",
                        ][i]
                      }
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Most Read */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Most Read</h3>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-muted-foreground">{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium">
                        {
                          [
                            "Major policy shift announced by government",
                            "Celebrity interview reveals surprising details",
                            "Analysis: What the latest economic data means",
                            "Opinion: The changing landscape of global politics",
                            "Feature: Inside the world's most innovative company",
                          ][i]
                        }
                      </p>
                      <span className="text-xs text-muted-foreground">{`${2 * i + 1}h ago • ${5 * i + 20}K reads`}</span>
                    </div>
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

function NewsSkeleton() {
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
