import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { AdPlacement } from "@/components/ad-placement"
import { FeaturedArticle } from "@/components/featured-article"

export default function DiscoverPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Discover</h1>

      {/* Top Ad Banner */}
      <AdPlacement className="mb-8" type="banner" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8">
          <Tabs defaultValue="for-you" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="for-you">For You</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
            </TabsList>

            <TabsContent value="for-you" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeaturedArticle
                  image="/placeholder.svg?height=400&width=600"
                  category="Technology"
                  title="The Future of AI in Content Creation"
                  excerpt="How artificial intelligence is transforming the way we create and consume digital content."
                  author="Tech Insights"
                  time="3h ago"
                  likes={42}
                  comments={15}
                  featured
                />
                <div className="grid grid-rows-2 gap-6">
                  <FeaturedArticle
                    image="/placeholder.svg?height=200&width=400"
                    category="Travel"
                    title="Hidden Gems: Unexplored Destinations for 2025"
                    excerpt="Discover these off-the-beaten-path locations before they become tourist hotspots."
                    author="Travel Guide"
                    time="5h ago"
                    likes={28}
                    comments={9}
                  />
                  <FeaturedArticle
                    image="/placeholder.svg?height=200&width=400"
                    category="Food"
                    title="Culinary Trends: What's Hot in Global Cuisine"
                    excerpt="From fusion experiments to revival of ancient recipes, here's what's trending in food."
                    author="Food Explorer"
                    time="7h ago"
                    likes={36}
                    comments={21}
                  />
                </div>
              </div>

              {/* In-feed Ad */}
              <AdPlacement type="in-article" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <FeaturedArticle
                    key={i}
                    image={`/placeholder.svg?height=200&width=300&text=Discover+${i + 1}`}
                    category={["Science", "Health", "Business", "Arts", "Education", "Lifestyle"][i % 6]}
                    title={
                      [
                        "Breakthrough in Quantum Computing",
                        "Mental Health Strategies for Remote Workers",
                        "Sustainable Business Models Gaining Traction",
                        "Digital Art Revolution: NFTs and Beyond",
                        "Learning in the Metaverse: Educational Innovations",
                        "Minimalist Living: The New Luxury Trend",
                      ][i % 6]
                    }
                    excerpt="Exploring the latest developments and insights in this rapidly evolving field."
                    author="VlogVerse"
                    time={`${i + 2}h ago`}
                    likes={20 + i}
                    comments={5 + i}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending">
              <Suspense fallback={<DiscoverSkeleton />}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Trending content would be loaded here */}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <FeaturedArticle
                      key={i}
                      image={`/placeholder.svg?height=200&width=300&text=Trending+${i + 1}`}
                      category={["Technology", "Entertainment", "Sports", "Politics", "Science", "Travel"][i % 6]}
                      title={`Trending Topic ${i + 1}: What Everyone's Talking About Today`}
                      excerpt="Breaking down the viral stories and discussions capturing attention across the web."
                      author="Trend Analyst"
                      time={`${i + 1}h ago`}
                      likes={50 + i * 10}
                      comments={15 + i}
                    />
                  ))}
                </div>
              </Suspense>
            </TabsContent>

            <TabsContent value="new">
              <Suspense fallback={<DiscoverSkeleton />}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* New content would be loaded here */}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <FeaturedArticle
                      key={i}
                      image={`/placeholder.svg?height=200&width=300&text=New+${i + 1}`}
                      category={["Innovation", "Startups", "Research", "Products", "Services", "Ideas"][i % 6]}
                      title={`New Discovery ${i + 1}: Fresh Content Just Released`}
                      excerpt="Be among the first to explore these newly published stories and insights."
                      author="Content Curator"
                      time={`${Math.floor(i / 3) + 1}h ago`}
                      likes={5 + i}
                      comments={2 + i}
                    />
                  ))}
                </div>
              </Suspense>
            </TabsContent>
          </Tabs>
        </main>

        <aside className="lg:col-span-4 space-y-8">
          {/* Sidebar Ad */}
          <AdPlacement type="sidebar" className="sticky top-24" />

          {/* Topics to Follow */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Topics to Discover</h3>
              <div className="space-y-3">
                {[
                  "Artificial Intelligence",
                  "Climate Change",
                  "Space Exploration",
                  "Digital Art",
                  "Sustainable Living",
                  "Future of Work",
                ].map((topic) => (
                  <div key={topic} className="flex items-center justify-between">
                    <span className="text-sm">{topic}</span>
                    <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors">
                      Follow
                    </button>
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

function DiscoverSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-40 w-full rounded-md" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}
