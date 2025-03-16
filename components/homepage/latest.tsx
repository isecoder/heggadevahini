"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const API_BASE_URL = "/api/v1/news";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  images: { id: number; url: string }[];
}

const Latest = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();
        if (data.success && data.data.length > 0) {
          // ✅ Filter only published news and sort by createdAt (latest first)
          const latestNews = data.data
            .filter((news: NewsItem) => news.published===true)
            .sort(
              (a: NewsItem, b: NewsItem) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            

          setNewsList(latestNews);
        } else {
          throw new Error("No news available.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? newsList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === newsList.length - 1 ? 0 : prev + 1));
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading latest news...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (newsList.length === 0)
    return (
      <p className="text-center text-gray-500">No latest news available.</p>
    );

  const news = newsList[currentIndex];

  return (
    <section className="bg-[#FFF3E9] p-4 sm:p-6 rounded-lg">
      <div className="relative group">
        {/* Image and Controls */}
        <div className="relative w-full h-[220px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden">
          <Image
            src={
              news.images.length > 0 ? news.images[0].url : "/placeholder.svg"
            }
            alt={news.title || "News Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            unoptimized
          />

          {/* Prev/Next Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Read Time Label */}
          <div className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded text-xs sm:text-sm">
            {Math.ceil(news.content.length / 500)} mins read
          </div>
        </div>

        {/* Content */}
        <h2
          onClick={() => router.push(`/news/${news.id}`)}
          className="text-lg sm:text-2xl font-bold mt-3 cursor-pointer hover:underline"
        >
          {news.title || "No Title"}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          {news.content.slice(0, 150)}...
        </p>
      </div>
    </section>
  );
};

export default Latest;
