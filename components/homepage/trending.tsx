"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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

        const trendingNews = data.data
        .filter((item: NewsItem) => item.published === true)
          .sort(
            (a: NewsItem, b: NewsItem) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          .slice(0, 4);

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
        <Link href="/latest" className="text-[#F48634] text-sm">
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

          return (
            <Link key={item.id} href={`/news/${item.id}`} className="block">
              <article className="flex items-center gap-3 sm:gap-4 p-3 bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                {/* Image Section */}
                <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 relative overflow-hidden rounded-md">
                  <Image
                    src={imageUrl}
                    alt={item.title || "News Image"}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text Section */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800 line-clamp-1">
                    {item.title || "Untitled News"}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm overflow-hidden line-clamp-2">
                    {item.content || "No description available."}
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
