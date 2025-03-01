"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface NewsItem {
  id: number;
  updatedAt: string;
  images: { id: number; url: string }[];
  title: string;
  content: string;
}

const LatestNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/news", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch news");

      const data = await res.json();
      const sortedNews = data.data.sort(
        (a: NewsItem, b: NewsItem) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
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
      <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">Latest News</h1>
      {loading ? (
        <LoadingSpinner />
      ) : news.length === 0 ? (
        <p className="text-center text-gray-600">No news available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => {
            const imageUrl = item.images.length > 0 ? item.images[0].url : "/placeholder.jpg";
            return (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
                <Image src={imageUrl} alt={item.title || "News Image"} width={400} height={250} className="rounded-md" />
                <h2 className="text-xl font-semibold mt-3">{item.title || "Untitled News"}</h2>
                <p className="text-gray-700 mt-2">{item.content || "No description available."}</p>
                <p className="text-sm text-gray-500 mt-2">{new Date(item.updatedAt).toLocaleDateString()}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LatestNews;
