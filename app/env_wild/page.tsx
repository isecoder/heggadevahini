"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface NewsItem {
  id: number;
  updatedAt: string;
  images: { id: number; url: string }[];
  tags: string[];
  translations: { id: number; languageCode: string; title: string; content: string }[];
}

const TrendingNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/news", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch news");

      const data = await res.json();
      
      // Filter only "Trending" news and sort by updated time (latest first)
      const trendingNews = data.data
        .filter((item: NewsItem) => item.tags.includes("Environment and Wildlife"))
        .sort((a: NewsItem, b: NewsItem) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

      setNews(trendingNews);
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
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">ಪರಿಸರ ಮತ್ತು ವನ್ಯಜೀವಿ </h1>
      {loading ? (
        <LoadingSpinner />
      ) : news.length === 0 ? (
        <p className="text-center text-gray-600">ಯಾವುದೇ ಪರಿಸರ ಮತ್ತು ವನ್ಯಜೀವಿ  ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => {
            const imageUrl = item.images.length > 0 ? item.images[0].url : "/placeholder.jpg";
            const kannadaTranslation = item.translations.find((t) => t.languageCode === "kn");

            return (
              <div 
                key={item.id} 
                className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                onClick={() => router.push(`/news/${item.id}`)}
              >
                <Image src={imageUrl} alt={kannadaTranslation?.title || "ಸುದ್ದಿ ಚಿತ್ರ"} width={400} height={250} className="rounded-md" />
                <h2 className="text-xl font-semibold mt-3">{kannadaTranslation?.title || "ಅನಾಮಧೇಯ ಸುದ್ದಿ"}</h2>
                <p className="text-gray-700 mt-2 line-clamp-3">{kannadaTranslation?.content || "ವಿವರಣೆ ಲಭ್ಯವಿಲ್ಲ."}</p>
                <p className="text-sm text-gray-500 mt-2">{new Date(item.updatedAt).toLocaleDateString()}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrendingNews;
