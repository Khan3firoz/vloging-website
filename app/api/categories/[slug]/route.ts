import { NextResponse } from 'next/server';

// Mock categories database - In a real app, this would be in a database
const categories = [
    { id: '1', name: 'Technology', slug: 'technology', description: 'Tech news and updates' },
    { id: '2', name: 'Entertainment', slug: 'entertainment', description: 'Entertainment news and reviews' },
    { id: '3', name: 'Sports', slug: 'sports', description: 'Sports news and analysis' },
    { id: '4', name: 'Business', slug: 'business', description: 'Business and finance news' },
    { id: '5', name: 'Health', slug: 'health', description: 'Health and wellness news' }
];

// Mock posts database - In a real app, this would be in a database
const posts = [
    {
        id: '1',
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        content: 'Learn how to build modern web applications with Next.js...',
        excerpt: 'A comprehensive guide to getting started with Next.js',
        category: 'technology',
        tags: ['nextjs', 'react', 'javascript'],
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z',
        author: 'John Doe',
        image: '/images/nextjs.jpg'
    },
    // Add more mock posts here
];

// GET category details and its posts
export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const sort = searchParams.get('sort') || 'newest';

        // Find category
        const category = categories.find(cat => cat.slug === slug);
        if (!category) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }

        // Get posts for this category
        let categoryPosts = posts.filter(post => post.category === category.slug);

        // Sort posts
        switch (sort) {
            case 'newest':
                categoryPosts.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
            case 'popular':
                // In a real app, you would sort by views/likes
                categoryPosts.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
            case 'trending':
                // In a real app, you would sort by engagement metrics
                categoryPosts.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
        }

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedPosts = categoryPosts.slice(startIndex, endIndex);

        return NextResponse.json({
            category,
            posts: paginatedPosts,
            pagination: {
                total: categoryPosts.length,
                page,
                limit,
                totalPages: Math.ceil(categoryPosts.length / limit)
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}