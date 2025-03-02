"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const API_BASE_URL = "/api/v1/news";

interface News {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  images: { url: string }[];
  translations: { languageCode: string; title: string; content: string }[];
  tags: string[];
}

export default function NewsDetails() {
  const { id } = useParams() as { id?: string };
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("");
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;

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

    fetchNews();
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const { top, height } = articleRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(100, ((viewportHeight - top) / (height + viewportHeight)) * 100));
      setReadingProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const englishTranslation = useMemo(
    () =>
      news?.translations.find((t) => t.languageCode === "en") ||
      news?.translations.find((t) => t.languageCode === "kn") ||
      null,
    [news]
  );

  const title = englishTranslation?.title || "No Title";
  const content = englishTranslation?.content || "No content available.";
  const mainImage = news?.images.length ? news.images[0].url : null;
  
  const formattedDate = useMemo(() => {
    if (!news?.createdAt) return "";
    return new Date(news.createdAt).toLocaleDateString("kn-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [news]);

  const readingTime = useMemo(() => Math.max(1, Math.ceil(content.split(/\s+/).length / 200)), [content]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: content.substring(0, 100) + "...",
          url: currentUrl,
        });
      } else {
        navigator.clipboard.writeText(currentUrl);
        alert("URL copied to clipboard!");
      }
    } catch (error) {
      console.log("Error sharing:", error);
     
    }
  };

  if (loading || error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 font-medium">
          {loading ? "Loading..." : error ? error : "News not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-8" ref={articleRef}>
      <Head>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.substring(0, 150) + "..."} />
        {mainImage && <meta property="og:image" content={mainImage.startsWith("http") ? mainImage : `https://yourwebsite.com${mainImage}`} />}
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
      </Head>

      <div className="fixed top-0 left-0 h-1 bg-orange-500 z-50 transition-all duration-300 ease-out" style={{ width: `${readingProgress}%` }} />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>

      <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
        <Calendar className="h-4 w-4" /> {formattedDate}
        <Clock className="h-4 w-4" /> {readingTime} ನಿಮಿಷ ಓದು
      </div>

      {mainImage && (
        <div className="w-full mb-6">
          <Image src={mainImage} alt={title} width={800} height={500} className="w-full h-auto rounded-lg shadow-md" loading="lazy" />
        </div>
      )}

      {news.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Tag className="h-4 w-4 text-orange-500" />
          {news.tags.map((tag, index) => (
            <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        {content.split("\n").map((paragraph, idx) => (
          <p key={idx} className={idx === 0 ? "text-xl font-medium text-gray-800" : ""}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={handleShare} className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
          <Share2 className="mr-2 h-4 w-4" />
          Share Article
        </button>
      </div>

      <div className="mt-6">
        <Link href="/news" className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Link>
      </div>
    </div>
  );
}
