"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const items = [
  {
    title: "Discover",
    href: "/discover",
  },
  {
    title: "Following",
    href: "/following",
  },
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Sports",
    href: "/sports",
  },
  {
    title: "Entertainment",
    href: "/entertainment",
  },
  {
    title: "Technology",
    href: "/technology",
  },
  {
    title: "Business",
    href: "/business",
  },
  {
    title: "Health",
    href: "/health",
  },
  {
    title: "Travel",
    href: "/travel",
  },
]

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <NavigationMenu className={cn("hidden md:flex", className)}>
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.title}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.title}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuTrigger>More</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {[
                { title: "Lifestyle", href: "/lifestyle", description: "Fashion, food, and more" },
                { title: "Science", href: "/science", description: "Latest discoveries and research" },
                { title: "Education", href: "/education", description: "Learning resources and tips" },
                { title: "Finance", href: "/finance", description: "Markets, investing, and personal finance" },
              ].map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
