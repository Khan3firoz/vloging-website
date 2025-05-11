import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

// Mock comments database - In a real app, this would be in a database
const comments = [];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// GET comments for a post
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get('postId');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!postId) {
            return NextResponse.json(
                { error: 'Post ID is required' },
                { status: 400 }
            );
        }

        let postComments = comments.filter(comment => comment.postId === postId);

        // Sort by newest first
        postComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedComments = postComments.slice(startIndex, endIndex);

        return NextResponse.json({
            comments: paginatedComments,
            total: postComments.length,
            page,
            totalPages: Math.ceil(postComments.length / limit)
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// POST new comment
export async function POST(request: Request) {
    try {
        const token = cookies().get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const decoded = verify(token, JWT_SECRET) as { id: string };
        const body = await request.json();
        const { postId, content } = body;

        if (!postId || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newComment = {
            id: Date.now().toString(),
            postId,
            content,
            userId: decoded.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            likes: 0
        };

        // In a real application, you would save this to a database
        comments.push(newComment);

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// PUT update comment
export async function PUT(request: Request) {
    try {
        const token = cookies().get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const decoded = verify(token, JWT_SECRET) as { id: string };
        const body = await request.json();
        const { id, content } = body;

        if (!id || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const commentIndex = comments.findIndex(
            comment => comment.id === id && comment.userId === decoded.id
        );

        if (commentIndex === -1) {
            return NextResponse.json(
                { error: 'Comment not found or unauthorized' },
                { status: 404 }
            );
        }

        const updatedComment = {
            ...comments[commentIndex],
            content,
            updatedAt: new Date().toISOString()
        };

        // In a real application, you would update this in a database
        comments[commentIndex] = updatedComment;

        return NextResponse.json(updatedComment);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// DELETE comment
export async function DELETE(request: Request) {
    try {
        const token = cookies().get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const decoded = verify(token, JWT_SECRET) as { id: string };
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Comment ID is required' },
                { status: 400 }
            );
        }

        const commentIndex = comments.findIndex(
            comment => comment.id === id && comment.userId === decoded.id
        );

        if (commentIndex === -1) {
            return NextResponse.json(
                { error: 'Comment not found or unauthorized' },
                { status: 404 }
            );
        }

        // In a real application, you would delete this from a database
        comments.splice(commentIndex, 1);

        return NextResponse.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}