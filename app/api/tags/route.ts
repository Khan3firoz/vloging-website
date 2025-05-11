import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

// Mock tags database - In a real app, this would be in a database
const tags = [
    { id: '1', name: 'Technology', slug: 'technology' },
    { id: '2', name: 'AI', slug: 'ai' },
    { id: '3', name: 'Web Development', slug: 'web-development' },
    { id: '4', name: 'Mobile', slug: 'mobile' },
    { id: '5', name: 'Cloud', slug: 'cloud' }
];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// GET all tags
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');

        let filteredTags = [...tags];

        if (search) {
            const searchLower = search.toLowerCase();
            filteredTags = filteredTags.filter(tag =>
                tag.name.toLowerCase().includes(searchLower)
            );
        }

        return NextResponse.json(filteredTags);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// POST new tag (admin only)
export async function POST(request: Request) {
    try {
        const token = cookies().get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const decoded = verify(token, JWT_SECRET) as { id: string, role: string };

        // Check if user is admin
        if (decoded.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized - Admin access required' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json(
                { error: 'Tag name is required' },
                { status: 400 }
            );
        }

        // Check if tag already exists
        if (tags.some(tag => tag.name.toLowerCase() === name.toLowerCase())) {
            return NextResponse.json(
                { error: 'Tag already exists' },
                { status: 400 }
            );
        }

        const newTag = {
            id: Date.now().toString(),
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-')
        };

        // In a real application, you would save this to a database
        tags.push(newTag);

        return NextResponse.json(newTag, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// PUT update tag (admin only)
export async function PUT(request: Request) {
    try {
        const token = cookies().get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const decoded = verify(token, JWT_SECRET) as { id: string, role: string };

        // Check if user is admin
        if (decoded.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized - Admin access required' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { id, name } = body;

        if (!id || !name) {
            return NextResponse.json(
                { error: 'Tag ID and name are required' },
                { status: 400 }
            );
        }

        const tagIndex = tags.findIndex(tag => tag.id === id);

        if (tagIndex === -1) {
            return NextResponse.json(
                { error: 'Tag not found' },
                { status: 404 }
            );
        }

        // Check if new name conflicts with existing tag
        if (tags.some(tag =>
            tag.id !== id && tag.name.toLowerCase() === name.toLowerCase()
        )) {
            return NextResponse.json(
                { error: 'Tag name already exists' },
                { status: 400 }
            );
        }

        const updatedTag = {
            ...tags[tagIndex],
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-')
        };

        // In a real application, you would update this in a database
        tags[tagIndex] = updatedTag;

        return NextResponse.json(updatedTag);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// DELETE tag (admin only)
export async function DELETE(request: Request) {
    try {
        const token = cookies().get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const decoded = verify(token, JWT_SECRET) as { id: string, role: string };

        // Check if user is admin
        if (decoded.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized - Admin access required' },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Tag ID is required' },
                { status: 400 }
            );
        }

        const tagIndex = tags.findIndex(tag => tag.id === id);

        if (tagIndex === -1) {
            return NextResponse.json(
                { error: 'Tag not found' },
                { status: 404 }
            );
        }

        // In a real application, you would delete this from a database
        tags.splice(tagIndex, 1);

        return NextResponse.json({ message: 'Tag deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}