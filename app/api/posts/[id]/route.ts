import { NextResponse } from 'next/server';
import { posts } from '@/app/data/posts';

// GET post details and related posts
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const post = posts.find(p => p.id === params.id);

        if (!post) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        // Get related posts based on category and tags
        const relatedPosts = posts
            .filter(p =>
                p.id !== post.id && (
                    p.category === post.category ||
                    p.tags.some(tag => post.tags.includes(tag))
                )
            )
            .sort((a, b) => {
                // Sort by number of matching tags first
                const aMatchingTags = a.tags.filter(tag => post.tags.includes(tag)).length;
                const bMatchingTags = b.tags.filter(tag => post.tags.includes(tag)).length;

                if (aMatchingTags !== bMatchingTags) {
                    return bMatchingTags - aMatchingTags;
                }

                // Then sort by date
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })
            .slice(0, 3); // Get top 3 related posts

        return NextResponse.json({
            post,
            relatedPosts
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}