"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Import next/image

const API_BASE_URL = "/api/v1/news";

// Define the type for the news object
interface News {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  images: { url: string }[]; // Assuming images is an array of objects with a `url` property
  translations: { languageCode: string; title: string; content: string }[];
  tags: string[];
}

export default function NewsDetails() {
  const { id } = useParams();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error("News not found");

        const data = await response.json();

        if (data.success && data.data) {
          setNews(data.data);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news article.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNews();
  }, [id]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;

      const element = articleRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const windowScrollTop = window.scrollY - element.offsetTop;

      if (windowScrollTop >= 0) {
        const scrolled = Math.min(
          100,
          Math.max(0, (windowScrollTop / totalHeight) * 100)
        );
        setReadingProgress(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-red-500">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Article
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/news"
            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-gray-500">📰</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No News Available
          </h2>
          <p className="text-gray-600 mb-6">
            The article you&apos;re looking for could not be found.
          </p>
          <Link
            href="/news"
            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  // Extract English Translation (Fallback to Kannada)
  const englishTranslation =
    news?.translations?.find(
      (t: { languageCode: string }) => t.languageCode === "en"
    ) ||
    news?.translations?.find(
      (t: { languageCode: string }) => t.languageCode === "kn"
    ) ||
    null;

  const title = englishTranslation?.title || "No Title";
  const content = englishTranslation?.content || "No content available.";

  // Extract Main Image (Use First Image)
  const mainImage = news?.images?.length > 0 ? news.images[0].url : null;
  const allImages = news?.images || [];

  // Format date
  const formattedDate = new Date(news.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Estimate reading time (average reading speed: 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-white" ref={articleRef}>
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-orange-500 z-50 transition-all duration-300 ease-out"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Hero Section with Main Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        {mainImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${mainImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white">
              <div className="max-w-4xl mx-auto w-full">
                <Link
                  href="/"
                  className="inline-flex items-center mb-6 text-white/90 hover:text-white transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to News
                </Link>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 drop-shadow-md">
                  {title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-white/90">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formattedDate}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {readingTime} min read
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-r from-orange-100 to-orange-200">
            <div className="text-center p-6">
              <div className="text-6xl mb-4">📰</div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {title}
              </h1>
            </div>
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 -mt-10 relative z-10">
          {/* Tags */}
          {news?.tags?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Tag className="h-4 w-4 text-orange-500" />
              {news.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {content.split("\n").map((paragraph: string, idx: number) => (
              <p
                key={idx}
                className={idx === 0 ? "text-xl font-medium text-gray-800" : ""}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: title,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        {allImages.length > 1 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-8 h-1 bg-orange-500 mr-3"></span>
              Photo Gallery
            </h3>

            {/* Featured Image */}
            <div className="mb-4 overflow-hidden rounded-xl shadow-md">
              <Image
                src={allImages[activeImageIndex].url || "/placeholder.svg"}
                alt={`News Image ${activeImageIndex + 1}`}
                width={600}
                height={400}
                className="w-full h-[40vh] md:h-[50vh] object-cover transition-all duration-500 ease-in-out"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {allImages.map((img: { url: string }, index: number) => (
                <div
                  key={index}
                  className={`
                    cursor-pointer overflow-hidden rounded-lg 
                    ${
                      activeImageIndex === index
                        ? "ring-2 ring-orange-500"
                        : "opacity-70 hover:opacity-100"
                    }
                    transition-all duration-200
                  `}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <Image
                    src={img.url || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publication Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-500">
            <p>Published on: {new Date(news.createdAt).toLocaleString()}</p>
            <p>Article ID: {id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
