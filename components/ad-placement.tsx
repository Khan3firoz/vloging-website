import { cn } from "@/lib/utils"

interface AdPlacementProps {
  type: "banner" | "sidebar" | "in-article"
  className?: string
}

export function AdPlacement({ type, className }: AdPlacementProps) {
  const adSizes = {
    banner: "h-[90px] md:h-[250px]", // Leaderboard/Billboard
    sidebar: "h-[600px]", // Skyscraper
    "in-article": "h-[250px]", // Medium Rectangle
  }

  return (
    <div
      className={cn(
        "w-full bg-muted/20 border border-dashed border-muted flex items-center justify-center rounded-md overflow-hidden",
        adSizes[type],
        className,
      )}
    >
      <div className="text-center text-muted-foreground">
        <p className="text-sm font-medium">Advertisement</p>
        <p className="text-xs">{type === "banner" ? "728×90 / 970×250" : type === "sidebar" ? "300×600" : "300×250"}</p>
      </div>
    </div>
  )
}
