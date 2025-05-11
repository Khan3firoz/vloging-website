import connectDB from '../lib/mongodb.js';
import Post from '../models/Post.js';

const dummyPosts = [
    {
        title: "The Future of Artificial Intelligence in 2024",
        excerpt: "Exploring the latest developments in AI and their impact on various industries.",
        content: `
            <article>
                <h2>The Evolution of AI Technology</h2>
                <p>Artificial Intelligence continues to revolutionize how we live and work. From machine learning algorithms to neural networks, the technology is advancing at an unprecedented pace.</p>

                <h3>Key Developments in 2024</h3>
                <ul>
                    <li>Advanced Natural Language Processing</li>
                    <li>Computer Vision Breakthroughs</li>
                    <li>AI in Healthcare Applications</li>
                    <li>Autonomous Systems Development</li>
                </ul>

                <h3>Impact on Industries</h3>
                <p>The integration of AI across various sectors has led to:</p>
                <ul>
                    <li>Increased automation in manufacturing</li>
                    <li>Enhanced customer service through chatbots</li>
                    <li>Improved medical diagnosis accuracy</li>
                    <li>Revolutionary changes in transportation</li>
                </ul>

                <blockquote>
                    "AI is not just a technology trend; it's a fundamental shift in how we approach problem-solving and innovation."
                </blockquote>
            </article>
        `,
        category: "Technology",
        author: "Tech Insights",
        image: "/placeholder.svg?height=400&width=600",
        featured: true,
        likes: 156,
        comments: 23,
    },
    {
        title: "Sustainable Living: A Complete Guide",
        excerpt: "Practical tips and strategies for reducing your environmental footprint.",
        content: `
            <article>
                <h2>Understanding Sustainable Living</h2>
                <p>Sustainable living is more than just a trend; it's a necessary shift in how we approach our daily lives. This comprehensive guide will help you make meaningful changes.</p>

                <h3>Daily Practices for Sustainability</h3>
                <ul>
                    <li>Reduce, Reuse, Recycle</li>
                    <li>Energy Conservation</li>
                    <li>Water Conservation</li>
                    <li>Sustainable Transportation</li>
                </ul>

                <h3>Home Improvements</h3>
                <p>Transform your living space into an eco-friendly haven:</p>
                <ul>
                    <li>Install solar panels</li>
                    <li>Use energy-efficient appliances</li>
                    <li>Implement water-saving fixtures</li>
                    <li>Choose sustainable materials</li>
                </ul>

                <blockquote>
                    "Small changes in daily habits can lead to significant environmental impact over time."
                </blockquote>
            </article>
        `,
        category: "Lifestyle",
        author: "Green Living",
        image: "/placeholder.svg?height=400&width=600",
        featured: true,
        likes: 89,
        comments: 15,
    },
    {
        title: "The Rise of Remote Work Culture",
        excerpt: "How remote work is reshaping the modern workplace and employee expectations.",
        content: `
            <article>
                <h2>The Remote Work Revolution</h2>
                <p>The pandemic has permanently altered how we think about work and office culture. Let's explore the key aspects of this transformation.</p>

                <h3>Benefits of Remote Work</h3>
                <ul>
                    <li>Increased productivity</li>
                    <li>Better work-life balance</li>
                    <li>Reduced commuting time</li>
                    <li>Access to global talent</li>
                </ul>

                <h3>Challenges and Solutions</h3>
                <p>Common challenges in remote work and how to overcome them:</p>
                <ul>
                    <li>Communication barriers</li>
                    <li>Team collaboration</li>
                    <li>Work-life boundaries</li>
                    <li>Technical infrastructure</li>
                </ul>

                <blockquote>
                    "Remote work isn't just about working from home; it's about reimagining the future of work."
                </blockquote>
            </article>
        `,
        category: "Business",
        author: "Workplace Trends",
        image: "/placeholder.svg?height=400&width=600",
        featured: false,
        likes: 234,
        comments: 45,
    },
    {
        title: "Healthy Eating Habits for 2024",
        excerpt: "Nutritionist-approved tips for maintaining a balanced diet in the new year.",
        content: `
            <article>
                <h2>Building Healthy Eating Habits</h2>
                <p>Maintaining a healthy diet is crucial for overall well-being. Here's your comprehensive guide to better nutrition.</p>

                <h3>Essential Nutrients</h3>
                <ul>
                    <li>Proteins</li>
                    <li>Complex Carbohydrates</li>
                    <li>Healthy Fats</li>
                    <li>Vitamins and Minerals</li>
                </ul>

                <h3>Meal Planning Tips</h3>
                <p>Effective strategies for maintaining a balanced diet:</p>
                <ul>
                    <li>Plan meals in advance</li>
                    <li>Include variety in your diet</li>
                    <li>Practice portion control</li>
                    <li>Stay hydrated</li>
                </ul>

                <blockquote>
                    "Good nutrition is the foundation of a healthy lifestyle."
                </blockquote>
            </article>
        `,
        category: "Health",
        author: "Health & Wellness",
        image: "/placeholder.svg?height=400&width=600",
        featured: false,
        likes: 167,
        comments: 28,
    },
    {
        title: "Blockchain Technology: Beyond Cryptocurrency",
        excerpt: "Exploring the diverse applications of blockchain in various industries.",
        content: `
            <article>
                <h2>Understanding Blockchain Technology</h2>
                <p>While blockchain is often associated with cryptocurrency, its potential applications extend far beyond digital currencies.</p>

                <h3>Key Applications</h3>
                <ul>
                    <li>Supply Chain Management</li>
                    <li>Healthcare Records</li>
                    <li>Smart Contracts</li>
                    <li>Digital Identity</li>
                </ul>

                <h3>Industry Impact</h3>
                <p>How blockchain is transforming various sectors:</p>
                <ul>
                    <li>Financial Services</li>
                    <li>Healthcare</li>
                    <li>Real Estate</li>
                    <li>Government Services</li>
                </ul>

                <blockquote>
                    "Blockchain technology is revolutionizing how we think about trust and transparency in digital transactions."
                </blockquote>
            </article>
        `,
        category: "Technology",
        author: "Tech Insights",
        image: "/placeholder.svg?height=400&width=600",
        featured: true,
        likes: 145,
        comments: 32,
    },
    {
        title: "Digital Marketing Trends for 2024",
        excerpt: "Stay ahead of the curve with these emerging digital marketing strategies.",
        content: "The digital marketing landscape is constantly evolving...",
        category: "Marketing",
        author: "Marketing Pro",
        image: "/placeholder.svg?height=400&width=600",
        featured: false,
        likes: 98,
        comments: 17,
    },
    {
        title: "The Art of Mindful Meditation",
        excerpt: "A beginner's guide to incorporating meditation into your daily routine.",
        content: "Meditation has been practiced for thousands of years...",
        category: "Wellness",
        author: "Mind & Body",
        image: "/placeholder.svg?height=400&width=600",
        featured: false,
        likes: 178,
        comments: 29,
    },
    {
        title: "Future of Electric Vehicles",
        excerpt: "How electric vehicles are transforming the automotive industry.",
        content: "The automotive industry is undergoing a significant transformation...",
        category: "Automotive",
        author: "Auto Expert",
        image: "/placeholder.svg?height=400&width=600",
        featured: true,
        likes: 212,
        comments: 38,
    }
];

async function seed() {
    try {
        await connectDB();

        // Clear existing posts
        await Post.deleteMany({});

        // Insert new posts
        await Post.insertMany(dummyPosts);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();