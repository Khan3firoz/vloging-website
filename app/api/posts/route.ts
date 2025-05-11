import { NextResponse } from 'next/server';
import { posts } from '@/app/data/posts';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

// GET all posts with filtering
export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const tag = searchParams.get('tag');
        const search = searchParams.get('search');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const sort = searchParams.get('sort') || 'newest'; // newest, popular, trending
        const featured = searchParams.get('featured') === 'true';

        let query: any = {};

        if (category) {
            query.category = category;
        }

        if (featured) {
            query.featured = true;
        }

        // Filter by tag
        if (tag) {
            query.tags = { $in: [tag] };
        }

        // Search in title and content
        if (search) {
            const searchLower = search.toLowerCase();
            query.$or = [
                { title: { $regex: searchLower, $options: 'i' } },
                { content: { $regex: searchLower, $options: 'i' } },
                { excerpt: { $regex: searchLower, $options: 'i' } }
            ];
        }

        // Sort posts
        switch (sort) {
            case 'popular':
                query.likes = { $exists: true, $ne: 0 };
                query.comments = { $exists: true, $ne: 0 };
                query.sort = { $expr: { $add: ['$likes', '$comments.length'] } };
                break;
            case 'trending':
                query.sort = { $expr: { $add: ['$likes', '$comments.length'] } };
                break;
            case 'newest':
            default:
                query.sort = { createdAt: -1 };
                break;
        }

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const posts = await Post.find(query)
            .sort(query.sort)
            .skip(startIndex)
            .limit(limit)
            .lean();

        return NextResponse.json({
            posts: posts,
            total: await Post.countDocuments(query),
            page,
            totalPages: Math.ceil(await Post.countDocuments(query) / limit)
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
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

export async function getMongoDBPosts() {
    try {
        await connectDB();

        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .limit(20)
            .lean();

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}