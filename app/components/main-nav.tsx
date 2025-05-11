import Link from "next/link";
import { cn } from "@/lib/utils";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  return (
    <nav className={cn("flex items-center space-x-6", className)} {...props}>
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/tech"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Tech
      </Link>
      <Link
        href="/entertainment"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Entertainment
      </Link>
      <Link
        href="/sports"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Sports
      </Link>
      <Link
        href="/business"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Business
      </Link>
      <Link
        href="/health"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Health
      </Link>
    </nav>
  );
}
