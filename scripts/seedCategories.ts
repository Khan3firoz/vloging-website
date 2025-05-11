import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

const categories = [
    {
        name: 'Technology',
        slug: 'technology',
        description: 'Latest news and updates from the world of technology',
        icon: '💻',
        color: '#3B82F6'
    },
    {
        name: 'Entertainment',
        slug: 'entertainment',
        description: 'Movies, music, TV shows, and celebrity news',
        icon: '🎬',
        color: '#EC4899'
    },
    {
        name: 'Sports',
        slug: 'sports',
        description: 'Sports news, match updates, and athlete profiles',
        icon: '⚽',
        color: '#10B981'
    },
    {
        name: 'Business',
        slug: 'business',
        description: 'Business news, market updates, and financial insights',
        icon: '💼',
        color: '#F59E0B'
    },
    {
        name: 'Health',
        slug: 'health',
        description: 'Health news, medical research, and wellness tips',
        icon: '🏥',
        color: '#EF4444'
    },
    {
        name: 'Science',
        slug: 'science',
        description: 'Scientific discoveries, research, and innovations',
        icon: '🔬',
        color: '#8B5CF6'
    },
    {
        name: 'Travel',
        slug: 'travel',
        description: 'Travel guides, destination reviews, and travel tips',
        icon: '✈️',
        color: '#14B8A6'
    },
    {
        name: 'Food',
        slug: 'food',
        description: 'Food news, recipes, and culinary trends',
        icon: '🍽️',
        color: '#F97316'
    },
    {
        name: 'Politics',
        slug: 'politics',
        description: 'Political news, policy updates, and government affairs',
        icon: '🏛️',
        color: '#6B7280'
    },
    {
        name: 'Education',
        slug: 'education',
        description: 'Education news, learning resources, and academic insights',
        icon: '📚',
        color: '#6366F1'
    }
];

async function seedCategories() {
    try {
        await connectDB();

        // Clear existing categories
        await Category.deleteMany({});

        // Insert new categories
        const result = await Category.insertMany(categories);

        console.log('Categories seeded successfully:', result);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
}

seedCategories();