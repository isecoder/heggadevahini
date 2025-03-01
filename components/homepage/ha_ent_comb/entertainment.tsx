"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = "http://13.201.87.147/api/v1/news";

interface Translation {
  languageCode: string;
  title: string;
}

interface NewsArticle {
  id: string;
  title: string;
  image: string;
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

const Entertainment = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("ಸುದ್ದಿಗಳನ್ನು ತರಲು ವಿಫಲವಾಯಿತು.");

        const data: ApiResponse = await response.json();
        if (data.success && Array.isArray(data.data)) {
          const filteredNews: NewsArticle[] = data.data
            .filter((item) => item.tags.includes("Entertainment"))
            .map((article) => {
              const englishTranslation = article.translations.find(
                (t) => t.languageCode === "kn"
              );
              return {
                id: article.id,
                title: englishTranslation
                  ? englishTranslation.title
                  : "Untitled",
                image:
                  article.images.length > 0
                    ? article.images[0].url
                    : "/placeholder.svg",
              };
            });

          setNews(filteredNews);
        } else {
          setNews([]);
        }
      } catch (err) {
        setError((err as Error).message);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading)
    return <p className="text-center">Loading entertainment news...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">🎭 ಮನರಂಜನೆ ಸುದ್ದಿ ( Entertainment )</h2>
        </div>
        <Link
          href="entertainment"
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
        >
          ಎಲ್ಲಾ ನೋಡಿ <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((article) => (
          <EntertainmentCard
            key={article.id}
            id={article.id}
            image={article.image}
            title={article.title}
          />
        ))}
      </div>
    </section>
  );
};

interface EntertainmentCardProps {
  id: string;
  image: string;
  title: string;
}

const EntertainmentCard: React.FC<EntertainmentCardProps> = ({
  id,
  image,
  title,
}) => (
  <Link href={`/news/${id}`}>
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative aspect-video">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold line-clamp-2">{title}</h3>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default Entertainment;
