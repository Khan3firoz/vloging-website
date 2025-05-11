import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronLeft, Clock, ThumbsUp, MessageSquare, Share2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AdPlacement } from "@/components/ad-placement"
import { RelatedPosts } from "@/components/related-posts"
import { AffiliateProducts } from "@/components/affiliate-products"
import { RecommendedPosts } from "@/components/recommended-posts"

// This would normally come from a database or API
async function getPostData(id: string) {
  // Simulating API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // For demo purposes, we'll return mock data
  // In a real app, you would fetch this from your API
  const posts = {
    "1": {
      id: "1",
      title: "Music Industry Faces New Copyright Challenges",
      content: `
        <p>Recent court rulings have reshaped how artists and producers handle music rights in the digital age. The landscape of music copyright has been dramatically altered following a series of high-profile cases.</p>
        
        <h2>The Changing Landscape</h2>
        <p>For decades, the music industry operated under a set of assumptions about how copyright works. Artists would create music, labels would distribute it, and royalties would flow based on established formulas. But the digital revolution has upended this model.</p>
        
        <p>Streaming platforms have introduced new complexities into how music is monetized and how rights are managed. Recent court decisions have highlighted the need for clearer guidelines and more transparent systems.</p>
        
        <h2>Impact on Artists</h2>
        <p>Independent artists are particularly affected by these changes. Without the legal resources of major labels, they often struggle to navigate the increasingly complex world of music rights.</p>
        
        <p>"It's becoming harder to know what rights you actually have," says independent musician Maya Rodriguez. "The rules seem to change every few months, and it's exhausting trying to keep up."</p>
        
        <h2>Looking Forward</h2>
        <p>Industry experts suggest that blockchain technology might offer solutions to some of these challenges by creating immutable records of ownership and usage rights.</p>
        
        <p>Until then, artists and producers are advised to work closely with legal experts who specialize in digital music rights to ensure they're protected in this rapidly evolving landscape.</p>
      `,
      category: "Entertainment",
      author: "Times Now",
      authorImage: "/placeholder.svg?height=50&width=50",
      publishedAt: "2025-04-28T10:30:00Z",
      readTime: "7 min read",
      image: "/placeholder.svg?height=600&width=1200",
      likes: 128,
      comments: 43,
      tags: ["Music", "Copyright", "Digital Rights", "Entertainment Law"],
      affiliateCategory: "entertainment",
    },
    "2": {
      id: "2",
      title: "Cricket Star's Performance Raises Questions About Selection Criteria",
      content: `
        <p>Recent test failures have sparked debate about selection criteria in professional cricket, with fans and analysts questioning the current approach to team building.</p>
        
        <h2>The Controversy</h2>
        <p>Following a series of disappointing performances, cricket boards across several countries are facing increased scrutiny over their selection processes. Critics argue that the current system favors reputation over recent form.</p>
        
        <p>The debate intensified after star player Ravindra Jadeja's unexpected failure in a crucial gauge test, which many believe should have implications for team selection in upcoming matches.</p>
        
        <h2>Statistical Analysis</h2>
        <p>A deep dive into the numbers reveals some interesting patterns. Players who performed poorly in gauge tests have, on average, underperformed in subsequent matches by a margin of 23%.</p>
        
        <p>This correlation has led many analysts to call for a more data-driven approach to team selection, with greater weight given to objective performance metrics rather than subjective assessments.</p>
        
        <h2>The Way Forward</h2>
        <p>Several cricket boards have indicated they're reviewing their selection procedures in light of recent controversies. Some are considering implementing more transparent systems that clearly communicate the criteria used for team selection.</p>
        
        <p>"The goal is to create a meritocracy where current form and fitness are the primary considerations," said one board member who requested anonymity. "We need to ensure fans have confidence in the selection process."</p>
      `,
      category: "Sports",
      author: "Sports Analyst",
      authorImage: "/placeholder.svg?height=50&width=50",
      publishedAt: "2025-04-28T09:15:00Z",
      readTime: "5 min read",
      image: "/placeholder.svg?height=600&width=1200",
      likes: 89,
      comments: 112,
      tags: ["Cricket", "Sports", "Team Selection", "Performance Analysis"],
      affiliateCategory: "general",
    },
    // Add more posts as needed
  }

  // Default post for any ID not in our mock data
  const defaultPost = {
    id,
    title: `Article ${id}: Comprehensive Analysis and Insights`,
    content: `
      <p>This in-depth article explores the latest developments and provides expert analysis on this important topic.</p>
      
      <h2>Key Developments</h2>
      <p>Recent events have significantly changed how we understand this field. Experts from around the world have weighed in with their perspectives and insights.</p>
      
      <p>The implications of these changes are far-reaching and will likely impact related industries and sectors in the coming months.</p>
      
      <h2>Expert Opinions</h2>
      <p>Leading authorities in the field have shared their analysis of the situation. Dr. Jane Smith, a renowned researcher, notes that "these findings represent a paradigm shift in how we approach the fundamental questions in this area."</p>
      
      <p>Industry veterans have also expressed optimism about the potential applications of these new insights, particularly in addressing long-standing challenges.</p>
      
      <h2>Looking Ahead</h2>
      <p>As we move forward, it will be crucial to monitor how these developments evolve and what new opportunities they might create.</p>
      
      <p>Stakeholders are advised to stay informed and consider how these changes might affect their strategic planning and decision-making processes.</p>
    `,
    category: id % 2 === 0 ? "Technology" : "Business",
    author: "VlogVerse Editor",
    authorImage: "/placeholder.svg?height=50&width=50",
    publishedAt: new Date().toISOString(),
    readTime: "6 min read",
    image: `/placeholder.svg?height=600&width=1200&text=Article+${id}`,
    likes: 50 + Number.parseInt(id) * 7,
    comments: 20 + Number.parseInt(id) * 3,
    tags: ["Analysis", "Insights", "Trends", "Industry"],
    affiliateCategory: "general",
  }

  const post = posts[id] || defaultPost
  return post
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id)

  if (!post) {
    notFound()
  }

  // Format date
  const publishDate = new Date(post.publishedAt)
  const formattedDate = publishDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container max-w-screen-xl mx-auto py-8">
      {/* Top Ad Banner */}
      <AdPlacement className="mb-8" type="banner" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8 space-y-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{post.category}</Badge>
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="bg-secondary/30">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight">{post.title}</h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill priority className="object-cover" />
          </div>

          {/* In-article Ad */}
          <AdPlacement type="in-article" />

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          {/* Affiliate Products Section */}
          <div className="border rounded-lg p-6 bg-muted/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Recommended Products</h3>
              </div>
              <Badge variant="outline">Affiliate</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Products we think you'll love based on this article. We may earn a commission on purchases made through
              these links.
            </p>
            <AffiliateProducts category={post.affiliateCategory} />
          </div>

          {/* Bottom In-article Ad */}
          <AdPlacement type="in-article" />

          {/* Engagement Section */}
          <div className="flex items-center justify-between border-t border-b py-4">
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>{post.comments}</span>
              </Button>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Author Section */}
          <div className="bg-muted/30 rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{post.author}</h3>
                <p className="text-sm text-muted-foreground">Staff Writer</p>
                <p className="text-sm mt-1">
                  Writer and analyst covering the latest trends in {post.category.toLowerCase()} and digital media.
                </p>
              </div>
            </div>
          </div>

          {/* Comments Section Placeholder */}
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Comments ({post.comments})</h3>
            <p className="text-muted-foreground">Join the conversation! Sign in to comment.</p>
            <div className="mt-4">
              <Button>Sign In to Comment</Button>
            </div>
          </div>
        </main>

        <aside className="lg:col-span-4 space-y-8">
          {/* Sidebar Ad */}
          <AdPlacement type="sidebar" className="sticky top-24" />

          {/* Related Posts */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
              <Suspense fallback={<RelatedPostsSkeleton />}>
                <RelatedPosts category={post.category} currentPostId={post.id} />
              </Suspense>
            </CardContent>
          </Card>

          {/* Recommended Posts */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Recommended For You</h3>
              <Suspense fallback={<RelatedPostsSkeleton />}>
                <RecommendedPosts currentPostId={post.id} />
              </Suspense>
            </CardContent>
          </Card>

          {/* Featured Affiliate Product */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Editor's Choice</h3>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">
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

          {/* Popular Tags */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Technology",
                  "Business",
                  "Health",
                  "Sports",
                  "Entertainment",
                  "Politics",
                  "Science",
                  "Travel",
                  "Food",
                  "Fashion",
                ].map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-secondary/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">Get the latest updates directly to your inbox</p>
              <form className="space-y-2">
                <input type="email" placeholder="Your email" className="w-full px-3 py-2 border rounded-md text-sm" />
                <Button className="w-full">Subscribe</Button>
              </form>
            </CardContent>
          </Card>

          {/* Second Sidebar Ad */}
          <AdPlacement type="sidebar" />
        </aside>
      </div>
    </div>
  )
}

function RelatedPostsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="h-16 w-24 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
