import { NextResponse } from 'next/server';
import { posts } from '@/app/data/posts';

// Mock recent views database - In a real app, this would be in a database
let recentViews: { postId: string; timestamp: number }[] = [];

// GET recent view posts
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '5');

        // Get unique recent view post IDs
        const uniquePostIds = Array.from(new Set(recentViews.map(v => v.postId)))
            .slice(0, limit);

        // Get posts for each view
        const viewResults = uniquePostIds.map(postId => {
            const post = posts.find(p => p.id === postId);
            if (!post) return null;

            return {
                post,
                lastViewed: recentViews.find(v => v.postId === postId)?.timestamp
            };
        }).filter(Boolean); // Remove null values

        return NextResponse.json(viewResults);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// POST to add a new view
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { postId } = body;

        if (!postId) {
            return NextResponse.json(
                { error: 'Post ID is required' },
                { status: 400 }
            );
        }

        // Verify post exists
        const post = posts.find(p => p.id === postId);
        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        // Add new view
        recentViews.unshift({
            postId,
            timestamp: Date.now()
        });

        // Keep only the last 50 views
        recentViews = recentViews.slice(0, 50);

        return NextResponse.json({ message: 'View added successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}