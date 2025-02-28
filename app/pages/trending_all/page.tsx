"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image from next/image

// Define a type for the news data
interface News {
  id: number;
  title: string;
  content: string;
  updatedAt: string;
  image: string; // Assuming image is a string URL
}

const TrendingViewAll = () => {
  // Define state with the proper type
  const [allNews, setAllNews] = useState<News[]>([]);

  useEffect(() => {
    fetch("/api/all_news") // New API to fetch all trending news
      .then((res) => res.json())
      .then((data) => setAllNews(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Trending News</h1>
      <div className="space-y-6">
        {allNews.map((news) => (
          <Link key={news.id} href={`/news/${news.id}`} className="block">
            <article className="border-b pb-4 group cursor-pointer">
              <div className="flex gap-4 items-start">
                <div className="relative h-32 w-32 flex-shrink-0">
                  {/* Use Image component for optimization */}
                  <Image
                    src={news.image}
                    alt={news.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-[#F48634]">
                    {news.title}
                  </h3>
                  <p className="text-gray-600">
                    {news.content.substring(0, 100)}...
                  </p>
                  <p className="text-sm text-gray-500">
                    Updated at: {new Date(news.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingViewAll;
