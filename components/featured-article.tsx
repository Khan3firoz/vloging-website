import Link from "next/link"
import Image from "next/image"
import { ThumbsUp, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FeaturedArticleProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  time: string;
  likes: number;
  comments: number;
  featured?: boolean;
  href?: string;
}

export function FeaturedArticle({
  image,
  category,
  title,
  excerpt,
  author,
  time,
  likes,
  comments,
  featured = false,
  href = "#",
}: FeaturedArticleProps) {
  return (
    <Link href={href} className="block h-full">
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg flex flex-col h-full border border-gray-100",
          featured ? "bg-black/5" : ""
        )}
      >
        <div
          className="relative aspect-video overflow-hidden rounded-t-xl"
          style={{ minHeight: 180 }}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">{category}</Badge>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3
            className={cn(
              "font-semibold line-clamp-2 transition-colors group-hover:text-primary",
              featured ? "text-xl" : "text-base"
            )}
          >
            {title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
          <div className="mt-3 flex items-center justify-between text-sm mt-auto">
            <div className="flex items-center gap-2">
              <span className="font-medium">{author}</span>
              <span className="text-muted-foreground">• {time}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
