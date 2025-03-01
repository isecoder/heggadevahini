"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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

const Wildlife = () => {
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data: ApiResponse = await response.json();
        console.log("Wildlife API Response:", data);

        if (data.success && Array.isArray(data.data)) {
          const filteredNews = data.data.filter((article) =>
            article.tags.some(
              (tag) => tag.toLowerCase() === "environment and wildlife"
            )
          );

          console.log(
            "Filtered Environment & Wildlife Articles:",
            filteredNews
          );

          const newsKannada: NewsArticle[] = filteredNews.map((article) => {
            const kannadaTranslation = article.translations.find(
              (t) => t.languageCode === "kn"
            );
            return {
              id: article.id,
              title: kannadaTranslation ? kannadaTranslation.title : "No Title",
              description: kannadaTranslation
                ? kannadaTranslation.content
                : "No Description",
              image: article.images.length > 0 ? article.images[0].url : null,
            };
          });

          setNewsList(newsKannada);
        } else {
          setNewsList([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const nextSlide = () =>
    setActiveSlide((prev) => (prev + 1) % newsList.length);
  const prevSlide = () =>
    setActiveSlide((prev) => (prev - 1 + newsList.length) % newsList.length);

  return (
    <section className="relative bg-gradient-to-b from-green-100 to-blue-50 p-4 sm:p-6 lg:p-8 rounded-xl">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800">
          ಪರಿಸರ ಮತ್ತು ವನ್ಯಜೀವಿ ( Environment & Wildlife )
        </h2>
        <Link
          href="/env_wild"
          className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors duration-200"
        >
          ಎಲ್ಲಾ ನೋಡಿ <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : newsList.length > 0 ? (
        <>
          {/* Mobile Carousel */}
          <div className="block lg:hidden relative">
            <div className="relative overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {newsList.map((news) => (
                  <div key={news.id} className="w-full flex-shrink-0 px-0.5">
                    <ArticleCard
                      image={news.image}
                      title={news.title}
                      description={news.description}
                      onClick={() => router.push(`/news/${news.id}`)}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full text-slate-800 hover:bg-white hover:text-slate-900 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full text-slate-800 hover:bg-white hover:text-slate-900 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {newsList.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? "bg-slate-800 scale-110"
                      : "bg-slate-400 hover:bg-slate-600"
                  }`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {newsList.map((news) => (
              <ArticleCard
                key={news.id}
                image={news.image}
                title={news.title}
                description={news.description}
                onClick={() => router.push(`/news/${news.id}`)}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">
          ಯಾವುದೇ ಪರಿಸರ ಮತ್ತು ವನ್ಯಜೀವಿ ಸುದ್ದಿ ಲಭ್ಯವಿಲ್ಲ.
        </p>
      )}
    </section>
  );
};

interface ArticleCardProps {
  image: string | null;
  title: string;
  description: string;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  image,
  title,
  description,
  onClick,
}) => (
  <div
    className="group relative w-full rounded-xl overflow-hidden cursor-pointer"
    onClick={onClick} // Navigate to news/[id] when clicked
  >
    <div className="aspect-[4/3] relative">
      <Image
        src={image || "/placeholder.svg"}
        alt={title || "No title"}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-2">
        {title || "Untitled"}
      </h3>
      <p className="text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {description || "No description available."}
      </p>
    </div>
  </div>
);

export default Wildlife;
