import { NextResponse } from 'next/server';

// Mock categories database - In a real app, this would be in a database
const categories = [
    { id: '1', name: 'Technology', slug: 'technology', description: 'Tech news and updates' },
    { id: '2', name: 'Entertainment', slug: 'entertainment', description: 'Entertainment news and reviews' },
    { id: '3', name: 'Sports', slug: 'sports', description: 'Sports news and analysis' },
    { id: '4', name: 'Business', slug: 'business', description: 'Business and finance news' },
    { id: '5', name: 'Health', slug: 'health', description: 'Health and wellness news' }
];

// GET all categories
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');

        let filteredCategories = [...categories];

        if (search) {
            const searchLower = search.toLowerCase();
            filteredCategories = filteredCategories.filter(category =>
                category.name.toLowerCase().includes(searchLower) ||
                category.description.toLowerCase().includes(searchLower)
            );
        }

        return NextResponse.json(filteredCategories);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// POST new category
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description } = body;

        if (!name) {
            return NextResponse.json(
                { error: 'Category name is required' },
                { status: 400 }
            );
        }

        // Check if category already exists
        if (categories.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {
            return NextResponse.json(
                { error: 'Category already exists' },
                { status: 400 }
            );
        }

        const newCategory = {
            id: Date.now().toString(),
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            description: description || ''
        };

        // In a real application, you would save this to a database
        categories.push(newCategory);

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// PUT update category
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name, description } = body;

        if (!id || !name) {
            return NextResponse.json(
                { error: 'Category ID and name are required' },
                { status: 400 }
            );
        }

        const categoryIndex = categories.findIndex(cat => cat.id === id);

        if (categoryIndex === -1) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }

        // Check if new name conflicts with existing category
        if (categories.some(cat =>
            cat.id !== id && cat.name.toLowerCase() === name.toLowerCase()
        )) {
            return NextResponse.json(
                { error: 'Category name already exists' },
                { status: 400 }
            );
        }

        const updatedCategory = {
            ...categories[categoryIndex],
            name,
            slug: name.toLowerCase().replace(/\s+/g, '-'),
            description: description || categories[categoryIndex].description
        };

        // In a real application, you would update this in a database
        categories[categoryIndex] = updatedCategory;

        return NextResponse.json(updatedCategory);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// DELETE category
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Category ID is required' },
                { status: 400 }
            );
        }

        const categoryIndex = categories.findIndex(cat => cat.id === id);

        if (categoryIndex === -1) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }

        // In a real application, you would delete this from a database
        categories.splice(categoryIndex, 1);

        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}