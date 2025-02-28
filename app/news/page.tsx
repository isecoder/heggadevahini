"use client";

import Link from "next/link";
import Image from "next/image";

const newsArticles = [
  { id: "1", title: "Breaking News!", image: "/news1.jpg", excerpt: "AI is taking over the world!" },
  { id: "2", title: "Economy Update", image: "/news2.jpg", excerpt: "Stock markets are booming!" },
];

const NewsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Latest News</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded-lg shadow-md">
            <Image src={article.image} alt={article.title} width={400} height={250} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{article.title}</h2>
            <p className="text-gray-600">{article.excerpt}</p>
            <Link href={`/news/${article.id}`} className="text-blue-500 hover:underline mt-2 block">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
