"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

const Heritage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHeritageArticles = async () => {
      try {
        const response = await fetch(API_URL);
        const data: ApiResponse = await response.json();
        console.log("API Response:", data);

        if (data.success && Array.isArray(data.data)) {
          const filteredArticles = data.data.filter((article) =>
            article.tags.some((tag) =>
              tag.toLowerCase().includes("heritage and agriculture")
            )
          );

          console.log("Filtered Articles:", filteredArticles);

          const formattedArticles: NewsArticle[] = filteredArticles.map(
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
                image:
                  article.images.length > 0
                    ? article.images[0].url
                    : "/placeholder.svg",
              };
            }
          );

          setArticles(formattedArticles);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching heritage news:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeritageArticles();
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + articles.length) % articles.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-sky-100 to-orange-50 p-4 sm:p-6 lg:p-8 rounded-xl">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800">
        ಪಾರಂಪರಿಕತೆ ಮತ್ತು ಕೃಷಿ ( Heritage & Agriculture )
        </h2>
        <Link
          href="/heritage_and_agriculture"
          className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1 transition-colors duration-200"
        >
          ಎಲ್ಲಾ ನೋಡಿ <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : articles.length > 0 ? (
        <>
          {/* Mobile Carousel */}
          <div className="block lg:hidden relative">
            <div className="relative overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {articles.map((article) => (
                  <div key={article.id} className="w-full flex-shrink-0 px-0.5">
                    <ArticleCard
                      id={article.id}
                      image={article.image}
                      title={article.title}
                      description={article.description}
                    />
                  </div>
                ))}
              </div>

              {articles.length > 1 && (
                <>
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
                </>
              )}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {articles.map((_, index) => (
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
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                image={article.image}
                title={article.title}
                description={article.description}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">
          No heritage or agriculture news available.
        </p>
      )}
    </section>
  );
};

interface ArticleCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  image,
  title,
  description,
}) => (
  <Link
    href={`/news/${id}`}
    className="group relative w-full rounded-xl overflow-hidden"
  >
    <div className="aspect-[4/3] relative">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {description}
      </p>
    </div>
  </Link>
);

export default Heritage;
