import Link from "next/link"
import Image from "next/image"

interface RecommendedPostsProps {
  currentPostId: string
}

export async function RecommendedPosts({ currentPostId }: RecommendedPostsProps) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock data - in a real app, you would fetch recommended posts from your API
  // These would typically be based on user behavior, preferences, or trending content
  const recommendedPosts = [
    {
      id: "7",
      title: "AI Revolution: How Machine Learning is Transforming Industries",
      excerpt: "An exploration of AI's impact across various sectors and what it means for the future.",
      image: "/placeholder.svg?height=100&width=150",
      category: "Technology",
      publishedAt: "2025-04-26T11:30:00Z",
    },
    {
      id: "8",
      title: "Financial Planning: Strategies for Long-term Wealth Building",
      excerpt: "Expert advice on creating a sustainable financial future in uncertain economic times.",
      image: "/placeholder.svg?height=100&width=150",
      category: "Business",
      publishedAt: "2025-04-25T09:45:00Z",
    },
    {
      id: "9",
      title: "Travel Destinations: Hidden Gems of Southeast Asia",
      excerpt: "Discover lesser-known but breathtaking locations for your next adventure.",
      image: "/placeholder.svg?height=100&width=150",
      category: "Travel",
      publishedAt: "2025-04-24T14:15:00Z",
    },
  ].filter((post) => post.id !== currentPostId)

  return (
    <div className="space-y-4">
      {recommendedPosts.map((post) => {
        // Format date
        const publishDate = new Date(post.publishedAt)
        const formattedDate = publishDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })

        return (
          <Link key={post.id} href={`/post/${post.id}`} className="flex gap-3 group">
            <div className="relative h-16 w-24 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">{formattedDate}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
