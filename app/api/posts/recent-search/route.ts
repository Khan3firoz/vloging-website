import { NextResponse } from 'next/server';
import { posts } from '@/app/data/posts';

// Mock recent searches database - In a real app, this would be in a database
let recentSearches: { query: string; timestamp: number }[] = [];

// GET recent search posts
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '5');

        // Get unique recent search queries
        const uniqueQueries = Array.from(new Set(recentSearches.map(s => s.query)))
            .slice(0, limit);

        // Get posts for each search query
        const searchResults = uniqueQueries.map(query => {
            const searchLower = query.toLowerCase();
            const matchingPosts = posts.filter(post =>
                post.title.toLowerCase().includes(searchLower) ||
                post.content.toLowerCase().includes(searchLower) ||
                post.excerpt.toLowerCase().includes(searchLower)
            ).slice(0, 3); // Get top 3 posts for each query

            return {
                query,
                posts: matchingPosts
            };
        });

        return NextResponse.json(searchResults);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// POST to add a new search query
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { query } = body;

        if (!query) {
            return NextResponse.json(
                { error: 'Search query is required' },
                { status: 400 }
            );
        }

        // Add new search query
        recentSearches.unshift({
            query,
            timestamp: Date.now()
        });

        // Keep only the last 20 searches
        recentSearches = recentSearches.slice(0, 20);

        return NextResponse.json({ message: 'Search query added successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}