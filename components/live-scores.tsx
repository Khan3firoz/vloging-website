"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function LiveScores() {
  const [scores] = useState([
    {
      match: "Cricket",
      team1: { name: "SDA", score: "127/1", overs: "13.1" },
      team2: { name: "MAS", score: "", overs: "" },
      status: "LIVE",
      info: "SDA elected to bat",
    },
    {
      match: "Cricket",
      team1: { name: "SDA", score: "178/8", overs: "20.0" },
      team2: { name: "SIN", score: "82/9", overs: "20.0" },
      status: "Completed",
      info: "SDA won by 96 runs",
    },
    {
      match: "Football",
      team1: { name: "SIN", score: "0", overs: "" },
      team2: { name: "THA", score: "0", overs: "" },
      status: "Upcoming",
      info: "26 Apr, 11:30 am",
    },
  ])

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {scores.map((score, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{score.team1.name}</span>
                <span className="text-sm">{score.team1.score}</span>
                {score.team1.overs && <span className="text-xs text-muted-foreground">({score.team1.overs})</span>}
              </div>
              <Badge variant={score.status === "LIVE" ? "destructive" : "outline"}>
                {score.status === "LIVE" ? "LIVE" : score.team1.score ? score.team1.name : "VS"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{score.team2.name}</span>
                <span className="text-sm">{score.team2.score}</span>
                {score.team2.overs && <span className="text-xs text-muted-foreground">({score.team2.overs})</span>}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{score.info}</p>
            {index < scores.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
