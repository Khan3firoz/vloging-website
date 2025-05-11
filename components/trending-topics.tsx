import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export function TrendingTopics() {
  const topics = [
    { name: "Artificial Intelligence", followers: "1.2M" },
    { name: "Stocks", followers: "845K" },
    { name: "Health & Fitness", followers: "632K" },
    { name: "Indian Premier League", followers: "2.1M" },
    { name: "Education & Learning", followers: "412K" },
  ]

  return (
    <div className="space-y-4">
      {topics.map((topic, index) => (
        <div key={index}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/placeholder.svg?text=${topic.name[0]}`} />
                <AvatarFallback>{topic.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{topic.name}</p>
                <p className="text-xs text-muted-foreground">{topic.followers} followers</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {index < topics.length - 1 && <Separator className="my-3" />}
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full mt-2">
        View All Topics
      </Button>
    </div>
  )
}
