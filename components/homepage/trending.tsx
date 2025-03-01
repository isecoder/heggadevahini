"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const API_BASE_URL = "/api/v1/news"; 

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

const Trending = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_BASE_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch news");

        const data = await res.json();
        if (!data.success || !Array.isArray(data.data))
          throw new Error("Invalid response");

        // ✅ Filter trending news & sort by updatedAt (latest first)
        const trendingNews = data.data
          .filter((item: NewsItem) => item.tags.includes("Trending"))
          .sort((a: NewsItem, b: NewsItem) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .slice(0, 4); // ✅ Get only the latest 4 news items

        setNews(trendingNews);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingNews();
  }, []);

  return (
    <section className="p-4 sm:p-6 bg-gray-100 w-full sm:max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold flex justify-between items-center">
        Latest News
        <Link href="/trending_view_all" className="text-[#F48634] text-sm">
          View all →
        </Link>
      </h2>

      {loading && <LoadingSpinner />}
      {!loading && news.length === 0 && (
        <p className="text-center text-gray-600">No trending news available.</p>
      )}

      <div className="mt-4 space-y-4">
        {news.map((item) => {
          const imageUrl =
            item.images.length > 0 ? item.images[0].url : "/placeholder.jpg";
          const englishTranslation = item.translations.find(
            (t) => t.languageCode === "en"
          );

          return (
            <Link key={item.id} href={`/news/${item.id}`} className="block">
              <article className="flex items-center gap-3 sm:gap-4 p-3 bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                {/* Image Section - Responsive */}
                <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 relative overflow-hidden rounded-md">
                  <Image
                    src={imageUrl}
                    alt={englishTranslation?.title || "News Image"}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text Section */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800 line-clamp-1">
                    {englishTranslation?.title || "Untitled News"}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm overflow-hidden line-clamp-2">
                    {englishTranslation?.content || "No description available."}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Trending;
