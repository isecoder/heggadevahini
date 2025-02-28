"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
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

const Sports = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]); // Type the newsList as NewsItem[]
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchSportsNews = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();
        if (data.success && data.data.length > 0) {
          // Filter news containing the "Sports" tag
          const sportsNews = data.data
            .filter((news: NewsItem) => news.tags.includes("Sports")) // Change 'Politics' to 'Sports'
            .sort(
              (a: NewsItem, b: NewsItem) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 3); // Get the latest 3 sports news articles

          if (sportsNews.length === 0)
            throw new Error("No 'Sports' news available.");

          setNewsList(sportsNews);
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

    fetchSportsNews();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? newsList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === newsList.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <p>Loading sports news...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (newsList.length === 0) return <p>No sports news available.</p>;

  const news = newsList[currentIndex];

  return (
    <section className="bg-[#FFF3E9] p-4 rounded-lg">
      <div className="relative group">
        {/* Image and Controls */}
        <div className="relative h-[400px] mb-4">
          {news.images.length > 0 ? (
            <Image
              src={news.images[0].url}
              alt={news.translations[0]?.title || "News Image"}
              fill
              className="rounded-lg object-cover"
            />
          ) : (
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Placeholder Image"
              fill
              className="rounded-lg object-cover"
            />
          )}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <button
            onClick={() => router.push(`/news/${news.id}`)}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
          >
            <Play className="h-8 w-8 ml-1" />
          </button>

          <div className="absolute top-4 right-4 bg-white/80 px-2 py-1 rounded text-sm">
            {Math.ceil(news.translations[0]?.content.length / 500)} mins read
          </div>
        </div>

        {/* Content */}
        <h2
          onClick={() => router.push(`/news/${news.id}`)}
          className="text-2xl font-bold mb-2 cursor-pointer hover:underline"
        >
          {news.translations[0]?.title || "No Title"}
        </h2>
        <p className="text-gray-600">
          {news.translations[0]?.content.slice(0, 150)}...
        </p>

        {/* Tags (Filtered to Only Show "Sports") */}
        <div className="mt-3 flex gap-2">
          {news.tags
            .filter((tag: string) => tag === "Sports") // Change 'Politics' to 'Sports'
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

export default Sports;
