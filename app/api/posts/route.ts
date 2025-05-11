import { NextResponse } from 'next/server';
import { posts } from '@/app/data/posts';

// GET all posts with filtering
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const tag = searchParams.get('tag');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const sort = searchParams.get('sort') || 'newest'; // newest, popular, trending

        let filteredPosts = [...posts];

        // Filter by category
        if (category) {
            filteredPosts = filteredPosts.filter(post =>
                post.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Filter by tag
        if (tag) {
            filteredPosts = filteredPosts.filter(post =>
                post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
            );
        }

        // Search in title and content
        if (search) {
            const searchLower = search.toLowerCase();
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchLower) ||
                post.content.toLowerCase().includes(searchLower) ||
                post.excerpt.toLowerCase().includes(searchLower)
            );
        }

        // Sort posts
        switch (sort) {
            case 'popular':
                filteredPosts.sort((a, b) => b.likes - a.likes);
                break;
            case 'trending':
                filteredPosts.sort((a, b) => (b.likes + b.comments.length) - (a.likes + a.comments.length));
                break;
            case 'newest':
            default:
                filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
        }

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

        return NextResponse.json({
            posts: paginatedPosts,
            total: filteredPosts.length,
            page,
            totalPages: Math.ceil(filteredPosts.length / limit)
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// POST new post
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.content || !body.category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newPost = {
            id: Date.now().toString(),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            likes: 0,
            comments: []
        };

        // In a real application, you would save this to a database
        posts.push(newPost);

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

// PUT update post
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Post ID is required' },
                { status: 400 }
            );
        }

        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex === -1) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        const updatedPost = {
            ...posts[postIndex],
            ...body,
            updatedAt: new Date().toISOString()
        };

        // In a real application, you would update this in a database
        posts[postIndex] = updatedPost;

        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

// DELETE post
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Post ID is required' },
                { status: 400 }
            );
        }

        const postIndex = posts.findIndex(post => post.id === id);
        if (postIndex === -1) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        // In a real application, you would delete this from a database
        posts.splice(postIndex, 1);

        return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}