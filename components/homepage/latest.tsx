"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight  } from "lucide-react";
import Image from "next/image";

const API_BASE_URL = "/api/v1/news"; // ✅ Correct API URL

// Define NewsItem interface
interface NewsItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  images: { id: number; url: string }[];
  translations: {
    id: number;
    languageCode: string;
    title: string;
    content: string;
  }[];
}

const Latest = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]); // Type the newsList as NewsItem[]
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
          const latestNews = data.data
          .filter((news: NewsItem) => news.id === 18)// Type 'news' as NewsItem
            .sort(
              (a: NewsItem, b: NewsItem) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 3);

          if (latestNews.length === 0)
            throw new Error("No 'Latest' news available.");

          setNewsList(latestNews);
        } else {
          throw new Error("No news available.");
        }
      } catch (err: unknown) {
        // Cast 'err' to Error type
        if (err instanceof Error) {
          setError(err.message);
        }
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
              news.images.length > 0 ? news.images[0].url : "/news18.jpeg"
            }
            alt={news.translations[0]?.title || "News Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
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

          {/* Play Button */}
          {/* <button
            onClick={() => router.push(`/news/${news.id}`)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
          >
            <Play className="h-6 w-6 sm:h-8 sm:w-8 ml-1" />
          </button> */}

          {/* Read Time Label */}
          <div className="absolute top-3 right-3 bg-white/80 px-2 py-1 rounded text-xs sm:text-sm">
            {Math.ceil(news.translations[0]?.content.length / 500)} mins read
          </div>
        </div>

        {/* Content */}
        <h2
          onClick={() => router.push(`/news/${news.id}`)}
          className="text-lg sm:text-2xl font-bold mt-3 cursor-pointer hover:underline"
        >
          {news.translations[0]?.title || "No Title"}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          {news.translations[0]?.content.slice(0, 150)}...
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {news.tags
            .filter((tag: string) => tag === "Latest") // Define type for 'tag' as string
            .map(
              (
                tag: string,
                index: number // Define type for 'index' as number
              ) => (
                <span
                  key={index}
                  className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
                >
                  {tag}
                </span>
              )
            )}
        </div>
      </div>
    </section>
  );
};

export default Latest;
