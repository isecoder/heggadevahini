"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Image from "next/image";

// Interfaces for News Item, Translation, and Image
interface Translation {
  languageCode: string;
  title: string;
  content: string;
}

interface ImageItem {
  id: string;
  url: string;
}

interface NewsItem {
  id: number;
  translations: Translation[];
  images: ImageItem[];
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`/api/v1/news`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.data || []);
        setFilteredNews(data.data || []);
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = news.filter((item) => {
      const englishTranslation = item.translations.find(
        (t) => t.languageCode === "en"
      );
      return (
        englishTranslation?.title.toLowerCase().includes(query) ||
        englishTranslation?.content.toLowerCase().includes(query)
      );
    });

    setFilteredNews(filtered);
  };

  return (
    <AdminLayout>
      {/* Search Bar at the Top Center */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 w-1/2 rounded-md shadow-sm"
        />
      </div>

      {/* News List */}
      <div className="mt-4 space-y-4">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => {
            const englishTranslation = item.translations.find(
              (t) => t.languageCode === "en"
            );
            return (
              <div
                key={item.id}
                className="p-4 bg-white shadow-md rounded-md relative"
              >
                <h3 className="text-lg font-semibold">
                  {englishTranslation?.title || "No Title"}
                </h3>
                <p className="text-gray-700">
                  {englishTranslation?.content || "No Content Available"}
                </p>

                {item.images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {item.images.map((img) => (
                      <Image
                        key={img.id}
                        src={img.url}
                        alt="News Image"
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center mt-4 text-gray-500">No news available</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default News;
