import Link from "next/link"
import Image from "next/image"
import { MoveRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge";
import { FeaturedArticle } from "@/components/featured-article";
import { LiveScores } from "@/components/live-scores";
import { TrendingTopics } from "@/components/trending-topics";
import { AdPlacement } from "@/components/ad-placement"
import { AffiliateProducts } from "@/components/affiliate-products";
import { StockMarketCard } from "../components/stock-market-card";
import { MutualFundCard } from "../components/mutual-fund-card";
import { CryptoCard } from "../components/crypto-card";
import { WeatherCard } from "../components/weather-card";
import { AdSense } from "@/components/adsense";

interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
}

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  console.log("API Response Data:", data);
  return data.posts as Post[];
}

export default async function Home() {
  const posts = await getPosts();
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";

  return (
    <main className="flex-1">
      <AdSense pId={clientId} />
      {/* Top Ad Banner with proper spacing */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[728px] mx-auto">
          <AdPlacement type="banner" />
        </div>
      </div>

      {/* Main content wrapper with ad spaces */}
      <div className="relative">
        {/* Left Side Ad */}
        <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 w-[160px] z-10">
          <AdPlacement type="sidebar" />
        </div>

        {/* Right Side Ad */}
        <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 w-[160px] z-10">
          <AdPlacement type="sidebar" />
        </div>

        {/* Main content area with proper margins for ads */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:mx-[180px] grid grid-cols-1 md:grid-cols-12 gap-6 py-8">
            {/* Main Content Area */}
            <div className="md:col-span-9 space-y-6">
              <Tabs defaultValue="featured" className="w-full">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="trending">Trending</TabsTrigger>
                    <TabsTrigger value="latest">Latest</TabsTrigger>
                    <TabsTrigger value="tech">Tech</TabsTrigger>
                    <TabsTrigger value="entertainment">
                      Entertainment
                    </TabsTrigger>
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
                    {posts.length > 0 ? (
                      <>
                        <FeaturedArticle
                          image={
                            posts[0].image ||
                            "/placeholder.svg?height=400&width=600"
                          }
                          category={posts[0].category}
                          title={posts[0].title}
                          excerpt={posts[0].excerpt}
                          author={posts[0].author}
                          time={
                            posts[0].createdAt
                              ? new Date(
                                  posts[0].createdAt
                                ).toLocaleDateString()
                              : "Recently"
                          }
                          likes={posts[0].likes || 0}
                          comments={posts[0].comments || 0}
                          featured
                          href={`/post/${posts[0]._id}`}
                        />
                        <div className="grid grid-rows-2 gap-6">
                          {posts.slice(1, 3).map((post, index) => (
                            <FeaturedArticle
                              key={post._id}
                              image={
                                post.image ||
                                "/placeholder.svg?height=200&width=400"
                              }
                              category={post.category}
                              title={post.title}
                              excerpt={post.excerpt}
                              author={post.author}
                              time={
                                post.createdAt
                                  ? new Date(
                                      post.createdAt
                                    ).toLocaleDateString()
                                  : "Recently"
                              }
                              likes={post.likes || 0}
                              comments={post.comments || 0}
                              href={`/post/${post._id}`}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="col-span-2 text-center py-8">
                        <p className="text-muted-foreground">
                          No posts available
                        </p>
                      </div>
                    )}
                  </div>

                  {/* In-feed Ad */}
                  <div className="my-6">
                    <AdPlacement type="in-article" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {posts.slice(3, 6).map((post) => (
                      <FeaturedArticle
                        key={post._id}
                        image={
                          post.image || "/placeholder.svg?height=200&width=300"
                        }
                        category={post.category}
                        title={post.title}
                        excerpt={post.excerpt}
                        author={post.author}
                        time={
                          post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString()
                            : "Recently"
                        }
                        likes={post.likes || 0}
                        comments={post.comments || 0}
                        href={`/post/${post._id}`}
                      />
                    ))}
                  </div>
                </TabsContent>

                {/* Trending Tab */}
                <TabsContent value="trending">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {posts.slice(0, 6).map((post) => (
                      <Link key={post._id} href={`/post/${post._id}`}>
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="relative h-48">
                              <Image
                                src={
                                  post.image ||
                                  `/placeholder.svg?height=200&width=300&text=${post.title}`
                                }
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  <TrendingUp className="h-3 w-3" /> Trending
                                </Badge>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold line-clamp-2">
                                {post.title}
                              </h3>
                              <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                                <span>{post.author}</span>
                                <span>
                                  {post.createdAt
                                    ? new Date(
                                        post.createdAt
                                      ).toLocaleDateString()
                                    : "Recently"}
                                </span>
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
                      {posts.length > 0 && (
                        <Link href={`/post/${posts[0]._id}`}>
                          <FeaturedArticle
                            image={
                              posts[0].image ||
                              "/placeholder.svg?height=400&width=600"
                            }
                            category={posts[0].category}
                            title={posts[0].title}
                            excerpt={posts[0].excerpt}
                            author={posts[0].author}
                            time={
                              posts[0].createdAt
                                ? new Date(
                                    posts[0].createdAt
                                  ).toLocaleDateString()
                                : "Recently"
                            }
                            likes={posts[0].likes || 0}
                            comments={posts[0].comments || 0}
                            featured
                          />
                        </Link>
                      )}
                      <div className="space-y-6">
                        {posts.slice(1, 4).map((post) => (
                          <Link key={post._id} href={`/post/${post._id}`}>
                            <div className="flex gap-4 group">
                              <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={
                                    post.image ||
                                    `/placeholder.svg?height=100&width=100&text=${post.title}`
                                  }
                                  alt={post.title}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                              <div className="flex-1">
                                <Badge variant="outline" className="mb-1">
                                  {post.category}
                                </Badge>
                                <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                  {post.title}
                                </h3>
                                <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                                  <span>{post.author}</span>
                                  <span>
                                    {post.createdAt
                                      ? new Date(
                                          post.createdAt
                                        ).toLocaleDateString()
                                      : "Recently"}
                                  </span>
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
                        <h3 className="text-lg font-semibold">
                          Recommended Products
                        </h3>
                        <Badge variant="outline">Sponsored</Badge>
                      </div>
                      <AffiliateProducts />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Link key={i} href={`/post/${i + 17}`}>
                          <FeaturedArticle
                            image={`/placeholder.svg?height=200&width=300&text=Latest+${
                              i + 4
                            }`}
                            category={
                              [
                                "Economy",
                                "Health",
                                "Sports",
                                "Education",
                                "Environment",
                                "Technology",
                              ][i]
                            }
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
                        <h3 className="text-lg font-semibold">
                          Top Tech Products
                        </h3>
                        <Badge variant="outline">Affiliate</Badge>
                      </div>
                      <AffiliateProducts category="tech" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Link key={i} href={`/post/${i + 26}`}>
                          <FeaturedArticle
                            image={`/placeholder.svg?height=200&width=300&text=Tech+${
                              i + 1
                            }`}
                            category={
                              [
                                "Web Dev",
                                "Cloud",
                                "Data Science",
                                "Mobile",
                                "IoT",
                                "Gaming",
                              ][i]
                            }
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
                        <h3 className="text-lg font-semibold">
                          Entertainment Essentials
                        </h3>
                        <Badge variant="outline">Sponsored</Badge>
                      </div>
                      <AffiliateProducts category="entertainment" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Link key={i} href={`/post/${i + 35}`}>
                          <FeaturedArticle
                            image={`/placeholder.svg?height=200&width=300&text=Entertainment+${
                              i + 1
                            }`}
                            category={
                              [
                                "Celebrity",
                                "Gaming",
                                "Books",
                                "Theater",
                                "Art",
                                "Streaming",
                              ][i]
                            }
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

              {/* Sidebar Ad with proper spacing */}
              <div className="max-w-[300px] mx-auto">
                <AdPlacement type="sidebar" />
              </div>

              <Card>
                <CardContent className="p-4">
                  <StockMarketCard />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <MutualFundCard />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <CryptoCard />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <WeatherCard />
                </CardContent>
              </Card>

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
                      <h4 className="font-medium">
                        Premium Wireless Headphones
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Experience studio-quality sound with the latest
                        noise-cancelling technology.
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold">$199.99</span>
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700"
                        >
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
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest updates directly to your inbox
                  </p>
                  <form className="space-y-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    />
                    <Button className="w-full">Subscribe</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
