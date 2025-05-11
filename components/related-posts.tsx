import Link from "next/link"
import Image from "next/image"

interface RelatedPostsProps {
  category: string
  currentPostId: string
}

export async function RelatedPosts({ category, currentPostId }: RelatedPostsProps) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock data - in a real app, you would fetch related posts from your API
  const relatedPosts = [
    {
      id: "3",
      title: "New Streaming Platform Challenges Industry Giants",
      excerpt: "A new player enters the competitive streaming market with innovative features.",
      image: "/placeholder.svg?height=100&width=150",
      category: "Entertainment",
      publishedAt: "2025-04-27T14:30:00Z",
    },
    {
      id: "4",
      title: "Film Festival Announces Surprising Winner",
      excerpt: "Critics and audiences divided over controversial jury decision at international film festival.",
      image: "/placeholder.svg?height=100&width=150",
      category: "Entertainment",
      publishedAt: "2025-04-26T09:15:00Z",
    },
    {
      id: "5",
      title: "Behind the Scenes: Making of the Year's Biggest Blockbuster",
      excerpt: "Exclusive look at the production challenges of this season's box office hit.",
      image: "/placeholder.svg?height=100&width=150",
      category: "Entertainment",
      publishedAt: "2025-04-25T16:45:00Z",
    },
  ].filter((post) => post.id !== currentPostId)

  return (
    <div className="space-y-4">
      {relatedPosts.map((post) => {
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
