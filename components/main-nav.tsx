"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "../lib/utils";
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

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/category/tech"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Tech
      </Link>
      <Link
        href="/category/entertainment"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Entertainment
      </Link>
      <Link
        href="/category/sports"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Sports
      </Link>
      <Link
        href="/category/business"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Business
      </Link>
      <Link
        href="/category/health"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Health
      </Link>
    </nav>
  );
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
