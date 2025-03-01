"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

const fetchPoliticsNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(API_BASE_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch news");

    const data = await response.json();
    if (!data.success || !Array.isArray(data.data))
      throw new Error("Invalid response");

    return data.data.filter((item: NewsItem) => item.tags.includes("Politics"));
  } catch (error) {
    console.error("Error fetching politics news:", error);
    return [];
  }
};

const Politics = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      const articles = await fetchPoliticsNews();
      setNewsList(articles);
      setLoading(false);
    };

    loadNews();
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 bg-gray-100 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="p-1 bg-blue-100 rounded">📰</span> ರಾಜಕೀಯ ( Politics )
        </h2>
        <Link href="/politics" className="text-[#F48634] text-sm">
          ಎಲ್ಲಾ ನೋಡಿ →
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-4">ಲೋಡಿಂಗ್...</p>
      ) : newsList.length === 0 ? (
        <p className="text-center text-gray-600">ರಾಜಕೀಯ ಸುದ್ದಿಗಳು ಲಭ್ಯವಿಲ್ಲ.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {newsList.map((news) => {
            const imageUrl =
              news.images.length > 0 ? news.images[0].url : "/placeholder.jpg";
            const kannadaTranslation = news.translations.find(
              (t) => t.languageCode === "kn"
            );

            return (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="snap-center min-w-[280px] sm:min-w-[300px]"
              >
                <article className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                  <div className="relative h-36 sm:h-40 w-full mb-3">
                    <Image
                      src={imageUrl}
                      alt={kannadaTranslation?.title || "ಸುದ್ದಿ"}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 group-hover:text-[#F48634] line-clamp-2">
                    {kannadaTranslation?.title || "ಶೀರ್ಷಿಕೆ ಲಭ್ಯವಿಲ್ಲ"}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {kannadaTranslation?.content || "ವಿವರ ಲಭ್ಯವಿಲ್ಲ."}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(news.updatedAt).toLocaleDateString("kn-IN")}
                  </p>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Politics;
