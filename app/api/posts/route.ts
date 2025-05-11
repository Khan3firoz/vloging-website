import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

// Cache duration in seconds
const CACHE_DURATION = 60; // 1 minute
let cache: { [key: string]: { data: any; timestamp: number } } = {};

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
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        // Create cache key based on query parameters
        const cacheKey = JSON.stringify({
            category,
            tag,
            search,
            page,
            limit,
            sort,
            featured,
            startDate,
            endDate
        });

        // Check cache
        const now = Date.now();
        if (cache[cacheKey] && (now - cache[cacheKey].timestamp) < CACHE_DURATION * 1000) {
            return NextResponse.json(cache[cacheKey].data);
        }

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

        // Date range filter
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                query.createdAt.$lte = new Date(endDate);
            }
        }

        let sortQuery: any = { createdAt: -1 };
        if (sort === 'popular') {
            sortQuery = { likes: -1 };
        } else if (sort === 'trending') {
            sortQuery = { $expr: { $add: ['$likes', '$comments'] } };
        }

        // Pagination
        const startIndex = (page - 1) * limit;

        const [posts, total] = await Promise.all([
            Post.find(query)
                .sort(sortQuery)
                .skip(startIndex)
                .limit(limit)
                .lean(),
            Post.countDocuments(query)
        ]);

        // Add console logging
        console.log('MongoDB Query:', query);
        console.log('MongoDB Posts:', posts);
        console.log('Total Posts:', total);

        const response = {
            posts,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };

        // Update cache
        cache[cacheKey] = {
            data: response,
            timestamp: now
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching posts:', error);

        // Handle specific MongoDB errors
        if (error instanceof Error) {
            if (error.name === 'MongoError') {
                return NextResponse.json(
                    { error: 'Database error occurred' },
                    { status: 500 }
                );
            }
            if (error.name === 'ValidationError') {
                return NextResponse.json(
                    { error: 'Invalid query parameters' },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

// POST new post
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.content || !body.category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newPost = new Post({
            ...body,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newPost.save();

        // Clear cache
        cache = {};

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        );
    }
}

// PUT update post
export async function PUT(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Post ID is required' },
                { status: 400 }
            );
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { ...body, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        // Clear cache
        cache = {};

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json(
            { error: 'Failed to update post' },
            { status: 500 }
        );
    }
}

// DELETE post
export async function DELETE(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Post ID is required' },
                { status: 400 }
            );
        }

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        // Clear cache
        cache = {};

        return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            { error: 'Failed to delete post' },
            { status: 500 }
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