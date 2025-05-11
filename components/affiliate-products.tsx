import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface AffiliateProductsProps {
  category?: string
}

export function AffiliateProducts({ category = "general" }: AffiliateProductsProps) {
  // Different product sets based on category
  const products = {
    general: [
      {
        id: "g1",
        name: "Premium Wireless Earbuds",
        image: "/placeholder.svg?height=200&width=200&text=Earbuds",
        price: "$129.99",
        originalPrice: "$159.99",
        rating: 4.8,
        reviews: 1245,
        link: "#",
      },
      {
        id: "g2",
        name: "Fitness Tracker Watch",
        image: "/placeholder.svg?height=200&width=200&text=Fitness+Watch",
        price: "$89.99",
        originalPrice: "$119.99",
        rating: 4.6,
        reviews: 876,
        link: "#",
      },
      {
        id: "g3",
        name: "Portable Power Bank",
        image: "/placeholder.svg?height=200&width=200&text=Power+Bank",
        price: "$49.99",
        originalPrice: "$69.99",
        rating: 4.7,
        reviews: 532,
        link: "#",
      },
      {
        id: "g4",
        name: "Smart Home Speaker",
        image: "/placeholder.svg?height=200&width=200&text=Smart+Speaker",
        price: "$79.99",
        originalPrice: "$99.99",
        rating: 4.5,
        reviews: 1023,
        link: "#",
      },
    ],
    tech: [
      {
        id: "t1",
        name: "Ultra-Thin Laptop",
        image: "/placeholder.svg?height=200&width=200&text=Laptop",
        price: "$899.99",
        originalPrice: "$1099.99",
        rating: 4.9,
        reviews: 782,
        link: "#",
      },
      {
        id: "t2",
        name: "4K Webcam",
        image: "/placeholder.svg?height=200&width=200&text=Webcam",
        price: "$129.99",
        originalPrice: "$149.99",
        rating: 4.7,
        reviews: 456,
        link: "#",
      },
      {
        id: "t3",
        name: "Mechanical Keyboard",
        image: "/placeholder.svg?height=200&width=200&text=Keyboard",
        price: "$149.99",
        originalPrice: "$179.99",
        rating: 4.8,
        reviews: 1123,
        link: "#",
      },
      {
        id: "t4",
        name: "Wireless Charging Pad",
        image: "/placeholder.svg?height=200&width=200&text=Charging+Pad",
        price: "$39.99",
        originalPrice: "$59.99",
        rating: 4.6,
        reviews: 892,
        link: "#",
      },
    ],
    entertainment: [
      {
        id: "e1",
        name: "Noise-Cancelling Headphones",
        image: "/placeholder.svg?height=200&width=200&text=Headphones",
        price: "$249.99",
        originalPrice: "$299.99",
        rating: 4.9,
        reviews: 2145,
        link: "#",
      },
      {
        id: "e2",
        name: "Portable Bluetooth Speaker",
        image: "/placeholder.svg?height=200&width=200&text=Speaker",
        price: "$79.99",
        originalPrice: "$99.99",
        rating: 4.7,
        reviews: 1532,
        link: "#",
      },
      {
        id: "e3",
        name: "Streaming Media Player",
        image: "/placeholder.svg?height=200&width=200&text=Media+Player",
        price: "$49.99",
        originalPrice: "$69.99",
        rating: 4.8,
        reviews: 987,
        link: "#",
      },
      {
        id: "e4",
        name: "E-Reader with Backlight",
        image: "/placeholder.svg?height=200&width=200&text=E-Reader",
        price: "$119.99",
        originalPrice: "$149.99",
        rating: 4.6,
        reviews: 765,
        link: "#",
      },
    ],
  }

  const selectedProducts = products[category as keyof typeof products] || products.general

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {selectedProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden border-muted hover:border-primary/50 transition-colors">
          <Link href={product.link} className="block">
            <CardContent className="p-3">
              <div className="relative aspect-square rounded-md overflow-hidden mb-3">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Sale
                  </Badge>
                </div>
              </div>
              <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-sm">{product.price}</span>
                <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
              <Button size="sm" className="w-full mt-3">
                View Deal
              </Button>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}
