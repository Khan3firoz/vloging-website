import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign, verify } from 'jsonwebtoken';

// Mock users database - In a real app, this would be in a database
const users = [
    {
        id: '1',
        email: 'admin@vlogverse.com',
        password: 'hashed_password_here', // In real app, this would be properly hashed
        name: 'Admin User',
        role: 'admin'
    }
];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// GET user profile
export async function GET(request: Request) {
    try {
        const token = cookies().get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const decoded = verify(token, JWT_SECRET) as { id: string };
        const user = users.find(u => u.id === decoded.id);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Remove sensitive data
        const { password, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        );
    }
}

// POST register new user
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, name } = body;

        // Validate required fields
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        if (users.some(user => user.email === email)) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        const newUser = {
            id: Date.now().toString(),
            email,
            password, // In real app, this would be hashed
            name,
            role: 'user'
        };

        // In a real application, you would save this to a database
        users.push(newUser);

        // Generate JWT token
        const token = sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1d' });

        // Set cookie
        cookies().set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400 // 1 day
        });

        // Remove sensitive data
        const { password: _, ...userWithoutPassword } = newUser;
        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

// PUT update user profile
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
        const userIndex = users.findIndex(u => u.id === decoded.id);

        if (userIndex === -1) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const body = await request.json();
        const { name, email } = body;

        // Update user
        const updatedUser = {
            ...users[userIndex],
            name: name || users[userIndex].name,
            email: email || users[userIndex].email
        };

        // In a real application, you would update this in a database
        users[userIndex] = updatedUser;

        // Remove sensitive data
        const { password, ...userWithoutPassword } = updatedUser;
        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}

// DELETE user account
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
        const userIndex = users.findIndex(u => u.id === decoded.id);

        if (userIndex === -1) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // In a real application, you would delete this from a database
        users.splice(userIndex, 1);

        // Clear the token cookie
        cookies().delete('token');

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}