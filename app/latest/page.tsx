"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useRouter } from "next/navigation";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  published: boolean;
  updatedAt: string;
  images: { id: number; url: string }[];
}

const LatestNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/news", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch news");

      const data = await res.json();

      // ✅ Filter only published news and sort by updatedAt
      const sortedNews = data.data
        .filter((item: NewsItem) => item.published) // ✅ Only published news
        .sort(
          (a: NewsItem, b: NewsItem) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

      setNews(sortedNews);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">
        Latest News
      </h1>
      {loading ? (
        <LoadingSpinner />
      ) : news.length === 0 ? (
        <p className="text-center text-gray-600">
          No published news available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => {
            // ✅ Use only the `images` array to get the first image
            const imageUrl =
              item.images.length > 0 ? item.images[0].url : "/placeholder.jpg"; // Fallback image

            return (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
                <Image
                  src={imageUrl}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="rounded-md"
                  unoptimized // To allow external images from short URLs
                />
                <h2
                  onClick={() => router.push(`/news/${item.id}`)}
                  className="text-xl font-semibold mt-3 cursor-pointer hover:underline"
                >
                  {item.title}
                </h2>
                <p className="text-gray-700 mt-2">
                  {item.content.slice(0, 150) + "..."}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LatestNews;
