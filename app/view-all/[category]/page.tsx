import Link from "next/link"
import { notFound } from "next/navigation"
import { AdPlacement } from "@/components/ad-placement"
import { FeaturedArticle } from "@/components/featured-article"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AffiliateProducts } from "@/components/affiliate-products"
import { getMongoDBCategories } from "@/app/api/categories/route";

interface ViewAllPageProps {
  params: {
    category: string;
  };
}

export default async function ViewAllPage({ params }: ViewAllPageProps) {
  const { category } = params;

  // Validate category and get display name
  // const categoryMap: Record<string, string> = {
  //   featured: "Featured",
  //   trending: "Trending",
  //   latest: "Latest",
  //   tech: "Technology",
  //   entertainment: "Entertainment",
  // }
  const categoryMap = await getMongoDBCategories();
  const categories = await categoryMap.json();
  const displayName = categories.find(
    (cat: { slug: string; name: string }) => cat.slug === category
  )?.name;

  if (!displayName) {
    notFound();
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{displayName} Articles</h1>

      {/* Top Ad Banner */}
      <AdPlacement className="mb-8" type="banner" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8 space-y-8">
          {/* Featured Article */}
          {category === "featured" && (
            <Link href="/post/1">
              <FeaturedArticle
                image="/placeholder.svg?height=500&width=900"
                category="Editor's Pick"
                title="The Most Important Story of the Week: A Deep Dive"
                excerpt="Our editorial team's selection of the most significant and impactful story that deserves your attention."
                author="Editorial Team"
                time="5h ago"
                likes={87}
                comments={42}
                featured
              />
            </Link>
          )}

          {/* Affiliate Products for certain categories */}
          {(category === "tech" || category === "entertainment") && (
            <div className="border rounded-lg p-6 bg-muted/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Top {displayName} Products
                </h3>
                <Badge variant="outline">Sponsored</Badge>
              </div>
              <AffiliateProducts
                category={category === "tech" ? "tech" : "entertainment"}
              />
            </div>
          )}

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Link key={i} href={`/post/${i + 10}`}>
                <FeaturedArticle
                  image={`/placeholder.svg?height=300&width=500&text=${displayName}+${
                    i + 1
                  }`}
                  category={getCategoryForIndex(category, i)}
                  title={getTitleForIndex(category, i)}
                  excerpt={`Comprehensive coverage and analysis of this ${displayName.toLowerCase()} topic with expert insights.`}
                  author={getAuthorForIndex(category, i)}
                  time={`${(i % 12) + 1}h ago`}
                  likes={25 + i * 3}
                  comments={10 + i}
                />
              </Link>
            ))}
          </div>

          {/* In-feed Ad */}
          <AdPlacement type="in-article" />

          {/* Load More Button */}
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">
              Load More
            </Button>
          </div>
        </main>

        <aside className="lg:col-span-4 space-y-8">
          {/* Sidebar Ad */}
          <AdPlacement type="sidebar" className="sticky top-24" />

          {/* Category Filter */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Filter By</h3>
              <div className="space-y-2">
                {getSubcategoriesForCategory(category).map((subcat) => (
                  <div key={subcat} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`filter-${subcat}`}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor={`filter-${subcat}`}
                      className="ml-2 text-sm"
                    >
                      {subcat}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular in Category */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">
                Popular in {displayName}
              </h3>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-b pb-3 last:border-0 last:pb-0"
                  >
                    <Link href={`/post/${i + 20}`} className="group">
                      <Badge variant="outline" className="mb-1">
                        {getCategoryForIndex(category, i)}
                      </Badge>
                      <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                        {getTitleForIndex(category, i, true)}
                      </h4>
                      <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                        <span>{getAuthorForIndex(category, i)}</span>
                        <span>{`${(i % 5) + 2}d ago`}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Second Sidebar Ad */}
          <AdPlacement type="sidebar" />
        </aside>
      </div>
    </div>
  );
}

// Helper functions to generate content based on category
function getCategoryForIndex(mainCategory: string, index: number): string {
  const categories = {
    featured: ["Business", "Technology", "Health", "Entertainment", "Sports", "Politics", "Science", "Travel"],
    trending: ["Viral", "Social Media", "Current Events", "Pop Culture", "Debates", "Hot Topics", "Breaking"],
    latest: ["Breaking", "Just In", "Updates", "Recent", "News", "Developments", "Announcements"],
    tech: ["AI", "Software", "Hardware", "Startups", "Gadgets", "Cybersecurity", "Web Dev", "Mobile"],
    entertainment: ["Movies", "Music", "TV Shows", "Celebrities", "Gaming", "Streaming", "Books", "Arts"],
  }

  const categoryList = categories[mainCategory as keyof typeof categories] || categories.featured
  return categoryList[index % categoryList.length]
}

function getTitleForIndex(mainCategory: string, index: number, isShort = false): string {
  const baseTitle =
    {
      featured: "Featured Story",
      trending: "Trending Topic",
      latest: "Breaking News",
      tech: "Tech Innovation",
      entertainment: "Entertainment Update",
    }[mainCategory] || "Article"

  if (isShort) {
    return `${baseTitle} ${index + 1}: What You Need to Know`
  }

  return `${baseTitle} ${index + 1}: Comprehensive Analysis and Why It Matters in 2025`
}

function getAuthorForIndex(mainCategory: string, index: number): string {
  const authors = {
    featured: ["Editorial Team", "Senior Editor", "Guest Contributor", "Staff Writer", "Expert Analyst"],
    trending: ["Trend Analyst", "Social Media Editor", "Culture Reporter", "VlogVerse Staff", "Guest Writer"],
    latest: ["News Reporter", "Breaking News Team", "Field Correspondent", "News Desk", "Special Correspondent"],
    tech: ["Tech Editor", "Software Expert", "Hardware Reviewer", "Tech Analyst", "Industry Insider"],
    entertainment: ["Entertainment Editor", "Film Critic", "Music Reviewer", "TV Analyst", "Culture Writer"],
  }

  const authorList = authors[mainCategory as keyof typeof authors] || authors.featured
  return authorList[index % authorList.length]
}

function getSubcategoriesForCategory(category: string): string[] {
  const subcategories = {
    featured: ["Editor's Picks", "Most Read", "Award Winning", "Long Reads", "Exclusives"],
    trending: ["Today", "This Week", "Rising", "Most Shared", "Viral"],
    latest: ["Breaking News", "Just Published", "Updates", "Developing Stories", "Recent"],
    tech: ["AI & ML", "Software", "Hardware", "Startups", "Gadgets", "Cybersecurity"],
    entertainment: ["Movies", "Music", "TV Shows", "Celebrities", "Gaming", "Books"],
  }

  return subcategories[category as keyof typeof subcategories] || []
}
