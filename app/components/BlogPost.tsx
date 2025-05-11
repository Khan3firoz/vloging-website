import Image from "next/image";

interface BlogPostProps {
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export default function BlogPost({
  title,
  content,
  author,
  date,
  category,
  image,
}: BlogPostProps) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <div className="relative h-64 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {category}
          </span>
          <span className="text-gray-500 text-sm ml-4">{date}</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <div
          className="prose prose-sm max-w-none mb-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 font-semibold">{author}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
