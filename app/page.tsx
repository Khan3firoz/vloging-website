import Link from "next/link"
import Image from "next/image"
import { MoveRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { FeaturedArticle } from "@/components/featured-article"
import { LiveScores } from "@/components/live-scores"
import { TrendingTopics } from "@/components/trending-topics"
import { ThreeScene } from "@/components/three-scene"
import { AdPlacement } from "@/components/ad-placement"
import { AffiliateProducts } from "@/components/affiliate-products"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8">
                <ThreeScene />
              </div>
              <span className="font-bold text-xl">VlogVerse</span>
            </Link>
          </div>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Top Ad Banner */}
        <div className="container py-4">
          <AdPlacement type="banner" />
        </div>

        <div className="container grid grid-cols-1 md:grid-cols-12 gap-6 py-8">
          {/* Main Content Area */}
          <div className="md:col-span-9 space-y-6">
            <Tabs defaultValue="featured" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="latest">Latest</TabsTrigger>
                  <TabsTrigger value="tech">Tech</TabsTrigger>
                  <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-1" asChild>
                    <Link href={`/discover`}>
                      View All <MoveRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Featured Tab */}
              <TabsContent value="featured" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link href="/post/1">
                    <FeaturedArticle
                      image="/placeholder.svg?height=400&width=600"
                      category="Entertainment"
                      title="Music Industry Faces New Copyright Challenges"
                      excerpt="Recent court rulings reshape how artists and producers handle music rights in the digital age."
                      author="Times Now"
                      time="7h ago"
                      likes={18}
                      comments={5}
                      featured
                    />
                  </Link>
                  <div className="grid grid-rows-2 gap-6">
                    <Link href="/post/2">
                      <FeaturedArticle
                        image="/placeholder.svg?height=200&width=400"
                        category="Sports"
                        title="Cricket Star's Performance Raises Questions"
                        excerpt="Recent test failures spark debate about selection criteria."
                        author="Times Now"
                        time="9h ago"
                        likes={8}
                        comments={12}
                      />
                    </Link>
                    <Link href="/post/3">
                      <FeaturedArticle
                        image="/placeholder.svg?height=200&width=400"
                        category="Technology"
                        title="Full Stack Development Trends in 2025"
                        excerpt="New frameworks and approaches changing how developers build applications."
                        author="Tech Insights"
                        time="3h ago"
                        likes={24}
                        comments={7}
                      />
                    </Link>
                  </div>
                </div>

                {/* In-feed Ad */}
                <div className="my-6">
                  <AdPlacement type="in-article" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Link key={i} href={`/post/${i + 4}`}>
                      <FeaturedArticle
                        image="/placeholder.svg?height=200&width=300"
                        category={["Business", "Health", "Travel"][i]}
                        title={
                          [
                            "Market Trends Show Promising Growth",
                            "New Health Guidelines Released",
                            "Top Travel Destinations for 2025",
                          ][i]
                        }
                        excerpt="Latest updates and insights from industry experts."
                        author="VlogVerse"
                        time={`${i + 1}h ago`}
                        likes={10 + i}
                        comments={3 + i}
                      />
                    </Link>
                  ))}
                </div>
              </TabsContent>

              {/* Trending Tab */}
              <TabsContent value="trending">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Link key={i} href={`/post/${i + 7}`}>
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative h-48">
                            <Image
                              src={`/placeholder.svg?height=200&width=300&text=Trending+${i + 1}`}
                              alt="Trending article"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge variant="secondary" className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> Trending
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold line-clamp-2">
                              Trending Topic {i + 1}: What Everyone's Talking About
                            </h3>
                            <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                              <span>VlogVerse</span>
                              <span>{i + 1}h ago</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              {/* Latest Tab */}
              <TabsContent value="latest">
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/post/13">
                      <FeaturedArticle
                        image="/placeholder.svg?height=400&width=600"
                        category="Breaking"
                        title="Just In: Major Announcement from Tech Giant"
                        excerpt="Breaking news about a revolutionary product launch that could change the industry."
                        author="Tech Reporter"
                        time="1h ago"
                        likes={5}
                        comments={2}
                        featured
                      />
                    </Link>
                    <div className="space-y-6">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Link key={i} href={`/post/${i + 14}`}>
                          <div className="flex gap-4 group">
                            <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                              <Image
                                src={`/placeholder.svg?height=100&width=100&text=Latest+${i + 1}`}
                                alt={`Latest article ${i + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex-1">
                              <Badge variant="outline" className="mb-1">
                                {["Politics", "Science", "Culture"][i]}
                              </Badge>
                              <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                {
                                  [
                                    "New Policy Changes Impact Global Markets",
                                    "Scientists Discover Breakthrough Treatment",
                                    "Cultural Festival Celebrates Diversity",
                                  ][i]
                                }
                              </h3>
                              <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                                <span>VlogVerse</span>
                                <span>{i + 2}h ago</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Affiliate Products Section */}
                  <div className="my-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Recommended Products</h3>
                      <Badge variant="outline">Sponsored</Badge>
                    </div>
                    <AffiliateProducts />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Link key={i} href={`/post/${i + 17}`}>
                        <FeaturedArticle
                          image={`/placeholder.svg?height=200&width=300&text=Latest+${i + 4}`}
                          category={["Economy", "Health", "Sports", "Education", "Environment", "Technology"][i]}
                          title={
                            [
                              "Economic Forecast: Growth Expected in Q3",
                              "New Study Reveals Benefits of Meditation",
                              "Championship Results: Unexpected Winners",
                              "Education Reform: New Curriculum Announced",
                              "Climate Initiative Gains International Support",
                              "AI Advancements: What's Next in Technology",
                            ][i]
                          }
                          excerpt="Breaking news and the most recent updates from around the world."
                          author="VlogVerse"
                          time={`${i + 3}h ago`}
                          likes={7 + i}
                          comments={3 + i}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Tech Tab */}
              <TabsContent value="tech">
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/post/23">
                      <FeaturedArticle
                        image="/placeholder.svg?height=400&width=600"
                        category="AI"
                        title="Artificial Intelligence: The Next Frontier in Development"
                        excerpt="How AI is transforming software development and creating new opportunities for innovation."
                        author="Tech Insights"
                        time="4h ago"
                        likes={32}
                        comments={17}
                        featured
                      />
                    </Link>
                    <div className="grid grid-rows-2 gap-6">
                      <Link href="/post/24">
                        <FeaturedArticle
                          image="/placeholder.svg?height=200&width=400"
                          category="Gadgets"
                          title="Review: The Latest Flagship Smartphones Compared"
                          excerpt="In-depth comparison of the newest high-end smartphones on the market."
                          author="Gadget Guru"
                          time="6h ago"
                          likes={28}
                          comments={15}
                        />
                      </Link>
                      <Link href="/post/25">
                        <FeaturedArticle
                          image="/placeholder.svg?height=200&width=400"
                          category="Cybersecurity"
                          title="Protecting Your Digital Life: Essential Security Tips"
                          excerpt="Expert advice on keeping your data safe in an increasingly connected world."
                          author="Security Expert"
                          time="8h ago"
                          likes={19}
                          comments={8}
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Tech Affiliate Products */}
                  <div className="my-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Top Tech Products</h3>
                      <Badge variant="outline">Affiliate</Badge>
                    </div>
                    <AffiliateProducts category="tech" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Link key={i} href={`/post/${i + 26}`}>
                        <FeaturedArticle
                          image={`/placeholder.svg?height=200&width=300&text=Tech+${i + 1}`}
                          category={["Web Dev", "Cloud", "Data Science", "Mobile", "IoT", "Gaming"][i]}
                          title={
                            [
                              "Frontend Frameworks: What's Hot in 2025",
                              "Cloud Computing: Optimizing for Scale and Cost",
                              "Big Data: Turning Information into Insights",
                              "Mobile Development Trends to Watch",
                              "IoT Revolution: Connected Devices Everywhere",
                              "Gaming Technology: Beyond Entertainment",
                            ][i]
                          }
                          excerpt="Deep dives into the technology shaping our digital future."
                          author={
                            [
                              "Web Expert",
                              "Cloud Architect",
                              "Data Scientist",
                              "Mobile Dev",
                              "IoT Specialist",
                              "Gaming Analyst",
                            ][i]
                          }
                          time={`${i + 5}h ago`}
                          likes={15 + i}
                          comments={7 + i}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Entertainment Tab */}
              <TabsContent value="entertainment">
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/post/32">
                      <FeaturedArticle
                        image="/placeholder.svg?height=400&width=600"
                        category="Movies"
                        title="Blockbuster Season: Summer's Most Anticipated Films"
                        excerpt="Preview of the biggest movies hitting theaters this summer, with exclusive insights."
                        author="Film Critic"
                        time="3h ago"
                        likes={45}
                        comments={23}
                        featured
                      />
                    </Link>
                    <div className="grid grid-rows-2 gap-6">
                      <Link href="/post/33">
                        <FeaturedArticle
                          image="/placeholder.svg?height=200&width=400"
                          category="Music"
                          title="Album Review: Chart-Topping Artist's New Release"
                          excerpt="Critical analysis of the latest album that's dominating streaming platforms."
                          author="Music Reviewer"
                          time="5h ago"
                          likes={37}
                          comments={19}
                        />
                      </Link>
                      <Link href="/post/34">
                        <FeaturedArticle
                          image="/placeholder.svg?height=200&width=400"
                          category="TV Shows"
                          title="Streaming Wars: New Series Making Waves"
                          excerpt="The shows everyone's talking about across major streaming platforms."
                          author="TV Critic"
                          time="7h ago"
                          likes={29}
                          comments={14}
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Entertainment Affiliate Products */}
                  <div className="my-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Entertainment Essentials</h3>
                      <Badge variant="outline">Sponsored</Badge>
                    </div>
                    <AffiliateProducts category="entertainment" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Link key={i} href={`/post/${i + 35}`}>
                        <FeaturedArticle
                          image={`/placeholder.svg?height=200&width=300&text=Entertainment+${i + 1}`}
                          category={["Celebrity", "Gaming", "Books", "Theater", "Art", "Streaming"][i]}
                          title={
                            [
                              "Celebrity Interview: Behind the Scenes",
                              "Gaming Review: This Year's Must-Play Titles",
                              "Book Club: Literary Sensations Worth Reading",
                              "Theater Review: Broadway's Latest Hit",
                              "Art Exhibition: Contemporary Masterpieces",
                              "Streaming Guide: What to Watch This Weekend",
                            ][i]
                          }
                          excerpt="Your guide to the latest in entertainment and culture."
                          author={
                            [
                              "Celebrity Reporter",
                              "Game Reviewer",
                              "Book Critic",
                              "Theater Critic",
                              "Art Curator",
                              "Streaming Expert",
                            ][i]
                          }
                          time={`${i + 4}h ago`}
                          likes={22 + i}
                          comments={11 + i}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Live Scores</h3>
                  <Badge variant="outline">LIVE</Badge>
                </div>
                <LiveScores />
              </CardContent>
            </Card>

            {/* Sidebar Ad */}
            <AdPlacement type="sidebar" />

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Trending Topics</h3>
                <TrendingTopics />
              </CardContent>
            </Card>

            {/* Affiliate Marketing Sidebar */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Editor's Choice</h3>
                  <Badge
                    variant="outline"
                    className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                  >
                    Sponsored
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-md overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=200&width=350&text=Featured+Product"
                      alt="Featured product"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Premium Wireless Headphones</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Experience studio-quality sound with the latest noise-cancelling technology.
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold">$199.99</span>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Subscribe</h3>
                <p className="text-sm text-muted-foreground mb-4">Get the latest updates directly to your inbox</p>
                <form className="space-y-2">
                  <input type="email" placeholder="Your email" className="w-full px-3 py-2 border rounded-md text-sm" />
                  <Button className="w-full">Subscribe</Button>
                </form>
              </CardContent>
            </Card>

            {/* Second Sidebar Ad */}
            <AdPlacement type="sidebar" />
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">© 2025 VlogVerse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
