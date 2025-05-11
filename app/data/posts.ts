export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image: string;
    likes: number;
    comments: number;
    tags: string[];
    excerpt: string;
}

export const posts: Post[] = [
    {
        id: 1,
        title: "The Future of Technology: AI and Machine Learning",
        content: `<div class="prose">
      <h2>Revolutionary Changes in Tech</h2>
      <p>Artificial Intelligence and Machine Learning are transforming how we live and work. From virtual assistants to autonomous vehicles, AI is becoming an integral part of our daily lives.</p>
      <h3>Key Developments</h3>
      <ul>
        <li>Natural Language Processing advancements</li>
        <li>Computer Vision breakthroughs</li>
        <li>Reinforcement Learning applications</li>
      </ul>
      <blockquote>
        "AI will be the most significant technological advancement of our generation."
      </blockquote>
    </div>`,
        author: "John Doe",
        date: "2024-03-20",
        category: "Technology",
        image: "https://picsum.photos/800/400",
        likes: 245,
        comments: 56,
        tags: ["AI", "Machine Learning", "Technology"],
        excerpt: "Exploring the latest developments in artificial intelligence and machine learning technologies."
    },
    {
        id: 2,
        title: "Sports Highlights: Championship Finals",
        content: `<div class="prose">
      <h2>Championship Finals Recap</h2>
      <p>An intense match that kept fans on the edge of their seats. The final score reflects the incredible skill and determination of both teams.</p>
      <div class="stats">
        <h3>Match Statistics</h3>
        <ul>
          <li>Goals Scored: 4-3</li>
          <li>Possession: 55% - 45%</li>
          <li>Shots on Target: 12-8</li>
        </ul>
      </div>
    </div>`,
        author: "Jane Smith",
        date: "2024-03-19",
        category: "Sports",
        image: "https://picsum.photos/800/401",
        likes: 189,
        comments: 42,
        tags: ["Sports", "Championship", "Football"],
        excerpt: "A thrilling championship final that showcased exceptional athleticism and sportsmanship."
    },
    {
        id: 3,
        title: "Breaking News: Global Economic Summit",
        content: `<div class="prose">
      <h2>Global Economic Summit Results</h2>
      <p>World leaders gathered to address pressing economic challenges and establish new trade agreements.</p>
      <div class="highlights">
        <h3>Key Agreements</h3>
        <ul>
          <li>New Trade Partnerships</li>
          <li>Climate Change Initiatives</li>
          <li>Economic Recovery Plans</li>
        </ul>
      </div>
    </div>`,
        author: "Mike Johnson",
        date: "2024-03-18",
        category: "News",
        image: "https://picsum.photos/800/402",
        likes: 156,
        comments: 38,
        tags: ["Economy", "Politics", "Global News"],
        excerpt: "Major developments from the Global Economic Summit that will shape international relations."
    },
    {
        id: 4,
        title: "Entertainment: Movie Industry Trends",
        content: `<div class="prose">
      <h2>Hollywood's Digital Transformation</h2>
      <p>The movie industry is undergoing significant changes with the rise of streaming platforms and digital distribution.</p>
      <h3>Industry Changes</h3>
      <ul>
        <li>Streaming Platform Dominance</li>
        <li>Virtual Production Technology</li>
        <li>New Distribution Models</li>
      </ul>
    </div>`,
        author: "Sarah Wilson",
        date: "2024-03-17",
        category: "Entertainment",
        image: "https://picsum.photos/800/403",
        likes: 178,
        comments: 45,
        tags: ["Movies", "Entertainment", "Streaming"],
        excerpt: "How digital technology is reshaping the entertainment industry."
    },
    {
        id: 5,
        title: "Health & Wellness: Mental Health Awareness",
        content: `<div class="prose">
      <h2>Understanding Mental Health</h2>
      <p>Mental health awareness is more important than ever in our fast-paced world.</p>
      <div class="tips">
        <h3>Wellness Tips</h3>
        <ul>
          <li>Daily Meditation Practice</li>
          <li>Regular Exercise Routine</li>
          <li>Healthy Sleep Habits</li>
        </ul>
      </div>
    </div>`,
        author: "Dr. Emily Brown",
        date: "2024-03-16",
        category: "Health",
        image: "https://picsum.photos/800/404",
        likes: 234,
        comments: 67,
        tags: ["Health", "Wellness", "Mental Health"],
        excerpt: "Essential tips for maintaining mental health in today's challenging environment."
    },
    {
        id: 6,
        title: "Business: Startup Success Stories",
        content: `<div class="prose">
      <h2>Innovative Startups Making Waves</h2>
      <p>Meet the entrepreneurs who are disrupting traditional industries with innovative solutions.</p>
      <h3>Success Factors</h3>
      <ul>
        <li>Market Research</li>
        <li>Innovation Strategy</li>
        <li>Team Building</li>
      </ul>
    </div>`,
        author: "David Chen",
        date: "2024-03-15",
        category: "Business",
        image: "https://picsum.photos/800/405",
        likes: 167,
        comments: 39,
        tags: ["Business", "Startups", "Entrepreneurship"],
        excerpt: "Inspiring stories of successful startups and their journey to success."
    }
];