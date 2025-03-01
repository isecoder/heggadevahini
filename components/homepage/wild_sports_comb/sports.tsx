"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {  ArrowRight } from "lucide-react";

const API_URL = "/api/v1/news";

interface Translation {
  languageCode: string;
  title: string;
  content: string;
}

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

interface ApiResponse {
  success: boolean;
  data: {
    id: string;
    tags: string[];
    translations: Translation[];
    images: { url: string }[];
  }[];
}

const Sports = () => {
  const [sportsNews, setSportsNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSportsNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data: ApiResponse = await response.json();
        console.log("Sports API Response:", data);

        if (data.success && data.data) {
          const sportsArticles = data.data.filter((article) =>
            article.tags.some((tag) => tag.toLowerCase() === "sports")
          );

          console.log("Filtered Sports Articles:", sportsArticles);

          const sportsNewsKannada: NewsArticle[] = sportsArticles.map(
            (article) => {
              const kannadaTranslation = article.translations.find(
                (t) => t.languageCode === "kn"
              );
              return {
                id: article.id,
                title: kannadaTranslation
                  ? kannadaTranslation.title
                  : "No Title",
                description: kannadaTranslation
                  ? kannadaTranslation.content
                  : "No Description",
                image: article.images.length > 0 ? article.images[0].url : null,
              };
            }
          );

          setSportsNews(sportsNewsKannada);
        }
      } catch (error) {
        console.error("Error fetching sports news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, []);

  return (
    <section className="relative bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          ಕ್ರೀಡೆ ( Sports )
        </h2>
        <Link
          href="/sports"
          className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors duration-200"
        >
          ಎಲ್ಲಾ ನೋಡಿ <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : sportsNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sportsNews.map((news) => (
            <SportsCard
              key={news.id}
              id={news.id}
              image={news.image}
              title={news.title}
              description={news.description}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          ಯಾವುದೇ ಕ್ರಿಕೆಟ್ ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ.
        </p>
      )}
    </section>
  );
};

interface SportsCardProps {
  id: string;
  image: string | null;
  title: string;
  description: string;
}

const SportsCard: React.FC<SportsCardProps> = ({
  id,
  image,
  title,
  description,
}) => (
  <Link href={`/news/${id}`} className="block">
    <Card className="overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default Sports;
